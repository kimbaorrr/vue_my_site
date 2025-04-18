<template>
  <div class="divide-y divide-gray-200 dark:divide-gray-700">
    <div class="pt-6 pb-0 space-y-2 md:space-y-5">
      <h1
        class="text-xl font-extrabold tracking-tight leading-9 md:leading-[5.5rem] md:text-6xl sm:text-4xl sm:leading-10">
        {{ this.trans?.projects?.title?.[this.getLang()] || "" }}</h1>
      <p class="text-base text-gray-500 dark:text-gray-400 md:text-lg md:leading-7">{{
        this.trans?.projects?.description?.[this.getLang()] || "" }}</p>

      <div class="flex flex-col justify-center items-center md:justify-between sm:flex-row">
        <!-- Filter Buttons -->
        <FilterButtons :trans="this.trans" :getLang="this.getLang()" v-model:filterType="this.filterType">
        </FilterButtons>

        <!--Search Box-->
        <SearchBox :trans="this.trans" :getLang="this.getLang()" :searchText="this.searchText"
          v-model:searchText="this.searchText">
        </SearchBox>

      </div>
    </div>
  </div>
  <!--Begin cards-->
  <div
    class="h-full overflow-y-auto grid grid-cols-1 items-baseline gap-2 my-3 bg-gray-100 shadow-lg dark:bg-gray-500 sm:grid-cols-2 xl:h-[48vh] xl:grid-cols-4">
    <!--Loading Spinner-->
    <div class="h-full absolute inset-0 flex justify-center items-center" v-if="isLoading">
      <LoadingSpinner></LoadingSpinner>
    </div>
    
    <div
      class="transform relative p-4 bg-white shadow-lg transition-opacity duration-500 cursor-pointer dark:bg-gray-700 dark:hover:shadow-gray-400 hover:shadow-xl hover:shadow-gray-300 xl:hover:-translate-y-1"
      :class="[
        this.selectedCard === null || this.selectedCard.Id === item.Id ? 'opacity-100' : 'opacity-50',
        isExpanded(item.Id) ? 'max-h-screen overflow-visible' : 'max-h-[24vh] overflow-hidden'
      ]" :data-da-id="item.Id" v-for="(item, idx) in this.filteredProjects" :key="idx" @click="toggleExpand(item.Id)">

      
      <!--In Progress Ribbon-->
      <Ribbon :isShowRibbon="!item.Status" :trans="this.trans" :getLang="this.getLang()"></Ribbon>

      <!--Card header-->
      <h4 class="flex items-baseline mt-1 text-xl font-semibold text-black dark:text-white">
        {{ item.Name }}
      </h4>

      <!--Card body-->
      <div class="mt-2 space-y-1 text-xs">
        <!--Technical Info-->
        <TechCard :projectData="item" :trans="trans" :getLang="getLang()" :isShowCfs="isShowCfs"
          :isShowChart="isShowChart" @closeCfs="isShowCfs = false" @closeChart="isShowChart = false"
          @toggleChart="isShowChart = !isShowChart" @toggleCfs="isShowCfs = !isShowCfs"></TechCard>
      </div>

      <!--See More icon-->
      <SeeMoreIcon :isExpanded="this.isExpanded(item.Id)"></SeeMoreIcon>

    </div>
  </div>

  <!-- Modal for Selected Card -->
  <div v-if="this.selectedCard" class="bg-opacity-50 fixed inset-0 z-50 flex justify-center items-center bg-black">
    <div
      class="w-full max-h-max overflow-y-auto relative p-6 text-sm whitespace-pre-wrap bg-white rounded-lg shadow-2xl dark:bg-gray-800 xl:w-[30%]">
      <!-- Card Header -->
      <div class="flex justify-between items-baseline">
        <h2 class="text-xl font-bold text-black dark:text-white">{{ this.selectedCard.Name }}</h2>
        <!-- Close Button -->
        <button class="text-xl text-gray-600 dark:text-gray-300 hover:text-red-600"
          @click="this.selectedCard = null; this.isShowChart = false;">
          ✕
        </button>
      </div>
      <!--Card body-->
      <div class="mt-4 space-y-2 text-sm">
        <!--Technical Info-->
        <TechCard :projectData="selectedCard" :trans="trans" :getLang="getLang()" :isShowCfs="isShowCfs"
          :isShowChart="isShowChart" @closeCfs="isShowCfs = false" @closeChart="isShowChart = false"
          @toggleChart="isShowChart = !isShowChart" @toggleCfs="isShowCfs = !isShowCfs"></TechCard>

        <!--Card Footer-->
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-1 animate-pulse">
            <span class="px-2 py-2 rounded-full"
              :class="this.selectedCard.Status === true ? 'bg-green-600 dark:bg-green-500' : 'bg-red-600 dark:bg-red-500'"></span>
            <span class="font-semibold"
              :class="this.selectedCard.Status === true ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'">{{
                this.selectedCard.Status
                  === true ? this.trans?.projects?.filter_by?.done?.[this.getLang()] :
                  this.trans?.projects?.filter_by?.in_progress?.[this.getLang()] }}</span>
          </div>

          <button type="button" class="blueBtn px-4 py-2 mt-1 text-sm font-medium text-white"
            :class="this.selectedCard.TryUrl === '' ? 'opacity-50 cursor-not-allowed' : true"
            :disabled="this.selectedCard.TryUrl === ''"
            @click.stop="this.tryProject(this.selectedCard.Id, this.selectedCard.TryUrl)">
            {{ this.trans?.projects?.card?.try?.[this.getLang()] || "" }}
          </button>
        </div>


      </div>
    </div>
  </div>


