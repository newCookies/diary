<template>
    <div id="lifeDetails">
        <van-nav-bar title="组织生活" :fixed="true" left-arrow @click-left="back" :z-index="999"/>
        <div class="life-message">
            <div class="mess-life">
                <span class="LM_name">{{ list.type === 1 ? '会议' : (list.type === 2 ? '学习' : '活动') }}</span>
                <span class="LM_text">{{ list.title }}</span>
            </div>
            <div class="life-name" v-if="list.creator">
                <span>发布人：</span>
                {{ list.creator.name }}
            </div>
            <div class="life-name">
                <span>时间：</span>
                {{ list.beginDate }} - {{ list.endDate }}
            </div>
            <div class="life-name">
                <span>地点：</span>
                {{ list.location }}
            </div>
            <div class="life" v-if="list.tags">
                <span v-for="(item,index) in list.tags" :key="index">{{ item.name }}</span>
            </div>
        </div>
        <main>
            <nav>主题</nav>
            <div class="main_content" v-if="list.subject" v-html="list.subject">

            </div>

            <nav>流程</nav>
            <div class="main_content">
                <div v-html="list.schedule">
                    <!--{{ list.schedule }}-->
                </div>
            </div>

            <nav>资料</nav>
            <div class="main_content">
                {{'暂无' }}
            </div>

            <nav>出席人员</nav>
            <div class="main_content">
                <div class="MC_components" v-for="(item,index) in portraitList" :key="index">
                    <portrait :comp-data="item" :comp-data-id="list.recorder"></portrait>
                </div>
                <div class="MC_all" @click="goPage('attendee')" v-if="portraitList.length > 0">
                    <van-icon name="more-o"/>
                    <p>全部</p>
                </div>
            </div>

            <nav>记录</nav>
            <div class="main_content">
                <p v-if="list.summary" v-html="list.summary"></p>
                <p v-else > 暂无记录 </p>
            </div>

            <nav>决议</nav>
            <div class="main_content">
                <p v-if="list.resolution" v-html="list.resolution"></p>
                <p v-else > 暂无记录 </p>
            </div>

            <nav>现场照片</nav>
            <div class="MC_img" v-if="list.picture && list.picture.length > 0 " v-for="(item, index) in list.picture" :key="index"
                 @click="showImg(item)">
                <van-image width="100%" :src="item"/>
            </div>
            <div v-if=" list.picture && list.picture.length < 1 " class="MC_img">
                暂无照片
            </div>

            <nav>相关数据</nav>
            <div class="main_content MC_data van-hairline--bottom" v-if="list.signMeeting">
                <van-row gutter="10">
                    <van-col span="6">
                        <span>{{ list.signMeeting.attCount }}</span>
                        <p>应到</p>
                    </van-col>
                    <van-col span="6">
                        <span>{{ list.signMeeting.signNum }}</span>
                        <p>实到</p>
                    </van-col>
                    <van-col span="6">
                        <span> {{ list.signMeeting.signLater }}</span>
                        <p>迟到</p>
                    </van-col>
                    <van-col span="6">
                        <span>{{CalculatePercentage}}</span>
                        <p>签到率</p>
                    </van-col>
                </van-row>
            </div>

            <div class="vant_goPage van-hairline--bottom" @click="goPage('signIn')">
                <h4>签到明细</h4>
                <van-icon name="arrow"/>
            </div>

            <div class="vant_goPage van-hairline--bottom" @click="goPage('inspiration')">
                <h4>心得体会</h4>
                <van-icon name="arrow"/>
            </div>

        </main>
        <footer v-if="footerShowFlag == 'myLife' && footerShow">
            <ul>
                <li class="colro-red" v-if="!list.signMyMeeting" @click="setSignIn">
                    <i class="icon iconfont">&#xe611;</i> <br>
                    <span>签到</span>
                </li>
                <li v-else="list.signMyMeeting">
                    <i class="icon iconfont">&#xe611;</i> <br>
                    <span>已签到 {{ list.signMyMeeting.beginDate.toString().substring(10,16) }}</span>
                </li>
                <li class="colro-red" @click="thoughts">
                    <i class="icon iconfont">&#xe611;</i> <br>
                    写心得
                </li>
                <li class="colro-red" @click="record">
                    <i class="icon iconfont">&#xe611;</i> <br>
                    做记录
                </li>
            </ul>
        </footer>

    </div>
