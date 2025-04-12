<template>
  <!-- Wide Screen Nav -->
  <nav
    class="sticky top-0 z-40 overflow-hidden bg-white/75 py-3 backdrop-blur supports-backdrop-blur:bg-white/95 dark:bg-dark">
    <div class="flex items-center justify-between mx-auto max-w-3xl md:max-w-4xl xl:max-w-5xl px-3 sm:px-6 xl:px-0">
      <!-- Left Wide Screen Nav -->
      <a href="/" class="flex items-center">
        <img alt="Logo" src="/assets/imgs/logo.png" loading="lazy" width="50" height="45" decoding="async"
          class="mr-3 rounded-full transition duration-300 hover:blur-[2px]" />
        <p class="hidden md:block text-lg font-bold text-black dark:text-white">BaoIT Blog</p>
      </a>
      <!-- Right Wide Screen Nav -->
      <div class="flex items-center gap-4">
        <!-- Link Nav -->
        <div class="hidden w-full md:flex md:flex-row md:space-x-3 xl:block xl:space-x-1.5 font-medium">
          <RouterLink to="/" :class="$route.path === '/' ? 'bg-gray-300 dark:bg-red-700' : true"
            class="inline-block px-3 py-1 rounded transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-700">{{
              this.translators.nav_home }}</RouterLink>
          <RouterLink to="/du-an" :class="$route.path === '/du-an' ? 'bg-gray-300 dark:bg-red-700' : true"
            class="inline-block px-3 py-1 rounded transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-700">{{
              this.translators.nav_project }}</RouterLink>
          <RouterLink to="/tien-ich" :class="$route.path === '/tien-ich' ? 'bg-gray-300 dark:bg-red-700' : true"
            class="inline-block px-3 py-1 rounded transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-700">{{
              this.translators.nav_tool }}</RouterLink>
          <RouterLink to="/ly-lich" :class="$route.path === '/ly-lich' ? 'bg-gray-300 dark:bg-red-700' : true"
            class="inline-block px-3 py-1 rounded transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-700">{{
              this.translators.nav_cv }}</RouterLink>
          <RouterLink to="/lien-he" :class="$route.path === '/lien-he' ? 'bg-gray-300 dark:bg-red-700' : true"
            class="inline-block px-3 py-1 rounded transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-700">{{
              this.translators.nav_contact }}</RouterLink>
        </div>
        <div class="hidden xl:flex items-center gap-1">
          <span class="mb-1 font-semibold text-gray-400 cursor-default">|</span>
        </div>
        <!-- Icon Nav -->
        <div class="flex items-center gap-1">
          <!-- Question Modal Button -->
          <button type="button" aria-label="questionModal" @click="this.$refs.questionModal.openModal"
            class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-message-circle-question">
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
          </button>
          <!-- Change Theme Button -->
          <button type="button" @click="toggleTheme" aria-label="changeTheme"
            class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-sun" v-if="currentTheme === 'light'">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-moon" v-if="currentTheme === 'dark'">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
          </button>
          <!-- Change Language -->
          <button type="button" @click="toggleLang" aria-label="changeLanguage"
            class="p-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300">
            <div class="flex justify-center items-center">
              <img alt="VN_Flag" src="https://upload.wikimedia.org/wikipedia/commons/0/07/Flag_of_Vietnam-Animated.gif"
                loading="lazy" width="22" height="22" v-if="currentLang === 'vi'" class="absolute">
              <img alt="US_Flag" src="https://upload.wikimedia.org/wikipedia/commons/4/42/Animated-Flag-USA.gif"
                loading="lazy" width="22" height="22" v-if="currentLang === 'en'" class="absolute">
            </div>
          </button>
          <!-- Clock -->
          <div class="p-1.5 font-medium cursor-default">{{ this.subNavClock }}</div>
          <!-- Toggle Menu -->
          <button type="button" @click="showMobileNav" aria-label="toggleMenu"
            class="md:hidden p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300">
            <svg width="20" height="20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
  <!--Question Modal-->
  <modal>
    <QuestionModal ref="questionModal" />
  </modal>
  <!-- Mobile Nav -->
  <nav v-if="this.isToggleMenuClicked">
    <div
      class="fixed inset-0 top-0 left-0 w-full h-full bg-gray-100 dark:bg-gray-800 opacity-95 z-30 flex items-center justify-center">
      <div class="relative flex flex-col space-y-4 px-3 sm:px-6 xl:px-0 text-lg font-semibold">
        <button @click="this.isToggleMenuClicked = false"
          class="absolute -top-10 right-[-13rem] text-xl text-gray-800 dark:text-white hover:text-red-600 transition duration-300 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-x"
            viewBox="0 0 16 16">
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </button>
        <RouterLink to="/" @click="this.isToggleMenuClicked = false"
          :class="$route.path === '/' ? 'bg-gray-300 dark:bg-red-700 transition' : true"
          class="w-full py-4 px-8 rounded-lg text-center transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-700">
          {{ this.translators.nav_home }}</RouterLink>
        <RouterLink to="/du-an" @click="this.isToggleMenuClicked = false"
          :class="$route.path === '/du-an' ? 'bg-gray-300 dark:bg-red-700 transition' : true"
          class="w-full py-4 px-8 rounded-lg text-center transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-700">
          {{ this.translators.nav_project }}</RouterLink>
        <RouterLink to="/tien-ich" @click="this.isToggleMenuClicked = false"
          :class="$route.path === '/tien-ich' ? 'bg-gray-300 dark:bg-red-700 transition' : true"
          class="w-full py-4 px-8 rounded-lg text-center transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-700">
          {{ this.translators.nav_tool }}</RouterLink>
        <RouterLink to="/ly-lich" @click="this.isToggleMenuClicked = false"
          :class="$route.path === '/ly-lich' ? 'bg-gray-300 dark:bg-red-700 transition' : true"
          class="w-full py-4 px-8 rounded-lg text-center transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-700">
          {{ this.translators.nav_cv }}</RouterLink>
        <RouterLink to="/lien-he" @click="this.isToggleMenuClicked = false"
          :class="$route.path === '/lien-he' ? 'bg-gray-300 dark:bg-red-700 transition' : true"
          class="w-full py-4 px-8 rounded-lg text-center transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-700">
          {{ this.translators.nav_contact }}</RouterLink>
      </div>

    </div>
  </nav>
