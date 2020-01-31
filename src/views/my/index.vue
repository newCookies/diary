<template>
    <section id="myIndex">
        <van-nav-bar title="我的" :fixed="true" :z-index="999"/>
        <main>
            <div class="title" v-if="userInfo">
                <img :src="hadeImg" alt="">
                <p>{{ userInfo.name }}</p>
                <span>{{ userInfo.jobTitle.name }}</span>
            </div>
            <div>
                <van-uploader :after-read="afterRead">
                    <div class="moduls" :style="width">
                        <van-icon class="iconfont" class-prefix='icon' name='touxiang'/>
                        <span>设置头像</span>
                        <van-icon name="arrow"/>
                    </div>
                </van-uploader>

                <div class="moduls van-hairline--top" v-for="(item, index) in moduleList" :key="index"
                     @click="goPage(item.url)">
                    <van-icon class="iconfont" class-prefix='icon' :name='item.icon'/>
                    <span>{{ item.name }}</span>
                    <van-icon name="arrow"/>
                </div>
            </div>

        </main>
        <van-button type="default" size="large" @click="submit">退出登录</van-button>
        <v_footer></v_footer>
    </section>
</template>

<script>
    import config from './../../common/config'; //共用配置文件
    import v_footer from './../../components/v_footer'
    import apiList from './../../interfase/apiLists'
    import {fileUpload} from './../../interfase/baseConfig'
    import {Toast} from 'vant'

    export default {
        name: "index",
        components: {
            v_footer
        },
        data() {
            return {
                userInfo: this.Util.localStorageGet('userInfo'),
                defaultImg: require("./../../../public/imgs/heda-default.png"),
                hadeImg: null,
                width: '',
                moduleList: [
                    {
                        name: '修改密码',
                        url: '/my/pass',
                        icon: 'mima'
                    }, {
                        name: '使用帮助',
                        url: '/my/use',
                        icon: 'wenhao'
                    }, {
                        name: '关于我们',
                        url: '/my/aboutUs',
                        icon: 'guanyu'
                    }, {
                        name: '清除缓存',
                        url: '/my/cache',
                        icon: 'qingchu1'
                    },/* {
                        name: '我的收藏',
                        url: '/my/enshrine',
                        icon: 'shoucang'
                    },*/
                ]


            }
        },
        mounted() {
            // this.width = 'width: ' + localStorage.getItem('width') - 62 + 'px'
            this.width = localStorage.getItem('width');
            this.width = 'width: ' + this.width + 'px';
            console.log("width = ",this.width);
            this.hadeImg = this.userInfo.headPic
                ? this.Config.apiUrl + this.userInfo.headPic
                : this.defaultImg;
        },
        methods: {
            afterRead(file) {
                Toast.loading({
                    mask: true,
                    message: '加载中'
                });
                this.Util.compressImg(file, (file)=>{
                    fileUpload(file).then(res => {
                        if (res.code == 1001) {
                            let headPic = res.result;
                            apiList.dataAjax({
                                headPic: res.result
                            }, 'user_upodateHadeImg').then(res => {
                                if (res.code == 1001) {
                                    setTimeout(() => {
                                        this.userInfo.headPic = headPic;
                                        this.hadeImg = this.Config.apiUrl + headPic;
                                        this.Util.localStorageSet('userInfo', this.userInfo);
                                        Toast.clear(50);
                                        Toast.success("修改头像成功");
                                    }, 1000);

                                } else {
                                    setTimeout(() => {
                                        Toast.clear(50);
                                        Toast.fail("修改头像失败");
                                    }, 1000);

                                }
                            });
                        } else {
                            Toast.fail("图片上传失败");
                        }
                    }).catch(error => {
                        console.log("error = ", error);
                    });
                });
            },
            submit() {
                this.Util.localStorageSet('userInfo', '');
                localStorage.setItem('token', '');
                localStorage.setItem('userInfo', '');
                // this.$router.replace('/login');
                this.$router.push({
                    path:'/login'
                });
                console.log("点击退出");
            },
            goPage(url) {
                if (url === '/my/cache') {
                    Toast.success("清除缓存成功");
                } else {
                    this.$router.push({
                        path: url
                    })
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
    #myIndex {
        .clearfloat{clear:both}
        main {
            font-size: 14px;
            letter-spacing: 0.5px;
            .title {
                text-align: center;
                padding-bottom: 10px;
                p {
                    font-size: 14px;
                }
                span {
                    font-size: 12px;
                }
                img {
                    width: 76px;
                    height: 76px;
                    border-radius: 50%;
                    margin-top: 24px;
                }
            }
            .moduls {
                padding: 15px 15px;
                span {
                    padding-left: 6px;
                    font-size: 16px;
                }
                i{
                    font-size: 18px;
                }
                .van-icon-arrow {
                    position: absolute;
                    right: 15px;
                    z-index: 10;
                    color: #999999;
                    font-size: 16px;
                }
            }
        }
        .van-button__text {
            color: red;
            font-size: 16px;
        }
        .van-uploader {
            .van-icon-arrow {
                position: absolute;
                right: 15px;
                z-index: 9999;
            }
        }
    }
</style>
