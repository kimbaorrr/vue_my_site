<template>
    <video ref="videoPlayer" class="video-js vjs-default-skin w-full h-auto">
        <source :src="this.video_src" :type="this.video_type" />
    </video>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default {
    name: 'VideoPlayer',
    props: {
        video_src: String,
        video_type: String
    },
    mounted() {
        this.player = videojs(this.$refs.videoPlayer, {
            autoplay: true,
            controls: true,
            responsive: true,
            fluid: true,
            muted: true,
            preload: "meta",
            playbackRates: [0.5, 1, 1.5, 2],
            playsinline: true,
            skipButtons: {
                forward: 5,
                backward: 5
            },
            enableSmoothSeeking: true
        });
    },
    beforeUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    },
    methods: {
        play() {
            const video = this.$refs.videoPlayer;
            if (video) {
                video.play();
            }
        },
        pause() {
            const video = this.$refs.videoPlayer;
            if (video) {
                video.pause();
            }
        },
        restart() {
            const video = this.$refs.videoPlayer;
            if (video) {
                video.currentTime = 0;
                video.play();
            }
        },
        forward() {
            const video = this.$refs.videoPlayer;
            if (video) {
                video.currentTime += video.currentTime;
                video.play();
            }
        },
        back() {
            const video = this.$refs.videoPlayer;
            if (video) {
                video.currentTime -= video.currentTime;
                video.play();
            }
        }
    }
};
</script>