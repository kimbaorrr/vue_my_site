<template>
  <div class="h-screen overflow-y-auto relative flex bg-gray-100 rounded-2xl dark:bg-gray-900">
    <!--Toggle Mobile Tool-->
    <button @click="this.toggleMobileSidebar" :class="this.isShowMobileSidebar ? 'left-0' : 'right-0'"
      class="absolute top-0 z-40 p-2 bg-gray-200 rounded-lg dark:bg-gray-600 md:hidden">
      <i class="twa twa-hammer-and-wrench twa-lg inline-block"></i> Chọn tiện ích </button>
    <!--Mobile Tools list-->
    <div :class="this.isShowMobileSidebar ? 'left-0 w-1/4' : 'left-60 w-64'"
      class="-translate-x-full h-full overflow-y-auto absolute top-0 z-30 p-2 bg-gray-200 rounded-lg transition-transform duration-300 ease-in-out dark:bg-gray-800 md:static md:translate-x-0">
      <!--Search box-->
      <div class="flex justify-between items-center space-x-2">
        <input type="text" class="blueBox w-9/12 py-1.5 ps-3" v-model="this.searchText"
          :placeholder="this.trans?.tools?.search_box?.placeholder?.[this.getLang()] || ''">
        <button type="button" class="blueBtn w-3/12 py-2 text-white">{{
          Object.keys(this.filteredTools).length }}</button>
      </div>
      <hr class="border-1 mt-3 rounded border-gray-500">
      <!--Loading Spinner-->
      <div class="h-2/6 flex justify-center items-center" v-if="this.isLoading || Object.keys(this.toolData) === 0">
        <LoadingSpinner></LoadingSpinner>
      </div>
      <!--Tools list-->
      <ul class="font-medium list-none text-black dark:text-white"
        v-if="this.toolData !== null && Object.keys(this.toolData).length > 0 && !this.isLoading">
        <li class="my-3 duration-300 hover:translate-x-2" v-for="(item, idx) in this.filteredTools" :key="idx"
          @click="this.selectedTool = item.Selector, toggleMobileSidebar()"
          :class="this.selectedTool === item.Selector ? 'bg-gray-300 dark:bg-gray-700' : true">
          <a href="#" class="flex items-center p-2 space-x-2 rounded-lg">
            <span v-html=item.Icon></span>
            <span class="text-sm">{{ item.Name }}</span>
          </a>
        </li>
      </ul>
    </div>
    <!--Render Selected Tool-->
    <component :is="getComponent(this.selectedTool)"></component>
  </div>
</template>

<script>
import Base64 from "../components/TienIch/Base64.vue";
import QR from "../components/TienIch/QR.vue";
import URL from "../components/TienIch/URL.vue";
import Mixin from "../components/Mixin.vue";
import IMGtoPDF from "../components/TienIch/IMGtoPDF.vue";
import PwdGen from "../components/TienIch/PwdGen.vue";
import Nato from "../components/TienIch/Nato.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
export default {
  name: "TienIch",
  mixins: [Mixin], // Khai báo sử dụng các hàm chung
  components: { // Khai báo các thành phần con
    Base64,
    QR,
    URL,
    IMGtoPDF,
    PwdGen,
    Nato,
    LoadingSpinner
  },
  data() {
    return {
      toolData: [], // Dữ liệu danh sách các tiện ích dạng JSON
      searchText: "", // Chuỗi tìm kiếm do người dùng nhập vào
      selectedTool: "qr", // ID tiện ích đang được chọn
      isShowMobileSidebar: false, // Có muốn hiển thị Mobile Sidebar không ?
      isLoading: true, // Trạng thái load danh sách từ DB
      trans: this.getTranslator()
    }
  },
  methods: {
    // Khu vực chứa các hàm thực thi
    getComponent(selectedTool) {
      /**
       * Lấy giao diện con tương ứng của tiện ích đang chọn
       */
      switch (selectedTool) {
        case "qr": return 'QR';
        case "base64": return 'Base64';
        case "pwdGen": return 'PwdGen';
        case "imgPdf": return 'IMGtoPDF';
        case "url": return 'URL';
        case "natoGen": return "Nato";

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
        const matchesSearch = this.searchText === "" || item.Name.toLowerCase().includes(this.searchText.toLowerCase());
        return matchesSearch;
      });
    }
  }
}
</script>
