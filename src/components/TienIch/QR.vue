<template>
    <!--QR APP-->
    <div class="overflow-y-auto flex-1 mt-10 md:mt-0 xl:px-5">
        <!--Input-->
        <div class="p-4 space-y-3 rounded-lg border-2 border-orange-500 dark:border-[#F59E0B]">
            <!--QR-->
            <div class="" v-show="!this.isShowWifiConnect">
                <!--Input Text-->
                <InputCharCount v-model:inputString="this.qrData.inputString"
                    :placeHolder="this.trans?.tools?.labels?.qr?.placeholder?.[this.lang] || ''" :class="this.class">
                </InputCharCount>

                <div class="grid gap-4 text-sm text-black dark:text-white md:grid-cols-4 sm:grid-cols-2">
                    <div class="col-span-2">
                        <label for="tieuDe" class="font-medium">{{ this.trans?.tools?.labels?.qr?.title?.[this.lang] ||
                            '' }}</label>
                        <input type="text" name="tieuDe" v-model="this.qrData.title" class="form-input" />
                    </div>

                    <div class="col-span-2">
                        <label for="tieuDeCon" class="font-medium">{{
                            this.trans?.tools?.labels?.qr?.subtitle?.[this.lang]
                            || '' }}</label>
                        <input type="text" name="tieuDeCon" v-model="this.qrData.subTitle" class="form-input" />
                    </div>

                    <div class="col-span-2">
                        <label for="mauSac" class="font-medium">{{ this.trans?.tools?.labels?.qr?.color?.[this.lang] ||
                            '' }}</label>
                        <input type="color" name="mauSac" v-model="this.qrData.color" class="form-input p-[1.15rem]" />
                    </div>

                    <div class="col-span-2">
                        <label for="hinhAnh" class="font-medium">{{ this.trans?.tools?.labels?.qr?.image?.[this.lang] ||
                            '' }}</label>
                        <input ref="imageInput" type="file" @change="this.handleImageUpload" class="form-input p-[0.35rem]" accept="image/*"/>
                    </div>
                </div>
            </div>

            <div class="flex items-center space-x-1.5">
                <span class="font-medium">{{ this.trans?.tools?.labels?.qr?.wifi?.show?.[this.lang] || "" }}</span>
                <input type="checkbox" class="blueBox" @change="this.isShowWifiConnect = $event.target.checked" />
            </div>

            <!--Wifi Connect-->
            <div class="flex flex-col gap-4 text-sm text-black dark:text-white md:grid md:grid-cols-4"
                v-show="this.isShowWifiConnect">
                <div class="col-span-1">
                    <label for="ssid" class="font-medium">{{ this.trans?.tools?.labels?.qr?.wifi?.ssid?.[this.lang] ||
                        "" }}</label>
                    <input type="text" name="ssid" v-model="this.wifiData.ssid" class="form-input" />
                </div>
                <div class="col-span-1">
                    <label for="secureType" class="font-medium">{{
                        this.trans?.tools?.labels?.qr?.wifi?.secure?.[this.lang] || "" }}</label>
                    <select class="form-input" v-model="this.wifiData.secureType">
                        <option value="nopass">Open</option>
                        <option value="wep">WEP</option>
                        <option value="wpa">WPA/WPA2/WPA3 PSK</option>
                    </select>
                </div>
                <div class="col-span-1">
                    <label for="password" class="font-medium">{{ this.trans?.tools?.labels?.qr?.wifi?.pwd?.[this.lang]
                        || "" }}</label>
                    <input type="password" name="password" v-model="this.wifiData.password" class="form-input"
                        autocomplete="new-password" aria-autocomplete="off"
                        :disabled="this.wifiData.secureType === 'nopass'"
                        :class="this.wifiData.secureType === 'nopass' ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' : true" />
                </div>
                <div class="col-span-1">
                    <label for="hiddenSSID" class="font-medium">{{
                        this.trans?.tools?.labels?.qr?.wifi?.hidden?.[this.lang] || "" }}</label>
                    <select class="form-input" v-model="this.wifiData.isHiddenSSID">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
            </div>
        </div>

        <!--Output-->
        <div class="flex flex-col justify-center items-center p-4 py-12 mt-4 bg-gray-100 rounded-lg border-2 border-green-400 dark:bg-gray-800"
            id="outputQR"
            v-show="qrData.inputString.length !== 0 || (wifiData.ssid.length !== 0 && (wifiData.secureType === 'nopass' || wifiData.password.length !== 0))">
            <QrcodeVue :value="this.outputString" :size="220" :foreground="this.qrData.color" :level="this.qrData.logo.src !== '' ? H : M" render-as="svg"
                :imageSettings=this.qrData.logo>
            </QrcodeVue>
            <p class="mt-4 font-semibold text-center">{{ this.qrData.title }}</p>
            <p class="text-sm text-center">{{ this.qrData.subTitle }}</p>
            <button type="button" @click="this.downloadSvgAsImage('#outputQR svg')"
                class="blueBtn px-4 py-2 mt-1.5 font-medium text-white">{{
                    this.trans?.tools?.labels?.qr?.download?.[this.lang] || '' }}</button>
        </div>
    </div>
</template>


<script>
import QrcodeVue from 'qrcode.vue'
import InputCharCount from "./InputCharCount.vue";
import Mixin from "../Mixin.vue";
import _ from "lodash";
export default {
    name: "QR",
    mixins: [Mixin],
    components: {
        InputCharCount,
        QrcodeVue
    },
    data() {
        return {
            isShowWifiConnect: false,
            qrData: {
                inputString: "",
                title: "",
                subTitle: "",
                color: "#000000",
                logo: {
                    src: '',
                    width: 40,
                    height: 40,
                    excavate: true,
                }
            },
            class: "blueBox border-2 focus:border-pink-400 focus:dark:border-pink-600",
            wifiData: {
                ssid: "",
                secureType: "nopass",
                password: "",
                isHiddenSSID: "false"
            },
            outputString: ""
        };
    },
    methods: {
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                this.qrData.logo.src = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        resetForm() {
            this.qrData.inputString = "",
            this.qrData.title = "";
            this.qrData.subTitle = "";
            this.qrData.color = "#000000";
            this.qrData.logo = {
                src: '',
                width: 40,
                height: 40,
                excavate: true,
            }
            
            this.$refs.imageInput.value = '';
            
            this.wifiData.ssid = "";
            this.wifiData.secureType = "nopass";
            this.wifiData.password = "";
            this.wifiData.isHiddenSSID = "false";

            this.outputString = "";
        },
        beginAction(type) {
            switch (type) {
                case "wifi":
                    this.wifiData.ssid = _.escape(this.wifiData.ssid);
                    this.outputString = `WIFI:T:${this.wifiData.secureType};S:${this.wifiData.ssid};P:${this.wifiData.password};H:${this.wifiData.isHiddenSSID};;`;
                    break;
                default:
                    this.outputString = this.qrData.inputString;
                    break
            }
        }
    },
    watch: {
        wifiData: {
            handler(newValue) {
                this.beginAction("wifi");
            },
            deep: true
        },
        qrData: {
            handler(newValue) {
                this.beginAction("qr");
            },
            deep: true
        },
        "isShowWifiConnect"(newValue) {
            this.resetForm();
        }

    }
};
</script>


<style>
.form-input {
    @apply blueBox w-full p-2 mt-2 focus:border-pink-400 dark:focus:border-pink-600 focus:border-2;
}
</style>