<template>
  <!--UTF8 APP-->
  <div class="overflow-y-auto flex-1 mt-10 md:mt-0 xl:px-5">
    <!--Input-->
    <div class="p-4 space-y-3 rounded-lg border-2 border-orange-500 dark:border-[#F59E0B]">
      <!--Input Text-->
      <InputCharCount v-model:inputString="this.inputString" :placeHolder="this.trans?.tools?.labels?.base64?.placeholder?.[this.lang] || ''" :class="this.class"></InputCharCount>

      <!--Action-->
      <div class="flex justify-center items-center space-x-4">
        <button type="button" @click="this.inputString.length !== 0 ? this.executeAction('encode') : true"
          class="redBtn px-4 py-2 text-sm font-semibold text-white">{{ this.trans?.tools?.labels?.base64?.encode?.[this.lang] || '' }}</button>
        <button type="button" @click="this.inputString.length !== 0 ? this.executeAction('decode') : true"
          class="greenBtn px-4 py-2 text-sm font-semibold text-white">{{ this.trans?.tools?.labels?.base64?.decode?.[this.lang] || '' }}</button>
      </div>
    </div>
    <!--Output-->
    <div
      class="flex-col justify-center items-center p-4 py-8 mt-4 bg-gray-100 rounded-lg border-2 border-green-400 dark:bg-gray-800">
      <div class="flex justify-between items-center mb-2">
        <span class="text-lg font-bold">{{ this.trans?.tools?.labels?.base64?.output?.[this.lang] || '' }} ✍️</span>
      </div>

      <!--Output Text-->
      <OutputResult :outputString="this.outputString"></OutputResult>
    </div>
  </div>
</template>

<script>
import Mixin from "../Mixin.vue";
import InputCharCount from "./InputCharCount.vue";
import OutputResult from "./OutputResult.vue";

export default {
  name: "URL",
  components: {
    InputCharCount,
    OutputResult
  },
  mixins: [Mixin],
  data() {
    return {
      inputString: "",
      outputString: "",
      class: "blueBox border-2 focus:border-pink-400 focus:dark:border-pink-600"
    }
  },
  methods: {
    // Khu vực chứa các hàm thực thi
    // Thực hiện thao tác encode || decode
    executeAction(type) {
      type === "encode"
        ? this.outputString = encodeURIComponent(this.inputString)
        : this.outputString = decodeURIComponent(this.inputString)

    }
  }
}

</script>