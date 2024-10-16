<template>
    <!--Personal Info Card-->
    <div class="xl:block hidden">
        <!--Loading Spinner-->
        <div class="flex justify-center items-center h-4/6" v-if="isLoading">
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
        <!--Card content-->
        <div class="z-10 hover:z-50 mb-8 xl:mb-0 transition-all duration-200 ease-out scale-100 xl:hover:scale-[1.15]"
            style="perspective: 600px;" v-if="infoData !== null && Object.keys(infoData).length > 0 && !isLoading">
            <div
                class="flex flex-col bg-white dark:bg-dark shadow-gray-200 shadow-lg dark:shadow-green-700 xl:rounded-3xl transition-all duration-200 overflow-hidden ease-out outline outline-1 outline-gray-100 dark:outline-gray-600">
                <img alt="HinhDD" width="550" height="350" decoding="async" fetchpriority="high"
                    class="rounded-xl object-cover w-full" src="/src/assets/imgs/person.jpg"
                    style="object-position: 50% 16%; aspect-ratio: 17 / 11;">
                <div class="xl:block hidden xl:px-6 py-4">
                    <h3 class="font-semibold text-gray-800 text-xl dark:text-white">{{ infoData.full_name }}</h3>
                    <h5 class="py-2 text-gray-700 dark:text-gray-300">{{ infoData.job }} | Sở thích {{ infoData.favorite
                        }}</h5>
                    <div class="space-y-4 mt-4 mb-2 text-black dark:text-gray-100">
                        <div class="flex items-center text-gray-700 dark:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-mortarboard" viewBox="0 0 16 16">
                                <path
                                    d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z" />
                                <path
                                    d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z" />
                            </svg>
                            <p class="flex items-center space-x-1 px-2">
                                <span>{{ infoData.workplace }}</span>
                            </p>
                        </div>
                        <div class="flex items-center text-gray-700 dark:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-geo-alt" viewBox="0 0 16 16">
                                <path
                                    d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            </svg>
                            <p class="px-2">{{ infoData.address }} <span class="inline-flex absolute ml-1 pt-px">
                                    <i class="inline-block twa twa-flag-vietnam twa-lg"></i>
                                </span>
                            </p>
                        </div>
                        <div class="flex items-center text-gray-700 dark:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-envelope" viewBox="0 0 16 16">
                                <path
                                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                            </svg>
                            <a class="px-2" :href="'mailto:' + infoData.mail">{{ infoData.mail }}</a>
                        </div>
                        <div class="flex items-center gap-2.5 text-gray-700 dark:text-gray-200 ml-[0.20rem]">
                            <a target="_blank" :href="infoData.git_url"
                                class="flex items-center text-sm hover:underline">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-github" viewBox="0 0 16 16">
                                    <path
                                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                                </svg>
                                <span class="ml-px text-gray-500">/</span>
                                <span class="ml-0.5">{{ infoData.git_name }}</span>
                            </a>
                            <span class="text-gray-400 dark:text-gray-500">|</span>
                            <a target="_blank" :href="infoData.x_url" class="flex items-center text-sm hover:underline">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-twitter-x" viewBox="0 0 16 16">
                                    <path
                                        d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                                </svg>
                                <span class="ml-px text-gray-500">/</span>
                                <span class="ml-0.5">{{ infoData.x_name }}</span>
                            </a>
                        </div>
                    </div>
                </div>
                <!--Color Bar-->
                <span class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 h-1.5"></span>
            </div>
        </div>
    </div>
</template>

<script>
import Mixin from "./Mixin.vue";
export default {
    name: "CardInfo",
    mixins: [Mixin],
    data() {
        return {
            infoData: [], // Danh sách thông tin cá nhân dạng JSON
            isLoading: true // Đã load dữ liệu xong chưa ?
        }
    },
    async mounted() {
        // Khu vực sẽ thực thi sau khi load xong DOM
        this.isLoading = true; // Hiển thị loading spinner
        this.infoData = await this.getInfo(); // Dữ liệu thông tin cá nhân dưới dạng JSON
        this.isLoading = false; // Ẩn loading spinner
    },
}
</script>