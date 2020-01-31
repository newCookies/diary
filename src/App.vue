<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters(['nowFooter'])

        },
        mounted() {

        }

    }
</script>

<style lang="scss">
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0;
        padding: 0;
        .van-icon-arrow-left,
        .van-nav-bar__arrow,
        .van-icon-add-o,
        .van-icon-chat-o{
            color: #222222;
            font-size: 20px;
        }
        .van-nav-bar {
            background: url('./../public/imgs/h5_hade.png') no-repeat;
            overflow: hidden;
            background-size: cover;
            div, i, .van-nav-bar__text {
                color: white;
            }
        }
        .van-nav-bar__text{
            font-size: 16px;
        }
    }
</style>
