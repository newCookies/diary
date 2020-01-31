<template>
    <div id="salonDetails">
        <van-nav-bar title="党建沙龙正文" :fixed="true" left-arrow @click-left="back" :z-index="999">
            <i class="icon iconfont" v-show="(list.onLine =='0')?true:false" @click="edit()" slot="right">&#xe872;</i>
        </van-nav-bar>

        <div class="life-message">
            <div class="mess-life">
                <span class="LM_text">{{ list.title }}</span>
                <span class="top" v-show="(list.isTop=='1')?true:false">顶</span>
                <span class="best" v-show="(list.isBest=='1')?true:false">精</span>
                <span class="hot" v-show="(list.isHot =='1')?true:false">
                    <img src="./../../../assets/imgs/ic_huo.png">
                </span>
            </div>
            <div class="life-name" v-if="!!list.user">
                <span>发布人：</span>
                {{ list.user.name }}
                <span class="read">浏览量：{{ (list.reads!=null)?list.reads:0 }}</span>
            </div>
            <div>
                <span>发布时间：</span>
                {{ list.addDate }}
            </div>
        </div>

        <main>
            <div class="main_content" v-html="list.content">
                {{ list.content }}
            </div>

            <div class="MC_img"  v-for="(item, index) in list.picture" :key="index"
                 @click="showImg(item)">
                <van-image width="100%" :src="item"/>
            </div>
        </main>

        <!-- 评论专区 -->
        <div class="comment-title" v-show="(list.commentList && list.commentList.toString().length > 0 ) ? true : false">
            <span class="comment-font">评论</span>
            <span class="comment-all" @click="allComment">全部评论</span>
        </div>
        <!-- 评论列表-->
        <van-list class="comment-list">
            <van-cell v-for="(item,index) in list.commentList" :key="index">
                <div class="comment-head" v-if="item.user">
                    <img :src="item.user.headPic ? api + item.user.headPic : titlePic" alt="">
                    <div class="comment-user">
                        <div class="comment-name">{{ item.user.name }}</div>
                        <div class="comment-time">{{ item.addDate }}</div>
                    </div>
                </div>
                <div class="comment-body">
                    <div v-if="item.reference!==null">回复<span class="at">@</span><span class="reply-user">{{ item.user.name}}</span>：</div>
                    {{ item.content }}
                    <span class="reply-click" @click="reply(item)">回复</span>
                </div>
            </van-cell>
        </van-list>

        <!-- 发布与删除 -->
        <div class="active-box1" v-show="(list.onLine=='0')?true:false">
            <span class="release-box" @click="release()">
                <i class="icon iconfont">&#xe651;</i>
                <span class="release">发布</span>
            </span>
            <span class="line"></span>
            <span class="delet-box" @click="delet()">
                 <i class="icon iconfont">&#xe645;</i>
                 <span class="delet">删除</span>
            </span>
        </div>

        <!-- 评论与赞 -->
        <div class="active-box2" v-show="(list.onLine=='1')?true:false">
                            <span class="comment-box" @click="comment()">
                                <i class="icon iconfont">&#xe656;</i>
                                <span class="comment">评论</span>
                                <span class="comment-num">{{ list.comments }}</span>
                            </span>
                            <span class="line"></span>
                            <span class="praise-box" @click="praise('praise')">
                                 <i class="icon iconfont">&#xe7c8;</i>
                                 <span class="praise">赞</span>
                                 <span class="praise-num">{{ list.likes }}</span>
                            </span>
        </div>

    </div>
</template>

