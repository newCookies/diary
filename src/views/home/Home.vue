<template>
    <div id="home">
        <van-nav-bar title="重庆广播电视大学" :fixed="true" @click-left="back" :z-index="999">
            <van-icon name="chat-o" slot="right" @click="goPage('information')" />
        </van-nav-bar>
        <div class="head">
        </div>
        <div class="module-button">
            <figure v-for="(item,index) in functionModuleList" :key="index">
                <router-link :to='item.url'>
                    <img :src="item.img" alt="">
                    <figcaption>
                        {{ item.name }}
                    </figcaption>
                </router-link>
            </figure>
        </div>
        <main>
            <div class="title">
                <div class="border-b">
                    <i class="icon iconfont">&#xe611;</i>
                    <span>组织生活</span> <span> &#12288;&#12288;当前个人活跃积：{{ userIntegral }}</span>
                </div>

            </div>
            <van-list v-model="life_loading" :finished="life_finished" finished-text="没有更多了" @load="onLoad">
                <van-cell v-for="(item,index) in lifeList" :key="index">
                    <compLife :comp-data="item"></compLife>
                </van-cell>
            </van-list>
        </main>
        <v_footer></v_footer>
        <el-amap vid="amap" :plugin="plugin" class="amap-demo"></el-amap>
    </div>
</template>

<script>
    import compLife from '../../components/compLife'
    import v_footer from '../../components/v_footer'
    import apiLists from './../../interfase/apiLists'
    import { mapGetters } from 'vuex'
    import { Toast } from 'vant'

    export default {
        name: 'home',
        computed: {
            ...mapGetters(['nowFooter'])
        },
        components: {
            compLife,
            v_footer
        },
        data() {
            let me = this;
            return {
                functionModuleList: [
                    {
                        img: require('../../assets/imgs/module-1.png'),
                        name: '组织生活',
                        url: '/life'
                    }, {
                        img: require('../../assets/imgs/module-2.png'),
                        name: '在线学习',
                        url: '/learn'
                    }, {
                        img: require('../../assets/imgs/module-3.png'),
                        name: '党建先锋',
                        url: '/pioneer'
                    }, {
                        img: require('../../assets/imgs/module-4.png'),
                        name: '党建沙龙',
                        url: '/salon'
                    }, {
                        img: require('../../assets/imgs/module-7.png'),
                        name: '工作日志',
                        url: '/record'
                    }, {
                        img: require('../../assets/imgs/module-5.png'),
                        name: '移动记实',
                        url: '/MobileRecord'
                    }, {
                        img: require('../../assets/imgs/module-6.png'),
                        name: '考勤签到',
                        url: '/checkingIn'
                    }, {
                        img: require('../../assets/imgs/module-8.png'),
                        name: '组织团队',
                        url: '/group'
                    },
                ],
                lifeList: [],
                life_loading: false,
                life_finished: false,
                all_pageIndex: 1,
                all_pageSize: 10,
                plugin: [   //一些工具插件
                    {
                        pName: 'Geolocation',   //定位
                        events: {
                            init(o) {
                                // o 是高德地图定位插件实例
                                o.getCurrentPosition((status, result) => {
                                    if (result && result.position) {
                                        localStorage.setItem("location", JSON.stringify(result));
                                    }
                                })
                            }
                        }
                    },
                ],
                userIntegral: 0
            }
        },
        // dom渲染前执行
        // keep-alive界面只有第一次进入才会执行这个方法
        created() {
            console.log(this);
        },
        // 一进入页面就触发,可用于初始化页面数据等
        // keep-alive界面每次进入都会执行这个方法
        activated(){
            console.log('activated');
        },

        mounted() {
            let me = this;

            if(this.Config.apiUrl.indexOf('ccfan') > 0){
                apiLists.dataAjax({},'user_getIntegral').then(res => {
                    if(res.code == 1001){
                        this.userIntegral = res.result;
                    }
                })
            }

        },
        methods: {
            // 返回上页
            back() {
                window.history.back();
            },
            goPage(url){
                  sessionStorage.setItem('demo','5555');
                this.$router.push({
                    path: '/information',
                    query: {

                    }
                })
            },
            onLoad() {
                let me = this;
                // 异步更新数据
                me.life_loading = true;
                setTimeout(() => {
                    apiLists.dataAjax({
                        pageNo: me.all_pageIndex,
                        pageSize: me.all_pageSize
                    }, 'life_allMeeting').then(res => {
                        if (res.code == 1001) {
                            let data = res.result.list;
                            for (let i = 0; i < 2; i++) {
                                let meeting = [];
                                if (data[i].tags.length > 0) {
                                    for (let n = 0; n < data[i].tags.length; n++) {
                                        meeting.push(data[i].tags[n].name);
                                    }
                                }
                                me.lifeList.push({
                                    img: data[i].titlePic,
                                    lifeDescribe: data[i].title,
                                    name: data[i].creator.name,
                                    time: data[i].addDate ? data[i].addDate : data[i].beginDate,
                                    site: data[i].location,
                                    meeting: meeting,
                                    meetingType: data[i].type,
                                    goPageUrl: '/life/lifeDetails',
                                    id: data[i]._id,
                                    type:data[i].type
                                });
                            }
                            me.lifeList = JSON.parse(JSON.stringify(me.lifeList));
                            me.life_finished = true;
                            me.life_loading = false;
                        } else if(res.code == 1005){
                            me.life_finished = true;
                            me.life_loading = false;
                        }else {
                            me.life_finished = true;
                            me.life_loading = false;
                        }
                    });
                }, 500);

            },
        }
    }
</script>
<style lang="scss" scoped>
    #home {
        padding-top: 46px;
        .head {
            width: 100%;
            height: 120px;
            background: url('./../../../public/imgs/home_hade-1.jpg') no-repeat;
            background-size: cover;
            overflow: hidden;
        }

        .module-button {
            margin-top: 22px;
            border-bottom: 5px solid #e9e9e9;
            overflow: hidden;
            figure {
                float: left;
                width: 25%;
                box-sizing: border-box;
                padding: 0px 4% 5% 4%;
                text-align: center;
                font-size: 14px;
                img {
                    width: 100%;
                }
            }
        }

        main {
            position: relative;
            padding-bottom: 60px;
            .title {
                padding: 0 10px;
                position: relative;
                .border-b {
                    padding: 10px 0;
                    font-size: 14px;
                    color: red;
                    span{
                        padding-left: 5px;
                    }
                }
                .border-b:before {
                    position: absolute;
                    box-sizing: border-box;
                    content: ' ';
                    pointer-events: none;
                    right: 0;
                    bottom: 0;
                    left: 15px;
                    border-bottom: 1.5px solid #ebedf0;
                    -webkit-transform: scaleY(.5);
                    transform: scaleY(.5);
                }
            }
        }

    }
</style>
