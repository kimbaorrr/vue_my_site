<template>
    <!-- Mobile Nav -->
  <nav v-if="this.isToggleMenuClicked">
    <div
      class="w-full h-full fixed inset-0 top-0 left-0 z-30 flex justify-center items-center bg-gray-100 opacity-95 dark:bg-gray-800">
      <div class="relative flex flex-col px-3 space-y-4 text-lg font-semibold sm:px-6 xl:px-0">
        <button @click="this.$emit('close')"
          class="-top-10 right-[-13rem] w-full absolute text-xl text-gray-800 transition duration-300 dark:text-white hover:text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-x"
            viewBox="0 0 16 16">
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </button>
        <RouterLink to="/" @click="$emit('close')"
          :class="$route.path === '/' ? 'bg-gray-300 dark:bg-red-700 transition' : true"
          class="w-full px-8 py-4 text-center rounded-lg transition duration-300 dark:hover:bg-gray-700 hover:bg-gray-200">
          {{ this.trans.nav.home[this.currentLang] || ""}}</RouterLink>
        <RouterLink to="/du-an" @click="$emit('close')"
          :class="$route.path === '/du-an' ? 'bg-gray-300 dark:bg-red-700 transition' : true"
          class="w-full px-8 py-4 text-center rounded-lg transition duration-300 dark:hover:bg-gray-700 hover:bg-gray-200">
          {{ this.trans.nav.project[this.currentLang] || ""}}</RouterLink>
        <RouterLink to="/tien-ich" @click="$emit('close')"
          :class="$route.path === '/tien-ich' ? 'bg-gray-300 dark:bg-red-700 transition' : true"
          class="w-full px-8 py-4 text-center rounded-lg transition duration-300 dark:hover:bg-gray-700 hover:bg-gray-200">
          {{ this.trans.nav.tool[this.currentLang] || ""}}</RouterLink>
        <RouterLink to="/ly-lich" @click="$emit('close')"
          :class="$route.path === '/ly-lich' ? 'bg-gray-300 dark:bg-red-700 transition' : true"
          class="w-full px-8 py-4 text-center rounded-lg transition duration-300 dark:hover:bg-gray-700 hover:bg-gray-200">
          {{ this.trans.nav.cv[this.currentLang] || ""}}</RouterLink>
        <RouterLink to="/lien-he" @click="$emit('close')"
          :class="$route.path === '/lien-he' ? 'bg-gray-300 dark:bg-red-700 transition' : true"
          class="w-full px-8 py-4 text-center rounded-lg transition duration-300 dark:hover:bg-gray-700 hover:bg-gray-200">
          {{ this.trans.nav.contact[this.currentLang] || ""}}</RouterLink>
      </div>

    </div>
  </nav>
</template>

<script>
export default {
    name: "MobileNav",
    props: {
        trans: Object,
        isToggleMenuClicked: Boolean,
        currentLang: String
    }
}

</script>