<template>
    <section id="journalism">
        <!--<van-nav-bar title="资讯" :fixed="true" :z-index="999"/>-->
        <main>
            <iframe ref="Viframe" :src="iframeUrl" width="100%" :height="clientHeight"></iframe>
        </main>
        <v_footer></v_footer>
    </section>
</template>

<script>
    import v_footer from '../../components/v_footer'
    export default {
        name: "journalism",
        components: {
            v_footer
        },
        data(){
            return {
                iframeUrl: null,
                clientHeight: null
            }
        },
        mounted(){
            this.iframeUrl =  this.Config.url + 'appH5/news.html?token=' + localStorage.getItem('token') + '&userId=' +
                this.Util.localStorageGet('userInfo')._id;
            this.clientHeight = localStorage.getItem('htmlHeight') - 39;
        },
        methods:{
            // 返回上页
            back(){
                window.history.back();
            },
        },
    }
</script>

<style lang="scss" scoped>
    #journalism{
        padding-bottom: 39px;
        height: 100%;
        main{
           /* position: absolute;
            width: 100%;
            top: -23px;*/
            iframe{
                border: 0px;
            }
        }
    }
</style>
