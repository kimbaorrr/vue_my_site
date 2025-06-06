<template>
    <div class="flex items-baseline space-x-1">
        <span class="font-semibold text-black dark:text-gray-100">{{
            this.trans?.projects?.card?.technical?.desc?.[this.lang] || "" }}:</span>
        <span class="text-black dark:text-gray-200">{{ this.projectData?.description?.[this.lang] || "" }}</span>
    </div>

    <div class="flex items-baseline space-x-1" v-if="this.projectData?.dataset?.name && this.projectData?.dataset?.url">
        <span class="font-semibold text-black dark:text-gray-100">{{
            this.trans?.projects?.card?.technical?.dataset?.[this.lang] || "" }}:</span>
        <a :href="this.projectData?.dataset.url" target="_blank" class="text-blue-500 underline">
            {{ this.projectData?.dataset.name }}
        </a>
    </div>

    <div class="flex items-baseline space-x-1" v-if="this.projectData?.techStack.languages.length">
        <span class="font-semibold text-black dark:text-gray-100">{{
            this.trans?.projects?.card?.technical?.lang?.[this.lang] || "" }}:</span>
        <span class="text-black dark:text-gray-200">{{ this.projectData?.techStack?.languages.join(', ') }}</span>
    </div>

    <div class="flex items-baseline space-x-1" v-if="this.projectData?.type === 'AI'">
        <span class="font-semibold text-black dark:text-gray-100">{{
            this.trans?.projects?.card?.technical?.metrics?.[this.lang] || "" }}:</span>
        <div class="space-x-1">
            <button type="button" @click="this.$emit('toggleChart'); this.$emit('closeCfs');"
                class="text-orange-400 dark:text-orange-600"
                :class="this.isShowChart ? 'text-orange-700 dark:text-orange-400' : true">{{
                    this.trans?.projects?.card?.technical?.metrics?.scalar?.[this.lang] || "" }}</button>
            <span class="font-bold text-gray-600">|</span>
            <button type="button" @click="this.$emit('toggleCfs'); this.$emit('closeChart');"
                class="text-orange-400 dark:text-orange-600"
                :class="this.isShowCfs ? 'text-orange-700 dark:text-orange-400' : true"
                :disabled="this.projectData?.evaluationMetrics?.confusionMatrix === ''">
                {{ this.trans?.projects?.card?.technical?.metrics?.matrix?.[this.lang] || "" }}
            </button>
        </div>
    </div>

    <div class="w-full max-h-36 flex" v-if="this.projectData?.type === 'AI'"
        v-show="this.isShowCfs || this.isShowChart">
        <ScalarChart v-if="this.isShowChart" :projectData="this.projectData" :selectedIndex="this.selectedIndex">
        </ScalarChart>
        <img v-bind:src="this.projectData?.evaluationMetrics?.confusionMatrix" alt="Confussion Matrix"
            class="w-full h-auto inline-flex"
            v-if="this.isShowCfs && this.projectData?.evaluationMetrics?.confusionMatrix !== ''" />
    </div>

    <div class="flex items-baseline space-x-1" v-if="this.projectData?.techStack.frontEnd.length">
        <span class="font-semibold text-black dark:text-gray-100">{{
            this.trans?.projects?.card?.technical?.fe?.[this.lang] || "" }}:</span>
        <span class="text-black dark:text-gray-200">{{ this.projectData?.techStack.frontEnd.join(', ') }}</span>
    </div>

    <div class="flex items-baseline space-x-1" v-if="this.projectData?.techStack.backEnd.length">
        <span class="font-semibold text-black dark:text-gray-100">{{
            this.trans?.projects?.card?.technical?.be?.[this.lang] || "" }}:</span>
        <span class="text-black dark:text-gray-200">{{ this.projectData?.techStack.backEnd.join(', ') }}</span>
    </div>

    <div class="flex items-baseline space-x-1" v-if="this.projectData?.techStack.database.length">
        <span class="font-semibold text-black dark:text-gray-100">{{
            this.trans?.projects?.card?.technical?.db?.[this.lang] || "" }}:</span>
        <span class="text-black dark:text-gray-200">{{ this.projectData?.techStack.database.join(', ') }}</span>
    </div>

    <div class="flex items-baseline space-x-1" v-if="this.projectData?.techStack.infrastructure.length">
        <span class="font-semibold text-black dark:text-gray-100">{{
            this.trans?.projects?.card?.technical?.inf_str?.[this.lang] || "" }}:</span>
        <span class="text-black dark:text-gray-200">{{ this.projectData?.techStack.infrastructure.join(', ') }}</span>
    </div>

    <div class="flex items-baseline space-x-1" v-if="this.projectData?.techStack.architecture.length">
        <span class="font-semibold text-black dark:text-gray-100">{{
            this.trans?.projects?.card?.technical?.arc?.[this.lang] || "" }}:</span>
        <span class="text-black dark:text-gray-200">{{ this.projectData?.techStack.architecture.join(', ') }}</span>
    </div>

    <div class="flex items-baseline space-x-1" v-if="this.projectData?.techStack.libraries.length">
        <span class="font-semibold text-black dark:text-gray-100">{{
            this.trans?.projects?.card?.technical?.lib?.[this.lang] || "" }}:</span>
        <span class="text-black dark:text-gray-200">{{ this.projectData?.techStack.libraries.join(', ') }}</span>
    </div>

    <div class="flex items-baseline space-x-1" v-if="this.projectData?.techStack.models.length">
        <span class="font-semibold text-black dark:text-gray-100">{{
            this.trans?.projects?.card?.technical?.model?.[this.lang] || "" }}:</span>
        <span class="text-black dark:text-gray-200">{{ this.projectData?.techStack.models.join(', ') }}</span>
    </div>

    <div class="flex items-baseline space-x-1" v-if="this.projectData?.techStack.frameworks.length">
        <span class="font-semibold text-black dark:text-gray-100">{{
            this.trans?.projects?.card?.technical?.framework?.[this.lang] || "" }}:</span>
        <span class="text-black dark:text-gray-200">{{ this.projectData?.techStack.frameworks.join(', ') }}</span>
    </div>

    <div class="flex items-baseline space-x-1" v-if="this.projectData?.techStack.algorithms.length">
        <span class="font-semibold text-black dark:text-gray-100">{{
            this.trans?.projects?.card?.technical?.algo?.[this.lang] || "" }}:</span>
        <span class="text-black dark:text-gray-200">{{ this.projectData?.techStack.algorithms.join(', ') }}</span>
    </div>

    <div class="flex items-baseline space-x-1" v-if="this.projectData?.techStack.taskType.length">
        <span class="font-semibold text-black dark:text-gray-100">{{
            this.trans?.projects?.card?.technical?.task_type?.[this.lang] || "" }}:</span>
        <span class="text-black dark:text-gray-200">{{ this.projectData?.techStack.taskType.join(', ') }}</span>
    </div>

    <div class="flex items-baseline space-x-1">
        <span class="font-semibold text-black dark:text-gray-100">{{
            this.trans?.projects?.card?.technical?.scope?.[this.lang] || "" }}:</span>
        <span class="text-black dark:text-gray-200">{{ this.projectData?.scope?.[this.lang] || "" }}</span>
    </div>

    <div class="flex items-baseline space-x-1" v-if="this.projectData?.Members > 1">
        <span class="font-semibold text-black dark:text-gray-100">{{
            this.trans?.projects?.card?.technical?.role?.[this.lang] || "" }}:</span>
        <span class="text-black dark:text-gray-200">{{ this.projectData?.role?.[this.lang] || "" }}</span>
    </div>

    <div class="flex items-center space-x-2">
        <span class="font-semibold text-black dark:text-gray-100">{{
            this.trans?.projects?.card?.technical?.code?.[this.lang] || "" }}:</span>
        <a :href="this.projectData?.sourceCode?.gitHub || '#'"
            class="text-gray-800 duration-500 dark:text-gray-300 hover:text-gray-400 hover:dark:text-gray-600"
            target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="22" height="22" viewBox="0 0 24 24">
                <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        </a>

        <a :href="this.projectData?.sourceCode?.gitLab || '#'"
            class="filter duration-500 dark:hover:brightness-150 hover:brightness-125" target="_blank">
            <svg width="22" height="22" viewBox="0 -10 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
                <g>
                    <path
                        d="M128.07485,236.074667 L128.07485,236.074667 L175.17885,91.1043048 L80.9708495,91.1043048 L128.07485,236.074667 L128.07485,236.074667 Z"
                        fill="#E24329">

                    </path>
                    <path
                        d="M128.07485,236.074423 L80.9708495,91.104061 L14.9557638,91.104061 L128.07485,236.074423 L128.07485,236.074423 Z"
                        fill="#FC6D26">

                    </path>
                    <path
                        d="M14.9558857,91.1044267 L14.9558857,91.1044267 L0.641828571,135.159589 C-0.663771429,139.17757 0.766171429,143.57955 4.18438095,146.06275 L128.074971,236.074789 L14.9558857,91.1044267 L14.9558857,91.1044267 Z"
                        fill="#FCA326">

                    </path>
                    <path
                        d="M14.9558857,91.1045486 L80.9709714,91.1045486 L52.6000762,3.79026286 C51.1408762,-0.703146667 44.7847619,-0.701927619 43.3255619,3.79026286 L14.9558857,91.1045486 L14.9558857,91.1045486 Z"
                        fill="#E24329">

                    </path>
                    <path
                        d="M128.07485,236.074423 L175.17885,91.104061 L241.193935,91.104061 L128.07485,236.074423 L128.07485,236.074423 Z"
                        fill="#FC6D26">

                    </path>
                    <path
                        d="M241.193935,91.1044267 L241.193935,91.1044267 L255.507992,135.159589 C256.813592,139.17757 255.38365,143.57955 251.96544,146.06275 L128.07485,236.074789 L241.193935,91.1044267 L241.193935,91.1044267 Z"
                        fill="#FCA326">

                    </path>
                    <path
                        d="M241.193935,91.1045486 L175.17885,91.1045486 L203.549745,3.79026286 C205.008945,-0.703146667 211.365059,-0.701927619 212.824259,3.79026286 L241.193935,91.1045486 L241.193935,91.1045486 Z"
                        fill="#E24329">

                    </path>
                </g>
            </svg></a>
    </div>
</template>

<script>
import ScalarChart from './ScalarChart.vue';

export default {
    name: "TechCard",
    components: {
        ScalarChart
    },
    props: {
        projectData: Object,
        trans: Object,
        lang: String,
        isShowChart: Boolean,
        isShowCfs: Boolean,
        selectedIndex: String
    }
}
</script>