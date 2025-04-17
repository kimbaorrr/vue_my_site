<template>
    <!--Search Bar-->
    <div class="flex items-center mt-4 sm:mt-0">
          <div class="w-full relative group sm:w-auto">
            <div
              class="absolute inset-y-0 left-3 right-7 flex items-center opacity-50 transition-transform duration-500 ease-in-out translate-x-full pointer-events-none group-focus-within:opacity-100 group-focus-within:translate-x-0">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="text" :placeholder="this.trans?.projects?.search_box?.placeholder?.[this.getLang] || ''"
              @input="$emit('update:searchText', $event.target.value)"
              class="w-full py-2 ps-8 text-sm text-black bg-gray-50 rounded-md border-2 border-gray-400 duration-300 dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:w-auto">
          </div>
        </div>
</template>

<script>
export default {
    name: "SearchBox",
    props: { // Các tham số nhận từ component cha
        trans: Object,
        searchText: String,
        getLang: Function
    },
    emits: ['update:searchText'] // Truyền ngược lên component cha
}
</script>