<template>
    <section id="myUse">
        <van-nav-bar title="使用帮助" :fixed="true" left-arrow @click-left="back"  :z-index="999"/>

        <div @click="lifeSkip()">
            <van-row class="list-life">
                <van-col span="7">
                    <div class="life-img">
                        <img src="./../../assets/imgs/life.png">
                    </div>
                </van-col>
                <van-col span="17">
                    <div class="life-message">
                        <div class="mess-life">
                            《组织生活》使用帮助
                        </div>
                        <div class="time">
                            <i class="icon iconfont">&#xe607;</i>
                            时间：2018-01-18 16：42
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div>

        <div @click="learnSkip()">
            <van-row class="list">
                <van-col span="7">
                    <div class="life-img">
                        <img src="./../../assets/imgs/learn.png">
                    </div>
                </van-col>
                <van-col span="17">
                    <div class="life-message">
                        <div class="mess-life">
                            《学习任务》的使用帮助
                        </div>
                        <div class="time">
                            <i class="icon iconfont">&#xe607;</i>
                            时间：2018-01-18 16：39
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div>

        <div @click="aloneSkip()">
            <van-row class="list">
                <van-col span="7">
                    <div class="life-img">
                        <img src="./../../assets/imgs/alone.png">
                    </div>
                </van-col>
                <van-col span="17">
                    <div class="life-message">
                        <div class="mess-life">
                            《自主学习》使用帮助
                        </div>
                        <div class="time">
                            <i class="icon iconfont">&#xe607;</i>
                            时间：2018-01-18 15：49
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div>

        <div @click="pioneerSkip()">
            <van-row class="list">
                <van-col span="7">
                    <div class="life-img">
                        <img src="./../../assets/imgs/pioneer.png">
                    </div>
                </van-col>
                <van-col span="17">
                    <div class="life-message">
                        <div class="mess-life">
                            《党建先锋》的使用帮助
                        </div>
                        <div class="time">
                            <i class="icon iconfont">&#xe607;</i>
                            时间：2018-01-18 15：35
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div>

        <div @click="salonSkip()">
            <van-row class="list">
                <van-col span="7">
                    <div class="life-img">
                        <img src="./../../assets/imgs/salon.png">
                    </div>
                </van-col>
                <van-col span="17">
                    <div class="life-message">
                        <div class="mess-life">
                            《党建沙龙》的使用帮助
                        </div>
                        <div class="time">
                            <i class="icon iconfont">&#xe607;</i>
                            时间：2018-01-18 15：33
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div>

        <div @click="mobileSkip()">
            <van-row class="list">
                <van-col span="7">
                    <div class="life-img">
                        <img src="./../../assets/imgs/mobile.png">
                    </div>
                </van-col>
                <van-col span="17">
                    <div class="life-message">
                        <div class="mess-life">
                            《移动纪实》的使用帮助
                        </div>
                        <div class="time">
                            <i class="icon iconfont">&#xe607;</i>
                            时间：2018-01-18 14：24
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div>

        <div @click="recordSkip()">
            <van-row class="list">
                <van-col span="7">
                    <div class="life-img">
                        <img src="./../../assets/imgs/record.png">
                    </div>
                </van-col>
                <van-col span="17">
                    <div class="life-message">
                        <div class="mess-life">
                            《工作日志》的使用帮助
                        </div>
                        <div class="time">
                            <i class="icon iconfont">&#xe607;</i>
                            时间：2018-01-18 14：23
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div>
    </section>
</template>

<script>
    export default {
        name: "myUse",
        methods:{
            back(){
                window.history.back();
            },

            lifeSkip(){
                this.$router.push({
                    path: '/my/lifeUse',
                    query:{

                    }
                });
            },

            learnSkip(){
                this.$router.push({
                    path: '/my/learnUse',
                    query:{

                    }
                });
            },

            aloneSkip(){
                this.$router.push({
                    path: '/my/aloneUse',
                    query:{

                    }
                });
            },

            pioneerSkip(){
                this.$router.push({
                    path: '/my/pioneerUse',
                    query:{

                    }
                });
            },

            salonSkip(){
                this.$router.push({
                    path: '/my/salonUse',
                    query:{

                    }
                });
            },

            mobileSkip(){
                this.$router.push({
                    path: '/my/mobileUse',
                    query:{

                    }
                });
            },

            recordSkip(){
                this.$router.push({
                    path: '/my/recordUse',
                    query:{

                    }
                });
            },

        },
    }
</script>

<style lang="scss" scoped>
    #myUse{
        .life-img {
            width: 100%;
            height: 66px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .list-life{
            border-bottom: 5px solid #eee;
            padding: 10px 10px 8px 10px;
        }
        .list{
            border-bottom: 5px solid #eee;
            padding: 8px 10px;
        }
        .life-message {
            padding: 0 10px;
            font-size: 13px;
            div {
                line-height: 16px;
            }
            .mess-life {
                color: black;
                font-size: 14px;
            }
            .time{
                margin-top: 35px;
            }
            div {
                color: #666666;
            }
            i {
                font-size: 13px;
                position: relative;
                top: -1px;
            }
        }
    }
</style>

