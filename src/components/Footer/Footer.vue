<template>
  <footer class="border-t border-gray-200 dark:border-gray-700" v-if="Object.keys(this.infoData).length !== 0">
    <div class="flex flex-col justify-center items-center mt-4 mb-6 space-y-4 md:mb-10 md:space-y-0">
      <div class="flex flex-col items-center">
        <!--Copyright Text-->
        <div class="my-2 text-sm text-center text-gray-500 dark:text-gray-400">
          <span>&copy; {{ this.yearOnly }} BaoIT. All rights reserved.</span>
        </div>
        <!--Loading Spinner-->
        <div v-if="this.isLoading">
          <LoadingSpinner></LoadingSpinner>
        </div>
        <!--Icon Links-->
        <div class="flex justify-center items-center mt-1 space-x-4"
          v-if="Object.keys(this.infoData) !== 0 && !this.isLoading">
          <a class="text-gray-700 dark:text-white dark:hover:text-gray-300 hover:text-black"
            :href="this.infoData?.socials?.git?.url || '#'" target="_blank" aria-label="Github">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path
                d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4">
              </path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
          </a>

          <a class="text-gray-700 dark:text-white dark:hover:text-gray-300 hover:text-black"
            :href="this.infoData?.socials?.x?.url || '#'" target="_blank" aria-label="X">
            <svg width="24" height="24" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                fill="currentColor"></path>
            </svg>
          </a>
          <a class="text-gray-700 dark:text-white dark:hover:text-gray-300 hover:text-black"
            :href="this.infoData?.socials?.linkedin?.url || '#'" target="_blank" aria-label="Linkedin">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect width="4" height="12" x="2" y="9"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a class="text-gray-700 dark:text-white dark:hover:text-gray-300 hover:text-black"
            :href="'mailto:' + this.infoData?.email || 'mailto:#'" aria-label="Email">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
          </a>
          <a class="text-gray-700 dark:text-white dark:hover:text-gray-300 hover:text-black"
            :href="this.infoData?.socials?.facebook?.url || '#'" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a class="text-gray-700 dark:text-white dark:hover:text-gray-300 hover:text-black"
            :href="this.infoData?.socials?.youtube?.url || '#'" aria-label="Youtube">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path
                d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17">
              </path>
              <path d="m10 15 5-3-5-3z"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <BackToTop :backToTop="this.backToTop" :isShowBackToTop="this.isShowBackToTop"></BackToTop>
  </footer>
</template>


<script>
import LoadingSpinner from "../LoadingSpinner.vue";
import Mixin from "../Mixin.vue";
import BackToTop from "./BackToTop.vue";
export default {
  name: "Footer",
  mixins: [Mixin],
  components: {
    LoadingSpinner,
    BackToTop
  },
  data() {
    return {
      yearOnly: new Date().getFullYear().toString(), // Chỉ lấy giá trị Năm
      isShowBackToTop: false // Trạng thái ẩn/hiện nút Back To Top
    }
  },
  methods: {
    backToTop() {
      /**
       * Sự kiện nhấn nút Back To Top
       */
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    handleScroll() {
      /**
       * Sự kiện theo dõi quá trình cuộn trang. Hiển thị nút Back To Top khi y > 100
       */
      this.isShowBackToTop = window.scrollY > 100;
    },
  },
  async mounted() {
    // Khu vực sẽ chạy sau khi đã load xong DOM
    // Lắng nghe sự kiện cuộn trang
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    // Khu vực hủy bỏ các sự kiện 
    window.removeEventListener('scroll', this.handleScroll); // Hủy bỏ lắng nghe sự kiện cuộn trang
  },
}
</script>