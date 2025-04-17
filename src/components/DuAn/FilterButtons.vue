<template>
    <div class="space-y-2 text-sm font-semibold text-gray-900 dark:text-gray-100 sm:space-y-0">
      <button
        type="button"
        @click="this.$emit('update:filterType', 'all')"
        :class="this.filterType === 'all' ? 'border-blue-500' : 'border-gray-300 dark:border-gray-500'"
        class="px-4 py-2 bg-transparent border-b-4 duration-500 dark:hover:bg-gray-600 hover:bg-gray-200 sm:w-36">
        {{ this.trans?.projects?.filter_by?.all?.[this.getLang] || "" }}
      </button>
  
      <button
        type="button"
        @click="this.$emit('update:filterType', 'in_progress')"
        :class="this.filterType === 'in_progress' ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'"
        class="px-4 py-2 bg-transparent border-b-4 duration-500 dark:hover:bg-gray-600 hover:bg-gray-200 sm:w-36">
        {{ this.trans?.projects?.filter_by?.in_progress?.[this.getLang] || "" }}
      </button>
  
      <button
        type="button"
        @click="this.$emit('update:filterType', 'done')"
        :class="this.filterType === 'done' ? 'border-green-500' : 'border-gray-300 dark:border-gray-500'"
        class="px-4 py-2 bg-transparent border-b-4 duration-500 dark:hover:bg-gray-600 hover:bg-gray-200 sm:w-36">
        {{ this.trans?.projects?.filter_by?.done?.[this.getLang] || "" }}
      </button>
    </div>
  </template>
  

<script>
export default {
    name: "FilterButtons",
    props: {
        filterType: String,
        trans: Object,
        getLang: Function
    },
    emits: ['update:filterType']
}
</script>