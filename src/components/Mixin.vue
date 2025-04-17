<script>
import translator from "/src/assets/json/translator.json";
export default {
    // Lớp vue hỗn hợp chứa các hàm dùng chung
    name: "Mixin",
    data() {
        return {
            apiDomain: "api.baoit.site",
            clock: ""
        }
    },
    methods: {
        async getCaNhan() {
            /**
             * Lấy danh sách thông tin cá nhân & trả về dạng JSON
             */
            const response = await fetch(`https://${this.apiDomain}/my_blog/ca_nhan/get`);
            const result = await response.json();

            return result.data[0] || [];
        },
        async getDuAn() {
            /**
             * * Lấy danh sách thông tin dự án & trả về dạng JSON
             */
            const response = await fetch(`https://${this.apiDomain}/my_blog/du_an/get`);
            const result = await response.json();
            return result.data || [];
        },
        async getTienIch() {
            /**
             * * Lấy danh sách thông tin tiện ích & trả về dạng JSON
             */
            const response = await fetch(`https://${this.apiDomain}/my_blog/tien_ich/get`);
            const result = await response.json();
            return result.data || [];
        },
        async getLienHe() {
            /**
             * * Lấy danh sách thông tin liên hệ & trả về dạng JSON
             */
            const response = await fetch(`https://${this.apiDomain}/my_blog/lien_he/get`);
            const result = await response.json();
            return result.data[0] || [];
        },
        async getGioiThieu() {
            /**
             * * Lấy danh sách thông tin giới thiệu & trả về dạng JSON
             */
            const response = await fetch(`https://${this.apiDomain}/my_blog/gioi_thieu/get`);
            const result = await response.json();
            return result.data[0] || [];
            // if (result.success === "true") {
            //     const data = await result.data;
            //     return data || [];
            // }
            // return data[0] || [];
        },
        getLang() {
            /**
             * Lấy ngôn ngữ hiện tại
             */
            return localStorage.getItem("lang") || "Vi";
        },
        getTranslator() {
            /**
             * Lấy nội dung song ngữ từ tệp JSON
             */
            return translator;
        },
        setTheme(value) {
            /**
             * Đặt chủ đề & lưu vào bộ nhớ client
             */
            localStorage.setItem("theme", value);
            document.body.classList.toggle("dark", value === "dark");
        },
        setThemeByTime() {
            /**
             * Đặt chủ đề theo thời gian
             */
            const [hour, minute] = this.getTime().split(":").map(Number);
            const theme = (hour >= 19 || hour < 7) ? "dark" : "light";
            this.setTheme(theme);
        },
        getTime() {
            /**
             * Lấy thời gian hiện tại dạng HH:mm
             */
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            return `${hours}:${minutes}`;
        }
    }
}

</script>