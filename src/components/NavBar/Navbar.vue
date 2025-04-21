<template>
  <!-- Wide Screen Nav -->
  <WideScreenNav :trans="this.trans" :currentLang="this.currentLang" :currentTheme="this.currentTheme"
    :isToggleMenuClicked="this.isToggleMenuClicked" :subNavClock="this.subNavClock"
    @toggleMobileNav="isToggleMenuClicked = !isToggleMenuClicked" :toggleTheme="this.toggleTheme"
    :toggleLang="this.toggleLang" :toggleQuestionModal="this.toggleQuestionModal" :navLinks="this.navLinks" />
  <!--Question Modal-->
  <modal>
    <QuestionModal ref="questionModal" />
  </modal>
  <!-- Mobile Nav -->
  <MobileNav :trans="this.trans" :currentLang="this.currentLang" :isToggleMenuClicked="this.isToggleMenuClicked"
    @close="isToggleMenuClicked = false" />
</template>

<script>
import QuestionModal from "../QuestionModal.vue";
import Mixin from "../Mixin.vue"
import MobileNav from "./MobileNav.vue";
import WideScreenNav from "./WideScreenNav.vue";
export default {
  name: "Navbar",
  mixins: [Mixin],
  components: {
    QuestionModal,
    MobileNav,
    WideScreenNav
  },
  data() {
    const currentTheme = localStorage.getItem("theme") || "light";
    const currentLang = localStorage.getItem("lang") || "vi";
    const trans = this.getTranslator();
    // Khu vực các biến lưu trữ dữ liệu
    return {
      subNavClock: "", // Đồng hồ số
      isToggleMenuClicked: false, // Đã nhấn nút Toggle menu hay chưa ?
      currentTheme: currentTheme, // Lấy chủ đề hiện tại, nếu chưa có mặc định là light
      currentLang: currentLang, // Lấy ngôn ngữ hiện tại, nếu chưa có trong kho mặc định là Việt
      trans: trans, // Lưu trữ dữ liệu bản dịch dạng JSON cho ngôn ngữ hiện tại
      navLinks: {  
        "/": trans.nav.home[currentLang],
        "/du-an": trans.nav.project[currentLang],
        "/tien-ich": trans.nav.tool[currentLang],
        "/ly-lich": trans.nav.cv[currentLang],
        "/lien-he": trans.nav.contact[currentLang]
      }
    };
  },
  mounted() {
    this.subNavClock = this.getTime();

    setInterval(() => {
      this.subNavClock = this.getTime();
    }, 60000);
  },
  methods: {
    toggleTheme() {
      /**
       * Sự kiện chuyển đổi chủ đề sáng/tối
       */
      this.currentTheme = this.currentTheme === "dark" ? "light" : "dark";
      this.setTheme(this.currentTheme);
    },
    toggleLang() {
      /**
       * Sự kiện chuyển đổi ngôn ngữ vi/en
       */
      this.currentLang = this.currentLang === "en" ? "vi" : "en";
      localStorage.setItem("lang", this.currentLang);
      localStorage.setItem("theme_by_user", "true");
      location.reload();
    },
    toggleQuestionModal() {
      this.$refs.questionModal.openModal();
    }
  }
}
</script>
