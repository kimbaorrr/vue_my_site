<script>
export default {
    // Lớp vue hỗn hợp chứa các hàm dùng chung
    name: "Mixin",
    methods: {
        async getCaNhan() {
            /**
             * Lấy danh sách thông tin cá nhân & trả về dạng JSON
             */
            const response = await fetch("https://api.baoit.xyz/my_blog/ca_nhan/get");
            const result = await response.json();

            if (result.success === "true") {
                const data = await result.data;
                return data[0] || [];
            }
        },
        async getDuAn() {
            /**
             * * Lấy danh sách thông tin dự án & trả về dạng JSON
             */
            const response = await fetch("https://api.baoit.xyz/my_blog/du_an/get");
            const result = await response.json();
            if (result.success === "true") {
                const data = await result.data;
                return data || [];
            }
        },
        async getTienIch() {
            /**
             * * Lấy danh sách thông tin tiện ích & trả về dạng JSON
             */
            const response = await fetch("https://api.baoit.xyz/my_blog/tien_ich/get");
            const result = await response.json();
            if (result.success === "true") {
                const data = await result.data;
                return data || [];
            }
        },
        async getLyLich() {
            /**
             * * Lấy danh sách thông tin lý lịch & trả về dạng JSON
             */
            const response = await fetch("https://api.baoit.xyz/my_blog/ly_lich/get");
            const result = await response.json();
            if (result.success === "true") {
                const data = await result.data;
                return data || [];
            }
            return data[0] || [];
        }

    }
}

</script>