<template>
    <!--Base64 APP-->
    <div class="overflow-y-auto flex-1 mt-10 md:mt-0 xl:px-5">
        <div class="p-4 space-y-3 rounded-lg border-2 border-orange-500 dark:border-orange-800">
            <div class="w-full relative">
                <textarea rows="6" name="noiDung" @input="this.counterChar = base64Data.inputString.length"
                    autofocus="true" v-model="this.base64Data.inputString"
                    class="textarea_counter w-full block p-2.5 pb-8 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Nội dung cần Encode/Decode..."></textarea>
                <span class="char_counter absolute bottom-0 right-2.5 p-2.5 text-sm font-bold text-gray-500">{{
                    this.counterChar }}
                    kí tự</span>
            </div>
            <div class="flex justify-center items-center space-x-4">
                <button type="button" @click="executeAction('encode')"
                    class="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none hover:bg-red-700">Encode</button>
                <button type="button" @click="executeAction('decode')"
                    class="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none hover:bg-green-700">Decode</button>
            </div>
        </div>
        <div
            class="flex-col justify-center items-center p-4 py-8 mt-4 bg-gray-100 rounded-lg border-2 border-red-400 dark:bg-gray-800">
            <div class="flex justify-between items-center mb-2">
                <span class="text-lg font-bold">Base64 Output ✍️</span>
                <a href="#"
                    class="mt-0.5 text-sm text-blue-500 dark:text-blue-600 dark:hover:text-blue-400 hover:text-blue-800">Xuất
                    dữ liệu (.txt)</a>
            </div>
            <textarea rows="8" @click="outputCopied"
                class="w-full p-2.5 pb-8 mt-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 focus:ring-blue-500"
                readonly v-model="this.base64Data.outputString"></textarea>
            <p v-if="this.isCopied" class="text-xs italic text-gray-600 dark:text-gray-400">Đã sao chép vào clipboard !
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Base64",
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