<template>
    <section id="alterPassword">
        <van-nav-bar title="修改密码" :fixed="true" left-arrow @click-left="back"  :z-index="999"/>
        <main>
            <pass></pass>
        </main>
    </section>
</template>

<script>
    import pass from './../../components/pass'
    export default {
        name: "alterPassword",
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
    #alterPassword{
        .submit{
            /*padding: 15px;*/
            .van-button--large{
                height: 40px;
                line-height: 40px;
            }
        }
    }
</style>
