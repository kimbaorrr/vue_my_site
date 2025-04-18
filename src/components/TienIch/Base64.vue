<template>
    <div class="overflow-y-auto flex-1 mt-10 md:mt-0 xl:px-5">
        <div class="p-4 space-y-3 rounded-lg border-2 border-orange-500 dark:border-orange-800">
            <!--Input Text-->
            <InputCharCount v-model:inputString="this.inputString" :placeHolder="this.placeHolder"></InputCharCount>
            
            <!--Action-->
            <div class="flex justify-center items-center space-x-4">
                <button type="button" @click="this.executeAction('encode')"
                    class="redBtn px-4 py-2 text-sm font-semibold text-white">
                    Encode
                </button>
                <button type="button" @click="this.executeAction('decode')"
                    class="greenBtn px-4 py-2 text-sm font-semibold text-white">
                    Decode
                </button>
            </div>
        </div>

        <div
            class="flex-col justify-center items-center p-4 py-8 mt-4 bg-gray-100 rounded-lg border-2 border-red-400 dark:bg-gray-800">
            <div class="flex justify-between items-center mb-2">
                <span class="text-lg font-bold">Base64 Output ✍️</span>
            </div>
            
            <!--Output Text-->
            <OutputResult :outputString="this.outputString"></OutputResult>
        </div>
    </div>
</template>

<script>
import InputCharCount from "./InputCharCount.vue";
import OutputResult from "./OutputResult.vue";

export default {
    name: "Base64",
    components: {
        InputCharCount,
        OutputResult
    },
    data() {
        return {
            inputString: "",
            outputString: "",
            placeHolder: "Nhập nội dung cần Encode/Decode..."
        };
    },
    methods: {
        executeAction(type) {
            if (type === "encode") {
                this.outputString = btoa(encodeURIComponent(this.inputString));
            } else {
                this.outputString = decodeURIComponent(atob(this.inputString));
            }
        }

    }
};
</script>