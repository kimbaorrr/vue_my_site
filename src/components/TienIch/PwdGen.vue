<template>
    <div class="overflow-y-auto flex-1 mt-10 md:px-5 md:mt-0">
        <div class="px-4 py-8 space-y-6 rounded-lg border-2 border-orange-500 dark:border-orange-800 md:px-[8rem] md:py-16">
            <div class="space-y-4">
                <span class="font-medium text-black dark:text-white">{{ this.trans?.tools?.labels?.pwdgen?.type?.[this.lang] || ""}}</span>
                <div
                    class="flex flex-row justify-center items-center p-1 space-x-2 bg-gray-200 rounded-md dark:bg-gray-400">
                    <button
                        class="w-full flex flex-row justify-center items-center px-4 py-1 text-xs font-semibold text-black rounded-md duration-500"
                        :class="this.pwdType === 0 ? 'bg-white dark:bg-gray-200' : true" @click="this.pwdType = 0"
                        aria-current="page"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-shuffle lucide-shuffle-icon me-1">
                            <path d="m18 14 4 4-4 4" />
                            <path d="m18 2 4 4-4 4" />
                            <path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22" />
                            <path d="M2 6h1.972a4 4 0 0 1 3.6 2.2" />
                            <path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" />
                        </svg>{{ this.trans?.tools?.labels?.pwdgen?.type?.options?.random?.[this.lang] || "" }}</button>
                    <button
                        class="w-full flex flex-row justify-center items-center px-4 py-1 text-xs font-semibold text-black rounded-md duration-500"
                        :class="this.pwdType === 1 ? 'bg-white dark:bg-gray-200' : true" @click="this.pwdType = 1" disabled=""
                        aria-current="page"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-lightbulb lucide-lightbulb-icon me-1">
                            <path
                                d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                            <path d="M9 18h6" />
                            <path d="M10 22h4" />
                        </svg>{{ this.trans?.tools?.labels?.pwdgen?.type?.options?.memorable?.[this.lang] || "" }}</button>
                    <button class="w-full px-4 py-1 text-xs font-semibold text-black rounded-md duration-500"
                        :class="this.pwdType === 2 ? 'bg-white dark:bg-gray-200' : true" @click="this.pwdType = 2"
                        aria-current="page"><span class="font-semibold">#</span> {{this.trans?.tools?.labels?.pwdgen?.type?.options?.pin?.[this.lang] || ""}}</button>
                </div>
            </div>




            <div class="space-y-4">
                <span class="font-medium text-black dark:text-white">{{ this.trans?.tools?.labels?.pwdgen?.customize?.[this.lang] || "" }}</span>
                <div class="flex justify-between items-center py-5 space-x-2 border-t border-b">
                    <span class="w-fit text-sm font-normal text-gray-600 dark:text-gray-300">{{ this.trans?.tools?.labels?.pwdgen?.customize?.options?.length?.[this.lang] || "" }}</span>
                    <input type="range" min="4" max="100" :value="this.pwdLength"
                        @input="this.pwdLength = $event.target.value"
                        class="w-8/12 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
                    <input type="number" aria-describedby="helper-text-explanation" :value="this.pwdLength" min="4"
                        max="100" @input="$event.target.value <= 100 ? this.pwdLength = $event.target.value : true"
                        class="w-2/12 inline-block px-2 py-1.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:focus:border-gray-600 dark:focus:ring-0 focus:border-gray-300 focus:outline-none focus:ring-0"
                        required />
                </div>
            </div>


            <div class="w-full grid grid-cols-2 gap-2 pb-5 border-b md:grid-cols-4 sm:grid-cols-2"
                v-if="this.pwdType === 0">
                <label class="max-w-[160px] mx-auto w-full flex justify-start items-center space-x-0.5 cursor-pointer">
                    <span class="text-sm font-normal text-gray-600 dark:text-gray-300">{{ this.trans?.tools?.labels?.pwdgen?.customize?.options?.numbers?.[this.lang] || "" }}</span>
                    <input type="checkbox" value="" class="peer sr-only" :checked="this.pwdOptions.includeNumbers" />
                    <div class="peer w-11 h-6 relative shrink-0 bg-gray-200 rounded-full duration-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px]
        after:bg-white after:border-gray-300 after:border after:rounded-full 
        after:h-5 after:w-5 after:transition-all 
        peer-checked:after:translate-x-[20px]
        peer-checked:after:border-white 
        dark:bg-gray-700 dark:border-gray-600 
        peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600">
                    </div>
                </label>

                <label class="max-w-[160px] mx-auto w-full flex justify-start items-center space-x-0.5 cursor-pointer">
                    <span class="text-sm font-normal text-gray-600 dark:text-gray-300">{{ this.trans?.tools?.labels?.pwdgen?.customize?.options?.symbols?.[this.lang] || "" }}</span>
                    <input type="checkbox" value="" class="peer sr-only" :checked="this.pwdOptions.includeSymbols" />
                    <div class="peer w-11 h-6 relative shrink-0 bg-gray-200 rounded-full duration-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px]
        after:bg-white after:border-gray-300 after:border after:rounded-full 
        after:h-5 after:w-5 after:transition-all 
        peer-checked:after:translate-x-[20px]
        peer-checked:after:border-white 
        dark:bg-gray-700 dark:border-gray-600 
        peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600">
                    </div>
                </label>

                <label class="max-w-[160px] mx-auto w-full flex justify-start items-center space-x-0.5 cursor-pointer">
                    <span class="text-sm font-normal text-gray-600 dark:text-gray-300">{{ this.trans?.tools?.labels?.pwdgen?.customize?.options?.lower?.[this.lang] || "" }}</span>
                    <input type="checkbox" value="" class="peer sr-only" :checked="this.pwdOptions.includeLower" />
                    <div class="peer w-11 h-6 relative shrink-0 bg-gray-200 rounded-full duration-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px]
        after:bg-white after:border-gray-300 after:border after:rounded-full 
        after:h-5 after:w-5 after:transition-all 
        peer-checked:after:translate-x-[20px]
        peer-checked:after:border-white 
        dark:bg-gray-700 dark:border-gray-600 
        peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600">
                    </div>
                </label>

                <label class="max-w-[160px] mx-auto w-full flex justify-start items-center space-x-0.5 cursor-pointer">
                    <span class="text-sm font-normal text-gray-600 dark:text-gray-300">{{ this.trans?.tools?.labels?.pwdgen?.customize?.options?.upper?.[this.lang] || "" }}</span>
                    <input type="checkbox" value="" class="peer sr-only" :checked="this.pwdOptions.includeUpper" />
                    <div class="peer w-11 h-6 relative shrink-0 bg-gray-200 rounded-full duration-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px]
        after:bg-white after:border-gray-300 after:border after:rounded-full 
        after:h-5 after:w-5 after:transition-all 
        peer-checked:after:translate-x-[20px]
        peer-checked:after:border-white 
        dark:bg-gray-700 dark:border-gray-600 
        peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600">
                    </div>
                </label>
            </div>

            <div class="space-y-5">
                <div class="flex flex-row justify-between items-center">
                    <span class="font-medium text-black dark:text-white">{{ this.trans?.tools?.labels?.pwdgen?.output?.[this.lang] || "" }}</span>
                    <div class="flex items-center space-x-1">
                        <input type="checkbox"
                            class="blueBox w-4 text-blue-600 bg-white rounded-sm border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-0"
                            :checked="this.pwdOptions.isAutoRefresh"
                            @change="this.pwdOptions.isAutoRefresh = $event.target.checked" />
                        <span class="text-sm text-gray-600 dark:text-gray-300">{{ this.trans?.tools?.labels?.pwdgen?.autorefresh?.[this.lang] || "" }}</span>
                    </div>

                </div>
                <textarea
                    class="blueBox mx-auto w-full overflow-hidden p-5 text-lg font-semibold text-center break-words"
                    rows="4" readonly v-model="this.outputString"
                    @click="this.copyToClipboard(this.outputString) ? this.isCopied = true : this.isCopied = false">

                    </textarea>
                <p v-if="this.isCopied" class="text-xs italic text-gray-600 dark:text-gray-400">
                    {{ this.trans?.tools?.labels?.pwdgen?.copied?.[this.lang] || "" }}
                </p>
            </div>

            <div class="flex justify-between items-baseline">
                <button class="blueBtn px-4 py-2 font-medium text-white"
                    @click="this.copyToClipboard(this.outputString) ? this.isCopied = true : this.isCopied = false">{{ this.trans?.tools?.labels?.pwdgen?.copy?.[this.lang] || "" }}</button>
                <button class="grayBtn px-4 py-2 font-medium text-blue-600"
                    @click="this.generatePassword(this.pwdType)">{{ this.trans?.tools?.labels?.pwdgen?.refresh?.[this.lang] || "" }}</button>
            </div>
        </div>
    </div>
