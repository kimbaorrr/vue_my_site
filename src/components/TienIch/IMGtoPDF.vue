<template>
    <div class="overflow-y-auto flex-1 mt-10 md:px-5 md:mt-0">
        <div class="p-4 space-y-5 rounded-lg border-2 border-orange-500 dark:border-[#F59E0B] md:p-10">
            <div
                class="flex flex-col justify-between items-center gap-4 md:flex-row md:justify-center md:items-baseline md:gap-0 md:space-x-2">
                <input type="file" accept="image/*" multiple @change="this.handleFiles" ref="filesInput"
                    class="blueBox w-full px-2 py-1 mt-2 dark:focus:border-pink-600 focus:border-2 focus:border-pink-400 md:w-5/12" />
                <div class="w-full flex flex-row justify-between gap-2 md:w-auto md:space-x-2">
                    <button @click="this.convertToPDF" class="blueBtn w-full px-4 py-2 text-white md:w-auto"
                        :disabled="this.imagePreviews.length === 0"
                        :class="this.imagePreviews.length === 0 ? 'cursor-not-allowed bg-gray-400 dark:bg-gray-600 hover:bg-gray-400 hover:dark:bg-gray-600' : true">
                        {{ trans?.tools?.labels?.img_pdf?.convert?.[lang] || "" }}
                    </button>
                    <button @click="this.clearImages" class="redBtn w-full px-4 py-2 text-white md:w-auto">
                        {{ trans?.tools?.labels?.img_pdf?.clear?.[lang] || "" }}
                    </button>
                </div>
            </div>

            <div class="grid gap-4 text-sm text-black dark:text-white md:grid-cols-4 sm:grid-cols-2">
                <div class="col-span-2">
                    <label for="fileName" class="font-medium">{{
                        this.trans?.tools?.labels?.img_pdf?.output?.file_name?.[this.lang] || "" }}</label>
                    <input type="text" v-model="this.fileName" id="fileName" class="form-input" />
                </div>
                <div class="col-span-2">
                    <label for="pageSize" class="font-medium">{{
                        this.trans?.tools?.labels?.img_pdf?.output?.paper_size?.[this.lang] || "" }}</label>
                    <select v-model="this.selectedPageSize" id="pageSize" class="form-input">
                        <option value="a4">A4</option>
                        <option value="letter">Letter</option>
                        <option value="legal">Legal</option>
                        <option value="a3">A3</option>
                        <option value="a5">A5</option>
                        <option value="b5">B5</option>
                    </select>
                </div>
                <div class="col-span-2">
                    <label for="orientation" class="font-medium">{{
                        this.trans?.tools?.labels?.img_pdf?.output?.orient?.[this.lang] || "" }}</label>
                    <select v-model="this.selectedOrientation" id="orientation" class="form-input">
                        <option value="portrait">{{
                            this.trans?.tools?.labels?.img_pdf?.output?.orient?.portrait?.[this.lang] || "" }}</option>
                        <option value="landscape">{{
                            this.trans?.tools?.labels?.img_pdf?.output?.orient?.landscape?.[this.lang] || "" }}</option>
                    </select>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-2 py-6 border-t border-gray-600 border-dashed dark:border-gray-300 md:grid-cols-4"
                v-show="Object.keys(this.imagePreviews).length !== 0">
                <div class="h-full relative flex flex-col justify-center items-center space-y-1"
                    v-for="(img, index) in this.imagePreviews" :key="index" :draggable="true"
                    @dragstart="this.onDragStart($event, index)" @dragover="this.onDragOver($event)"
                    @drop="this.onDrop($event, index)">
                    <img :src="img" class="w-full h-full rounded-lg duration-300 cursor-move hover:opacity-80" />

                    <div @click.stop="this.deleteImage(index)"
                        class="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md duration-300 cursor-pointer hover:bg-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-trash-2 lucide-trash2-icon text-red-600">
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1="10" x2="10" y1="11" y2="17" />
                            <line x1="14" x2="14" y1="11" y2="17" />
                        </svg>
                    </div>

                    <span class="text-sm font-medium">{{ index }}</span>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import jsPDF from 'jspdf';
import Mixin from '../Mixin.vue';

