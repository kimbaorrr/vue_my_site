<template>
  <div class="divide-y divide-gray-200 dark:divide-gray-700">
    <div class="space-y-2 md:space-y-5 pt-6 pb-0">
      <h1
        class="font-extrabold text-xl sm:text-4xl md:text-6xl leading-9 sm:leading-10 md:leading-[5.5rem] tracking-tight">
        Dự án</h1>
      <p class="text-base text-gray-500 md:text-lg dark:text-gray-400 md:leading-7">Danh sách những dự
        án mà mình đã và đang làm.</p>

      <div class="flex sm:flex-row flex-col justify-between items-center">
        <!--Fillter Buttons-->
        <div class="space-y-2 sm:space-y-0 font-semibold text-gray-900 text-sm dark:text-gray-100">
          <button type="button" @click="filterType = 'all'"
            :class="filterType === 'all' ? 'border-blue-500' : 'border-gray-300 dark:border-gray-500'"
            class="bg-transparent hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 border-b-4 w-full sm:w-36 duration-300">Tất
            cả</button>
          <button type="button" @click="filterType = 'pending'"
            :class="filterType === 'pending' ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'"
            class=" bg-transparent hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 border-b-4 w-full sm:w-36 duration-300">Chưa
            hoàn thành</button>
          <button type="button" @click="filterType = 'done'"
            :class="filterType === 'done' ? 'border-green-500' : 'border-gray-300 dark:border-gray-500'"
            class="bg-transparent hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 border-b-4 w-full sm:w-36 duration-300">Đã
            hoàn thành</button>
        </div>
        <!--Search Bar-->
        <div class="flex items-center mt-4 sm:mt-0">
          <div class="relative group w-full sm:w-auto">
            <div
              class="absolute inset-y-0 right-6 left-2 translate-x-full group-focus-within:translate-x-0 opacity-50 group-focus-within:opacity-100 transition-transform duration-500 ease-in-out flex items-center pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="text" placeholder="Tìm dự án..." v-model="searchText" @click="isShowSearchIcon = true"
              class="border-2 border-gray-400 bg-gray-50 dark:bg-gray-700 ps-8 py-2 focus:border-blue-500 rounded-md w-full sm:w-auto text-black text-sm focus:outline-none focus:ring-blue-500 dark:text-white dark:placeholder-gray-400 duration-300">
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--Begin cards-->
  <div
    class="items-baseline gap-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 bg-gray-100 dark:bg-gray-500 shadow-lg my-3 xl:h-[48vh] h-full overflow-y-auto">
    <!--Loading Spinner-->
    <div class="flex justify-center items-center h-full absolute inset-0" v-if="isLoading">
      <LoadingSpinner></LoadingSpinner>
    </div>
    <!--Project cards-->
    <div
      class="relative bg-white dark:bg-gray-700 p-4 cursor-pointer transition-opacity duration-200 transform xl:hover:-translate-y-1 shadow-lg hover:shadow-xl hover:shadow-gray-300 dark:hover:shadow-gray-400"
      :class="[
        isExpanded(item.Id) ? 'max-h-screen overflow-visible' : 'max-h-[24vh] overflow-hidden',
        selectedId === null || isSelected(item.Id) ? 'opacity-100' : 'opacity-50'
      ]" :data-da-id="item.Id" v-for="(item, idx) in filteredProjects" :key="idx" @click="toggleExpand(item.Id)">
      <!--Pending ribbon-->
      <div class="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none" v-if="!item.ProjectDone">
        <div
          class="absolute top-[18px] right-[-40px] w-[140px] transform rotate-45 bg-red-600 text-white text-xs font-medium text-center py-[2px]">
          Pending
        </div>
      </div>
      <!--Card header-->
      <h4 class="flex text-xl items-baseline font-semibold text-black dark:text-white mt-1"
        :data-da-name="item.ProjectName">{{ item.ProjectName }}</h4>
      <!--Card body-->
      <div class="text-gray-800 text-xs dark:text-gray-200 mt-0.5">
        <h4 class="text-xs" :data-da-description="item.Description">{{ item.Description }}</h4>
        <div class="mt-1 mb-1">
          <!--AI Projects Technical-->
          <div v-if="item.ProjectType === 'ai'">
            <div class="flex">
              <span class="mt-2">Dataset:</span>
              <a :href="item.DatasetUrl === '' ? '#' : item.DatasetUrl"
                class="text-blue-800 dark:text-blue-300 mt-2 ml-1 hover:text-red-600 hover:dark:text-red-400"
                target="_blank">{{ item.DatasetName === '' ? 'NaN' : item.DatasetName }}</a>
            </div>
            <div class="flex">
              <span class="mt-2">Model Used:</span>
              <span class="mt-2 ml-1 font-semibold" :data-da-mem="item.ModelUsed">{{ item.ModelUsed }}</span>
            </div>
            <div class="flex">
              <span class="mt-2">Evalution Metrics:</span>
              <span class="mt-2 ml-1 font-semibold" :data-da-mem="item.EvalutionMetrics">{{ item.EvalutionMetrics
              }}</span>
            </div>
            <div class="flex">
              <span class="mt-2">Tech Stack:</span>
              <span class="mt-2 ml-1 font-semibold" :data-da-techstack="item.TechStack">
                {{ item.TechStack.length !== 0 ? item.TechStack.join(", ") : "NaN" }}
              </span>
            </div>
          </div>
          <!--.NET Projects Technical-->
          <div v-else>
            <div class="flex">
              <span class="mt-2">FE:</span>
              <span class="mt-2 ml-1 font-semibold" :data-da-fe="item.FE">
                {{ item.FE.length !== 0 ? item.FE.join(", ") : "NaN" }}
              </span>
            </div>
            <div class="flex">
              <span class="mt-2">BE:</span>
              <span class="mt-2 ml-1 font-semibold" :data-da-be="item.BE">
                {{ item.BE.length !== 0 ? item.BE.join(", ") : "NaN" }}
              </span>
            </div>
          </div>
          <div class="flex">
            <span class="mt-2">Scope:</span>
            <span class="mt-2 ml-1 font-semibold" :data-da-mem="item.Members">
              {{ item.TeamMembers === 1 ? 'Invididual' : 'Team (' + item.Members + ' members)' }}
            </span>
          </div>
          <div class="flex" v-if="item.Members > 1">
            <span class="mt-2">Team Role:</span>
            <span class="mt-2 ml-1 font-semibold" :data-da-mem="item.Role">
              {{ item.Role }}
            </span>
          </div>
          <div class="flex">
            <span class="mt-2">Mã nguồn:</span>
            <a :href="item.Git === '' ? '#' : item.Git" :data-da-git="item.Git"
              class="text-blue-600 dark:text-blue-300 mt-2 ml-1 hover:text-red-600 hover:dark:text-red-400"
              target="_blank">GitHub</a>
          </div>
        </div>
      </div>
      <!--Card footer-->
      <div class="flex justify-between mt-4 items-end text-white text-xs">
        <span :class="{ 'badgeDone': item.ProjectDone, 'badgePending': !item.ProjectDone }">
          {{ item.ProjectDone ? "Done" : "Pending" }}</span>
        <button type="button" class="btnThuNghiem"
          :class="item.ProjectUrl === '' ? 'opacity-50 cursor-not-allowed' : true" :disabled="item.ProjectUrl === ''"
          @click="tryProject(item.Id, item.ProjectUrl)">
          Thử nghiệm
        </button>
      </div>
      <!--See More icon-->
      <div
        class="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white dark:from-gray-700 to-transparent flex items-center justify-center pointer-events-none z-10"
        v-if="!isExpanded(item.Id)">
        <svg xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400 dark:text-gray-300 opacity-70 animate-bounce" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import Mixin from "/src/components/Mixin.vue";
