<!--HTML-innehållet i webbsidan-->
<template>
  <h2 class="text-center mb-5">Loggade vädernoteringar</h2>
  <!--filtrering av månad-->
  <div class="accordion w-50 mb-3" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          Filtrera efter månad
        </button>
      </h2>
      <div
        id="collapseOne"
        class="accordion-collapse collapse"
        aria-labelledby="headingOne"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          <div>
            <ul>
              <li>Januari</li>
              <li>Februari</li>
              <li>Mars</li>
              <li>April</li>
              <li>Maj</li>
              <li>Juni</li>
              <li>Juli</li>
              <li>Augusti</li>
              <li>September</li>
              <li>Oktober</li>
              <li>November</li>
              <li>December</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row g-4">
    <Notecard
      v-for="note in notes"
      :note="note"
      :key="note._id"
      @deleteNote="deleteNote(note._id)"
      @getAllNotes="getAllNotes()"
    />
  </div>
</template>

<!--JavaScript-->
<script>
//importerar komponenter
import Notecard from "../components/Notecard.vue";

export default {
  //deklarerar vilka emits som skickas
  emits: ["deleteNote", "getAllNotes"],
  components: {
    Notecard,
  },
  data() {
    //skapar reaktiv data
    return {
      notes: [],
    };
  },
  methods: {
    //skapar en metod för att göra en fetch och hämta in från databasen, async för att vänta in
    async getAllNotes() {
      //sparar anropet i en variabel
      const response = await fetch("http://localhost:3000/notes", {
        //skickar med headers
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });

      //skickar denna metod som emit
      this.$emit("getAllNotes");

      //lagra svaret i en variabel
      const data = await response.json();

      if (response.status === 200) {
        //lagra svaret i data-propertyn products, reaktiva datan
        return (this.notes = data);
      } else {
        console.log("Något gick fel vid hämtning!");
        return false;
      }
    },
    async deleteNote(id) {
      //kontroll för att säkerställa radering
      let result = confirm("Är du säker på att du vill radera anteckningen?");

      if (result) {
        //fetchanrop för att radera post med specat id
        const response = await fetch("http://localhost:3000/notes/" + id, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        });

        //lagra svaret i variabel
        const data = await response.json();

        //koll om anrop är OK
        if (response.status === 200) {
          //ladda in listan igen
          this.getAllNotes();
        } else {
          console.log("Det gick inte att radera vald post!");
          return false;
        }
        //deklarerar att detta är en emit
        this.$emit("deleteNote");
      }
    },
  },
  mounted() {
    this.getAllNotes();
  },
};
</script>

<!--CSS-->
<style scoped></style>
