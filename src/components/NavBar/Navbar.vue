<template>
  <!-- Wide Screen Nav -->
  <WideScreenNav :trans="this.trans" :currentLang="this.lang" :currentTheme="this.theme"
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
    // Khu vực các biến lưu trữ dữ liệu
    return {
      subNavClock: "",
      isToggleMenuClicked: false // Đã nhấn nút Toggle menu hay chưa ?
    };
  },
  methods: {
    toggleTheme() {
      /**
       * Sự kiện chuyển đổi chủ đề sáng/tối
       */
      const newTheme = this.theme === "dark" ? "light" : "dark";
      this.setTheme(newTheme);
    },
    toggleLang() {
      /**
       * Sự kiện chuyển đổi ngôn ngữ vi/en
       */
      const newLang = this.lang === "en" ? "vi" : "en";
      localStorage.setItem("lang", newLang);
      localStorage.setItem("theme_by_user", "true");
      location.reload();
    },
    toggleQuestionModal() {
      this.$refs.questionModal.openModal();
    },

  },
  mounted() {
    this.subNavClock = this.getTime();
    setInterval(() => {
      this.subNavClock = this.getTime();
    }, 60000);
  },
  created() {
    this.trans = this.getTranslator();
    this.navLinks = {
      "/": this.trans.nav.home[this.lang],
      "/du-an": this.trans.nav.project[this.lang],
      "/tien-ich": this.trans.nav.tool[this.lang],
      "/ly-lich": this.trans.nav.cv[this.lang],
      "/lien-he": this.trans.nav.contact[this.lang]
    };
  }
}
</script>
