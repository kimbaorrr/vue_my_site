<script>
import { reactive } from 'vue';

// Lớp lưu trữ trạng thái các biến để cache data thường sử dụng
export const store = reactive({
    resultData: {
        caNhan: [],
        duAn: [],
        tienIch: []
    }
});

</script>