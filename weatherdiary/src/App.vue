<!--HTML-innehållet i webbsidan-->
<template>
  <Header />
  <Navbar />
  <main class="container my-5">
    <RouterView />
  </main>
  <Footer />
</template>

<!--JavaScript-->
<script>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    RouterView,
    Header,
    Navbar,
    Footer,
  },
};
</script>

<!--CSS-->
<style>
main {
  min-height: 75vh;
}
</style>