import LoadingSpinner from '/src/components/LoadingSpinner.vue'
export default {
  name: "DuAn",
  mixins: [Mixin], // Khai báo sử dụng các hàm chung
  components: {
    LoadingSpinner
  },
  data() {
    return {
      projectData: [], // Danh sách dự án dạng JSON
      searchText: "", // Giá trị tìm kiếm được nhập từ người dùng
      filterType: "all", // Chế độ lọc trạng thái dự án,
      isLoading: true, // Đã load xong các dự án hay chưa ?
      expandedId: null, // ID card được nhấn See more
      selectedId: null, // ID của card đang được chọn
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

    toggleExpand(id) {
      /**
       * Sự kiện nhấn See more
       */
      if (this.selectedId === id) {
        this.selectedId = null;
      } else {
        this.selectedId = id;
      }
      this.expandedId = this.expandedId === id ? null : id;
    },
    isExpanded(id) {
      /**
       * Xác định card nào được chọn để Xem thêm ?
       */
      return this.expandedId === id;
    },
    isSelected(id) {
      /**
       * Kiểm tra card đã được chọn hay chưa ?
       */
      return this.selectedId === id;
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
        const matchesSearch = this.searchText === "" || item.ProjectName.toLowerCase().includes(this.searchText.toLowerCase());
        const matchesFilter = this.filterType === 'all' || (this.filterType === 'done' && item.ProjectDone) || (this.filterType === 'pending' && !item.ProjectDone);
        return matchesSearch && matchesFilter;
      });
    }
  }
}
</script>