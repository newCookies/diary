<template>
    <section id="ranking">
        <van-nav-bar title="数据" :fixed="true" eft-arrow @click-left="back" :z-index="999"/>
        <main>
            <div class="moduls van-hairline--top" v-for="(item, index) in moduleList" :key="index" @click="goPage(item)">
                <img :src=" item.icon ? url + item.icon : defaultImg" alt="">
                <span>{{ item.name }}</span>
                <van-icon name="arrow"/>
            </div>
        </main>

    </section>
</template>

<script>

    import apilist from './../../interfase/apiLists'
    export default {
        name: "ranking",

        data(){
            return {
                apiUrl: this.Config.apiUrl,
                url: this.Config.url,
                defaultImg: require("./../../../public/imgs/heda-default.png"),
                moduleList: []
            }
        },
        mounted(){
            apilist.dataAjax({},'pulic_report_onfiguration').then(res => {
                this.moduleList = res.result;
            })
        },
        methods:{
            back(){
                window.history.back();
            },
            goPage(item){
                localStorage.setItem("rankingInfo",JSON.stringify(item));
                this.$router.push({
                    path: '/ranking/ifrom',
                    query:{

                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    #ranking{
        padding-top: 46px;
        main{
            .moduls{
                padding: 10px 15px;
                height: 60px;
                img{
                    height: 30px;
                    position: relative;
                    top: 8px;
                }
                span{
                    padding-left: 16px;
                    line-height: 54px;
                }
                .van-icon-arrow {
                    line-height: 54px;
                    position: absolute;
                    right: 15px;
                    z-index: 10;
                    color: #999999;
                    font-size: 16px;
                }
            }
        }
    }

</style>
