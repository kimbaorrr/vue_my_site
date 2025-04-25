<template>
  <div class="divide-y divide-gray-200 dark:divide-gray-700">
    <div class="pt-6 pb-0 space-y-2 md:space-y-5">
      <h1
        class="text-xl font-extrabold tracking-tight leading-9 md:leading-[5.5rem] md:text-6xl sm:text-4xl sm:leading-10">
        {{ this.trans?.projects?.title?.[this.lang] || "" }}</h1>
      <p class="text-base text-gray-500 dark:text-gray-400 md:text-lg md:leading-7">{{
        this.trans?.projects?.description?.[this.lang] || "" }}</p>

      <div class="flex flex-col justify-center items-center md:justify-between sm:flex-row">
        <!-- Filter Buttons -->
        <FilterButtons :trans="this.trans" :lang="this.lang" v-model:filterType="this.filterType">
        </FilterButtons>

        <!--Search Box-->
        <SearchBox :trans="this.trans" :lang="this.lang" :searchText="this.searchText"
          v-model:searchText="this.searchText">
        </SearchBox>

      </div>
    </div>
  </div>
  <!--Begin cards-->
  <div
    class="h-full overflow-y-auto grid grid-cols-1 items-baseline gap-2 my-3 bg-gray-100 shadow-lg dark:bg-gray-500 sm:grid-cols-2 xl:h-[48vh] xl:grid-cols-4">
    <!--Loading Spinner-->
    <div class="h-full absolute inset-0 flex justify-center items-center" v-if="this.isLoading">
      <LoadingSpinner></LoadingSpinner>
    </div>

    <div
      class="transform relative p-4 bg-white shadow-lg transition-opacity duration-500 cursor-pointer dark:bg-gray-700 dark:hover:shadow-gray-400 hover:shadow-xl hover:shadow-gray-300 xl:hover:-translate-y-1"
      :class="[
        this.selectedCard === null || this.selectedCard.id === item.id ? 'opacity-100' : 'opacity-50',
        this.isExpanded(item.id) ? 'h-full overflow-visible' : 'h-[24vh] overflow-hidden'
      ]" :data-da-id="item.id" v-for="(item, idx) in this.filteredProjects" :key="idx"
      @click="this.toggleExpand(item.id)" >


      <!--In Progress Ribbon-->
      <Ribbon :isShowRibbon="!item.status" :trans="this.trans" :lang="this.lang"></Ribbon>

      <!--Card header-->
      <div class="flex justify-between items-center mt-1 text-black dark:text-white">
        <h4 class="text-xl font-semibold">
          {{ item.name }}
        </h4>
        <div class="flex items-center space-x-1">
          <div class="w-4 h-4 relative">
            <!-- Eye Open -->
            <svg xmlns="http://www.w3.org/2000/svg" class="eye-open w-full h-full absolute inset-0" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path
                d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <!-- Eye Closed -->
            <svg xmlns="http://www.w3.org/2000/svg" class="eye-closed w-full h-full absolute inset-0"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <path d="m15 18-.722-3.25" />
              <path d="M2 8a10.645 10.645 0 0 0 20 0" />
              <path d="m20 15-1.726-2.05" />
              <path d="m4 15 1.726-2.05" />
              <path d="m9 18 .722-3.25" />
            </svg>
          </div>
          <span class="text-sm font-medium">{{ item.viewer || 0 }}</span>
        </div>
      </div>


      <!--Card body-->
      <div class="mt-2 space-y-1 text-xs">
        <!--Technical Info-->
        <TechCard :projectData="item" :trans="trans" :lang="this.lang" :isShowCfs="isShowCfs"
          :isShowChart="isShowChart" @closeCfs="isShowCfs = false" @closeChart="isShowChart = false"
          @toggleChart="isShowChart = !isShowChart" @toggleCfs="isShowCfs = !isShowCfs" :selectedIndex="idx"></TechCard>
      </div>

      <!--See More icon-->
      <SeeMoreIcon :isExpanded="this.isExpanded(item.id)"></SeeMoreIcon>

    </div>
  </div>

  <!-- Modal for Selected Card -->
  <div v-if="this.selectedCard" class="bg-opacity-50 fixed inset-0 z-50 flex justify-center items-center bg-black">
    <div
      class="w-full max-h-max overflow-y-auto relative p-6 text-sm whitespace-pre-wrap bg-white rounded-lg shadow-2xl dark:bg-gray-800 xl:w-[30%]">
      <!-- Card Header -->
      <div class="flex justify-between items-baseline">
        <h2 class="text-xl font-bold text-black dark:text-white">{{ this.selectedCard.name }}</h2>
        <!-- Close Button -->
        <button class="text-xl text-gray-600 dark:text-gray-300 hover:text-red-600"
          @click="this.selectedCard = null; this.isShowChart = false;this.isShowCfs = false">
          ✕
        </button>
      </div>
      <!--Card body-->
      <div class="mt-4 space-y-2 text-sm">
        <!--Technical Info-->
        <TechCard :projectData="selectedCard" :trans="trans" :lang="lang" :isShowCfs="isShowCfs"
          :isShowChart="isShowChart" @closeCfs="isShowCfs = false" @closeChart="isShowChart = false"
          @toggleChart="isShowChart = !isShowChart" @toggleCfs="isShowCfs = !isShowCfs"></TechCard>

        <!--Card Footer-->
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-1 animate-pulse">
            <span class="px-2 py-2 rounded-full"
              :class="this.selectedCard.status === true ? 'bg-green-600 dark:bg-green-500' : 'bg-red-600 dark:bg-red-500'"></span>
            <span class="font-semibold"
              :class="this.selectedCard.status === true ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'">{{
                this.selectedCard.status
                  === true ? this.trans?.projects?.filter_by?.done?.[this.lang] :
                  this.trans?.projects?.filter_by?.in_progress?.[this.lang] }}</span>
          </div>

          <a :href="this.selectedCard.tryUrl === '' ? '#' : this.selectedCard.tryUrl" target="_blank"
            class="blueBtn px-4 py-2 mt-1 text-sm font-medium text-white"
            :class="this.selectedCard.tryUrl === '' ? 'opacity-50 cursor-not-allowed' : true"
            :disabled="this.selectedCard.tryUrl === ''">
            {{ this.trans?.projects?.card?.try?.[this.lang] || "" }}
          </a>
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
      searchText: "", // Giá trị tìm kiếm được nhập từ người dùng
      filterType: "all", // Chế độ lọc trạng thái dự án,
      expandedId: null, // ID card được nhấn See more
      selectedCard: null, // ID của card đang được chọn
      isShowChart: false, // Có hiển thị Chart hay không ?
      isShowCfs: false // Có hiển thị Matrix hay không ?

    }
  },
  methods: {
    // Khu vực chứa các hàm thực thi
    async updateViewer(id) {
      /**
       * Sự kiện nhấn nút Thử nghiệm dự án nào đó
       */
      try {
        await fetch("https://api.baoit.site/my_blog/projects/update_viewer", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({ id })
        });
      } catch (error) {
        console.error("Lỗi cập nhật lượt xem:", error.message);
      }
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
      this.selectedCard = this.filteredProjects.find(item => item.id === id);
    }
  },
  computed: {
    // Khu vực tự động render lại đối tượng
    filteredProjects() {
      // Trả về danh sách dự án phù hợp với điều kiện tìm kiếm và lọc theo trạng thái dự án
      return this.projectData.filter(item => {
        const matchesSearch = this.searchText === "" || item.name.toLowerCase().includes(this.searchText.toLowerCase());
        const matchesFilter = this.filterType === 'all' || (this.filterType === 'done' && item.status) || (this.filterType === 'in_progress' && !item.status);
        return matchesSearch && matchesFilter;
      });
    }
  },
  watch: {
    "selectedCard"(newValue) {
      newValue !== null ? this.updateViewer(this.selectedCard.id) : true;
    }
  }
}
</script>


<!-- Inline styles for animation -->
<style>
@keyframes blinkOpen {

  0%,
  5%,
  100% {
    opacity: 1;
  }

  2.5% {
    opacity: 0;
  }
}

@keyframes blinkClosed {

  0%,
  5%,
  100% {
    opacity: 0;
  }

  2.5% {
    opacity: 1;
  }
}

.eye-open {
  animation: blinkOpen 5s infinite;
}

.eye-closed {
  animation: blinkClosed 5s infinite;
}
</style>