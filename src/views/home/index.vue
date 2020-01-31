<template>
    <section>
        <router-view></router-view>
        <v_footer></v_footer>
    </section>
</template>

<script>
    import v_footer from './../../components/v_footer'
    export default {
        name: "index",
        components: {
            v_footer
        },
        // 返回上页
    }
</script>

<style scoped>

</style>
