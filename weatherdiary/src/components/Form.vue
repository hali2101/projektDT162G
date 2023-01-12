<!--HTML-->
<template>
  <!--Formulär för att lägga till -->
  <form @submit.prevent="addNote()" class="column">
    <div class="col-lg-5">
      <label for="notecreated" class="form-label">Datum:</label>
      <input
        v-model="notecreated"
        type="text"
        class="form-control"
        id="notecreated"
        placeholder="åååå-mm-dd"
      />
    </div>
    <div class="col-lg-5 mt-3">
      <label for="noteheadline" class="form-label">Rubrik:</label>
      <input
        v-model="noteheadline"
        type="text"
        class="form-control"
        id="notecreated"
      />
    </div>
    <div class="col-lg-5 mt-3">
      <label for="temperature" class="form-label">Temperatur:</label>
      <input
        v-model="temperature"
        type="text"
        class="form-control"
        id="temperature"
      />
    </div>
    <div class="col-lg-5 mt-3">
      <label for="precipitation" class="form-label">Nederbörd:</label>
      <input
        v-model="precipitation"
        type="text"
        class="form-control"
        id="precipitation"
      />
    </div>
    <div class="col-lg-5 mt-3">
      <label for="humidity" class="form-label">Luftfuktighet:</label>
      <input
        v-model="humidity"
        type="text"
        class="form-control"
        id="humidity"
      />
    </div>
    <div class="col-lg-5 mt-3">
      <label for="wind" class="form-label">Vind:</label>
      <input v-model="wind" type="text" class="form-control" id="wind" />
    </div>
    <div class="col-lg-5 mt-3">
      <label for="locality" class="form-label">Ort:</label>
      <input
        v-model="locality"
        type="text"
        class="form-control"
        id="locality"
      />
    </div>
    <div class="col-lg-5 mt-3">
      <button class="btn btn-success mt-5" type="submit">
        Lägg till notering
      </button>
      <div v-if="sucessmsg" class="mt-3 col-lg-5">
        <span class="text-success"> Anteckningen är tillagd! </span>
      </div>
      <div v-if="errormsg" class="mt-3 col-lg-5">
        <span class="text-danger"> Du måste fylla i alla fält! </span>
      </div>
      <div v-if="storemsg" class="mt-3 col-lg-5">
        <span class="text-danger"> Något gick fel vid lagring! </span>
      </div>
    </div>
  </form>
</template>

<!--JavaScript-->
<script>
export default {
  data() {
    //skapar reaktiv data
    return {
      notecreated: "",
      noteheadline: "",
      temperature: "",
      precipitation: "",
      humidity: "",
      wind: "",
      locality: "",
      errormsg: false,
      sucessmsg: false,
      storemsg: false,
    };
  },
  methods: {
    //skapar en metod för att göra en fetch och hämta in från databasen, async för att vänta in
    async addNote() {
      //kontroll av inputfält
      if (
        this.notecreated != "" &&
        this.noteheadline != "" &&
        this.temperature != "" &&
        this.precipitation != "" &&
        this.humidity != "" &&
        this.wind != "" &&
        this.locality != ""
      ) {
        //spara innehållet som ett objekt för lagring i databasen
        let noteBody = {
          notecreated: this.notecreated,
          noteheadline: this.noteheadline,
          temperature: this.temperature,
          precipitation: this.precipitation,
          humidity: this.humidity,
          wind: this.wind,
          locality: this.locality,
        };

        //lagra svaret i en variabel
        const response = await fetch("http://localhost:3000/notes", {
          //gör ett postanrop
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(noteBody),
        });

        //lagra svaret i en variabel
        const data = await response.json();

        //koll om anrop är OK
        if (response.status === 200) {
          //lagra svaret i notes, reaktiva datan
          this.notes = data;
        } else {
          this.storemsg = true;
          return false;
        }
        //meddelande
        this.sucessmsg = true;
        this.errormsg = false;
      } else {
        //felmeddalande
        this.errormsg = true;
      }

      //tömmer fält efter lagring
      this.notecreated = "";
      this.noteheadline = "";
      this.temperature = "";
      this.precipitation = "";
      this.humidity = "";
      this.wind = "";
      this.locality = "";
    },
  },
};
</script>

<!--CSS-->
<style></style>
