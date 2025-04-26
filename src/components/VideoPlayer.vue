<template>
    <div class="aspect-video w-full">
        <video ref="videoPlayer" class="video-js vjs-default-skin w-full h-full object-cover">
            <source :src="this.video_src"/>
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
            if (this.player) {
                this.player.play();
            }
        },
        pause() {
            if (this.player) {
                this.player.pause();
            }
        },
        restart() {
            if (this.player) {
                this.player.currentTime(0);
                this.player.play();
            }
        },
        forward() {
            if (this.player) {
                const currentTime = this.player.currentTime();
                this.player.currentTime(currentTime + 5);
            }
        },
        back() {
            if (this.player) {
                const currentTime = this.player.currentTime();
                this.player.currentTime(Math.max(0, currentTime - 5));
            }
        }
    }
};
</script>
