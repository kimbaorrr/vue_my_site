<template>
  <div class="overflow-y-auto flex-1 mt-10 md:mt-0 xl:px-5">
    <div class="p-4 space-y-3 rounded-lg border-2 border-orange-500 dark:border-orange-800">
      <!--Input Text-->
      <InputCharCount v-model:inputString="this.inputString" :placeHolder="this.placeHolder"></InputCharCount>

      <!--Action-->
      <div class="flex justify-center items-center space-x-4">
        <button type="button" @click="this.executeAction()"
          class="blueBtn px-4 py-2 text-sm font-semibold text-white">Encode</button>
      </div>
    </div>
    <div
      class="flex-col justify-center items-center p-4 py-8 mt-4 bg-gray-100 rounded-lg border-2 border-red-400 dark:bg-gray-800">
      <div class="flex justify-between items-center mb-2">
        <span class="text-lg font-bold">Nato Alphabet Output ✍️</span>
      </div>
      <!--Output Text-->
      <OutputResult :outputString="this.outputString"></OutputResult>
    </div>
  </div>
</template>

<script>
import InputCharCount from "./InputCharCount.vue";
import OutputResult from "./OutputResult.vue";
import removeAccents from "remove-accents";

export default {
  name: "Nato",
  components: {
    OutputResult,
    InputCharCount
  },
  data() {
    return {
      inputString: "",
      outputString: "",
      placeHolder: "Nhập nội dung cần Encode...",
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
      }
    }
  },
  methods: {
    // Khu vực chứa các hàm thực thi
    // Thực hiện thao tác encode
    executeAction() {
      const normalized = removeAccents(this.inputString)
        .toUpperCase()
        .replace(/\s+/g, "");

      this.outputString = normalized
        .split("")
        .map(char => this.natoAlphabet[char] || char)
        .join(" ");
    }
  },
  watch: {
    inputString(newValue) {
      if (newValue.length > 0) {
        this.executeAction();
      }
    }
  }
}

</script>