</template>

<script>
import en from "/src/assets/json/en.json";
import vi from "/src/assets/json/vi.json";
import QuestionModal from "./QuestionModal.vue";
import { RouterLink } from "vue-router";
export default {
  name: "Navbar",
  components: {
    QuestionModal
  },
  data() {
    // Khu vực các biến lưu trữ dữ liệu
    return {
      subNavClock: this.getTime(), // Đồng hồ số
      isToggleMenuClicked: false, // Đã nhấn nút Toggle menu hay chưa ?
      currentTheme: localStorage.getItem("theme") || "light", // Lấy chủ đề hiện tại, nếu chưa có mặc định là light
      currentLang: localStorage.getItem("lang") || "vi", // Lấy ngôn ngữ hiện tại, nếu chưa có trong kho mặc định là Việt
      translators: vi, // Lưu trữ dữ liệu bản dịch dạng JSON cho ngôn ngữ hiện tại
    };
  },
  methods: {
    // Khu vực định danh các phương thức
    getTime() {
      /**
       * Lấy dữ liệu thời gian định dạng HH:MM
       */
      const now = new Date();
      return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
    },
    showMobileNav() {
      /**
       * Sự kiện chuyển đổi trạng thái ẩn/hiện Mobile Nav khi nhấn Toggle Menu
       */
      this.isToggleMenuClicked = !this.isToggleMenuClicked;
    },
    toggleTheme() {
      /**
       * Sự kiện nhấn nút chuyển đổi chủ đề sáng/tối
       */
      // Nếu đang là tối thì chuyển thành sáng và ngược lại
      this.currentTheme = this.currentTheme === "dark" ? "light" : "dark";
      // Cập nhật giá trị theme trong kho lưu trữ Client
      localStorage.setItem("theme", this.currentTheme);
    },
    toggleLang() {
      /**
       * Sự kiện nhấn nút chuyển đổi ngôn ngữ
       */
      if (localStorage.getItem("lang") === "en") {
        this.currentLang = "vi";
        localStorage.setItem("lang", this.currentLang);
        this.translators = vi;
      } else {
        this.currentLang = "en";
        localStorage.setItem("lang", this.currentLang);
        this.translators = en;
      }
    },
  },
  mounted() {
    // Khu vực tự động thực thi khi DOM đã load xong
    setInterval(() => {
      /**
       * Tự động cập nhật thời gian mỗi 60s
       */
      this.subNavClock = this.getTime();
    }, 60000);

    // Nếu chủ đề đang chọn là dark thì thêm dark: vào các ele ở body
    this.currentTheme === 'dark'
      ? document.body.classList.add('dark')
      // Nếu chủ đề đang chọn là dark thì xóa dark: các ele ở body
      : document.body.classList.remove('dark');

    // Nếu lang đang chọn là vi thì nạp dữ liệu từ vi json và ngược lại
    if (this.currentLang === "vi") {
      localStorage.setItem("lang", "vi");
      this.translators = vi;
    } else {
      localStorage.setItem("lang", "en");
      this.translators = en;
    }

    // Nếu là buổi chiều tối thì bật dark theme [18h => 6h]
    const [hour, minute] = this.subNavClock.split(":").map(Number);
    hour > 18 && hour < 7 ? this.currentTheme = 'dark' : this.currentTheme = 'light';
  },
  computed: {

  },
  watch: {
    // Khu vực "giám sát" trạng thái phần tử
    currentTheme(newTheme) {
      /**
       * Sự kiện phát hiện giá trị theme thay đổi
       */
      newTheme === 'dark'
        ? document.body.classList.add('dark')
        : document.body.classList.remove('dark');
    }
  }
}
</script>
