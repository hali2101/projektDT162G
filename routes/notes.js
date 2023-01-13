//Hanna Lindholm hali2101@student.miun.se

var express = require("express");
//creating an instance of the router
var router = express.Router();

const bodyParser = require("body-parser");
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.use(bodyParser.json());

/******* Connect to database with mongoose ********/
var mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/notesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise; // Global use of mongoose

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function (callback) {
  // Add the listener for db events
  console.log("Connected to db");

  // Create DB schema
  var noteSchema = mongoose.Schema({
    notecreated: String,
    noteheadline: String,
    temperature: String,
    precipitation: String,
    humidity: String,
    wind: String,
    locality: String,
  });

  // Create schema model
  var Note = mongoose.model("Note", noteSchema);

  /******* Get all notes ********/
  router.get("/", function (req, res, next) {
    // Read from database
    Note.find(function (err, notes) {
      if (err) return console.error(err);
      var jsonObj = JSON.stringify(notes);
      res.contentType("application/json");
      res.send(jsonObj);
    }).sort({ notecreated: "desc" });
  });

  /******* GET single note with ID ********/
  router.get("/:id", function (req, res, next) {
    var id = req.params.id;

    Note.findById(id, function (err, notes) {
      if (err) return console.error(err);
      var jsonObj = JSON.stringify(notes);
      res.contentType("application/json");
      res.send(jsonObj);
    });
  });

  /******* ADD new note to database-list ********/
  router.post("/", function (req, res, next) {
    // Create new note
    var notebody = new Note({
      notecreated: req.body.notecreated,
      noteheadline: req.body.noteheadline,
      temperature: req.body.temperature,
      precipitation: req.body.precipitation,
      humidity: req.body.humidity,
      wind: req.body.wind,
      locality: req.body.locality,
    });

    console.log("test" + req.body.notename);

    // Save note to database
    notebody.save(function (err) {
      if (err) return console.error(err);
    });

    var jsonObj = JSON.stringify(notebody);
    res.contentType("application/json");
    res.send(jsonObj);
  });

  /******* UPDATE note with unique ID ********/

  router.put("/:id", function (req, res, next) {
    //get id
    var id = req.params.id;
    //save note as object
    var updatednotebody = {
      notecreated: req.body.notecreated,
      noteheadline: req.body.noteheadline,
      temperature: req.body.temperature,
      precipitation: req.body.precipitation,
      humidity: req.body.humidity,
      wind: req.body.wind,
      locality: req.body.locality,
    };

    //Update note with specific id in db
    Note.findByIdAndUpdate({ _id: id }, updatednotebody, function (err) {
      if (err) return handleError(err);
    });

    // Get the new list of notes from db as response data
    Note.find(function (err, notes) {
      if (err) return console.error(err);
      var jsonObj = JSON.stringify(notes);
      res.contentType("application/json");
      res.send(jsonObj);
    });
  });

  /******* DELETE note with unique ID ********/
  router.delete("/:id", function (req, res, next) {
    //get id
    var id = req.params.id;

    // Delete note with specific id from db
    Note.deleteOne({ _id: id }, function (err) {
      if (err) return handleError(err);
    });

    // Get the new list of notes from db as response data
    Note.find(function (err, notes) {
      if (err) return console.error(err);
      var jsonObj = JSON.stringify(notes);
      res.contentType("application/json");
      res.send(jsonObj);
    });
  });
});

module.exports = router;
