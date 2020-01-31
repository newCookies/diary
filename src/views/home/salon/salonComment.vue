<template>
    <section id="salonComment">
        <van-nav-bar title="党建沙龙评论" :fixed="true" left-arrow @click-left="back" :z-index="999">
            <span @click="keep()" slot="right" >保存</span>
        </van-nav-bar>
        <textarea placeholder="请输入评论内容" ref="commentContent" v-model="contentVal"></textarea>
    </section>
</template>

<script>
    import apiLists from './../../../interfase/apiLists';
    import { Toast } from 'vant';
    export default {
        name: "salonComment",
        data() {
            return {
                contentVal:'',
            }
        },
        methods:{
            back(){
                window.history.back();
            },
            keep() {
                if(!this.contentVal){
                    this.$toast({
                        message: '请输入评论内容',
                        icon: 'cross'
                    });
                    return ;
                }else {
                        Toast.loading({
                            mask: true,
                            message: '加载中'
                        });
                        apiLists.dataAjax({
                            salonId:this.$route.query.id,//沙龙id
                            commentId:this.$route.query.replyId,
                            content: this.contentVal, //内容
                        }, 'salon_comment').then(res => {
                            console.log(res);
                            if (res.code == 1001) {
                                setTimeout(() => {
                                    Toast.clear(50);
                                    Toast.success("评论成功");
                                    window.history.back();
                                },1000);
                            } else {
                                setTimeout(() => {
                                    Toast.clear(50);
                                    Toast.fail("评论失败");
                                },1000);
                            }
                        })
                   }
                }

        }
    }
</script>

<style lang="scss" scoped>
    #salonComment{
        padding-top: 56px;
        h1{
            font-weight: normal;
            font-size: 16px;
            text-align: center;
        }
        textarea{
            display: block;
            width: 92%;
            height: 565px;
            font-size: 14px;
            margin: 5px auto;
            border:1px solid #eee;
            padding-left: 7px;
            padding-right: 7px;
            padding-top: 7px;
        }
    }
</style>