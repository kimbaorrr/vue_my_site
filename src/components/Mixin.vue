<script>
import translator from "/src/assets/json/translator.json";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const apiDomain = "api.baoit.site";
let isDataLoaded = false;
let cachedData = {
    trans: [],
    infoData: [],
    projectData: [],
    toolData: [],
    contactData: [],
    introData: [],
    lang: "vi",
    isLoading: true,
    theme: "light"
};

export default {
    name: "Mixin",
    data() {

        return {
            trans: [],
            infoData: [],
            projectData: [],
            toolData: [],
            contactData: [],
            introData: [],
            lang: "vi",
            isLoading: true,
            theme: "light"
        }
    },
    methods: {
        async loadAllData() {
            this.isLoading = true;

            if (isDataLoaded) {
                this.trans = cachedData.trans;
                this.infoData = cachedData.infoData;
                this.projectData = cachedData.projectData;
                this.toolData = cachedData.toolData;
                this.contactData = cachedData.contactData;
                this.introData = cachedData.introData;
                this.lang = cachedData.lang;
                this.theme = cachedData.theme;
                this.isLoading = false;
                return;
            }

            const [
                infoData,
                projectData,
                toolData,
                contactData,
                introData
            ] = await Promise.all([
                this.getCaNhan(),
                this.getDuAn(),
                this.getTienIch(),
                this.getLienHe(),
                this.getGioiThieu()
            ]);

            this.trans = this.getTranslator();
            this.infoData = infoData;
            this.projectData = projectData;
            this.toolData = toolData;
            this.contactData = contactData;
            this.introData = introData;
            this.lang = this.getLang();
            this.theme = this.getTheme();

            cachedData.trans = this.trans;
            cachedData.infoData = this.infoData;
            cachedData.projectData = this.projectData;
            cachedData.toolData = this.toolData;
            cachedData.contactData = this.contactData;
            cachedData.introData = this.introData;
            cachedData.lang = this.lang;
            cachedData.theme = this.theme;
            isDataLoaded = true;

            this.isLoading = false;
        },
        async getCaNhan() {
            /**
             * Lấy danh sách thông tin cá nhân & trả về dạng JSON
             */
            try {
                const response = await fetch(`https://${apiDomain}/my_blog/personal/get`);
                const result = await response.json();
                return result.value.data[0];
            } catch (error) {
                console.error(`Lỗi khi lấy dữ liệu cá nhân: ${error.message}`, 'error');
                return {};
            }

        },
        async getDuAn() {
            /**
             * * Lấy danh sách thông tin dự án & trả về dạng JSON
             */
            try {
                const response = await fetch(`https://${apiDomain}/my_blog/projects/get`);
                const result = await response.json();
                return result.value.data;
            } catch (error) {
                console.error(`Lỗi khi lấy dữ liệu dự án: ${error.message}`, 'error');
                return {};
            }

        },
        async getTienIch() {
            /**
             * * Lấy danh sách thông tin tiện ích & trả về dạng JSON
             */
            try {
                const response = await fetch(`https://${apiDomain}/my_blog/tools/get`);
                const result = await response.json();
                return result.value.data;
            } catch (error) {
                console.error(`Lỗi khi lấy dữ liệu tiện ích: ${error.message}`, 'error');
                return {};
            }

        },
        async getLienHe() {
            /**
             * * Lấy danh sách thông tin liên hệ & trả về dạng JSON
             */
            try {
                const response = await fetch(`https://${apiDomain}/my_blog/contact/get`);
                const result = await response.json();
                return result.value.data[0];
            } catch (error) {
                console.error(`Lỗi khi lấy dữ liệu liên hệ: ${error.message}`, 'error');
                return {};
            }

        },
        async getGioiThieu() {
            /**
             * * Lấy danh sách thông tin giới thiệu & trả về dạng JSON
             */
            try {
                const response = await fetch(`https://${apiDomain}/my_blog/intro/get`);
                const result = await response.json();
                return result.value.data[0];
            } catch (error) {
                console.error(`Lỗi khi lấy dữ liệu giới thiệu: ${error.message}`, 'error');
                return {};
            }
        },
        getLang() {
            /**
             * Lấy ngôn ngữ hiện tại
             */
            return localStorage.getItem("lang") || "vi";
        },
        getTheme() {
            /**
             * Lấy chủ đề hiện tại
             */
            return localStorage.getItem("theme") || "light";
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
        getTime() {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            return `${hours}:${minutes}`;
        },
        getHour() {
            return Number(this.getTime().split(":")[0]);
        },
        setThemeByTime() {
            const hour = this.getHour();
            this.setTheme(hour >= 19 || hour < 7 ? "dark" : "light");
        },
        setGreetingByTime() {
            const hour = this.getHour();
            const greeting = hour >= 6 && hour < 10 ? "true" : "false";
            localStorage.setItem("greeting", greeting);
        },
        async copyToClipboard(myStr) {
            if (myStr.length > 0) {
                await navigator.clipboard.writeText(myStr);
                return true;
            }
            return false;
        },
        downloadSvgAsImage(selector) {
            const svg = document.querySelector(selector);
            const svgData = new XMLSerializer().serializeToString(svg);
            const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(svgBlob);

            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = svg.width.baseVal.value;
                canvas.height = svg.height.baseVal.value;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                const pngUrl = canvas.toDataURL("image/png");
                const downloadLink = document.createElement("a");
                downloadLink.href = pngUrl;
                downloadLink.download = "image.png";
                downloadLink.click();

                URL.revokeObjectURL(url);
            };
            img.src = url;
        },
        setAlertMessage(message, type) {
            toast(message, {
                autoClose: 3000,
                position: "top-center",
                theme: "auto",
                type: type,
                dangerouslyHTMLString: true
            });
        }
    },
    created() {
        this.loadAllData();
    }
}

</script>