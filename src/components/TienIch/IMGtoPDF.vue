<template>
    <div class="overflow-y-auto flex-1 mt-10 md:px-5 md:mt-0">
        <div class="p-4 space-y-5 rounded-lg border-2 border-orange-500 dark:border-[#F59E0B] md:p-10">
            <div class="flex flex-row justify-center items-baseline space-x-2">
                <input type="file" accept="image/*" multiple @change="this.handleFiles" ref="filesInput"
                    class="blueBox w-5/12 px-2 py-1 mt-2 dark:focus:border-pink-600 focus:border-2 focus:border-pink-400" />
                <button @click="this.convertToPDF" class="blueBtn px-4 py-2 text-white">
                    {{ trans?.tools?.labels?.img_pdf?.convert?.[lang] || "" }}
                </button>
                <button @click="this.clearImages" class="redBtn px-4 py-2 text-white">
                    {{ trans?.tools?.labels?.img_pdf?.clear?.[lang] || "" }}
                </button>
            </div>

            <div class="grid grid-cols-2 gap-2 py-6 border-t border-gray-600 border-dashed dark:border-gray-300 md:grid-cols-4"
                v-show="Object.keys(this.imagePreviews).length > 0">
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
            await Promise.all(this.files.map(async (file) => {
                const base64Image = await this.readFile(file);
                this.imagePreviews.push(base64Image);
            }));
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
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                    if (index > 0) pdf.addPage();
                    pdf.addImage(img, 'JPEG', 0, 0, pdfWidth, pdfHeight);
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
        },
    }
};
</script>

<style scoped>
.form-input {
    @apply blueBox w-full p-2 mt-2 focus:border-pink-400 dark:focus:border-pink-600 focus:border-2;
}
</style>
