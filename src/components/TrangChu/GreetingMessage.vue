<template>
    <!--Greeting Message-->
  <div class="flex justify-center items-center" v-show="this.isShowGreetingMessage">
    <div class="overflow-hidden relative p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div class="border-animation absolute inset-0 rounded-lg"></div>
      <div class="relative z-50 text-sm font-medium text-black dark:text-white">
        {{ this.trans?.home_body?.greeting?.day?.[this.lang] || ""}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "GreetingMessage",
    props: {
        isShowGreetingMessage: Boolean,
        trans: Object,
        lang: String
    }
}
</script>

<style>
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