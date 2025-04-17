<template>
    <!-- Question Modal -->
    <div v-if="this.isOpenModal" id="questionModal"
        class="bg-opacity-55 overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center">
        <div class="w-full max-w-md max-h-full relative p-4">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex justify-between items-center p-4 rounded-t border-b dark:border-gray-600 md:p-5">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        {{ this.trans?.question?.header?.[this.getLang()] || "" }}
                    </h3>
                    <!--Close modal-->
                    <button type="button" aria-label="closeModal" @click="closeModal"
                        class="ms-auto w-8 h-8 inline-flex justify-center items-center text-sm text-gray-400 bg-transparent rounded-lg dark:hover:text-white dark:hover:bg-gray-600 hover:text-gray-900 hover:bg-gray-200">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">{{ this.trans?.question?.close?.[this.getLang()] || "" }}</span>
                    </button>
                </div>
                <!-- Modal body -->
                <form class="relative p-4 md:p-5" @submit.prevent="sendQuestion">
                    <!--Sending Spinner-->
                    <div v-if="this.isSending" class="bg-opacity-75 absolute inset-0">
                        <LoadingSpinner></LoadingSpinner>
                    </div>
                    <!--Modal content-->
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div class="col-span-2">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                                this.trans?.question?.body?.name?.[this.getLang()] || "" }} <span
                                    class="font-bold text-red-500">*</span></label>
                            <input type="text" name="name" v-model="this.formData.name"
                                class="blueBox w-full p-2.5 text-sm" placeholder="Nguyễn Văn A" required>
                        </div>
                        <div class="col-span-2">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                                this.trans?.question?.body?.email?.[this.getLang()] || "" }} <span
                                    class="font-bold text-red-500">*</span></label>
                            <input type="text" name="email" v-model="this.formData.email"
                                class="blueBox w-full p-2.5 text-sm" placeholder="abc@gmail.com" required>
                        </div>
                        <div class="col-span-2">
                            <label for="description"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                                    this.trans?.question?.body?.content?.[this.getLang()] || "" }} <span
                                    class="font-bold text-red-500">*</span></label>
                            <textarea name="content" rows="4" v-model="this.formData.content"
                                class="blueBox w-full p-2.5 text-sm" placeholder="Viết gì đó vào đây..."
                                required></textarea>
                        </div>
                    </div>
                    <button type="submit" class="blueBtn flex items-center px-4 py-2.5 space-x-1 text-white">
                        <svg fill="currentColor" width="20" height="20" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="relative text-sm font-medium">{{
                            this.trans?.question?.body?.send?.[this.getLang()] || "" }}</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import LoadingSpinner from '/src/components/LoadingSpinner.vue'
import Mixin from "./Mixin.vue"
export default {
    name: "AskQuestionModal",
    components: {
        LoadingSpinner
    },
    mixins: [Mixin],
    data() {
        return {
            isOpenModal: false, // Trạng thái đóng/mở Modal
            isSending: false, // Dữ liệu đã hoàn tất gửi lên DB hay chưa ?
            formData: {
                name: "",
                email: "",
                content: ""
            },
            trans: this.getTranslator()
        }
    },
    methods: {
        openModal() {
            /**
             * Sự kiện nhấn nút mở Ask Question Modal
             */
            this.isOpenModal = true;
        },
        closeModal() {
            /**
             * Sự kiện nhấn nút đóng Ask Question Modal
             */
            this.isOpenModal = false;
        },
        sendQuestion() {
            /**
             * Sự kiện gửi câu hỏi đến DB qua call API
             */
            this.isSending = !this.isSending;
            const formSerialized = $('#questionModal form').serialize();
            setTimeout(() => {
                $.ajax({
                    url: 'https://api.baoit.site/my_blog/dat_cau_hoi/send',
                    type: 'POST',
                    data: formSerialized,
                    success: () => {
                        this.isSending = !this.isSending;
                        alert(this.trans?.question?.body?.response?.success?.[this.getLang()] || "");
                        this.closeModal();
                    },
                    error: (xhr) => {
                        this.isSending = !this.isSending;
                        const message = JSON.parse(xhr.responseText).message;
                        alert(this.trans?.question?.body?.response?.fail?.[this.getLang()] || "" + "\n" + message);
                    }
                });
            }, 1500)

        }
    }
}

</script>