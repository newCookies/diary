<template>
    <section id="personnelDetails">
        <van-nav-bar title="人员详情" :fixed="true" left-arrow @click-left="back" :z-index="999" />
        <main>
            <div class="tetile van-hairline--bottom">
                <img :src="auth_logo" alt="">
                <p> {{ list.name }} </p>
            </div>
            <div class="phone van-hairline--bottom">
                <span>电话</span>
                <small>{{ phone }}</small>
                <a :href="'tel:' + phone">
                    <van-icon name="phone-o" />
                </a>
            </div>
            <div class="box van-hairline--bottom" v-if="list.usOrganization">
                <h4>归属组织</h4>
                <p> {{ list.usOrganization.fullPath }} </p>
            </div>

            <div class="box van-hairline--bottom">
                <h4>上级领导</h4>
                <p> {{ superiorLeaders }} </p>
            </div>

            <div class="box van-hairline--bottom" v-if="list.jionCommunistDate">
                <h4>入党日期</h4>
                <p> {{ list.jionCommunistDate.toString().substring(0,11) }} </p>
            </div>
        </main>
     <!--   <div class="van-hairline&#45;&#45;bottom">
            <van-cell title="签到数据明细" size="12" to="#" is-link/>
        </div>
-->
    </section>
</template>

<script>
    import apiList from './../../../interfase/apiLists'
    export default {
        name: "personnelDetails",
        mounted(){
            apiList.dataAjax({},'user_userDetail',this.$route.query.id).then(res => {
                console.log("res = ",res);
                if(res.code == 1001){
                    this.list = res.result;
                    this.phone = this.list.mobile;
                }
            })
        },
        computed:{
            superiorLeaders(){
                let superiorLeaders = '';
                if(this.list.usOrganization){
                    if(this.list.usOrganization.principalList instanceof Array){
                        this.list.usOrganization.principalList.forEach(item => {
                            superiorLeaders = (superiorLeaders === '' ?  superiorLeaders  : superiorLeaders + ' - ') + item.name ;
                        });
                        return superiorLeaders;
                    }
                }


            }
        },
        data(){
            return {
                auth_logo: require("./../../../../public/imgs/heda-default.png"),
                list: {},
                phone: null
            }
        },
        methods: {
            back(){
                window.history.back();
            }
        },
    }
</script>

<style lang="scss" scoped>
    #personnelDetails{
        padding-top: 46px;
        main{
            padding: 0 15px;
            .tetile{
                padding: 20px 0;
                text-align: center;
                img{
                    width: 40px;
                    height: 40px;
                }
                p{
                    font-size: 14px;
                }
            }
            .phone{
                padding: 10px 0;
                font-size: 14px;
                span{
                }
                small{
                    padding-left: 20px;
                    font-size: 14px;
                }
                a{
                    position: absolute;
                    right: 0px;
                    font-size: 18px;
                }
            }
            .box{
                padding: 5px 0;
                p{
                    font-size: 12px;
                }
            }
        }
    }
</style>
