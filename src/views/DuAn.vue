<template>
  <div class="divide-y divide-gray-200 dark:divide-gray-700">
    <div class="pt-6 pb-0 space-y-2 md:space-y-5">
      <h1
        class="text-xl font-extrabold tracking-tight leading-9 md:leading-[5.5rem] md:text-6xl sm:text-4xl sm:leading-10">
        {{ this.trans?.projects?.title?.[this.getLang()] || "" }}</h1>
      <p class="text-base text-gray-500 dark:text-gray-400 md:text-lg md:leading-7">{{
        this.trans?.projects?.description?.[this.getLang()] || "" }}</p>

      <div class="flex flex-col justify-between items-baseline sm:flex-row">
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

    <!--Project cards-->
    <div
      class="transform relative p-4 bg-white shadow-lg transition-opacity duration-500 cursor-pointer dark:bg-gray-700 dark:hover:shadow-gray-400 hover:shadow-xl hover:shadow-gray-300 xl:hover:-translate-y-1"
      :class="[
        selectedCard === null || selectedCard.Id === item.Id ? 'opacity-100' : 'opacity-50',
        isExpanded(item.Id) ? 'max-h-screen overflow-visible' : 'max-h-[24vh] overflow-hidden'
      ]" :data-da-id="item.Id" v-for="(item, idx) in filteredProjects" :key="idx" @click="toggleExpand(item.Id)">

      <!--In Progress Ribbon-->
      <Ribbon :isShowRibbon="!item.Status" :trans="this.trans" :getLang="this.getLang()"></Ribbon>

      <!--Card header-->
      <h4 class="flex items-baseline mt-1 text-xl font-semibold text-black dark:text-white">
        {{ item.Name }}
      </h4>

      <!--Card body-->
      <div class="mt-0.5 text-xs text-gray-800 dark:text-gray-200">
        <h4 class="text-xs">{{ item.Description }}</h4>
        <div class="mt-1 mb-1">
          <!--Technical info-->
          <div class="flex items-baseline space-x-1 space-y-2"
            v-if="item.Dataset.Name.trim() && item.Dataset.Url.trim()">
            <span>Dataset:</span>
            <a :href="item.Dataset.Url"
              class="text-blue-800 dark:text-blue-300 hover:text-red-600 hover:dark:text-red-400" target="_blank">{{
                item.Dataset.Name }}</a>
          </div>
          <div class="flex items-baseline space-x-1 space-y-2" v-if="item.TechStack.Languages.length !== 0">
            <span class="font-semibold">Languages:</span>
            <span>{{ item.TechStack.Languages.join(", ") }}</span>
          </div>
          <div class="flex items-baseline space-x-1 space-y-2" v-if="item.Type === 'AI'">
            <span class="font-semibold">Evaluation Metrics:</span>
            <span>{{ item.EvaluationMetrics }}</span>
          </div>
          <div class="flex items-baseline space-x-1 space-y-2" v-if="item.TechStack.FrontEnd.length !== 0">
            <span class="font-semibold">Frontend:</span>
            <span>{{ item.TechStack.FrontEnd.join(", ") }}</span>
          </div>
          <div class="flex items-baseline space-x-1 space-y-2" v-if="item.TechStack.BackEnd.length !== 0">
            <span class="font-semibold">Backend:</span>
            <span>{{ item.TechStack.BackEnd.join(", ") }}</span>
          </div>
          <div class="flex items-baseline space-x-1 space-y-2" v-if="item.TechStack.Database.length !== 0">
            <span class="font-semibold">Database:</span>
            <span>{{ item.TechStack.Database.length !== 0 ? item.TechStack.Database.join(", ") : "NaN" }}</span>
          </div>
          <div class="flex items-baseline space-x-1 space-y-2" v-if="item.TechStack.Infrastructure.length !== 0">
            <span class="font-semibold">Infrastructure:</span>
            <span>{{ item.TechStack.Infrastructure.join(", ") }}</span>
          </div>
          <div class="flex items-baseline space-x-1 space-y-2" v-if="item.TechStack.Architecture.length !== 0">
            <span class="font-semibold">Architecture:</span>
            <span>{{ item.TechStack.Architecture.join(", ") }}</span>
          </div>
          <div class="flex items-baseline space-x-1 space-y-2" v-if="item.TechStack.Libraries.length !== 0">
            <span class="font-semibold">Libraries:</span>
            <span>{{ item.TechStack.Libraries.join(", ") }}</span>
          </div>
          <div class="flex items-baseline space-x-1 space-y-2" v-if="item.TechStack.Models.length !== 0">
            <span class="font-semibold">Models Used:</span>
            <span>{{ item.TechStack.Models.join(", ") }}</span>
          </div>
          <div class="flex items-baseline space-x-1 space-y-2" v-if="item.TechStack.Frameworks.length !== 0">
            <span class="font-semibold">Frameworks:</span>
            <span>{{ item.TechStack.Frameworks.join(", ") }}</span>
          </div>
          <div class="flex items-baseline space-x-1 space-y-2" v-if="item.TechStack.Algorithms.length !== 0">
            <span class="font-semibold">Algorithms:</span>
            <span>{{ item.TechStack.Algorithms.length !== 0 ? item.TechStack.Algorithms.join(", ") : "NaN" }}</span>
          </div>
          <div class="flex items-baseline space-x-1 space-y-2" v-if="item.TechStack.TaskType.length !== 0">
            <span class="font-semibold">TaskType:</span>
            <span>{{ item.TechStack.TaskType.length !== 0 ? item.TechStack.TaskType.join(", ") : "NaN" }}</span>
          </div>
          <div class="flex items-baseline space-x-1 space-y-2">
            <span class="font-semibold">Scope:</span>
            <span>{{ item.Scope }}</span>
          </div>
          <div class="flex items-baseline space-x-1 space-y-2" v-if="item.Members > 1">
            <span class="font-semibold">Team Role:</span>
            <span>{{ item.Role }}</span>
          </div>
          <div class="flex items-baseline space-x-1 space-y-2">
            <span class="font-semibold">Mã nguồn:</span>
            <a :href="item.SourceCode.GitHub === '' ? '#' : item.SourceCode.GitHub"
              class="text-blue-600 dark:text-blue-300 hover:text-red-600 hover:dark:text-red-400"
              target="_blank">GitHub</a>
            <a :href="item.SourceCode.GitLab === '' ? '#' : item.SourceCode.GitLab"
              class="text-blue-600 dark:text-blue-300 hover:text-red-600 hover:dark:text-red-400"
              target="_blank">GitLab</a>
          </div>
        </div>
      </div>

      <!--Card footer-->
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-1 animate-pulse">
          <span class="px-2 py-2 rounded-full"
            :class="item.Status === true ? 'bg-green-600 dark:bg-green-500' : 'bg-red-600 dark:bg-red-500'"></span>
          <span class="font-semibold"
            :class="item.Status === true ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'">{{
              item.Status
                === true ? this.trans?.projects?.filter_by?.done?.[this.getLang()] :
                this.trans?.projects?.filter_by?.in_progress?.[this.getLang()] }}</span>
        </div>

        <button type="button" class="blueBtn px-4 py-2 text-sm font-medium text-white"
          :class="item.TryUrl === '' ? 'opacity-50 cursor-not-allowed' : true" :disabled="item.TryUrl === ''"
          @click.stop="tryProject(item.Id, item.TryUrl)">
          {{ this.trans?.projects?.card?.try?.[this.getLang()] || "" }}
        </button>
      </div>

      <!--See More icon-->
      <SeeMoreIcon :isExpanded="this.isExpanded(item.Id)"></SeeMoreIcon>

    </div>
  </div>

  <!-- Modal for Selected Card -->
  <div v-if="selectedCard" class="bg-opacity-50 fixed inset-0 z-50 flex justify-center items-center bg-black">
    <div
      class="w-full max-h-max overflow-y-auto relative p-6 text-sm whitespace-pre-wrap bg-white rounded-lg shadow-2xl dark:bg-gray-800 xl:w-[30%]">
      <!-- Card Header -->
      <div class="flex justify-between items-baseline">
        <h2 class="text-xl font-bold text-black dark:text-white">{{ this.selectedCard.Name }}</h2>
        <!-- Close Button -->
        <button class="text-xl text-gray-600 dark:text-gray-300 hover:text-red-600"
          @click="this.selectedCard = null; this.showChart = false;">
          ✕
        </button>
      </div>
      <!--Card body-->
      <div class="mt-4 space-y-2 text-sm text-gray-800 dark:text-gray-200">
        <div class="flex items-baseline space-x-1">
          <span class="font-semibold text-black dark:text-gray-100">Description:</span>
          <span class="text-black dark:text-gray-200">{{ selectedCard.Description }}</span>
        </div>

        <div class="flex items-baseline space-x-1" v-if="selectedCard.Dataset.Name && selectedCard.Dataset.Url">
          <span class="font-semibold text-black dark:text-gray-100">Dataset:</span>
          <a :href="selectedCard.Dataset.Url" target="_blank" class="text-blue-500 underline">
            {{ selectedCard.Dataset.Name }}
          </a>
        </div>

        <div class="flex items-center space-x-1" v-if="selectedCard.TechStack.Languages.length">
          <span class="font-semibold text-black dark:text-gray-100">Languages:</span>
          <span class="text-black dark:text-gray-200">{{ selectedCard.TechStack.Languages.join(', ') }}</span>
        </div>

        <div class="flex items-center space-x-1" v-if="selectedCard.Type === 'AI'">
          <span class="font-semibold text-black dark:text-gray-100">Evaluation Metrics:</span>
          <div class="space-x-1">
            <button type="button" @click="this.isShowCfs = false; this.isShowChart = !this.isShowChart"
              class="text-orange-400 dark:text-orange-600"
              :class="this.isShowChart ? 'text-orange-700 dark:text-orange-400' : true">Scalar Metrics</button>
            <span class="font-bold text-gray-600">|</span>
            <button type="button" @click="this.isShowChart = false; this.isShowCfs = !this.isShowCfs"
              class="text-orange-400 dark:text-orange-600"
              :class="this.isShowCfs ? 'text-orange-700 dark:text-orange-400' : true">Confussion Matrix</button>
          </div>
        </div>

        <div class="w-full max-h-36 flex" v-if="selectedCard.Type === 'AI'">
          <ScalarChart v-if="this.isShowChart"></ScalarChart>
          <img src="https://glassboxmedicine.com/wp-content/uploads/2019/02/confusion-matrix.png?w=816"
            alt="Confussion Matrix" class="w-full inline-flex" v-if="this.isShowCfs" />
        </div>

        <div class="flex items-center space-x-1" v-if="selectedCard.TechStack.FrontEnd.length">
          <span class="font-semibold text-black dark:text-gray-100">Frontend:</span>
          <span class="text-black dark:text-gray-200">{{ selectedCard.TechStack.FrontEnd.join(', ') }}</span>
        </div>

        <div class="flex items-center space-x-1" v-if="selectedCard.TechStack.BackEnd.length">
          <span class="font-semibold text-black dark:text-gray-100">Backend:</span>
          <span class="text-black dark:text-gray-200">{{ selectedCard.TechStack.BackEnd.join(', ') }}</span>
        </div>

        <div class="flex items-center space-x-1" v-if="selectedCard.TechStack.Database.length">
          <span class="font-semibold text-black dark:text-gray-100">Database:</span>
          <span class="text-black dark:text-gray-200">{{ selectedCard.TechStack.Database.join(', ') }}</span>
        </div>

        <div class="flex items-center space-x-1" v-if="selectedCard.TechStack.Infrastructure.length">
          <span class="font-semibold text-black dark:text-gray-100">Infrastructure:</span>
          <span class="text-black dark:text-gray-200">{{ selectedCard.TechStack.Infrastructure.join(', ') }}</span>
        </div>

        <div class="flex items-baseline space-x-1" v-if="selectedCard.TechStack.Architecture.length">
          <span class="font-semibold text-black dark:text-gray-100">Architecture:</span>
          <span class="text-black dark:text-gray-200">{{ selectedCard.TechStack.Architecture.join(', ') }}</span>
        </div>

        <div class="flex items-center space-x-1" v-if="selectedCard.TechStack.Libraries.length">
          <span class="font-semibold text-black dark:text-gray-100">Libraries:</span>
          <span class="text-black dark:text-gray-200">{{ selectedCard.TechStack.Libraries.join(', ') }}</span>
        </div>

        <div class="flex items-center space-x-1" v-if="selectedCard.TechStack.Models.length">
          <span class="font-semibold text-black dark:text-gray-100">Models Used:</span>
          <span class="text-black dark:text-gray-200">{{ selectedCard.TechStack.Models.join(', ') }}</span>
        </div>

        <div class="flex items-center space-x-1" v-if="selectedCard.TechStack.Frameworks.length">
          <span class="font-semibold text-black dark:text-gray-100">Frameworks:</span>
          <span class="text-black dark:text-gray-200">{{ selectedCard.TechStack.Frameworks.join(', ') }}</span>
        </div>

        <div class="flex items-center space-x-1" v-if="selectedCard.TechStack.Algorithms.length">
          <span class="font-semibold text-black dark:text-gray-100">Algorithms:</span>
          <span class="text-black dark:text-gray-200">{{ selectedCard.TechStack.Algorithms.join(', ') }}</span>
        </div>

        <div class="flex items-center space-x-1" v-if="selectedCard.TechStack.TaskType.length">
          <span class="font-semibold text-black dark:text-gray-100">Task Type:</span>
          <span class="text-black dark:text-gray-200">{{ selectedCard.TechStack.TaskType.join(', ') }}</span>
        </div>

        <div class="flex items-center space-x-1">
          <span class="font-semibold text-black dark:text-gray-100">Scope:</span>
          <span class="text-black dark:text-gray-200">{{ selectedCard.Scope }}</span>
        </div>

        <div class="items-centerspace-x-1 flex" v-if="selectedCard.Members > 1">
          <span class="font-semibold text-black dark:text-gray-100">Team Role:</span>
          <span class="text-black dark:text-gray-200">{{ selectedCard.Role }}</span>
        </div>

        <div class="flex items-center space-x-2">
          <span class="font-semibold text-black dark:text-gray-100">Source code:</span>
          <a :href="selectedCard.SourceCode.GitHub || '#'"
            class="text-gray-800 duration-500 dark:text-gray-300 hover:text-gray-400 hover:dark:text-gray-600"
            target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="22" height="22" viewBox="0 0 24 24">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          <a :href="selectedCard.SourceCode.GitLab || '#'"
            class="filter duration-500 dark:hover:brightness-150 hover:brightness-125" target="_blank">
            <svg width="22" height="22" viewBox="0 -10 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg"
              fill="currentColor" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
              <g>
                <path
                  d="M128.07485,236.074667 L128.07485,236.074667 L175.17885,91.1043048 L80.9708495,91.1043048 L128.07485,236.074667 L128.07485,236.074667 Z"
                  fill="#E24329">

                </path>
                <path
                  d="M128.07485,236.074423 L80.9708495,91.104061 L14.9557638,91.104061 L128.07485,236.074423 L128.07485,236.074423 Z"
                  fill="#FC6D26">

                </path>
                <path
                  d="M14.9558857,91.1044267 L14.9558857,91.1044267 L0.641828571,135.159589 C-0.663771429,139.17757 0.766171429,143.57955 4.18438095,146.06275 L128.074971,236.074789 L14.9558857,91.1044267 L14.9558857,91.1044267 Z"
                  fill="#FCA326">

                </path>
                <path
                  d="M14.9558857,91.1045486 L80.9709714,91.1045486 L52.6000762,3.79026286 C51.1408762,-0.703146667 44.7847619,-0.701927619 43.3255619,3.79026286 L14.9558857,91.1045486 L14.9558857,91.1045486 Z"
                  fill="#E24329">

                </path>
                <path
                  d="M128.07485,236.074423 L175.17885,91.104061 L241.193935,91.104061 L128.07485,236.074423 L128.07485,236.074423 Z"
                  fill="#FC6D26">

                </path>
                <path
                  d="M241.193935,91.1044267 L241.193935,91.1044267 L255.507992,135.159589 C256.813592,139.17757 255.38365,143.57955 251.96544,146.06275 L128.07485,236.074789 L241.193935,91.1044267 L241.193935,91.1044267 Z"
                  fill="#FCA326">

                </path>
                <path
                  d="M241.193935,91.1045486 L175.17885,91.1045486 L203.549745,3.79026286 C205.008945,-0.703146667 211.365059,-0.701927619 212.824259,3.79026286 L241.193935,91.1045486 L241.193935,91.1045486 Z"
                  fill="#E24329">

                </path>
              </g>
            </svg></a>
        </div>

        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-1 animate-pulse">
            <span class="px-2 py-2 rounded-full"
              :class="selectedCard.Status === true ? 'bg-green-600 dark:bg-green-500' : 'bg-red-600 dark:bg-red-500'"></span>
            <span class="font-semibold"
              :class="selectedCard.Status === true ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'">{{
                selectedCard.Status
                  === true ? this.trans?.projects?.filter_by?.done?.[this.getLang()] :
                  this.trans?.projects?.filter_by?.in_progress?.[this.getLang()] }}</span>
          </div>

          <button type="button" class="blueBtn px-4 py-2 mt-1 text-sm font-medium text-white"
            :class="selectedCard.TryUrl === '' ? 'opacity-50 cursor-not-allowed' : true"
            :disabled="selectedCard.TryUrl === ''" @click.stop="tryProject(selectedCard.Id, selectedCard.TryUrl)">
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
import ScalarChart from '../components/DuAn/ScalarChart.vue';
import SearchBox from "../components/DuAn/SearchBox.vue";
import FilterButtons from "../components/DuAn/FilterButtons.vue";
import Ribbon from "../components/DuAn/Ribbon.vue";
import SeeMoreIcon from "../components/DuAn/SeeMoreIcon.vue";

export default {
  name: "DuAn",
  mixins: [Mixin], // Khai báo sử dụng các hàm chung
  components: { // Khai báo sử dụng các thành phần dùng chung
    LoadingSpinner,
    ScalarChart,
    SearchBox,
    FilterButtons,
    Ribbon,
    SeeMoreIcon
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