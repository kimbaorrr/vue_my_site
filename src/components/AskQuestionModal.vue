<template>
    <!-- Ask Question Modal -->
    <div v-if="isOpenModal"
        class="z-50 fixed inset-0 justify-center items-center flex bg-opacity-55 overflow-x-hidden overflow-y-auto">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white dark:bg-gray-700 shadow rounded-lg">
                <!-- Modal header -->
                <div class="flex justify-between items-center dark:border-gray-600 p-4 md:p-5 border-b rounded-t">
                    <h3 class="font-semibold text-gray-900 text-lg dark:text-white">
                        Đặt câu hỏi
                    </h3>
                    <!--Close modal-->
                    <button type="button" aria-label="closeModal" @click="closeModal"
                        class="inline-flex justify-center items-center bg-transparent hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg w-8 h-8 text-gray-400 text-sm hover:text-gray-900 dark:hover:text-white ms-auto">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Đóng</span>
                    </button>
                </div>
                <!-- Modal body -->
                <form class="p-4 md:p-5 relative" @submit.prevent="sendQuestion">
                    <!--Sending Spinner-->
                    <div v-if="isSending"
                        class="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75">
                        <svg aria-hidden="true"
                            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill" />
                        </svg>
                        <span class="sr-only">Sending...</span>
                    </div>
                    <!--Modal content-->
                    <div class=" gap-4 grid grid-cols-2 mb-4">
                        <div class="col-span-2">
                            <label for="name" class="block mb-2 font-medium text-gray-900 text-sm dark:text-white">Tên
                                của
                                bạn <span class="font-bold text-red-500">*</span></label>
                            <input type="text" name="name" v-model="formData.name"
                                class="block border-gray-300 focus:border-blue-600 dark:focus:border-blue-500 dark:border-gray-500 bg-gray-50 dark:bg-gray-600 p-2.5 border-2 rounded-lg w-full text-gray-900 text-sm dark:placeholder-gray-400 dark:text-white transition duration-300 ease-in-out transform focus:shadow-lg focus:outline-none"
                                placeholder="Nguyễn Văn A" required>
                        </div>
                        <div class="col-span-2">
                            <label for="email"
                                class="block mb-2 font-medium text-gray-900 text-sm dark:text-white">Email
                                liên
                                hệ <span class="font-bold text-red-500">*</span></label>
                            <input type="text" name="email" v-model="formData.email"
                                class="block border-gray-300 focus:border-blue-600 dark:focus:border-blue-500 dark:border-gray-500 bg-gray-50 dark:bg-gray-600 p-2.5 border-2 rounded-lg w-full text-gray-900 text-sm dark:placeholder-gray-400 dark:text-white transition duration-300 ease-in-out transform focus:shadow-lg focus:outline-none"
                                placeholder="abc@gmail.com" required>
                        </div>
                        <div class="col-span-2">
                            <label for="description"
                                class="block mb-2 font-medium text-gray-900 text-sm dark:text-white">Nội
                                dung <span class="font-bold text-red-500">*</span></label>
                            <textarea name="content" rows="4" v-model="formData.content"
                                class="block border-gray-300 focus:border-blue-600 dark:focus:border-blue-500 dark:border-gray-500 bg-gray-50 dark:bg-gray-600 p-2.5 border-2 rounded-lg w-full text-gray-900 text-sm dark:placeholder-gray-400 dark:text-white transition duration-300 ease-in-out transform focus:shadow-lg focus:outline-none"
                                placeholder="Viết gì đó vào đây..." required></textarea>
                        </div>
                    </div>
                    <button type="submit"
                        class="inline-flex items-center justify-center rounded-lg px-5 py-2.5 overflow-hidden group bg-blue-700 relative hover:bg-gradient-to-r text-white transition-all ease-out duration-300">
                        <span
                            class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                        <svg class="w-5 h-5 -ms-1 me-2" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="relative text-sm font-semibold">Gửi thông tin</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AskQuestionModal",
    data() {
        return {
            isOpenModal: false, // Trạng thái đóng/mở Modal
            isSending: false, // Dữ liệu đã hoàn tất gửi lên DB hay chưa ?
            formData: {
                name: "",
                email: "",
                content: ""
            }
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
            this.isSending = true;
            const formSerialized = $('#questionModal form').serialize();
            setTimeout(() => {
                $.ajax({
                    url: 'https://api.baoit.xyz/my_blog/dat_cau_hoi/send',
                    type: 'POST',
                    data: formSerialized,
                    success: () => {
                        this.isSending = false;
                        alert("Câu hỏi của bạn đã được hệ thống ghi nhận !");
                        this.closeModal();
                    },
                    error: (xhr) => {
                        this.isSending = false;
                        const message = JSON.parse(xhr.responseText).message;
                        alert(message);
                    }
                });
            }, 1500)

        }
    }
}

</script>