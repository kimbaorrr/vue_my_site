import { createApp } from 'vue';
import App from '/src/App.vue';
import router from '/src/router';
import '/src/assets/css/style.css'
import { VueReCaptcha } from 'vue-recaptcha-v3'

const app = createApp(App);
app.use(router);
app.use(VueReCaptcha, {
    siteKey: '6LdKzhorAAAAACHxT52Q5WYw13fd7LQ_m8KEfD7S',
    loaderOptions: {
      autoHideBadge: true,
      useRecaptchaNet: true
    }
  })
app.mount('#app');