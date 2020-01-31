<template>
    <section id="changePassword">
        <van-nav-bar title="修改密码" :fixed="true" left-arrow @click-left="back" :z-index="999"/>
        <main>
            <div class="van-hairline--bottom titel">
                <van-field v-model="titleVal" label="自学主题" placeholder="请输入标题"/>
            </div>
        </main>
    </section>

</template>

<script>
    export default {
        name: "changePassword",
        data(){
            return {
                titleVal: null
            }
        },
        methods: {
            back(){
                window.history.back();
            }
        }
    }
</script>

<style lang="scss" scoped>
    #changePassword{
        padding-top: 46px;
    }
</style>
