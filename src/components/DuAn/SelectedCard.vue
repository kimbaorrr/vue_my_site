<template>
    <!-- Selected Card Modal-->
    <div v-if="this.selectedCard" class="bg-opacity-50 fixed inset-0 z-50 flex justify-center items-center bg-black">
        <div
            class="w-full max-h-max overflow-y-auto relative p-6 text-sm whitespace-pre-wrap bg-white rounded-lg shadow-2xl dark:bg-gray-800 xl:w-[30%]">
            <!-- Card Header -->
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-bold text-black dark:text-white">{{ this.selectedCard.Name }}</h2>
                <!-- Close Button -->
                <button
                    class="text-xl font-bold text-gray-600 dark:text-gray-300 hover:text-red-600 hover:dark:text-red-700"
                    @click="this.$emit('close')">
                    ✕
                </button>
            </div>
            <!--Card body-->
            <div class="mt-4 space-y-2 text-sm">
                <!--Technical Info-->
                <TechCard :projectData="selectedCard" :trans="trans" :getLang="getLang" :isShowCfs="isShowCfs"
                    :isShowChart="isShowChart" @closeCfs="isShowCfs = false" @closeChart="isShowChart = false"
                    @toggleChart="isShowChart = !isShowChart" @toggleCfs="isShowCfs = !isShowCfs"></TechCard>

                <!--Card Footer-->
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-1 animate-pulse">
                        <span class="px-2 py-2 rounded-full"
                            :class="this.selectedCard.Status === true ? 'bg-green-600 dark:bg-green-500' : 'bg-red-600 dark:bg-red-500'"></span>
                        <span class="font-semibold"
                            :class="this.selectedCard.Status === true ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'">{{
                                this.selectedCard.Status
                                    === true ? this.trans?.projects?.filter_by?.done?.[this.getLang] :
                                    this.trans?.projects?.filter_by?.in_progress?.[this.getLang] }}</span>
                    </div>

                    <button type="button" class="blueBtn px-4 py-2 mt-1 text-sm font-medium text-white"
                        :class="this.selectedCard.TryUrl === '' ? 'opacity-50 cursor-not-allowed' : true"
                        :disabled="this.selectedCard.TryUrl === ''"
                        @click.stop="this.tryProject(this.selectedCard.Id, this.selectedCard.TryUrl)">
                        {{ this.trans?.projects?.card?.try?.[this.getLang] || "" }}
                    </button>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
import TechCard from './TechCard.vue';

export default {
    name: "SelectedCard",
    components: {
        TechCard
    },
    props: {
        selectedCard: Object,
        projectData: Object,
        trans: Object,
        getLang: Function,
        isShowChart: Boolean,
        isShowCfs: Boolean

    }
}
</script>