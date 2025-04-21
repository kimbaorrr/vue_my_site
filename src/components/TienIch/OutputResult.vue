<template>
    <div>
        <textarea rows="8" @click="this.copyToClipboard(this.outputString) ? this.isCopied = true : this.isCopied = false"
            class="w-full p-2.5 pb-8 mt-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 focus:ring-blue-500"
            readonly :value="this.outputString"></textarea>
        <p v-if="this.isCopied" class="text-xs italic text-gray-600 dark:text-gray-400">
            Đã sao chép vào clipboard!
        </p>
    </div>
</template>

<script>
import Mixin from '../Mixin.vue';
export default {
    name: "OutputResult",
    mixins: [Mixin],
    props: {
        outputString: String,
    },
    data() {
        return {
            isCopied: false
        };
    }
};
</script>