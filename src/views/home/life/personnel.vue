<template>
    <section id="personnel">
        <van-nav-bar title="人员管理" :fixed="true" left-arrow @click-left="back" :z-index="999">
            <van-icon name="add-o" slot="right" @click="goIconPage"/>
        </van-nav-bar>
        <main>
            <van-list @load="onLoadAll">
                <van-cell v-for="(item,index) in list" :key="index">
                    <div class="M_passed" v-if="index > -1" @click="recordPassword(item, index)">
                        <van-icon v-show="!item.color" name="passed" color="black" />
                        <van-icon v-show="item.color" name="passed" color="red"/>
                        <img v-if="item.recorder" class="recorderImg" :src="recorderImg" alt="">
                        <img class="hadeImg" :src="hadeImg" alt="">
                        <span>{{ item.name }}</span>
                    </div>
                </van-cell>
            </van-list>
            <p class="M-text">没有更多了</p>
        </main>
        <footer>
            <van-icon v-show="recordColor" name="passed" color="black" @click="record"/>
            <van-icon v-show="!recordColor" name="passed" color="red" @click="record"/>
            <span class="checkAll-text"> 全选</span>
            <div class="footer-btu">
                <van-button plain hairline type="danger" @click="setRecorderUser">设置记录人</van-button>
                <van-button plain hairline type="danger" @click="emptyUser">删除</van-button>
            </div>
        </footer>
    </section>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {Toast} from 'vant';

    export default {
        name: "personnel",
        computed: {
            ...mapGetters(['userIDList', "nowFooter"])
        },
        data() {
            return {
                checkAll: false, // 用户是否选择全选
                hadeImg: require("./../../../../public/imgs/heda-default.png"),
                recorderImg: require("./../../../../public/imgs/recorder.png"),
                conferenceImg: require("./../../../assets/imgs/ic_conference_recorder.png"),
                allColor: '',
                recordColor: true,
                list: [],
                loading: false,
                finished: false,
                userList: [],
                recorderList: [],
                recorder: null
            }
        },
        mounted() {
            if( this.list.length < 0){
                this.list = localStorage.getItem('userList') && JSON.parse(localStorage.getItem('userList'));
                if(!!this.list && this.list instanceof Array) {
                    this.list.forEach(item => {
                        item.color = false;
                    });
                }
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
            /*  describe: Enter new page -- 进入新的页面
            *   @parameter：null
            *   @return：null
            */
            goIconPage() {
                this.$router.push({
                    path: '/life/addPersonnel',
                    query: {}
                });
            },
            /*  describe: Select all -- 全部选中
            *   @parameter：$Event
            *   @return：null
            */
            record(e) {
                this.recordColor = !this.recordColor;
                if(!!this.list && this.list instanceof Array) {
                    if (!this.recordColor) {
                        this.list.forEach(item => {
                            item.color = true;
                        });
                        this.recorderList.push(...this.list);
                    } else {
                        this.list.forEach(item => {
                            item.color = false;
                        });
                        this.recorderList = [];
                    }
                }
                // this.$forceUpdate();

            },
            /*  describe: Load all personnel -- 加载全部人员
            *   @parameter：null
            *   @return：null
            */
            onLoadAll() {
                let me = this;
                me.list = localStorage.getItem('userList') && JSON.parse(localStorage.getItem('userList'));
                if(!!this.list && this.list instanceof Array){
                    this.list.forEach(item => {
                        item.color = false;
                    });
                }
            },
            /*  describe: Select individual list -- 选中单个人员的列表
            *   @parameter：$Event、index
            *   @return：null
            */
            recordPassword(items, index) {
                if (items.color) {
                    this.list[index].color = !this.list[index].color;
                    this.recorderList.splice(this.recorderList.findIndex(item => item._id === items._id), 1);
                } else {
                    this.list[index].color = !this.list[index].color;
                    this.recorderList.push(items);
                }
                this.$forceUpdate();
            },
            /*  describe: Setting recorder -- 设置记录人员
            *   @parameter：null
            *   @return：null
            */
            setRecorderUser() {
                if (this.recorderList.length < 1) {
                    Toast("您尚未选择记录人");
                } else if (this.recorderList.length !== 1) {
                    Toast("记录人只能设置一人");
                } else {
                    Toast.loading({
                        mask: true,
                        message: '加载中'
                    });
                    this.recorder = this.recorderList[0];

                    localStorage.setItem("recorder", JSON.stringify(this.recorder));
                    setTimeout(() => {
                        Toast.clear(50);
                        Toast("已把 " + this.recorderList[0].name + " 设置为记录人");
                    },1000);
                }
            },
            /*  describe: delete user -- 删除参加人员
            *   @parameter：null
            *   @return：null
            */
            emptyUser() {
                let recorder = JSON.parse(localStorage.getItem('recorder'));
                let empty = true;
                if (this.recorderList.length < 1) {
                    Toast('你尚未选择删除人员');
                    return;
                }
                if (!!recorder) {
                    if (typeof recorder === 'object') {
                        this.recorderList.forEach(item => {
                            if (item.name == recorder.name) {
                                Toast("不能删除记录人");
                                empty = false;
                            }
                        });
                    } else {
                        Toast('删除失败');
                        return;
                    }
                }

                if (empty) {
                    Toast.loading({
                        mask: true,
                        message: '加载中'
                    });
                    setTimeout(() => {
                        this.list = this.list.filter(arr => !this.recorderList.some(arr1 => arr1._id == arr._id));
                        localStorage.setItem('userList',JSON.stringify(this.list));
                        Toast.clear(50);
                        Toast.success("删除成功");
                    },1000);

                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    #personnel {
        padding-top: 56px;
        margin-bottom: 46px;
        main {
            .M_passed {
                font-size: 18px;
                position: relative;
                i {
                    top: -8px;
                }
                span {
                    font-size: 14px;
                    position: absolute;
                    padding-left: 15px;
                }
                .hadeImg {
                    padding-left: 8px;
                    height: 42px;
                }
                .recorderImg {
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    left: 46px;
                    top: 0px;
                }
            }
            .M-text{
                padding: 15px;
                font-size: 18px;
                text-align: center;
                color: #999999;
            }
        }
        footer {
            box-sizing: border-box;
            position: fixed;
            bottom: -1px;
            background-color: #e9e9e9;
            width: 100%;
            padding: 10px;
            font-size: 18px;
            .checkAll-text {
                font-size: 16px;
                position: relative;
                top: 2px;
            }
            i {
                position: relative;
                top: 5px;
            }
            .footer-btu {
                float: right;
                .van-button {
                    height: 22px;
                    margin-left: 10px;
                    line-height: 22px;
                    font-size: 14px;
                }
            }
        }
    }
</style>
