<template>
  <!--Greeting Message-->
  <GreetingMessage :isShowGreetingMessage="false"></GreetingMessage>

  <div class="mt-8 divide-y divide-gray-200 dark:divide-gray-700 md:mt-16">
    <div class="space-y-2 md:pt-6 md:pb-8 md:my-4 md:space-y-5 xl:grid xl:grid-cols-3">
      <!--Left Content-->
      <IntroContent :trans="this.trans" :getLang="this.lang" :introData="this.introData"></IntroContent>
      
      <!--Right Content-->
      <CardInfo></CardInfo>
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
      greetingMessage: ""
    }
  },
  methods: {
    typeWriter() {
      $(".typeWriter").each(function () {
        const myText = $(this).text();
        let currentIndex = 0;
        $(this).text("");
        var interval = setInterval(() => {
          $(this).append(myText[currentIndex]);
          currentIndex++;
          if (currentIndex === myText.length) {
            setTimeout(() => {
              currentIndex = 0;
              $(this).text("");
            }, 1500)

          }
        }, 100);
      });
    }
  },
  async mounted() {
    this.typeWriter();

    
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


.border-animation {
  pointer-events: none;
  border: 2px solid transparent;
  background: linear-gradient(45deg, #ff0080, #7928ca, #2afadf, #ff0080);
  background-size: 400% 400%;
  animation: glowBorder 6s linear infinite;
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: destination-out;
  border-radius: 0.5rem;
}

@keyframes glowBorder {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>
