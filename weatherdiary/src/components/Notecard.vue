<!--HTML-innehållet i webbsidan-->
<template>
  <div class="col-lg-4">
    <div class="card">
      <div class="card-header text-center text-bg-secondary">
        <input
          class="bg-secondary text-white fs-4 border border-secondary editable"
          type="text"
          v-model="this.note.noteheadline"
        />
      </div>
      <div class="card-body m-auto">
        <input
          class="card-title border border-white editable fs-4"
          type="text"
          v-model="this.note.notecreated"
        />
        <br />
        <label for="temperature">Temperatur:</label>
        <input
          class="card-text border border-white editable"
          type="text"
          id="temperature"
          v-model="this.note.temperature"
        />
        <br />
        <label for="precipitation">Nederbörd:</label>
        <input
          class="card-text border border-white editable"
          type="text"
          v-model="this.note.precipitation"
          id="precipitation"
        />
        <br />
        <label for="humidity">Luftfuktighet:</label>
        <input
          class="card-text border border-white editable"
          type="text"
          v-model="this.note.humidity"
          id="humidity"
        />
        <br />
        <label for="wind">Vind:</label>
        <input
          class="card-text border border-white editable"
          type="text"
          v-model="this.note.wind"
          id="wind"
        />
        <br />
        <label for="locality">Ort:</label>
        <input
          class="card-text border border-white editable"
          type="text"
          v-model="this.note.locality"
          id="locality"
        />
        <br />
        <p class="m-2 text-primary" v-if="editmode">
          Klicka på fälten för göra att ändringar!
        </p>
        <button
          v-if="editmode"
          type="button"
          class="btn btn-success mt-3"
          @click="updateNote(this.note._id)"
        >
          Spara ändringar
        </button>
      </div>
      <div class="card-footer text-center">
        <button class="btn btn-outline-primary p-0 mx-3">
          <i @click="editable()" class="bi bi-pencil px-2"></i>
        </button>
        <button
          class="btn btn-outline-danger p-0 mx-3"
          type="button"
          @click="$emit('deleteNote')"
        >
          <i class="bi bi-trash3 px-2"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<!--JavaScript-->
<script>
export default {
  data() {
    return {
      editmode: false,
      editborder: false,
    };
  },
  //deklarerar vilka props som tas emot
  props: {
    note: Object,
  },
  //metoder
  methods: {
    //metod för att göra fälten editerbara
    editable() {
      //hämtar in classnamnet och sätter editable till true vid klick
      document.querySelectorAll(".editable").forEach(function (element) {
        element.contentEditable = "true";
      });
      //visar knapp för editering
      this.editmode = true;

      //sätter kant runt det som ska editeras
      this.editborder = true;
    },
    //metod för att uppdatera anteckning
    async updateNote(id) {
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
        let updatedBody = {
          notecreated: this.note.notecreated,
          noteheadline: this.note.noteheadline,
          temperature: this.note.temperature,
          precipitation: this.note.precipitation,
          humidity: this.note.humidity,
          wind: this.note.wind,
          locality: this.note.locality,
        };

        //lagra svaret i en variabel
        const response = await fetch(
          //hämtat parametern från min route och skickar med
          "http://localhost:3000/notes/" + id,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
            body: JSON.stringify(updatedBody),
          }
        );
        //lagra svaret i variabel
        const data = await response.json();

        //visar knapp för editering
        this.editmode = false;

        //koll om anrop är OK
        if (data == 200) {
          //laddar in hela listan igen
          this.$emit("getAllNotes");
          return true;
        } else {
          return false;
        }
      }
    },
  },
};
</script>

<!--CSS-->
<style scoped></style>
