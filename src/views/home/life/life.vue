<template>
    <div id="life">
        <van-nav-bar title="组织生活" :fixed="true" left-arrow @click-left="back" :z-index="999">
            <van-icon name="add-o" slot="right" @click="goNewPage('add')"/>
        </van-nav-bar>
        <van-tabs :sticky="true" :offset-top="46" v-model="active">
            <van-tab title="全部">
                <van-list v-model="all_loading" :finished="all_finished" finished-text="没有更多了" @load="onLoadAll">
                    <van-cell v-for="(item,index) in allList" :key="index">
                        <compLife :comp-data="item"></compLife>
                    </van-cell>
                </van-list>
            </van-tab>
            <van-tab title="我的">
                <van-list v-model="my_loading" :finished="my_finished" finished-text="没有更多了" @load="onLoadMy">
                    <van-cell v-for="(item,index) in myList" :key="index">
                        <compLife :comp-data="item" :comp-my="'myLife'"></compLife>
                        <ul class="van-hairline--top">
                            <li class="red-color" v-if="!item.signBeginDate" @click="setSignIn(item)">签到</li>
                            <li v-else="item.signBeginDate" class="">已签到</li>
                            <li class="red-color" @click="edit(item)">编辑</li>
                            <li class="red-color" @click="pigeonhole(item, '3')">归档</li>
                        </ul>
                    </van-cell>
                </van-list>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import compLife from '../../../components/compLife'
    import apiLists from './../../../interfase/apiLists'
    import {Toast} from 'vant';

    export default {
        name: "life",
        components: {
            compLife
        },
        computed: {
            fItem () {
                if (this.item.length == 0)            return [];
                if (this.item[0].data) {
                    return this.item.map((v) => v.data);
                } else {
                    return this.item;
                }
            }
        },
        data() {
            return {
                allList: [],
                all_loading: false,
                all_finished: false,
                all_pageIndex: 1,
                all_pageSize: 10,
                myList: [],
                my_pageIndex: 1,
                my_pageSize: 10,
                my_loading: false,
                my_finished: false,
                active: 0,
            }
        },
        mounted() {

        },
        methods: {
            back() {
                window.history.back();
            },
            /*  describe: Enter add organizational life -- 进入添加组织生活页面
			 *   @parameter：url
			 *   @return：null
			 */
            goNewPage(url) {
                if (!!url && typeof url === 'string') {
                    localStorage.setItem('userList', null);
                    localStorage.setItem('portraitList', null);
                    localStorage.setItem('recorder', null);
                    let addLifeMessage = {
                        typeValue: null, // 类型
                        startTimeValue: null, // 开始时间
                        onEndTime: null, // 结束时间
                        locationVal: null, // 地点
                        subjectVal: null, // 主题
                        scheduleVal: null, // 流程
                        portraitList: null, // 标签
                    };
                    localStorage.setItem('addLifeMessage', JSON.stringify(addLifeMessage));
                    this.$router.push({
                        path: '/life/addLife',
                        query: {}
                    });
                } else {
                    Toast.fail('页面错误，无法跳转');
                }

            },
            /*  describe: Enter editorial organization life -- 进入编辑组织生活页面
            *   @parameter：Object
            *   @return：null
            */
            edit(item) {
                if (!!item && typeof item === 'object') {
                    this.$router.push({
                        path: '/life/addLife',
                        query: {
                            id: item.id,
                            source: 'edit'
                        }
                    })
                } else {
                    Toast('数据有误，请返回从新再试');
                }
            },
            /*  describe: Load all the data for the organization's life -- 加载组织生活全部数据
            *   @parameter：null
            *   @return：null
            */
            onLoadAll() {
                let me = this;
                // 异步更新数据
                me.all_loading = true;
                setTimeout(() => {
                    apiLists.dataAjax({
                        pageNo: me.all_pageIndex,
                        pageSize: me.all_pageSize
                    }, 'life_allMeeting').then(res => {
                        if (res.code == 1001) {
                            let data = res.result.list;
                            if(data instanceof Array){
                                for (let i = 0; i < data.length; i++) {
                                    let meeting = [];
                                    if (data[i].tags.length > 0) {
                                        for (let n = 0; n < data[i].tags.length; n++) {
                                            meeting.push(data[i].tags[n].name);
                                        }
                                    }
                                    me.allList.push({
                                        img: data[i].titlePic,
                                        lifeDescribe: data[i].title,
                                        name: data[i].creator.name,
                                        time: data[i].beginDate,
                                        site: data[i].location,
                                        meeting: meeting,
                                        meetingType: data[i].type,
                                        goPageUrl: '/life/lifeDetails',
                                        id: data[i]._id,
                                        type: data[i].type,
                                    });
                                }
                                me.allList = JSON.parse(JSON.stringify(me.allList));
                                me.all_pageIndex++;
                                if (data.length < me.all_pageSize) {
                                    me.all_finished = true;
                                }
                            }else{
                                me.all_finished = true;
                            }
                            me.all_loading = false;
                        } else {
                            me.all_finished = true;
                            me.all_loading = false;
                        }
                    });
                }, 500);

            },
            /*  describe: Load my the data for the organization's life -- 加载组织生活中我的数据
            *   @parameter：null
            *   @return：null
            */
            onLoadMy() {
                let me = this;
                me.my_loading = true;
                // 异步更新数据
                setTimeout(() => {
                    apiLists.dataAjax({
                        pageNo: me.my_pageIndex,
                        pageSize: me.my_pageSize
                    }, 'life_myMeeting').then(res => {
                        if (res.code == 1001) {
                            let data = res.result.list;
                            for (let i = 0; i < data.length; i++) {
                                let meeting = [];
                                if (data[i].tags.length > 0) {
                                    for (let n = 0; n < data[i].tags.length; n++) {
                                        meeting.push(data[i].tags[n].name);
                                    }
                                }
                                me.myList.push({
                                    img: data[i].titlePic,
                                    lifeDescribe: data[i].title,
                                    name: data[i].creator.name,
                                    time: data[i].beginDate,
                                    site: data[i].location,
                                    meeting: meeting,
                                    meetingType: data[i].type,
                                    goPageUrl: '/life/lifeDetails',
                                    id: data[i]._id,
                                    type: data[i].type,
                                    list: data[i],
                                    signBeginDate:data[i].signBeginDate
                                });
                            }
                            me.my_pageIndex++;
                            console.log("myList = ",me.myList);
                            if (data.length < me.my_pageSize) {
                                me.my_finished = true;
                            }
                            me.my_loading = false;
                        } else {
                            me.my_finished = true;
                            me.my_loading = false;
                        }
                    });
                }, 500);
            },
            /*  describe: on pigeonhole -- 点击归档
            *   @parameter：Object、status
            *   @return：null
            */
            pigeonhole(item, status) {
                if (typeof item === 'object' && typeof status === 'string') {
                    apiLists.dataAjax({}, 'life_pigeonhole', item.id + '/' + status).then(res => {
                        console.log("res = ", res);
                        if (res.code == 1001) {
                            Toast.success('成功');
                        } else if (res.code == 1002) {
                            Toast.fail('归档失败');
                        } else if (res.code == 1005) {
                            Toast.fail('归档错误');
                        }
                    });
                } else {
                    Toast('数据有误，请返回从新再试');
                }
            },
            setSignIn(item){
                let me = this;
                let date = this.Util.CurentTime();
                let days = null;
                let huor = null;
                let minute = null;
                let arr = this.Util.DateDifference(item.time, date).toString().split(' ');
                arr.forEach((item) => {
                    if(item.indexOf('天') > 0){
                        days = Number.parseInt(item);
                    }
                    if(item.indexOf('小时') > 0){
                        huor = Number.parseInt(item);
                    }
                    if(item.indexOf('分钟') > 0){
                        minute = Number.parseInt(item);
                    }
                });
                if(huor && huor < 0){
                    Toast.fail("会议已开始，无法签到");
                    return ;
                }
                if(huor && huor > 0){
                    Toast.fail("请于开始前30分钟签到");
                    return ;
                }
                if(minute > 30){
                    Toast.fail("请于开始前30分钟签到");
                    return ;
                }
                Toast.loading({
                    mask: true,
                    message: '加载中'
                });
                apiLists.dataAjax({
                    meetingId: item.id,
                    startPostion: this.Util.CurentTime()
                },'life_setSignIn').then(res => {
                    console.log(res);
                    if(res.code == 1001){
                        setTimeout(()=>{
                            Toast.fail("签到成功");
                            me.myList = [];
                            me.my_pageIndex = 1;
                            me.my_loading = false;
                            me.my_finished = false;
                            me.onLoadMy();
                        },1000);
                    }else if(res.code == 1002){
                        setTimeout(()=>{
                            console.log(res.message)
                            Toast.fail("签到失败");
                        },1000);
                    }else{
                        Toast.fail("失败");
                    }
                })

            }
        },
    }
</script>

<style lang="scss" scoped>
    #life {
        padding-top: 46px;
        ul {
            padding-top: 8px;
            margin-top: 5px;
            li {
                display: inline-block;
                width: 33.33%;
                text-align: center;
                font-size: 12px;
            }
            .red-color {
                color: red;
            }
        }
    }
</style>
