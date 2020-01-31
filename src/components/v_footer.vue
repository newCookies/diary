<template>
    <section id="v_footer">
        <div class="footer">
            <div :class="{ showRed : this.nowFooter === 0 }" @click="goPage($event, goPageMessage.home.url, goPageMessage.home.nowFooters)">
                <i class="icon iconfont">&#xe642;</i> <br>
                <span>{{ goPageMessage.home.name }}</span>
            </div>
            <div :class="{ showRed : this.nowFooter === 1 }" @click="goPage($event, goPageMessage.journalism.url, goPageMessage.journalism.nowFooters)">
                <i class="icon iconfont">&#xe605;</i><br>
                <span>{{ goPageMessage.journalism.name }}</span>
            </div>
            <div :class="{ showRed : this.nowFooter === 2 }" @click="goPage($event, goPageMessage.ranking.url, goPageMessage.ranking.nowFooters)">
                <i class="icon iconfont">&#xe601;</i> <br>
                <span>{{ goPageMessage.ranking.name }}</span>
            </div>
            <div :class="{ showRed : this.nowFooter === 3 }" @click="goPage($event, goPageMessage.my.url, goPageMessage.my.nowFooters)">
                <i class="icon iconfont">&#xe600;</i> <br>
                <span>{{ goPageMessage.my.name }}</span>
            </div>
        </div>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "v_footer",
        computed: {
            ...mapGetters(['nowFooter'])
        },
        data(){
            return {
                goPageMessage:{
                    home:{
                        url: '/',
                        name: '首页',
                        nowFooters: 0
                    },
                    journalism:{
                        url: '/journalism',
                        name: '资讯',
                        nowFooters: 1
                    },
                    ranking:{
                        url: '/ranking',
                        name: '数据',
                        nowFooters: 2
                    },
                    my:{
                        url: '/my',
                        name: '我的',
                        nowFooters: 3
                    },
                },
                Footer: this.nowFooter
            }
        },
        mounted(){
            this.initFooter();
        },
        methods:{
            goPage(event, url, nowFooter){
                this.$store.dispatch('set_nowFooter',nowFooter);
                this.$router.replace(url);
            },
            initFooter(){
                let thisUrl = window.location.href.toString();
                let journalism = thisUrl.indexOf('journalism') > 0 ? 1 : null;
                let ranking = thisUrl.indexOf('ranking')> 0 ? 2 : null;
                let my = thisUrl.indexOf('my')> 0 ? 3 : null;
                let num = journalism || ranking || my || 0;
                this.$store.dispatch('set_nowFooter',num);
            }
        },

    }
</script>

<style lang="scss" scoped>
    #v_footer{
        position: fixed;
        width: 100%;
        height: 60px;
        bottom: 0px;
        border-top: 1px solid #ccc;
        .footer{
            background-color: white;
            z-index: 999;
            height: 100%;
            div{
                width: 25%;
                height: 100%;
                text-align: center;
                font-size: 14px;
                display: inline-block;
                padding: 12px 0;
                color: #666666;
            }
            .showRed{
                color: red;
            }
        }

    }
</style>
