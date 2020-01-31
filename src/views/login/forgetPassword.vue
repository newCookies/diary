<template>
    <section id="forgetPassword">
        <van-nav-bar title="忘记密码" :fixed="true" left-arrow @click-left="back" :z-index="999"/>
        <main>
            <pass></pass>
        </main>
    </section>
</template>

<script>
    import pass from './../../components/pass'
    export default {
        name: "forgetPassword",
        components: {
            pass
        },
        methods:{
            back(){
                window.history.back();
            }
        },
    }
</script>

<style lang="scss" scoped>
    #forgetPassword {
        padding-top: 46px;
    }

</style>
