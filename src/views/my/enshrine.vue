<template>
    <section id="enshrine">
        <van-nav-bar title="我的收藏" :fixed="true" left-arrow @click-left="back"  :z-index="999"/>
        <main>
            <van-tabs v-model="active">
                <van-tab title="自主学习">
                    <van-list v-model="alone_loading" :finished="alone_finished" @load="aloneOnLoad()">
                        <van-cell v-for="(item,index) in aloneList" :key="index">
                            <compLife :comp-data="item"></compLife>
                        </van-cell>
                    </van-list>
                    <!-- 无数据 -->
                    <div class="box" v-show="aloneShow">
                        <img src="./../../assets/imgs/ic_empty.png">
                        <div class="no-data">当前暂无数据~</div>
                    </div>
                </van-tab>

            <van-tab title="党建先锋">
                <van-list v-model="pioneer_loading" :finished="pioneer_finished" @load="pioneerOnLoad()">
                    <van-cell v-for="(item,index) in pioneerList" :key="index">
                        <compPioneer :comp-data="item"></compPioneer>
                    </van-cell>
                </van-list>
                <!-- 无数据 -->
                <div class="box" v-show="pioneerShow">
                    <img src="./../../assets/imgs/ic_empty.png">
                    <div class="no-data">当前暂无数据~</div>
                </div>
            </van-tab>

            <van-tab title="党建沙龙">
                <van-list v-model="salon_loading" :finished="salon_finished"  @load="salonOnLoad()">
                    <van-cell v-for="(item,index) in salonList" :key="index">
                        <compSalon :comp-data="item"></compSalon>
                    </van-cell>
                </van-list>
                <!-- 无数据 -->
                <div class="box" v-show="salonShow">
                    <img src="./../../assets/imgs/ic_empty.png">
                    <div class="no-data">当前暂无数据~</div>
                </div>
            </van-tab>

            <van-tab title="工作日志">
                <van-list v-model="record_loading" :finished="record_finished" @load="recordOnLoad()">
                    <van-cell v-for="(item,index) in recordList" :key="index">
                        <compRecord :comp-data="item"></compRecord>
                    </van-cell>
                    <!-- 无数据 -->
                    <div class="box" v-show="recordShow">
                        <img src="./../../assets/imgs/ic_empty.png">
                        <div class="no-data">当前暂无数据~</div>
                    </div>
                </van-list>
            </van-tab>

                <van-tab title="新闻资讯">
                    内容 5
                </van-tab>
            </van-tabs>
        </main>
    </section>
</template>

