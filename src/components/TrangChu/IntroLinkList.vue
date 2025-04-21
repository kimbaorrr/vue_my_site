<template>
    <div class="flex flex-col space-y-1.5">
        <RouterLink to="/du-an">
            <i class="twa twa-lg twa-memo inline-block" width="25" height="25"></i>
            <span class="ml-1.5 hover:text-orange-600">{{ this.trans?.home_body?.link_list?.projects?.[this.lang]
                ||
                ""
            }}</span>
        </RouterLink>
        <RouterLink to="/tien-ich">
            <i class="twa twa-hammer-and-wrench twa-lg inline-block" width="25" height="25"></i>
            <span class="ml-1.5 hover:text-orange-600">{{ this.trans?.home_body?.link_list?.tools?.[this.lang] ||
                ""
            }}</span>
        </RouterLink>
        <RouterLink to="/lien-he">
            <i class="twa twa-lg twa-telephone inline-block" width="25" height="25"></i>
            <span class="ml-1.5 hover:text-orange-600">{{ this.trans?.home_body?.link_list?.contact?.[this.lang]
                || ""
            }}</span>
        </RouterLink>
        <RouterLink to="/ly-lich">
            <i class="twa twa-briefcase twa-lg inline-block" width="25" height="25"></i>
            <span class="ml-1.5 hover:text-orange-600">{{ this.trans?.home_body?.link_list?.cv?.[this.lang] || ""
            }}</span>
        </RouterLink>
    </div>
</template>

<script>
export default {
    name: "IntroLinkList",
    props: {
        trans: Object,
        lang: String
    }
}
</script>