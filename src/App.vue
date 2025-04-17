<template>
  <!--NavBar-->
  <nav data-accordion="collapse">
    <Navbar />
  </nav>
  <div class="mx-auto max-w-3xl px-3 md:max-w-4xl sm:px-6 xl:max-w-5xl xl:px-0">
    <div class="flex flex-col justify-between">
      <!--Main View-->
      <main class="min-h-[85vh] z-0">
        <!--Render Body-->
        <RouterView />
      </main>
      <!--Footer-->
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from './components/NavBar/Navbar.vue';
import Footer from './components/Footer/Footer.vue';
import Mixin from './components/Mixin.vue';

export default {
  name: 'App',
  mixins: [Mixin],
  components: {
    Navbar,
    Footer
  },
  mounted() {
    // Đặt chủ đề mặc định là light
    const theme = localStorage.getItem("theme") || "light";
    this.setTheme(theme);

    // Đặt ngôn ngữ mặc định là Vi
    if (!localStorage.getItem("lang")) {
      localStorage.setItem("lang", "Vi");
    }

    // Đặt chủ đề theo thời gian [6h-18h: light, ngược lại dark]
    // Chỉ hoạt động cho đến khi người dùng tự chọn chủ đề
    if (localStorage.getItem("theme_by_user") !== "true") {
      this.setThemeByTime();
    }

  }
};

</script>