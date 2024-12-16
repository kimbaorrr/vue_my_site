<template>
  <div class="divide-y divide-gray-200 dark:divide-gray-700">
    <div class="space-y-2 md:space-y-5 pt-6 pb-0">
      <h1
        class="font-extrabold text-xl sm:text-4xl md:text-6xl leading-9 sm:leading-10 md:leading-[5.5rem] tracking-tight">
        Dự án</h1>
      <p class="text-base text-gray-500 md:text-lg dark:text-gray-400 md:leading-7">Danh sách những dự
        án mà mình đã và đang làm.</p>
      <div class="flex sm:flex-row flex-col justify-between items-center">
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
        <div class="flex items-center mt-4 sm:mt-0">
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex ps-3 items-center pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="text" placeholder="Tìm dự án..." v-model="searchText" @click="isShowSearchIcon = true"
              class="border-2 border-gray-400 bg-gray-50 dark:bg-gray-700 ps-8 py-2 focus:border-blue-500 rounded-md w-full sm:w-auto text-black text-sm focus:outline-none focus:ring-blue-500 dark:text-white dark:placeholder-gray-400">
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--Begin cards-->
  <div
    class="items-baseline gap-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 bg-gray-100 dark:bg-gray-500 shadow-lg my-3 xl:h-[47vh] h-full overflow-y-auto">
    <!--Loading Spinner-->
    <div class="flex justify-center items-center h-full absolute inset-0" v-if="isLoading">
      <LoadingSpinner></LoadingSpinner>
    </div>
    <!--Projects card-->
    <div
      class="bg-white dark:bg-gray-700 p-4 cursor-default transition-transform duration-200 transform xl:hover:-translate-y-1 shadow-lg hover:shadow-xl hover:shadow-gray-300 dark:hover:shadow-gray-400"
      :data-da-id="item.Id" v-for="(item, idx) in filteredProjects" :key="idx"
      v-if="projectData !== null && Object.keys(projectData).length > 0 && !isLoading">
      <div class="flex justify-between items-baseline font-semibold text-xs text-black dark:text-white mt-1">
        <h4 class="text-xl" :data-da-name="item.ProjectName">{{ item.ProjectName }}</h4>
        <div class="flex mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye"
            viewBox="0 0 16 16">
            <path
              d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
          </svg>
          <span class="ml-1" :data-da-viewer="item.Viewer">{{ item.Viewer }}</span>
        </div>
      </div>
      <div class="text-gray-800 text-xs dark:text-gray-200 mt-0.5">
        <h4 class="text-xs" :data-da-description="item.Description">{{ item.Description }}</h4>
        <div class="mt-1 mb-1">
          <div class="flex">
            <span class="mt-2">Dataset:</span>
            <a :href="item.DsUrl === '' ? '#' : item.DsUrl"
              class="text-blue-800 dark:text-blue-300 mt-2 ml-1 hover:text-red-600 hover:dark:text-red-400"
              target="_blank">{{ item.DsName === '' ? 'NaN' : item.DsName }}</a>
          </div>
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
          <div class="flex">
            <span class="mt-2">Loại dự án:</span>
            <span class="mt-2 ml-1 font-semibold" :data-da-type="item.ProjectType">{{ item.ProjectType }}</span>
          </div>
          <div class="flex">
            <span class="mt-2">Quy mô:</span>
            <span class="mt-2 ml-1 font-semibold" :data-da-mem="item.TeamMembers">{{ item.TeamMembers }}
              thành viên</span>
          </div>
          <div class="flex">
            <span class="mt-2">Mã nguồn:</span>
            <a :href="item.Git === '' ? '#' : item.Git" :data-da-git="item.Git"
              class="text-blue-600 dark:text-blue-300 mt-2 ml-1 hover:text-red-600 hover:dark:text-red-400"
              target="_blank">GitHub</a>
          </div>
        </div>
      </div>
      <div class="flex justify-between mt-4 items-end text-white text-xs">
        <span :class="{ 'badgeDone': item.ProjectDone, 'badgePending': !item.ProjectDone }">
          {{ item.ProjectDone ? "Done" : "Pending" }}</span>
        <button type="button" class="btnThuNghiem"
          :class="item.ProjectUrl === '' ? 'opacity-50 cursor-not-allowed' : true" :disabled="item.ProjectUrl === ''"
          @click="tryProject(item.Id, item.ProjectUrl)">
          Thử nghiệm
        </button>
      </div>
    </div>
  </div>
  <!-- Pagination -->
  <div class="flex justify-center mt-4">
    <nav aria-label="Pagination">
      <ul class="inline-flex -space-x-px text-sm hidden">
        <li>
          <a href="#"
            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
        </li>
        <li>
          <a href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
        </li>
        <li>
          <a href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
        </li>
        <li>
          <a href="#" aria-current="page"
            class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">...</a>
        </li>
        <li>
          <a href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
        </li>
        <li>
          <a href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
        </li>
        <li>
          <a href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
        </li>
      </ul>
    </nav>
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
      isLoading: true // Đã load xong các dự án hay chưa ?
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