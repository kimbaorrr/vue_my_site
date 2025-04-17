<template>
    <!--Greeting Message-->
  <div class="flex justify-center items-center" v-show="this.isShowGreetingMessage">
    <div class="overflow-hidden relative p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div class="border-animation absolute inset-0 rounded-lg"></div>
      <div class="relative z-50 text-sm font-medium text-black dark:text-white">
        📢 Chào buổi sáng! Chúc bạn một ngày mới tràn đầy năng lượng!
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "GreetingMessage",
    props: {
        isShowGreetingMessage: Boolean
    }
}
</script>