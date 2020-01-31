<template>
    <section id="missionDetails">
        <van-nav-bar title="学习任务详情" :fixed="true" left-arrow @click-left="back" :z-index="999"/>
        <main>
            <div class="title">
                <p class="left-10"> {{ message.title }}</p>
                <div class="left-10" v-if="message.user">发布人：&#12288;
                    <span>{{ message.user && message.user.name }}</span>
                </div>
                <div class="left-10">发布时间：
                    <span>{{ message.addDate }}</span>
                </div>
            </div>
            <div class="start-date">
                <h4 class="left-10">学习内容</h4>
                <p class="content left-10"> {{ message.content }} </p>
            </div>
            <div class="main_content" v-if=" message.files">
                <h4 class="study left-10">学习资料</h4>
                <div class="main-files" v-for="(item,index) in message.files" :key="index">
                    <a :href="item.newUrl ? item.newUrl : '#'">
                        <p> {{item.describe }}</p>
                    </a>
                </div>
            </div>
            <div class="main_content">
                <h4 class="study left-10">学习人员</h4>
                <div class="MC_components" v-for="(item,index) in portraitList" :key="index">
                    <portrait :comp-data="item"></portrait>
                </div>
                <div class="MC_all" @click="goPage('attendee')">
                    <van-icon name="more-o"/>
                    <p>全部</p>
                </div>
            </div>
            <div class="main_content MC_data van-hairline--bottom" v-if="message.relevantData">
                <h4 class="left-10">相关数据</h4>
                <van-row gutter="10">
                    <van-col span="6">
                        <span>{{ message.relevantData.studyPersonCount }}</span>
                        <p>学员</p>
                    </van-col>
                    <van-col span="6">
                        <span>{{ message.relevantData.beginPersonCount }}</span>
                        <p>已开始</p>
                    </van-col>
                    <van-col span="6">
                        <span> {{ message.relevantData.finishPersonCount }}</span>
                        <p>已结束</p>
                    </van-col>
                    <van-col span="6">
                        <span>{{((message.relevantData.finishPersonCount/message.relevantData.studyPersonCount * 100).toString().substring(0,4)) +  '%'}}</span>
                        <p>完成率</p>
                    </van-col>
                </van-row>
            </div>

            <div class="vant_goPage van-hairline--bottom" @click="goPage('LearnDetail')">
                <h5 class="left-10">学习明细 (<span>最低要求30分钟</span>)</h5>
                <van-icon name="arrow"/>
            </div>

            <div class="vant_goPage van-hairline--bottom" @click="goPage('learnInspiration')">
                <h5 class="left-10">心得体会 (
                    <span>最低要求{{ message.experienceCount ? message.experienceCount : 50}}字</span>)
                </h5>
                <van-icon name="arrow"/>
            </div>
        </main>
        <footer>
            <van-popup v-model="show" closeable position="bottom" :style="{ height: '20%' }">
                <div class="main-files" v-for="(item,index) in message.files" :key="index">
                    <a :href="item.newUrl ? item.newUrl : '#'">
                        <p> {{item.describe }}</p>
                    </a>
                </div>
            </van-popup>
            <button class="btn_default_style" @click="showPopup">继续学习</button>
            <button class="btn_default_style" @click="submit('1')">写心得</button>
            <button class="btn_default_style" @click="submit('2')">提交任务</button>
        </footer>
    </section>
</template>

