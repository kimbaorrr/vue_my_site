<template>
  <!--Contact Page-->
  <div class="grid place-items-center min-h-screen bg-gray-100 dark:bg-dark">
    <div class="" v-if="this.isLoading">
      <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor" />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill" />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
    <div
      class="grid grid-cols-12 gap-4 w-full max-w-4xl p-8 rounded-xl xl:shadow-lg xl:shadow-gray-400 bg-cover bg-center xl:dark:shadow-purple-600">
      <!-- Left Section: Image -->
      <div class="xl:col-span-5 col-span-12 overflow-hidden">
        <img :src="this.infoData.Avatar" alt="Image" class="w-full object-cover rounded-full" />
      </div>

      <!-- Right Section: Content -->
      <div class="xl:col-span-7 col-span-12 p-8 space-y-2 text-black dark:text-white">
        <!-- Title -->
        <h2 class="text-3xl font-bold mb-4 tracking-tight">Liên hệ với mình</h2>
        <ul class="text-lg list-none">
          <li>Mình rất vui khi được kết nối với bạn.!</li>
          <li>Nếu bạn có điều thú vị nào muốn chia sẻ, hay chỉ đơn giản là muốn trò chuyện,
            đừng ngại ngần kết bạn và trao đổi với mình qua các nền tảng bên dưới nhé.</li>
          <li>Mình luôn sẵn sàng lắng nghe và học hỏi từ bạn.!</li>
        </ul>

        <!-- Social Network Icons -->
        <div class="grid grid-flow-col auto-cols-max gap-8 pt-2">
          <a :href="this.infoData.Socials.Facebook.Url === '' ? '#' : this.infoData.Socials.Facebook.Url"
            class="text-4xl text-blue-600 hover:text-blue-800 transform hover:scale-110 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-facebook"
              viewBox="0 0 16 16">
              <path
                d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
            </svg>
          </a>
          <a :href="this.infoData.Socials.X.Url === '' ? '#' : this.infoData.Socials.X.Url"
            class="text-4xl text-gray-500 hover:text-gray-700 transform hover:scale-110 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-twitter-x"
              viewBox="0 0 16 16">
              <path
                d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
            </svg>
          </a>
          <a :href="this.infoData.Socials.Linkedin.Url === '' ? '#' : this.infoData.Socials.Linkedin.Url"
            class="text-4xl text-blue-400 hover:text-blue-900 transform hover:scale-110 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-linkedin"
              viewBox="0 0 16 16">
              <path
                d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
            </svg>
          </a>
          <a :href="this.infoData.Socials.Ytb.Url === '' ? '#' : this.infoData.Socials.Ytb.Url"
            class="text-4xl text-red-600 hover:text-red-800 transform hover:scale-110 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-youtube"
              viewBox="0 0 16 16">
              <path
                d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Mixin from "../components/Mixin.vue";
export default {
  name: "LienHe",
  mixins: [Mixin],
  data() {
    return {
      infoData: [], // Danh sách thông tin cá nhân dạng JSON
      isLoading: true // Đã load dữ liệu xong chưa ?
    }
  },
  async mounted() {
    this.isLoading = false;
    // Khu vực sẽ thực thi sau khi load xong DOM
    this.infoData = await this.getCaNhan(); // Dữ liệu thông tin cá nhân dưới dạng JSON
    // Đặt link tag vào DOM để load các icon
    const linkTag = document.createElement("link");
    linkTag.href = "https://jsdelivr.b-cdn.net/npm/fontawesome-free-6.2.1@6.2.1/css/all.min.css";
    linkTag.rel = "stylesheet";
    this.isLoading = true;
  },
}
</script>