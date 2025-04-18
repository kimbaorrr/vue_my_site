<template>
    <div class="w-full relative">
      <textarea
        rows="6"
        :value="this.inputString"
        @input="this.onInput"
        autofocus="true"
        class="textarea_counter w-full block p-2.5 pb-8 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 focus:ring-blue-500"
        :placeholder="this.placeHolder"
      ></textarea>
      <span class="char_counter absolute bottom-0 right-2.5 p-2.5 text-sm font-bold text-gray-500">
        {{ this.counterChar }} kí tự
      </span>
    </div>
  </template>
  
  <script>
  export default {
    name: "InputCharCount",
    props: {
      inputString: String,
      placeHolder: String
    },
    emits: ["update:inputString"],
    data() {
      return {
        counterChar: this.inputString?.length || 0,
      };
    },
    watch: {
      inputString(newValue) {
        this.counterChar = newValue.length;
      },
    },
    methods: {
      onInput(event) {
        const value = event.target.value;
        this.counterChar = value.length;
        this.$emit("update:inputString", value);
      },
    },
  };
  </script>
  