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
                        {{ this.trans?.question?.header?.[this.lang] || "" }}
                    </h3>
                    <!--Close modal-->
                    <button type="button" aria-label="closeModal" @click="closeModal"
                        class="ms-auto w-8 h-8 inline-flex justify-center items-center text-sm text-gray-400 bg-transparent rounded-lg dark:hover:text-white dark:hover:bg-gray-600 hover:text-gray-900 hover:bg-gray-200">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">{{ this.trans?.question?.close?.[this.lang] || "" }}</span>
                    </button>
                </div>
                <!-- Modal body -->
                <form class="relative flex flex-col gap-4 p-4 md:p-5" ref="questionForm" @submit.prevent="sendQuestion">
                    <!--Sending Spinner-->
                    <div v-if="this.isSending" class="bg-opacity-75 absolute inset-0 z-10 justify-center items-center">
                        <LoadingSpinner></LoadingSpinner>
                    </div>

                    <!--Modal content-->
                    <div class="flex flex-col gap-4">
                        <div class="w-full">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                {{ this.trans?.question?.body?.name?.[this.lang] || "" }}
                                <span class="font-bold text-red-500">*</span>
                            </label>
                            <input type="text" name="name" v-model="this.formData.name"
                                class="blueBox w-full p-2.5 text-sm" placeholder="Nguyễn Văn A" required>
                        </div>

                        <div class="w-full">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                {{ this.trans?.question?.body?.email?.[this.lang] || "" }}
                                <span class="font-bold text-red-500">*</span>
                            </label>
                            <input type="text" name="email" v-model="this.formData.email"
                                class="blueBox w-full p-2.5 text-sm" placeholder="abc@gmail.com" required>
                        </div>

                        <div class="w-full">
                            <label for="description"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                {{ this.trans?.question?.body?.content?.[this.lang] || "" }}
                                <span class="font-bold text-red-500">*</span>
                            </label>
                            <textarea name="content" rows="4" v-model="this.formData.content"
                                class="blueBox w-full p-2.5 text-sm"
                                :placeholder="this.trans?.question?.body?.placeholder?.[this.lang] || ''"
                                required></textarea>
                        </div>
                        <div class="w-full">
                            <div class="g-recaptcha" :data-sitekey="this.siteKey"></div>
                        </div>
                    </div>
                    <div class="flex justify-between items-center">
                        <button type="submit" class="blueBtn flex px-4 py-2.5 space-x-1 text-white">
                            <svg fill="currentColor" width="20" height="20" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="relative flex text-sm font-medium">
                                {{ this.trans?.question?.body?.send?.[this.lang] || "" }}
                            </span>
                        </button>
                    </div>

                </form>

            </div>
        </div>
    </div>
</template>

<script>
import LoadingSpinner from '/src/components/LoadingSpinner.vue'
import Mixin from "./Mixin.vue"
import secret from "/src/assets/json/secret.json"
export default {
    name: "AskQuestionModal",
    components: {
        LoadingSpinner
    },
    mixins: [Mixin],
    data() {
        const siteKey = secret.ReCaptcha.siteKey
        return {
            isOpenModal: false, // Trạng thái đóng/mở Modal
            isSending: false, // Dữ liệu đã hoàn tất gửi lên DB hay chưa ?
            formData: { // Các trường dữ liệu trong form
                name: "",
                email: "",
                content: ""
            },
            siteKey: siteKey
        }
    },
    methods: {
        openModal() {
            this.isOpenModal = true;
        },
        closeModal() {
            this.isOpenModal = false;
        },
        async verifyCaptcha() {
            try {
                const token = await grecaptcha.execute(this.siteKey, { action: 'submit' });

                const res = await fetch("https://api.baoit.site/captcha/recaptcha/verify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(token)
                });
                return res.ok;

            } catch (err) {
                alert("Lỗi xác thực Captcha!\n" + err.message);
                return false;
            }
        },
        async sendQuestion() {
            this.isSending = true;
            try {
                const captchaOk = await this.verifyCaptcha();
                if (!captchaOk) {
                    this.isSending = false;
                    this.setAlertMessage("Captcha không hợp lệ !", "danger");
                    return;
                }

                const apiKey = secret.apiKey;
                const formData = new FormData(this.$refs.questionForm);
                formData.append("ApiKey", apiKey);

                const response = await fetch('https://api.baoit.site/my_blog/questions/send', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message);
                }

                alert(this.trans?.question?.body?.response?.success?.[this.lang] || "Gửi thành công!");
                this.closeModal();
            } catch (error) {
                alert(
                    (this.trans?.question?.body?.response?.fail?.[this.lang] || "Đã xảy ra lỗi!") +
                    "\n" + error.message
                );
            } finally {
                this.isSending = false;
            }
        }
    }

}

</script>