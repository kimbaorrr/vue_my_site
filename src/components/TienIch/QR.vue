<template>
    <!--QR APP-->
    <div class="overflow-y-auto flex-1 mt-10 md:mt-0 xl:px-5">
        <!--Input-->
        <div class="p-4 space-y-3 rounded-lg border-2 border-orange-500 dark:border-[#F59E0B]">
            <!--Input Text-->
            <InputCharCount v-model:inputString="this.inputString" :placeHolder="this.trans?.tools?.labels?.qr?.placeholder?.[this.lang] || ''" :class="this.class"></InputCharCount>

            <div class="grid gap-4 text-sm text-black dark:text-white md:grid-cols-4 sm:grid-cols-2">
                <div class="col-span-2">
                    <label for="tieuDe" class="font-medium">{{ this.trans?.tools?.labels?.qr?.title?.[this.lang] || ''}}</label>
                    <input type="text" name="tieuDe" v-model="this.title" class="form-input" />
                </div>

                <div class="col-span-2">
                    <label for="tieuDeCon" class="font-medium">{{ this.trans?.tools?.labels?.qr?.subtitle?.[this.lang] || ''}}</label>
                    <input type="text" name="tieuDeCon" v-model="this.subTitle" class="form-input" />
                </div>

                <div class="col-span-2">
                    <label for="mauSac" class="font-medium">{{ this.trans?.tools?.labels?.qr?.color?.[this.lang] || ''}}</label>
                    <input type="color" name="mauSac" v-model="this.color" class="form-input p-[1.15rem]" />
                </div>

                <div class="col-span-2">
                    <label for="hinhAnh" class="font-medium">{{ this.trans?.tools?.labels?.qr?.image?.[this.lang] || ''}}</label>
                    <input type="file" @change="this.handleImageUpload" class="form-input p-[0.35rem]" />
                </div>
            </div>
        </div>

        <!--Output-->
        <div class="flex flex-col justify-center items-center p-4 py-12 mt-4 bg-gray-100 rounded-lg border-2 border-green-400 dark:bg-gray-800"
            id="outputQR">
            <QrcodeVue :value="this.inputString" :size="220" :foreground="this.color" level="H" render-as="svg">
            </QrcodeVue>
            <p class="mt-4 font-semibold text-center">{{ this.title }}</p>
            <p class="text-sm text-center">{{ this.subTitle }}</p>
            <button type="button" @click="this.downloadSvgAsImage('#outputQR svg')"
                class="blueBtn px-4 py-2 mt-1.5 font-medium text-white">{{ this.trans?.tools?.labels?.qr?.download?.[this.lang] || ''}}</button>
        </div>
    </div>
</template>


<script>
import QrcodeVue from 'qrcode.vue'
import InputCharCount from "./InputCharCount.vue";
import Mixin from "../Mixin.vue";

export default {
    name: "QR",
    mixins: [Mixin],
    components: {
        InputCharCount,
        QrcodeVue
    },
    data() {
        return {
            inputString: "",
            title: "",
            subTitle: "",
            color: "#000000",
            logo: null,
            class: "blueBox border-2 focus:border-pink-400 focus:dark:border-pink-600"
        };
    },
    methods: {
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                this.logo = e.target.result;
            };
            reader.readAsDataURL(file);
        }
        
    }
};
</script>


<style>
.form-input {
    @apply blueBox w-full p-2 mt-2 focus:border-pink-400 dark:focus:border-pink-600 focus:border-2;
}
</style>