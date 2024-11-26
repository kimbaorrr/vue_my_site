<script>
import { defineStore } from 'pinia';

// Lớp lưu trữ trạng thái các biến để cache data thường sử dụng
export const useStore = defineStore('main', {
    state: () => ({
        resultData: {
            caNhan: [],
            duAn: [],
            tienIch: []
        }
    }),
    actions: {
        setCaNhan(data) {
            this.resultData.caNhan = data;
        },
        setDuAn(data) {
            this.resultData.duAn = data;
        },
        setTienIch(data) {
            this.resultData.tienIch = data;
        }

    }
});

</script>