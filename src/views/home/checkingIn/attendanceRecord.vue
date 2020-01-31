<template>
    <div id="attendanceRecord">
        <van-nav-bar title="考勤记录" :fixed="true" left-arrow @click-left="back" :z-index="999"/>
        <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="yearArr" @change="onLoad" />
            <van-dropdown-item v-model="value2" :options="monthArr" @change="onLoad" />
        </van-dropdown-menu>
        <main>
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <van-cell v-for="(item,index) in list" :key="index">
                    <img :src="item.headPic ? this.Config.apiUrl + item.headPic : hedaImg" alt="">
                    <div class="content">
                        <p>
                            {{ item.user.name }}
                        </p>
                        <p>
                            {{ item.addDate }} 签到
                        </p>
                    </div>
                </van-cell>
            </van-list>

        </main>
    </div>
</template>

<script>
    import apiList from './../../../interfase/apiLists'
    export default {
        name: "attendanceRecord",
        data() {
            return {
                value1: 2019,
                value2: 8,
                pageNo: 1,
                pageSize: 10,
                yearArr: [],
                monthArr: [],
                hedaImg: require('./../../../../public/imgs/heda-default.png'),
                loading: false,
                finished: false,
                list:[]
            }
        },
        mounted(){
            for (let i = 2019; i > 2016; i--) {
                this.yearArr.push({
                    text: i + '年',
                    value: i
                });
            }
            for (let i = 1; i < 13; i++) {
                this.monthArr.push({
                    text: i + '月',
                    value: i
                });
            }

        },
        methods:{
            back(){
                window.history.back();
            },
            onLoad(){
                let me = this;
                me.loading = true;
                setTimeout(() => {
                    apiList.dataAjax({
                        year: me.value1,
                        month: me.value2,
                        pageNo: me.pageNo,
                        pageSize: me.pageSize
                    },'checkingIn_queryList').then(res => {
                        console.log("res = ",res);
                        if(res.code == 1001){
                            me.list = res.result.list;
                            console.log("list = ",me.list);
                        }
                        me.finished = true;
                        me.loading = false;
                    })
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
    #attendanceRecord{
        padding-top: 46px;
        main{
            img{
                width: 40px;
                height: 40px;
                position: absolute;
                left: 0px;
                top: 2px;
            }
            .content{
                padding-left: 60px;
                p{
                    font-size: 14px;
                }
            }
        }
    }
</style>
