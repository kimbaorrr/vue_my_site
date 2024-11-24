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
      <div class="flex justify-center items-center h-2/6" v-if="this.isLoading">
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor" />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill" />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
      <!--Tools list-->
      <ul class="font-medium text-black dark:text-white list-none"
        v-if="this.toolData !== null && Object.keys(this.toolData).length > 0 && !this.isLoading">
        <li class="my-3 duration-300 hover:translate-x-2" v-for="(item, idx) in this.filteredTools" :key="idx"
          @click="this.selectedTool = item.Id, toggleMobileSidebar()"
          :class="this.selectedTool === item.Id ? 'bg-gray-300 dark:bg-gray-700' : true">
          <a href="#" class="flex items-center p-2 rounded-lg">
            <img class="inline-block ml-0.5" :src="item.Icon" width="22" height="22" :alt="item.Name">
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

export default {
  name: "TienIch",
  mixins: [Mixin], // Khai báo sử dụng các hàm chung
  components: { // Khai báo các thành phần con
    TienIch_Base64,
    TienIch_QR,
    TienIch_URL,
    TienIch_IMG_to_PDF,
    TienIch_PwdGen,
    TienIch_Nato
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
    this.isLoading = true;
    this.toolData = await this.getTienIch();
    this.isLoading = false;
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
