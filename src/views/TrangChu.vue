<template>
  <!--Greeting Message-->
  <GreetingMessage :isShowGreetingMessage="this.isShowGreetingMessage" :trans="this.trans" :lang="this.lang">
  </GreetingMessage>
  <div class="mt-8 divide-y divide-gray-200 dark:divide-gray-700 md:mt-16">
    <div class="space-y-2 md:pt-6 md:pb-8 md:my-4 md:space-y-5 xl:grid xl:grid-cols-3">
      <!--Loading Spinner-->
      <div class="h-full flex justify-center items-center" v-if="this.isLoading">
        <LoadingSpinner></LoadingSpinner>
      </div>

      <!--Primary Section-->
      <div v-if="!this.isLoading">
        <!--Left Content-->
        <IntroContent :trans="this.trans" :lang="this.lang" :introData="this.introData"></IntroContent>
        <!--Right Content-->
        <CardInfo></CardInfo>
      </div>
    </div>
  </div>
</template>

<script>
import Mixin from "../components/Mixin.vue";
import GreetingMessage from "../components/TrangChu/GreetingMessage.vue";
import IntroContent from "../components/TrangChu/IntroContent.vue";
import CardInfo from "../components/TrangChu/CardInfo.vue";

export default {
  name: "TrangChu",
  mixins: [
    Mixin
  ],
  components: {
    CardInfo,
    GreetingMessage,
    IntroContent
  },
  data() {
    return {
      greetingMessage: "",
      isShowGreetingMessage: false
    }
  },
  methods: {

  },
  async mounted() {
    localStorage.getItem("greeting") === "true"
      ? this.isShowGreetingMessage = true
      : this.isShowGreetingMessage = false;
  }
}
</script>
<style>
@keyframes say_hi {
  0% {
    transform: rotate(-10deg);
  }

  50% {
    transform: rotate(-25deg);
  }

  100% {
    transform: rotate(-10deg);
  }
}
</style>
