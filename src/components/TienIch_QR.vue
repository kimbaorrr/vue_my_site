<template>
    <!--QR APP-->
    <div class="flex-1 mt-10 md:mt-0 xl:px-5 overflow-y-auto">
        <!--Input-->
        <div class="space-y-3 border-2 border-orange-500 dark:border-[#F59E0B] p-4 rounded-lg">
            <div class="relative w-full">
                <textarea rows="6" name="noiDung" v-model="this.qrData.noiDung" @input="this.counterChar = this.qrData.noiDung.length"
                    class="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 mt-2 p-2.5 border focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-lg w-full text-black dark:text-white text-sm focus:outline-none dark:placeholder-gray-400 dark:focus:border-green-400 dark:focus:ring-green-400"
                    placeholder="Nội dung cần tạo QR..."></textarea>
                <span class="right-2.5 bottom-0 absolute p-2.5 font-bold text-gray-500 dark:text-gray-400 text-sm char_counter">{{
                    this.counterChar }} kí tự</span>
            </div>
            <div class="gap-4 grid sm:grid-cols-2 md:grid-cols-4 text-black dark:text-white text-sm">
                <div class="col-span-2">
                    <label for="tieuDe" class="font-medium">Tiêu đề</label>
                    <input type="text" name="tieuDe" v-model="this.qrData.tieuDe"
                        class="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 mt-2 p-2.5 border focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-lg w-full focus:outline-none dark:placeholder-gray-400 dark:focus:border-green-400 dark:focus:ring-green-400">
                </div>

                <div class="col-span-2">
                    <label for="tieuDeCon" class="font-medium">Tiêu đề con</label>
                    <input type="text" name="tieuDeCon" v-model="this.qrData.tieuDeCon"
                        class="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 mt-2 p-2.5 border focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-lg w-full focus:outline-none dark:placeholder-gray-400 dark:focus:border-green-400 dark:focus:ring-green-400">
                </div>

                <div class="col-span-2">
                    <label for="mauSac" class="font-medium">Màu sắc</label>
                    <input type="color" name="mauSac" v-model="this.qrData.mauSac"
                        class="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 mt-2 p-[1.31rem] border focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-lg w-full focus:outline-none dark:placeholder-gray-400 dark:focus:border-green-400 dark:focus:ring-green-400">
                </div>

                <div class="col-span-2">
                    <label for="hinhAnh" class="font-medium">Chèn ảnh</label>
                    <input name="hinhAnh" v-on:change="this.qrData.hinhAnh"
                        class="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 mt-2 p-2 border focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-lg w-full focus:outline-none dark:placeholder-gray-400 dark:focus:border-green-400 dark:focus:ring-green-400"
                        type="file">
                </div>
            </div>
        </div>
        <!--Output-->
        <div
            class="flex-col justify-center items-center border-2 hidden bg-gray-100 dark:bg-gray-800 mt-4 py-12 p-4 border-red-400 rounded-lg">
            <div class="pb-6" ref="qrCode"></div>
            <div></div>
        </div>
    </div>
</template>

<script>
import QRCode from 'easyqrcodejs';
export default {
    name: "TienIch_QR",
    data() {
        return {
            qrData: { // Tập dữ liệu đầu vào
                noiDung: "",
                tieuDe: "",
                tieuDeCon: "",
                mauSac: "#000000",
                hinhAnh: null,
            },

            counterChar: 0 // Đếm số kí tự đã nhập vào InputString
        }
    },
    methods: {
        // Khu vực chứa các hàm thực thi
        // Thực hiện thao tác tạo QR và xuất QR
        qrCodeGenerator() {
            new QRCode(this.$refs.qrCode, {
                text: this.qrData.noiDung,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H,
                title: this.qrData.tieuDe,
                titleFont: "normal normal bold 24px Arial",
                titleColor: "#004284",
                titleHeight: 70,
                titleTop: 25,
                subTitle: this.qrData.tieuDeCon,
                subTitleFont: "normal normal normal 14px Arial",
                subTitleColor: "#002184",
                subTitleTop: 40,
                drawer: "canvas",
                PO: this.qrData.mauSac,
                PI: this.qrData.mauSac,
            });
        }
    },
    watch: {
        // Khu vực theo dõi trạng thái phần tử
        "qrData.noiDung"(newValue) {
            this.counterChar = newValue.length;
            this.qrCodeGenerator();
        }
    }
}

</script>