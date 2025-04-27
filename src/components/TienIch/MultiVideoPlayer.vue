<template>
    <div class="overflow-y-auto flex-1 mt-10 md:px-2 md:mt-0">
        <div class="border-[#F59E0B] p-4 space-y-5 rounded-lg border-2 dark:border-[#FBBF24]"
            :class="{ 'fullscreen-grid': this.isFullscreen }" ref="gridContainer">
            <!--Input Text-->
            <InputCharCount v-model:inputString="this.inputText"
                :placeHolder="this.trans?.tools?.labels?.multi_player?.input_text?.placeholder?.[this.lang] || ''"
                :class="'focus:border-pink-400 dark:focus:border-pink-600'" :rows="'5'">
            </InputCharCount>

            <!--Read links from file-->
            <a href="#" @click.prevent="this.triggerFileInput" class="text-sm font-medium text-blue-500">
                {{ this.trans?.tools?.labels?.multi_player?.from_txt?.[this.lang] || '' }}
            </a>
            <input type="file" ref="fileInput" class="hidden" @change="this.loadTextFromFile" />

            <!--Action Buttons-->
            <div class="flex flex-col justify-between gap-4 text-sm md:flex-row md:items-center md:space-y-0">
                <!--Left Buttons-->
                <div class="flex space-x-2">
                    <button @click="this.loadVideos" class="blueBtn px-4 py-2 text-white"
                        :disabled="this.inputText.length === 0"
                        :class="this.inputText.length === 0 ? 'bg-gray-400 dark:bg-gray-600' : true">
                        {{ this.trans?.tools?.labels?.multi_player?.load?.[this.lang] || '' }}
                    </button>

                    <button @click="this.clearVideos" class="redBtn px-4 py-2 text-white"
                        :disabled="this.videoList.length === 0"
                        :class="this.videoList.length === 0 ? 'bg-gray-400 dark:bg-gray-600' : true">
                        {{ this.trans?.tools?.labels?.multi_player?.remove?.[this.lang] || '' }}
                    </button>
                </div>

                <!--Right Buttons-->
                <div class="flex space-x-2">
                    <button @click="this.playVideos"
                        class="blueBtn flex items-center px-4 py-2 text-white bg-gray-700 hover:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-play">
                            <path d="M5 3v18l15-9-15-9z" />
                        </svg>
                    </button>

                    <button @click="this.pauseVideos"
                        class="blueBtn flex items-center px-4 py-2 text-white bg-gray-700 hover:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-pause">
                            <path d="M6 19h4V5H6zM14 5v14h4V5z" />
                        </svg>
                    </button>



                    <button @click="this.backVideos"
                        class="blueBtn flex items-center px-4 py-2 text-white bg-gray-700 hover:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-skip-back lucide-skip-back-icon">
                            <polygon points="19 20 9 12 19 4 19 20" />
                            <line x1="5" x2="5" y1="19" y2="5" />
                        </svg>
                    </button>

                    <button @click="this.fowardVideos"
                        class="blueBtn flex items-center px-4 py-2 text-white bg-gray-700 hover:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-skip-forward lucide-skip-forward-icon">
                            <polygon points="5 4 15 12 5 20 5 4" />
                            <line x1="19" x2="19" y1="5" y2="19" />
                        </svg>
                    </button>

                    <button @click="this.restartVideos"
                        class="blueBtn flex items-center px-4 py-2 text-white bg-gray-700 hover:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-rotate-ccw lucide-rotate-ccw-icon">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                        </svg>
                    </button>

                    <button @click="this.toggleFullscreen"
                        class="blueBtn flex items-center px-4 py-2 text-white bg-gray-700 hover:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-fullscreen lucide-fullscreen-icon">
                            <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                            <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                            <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                            <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                            <rect width="10" height="8" x="7" y="8" rx="1" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="border-t border-gray-500 border-dashed"></div>

            <!--Video Players-->
            <div :class="this.gridClass" class="max-h-screen overflow-y-auto grid grid-cols-1 gap-1" ref="videoGrid">
                <VideoPlayer v-for="(url, index) in this.videoList" :key="index" :video_src="url" ref="videoPlayer" />
            </div>
        </div>
    </div>
</template>

<script>
import VideoPlayer from '../VideoPlayer.vue';
import InputCharCount from './InputCharCount.vue';
import Mixin from '../Mixin.vue';

export default {
    name: 'MultiVideoPlayer',
    mixins: [Mixin],
    components: {
        VideoPlayer,
        InputCharCount
    },
    data() {
        return {
            inputText: '',
            videoList: [],
            isFullscreen: false
        };
    },
    computed: {
        gridClass() {
            const count = this.videoList.length;
            if (count == 1) return '';
            if (count <= 4) return 'md:grid-cols-2';
            if (count <= 9) return 'md:grid-cols-3';
            return 'md:grid-cols-4';
        }
    },
    methods: {
        triggerFileInput() {
            this.$refs.fileInput.click();
        },

        async loadTextFromFile(event) {
            const file = event.target.files[0];
            if (file && file.type === 'text/plain') {
                try {
                    const content = await this.readTextFile(file);
                    this.inputText += `\n${content}`;
                } catch (error) {
                    this.setAlertMessage("Đã xảy ra lỗi khi đọc tệp.", "warning");
                    this.$refs.fileInput.value = '';
                }
            } else {
                this.setAlertMessage("Vui lòng tải lên tệp .txt hợp lệ.", "warning");
                this.$refs.fileInput.value = '';

            }
        },

        readTextFile(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = e => resolve(e.target.result);
                reader.onerror = err => reject(err);
                reader.readAsText(file);
            });
        },

        loadVideos() {
            this.videoList = [];
            this.$nextTick(() => {
                this.videoList = this.inputText
                    .split('\n')
                    .map(url => url.trim())
                    .filter(Boolean);
            });
        },

        clearVideos() {
            this.videoList = [];
            this.$refs.fileInput.value = '';
        },

        async toggleFullscreen() {
            const el = this.$refs.videoGrid;
            try {
                if (!document.fullscreenElement) {
                    await el.requestFullscreen();
                    this.isFullscreen = true;
                } else {
                    await document.exitFullscreen();
                    this.isFullscreen = false;
                }
            } catch (err) {
                this.setAlertMessage("Không thể chuyển đổi chế độ toàn màn hình.", "warning");
            }
        },

        async playVideos() {
            await Promise.all(this.$refs.videoPlayer.map(player => player.play()));
        },

        async pauseVideos() {
            await Promise.all(this.$refs.videoPlayer.map(player => player.pause()));
        },

        async restartVideos() {
            await Promise.all(this.$refs.videoPlayer.map(player => player.restart()));
        },

        async fowardVideos() {
            await Promise.all(this.$refs.videoPlayer.map(player => player.forward()));
        },

        async backVideos() {
            await Promise.all(this.$refs.videoPlayer.map(player => player.back()));
        }
    }
};
</script>
