<template>
    <section id="PersonnelList">
        <van-nav-bar :title="titleName" :fixed="true" left-arrow @click-left="back" :z-index="999" />
        <main>
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoadAll">
                <van-cell v-for="(item,index) in list" :key="index" is-link @click="goPage(item)">
                    <div class="M_passed">
                        <img :src="auth_logo" alt="">
                        <span>{{ item.name }}</span>
                    </div>
                </van-cell>
            </van-list>

        </main>
    </section>
</template>

<script>
    import apiLists from "../../../interfase/apiLists";
    import { Tosat } from 'vant'
    export default {
        name: "PersonnelList",
        data() {
            return {
                titleName: this.$route.query.name,
                titleID: this.$route.query.id,
                auth_logo: require("./../../../../public/imgs/heda-default.png"),
                passedColor: '',
                allColor: '',
                list: [],
                loading: false,
                finished: false,
                userList: [],

            }
        },
        methods:{
            back(){
                window.history.back();
            },
            onLoadAll() {
                let me = this;
                // 异步更新数据
                me.loading = true;
                setTimeout(() => {
                    apiLists.dataAjax({}, 'user_personalInformation', this.titleID).then(res => {
                        if (res.code == 1001) {
                            me.list = res.result.list;
                        }
                    });
                    me.finished = true;
                    me.loading = false;
                }, 500);
            },
            goPage(item){
                console.log("item = ",item);
                if(typeof item === 'object'){
                    this.$router.push({
                        path: '/group/personnelDetails',
                        query: {
                            id: item._id
                        }
                    })
                }else{
                    Toast("数据加载失败");
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    #PersonnelList{
        padding-top: 46px;
        main{
            .M_passed{
                height: 30px;
                img{
                    width: 30px;
                    position: absolute;
                }
                span{
                    padding-left: 40px;
                    line-height: 30px;
                }
            }
            .van-cell{
                img{
                    width: 30px;
                    height: 30px;
                }
            }

        }
    }
</style>
