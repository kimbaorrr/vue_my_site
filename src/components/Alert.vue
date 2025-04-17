<template>
    <div class="-mr-8 flex flex-col justify-center items-center gap-10 md:flex-row">
        <!-- Hình ảnh -->
        <div class="w-full flex justify-center md:w-1/2 md:justify-end">
            <img src="/assets/imgs/error.png" class="w-5/12 h-auto" />
        </div>

        <!-- Nội dung -->
        <div class="w-full flex flex-col justify-center items-center space-y-3 md:w-1/2 md:items-start">
            <h3 class="text-4xl font-bold text-gray-800 dark:text-gray-100">{{ this.trans?.alert?.title?.[this.getLang()] || ""}}</h3>
            <p class="text-lg text-gray-600 dark:text-gray-300">{{ this.trans?.alert?.description?.[this.getLang()] || "" }}</p>
        </div>
    </div>
</template>


<script>
import Mixin from "./Mixin.vue";
export default {
    name: "Alert",
    mixins: [Mixin],
    data() {
        return {
            trans: this.getTranslator()
        }
    }
}
</script>

<style>
.cls-1 {
    fill: #d6b49a;
}

.cls-1,
.cls-10,
.cls-11,
.cls-13,
.cls-14,
.cls-15,
.cls-17,
.cls-2,
.cls-4,
.cls-5,
.cls-6 {
    stroke: #000;
}

.cls-1,
.cls-11,
.cls-13,
.cls-14,
.cls-16,
.cls-8 {
    stroke-linecap: round;
    stroke-linejoin: round;
}

.cls-1,
.cls-10,
.cls-11,
.cls-12,
.cls-13,
.cls-14,
.cls-15,
.cls-16,
.cls-17,
.cls-2,
.cls-3,
.cls-4,
.cls-5,
.cls-6,
.cls-7,
.cls-8,
.cls-9 {
    stroke-width: 3px;
}

.cls-2 {
    fill: #020202;
}

.cls-10,
.cls-12,
.cls-15,
.cls-17,
.cls-2,
.cls-3,
.cls-4,
.cls-5,
.cls-6,
.cls-7,
.cls-9 {
    stroke-miterlimit: 10;
}

.cls-3 {
    fill: #818181;
}

.cls-12,
.cls-16,
.cls-3,
.cls-7,
.cls-8,
.cls-9 {
    stroke: #191818;
}

.cls-4 {
    fill: #dcdbda;
}

.cls-5 {
    fill: #4ea7f1;
}

.cls-14,
.cls-6 {
    fill: #f8f3ed;
}

.cls-16,
.cls-7 {
    fill: #333;
}

.cls-13,
.cls-8 {
    fill: none;
}

.cls-9 {
    fill: #f8f59c;
}

.cls-10,
.cls-11 {
    fill: #f3d2c9;
}

.cls-15 {
    fill: #8bb174;
}

.cls-17 {
    fill: #da4e22;
}
</style>