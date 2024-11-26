<template>
  <div class="relative flex bg-gray-100 dark:bg-gray-900 rounded-2xl h-[90vh]">
    <!--Toggle Mobile Tool-->
    <button @click="this.toggleMobileSidebar" :class="this.isShowMobileSidebar ? 'left-0' : 'right-0'"
      class="top-0 z-40 absolute md:hidden bg-gray-200 dark:bg-gray-600 p-2 rounded-lg">
      <i class="inline-block twa twa-hammer-and-wrench twa-lg"></i> Chọn tiện ích </button>
    <!--Mobile Tools list-->
    <div :class="this.isShowMobileSidebar ? 'left-0 w-1/4' : 'left-60 w-64'"
      class="top-0 z-30 md:static absolute bg-gray-200 dark:bg-gray-800 p-2 rounded-lg h-full transition-transform -translate-x-full md:translate-x-0 duration-300 overflow-y-auto ease-in-out">
      <div class="gap-3 grid grid-cols-4">
        <input type="text"
          class="border-2 border-gray-400 col-span-3 bg-gray-50 dark:bg-gray-700 px-2 py-1 focus:border-blue-500 rounded-md text-black focus:outline-none focus:ring-blue-500 dark:text-white dark:placeholder-gray-400"
          v-model="this.searchText" placeholder="Tìm tiện ích...">
        <button type="button"
          class="bg-blue-700 hover:bg-blue-800 dark:hover:bg-blue-700 dark:bg-blue-600 px-4 py-2 rounded-lg font-medium text-sm text-white focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">{{
            Object.keys(this.filteredTools).length }}</button>
      </div>
      <hr class="border-1 border-gray-500 mt-3 rounded">
      <!--Loading Spinner-->
      <div class="flex justify-center items-center h-2/6" v-if="this.isLoading || Object.keys(this.toolData) === 0">
        <LoadingSpinner></LoadingSpinner>
      </div>
      <!--Tools list-->
      <ul class="font-medium text-black dark:text-white list-none"
        v-if="this.toolData !== null && Object.keys(this.toolData).length > 0 && !this.isLoading">
        <li class="my-3 duration-300 hover:translate-x-2" v-for="(item, idx) in this.filteredTools" :key="idx"
          @click="this.selectedTool = item.Id, toggleMobileSidebar()"
          :class="this.selectedTool === item.Id ? 'bg-gray-300 dark:bg-gray-700' : true">
          <a href="#" class="flex items-center p-2 rounded-lg">
            <img class="inline-block ml-0.5" v-bind:src="item.Icon" width="22" height="22" :alt="item.Name">
            <span class="ml-2 text-sm">{{ item.Name }}</span>
          </a>
        </li>
      </ul>
    </div>
    <!--Render Selected Tool-->
    <component :is="getComponent(this.selectedTool)"></component>
  </div>
</template>

<script>
import TienIch_Base64 from "/src/components/TienIch_Base64.vue";
import TienIch_QR from "/src/components/TienIch_QR.vue";
import TienIch_URL from "/src/components/TienIch_URL.vue";
import Mixin from "/src/components/Mixin.vue";
import TienIch_IMG_to_PDF from "/src/components/TienIch_IMG_to_PDF.vue";
import TienIch_PwdGen from "/src/components/TienIch_PwdGen.vue";
import TienIch_Nato from "/src/components/TienIch_Nato.vue";
import LoadingSpinner from "/src/components/LoadingSpinner.vue";
export default {
  name: "TienIch",
  mixins: [Mixin], // Khai báo sử dụng các hàm chung
  components: { // Khai báo các thành phần con
    TienIch_Base64,
    TienIch_QR,
    TienIch_URL,
    TienIch_IMG_to_PDF,
    TienIch_PwdGen,
    TienIch_Nato,
    LoadingSpinner
  },
  data() {
    return {
      toolData: [], // Dữ liệu danh sách các tiện ích dạng JSON
      searchText: "", // Chuỗi tìm kiếm do người dùng nhập vào
      selectedTool: "670754da918d8d8dfe219358", // ID tiện ích đang được chọn
      isShowMobileSidebar: false, // Có muốn hiển thị Mobile Sidebar không ?
      isLoading: true // Trạng thái load danh sách từ DB
    }
  },
  methods: {
    // Khu vực chứa các hàm thực thi
    getComponent(selectedTool) {
      /**
       * Lấy giao diện con tương ứng của tiện ích đang chọn
       */
      switch (selectedTool) {
        case "670754da918d8d8dfe219358": return 'TienIch_QR';
        case "670754da918d8d8dfe219359": return 'TienIch_Base64';
        case "670754da918d8d8dfe21935a": return 'TienIch_PwdGen';
        case "670754da918d8d8dfe21935b": return 'TienIch_IMG_to_PDF';
        case "670754da918d8d8dfe21935c": return 'TienIch_URL';
        case "670e82aff0c8ee4e479ffec2": return "TienIch_Nato";

      }
    },
    toggleMobileSidebar() {
      /**
       * Sự kiện ẩn/hiện Mobile Sidebar
       */
      this.isShowMobileSidebar = !this.isShowMobileSidebar;
    }
  },
  async mounted() {
    // Khu vực tự động thực thi sau khi load xong DOM
    this.toolData = await this.getTienIch();
    this.isLoading = !this.isLoading;
  },
  computed: {
    // Khu vực tự động render lại đối tượng
    filteredTools() {
      // Sự kiện tìm kiếm tiện ích theo tên
      return this.toolData.filter(item => {
        const matchesSearch = this.searchText === "" || item.name.toLowerCase().includes(this.searchText.toLowerCase());
        return matchesSearch;
      });
    }
  }
}
</script>
