<template>
  <div class="h-screen flex justify-center items-center bg-white dark:bg-dark">
    <div
      class="w-full max-w-4xl flex flex-col justify-center gap-4 p-8 bg-center bg-cover rounded-xl xl:flex-row xl:shadow-lg xl:shadow-gray-400 xl:dark:shadow-purple-600">
      <!-- Left Section: Avatar -->
      <Avatar :avatarImgSrc="this.infoData.avatar || '#'"></Avatar>

      <!-- Loading Spinner -->
      <div class="w-full flex justify-end items-center"
        v-if="this.isLoading">
        <LoadingSpinner></LoadingSpinner>
      </div>
      
      <!--Right Section: Content-->
      <Content :contactData="this.contactData" :infoData="this.infoData" :lang="this.lang"
        :isLoading="this.isLoading"></Content>
    </div>
  </div>
</template>


<script>
import Mixin from "/src/components/Mixin.vue";
import Content from "../components/LienHe/Content.vue";
import Avatar from "../components/LienHe/Avatar.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
export default {
  name: "LienHe",
  mixins: [Mixin],
  components: {
    Avatar,
    Content,
    LoadingSpinner
  }
}
</script>