import { createApp } from 'vue';
import App from '/src/App.vue';
import router from '/src/router';
import '/src/assets/css/style.css';
import { VueReCaptcha } from 'vue-recaptcha-v3';
import secret from '/src/assets/json/secret.json';
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/style.css';

const app = createApp(App);
app.use(router);
app.use(PerfectScrollbarPlugin);
app.use(VueReCaptcha, {
    siteKey: secret.reCaptcha.siteKey,
    loaderOptions: {
      autoHideBadge: true,
      useRecaptchaNet: true
    }
  })

app.mount('#app');