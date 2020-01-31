<template>
    <section id="aloneDetail">
        <van-nav-bar title="自主学习详情" :fixed="true" left-arrow @click-left="back" :z-index="999">
            <!--<van-icon name="add-o" slot="right" @click="onShare"/>-->
        </van-nav-bar>
        <main>
            <div class="hade" v-if="!!list.creator">
                <p> {{ list.subject }} </p>
                <span>发布人：{{ list.creator.name }} </span> <br>
                <span>时间：&#12288;{{ list.addDate }} </span> <br>
                <span>地点：&#12288;{{ list.location }} </span> <br>
            </div>
            <div class="start-finish van-hairline--top ">
                <div class="SF_start">已开始</div>
                <div :class="{ redEnd: !list.endDate }" @click="onEndDate">已结束</div>
            </div>

            <p class="start-date van-hairline--top van-hairline--bottom">开始时间：
                <span>{{ list.beginDate }}</span>
            </p>
            <p class="start-date van-hairline--top van-hairline--bottom">结束时间：
                <span>{{ list.endDate }}</span>
            </p>
            <p class="start-date van-hairline--top van-hairline--bottom">时长：&#12288; &#12288;
                <span v-if="list.endDate">{{ this.Util.DateDifference(list.endDate,list.beginDate)}}</span>
            </p>
            <div class="start-date van-hairline--bottom">
                <p class="content">学习内容：</p>
                <p v-html="list.content"></p>
            </div>

            <div class="start-date van-hairline--bottom">
                <p class="content">心得体会：</p>
                <p v-html="list.experience"></p>
            </div>

            <div v-if="!list.endDate" @click="experience" class="start-date thoufhts van-hairline--bottom">
                写心得
            </div>


            <div class="start-date van-hairline--bottom">
                <p class="content">自学照片：</p>
                <img v-for="(item,index) in list.picture" :key="index"
                     :src="item ? apiUrl + item : ''" @click="showImg(item)" alt="照片">
            </div>

        </main>
    </section>
</template>

<script>
    import apiLists from "../../../interfase/apiLists";
    import {Dialog} from 'vant';
    import {ImagePreview} from 'vant'

    export default {
        name: "aloneDetail",
        data() {
            return {
                list: [],
                apiUrl: this.Config.apiUrl,
                cc: true
            }
        },
        mounted() {
            apiLists.dataAjax({}, 'learn_aloneDetails', this.$route.query.id).then(res => {
                console.log(res);
                if (res.code == 1001) {
                    this.list = res.result;
                    this.list.content = this.Util.stringLineFeed(this.list.content);
                    this.list.experience = this.Util.stringLineFeed(this.list.experience);
                }
            })
        },
        methods: {
            back() {
                window.history.back();
            },
            onShare() {
                console.log("点击分享");
            },
            onEndDate() {
                if (!this.list.endDate) {
                    Dialog.confirm({
                        title: '结束',
                        message: '需要填写本次学习的心得体会并提交后才能完成',
                        confirmButtonText: '写心得',
                        confirmButtonColor: 'red'
                    }).then(() => {
                        this.$router.push({
                            path: '/learn/thoughts',
                            query: {
                                id: this.$route.query.id
                            }
                        })
                    }).catch(() => {
                        // on cancel
                    });
                }
            },
            experience(){
                console.log("this.list.experience = ",this.list.experience);
                localStorage.setItem('aloneDetail',this.list.experience);
                this.$router.push({
                    path: '/learn/thoughts',
                    query: {
                        id: this.$route.query.id
                    }
                })
            },
            showImg(img){
                img = img ? this.apiUrl + img : '';
                ImagePreview([img]);
            }
        }
    }
</script>

<style lang="scss" scoped>
    #aloneDetail {
        padding-top: 46px;
        main {
            padding: 10px;
            .hade {
                p {
                    padding-bottom: 15px;
                }
                span {
                    color: #999999;
                }
            }
            .start-finish {
                padding: 10px 0;
                overflow: hidden;
                margin-top: 5px;
                div {
                    text-align: center;
                    width: 49.5%;
                    float: left;
                    color: #999;
                }
                .redEnd {
                    color: red;
                }
                .SF_start {
                    border-right: 1px solid #ebedf0;
                }
            }
            .start-date {
                padding: 10px 0;
                span {
                    color: #999999;
                    padding-left: 12px;
                }
                .content {
                    margin-bottom: 5px;
                }
                img {
                    width: 32%;
                    height: 90px;
                    margin-right: 1%;
                }
            }
            .thoufhts{
                text-align: center;
                color: red;
                font-size: 12px;
            }
        }
    }
</style>
