<template>
  <div class="flex-1 mt-10 md:mt-0 xl:px-5 overflow-y-auto">
    <div class="space-y-3 border-2 border-orange-500 dark:border-orange-800 p-4 rounded-lg">
      <div class="relative w-full">
        <textarea rows="6" name="noiDung" @input="this.counterChar = this.natoData.inputString.length" autofocus="true"
          v-model="this.natoData.inputString"
          class="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 pb-8 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg w-full text-gray-900 text-sm textarea_counter focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
          placeholder="Nội dung cần Encode/Decode..."></textarea>
        <span class="right-2.5 bottom-0 absolute p-2.5 font-bold text-gray-500 text-sm char_counter">{{
          this.counterChar }}
          kí tự</span>
      </div>
      <div class="flex justify-center items-center space-x-4">
        <button type="button" @click="executeAction"
          class="bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 dark:bg-blue-600 px-4 py-2 rounded-lg font-semibold text-sm text-white focus:outline-none">Encode</button>
      </div>
    </div>
    <div
      class="flex-col justify-center items-center border-2 bg-gray-100 dark:bg-gray-800 mt-4 py-8 p-4 border-red-400 rounded-lg">
      <div class="flex justify-between items-center mb-2">
        <span class="font-bold text-lg">Nato Alphabet Output ✍️</span>
        <a href="#"
          class="mt-0.5 text-blue-500 text-sm hover:text-blue-800 dark:text-blue-600 dark:hover:text-blue-400">Xuất dữ
          liệu (.txt)</a>
      </div>
      <textarea rows="8" @click="outputCopied"
        class="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 mt-2 p-2.5 pb-8 border focus:border-blue-500 rounded-lg w-full text-gray-900 text-sm focus:ring-blue-500 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:text-white dark:focus:ring-blue-500"
        readonly v-model="this.natoData.outputString"></textarea>
      <p v-if="this.isCopied" class="text-xs text-gray-600 italic dark:text-gray-400">Đã sao chép vào clipboard !</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TienIch_Nato",
  data() {
    return {
      counterChar: 0,  // Đếm số kí tự đã nhập vào InputString
      natoData: { // Tập dữ liệu các chuỗi đầu vào, đầu ra
        inputString: "",
        outputString: ""
      },
      natoAlphabet: { // Bảng chuyển đổi kí tự sang chuẩn Nato
        'A': 'Alpha', 'B': 'Bravo', 'C': 'Charlie',
        'D': 'Delta', 'E': 'Echo', 'F': 'Foxtrot',
        'G': 'Golf', 'H': 'Hotel', 'I': 'India',
        'J': 'Juliett', 'K': 'Kilo', 'L': 'Lima',
        'M': 'Mike', 'N': 'November', 'O': 'Oscar',
        'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo',
        'S': 'Sierra', 'T': 'Tango', 'U': 'Uniform',
        'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray',
        'Y': 'Yankee', 'Z': 'Zulu'
      },
      isCopied: false // Trạng thái nhấn vào Output, true nếu đã nhấn và thực hiện copy vào clipboard
    }
  },
  methods: {
    // Khu vực chứa các hàm thực thi
    // Thực hiện thao tác encode
    executeAction() {
      this.natoData.outputString = this.natoData.inputString.toUpperCase().replace(/\s+/g, "").split("").map(char => this.natoAlphabet[char]).join(" ");
    },
    // Thực thi copy outputString vào clipboard
    outputCopied() {
      if (this.natoData.outputString.length > 0) {
        navigator.clipboard.writeText(this.natoData.outputString);
        this.isCopied = true;
      }
    }
  },
  watch: {
    // Khu vực theo dõi trạng thái phần tử
    "natoData.inputString"(newValue) {
      this.counterChar = newValue.length;
      this.isCopied = false;
      this.executeAction();
    }
  }
}

</script>