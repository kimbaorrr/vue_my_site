<template>
    <!--Base64 APP-->
    <div class="flex-1 mt-10 md:mt-0 xl:px-5 overflow-y-auto">
        <div class="space-y-3 border-2 border-orange-500 dark:border-orange-800 p-4 rounded-lg">
            <div class="relative w-full">
                <textarea rows="6" name="noiDung" @input="this.counterChar = base64Data.inputString.length" autofocus="true"
                    v-model="this.base64Data.inputString"
                    class="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 pb-8 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg w-full text-gray-900 text-sm textarea_counter focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
                    placeholder="Nội dung cần Encode/Decode..."></textarea>
                <span class="right-2.5 bottom-0 absolute p-2.5 font-bold text-gray-500 text-sm char_counter">{{
                    this.counterChar }}
                    kí tự</span>
            </div>
            <div class="flex justify-center items-center space-x-4">
                <button type="button" @click="executeAction('encode')"
                    class="bg-red-600 hover:bg-red-700 dark:hover:bg-red-700 dark:bg-red-600 px-4 py-2 rounded-lg font-semibold text-sm text-white focus:outline-none">Encode</button>
                <button type="button" @click="executeAction('decode')"
                    class="bg-green-600 hover:bg-green-700 dark:hover:bg-green-700 dark:bg-green-600 px-4 py-2 rounded-lg font-semibold text-sm text-white focus:outline-none">Decode</button>
            </div>
        </div>
        <div
            class="flex-col justify-center items-center border-2 bg-gray-100 dark:bg-gray-800 mt-4 py-8 p-4 border-red-400 rounded-lg">
            <div class="flex justify-between items-center mb-2">
                <span class="font-bold text-lg">Base64 Output ✍️</span>
                <a href="#" class="mt-0.5 text-blue-500 text-sm hover:text-blue-800 dark:text-blue-600 dark:hover:text-blue-400">Xuất dữ liệu (.txt)</a>
            </div>
            <textarea rows="8" @click="outputCopied"
                class="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 mt-2 p-2.5 pb-8 border focus:border-blue-500 rounded-lg w-full text-gray-900 text-sm focus:ring-blue-500 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:text-white dark:focus:ring-blue-500"
                readonly v-model="this.base64Data.outputString"></textarea>
            <p v-if="this.isCopied" class="text-xs text-gray-600 italic dark:text-gray-400">Đã sao chép vào clipboard !</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "TienIch_Base64",
    data() {
        return {
            counterChar: 0, // Đếm số kí tự đã nhập vào InputString
            base64Data: { // Tập dữ liệu các chuỗi đầu vào, đầu ra
                inputString: "",
                outputString: ""
            },
            isCopied: false // Trạng thái nhấn vào Output, true nếu đã nhấn và thực hiện copy vào clipboard
        }
    },
    methods: {
        // Khu vực chứa các hàm thực thi
        // Thực hiện thao tác encode hoặc decode
        executeAction(type) {
            type === "encode"
                ? this.base64Data.outputString = btoa(encodeURIComponent(this.base64Data.inputString))
                : this.base64Data.outputString = decodeURIComponent(atob(this.base64Data.inputString))

        },
        // Thực thi copy outputString vào clipboard
        outputCopied() {
            if (this.base64Data.outputString.length > 0) {
                navigator.clipboard.writeText(this.base64Data.outputString);
                this.isCopied = true;
            }
        }
    },
    watch: {
        // Khu vực theo dõi trạng thái phần tử
        "base64Data.inputString"(newValue) {
            this.counterChar = newValue.length;
            this.isCopied = false;
        }
    }
}

</script>