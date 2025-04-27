<template>
  <div class="aspect-video w-full" @dblclick="this.toggleFullScreen">
    <img ref="imagePlayer" class="w-full h-full object-fill" :src="this.currentSrc" />
  </div>
</template>

<script>
export default {
  name: "ImagePlayer",
  props: {
    image_src: String,
    delay: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      currentSrc: this.image_src,
      isFullScreen: false,
    };
  },
  mounted() {
    this.startRefreshing();
  },
  beforeUnmount() {
    this.stopRefreshing();
  },
  methods: {
    /**
     * Bắt đầu làm mới hình ảnh theo chu kỳ định kỳ.
     * Tạo ra một khoảng thời gian nhất định (theo giây) để làm mới hình ảnh liên tục.
     */
    startRefreshing() {
      this.refreshImage();
      this.interval = setInterval(this.refreshImage, this.delay * 1000);
    },

    /**
     * Dừng việc làm mới hình ảnh.
     * Nếu đang có một interval, nó sẽ bị xóa để ngừng việc làm mới.
     */
    stopRefreshing() {
      /** 
       * Dừng quá trình làm mới hình ảnh.
       * Nếu có interval đã được thiết lập, nó sẽ bị xóa để ngừng việc làm mới hình ảnh.
       * 
       * @returns {void}
       */
      if (this.interval) {
        clearInterval(this.interval);
      }
    },

    /**
     * Làm mới hình ảnh với một URL mới bằng cách thêm tham số thời gian vào URL.
     * @async
     * @returns {Promise<void>} Promise được trả về sau khi ảnh được làm mới thành công hoặc xảy ra lỗi.
     */
    async refreshImage() {
      const newUrl = `${this.image_src}?t=${Date.now()}`;

      try {
        await this.preloadImage(newUrl);
        this.currentSrc = newUrl;
      } catch (error) {
        console.error('Error loading image:', error);
      }
    },

    /**
     * Tiến hành tải hình ảnh từ một URL mới và đảm bảo hình ảnh đã tải thành công.
     * @param {string} src - Đường dẫn URL của hình ảnh cần tải.
     * @returns {Promise<void>} Promise sẽ resolve khi hình ảnh được tải thành công, hoặc reject nếu có lỗi.
     */
    preloadImage(src) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = (err) => reject(err);
      });
    },

    /**
     * Chuyển đổi chế độ toàn màn hình cho phần tử hiện tại.
     * Nếu đang ở chế độ toàn màn hình, thoát chế độ này, ngược lại yêu cầu chế độ toàn màn hình.
     */
    toggleFullScreen() {
      if (this.isFullScreen) {
        document.exitFullscreen();
      } else {
        this.$el.requestFullscreen();
      }
      this.isFullScreen = !this.isFullScreen;
    }
  },
  watch: {
    "delay"(newValue) {
      this.stopRefreshing();
      this.startRefreshing();
    }
  }
};
</script>
