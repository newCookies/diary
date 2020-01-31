<template>
    <section id="ifrom" v-if="ifromInfo">
        <van-nav-bar :title="ifromInfo.name" :fixed="true" left-arrow @click-left="back" :z-index="999"/>
        <main>
            <iframe :src="ifromInfo.url" width="100%" :height="clientHeight"></iframe>
        </main>
    </section>
</template>

<script>
    export default {
        name: "ifrom",
        data(){
            return {
                ifromInfo: null,
                clientHeight: null
            }
        },
        mounted(){
            let userInfo = this.Util.localStorageGet('userInfo');
            this.ifromInfo = JSON.parse(localStorage.getItem('rankingInfo'));
            this.ifromInfo.url = this.Config.url + this.ifromInfo.url + '?token=' + userInfo.token + '&userId='
            + userInfo._id + "&orgId=" + userInfo.organization;
            this.clientHeight = localStorage.getItem('htmlHeight') - 110;
        },
        methods:{
            back(){
                window.history.back();
            },
        },
    }
</script>

<style lang="scss" scoped>
    #ifrom{
        padding-top: 46px;
        main{
            height: 100%;
            iframe{
                border: 0px;
            }
        }
    }
</style>