</template>

<script>
import Mixin from "/src/components/Mixin.vue";
import LoadingSpinner from '/src/components/LoadingSpinner.vue';
import SearchBox from "../components/DuAn/SearchBox.vue";
import FilterButtons from "../components/DuAn/FilterButtons.vue";
import Ribbon from "../components/DuAn/Ribbon.vue";
import SeeMoreIcon from "../components/DuAn/SeeMoreIcon.vue";
import TechCard from "../components/DuAn/TechCard.vue";

export default {
  name: "DuAn",
  mixins: [Mixin], // Khai báo sử dụng các hàm chung
  components: { // Khai báo sử dụng các thành phần dùng chung
    LoadingSpinner,
    SearchBox,
    FilterButtons,
    Ribbon,
    SeeMoreIcon,
    TechCard
  },
  data() {
    return {
      projectData: [], // Danh sách dự án dạng JSON
      searchText: "", // Giá trị tìm kiếm được nhập từ người dùng
      filterType: "all", // Chế độ lọc trạng thái dự án,
      isLoading: true, // Đã load xong các dự án hay chưa ?
      expandedId: null, // ID card được nhấn See more
      selectedCard: null, // ID của card đang được chọn
      trans: this.getTranslator(),
      isShowChart: false,
      isShowCfs: false

    }
  },
  methods: {
    // Khu vực chứa các hàm thực thi
    tryProject(id, project_url) {
      console.log(id);
      /**
       * Sự kiện nhấn nút Thử nghiệm dự án nào đó
       */
      // Cập nhật lượt xem +1
      $.ajax({
        type: "POST",
        url: "https://api.baoit.xyz/my_blog/du_an/update_viewer",
        data: {
          id: id
        },
        success: () => { },
        error: (xhr) => {
          const message = JSON.parse(xhr.responseText).message;
          console.error(message);
        }
      });
      // Mở liên kết dự án ở Tab mới
      window.open(project_url, "_blank");
    },
    isExpanded(id) {
      /**
       * Xác định card nào được chọn để Xem thêm ?
       */
      return this.expandedId === id;
    },
    toggleExpand(id) {
      /**
       * Sự kiện nhấn chọn card & truyền thông tin vào Modal
       */
      this.selectedCard = this.filteredProjects.find(item => item.Id === id);
    }
  },
  async mounted() {
    // Khu vực thực thi sau khi đã load xong DOM
    this.isLoading = true;
    this.projectData = await this.getDuAn();
    this.isLoading = false;
  },
  computed: {
    // Khu vực tự động render lại đối tượng
    filteredProjects() {
      // Trả về danh sách dự án phù hợp với điều kiện tìm kiếm và lọc theo trạng thái dự án
      return this.projectData.filter(item => {
        const matchesSearch = this.searchText === "" || item.Name.toLowerCase().includes(this.searchText.toLowerCase());
        const matchesFilter = this.filterType === 'all' || (this.filterType === 'done' && item.Status) || (this.filterType === 'in_progress' && !item.Status);
        return matchesSearch && matchesFilter;
      });
    }
  }
}
</script>