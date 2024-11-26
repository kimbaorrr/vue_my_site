<script>
import { store } from "/src/components/Store.vue"
export default {
    // Lớp vue hỗn hợp chứa các hàm dùng chung
    name: "Mixin",
    methods: {
        async getCaNhan() {
            /**
             * Lấy danh sách thông tin cá nhân & trả về dạng JSON
             */
            if (store.resultData.caNhan.length !== 0) {
                return store.resultData.caNhan;
            }
            const response = await fetch("https://api.baoit.xyz/my_blog/ca_nhan/get");
            const result = await response.json();
            if (result.success === "true") {
                store.resultData.caNhan = await result.data;
                return store.resultData.caNhan[0] || [];
            }
        },
        async getDuAn() {
            /**
             * * Lấy danh sách thông tin dự án & trả về dạng JSON
             */
            if (store.resultData.duAn.length !== 0) {
                return store.resultData.duAn;
            }
            const response = await fetch("https://api.baoit.xyz/my_blog/du_an/get");
            const result = await response.json();
            if (result.success === "true") {
                store.resultData.duAn = await result.data;
                return store.resultData.duAn || [];
            }
        },
        async getTienIch() {
            /**
             * * Lấy danh sách thông tin tiện ích & trả về dạng JSON
             */
            if (store.resultData.tienIch.length !== 0) {
                console.log("OK");
                return store.resultData.tienIch;
            }
            const response = await fetch("https://api.baoit.xyz/my_blog/tien_ich/get");
            const result = await response.json();
            if (result.success === "true") {
                store.resultData.tienIch = await result.data;
                return store.resultData.tienIch || [];
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