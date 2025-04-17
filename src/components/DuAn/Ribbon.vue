<template>
    <!--In Progress Ribbon-->
    <div class="w-full h-full overflow-hidden absolute top-0 right-0 pointer-events-none" v-if="this.isShowRibbon">
        <div
            class="py-[2px] right-[-30px] top-[22px] transform w-[120px] overflow-visible absolute text-xs font-medium text-center text-white bg-red-600 rotate-45">
            {{ this.trans?.projects?.filter_by?.in_progress?.[this.getLang] || "" }}
        </div>
    </div>
</template>

<script>
export default {
    name: "Ribbon",
    props: {
        isShowRibbon: Boolean,
        trans: Object,
        getLang: Function
    }
}
</script>