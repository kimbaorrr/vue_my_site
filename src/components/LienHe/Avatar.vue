<template>
    <!-- Left Section: Avatar -->
    <div class="w-full overflow-hidden flex justify-center items-center xl:w-4/12">
        <img :src="this.avatarImgSrc" alt="Image" class="w-full object-cover rounded-full" v-if="this.avatarImgSrc"/>
    </div>
</template>

<script>
export default {
    name: "Avatar",
    props: {
        avatarImgSrc: String
    }
}
</script>