export default {
    name: 'IMGtoPDF',
    mixins: [Mixin],
    data() {
        return {
            files: [],
            imagePreviews: [],
            dragIndex: null,
            selectedPageSize: 'a4',
            selectedOrientation: 'portrait',
            fileName: 'converted',
            isLoading: false,
            hoverIndex: null, // Tracking the index of hovered image
        };
    },
    methods: {

        /**
         * Xử lý tệp hình ảnh được chọn từ input.
         * 
         * @param {Event} event - Sự kiện thay đổi từ input file.
         */
        async handleFiles(event) {
            this.files = Array.from(event.target.files);
            this.imagePreviews = [];
            const maxSize = 5 * 1024 * 1024;
            const oversizedFiles = [];

            await Promise.all(this.files.map(async (file) => {
                if (file.size > maxSize) {
                    oversizedFiles.push(file.name);
                } else {
                    const base64Image = await this.readFile(file);
                    this.imagePreviews.push(base64Image);
                }
            }));

            if (oversizedFiles.length > 0) {
                const fileList = oversizedFiles.join('\n');
                this.setAlertMessage(`Dung lượng tệp vượt quá 5MB:\n${fileList}`, "warning");
            }
        },

        /**
         * Đọc nội dung tệp hình ảnh dưới dạng base64.
         * 
         * @param {File} file - Tệp hình ảnh.
         * @returns {Promise<string>} - Promise chứa dữ liệu hình ảnh dưới dạng base64.
         */
        readFile(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        },

        /**
         * Lưu chỉ số ảnh đang kéo khi bắt đầu kéo.
         * 
         * @param {DragEvent} event - Sự kiện kéo bắt đầu.
         * @param {number} index - Chỉ số của ảnh đang kéo.
         */
        onDragStart(event, index) {
            this.dragIndex = index;
            event.dataTransfer.effectAllowed = 'move';
        },

        /**
         * Xử lý sự kiện kéo khi thả ảnh vào vị trí mới.
         * 
         * @param {DragEvent} event - Sự kiện kéo.
         */
        onDragOver(event) {
            event.preventDefault();
        },

        /**
         * Thả ảnh vào vị trí mới trong danh sách ảnh.
         * 
         * @param {DragEvent} event - Sự kiện thả.
         * @param {number} index - Chỉ số vị trí mới của ảnh.
         */
        onDrop(event, index) {
            event.preventDefault();
            if (this.dragIndex === index) return;
            const movedImage = this.imagePreviews[this.dragIndex];
            this.imagePreviews.splice(this.dragIndex, 1);
            this.imagePreviews.splice(index, 0, movedImage);
            this.dragIndex = null;
        },

        /**
         * Xóa tất cả hình ảnh hiện tại.
         */
        clearImages() {
            this.imagePreviews = [];
            this.$refs.filesInput.value = "";
        },
        getImageType(base64) {
            const match = /^data:image\/(png|jpeg);/i.exec(base64);
            return match ? match[1].toUpperCase() : 'JPEG';
        },
        /**
         * Chuyển đổi các ảnh hiện tại thành một tệp PDF và tải xuống.
         */

        convertToPDF() {
            if (this.imagePreviews.length === 0) return;
            const pdf = new jsPDF({
                unit: 'mm',
                format: this.selectedPageSize,
                orientation: this.selectedOrientation,
            });
            const addImageToPDF = (img, index) => {
                return new Promise((resolve) => {
                    const imgProps = pdf.getImageProperties(img);
                    const type = this.getImageType(img);
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                    if (index > 0) pdf.addPage();
                    pdf.addImage(img, type, 0, 0, pdfWidth, pdfHeight);
                    resolve();
                });
            };
            const imagePromises = this.imagePreviews.map((img, index) => addImageToPDF(img, index));
            Promise.all(imagePromises).then(() => {
                const finalFileName = this.fileName.trim() || 'converted';
                pdf.save(`${finalFileName}.pdf`);
            });
        },


        /**
         * Xử lý sự kiện hover ảnh.
         * 
         * @param {number} index - Chỉ số ảnh.
         */
        handleHover(index) {
            this.hoverIndex = index;
        },

        /**
         * Xóa ảnh khỏi mảng `imagePreviews`.
         * 
         * @param {number} index - Chỉ số của ảnh cần xóa.
         */
        deleteImage(index) {
            this.imagePreviews.splice(index, 1);
            this.imagePreviews.length === 0 ? this.clearImages() : true;
        },
    }
};
</script>

<style>
.form-input {
    @apply blueBox w-full p-2 mt-2 focus:border-pink-400 dark:focus:border-pink-600 focus:border-2;
}
</style>
