<template>
    <section id="selectionID">
        <van-nav-bar :title="titleName" :fixed="true" left-arrow @click-left="back"
                     :z-index="999" right-text="确定" @click-right="onClickRight" />
        <main>
            <div class="title van-hairline--bottom">
                <van-icon name="passed" :color="allColor" @click="allPitch"/>
                <span>全选</span>
            </div>
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoadAll">
                <van-cell v-for="(item,index) in list" :key="index">
                    <div class="M_passed" v-if="index > -1">
                        <van-icon name="passed" :color="passedColor" @click="recordPassword($event,index)"/>
                        <img :src="auth_logo" alt="">
                        <span>{{ item.name }}</span>
                    </div>
                </van-cell>
            </van-list>

        </main>
    </section>
</template>

<script>
    import apiLists from "../../../interfase/apiLists";
    import { mapGetters } from 'vuex'
    export default {
        name: "selectionID",
        computed: {
            ...mapGetters(['userIDList'])
        },
        mounted() {

        },
        data() {
            return {
                titleName: this.$route.query.name,
                titleID: this.$route.query.id,
                auth_logo: require("./../../../../public/imgs/heda-default.png"),
                passedColor: '',
                allColor: '',
                list: [],
                loading: false,
                finished: false,
                userList: [],

            }
        },
        methods: {
            /*  describe: Go back to the previous page -- 返回上一页面
			 *   @parameter：null
			 *   @return：null
			 */
            back() {
                window.history.back();
            },
            /*  describe: select all -- 选择全部
            *   @parameter：$Event
            *   @return：null
            */
            allPitch(e){
                if (e.target.style.color === 'red') {
                    e.target.style.color = '';
                    this.userList = [];
                    this.passedColor = '';
                }else{
                    this.userList = [];
                    e.target.style.color = 'red';
                    this.passedColor = 'red';
                    this.allColor = 'red';
                    this.list.forEach(item => {
                        this.userList.push(item);
                    });
                }
            },
            /*  describe: Tag selection -- 标记选择
            *   @parameter：$Event、index
            *   @return：null
            */
            recordPassword(e, index) {
                if (e.target.style.color === 'red') {
                    e.target.style.color = '';
                    this.userList.splice(this.userList.indexOf(this.list[index]), 1);
                } else {
                    e.target.style.color = 'red';
                    this.userList.push(this.list[index]);
                }
            },
            /*  describe: Load all personnel -- 加载全部人员
            *   @parameter：null
            *   @return：null
            */
            onLoadAll() {
                let me = this;
                // 异步更新数据
                me.loading = true;
                setTimeout(() => {
                    apiLists.dataAjax({}, 'user_personalInformation', this.titleID).then(res => {
                        if (res.code == 1001) {
                            me.list = res.result.list;
                        }
                    });
                    me.finished = true;
                    me.loading = false;
                }, 500);
            },
            /*  describe: Confirm selectors -- 确认选择人员
            *   @parameter：null
            *   @return：null
            */
            onClickRight(){
                let userList = localStorage.getItem("userList");
                userList = JSON.parse(userList);
                if(userList instanceof Array){
                    userList.push(...this.userList);
                    userList = this.Util.arraySet(userList);
                    localStorage.setItem('userList',JSON.stringify(userList));
                }else{
                    localStorage.setItem('userList',JSON.stringify(this.userList));
                }
                window.history.go(-2);
            },
        },
    }
</script>

<style lang="scss" scoped>
    #selectionID {
        padding-top: 56px;
        main {
            .title {
                font-size: 14px;
                padding: 5px 10px;
                span {
                    padding-left: 10px;
                }
            }
            .M_passed {
                font-size: 14px;
                position: relative;
                i {
                    top: -8px;
                }
                span {
                    font-size: 12px;
                    position: absolute;
                    padding-left: 15px;
                }
                img {
                    padding-left: 8px;
                    width: 34px;
                    height: 32px;
                }
            }
            .red{
                color: red;
            }
        }
    }
</style>
