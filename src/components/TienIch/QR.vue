<template>
    <!--QR APP-->
    <div class="overflow-y-auto flex-1 mt-10 md:mt-0 xl:px-5">
        <!--Input-->
        <div class="p-4 space-y-3 rounded-lg border-2 border-orange-500 dark:border-[#F59E0B]">
            <div class="w-full relative">
                <textarea rows="6" name="noiDung" v-model="this.qrData.noiDung"
                    @input="this.counterChar = this.qrData.noiDung.length"
                    class="w-full p-2.5 mt-2 text-sm text-black bg-white rounded-lg border border-gray-300 dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:focus:border-green-400 dark:focus:ring-green-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="Nội dung cần tạo QR..."></textarea>
                <span
                    class="char_counter absolute bottom-0 right-2.5 p-2.5 text-sm font-bold text-gray-500 dark:text-gray-400">{{
                        this.counterChar }} kí tự</span>
            </div>
            <div class="grid gap-4 text-sm text-black dark:text-white md:grid-cols-4 sm:grid-cols-2">
                <div class="col-span-2">
                    <label for="tieuDe" class="font-medium">Tiêu đề</label>
                    <input type="text" name="tieuDe" v-model="this.qrData.tieuDe"
                        class="w-full p-2.5 mt-2 bg-white rounded-lg border border-gray-300 dark:placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-green-400 dark:focus:ring-green-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500">
                </div>

                <div class="col-span-2">
                    <label for="tieuDeCon" class="font-medium">Tiêu đề con</label>
                    <input type="text" name="tieuDeCon" v-model="this.qrData.tieuDeCon"
                        class="w-full p-2.5 mt-2 bg-white rounded-lg border border-gray-300 dark:placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-green-400 dark:focus:ring-green-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500">
                </div>

                <div class="col-span-2">
                    <label for="mauSac" class="font-medium">Màu sắc</label>
                    <input type="color" name="mauSac" v-model="this.qrData.mauSac"
                        class="p-[1.31rem] w-full mt-2 bg-white rounded-lg border border-gray-300 dark:placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-green-400 dark:focus:ring-green-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500">
                </div>

                <div class="col-span-2">
                    <label for="hinhAnh" class="font-medium">Chèn ảnh</label>
                    <input name="hinhAnh" v-on:change="this.qrData.hinhAnh"
                        class="w-full p-2 mt-2 bg-white rounded-lg border border-gray-300 dark:placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-green-400 dark:focus:ring-green-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                        type="file">
                </div>
            </div>
        </div>
        <!--Output-->
        <div
            class="hidden flex-col justify-center items-center p-4 py-12 mt-4 bg-gray-100 rounded-lg border-2 border-red-400 dark:bg-gray-800">
            <div class="pb-6" ref="qrCode"></div>
            <div></div>
        </div>
    </div>
</template>

<script>
import QRCode from 'easyqrcodejs';
export default {
    name: "QR",
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