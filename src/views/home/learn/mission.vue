<template>
    <section id="mission">
        <van-nav-bar title="学习任务" :fixed="true" left-arrow @click-left="back" :z-index="999"/>
        <main>
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
                            <compLife :comp-data="item"></compLife>
                        </van-cell>
                    </van-list>
                </van-tab>
            </van-tabs>
        </main>
    </section>
</template>

<script>
    import compLife from '../../../components/compLife'
    import apiLists from '../../../interfase/apiLists'
    export default {
        name: "mission",
        components:{
            compLife
        },
        data() {
            return {
                allList: [],
                all_loading: false,
                all_finished: false,
                all_pageIndex: 1,
                all_pageSize: 10,
                myList: [],
                my_loading: false,
                my_finished: false,
                my_pageIndex: 1,
                my_pageSize: 10,
                active: 0
            }
        },
        methods:{
            back(){
                window.history.back();
            },
            onLoadAll() {
                let me = this;
                me.all_loading = true;
                setTimeout(() => {
                    apiLists.dataAjax({
                        pageNo: me.all_pageIndex,
                        pageSize: me.all_pageSize
                    }, 'learn_allMission').then(res => {
                        let data = res.result.list;
                        if(res.code == 1001){
                            me.all_pageIndex++;
                            for (let i = 0; i < data.length; i++) {
                                me.allList.push({
                                    img: data[i].headPic, // 头像
                                    lifeDescribe: data[i].title,
                                    name: data[i].user.name,
                                    time: data[i].publicDate,
                                    site: data[i].studyPerson.length,
                                    goPageUrl: '/learn/missionDetails',
                                    id: data[i]._id,
                                    source: 'learn'
                                });
                            }
                            if (data.length < me.all_pageSize) {
                                me.all_finished = true;
                            }
                            me.all_loading = false;
                            console.log("all_finished = ",me.all_finished);
                        }else{
                            me.all_finished = true;
                            me.all_loading = false;
                        }
                    });
                }, 500);
            },
            onLoadMy() {
                let me = this;
                me.my_loading = true;
                setTimeout(() => {
                    apiLists.dataAjax({
                        getMine: 1,
                        pageNo: me.my_pageIndex,
                        pageSize: me.my_pageSize
                    }, 'learn_allMission').then(res => {
                        let data = res.result.list;
                        if(res.code == 1001){
                            me.my_pageIndex++;
                            for (let i = 0; i < data.length; i++) {
                                console.log(data);
                                me.myList.push({
                                    img: data[i].headPic, // 头像
                                    lifeDescribe: data[i].title,
                                    name: data[i].user.name,
                                    time: data[i].publicDate,
                                    site: data[i].studyPerson.length,
                                    goPageUrl: '/learn/missionDetails',
                                    id: data[i]._id,
                                });
                            }
                            console.log("data.length",data.length);
                            console.log("my_pageSize",me.my_pageSize);
                            if (data.length < me.my_pageSize) {
                                me.my_finished = true;
                            }
                            me.my_loading = false;
                            console.log("my_finished = ",me.my_finished);
                        }else{
                            me.my_finished = true;
                            me.my_loading = false;
                        }
                    });
                }, 500);
            },
        },
    }
</script>

<style lang="scss" scoped>
    #mission{
        padding-top: 46px;
    }
</style>