</template>

<script>
    import portrait from '../../../components/portrait'
    import apiLists from './../../../interfase/apiLists'
    import {Toast} from 'vant';
    import {
        ImagePreview
    } from 'vant'

    export default {
        name: "lifeDetails",
        components: {
            portrait
        },
        data() {
            return {
                portraitList: [],
                list: [],
                footerShow: null,
                footerShowFlag: this.$route.query.source,
                userInfo: this.Util.localStorageGet('userInfo')
            }
        },
        computed: {
            CalculatePercentage() {
                return ((this.list.signMeeting.signNum / this.list.signMeeting.attCount * 100).toString().substring(0, 4)).toString() == 'NaN'
                    ? 0 + '%'
                    : ((this.list.signMeeting.signNum / this.list.signMeeting.attCount * 100).toString().substring(0, 4)) + '%';
            },

        },
        mounted() {
            console.log(this.list);
            this.getMessage();
        },
        methods: {
            /*  describe: Go back to the previous page -- 返回上一页面
            *   @parameter：null
            *   @return：null
            */
            back() {
                window.history.back();
            },
            /*  describe: Enter new page -- 进入新的页面
            *   @parameter：url
            *   @return：null
            */
            goPage(url) {
                if (!!url && typeof url === 'string') {
                    if (!!!this.$route.query.id) {
                        Toast('数据有误，请返回从新提交');
                        return;
                    }
                    this.$router.push({
                        path: '/life/' + url,
                        query: {
                            id: this.$route.query.id,
                            recorderId: this.list.recorder
                        }
                    })
                } else {
                    Toast.fail('页面错误，无法跳转');
                }
            },
            /*  describe: Display images -- 显示图片
            *   @parameter：img
            *   @return：null
            */
            showImg(img) {
                ImagePreview([img]);
            },
            setSignIn(item) {
                let me = this;
                let date = this.Util.CurentTime();
                let days = null;
                let huor = null;
                let minute = null;
                let arr = this.Util.DateDifference(item.time, date).toString().split(' ');
                arr.forEach((item) => {
                    if (item.indexOf('天') > 0) {
                        days = Number.parseInt(item);
                    }
                    if (item.indexOf('小时') > 0) {
                        huor = Number.parseInt(item);
                    }
                    if (item.indexOf('分钟') > 0) {
                        minute = Number.parseInt(item);
                    }
                });
                if (huor && huor < 0) {
                    Toast.fail("会议已开始，无法签到");
                    return;
                }
                if (huor && huor > 0) {
                    Toast.fail("请于开始前30分钟签到");
                    return;
                }
                if (minute > 30) {
                    Toast.fail("请于开始前30分钟签到");
                    return;
                }
                Toast.loading({
                    mask: true,
                    message: '加载中'
                });
                apiLists.dataAjax({
                    meetingId: this.list._id,
                    startPostion: this.Util.CurentTime()
                }, 'life_setSignIn').then(res => {
                    if (res.code == 1001) {
                        setTimeout(() => {
                            Toast.fail("签到成功");
                            me.getMessage();
                        }, 1000);
                    } else if (res.code == 1002) {
                        setTimeout(() => {
                            Toast.fail(res.message);
                        }, 1000);
                    } else {
                        Toast.fail("失败");
                    }
                })

            },
            record() {
                if (!this.list.signMyMeeting) {
                    Toast.fail("请先签到在写心得");
                    return;
                }
                if (this.list.recorder !== this.userInfo._id) {
                    Toast.fail("您不是当前会议记录者");
                    return;
                }
                localStorage.setItem('lifeDetails', JSON.stringify(this.list));
                this.$router.push({
                    path: '/life/addRecord',
                    query: {
                        id: this.list._id
                    }
                })
            },
            thoughts() {
                let url = null;
                let id = null;
                if (!this.list.signMyMeeting) {
                    Toast.fail("请先签到在写心得");
                    return;
                }
                if (this.list.expMyMeeting !== null) {
                    url = '/life/inspiration';
                    id = this.$route.query.id;
                } else {
                    url = '/life/thoughts';
                    id = this.$route.query.id;
                }
                this.$router.push({
                    path: url,
                    query: {
                        id: id
                    }
                })
            },
            getMessage() {
                let id = this.$route.query.id;
                apiLists.dataAjax({}, 'life_meetingDetails', id).then(res => {
                    console.log(res);
                    for (let i = 0; i < res.result.picture.length; i++) {
                        if (res.result.picture[i].toString().indexOf('http') < 0) {
                            res.result.picture[i] = this.Config.apiUrl + res.result.picture[i];
                        }
                    }
                    this.list = res.result;
                    for (let j = 0; j < this.list.attendUser.length; j++) {
                        if (j < 3) {
                            this.portraitList.push(this.list.attendUser[j]);
                        }
                    }
                    if (this.list.attendUser instanceof Array) {
                        this.list.attendUser.forEach(item => {
                            if (item._id == this.userInfo._id) {
                                console.log(item._id);
                                this.footerShow = true;
                            }
                        })
                    }
                    // this.list.subject = this.list.subject.replace(/\n|\r\n/g,"<br/>");
                    this.list.subject = this.Util.stringLineFeed(this.list.subject);
                    this.list.schedule = this.Util.stringLineFeed(this.list.schedule);
                    this.list.summary = this.Util.stringLineFeed(this.list.summary);
                    this.list.resolution = this.Util.stringLineFeed(this.list.resolution);
                    this.list.isPrototypeOf();
                    localStorage.setItem('userList', JSON.stringify(this.list.attendUser));
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
    #lifeDetails {
        padding-top: 46px;
        .life-message {
            padding: 10px 10px 5px 10px;
            font-size: 10px;
            div {
                line-height: 16px;
            }
            .mess-life {
                color: black;
                .LM_name {
                    background-color: #0077aa;
                    font-size: 14px;
                    color: white;
                    padding: 2px 5px;
                    border-radius: 5px;
                }
                .LM_text {
                    margin-left: 10px;
                    font-size: 18px;
                }
            }
            div {
                color: #666666;
            }
            .life-name {
                margin-top: 5px;
                font-size: 14px;
            }
            i {
                font-size: 14px;
            }
            .life {
                margin-top: 10px;
                span {
                    margin-right: 16px;
                    font-size: 14px;
                    padding: 5px 8px;
                    background-color: #e9e9e9;
                    border-radius: 5px;
                }
            }
        }

        main {
            margin: 10px 0;
            font-size: 16px;
            padding-bottom: 50px;
            .main_content {
                padding: 10px;
            }
            .MC_data {
                text-align: center;
                .van-col--6 {
                    padding: 10px 0;
                    p {
                        margin-top: 3px;
                    }
                    span {
                        font-size: 20px;
                        color: #9a6e3a;
                    }
                }
            }
            nav {
                background-color: #e9e9e9;
                padding: 5px 10px;
            }
            .MC_components {
                display: inline-block;
                width: 25%;
            }

            .MC_img {
                width: 33.333%;
                box-sizing: border-box;
                padding: 10px;
                display: inline-block;
                /deep/ .van-image__img {
                    width: 100%;
                    height: 80px;
                }
            }

            .MC_all {
                display: inline-block;
                width: 25%;
                text-align: center;
                font-size: 14px;
                i {
                    font-size: 46px;
                    color: red;
                }
            }

            .vant_goPage {
                position: relative;
                h4 {
                    padding: 10px;
                    list-style: none;
                    font-size: 16px;
                }
                i {
                    position: absolute;
                    right: 10px;
                    top: 10px;
                }
            }
        }

        footer {
            position: fixed;
            bottom: -1px;
            font-size: 14px;
            width: 100%;
            text-align: center;
            background-color: #e9e9e9;
            ul {
                width: 100%;
                li {
                    display: inline-block;
                    width: 33.333%;
                    padding: 10px;
                }
                .colro-red {
                    color: red;
                }
            }

        }
    }
</style>
