<template>
  <!--NavBar-->
  <nav data-accordion="collapse">
    <Navbar />
  </nav>
  <div class="mx-auto px-3 sm:px-6 xl:px-0 max-w-3xl md:max-w-4xl xl:max-w-5xl">
    <div class="flex flex-col justify-between">
      <!--Main View-->
      <main class="z-0 min-h-[85vh]">
        <!--Render Body-->
        <RouterView />
      </main>
      <!--Footer-->
      <Footer />
    </div>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import Navbar from '/src/components/Navbar.vue';
import Footer from '/src/components/Footer.vue';
export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
};
</script>