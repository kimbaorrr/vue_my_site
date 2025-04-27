<template>
    <div class="aspect-video w-full">
        <video ref="videoPlayer" class="video-js vjs-default-skin w-full h-full object-fill">
            <source :src="this.video_src" />
        </video>
    </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';

export default {
    name: 'VideoPlayer',
    props: {
        video_src: String
    },
    mounted() {
        this.player = videojs(this.$refs.videoPlayer, {
            autoplay: true,
            controls: true,
            responsive: true,
            fluid: true,
            aspectRatio: '16:9',
            muted: true,
            preload: "metadata",
            playbackRates: [0.5, 1, 1.5, 2],
            playsinline: true
        });
    },
    beforeUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    },
    methods: {
        play() {
            /**
         * Phát video nếu đối tượng player tồn tại.
         * @returns {void}
         */
            if (this.player) {
                this.player.play();
            }
        },


        pause() {
            /**
         * Tạm dừng video nếu đối tượng player tồn tại.
         * @returns {void}
         */
            if (this.player) {
                this.player.pause();
            }
        },


        restart() {
            /**
        * Khởi động lại video từ đầu và phát lại nếu đối tượng player tồn tại.
        * @returns {void}
        */
            if (this.player) {
                this.player.currentTime(0); // Đặt lại thời gian phát video về 0
                this.player.play();
            }
        },


        forward() {
            /**
         * Tua nhanh video thêm 5 giây nếu đối tượng player tồn tại.
         * @returns {void}
         */
            if (this.player) {
                const currentTime = this.player.currentTime();
                this.player.currentTime(currentTime + 5);
            }
        },


        back() {
            /**
         * Tua lùi video 5 giây nếu đối tượng player tồn tại.
         * @returns {void}
         */
            if (this.player) {
                const currentTime = this.player.currentTime();
                this.player.currentTime(Math.max(0, currentTime - 5));
            }
        }
    }

};
</script>