<script>
    import {ImagePreview} from 'vant';
    import {Toast} from 'vant';
    import apiLists from './../../../interfase/apiLists'

    export default {
        name: "salonDetails",
        components: {},
        data() {
            return {
                list: [],
                titlePic: require('./../../../../public/imgs/life_default.jpg'),
                api:this.Config.apiUrl
            }
        },
        mounted() {
            this.praiseUpdate();
        },
        methods: {
            back() {
                window.history.back();
            },
            showImg(img){
                ImagePreview([img]);
            },

            //编辑
            edit() {
                this.$router.push({
                    path: '/salon/salonEdit',
                    query: {
                        idTest: this.list._id,
                        titleTest: this.list.title,
                        contentTest: this.list.content,
                    }
                });
            },

            //评论
            comment() {
                    this.$router.push({
                        path: '/salon/salonComment',
                        query: {
                            id: this.list._id,
                        }
                    });
            },

            //全部评论
            allComment() {
                this.$router.push({
                    path: '/salon/salonAllComment',
                    query: {
                        id: this.list._id,
                    }
                });
            },

            //点赞
            praise(flag) {
                let id = this.list._id;
                let me = this;
                Toast.loading({
                    mask: true,
                    message: '加载中'
                });
                apiLists.dataAjax({}, 'salon_praise', id).then(res => {
                    if(res.code == 1001){
                        setTimeout(() => {
                            Toast.clear(50);
                            Toast.success("点赞成功");
                            if(flag === 'praise'){
                                me.praiseUpdate();
                            }
                        },1000);
                    }else if (res.code == 1002) {
                        setTimeout(() => {
                            Toast.clear(50);
                            Toast.fail("你已经点过赞了");
                        },1000);
                    }else{
                        setTimeout(() => {
                            Toast.clear(50);
                            Toast.fail("点赞失败");
                        },1000);
                    }

                })
            },

            praiseUpdate(){
                let id = this.$route.query.id;
                apiLists.dataAjax({}, 'salon_details', id).then(res => {
                    for (let i = 0; i < res.result.picture.length; i++) {
                        res.result.picture[i] = this.Config.apiUrl + res.result.picture[i];
                    }
                    this.list = res.result;
                    this.list.content = this.Util.stringLineFeed(this.list.content);
                    console.log('commentList='+this.list.commentList)
                    if (this.list.comments == null) {
                        this.list.comments = 0
                    }
                    if (this.list.likes == null) {
                        this.list.likes = 0
                    }
                });
            },

            //党建沙龙发布
            release() {
                this.$dialog.confirm({
                    title: '提示',
                    message: '您确定要发布吗'
                }).then(() => {
                    Toast.loading({
                        mask: true,
                        message: '加载中...'
                    });
                    setTimeout(() => {
                        Toast.clear(50);
                        Toast.success("发布成功");
                        this.$router.push({
                            path: '/salon',
                            query: {
                                idTest:this.list._id,
                            }
                        });
                    }, 1000);
                    // on confirm
                }).catch(() => {
                    // on cancel
                });
            },

            //删除
            delet() {
                this.$dialog.confirm({
                    title: '标题',
                    message: '您确定要删除吗',
                }).then(() => {
                    Toast.loading({
                        mask: true,
                        message: '加载中...'
                    });
                    apiLists.dataAjax({}, 'salon_delet', this.$route.query.id).then(res => {
                        console.log(res);
                        if (res.code == 1001) {
                            setTimeout(() => {
                                Toast.clear(50);
                                Toast.success("删除成功");
                                window.history.back();
                            }, 1000);
                        } else {
                            setTimeout(() => {
                                Toast.clear(50);
                                Toast.success("删除失败");
                            }, 1000);
                        }
                    })
                }).catch(() => {
                    // on cancel
                });
            },

            //评论回复
            reply(parameter){
                this.$router.push({
                    path: '/salon/salonComment',
                    query: {
                        id: this.list._id,
                        replyId: parameter._id,
                    }
                });
            }

        },
        created() {

        }
    }
</script>

<style lang="scss" scoped>
    #salonDetails {
        padding-top: 56px;
        .life-message {
            padding: 0 10px 5px 10px;
            font-size: 14px;
            border-bottom: 1px solid #eee;
            div {
                line-height: 16px;
            }
            .mess-life {
                color: black;
                .LM_text{
                    font-size: 16px;
                    word-wrap: break-word;
                }
            }
            div {
                color: #666666;
            }
            .life-name {
                margin-top: 5px;
            }
        }

        .read {
            float: right;
        }

        main {
            margin: 10px 0 0 0;
            font-size: 14px;
            .main_content {
                padding: 0 10px 10px 10px;
                word-wrap: break-word;
            }

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
        .release-box {
            display: inline-block;
            margin-left: 18%;
            line-height: 30px;
            color: red;
        }
        .delet-box {
            position: absolute;
            left: 69%;
            color: red;
        }
        .comment-box {
            display: inline-block;
            margin-left: 18%;
            line-height: 30px;
            color: red;
        }
        .praise-box {
            position: absolute;
            left: 69%;
            color: red;
        }
        .line{
            display: inline-block;
            position: absolute;
            left: 50%;
            border-right: 1px solid #cccccc;
            height: 28px;
            margin-top: 7px;
        }
        .active-box1 {
            width: 100%;
            line-height: 40px;
            border-top: 1px solid #cccccc;
            border-bottom: 1px solid #cccccc;
            background-color: #eee;
            font-size: 14px;
            position: fixed;
            bottom: 0;
        }
        .active-box2 {
            width: 100%;
            line-height: 40px;
            border-top: 1px solid #cccccc;
            border-bottom: 1px solid #cccccc;
            background-color: #eee;
            font-size: 14px;
            position: fixed;
            bottom: 0;
        }
        .comment-num,
         .praise-num {
            margin-left: 3px;
        }
        .top {
            color: white;
            background-color: red;
            padding: 3px 3px 2px 2px;
        }
        .best {
            color: white;
            background-color: orange;
            padding: 3px 3px 2px 2px;
            margin-left: 5px;
        }
        .hot img {
            width: 10px;
            margin-left: 5px;
        }
        i{
            margin-right: 2px;
        }
        .comment-title{
            line-height: 40px;
            border-top: 10px solid #eee ;
            border-bottom: 1px solid #eee;
            font-size: 16px;
        }
        .comment-font{
            margin-left: 20px;
            color: #666666;
        }
        .comment-all{
            float: right;
            margin-right: 20px;
            color: red;
        }
        .comment-head img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        .comment-user{
            display: inline-block;
            margin-left: 5px;
        }
        .comment-name{
            font-size: 14px;
        }
        .comment-time{
            font-size: 13px;
            color: #666666;
        }
        .comment-body{
            margin:0px 2px;
            font-size: 14px;
            line-height: 1.5;
        }
        .comment-list{
            margin-bottom: 43px;
        }
        .reply-user{
            color: red;
            position: relative;
            top: 2%;
        }
        .reply-click{
            position:absolute ;
            right: 2%;
            color: dodgerblue;
        }
        .at{
            color: red;
            position: relative;
            top:-1.5px;
        }
    }
</style>
