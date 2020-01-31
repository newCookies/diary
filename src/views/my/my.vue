<template>
    <section id="my">
        <router-view></router-view>
    </section>
</template>

<script>
    export default {
        name: "journalism",

        methods:{
            back(){
                window.history.back();
            },
        },
    }
</script>

<style lang="scss" scoped>
    #my{
        padding-top: 46px;
    }

</style>
