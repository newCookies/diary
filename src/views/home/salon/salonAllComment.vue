<template>
    <section id="salonAllComment">
        <van-nav-bar title="全部评论" :fixed="true" left-arrow @click-left="back" :z-index="999"/>
        <!-- 评论列表-->
        <van-list class="comment-list" v-model="comment_loading" :finished="comment_finished" @load="onLoadAll">
            <van-cell v-for="(item,index) in commentList" :key="index">
                <div class="comment-head">
                    <img :src="item.img ? api + item.img : titlePic" alt="">
                    <div class="comment-user">
                        <div class="comment-name">{{ item.name }}</div>
                        <div class="comment-time">{{ item.time }}</div>
                    </div>
                </div>
                <div class="comment-body">
                    <div v-if="item.reference!==null">回复<span class="at">@</span><span class="reply-user">{{ item.name}}</span>：</div>
                    {{ item.content }}
                </div>
            </van-cell>
        </van-list>
    </section>
</template>

<script>
    import apiLists from './../../../interfase/apiLists';
    import { Toast } from 'vant';
    export default {
        name: "salonAllComment",
        data() {
            return {
                titlePic: require('./../../../../public/imgs/life_default.jpg'),
                api:this.Config.apiUrl,
                commentList:[],
                comment_loading: false,
                comment_finished: false,
                comment_pageIndex: 1,
                comment_pageSize: 10,
            }
        },
        mounted(){

        },
        methods:{
            back(){
                window.history.back();
            },
            onLoadAll() {
                let id = this.$route.query.id;
                let me = this;
                // 异步更新数据
                me.comment_loading = true;
                setTimeout(() => {
                    apiLists.dataAjax({
                        pageNo:this.comment_pageIndex,
                        pageSize:this.comment_pageSize,
                        salonId:id
                    }, 'salon_allcomment').then(res =>{
                        let data = res.result.list;
                        console.log("res = ", data);
                        if(res.code == 1001) {
                            me.comment_pageIndex++;
                            for (let i = 0; i < data.length; i++) {
                                me.commentList.push({
                                    img:data[i].user.headPic,
                                    name:data[i].user.name,
                                    time:data[i].addDate,
                                    content:data[i].content,
                                    id: data[i]._id,
                                    reference:data[i].reference
                                });
                            }
                            if (data.length < me.comment_pageSize) {
                                me.comment_finished = true;
                            }
                            me.comment_loading = false;
                        }else{
                            me.comment_finished = true;
                            me.comment_loading = false;
                        }
                        // 加载状态结束
//                        me.all_loading = false;
                    });
                    // 数据全部加载完成
//                    me.all_finished = true;
                }, 500);
            },
        }
    }
</script>

<style lang="scss" scoped>
    #salonAllComment{
        padding-top: 56px;
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
        .reply-user{
            color: red;
            position: relative;
            top: 2%;
        }
        .at{
            color: red;
            position: relative;
            top:-1.5px;
        }
    }
</style>