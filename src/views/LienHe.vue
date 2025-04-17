<template>
  <div class="h-screen flex justify-center items-center bg-white dark:bg-dark">
    <div
      class="w-full max-w-4xl flex flex-col justify-center gap-4 p-8 bg-center bg-cover rounded-xl xl:flex-row xl:shadow-lg xl:shadow-gray-400 xl:dark:shadow-purple-600">
      <!-- Loading Spinner -->
      <div class="w-full flex justify-center items-center" v-if="Object.keys(this.infoData).length === 0 || this.isLoading">
        <LoadingSpinner></LoadingSpinner>
      </div>

      <!-- Left Section: Avatar -->
      <Avatar :avatarImgSrc="this.infoData.Avatar || '#'"></Avatar>

      <!--Right Section: Content-->
      <Content :contactData="this.contactData" :infoData="this.infoData" :getLang="this.getLang()"
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
  },
  data() {
    return {
      infoData: [], // Danh sách thông tin cá nhân dạng JSON
      isLoading: true, // Đã load dữ liệu xong chưa ?
      contactData: []
    }
  },
  async mounted() {
    // Khu vực sẽ thực thi sau khi load xong DOM
    this.infoData = await this.getCaNhan(); // Dữ liệu thông tin cá nhân dưới dạng JSON
    this.contactData = await this.getLienHe(); // Dữ liệu thông tin liên hệ dưới dạng JSON
    // Đặt link tag vào DOM để load các icon
    const linkTag = document.createElement("link");
    linkTag.href = "https://jsdelivr.b-cdn.net/npm/fontawesome-free-6.2.1@6.2.1/css/all.min.css";
    linkTag.rel = "stylesheet";
    this.isLoading = !this.isLoading;
  },
}
</script>