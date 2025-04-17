<template>
    <nav
        class="bg-white/75 overflow-hidden sticky top-0 z-40 py-3 backdrop-blur dark:bg-dark supports-backdrop-blur:bg-white/95">
        <div
            class="mx-auto max-w-3xl flex justify-between items-center px-3 text-sm md:max-w-4xl sm:px-6 xl:max-w-5xl xl:px-0">
            <!-- Left Wide Screen Nav -->
            <a href="/" class="flex items-center">
                <img alt="Logo" src="/assets/imgs/logo.png" loading="lazy" width="50" height="45" decoding="async"
                    class="mr-3 rounded-full transition duration-300 hover:blur-[2px]" />
                <p class="hidden font-semibold dark:text-white md:block">BaoIT Blog</p>
            </a>
            <!-- Right Wide Screen Nav -->
            <div class="flex items-center gap-4">
                <!-- Link Nav -->
                <div class="hidden text-sm font-semibold md:flex md:flex-row md:space-x-3 xl:space-x-1.5">
                    <ul class="flex flex-row space-x-3">
                        <li v-for="(name, link) in navLinks" :key="link">
                            <RouterLink :to="link" :class="['px-3 py-1.5 rounded transition duration-300 dark:hover:bg-gray-700 hover:bg-gray-200',
                                $route.path === link ? 'bg-gray-300 dark:bg-red-700' : ''
                            ]">
                                {{ name }}
                            </RouterLink>
                        </li>
                    </ul>
                </div>

                <div class="hidden items-center gap-1 xl:flex">
                    <span class="text-gray-400 cursor-default">|</span>
                </div>
                <!-- Icon Nav -->
                <div class="flex items-center gap-1">
                    <!--Go to Admin Page-->
                    <a href="#" aria-label="adminPage" target="_blank"
                        class="p-1.5 rounded transition duration-300 dark:hover:bg-gray-700 hover:bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-log-in lucide-log-in-icon">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                            <polyline points="10 17 15 12 10 7" />
                            <line x1="15" x2="3" y1="12" y2="12" />
                        </svg>
                    </a>

                    <!-- Question Modal -->
                    <button type="button" aria-label="questionModal" @click="this.toggleQuestionModal"
                        class="p-1.5 rounded transition duration-300 dark:hover:bg-gray-700 hover:bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-message-circle-question">
                            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                            <path d="M12 17h.01" />
                        </svg>
                    </button>
                    <!-- Change Theme -->
                    <button type="button" @click="this.toggleTheme" aria-label="changeTheme"
                        class="p-1.5 rounded transition duration-300 dark:hover:bg-gray-700 hover:bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-sun" v-show="this.currentTheme === 'light'">
                            <circle cx="12" cy="12" r="4"></circle>
                            <path d="M12 2v2"></path>
                            <path d="M12 20v2"></path>
                            <path d="m4.93 4.93 1.41 1.41"></path>
                            <path d="m17.66 17.66 1.41 1.41"></path>
                            <path d="M2 12h2"></path>
                            <path d="M20 12h2"></path>
                            <path d="m6.34 17.66-1.41 1.41"></path>
                            <path d="m19.07 4.93-1.41 1.41"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-moon" v-show="this.currentTheme === 'dark'">
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                        </svg>
                    </button>
                    <!-- Change Language -->
                    <button type="button" @click="this.toggleLang" aria-label="changeLanguage"
                        class="p-4 rounded transition duration-300 dark:hover:bg-gray-700 hover:bg-gray-200">
                        <div class="flex justify-center items-center">
                            <img alt="VN_Flag"
                                src="https://upload.wikimedia.org/wikipedia/commons/0/07/Flag_of_Vietnam-Animated.gif"
                                loading="lazy" width="18" height="18" v-if="this.currentLang === 'Vi'" class="absolute">
                            <img alt="US_Flag"
                                src="https://upload.wikimedia.org/wikipedia/commons/4/42/Animated-Flag-USA.gif"
                                loading="lazy" width="18" height="18" v-if="this.currentLang === 'En'" class="absolute">
                        </div>
                    </button>
                    <!-- Clock -->
                    <div class="p-1.5 font-semibold cursor-default">{{ this.subNavClock }}</div>
                    <!-- Toggle Menu (For Mobile Nav)-->
                    <button type="button" @click="this.$emit('toggleMobileNav')" aria-label="toggleMenu"
                        class="p-1.5 rounded transition duration-300 dark:hover:bg-gray-700 hover:bg-gray-200 md:hidden">
                        <svg width="20" height="20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "WideScreenNav",
    props: {
        currentLang: String,
        currentTheme: String,
        trans: Object,
        subNavClock: String,
        isToggleMenuClicked: Boolean,
        toggleTheme: Function,
        toggleLang: Function,
        toggleQuestionModal: Function,
        navLinks: Object
    }
}

</script>