<script>
    import compLife from '../../components/compLife';
    import compPioneer from '../home/pioneer/compPioneer';
    import compSalon from '../home/salon/compSalon';
    import compRecord from '../home/record/compRecord';
    import apiLists from './../../interfase/apiLists'
    export default {
        name: "enshrine",
        components:{
            compLife,
            compPioneer,
            compSalon,
            compRecord,
        },
        data(){
            return{
                active:1,
                all_pageIndex: 1,
                all_pageSize: 10,

                aloneList: [],
                alone_loading: false,
                alone_finished: false,
                aloneShow:false,

                pioneerList: [],
                pioneer_loading: false,
                pioneer_finished: false,
                pioneerShow:false,

                salonList: [],
                salon_loading: false,
                salon_finished: false,
                salonShow:false,

                recordList: [],
                record_loading: false,
                record_finished: false,
                recordShow:false
            }
        },
        methods:{
            back(){
                window.history.back();
            },

            //加载自主学习列表
            aloneOnLoad() {
                let me = this;
                me.all_loading = true;
                setTimeout(() => {
                    apiLists.dataAjax({
                        pageNo: me.all_pageIndex,
                        pageSize: me.all_pageSize,
                        type:1
                    }, 'enshrine_list').then(res => {
                        let data = res.result.list;
                        if(res.code == 1001){
                            me.all_pageIndex++;
                            for (let i = 0; i < data.length; i++) {
                                me.aloneList.push({
                                    img: data[i].headPic, // 头像
                                    lifeDescribe: data[i].subject,
                                    name: data[i].creator.name,
                                    time: data[i].addDate,
                                    site: data[i].location,
                                    meetingType: data[i].type,
                                    goPageUrl: '/learn/aloneDetail',
                                    id: data[i]._id,
                                });
                            }
                            if(data.length==0){
                                this.aloneShow=true;
                            }
                            if (data.length < me.all_pageSize) {
                                me.alone_finished = true;
                            }
                            me.alone_loading = false;
                        }else{
                            me.alone_finished = true;
                            me.alone_loading = false;
                        }
                    });
                }, 500);
            },

           //加载我的先锋收藏列表
            pioneerOnLoad() {
                let me = this;
                // 异步更新数据
                me.pioneer_loading = true;
                setTimeout(() => {
                    apiLists.dataAjax({
                        pageNo: me.all_pageIndex,
                        pageSize: me.all_pageSize,
                        type:2
                    }, 'enshrine_list').then(res =>{
                        let data = res.result.list;
//                        console.log("res = ", data);
                        if(res.code == 1001) {
                            me.all_pageIndex++;
                            for (let i = 0; i < data.length; i++) {
                                me.pioneerList.push({
                                    img: data[i].headPic,
                                    lifeDescribe: data[i].subject,
                                    name: data[i].user.name,
                                    time: data[i].addDate,
                                    site: data[i].location,
                                    goPageUrl: '/pioneer/pioneerDetails',
                                    id: data[i]._id,
                                });
                            }
                            if(data.length==0){
                                this.pioneerShow=true;
                            }
                            if (data.length < me.all_pageSize) {
                                me.pioneer_finished = true;
                            }
                            me.pioneer_loading = false;
                        }else{
                            me.pioneer_finished = true;
                            me.pioneer_loading = false;
                        }
                    });
                }, 500);
            },

            //加载我的沙龙收藏列表
            salonOnLoad() {
                let me = this;
                // 异步更新数据
                me.salon_loading = true;
                setTimeout(() => {
                    apiLists.dataAjax({
                        pageNo: me.all_pageIndex,
                        pageSize: me.all_pageSize,
                        type:3
                    }, 'enshrine_list').then(res => {
                        let data = res.result.list;
                        console.log("res = ", data);
                        if(res.code == 1001){
                            me.all_pageIndex++;
                            for (let i = 0; i < data.length; i++) {
                                me.salonList.push({
                                    img: data[i].user.headPic,
                                    lifeDescribe: data[i].title,
                                    name: data[i].user.name,
                                    time: data[i].addDate,
                                    read: data[i].reads,
                                    online:data[i].onLine,
                                    top:data[i].isTop,
                                    best:data[i].isBest,
                                    hot:data[i].isHot,
                                    commentCount: data[i].comments,
                                    praiseCount: data[i].likes,
                                    goPageUrl: '/salon/salonDetails',
                                    id: data[i]._id,
                                });
                            }
                            if(data.length==0){
                                this.salonShow=true;
                            }
                            if (data.length < me.all_pageSize) {
                                me.salon_finished = true;
                            }
                            me.salon_loading = false;
                        }else{
                            me.salon_finished = true;
                            me.salon_loading = false;
                        }
                    });
                }, 500);
            },

            //加载工作日志收藏列表
            recordOnLoad() {
                let me = this;
                // 异步更新数据
                me.record_loading = true;
                setTimeout(() => {
                    apiLists.dataAjax({
                        pageNo: me.all_pageIndex,
                        pageSize: me.all_pageSize,
                        type:4
                    }, 'enshrine_list').then(res => {
                        let data = res.result.list;
                        console.log("res = ", data);
                        if (res.code == 1001) {
                            me.all_pageIndex++;
                            for (let i = 0; i < data.length; i++) {
                                me.recordList.push({
                                    img: data[i].user.headPic,
                                    lifeDescribe: data[i].title,
                                    name: data[i].user.name,
                                    time: data[i].addDate,
                                    site: data[i].address,
                                    goPageUrl: '/record/recordDetails',
                                    id: data[i]._id,
                                });
                            }
                            if(data.length==0){
                                this.recordShow=true;
                            }
                            if (data.length < me.all_pageSize) {
                                me.record_finished = true;
                            }
                            me.record_loading = false;
                        }else{
                            me.record_finished = true;
                            me.record_loading = false;
                        }
                    });
                }, 500);
            },

        },
    }
</script>

<style lang="scss" scoped>
    #enshrine{
        main{
            padding: 0 15px;
        }
    }
    .box{
        width: 100%;
        text-align: center;
        margin-top: 160px;
    }
    img{
        width: 100px;
    }
    .no-data{
        font-size: 14px;
        margin-top: 10px;
    }
</style>
