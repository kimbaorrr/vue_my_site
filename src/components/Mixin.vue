<script>
import translator from "/src/assets/json/translator.json";
let isDataLoaded = false;
let cachedData = {
    trans: [],
    infoData: [],
    projectData: [],
    toolData: [],
    contactData: [],
    introData: [],
    lang: "Vi",
    isLoading: true
};

export default {
    name: "Mixin",
    data() {
        return {
            clock: "",
            trans: [],
            infoData: [],
            projectData: [],
            toolData: [],
            contactData: [],
            introData: [],
            lang: "vi",
            isLoading: true
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

            cachedData.trans = this.trans;
            cachedData.infoData = this.infoData;
            cachedData.projectData = this.projectData;
            cachedData.toolData = this.toolData;
            cachedData.contactData = this.contactData;
            cachedData.introData = this.introData;
            cachedData.lang = this.lang;
            isDataLoaded = true;

            this.isLoading = false;
        },
        async getCaNhan() {
            /**
             * Lấy danh sách thông tin cá nhân & trả về dạng JSON
             */
            const response = await fetch(`https://api.baoit.site/my_blog/personal/get`);
            const result = await response.json();
            return result.value.data[0];
        },
        async getDuAn() {
            /**
             * * Lấy danh sách thông tin dự án & trả về dạng JSON
             */
            const response = await fetch(`https://api.baoit.site/my_blog/projects/get`);
            const result = await response.json();
            return result.value.data;
        },
        async getTienIch() {
            /**
             * * Lấy danh sách thông tin tiện ích & trả về dạng JSON
             */
            const response = await fetch(`https://api.baoit.site/my_blog/tools/get`);
            const result = await response.json();
            return result.value.data;
        },
        async getLienHe() {
            /**
             * * Lấy danh sách thông tin liên hệ & trả về dạng JSON
             */
            const response = await fetch(`https://api.baoit.site/my_blog/contact/get`);
            const result = await response.json();
            return result.value.data[0];
        },
        async getGioiThieu() {
            /**
             * * Lấy danh sách thông tin giới thiệu & trả về dạng JSON
             */
            const response = await fetch(`https://api.baoit.site/my_blog/intro/get`);
            const result = await response.json();
            return result.value.data[0];
        },
        getLang() {
            /**
             * Lấy ngôn ngữ hiện tại
             */
            return localStorage.getItem("lang") || "vi";
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
        setGreetingByTime() {
            /**
             * Đặt chủ đề theo thời gian
             */
            const [hour, minute] = this.getTime().split(":").map(Number);
            const greeting = (hour >= 6 || hour < 10) ? "true" : "false";
            localStorage.setItem("greeting", greeting);
        },
        getTime() {
            /**
             * Lấy thời gian hiện tại dạng HH:mm
             */
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            return `${hours}:${minutes}`;
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
                downloadLink.download = "svg-to-image.png";
                downloadLink.click();

                URL.revokeObjectURL(url);
            };
            img.src = url;
        }
    },
    created() {
        this.loadAllData();
    },
}

</script>