</template>

<script>
import cryptoRandomStringAsync from 'crypto-random-string';
import Mixin from '../Mixin.vue';
export default {
    name: 'PwdGen',
    mixins: [Mixin],
    data() {
        return {
            pwdType: 0,
            pwdLength: 4,
            pwdOptions: {
                includeNumbers: true,
                includeSymbols: true,
                includeLower: true,
                includeUpper: true,
                isAutoRefresh: false
            },
            outputString: "",
            isCopied: false,
            intervalId: ""

        };
    },
    watch: {
        "pwdLength"(newValue) {
            if (newValue >= 4 && newValue <= 100) {
                this.generatePassword(this.pwdType)
            }
        },
        "pwdType"(newValue) {
            this.generatePassword(newValue);
            this.pwdType = newValue;
        },
        "pwdOptions.isAutoRefresh"(newValue) {
            this.autoChangePerSeconds(newValue);
        },
        "isCopied"(newValue) {
            if (newValue) {
                setTimeout(() => {
                    this.isCopied = false;
                }, 3000)
            }
        }

    },
    methods: {
        async generatePassword(type) {
            let typeStr = "ascii-printable";
            switch (type) {
                case 1:
                    typeStr = "memoriable";
                    break;
                case 2:
                    typeStr = "numeric";
                    break;
                default:
                    break;
            }
            let password = await cryptoRandomStringAsync({
                length: Number(this.pwdLength),
                type: typeStr
            });
            this.outputString = password;
        },
        autoChangePerSeconds(isAutoChange) {
            if (isAutoChange) {
                clearInterval(this.intervalId);
                this.intervalId = setInterval(() => {
                    this.generatePassword(this.pwdType);
                }, 2000);
            } else {
                clearInterval(this.intervalId);
            }
        }
    },
    mounted() {
        this.generatePassword(this.pwdType);
        this.autoChangePerSeconds(this.pwdOptions.isAutoRefresh);
    }
}
</script>