<template>
    <section id="life_dataShow">
        <img v-if="copmData.user" :src="copmData.user.headPic ? this.Config.apiUrl + copmData.user.headPic : hedaImg" alt="">
        <div class="LD_box" v-if="copmData.user">
            <div v-if="!copmData.studyTimeList">
                <p class="LD_name">{{ copmData.user.name }}</p>
                <p v-if="copmData.beginDate">{{ copmData.beginDate }} 签到
                    <span> {{ copmData.endDate }} 签退</span>
                </p>
                <p v-if="copmData.subOrganization">签到总时长：
                    {{ this.Util.DateDifference(copmData.endDate,copmData.beginDate) }}
                </p>
                <p v-if="!copmData.subOrganization"> {{ copmData.addDate }} </p>
            </div>
            <div v-else>
                <p class="LD_name">{{ copmData.user.name }}  <label> {{ copmData.myProgress == 1 ? '进行中' : '已完成'}}</label></p>
                <p v-if="copmData.studyTimeList"
                   v-for="(item, index) in copmData.studyTimeList" :key="index">{{ item.beginDate }} 开始
                    <span v-if="item.endDate"> {{ item.endDate }} 结束</span>
                </p>
                <p> 总时长：{{ this.Util.computingTime(copmData.timeForStudy) }} </p>
            </div>
            <div class="delete" v-if="copmData.inspirationFlag">
                <button type="button" @click="goPage('thoughts')">编辑</button>
                <button @click="deleteInspiration">删除</button>
            </div>

        </div>
        <p class="content"> {{ copmData.content }} </p>
    </section>
</template>

<script>
    import apiLists from "../interfase/apiLists";
    import { Toast } from  'vant'
    export default {
        name: "life_dataShow",
        props:{
            copmData: Object,
        },
        data(){
            return {
                hedaImg: require('./../../public/imgs/heda-default.png')
            }
        },
        mounted(){
            console.log(this.copmData);
            localStorage.setItem('content',this.copmData.content);
        },
        methods:{
            goPage(url){
                localStorage.setItem('inspiration',this.copmData.content);
                this.$router.push({
                    path: '/life/thoughts',
                    query: {
                        id: this.copmData._id,
                        source: 'inspiration'
                    }
                })
            },
            deleteInspiration(){
                console.log(this.copmData._id);
                if(!!this.copmData._id){
                    Toast.loading({
                        mask: true,
                        message: '加载中'
                    });
                    apiLists.dataAjax({},'pulic_deleteThoughts',this.copmData._id).then(res => {
                        console.log(res);
                        if(res.code == 1001){
                            setTimeout(() => {
                                Toast.success("删除成功");
                                localStorage.setItem('inspiration',null);
                                window.history.back();
                            },1000)
                        }else if(res.code == 1002){
                            setTimeout(() => {
                                Toast.success(res.message);
                            },1000)

                        }
                    })
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
    #life_dataShow{
        img{
            width: 36px;
            height: 36px;
            border-radius: 50%;
            position: absolute;
        }
        .LD_box{
            padding-left: 50px;
            font-size: 14px;
            color: #999999;
            .LD_name{
                font-size: 16px;
                color: black;
                label{
                    background-color: #999999;
                    color: white;
                    font-size: 12px;
                    padding: 3px 6px 2px 6px;
                    border-radius: 5px;
                }
            }
            span{
                float: right;
            }
            p{
                line-height:18px;
            }
            .delete{
                position: absolute;
                right: 0px;
                top: 0px;
                button{
                    text-align: center;
                    padding: 0 10px;
                    background-color: white;
                    border: 1px solid red;
                    border-radius: 3px;
                    margin-left: 5px;
                    color: red;
                }

            }
        }
        .content{
            font-size: 16px;
            margin-top: 10px;
            line-height: 18px;
        }
    }
</style>
