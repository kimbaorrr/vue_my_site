<template>
    <!-- Back To Top -->
    <button type="button" @click="this.backToTop" v-show="this.isShowBackToTop"
        class="blueBox fixed right-5 bottom-5 p-3 text-white bg-red-700 rounded-full border-0 dark:bg-red-600 dark:hover:bg-red-500 focus:outline-none hover:bg-red-800">
        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
        </svg>
    </button>
</template>

<script>
export default {
    name: "BackToTop",
    props: {
        backToTop: Function,
        isShowBackToTop: Boolean
    }
}
</script>