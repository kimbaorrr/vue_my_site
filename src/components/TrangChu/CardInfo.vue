<template>
    <!--Personal Card-->
    <div class="hidden xl:block">
        <!--Loading Spinner-->
        <div class="h-full flex justify-center items-center" v-if="this.isLoading">
            <LoadingSpinner></LoadingSpinner>
        </div>
        <!--Card Content-->
        <div class="z-10 mb-8 transition-all duration-200 ease-out scale-100 hover:z-50 xl:mb-0 xl:hover:scale-[1.15]" 
            style="perspective: 600px;" v-if="!this.isLoading">
            <div
                class="overflow-hidden flex flex-col bg-white outline-1 outline-gray-100 outline shadow-lg shadow-gray-200 transition-all duration-200 ease-out dark:bg-dark dark:outline-gray-600 dark:shadow-green-700 xl:rounded-3xl">
                <img alt="HinhDD" width="550" height="350" decoding="async" fetchpriority="high"
                    class="aspect-[17/11] w-full object-cover rounded-xl" :src="this.infoData?.avatar || '#'"
                    style="object-position: 50% 16%;">
                <div class="hidden py-4 xl:block xl:px-6">
                    <h3 class="text-xl font-semibold text-gray-800 dark:text-white">{{
                        this.infoData?.fullName?.[this.lang] || ""
                    }}</h3>
                    <h5 class="py-2 text-gray-700 dark:text-gray-300">{{ this.infoData?.job?.[this.lang] || "" }} | {{
                        this.trans?.home_body?.favorite?.[this.lang] || "" }} {{
                            this.infoData?.favorite?.[this.lang] || ""
                        }}</h5>
                    <div class="mt-4 mb-2 space-y-4 text-black dark:text-gray-100">
                        <div class="flex items-center text-gray-700 dark:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-mortarboard" viewBox="0 0 16 16">
                                <path
                                    d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z" />
                                <path
                                    d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z" />
                            </svg>
                            <p class="flex items-center px-2 space-x-1">
                                <span>{{ this.infoData?.workplace?.[this.lang] || "" }}</span>
                            </p>
                        </div>
                        <div class="flex items-center text-gray-700 dark:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-geo-alt" viewBox="0 0 16 16">
                                <path
                                    d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            </svg>
                            <p class="px-2">{{ this.infoData?.address?.[this.lang] || "" }} <span
                                    class="absolute inline-flex pt-px ml-1">
                                    <i class="twa twa-flag-vietnam twa-lg inline-block"></i>
                                </span>
                            </p>
                        </div>
                        <div class="flex items-center text-gray-700 dark:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-envelope" viewBox="0 0 16 16">
                                <path
                                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                            </svg>
                            <a class="px-2" :href="'mailto:' + this.infoData?.email">{{ this.infoData?.email || ""
                                }}</a>
                        </div>
                        <div class="ml-[0.20rem] flex items-center gap-2.5 text-gray-700 dark:text-gray-200">
                            <a target="_blank" :href="this.infoData?.socials?.git?.url || '#'"
                                class="flex items-center text-sm hover:underline">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-github" viewBox="0 0 16 16">
                                    <path
                                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                                </svg>
                                <span class="ml-px text-gray-500">/</span>
                                <span class="ml-0.5">{{ this.infoData?.socials?.git?.name || "" }}</span>
                            </a>
                            <span class="text-gray-400 dark:text-gray-500">|</span>
                            <a target="_blank" :href="this.infoData?.socials?.x?.url || '#'"
                                class="flex items-center text-sm hover:underline">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-twitter-x" viewBox="0 0 16 16">
                                    <path
                                        d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                                </svg>
                                <span class="ml-px text-gray-500">/</span>
                                <span class="ml-0.5">{{ this.infoData?.socials?.x?.name || "" }}</span>
                            </a>
                        </div>
                    </div>
                </div>
                <!--Color Bar-->
                <span class="from-green-300 to-purple-600 via-blue-500 h-1.5 bg-gradient-to-r"></span>
            </div>
        </div>
    </div>
</template>

<script>
import LoadingSpinner from "../LoadingSpinner.vue";
import Mixin from "../Mixin.vue";

export default {
    name: "CardInfo",
    mixins: [Mixin],
    components: {
        LoadingSpinner
    }
}
</script>
