<template>
    <!--QR APP-->
    <div class="overflow-y-auto flex-1 mt-10 md:mt-0 xl:px-5">
        <!--Input-->
        <div class="p-4 space-y-3 rounded-lg border-2 border-orange-500 dark:border-[#F59E0B]">
            <!--Input Text-->
            <InputCharCount v-model:inputString="this.inputString" :placeHolder="this.placeHolder"></InputCharCount>

            <div class="grid gap-4 text-sm text-black dark:text-white md:grid-cols-4 sm:grid-cols-2">
                <div class="col-span-2">
                    <label for="tieuDe" class="font-medium">Tiêu đề</label>
                    <input type="text" name="tieuDe" v-model="this.title" class="form-input" />
                </div>

                <div class="col-span-2">
                    <label for="tieuDeCon" class="font-medium">Tiêu đề con</label>
                    <input type="text" name="tieuDeCon" v-model="this.subTitle" class="form-input" />
                </div>

                <div class="col-span-2">
                    <label for="mauSac" class="font-medium">Màu sắc</label>
                    <input type="color" name="mauSac" v-model="this.color" class="form-input p-[1.31rem]" />
                </div>

                <div class="col-span-2">
                    <label for="hinhAnh" class="font-medium">Chèn ảnh</label>
                    <input type="file" @change="this.handleImageUpload" class="form-input" />
                </div>
            </div>
        </div>

        <!--Output-->
        <div class="flex flex-col justify-center items-center p-4 py-12 mt-4 bg-gray-100 rounded-lg border-2 border-red-400 dark:bg-gray-800"
            id="outputQR">
            <QrcodeVue :value="this.inputString" :size="220" :foreground="this.color" level="H" render-as="svg">
            </QrcodeVue>
            <p class="mt-4 font-semibold text-center">{{ this.title }}</p>
            <p class="text-sm text-center">{{ this.subTitle }}</p>
            <button type="button" @click="downloadSvgAsImage"
                class="blueBtn px-4 py-2 mt-1.5 font-medium text-white">Download QR</button>
        </div>
    </div>
</template>


<script>
import QrcodeVue from 'qrcode.vue'
import InputCharCount from "./InputCharCount.vue";

export default {
    name: "QR",
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
            placeHolder: "Nhập nội dung cần tạo QR..."
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
        },
        downloadSvgAsImage() {
            const svg = document.querySelector("#outputQR svg");
            const svgData = new XMLSerializer().serializeToString(svg);
            const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(svgBlob);

            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = svg.width.baseVal.value;
                canvas.height = svg.height.baseVal.value;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                const pngUrl = canvas.toDataURL("image/png");
                const downloadLink = document.createElement("a");
                downloadLink.href = pngUrl;
                downloadLink.download = "svg-to-image.png";
                downloadLink.click();

                URL.revokeObjectURL(url);
            };
            img.src = url;
        }
    }
};
</script>


<style>
.form-input {
    @apply w-full p-2.5 mt-2 bg-white rounded-lg border border-gray-300 dark:placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-green-400 dark:focus:ring-green-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500;
}
</style>