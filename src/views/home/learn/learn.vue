<template>
    <section id="learn">
        <van-nav-bar title="在线学习" :fixed="true" left-arrow @click-left="back" :z-index="999"/>
        <main>
            <router-link :to='urlLearnMission'>
                <div class="mission">
                    <img :src="missionImg" alt="">
                    <p>学习任务</p>
                    <span>总计：<span class="num">{{ num.allStudyTask }}</span>条</span>
                    <span> 未完成：<span class="num">{{ num.unfinishedStudyTask }}</span>条</span>
                </div>
            </router-link>

            <router-link :to='urlLearnAlone'>
                <div class="initiative">
                    <img :src="initiativeImg" alt="">
                    <p>自主学习</p>
                    <span>总计：<span class="num">{{ num.allStudy }}</span>条 </span>
                    <span> 未完成：<span class="num">{{ num.unfinishedStudy }}</span>条</span>
                </div>
            </router-link>

        </main>

    </section>
</template>

<script>
    import apilist from './../../../interfase/apiLists'
    export default {
        name: "learn",
        data() {
            return {
                urlLearnAlone: '/learn/alone',
                urlLearnMission: '/learn/mission',
                num: {},
                missionImg: require('./../../../../public/imgs/icon_xxrw.png'),
                initiativeImg: require('./../../../../public/imgs/icon_zzxx.png')

            }
        },
        mounted(){
            apilist.dataAjax({},'learn_aloneNum').then(res => {
                console.log(res);
                this.num = res.result;
            })
        },
        methods: {
            // 返回上页
            back() {
                window.history.back();
            },
        },
    }
</script>

<style lang="scss" scoped>
    #learn {
        padding-top: 46px;
        .mission {
            padding: 20px 0;
            text-align: center;
            border-bottom: 3px solid #e9e9e9;
        }
        .initiative {
            padding: 20px 0;
            text-align: center;
            border-bottom: 3px solid #e9e9e9;
        }
        img {
            width: 78px;
            height: 78px;
            margin-bottom: 5px;
        }
        p {
            font-size: 18px;
            margin-bottom: 5px;
        }
        span {
            font-size: 16px;
            color: #666666;
        }
        .num{
            color: #88c94a;
        }
    }

</style>