<script>
    import apiList from './../../../interfase/apiLists'
    import portrait from '../../../components/portrait'
    import baseConfig from '../../../interfase/baseConfig'
    import {Dialog} from 'vant';

    export default {
        name: "missionDetails",
        components: {
            portrait
        },
        data() {
            return {
                message: {},
                user: {},
                portraitList: [],
                api: this.Config.apiUrl,
                show: false
            }
        },
        mounted() {
            apiList.dataAjax({}, 'learn_missionDedail', this.$route.query.id).then(res => {
                if (res.code == 1001) {
                    this.message = res.result;
                    this.user = res.result.user;
                    for (let j = 0; j < res.result.studyPerson.length; j++) {
                        if (j < 3) {
                            this.portraitList.push(res.result.studyPerson[j]);
                        }
                    }
                    if (!!this.message.files && this.message.files instanceof Array) {
                        let userInfo = this.Util.localStorageGet("userInfo");
                        console.log(this.message.files);
                        for (let i = 0; i < this.message.files.length; i++) {
                            if (!this.message.files[i].newUrl) {
                                this.message.files[i].newUrl = this.Config.url + '/html/selfsty/styLearning.html' + "?p=app&token=" + userInfo.token + "&uid=" + userInfo._id + "&id=" + this.message._id + "&url=" + this.Config.apiUrl + this.message.files[i].url;
                            }
                        }
                        console.log("files-2 = ", this.message.files);
                    }
                }
            })
        },
        methods: {
            showPopup() {
                this.show = true;
            },
            back() {
                window.history.back();
            },
            goPage(url) {
                let goUrl = null;
                if (url.toString() === 'attendee') {
                    localStorage.setItem('userList', JSON.stringify(this.message.studyPerson));
                    goUrl = '/life/' + url;
                } else {
                    goUrl = '/learn/' + url;
                }
                this.$router.push({
                    path: goUrl,
                    query: {
                        id: this.$route.query.id,
                        source: 'LearnDetail'
                    }
                })
            },
            submit(status) {
                if (!!status) {
                    if (status.toString() === '1') {
                        this.$router.push({
                            path: '/learn/thoughts',
                            query: {
                                id: this.$route.query.id,
                                source: 'LearnDetail'
                            }
                        })
                    } else if (status.toString() === '2') {
                        Dialog.alert({
                            message: '您的学习记录未满足学习要求，请达标后提交'
                        }).then(() => {
                            // on close
                        });
                    } else {

                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #missionDetails {
        padding-top: 46px;
        main {
            padding: 10px 0;
            .title {
                padding-bottom: 10px;
                font-size: 16px;
                p {
                    padding-bottom: 8px;
                }
                span {
                    color: #999;
                }
                div {
                    font-size: 14px;
                }
            }
            .start-date {
                h4 {
                    padding-bottom: 5px;
                }
                .content {
                    font-size: 14px;
                    padding: 10px 10px 0px 10px;
                }
            }
            .main_content {
                padding-top: 10px;
                .MC_components {
                    display: inline-block;
                    width: 25%;
                }
                .MC_all {
                    display: inline-block;
                    width: 25%;
                    text-align: center;
                    padding-top: 10px;
                    i {
                        font-size: 43px;
                        color: red;
                    }
                }
                .study {
                    padding-bottom: 8px;
                }
                .main-files {
                    padding: 15px 0px 5px 10px;
                    a {
                        color: red;
                    }
                }
                p {
                    font-size: 14px;
                }
            }
            .MC_data {
                .van-col--6 {
                    text-align: center;
                    padding: 10px 0;
                    p {
                        margin-top: 3px;
                        font-size: 14px;
                    }
                    span {
                        font-size: 18px;
                        color: #9a6e3a;
                    }
                }
            }
            .vant_goPage {
                position: relative;
                h5 {
                    padding: 10px 0px 10px 10px;
                    font-size: 14px;
                    span {
                        color: #999;
                    }
                }
                i {
                    position: absolute;
                    color: #999999;
                    right: 10px;
                    top: 10px;
                }
            }
            h4 {
                background-color: #e9e9e9;
            }
            .left-10 {
                padding-left: 10px;
            }
        }
        footer {
            padding-bottom: 15px;
            overflow: auto;
            .btn_default_style {
                float: left;
                width: 29%;
                background-color: red;
                color: white;
                margin: 2%;
                padding: 5px;
                border: 0px;
                border-radius: 3px;
            }
            .main-files {
                margin: 15px;
            }
        }
    }
</style>
