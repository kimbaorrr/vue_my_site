<template>
  <!--Contact Page-->
  <div class="grid place-items-center min-h-screen bg-gray-100 dark:bg-black">
    <div
      class="grid grid-cols-12 gap-4 w-full max-w-4xl p-8 rounded-lg shadow-lg shadow-gray-400 dark:shadow-blue-600 bg-white dark:bg-black">
      <!-- Left Section: Image -->
      <div class="relative xl:col-span-5 col-span-12 overflow-hidden">
        <img src="/src/assets/imgs/person.jpg" alt="Image" class="w-full object-cover rounded-full" />
        <div class="absolute top-0 left-0 w-16 h-16 bg-orange-500 rounded-full"></div>
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
          <a href="#"
            class="text-4xl text-blue-600 hover:text-blue-800 transform hover:scale-110 transition duration-300">
            <i class="fab fa-facebook"></i>
          </a>
          <a href="#"
            class="text-4xl text-blue-400 hover:text-blue-600 transform hover:scale-110 transition duration-300">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#"
            class="text-4xl text-blue-700 hover:text-blue-900 transform hover:scale-110 transition duration-300">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="#"
            class="text-4xl text-red-600 hover:text-red-800 transform hover:scale-110 transition duration-300">
            <i class="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "LienHe"
}
</script>