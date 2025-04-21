<template>
  <div class="w-full relative">
    <textarea rows="4" :value="this.inputString" @input="this.onInput" autofocus="true"
      class="blueBox textarea_counter w-full p-2.5 pb-8 text-sm" :class="this.class"
      :placeholder="this.placeHolder"></textarea>
    <span class="char_counter absolute bottom-0 right-2.5 p-2.5 text-sm font-bold text-gray-500">
      {{ this.counterChar }} {{ this.trans?.tools?.labels?.qr?.character?.[this.lang] || '' }}
    </span>
  </div>
</template>

<script>
import Mixin from '../Mixin.vue';

export default {
  name: "InputCharCount",
  props: {
    inputString: String,
    placeHolder: String,
    class: String
  },
  mixins: [Mixin],
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