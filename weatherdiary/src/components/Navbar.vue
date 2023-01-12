<!--HTML-->
<template>
  <!--navbar-->
  <nav class="navbar navbar-expand-lg bg-body-tertiary text-center">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul class="navbar-nav text-center fs-5">
          <li>
            <RouterLink
              class="nav-link m-auto mt-2 mx-2 text-black underline"
              to="/"
              >Hem</RouterLink
            >
          </li>
          <li>
            <RouterLink
              class="nav-link m-auto mt-2 mx-2 text-black underline"
              to="/addnote"
              >Ny vädernotering</RouterLink
            >
          </li>
          <li>
            <RouterLink
              class="nav-link m-auto mt-2 mx-2 text-black underline"
              to="/about"
              >Om sidan</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<!--JavaScript-->
<script>
//importerar routerlinks
import { RouterLink } from "vue-router";

export default {
  components: {
    RouterLink,
  },
};
</script>

<!--CSS-->
<style></style>
