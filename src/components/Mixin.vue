<script>
export default {
    // Lớp vue hỗn hợp chứa các hàm dùng chung
    name: "Mixin",
    methods: {
        async getInfo() {
            /**
             * Lấy danh sách thông tin cá nhân & trả về dạng JSON
             */
            const response = await fetch("https://api.baoit.xyz/my_blog/ca_nhan/get");
            const data = await response.json();
            return data[0] || [];
        },
        async getDuAn() {
            /**
             * * Lấy danh sách thông tin dự án & trả về dạng JSON
             */
            const response = await fetch("https://api.baoit.xyz/my_blog/du_an/get");
            const data = await response.json();
            return data || [];
        },
        async getTienIch() {
            /**
             * * Lấy danh sách thông tin tiện ích & trả về dạng JSON
             */
            const response = await fetch("https://api.baoit.xyz/my_blog/tien_ich/get");
            const data = await response.json();
            return data || [];
        },
        async getLyLich() {
            /**
             * * Lấy danh sách thông tin lý lịch & trả về dạng JSON
             */
            const response = await fetch("https://api.baoit.xyz/my_blog/ly_lich/get");
            const data = await response.json();
            return data[0] || [];
        },
        async getLienHe() {
            /**
             * * Lấy danh sách thông tin liên hệ & trả về dạng JSON
             */
            const response = await fetch("https://api.baoit.xyz/my_blog/lien_he/get");
            const data = await response.json();
            return data[0] || [];
        }
        
    }
}

</script>