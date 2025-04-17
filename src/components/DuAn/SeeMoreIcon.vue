<template>
    <!--See More icon-->
    <div class="from-white to-transparent w-full h-16 absolute bottom-0 left-0 z-10 flex justify-center items-center bg-gradient-to-t pointer-events-none dark:from-gray-700"
        v-if="!this.isExpanded">
        <svg xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-gray-400 opacity-95 animate-pulse dark:text-gray-300" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" fill="none" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 16v-4m0 0l-2 2m2-2l2 2" />
        </svg>
    </div>
</template>

<script>
export default {
    name: "SeeMoreIcon",
    props: {
        isExpanded: Boolean
    }
}
</script>