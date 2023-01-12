<!--HTML-innehållet i webbsidan-->
<template>
  <article class="w-75 text-center m-auto mb-5 border rounded p-5">
    <h2>Välkommen!</h2>
    <p>
      Du har hittat helt rätt om du vill använda en enkel sida till att se och
      logga vädernoteringar. Det finns möjlighet till att lägga till, ändra och
      ta bort anteckningar.
    </p>
    <p>Mycket nöje!</p>
  </article>
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
            <ul class="text-center" style="list-style: none">
              <li class="p-1">
                <button
                  class="border border-none w-50"
                  style="background-color: #e3f2fd"
                  @click="paginationByMonth('01')"
                >
                  Januari
                </button>
              </li>
              <li class="p-1">
                <button
                  class="border border-none w-50"
                  style="background-color: #e3f2fd"
                  @click="paginationByMonth('02')"
                >
                  Februari
                </button>
              </li>
              <li class="p-1">
                <button
                  class="border border-none w-50"
                  style="background-color: #e3f2fd"
                  @click="paginationByMonth('03')"
                >
                  Mars
                </button>
              </li>
              <li class="p-1">
                <button
                  class="border border-none w-50"
                  style="background-color: #e3f2fd"
                  @click="paginationByMonth('04')"
                >
                  April
                </button>
              </li>
              <li class="p-1">
                <button
                  class="border border-none w-50"
                  style="background-color: #e3f2fd"
                  @click="paginationByMonth('05')"
                >
                  Maj
                </button>
              </li>
              <li class="p-1">
                <button
                  class="border border-none w-50"
                  style="background-color: #e3f2fd"
                  @click="paginationByMonth('06')"
                >
                  Juni
                </button>
              </li>
              <li class="p-1">
                <button
                  class="border border-none w-50"
                  style="background-color: #e3f2fd"
                  @click="paginationByMonth('07')"
                >
                  Juli
                </button>
              </li>
              <li class="p-1">
                <button
                  class="border border-none w-50"
                  style="background-color: #e3f2fd"
                  @click="paginationByMonth('08')"
                >
                  Augusti
                </button>
              </li>
              <li class="p-1">
                <button
                  class="border border-none w-50"
                  style="background-color: #e3f2fd"
                  @click="paginationByMonth('09')"
                >
                  September
                </button>
              </li>
              <li class="p-1">
                <button
                  class="border border-none w-50"
                  style="background-color: #e3f2fd"
                  @click="paginationByMonth('10')"
                >
                  Oktober
                </button>
              </li>
              <li class="p-1">
                <button
                  class="border border-none w-50"
                  style="background-color: #e3f2fd"
                  @click="paginationByMonth('11')"
                >
                  November
                </button>
              </li>
              <li class="p-1">
                <button
                  class="border border-none w-50"
                  style="background-color: #e3f2fd"
                  @click="paginationByMonth('12')"
                >
                  December
                </button>
              </li>
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
      notebymonth: "",
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
    checkMonth() {},
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
    //filtrera resultatet av anteckningar efter månad
    async paginationByMonth(month) {
      //väntar in för att fetcha alla inför filtrering
      await this.getAllNotes();
      //deklarera tom array
      let monthArr = [];
      //foreach-loop för arrayen med anteckningar
      this.notes.forEach((note) => {
        //spara i variabel
        this.notebymonth = note.notecreated.substring(5, 7);
        //kontroll om månadsnummer stämmer med knappen medskickade sträng
        if (month == this.notebymonth) {
          //pushar in objekten i nya arrayen
          monthArr.push(note);
        }
      });
      //fyller notesarrayen med nya arrayen
      this.notes = monthArr;
    },
  },
  mounted() {
    this.getAllNotes();
  },
};
</script>

<!--CSS-->
<style scoped></style>
