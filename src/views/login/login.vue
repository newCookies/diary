<template>
    <section id="login">
        <van-nav-bar title="用户登录" :fixed="true" left-arrow @click-left="back" :z-index="999"/>
        <div class="icon_img">
            <img :src="auth_logo" alt="">
        </div>
        <main>
            <van-cell-group>
                <van-field label="用户名" size="large" v-model="username" placeholder="请输入用户名"/>
                <van-field type="password" size="large" v-model="password" label="密码" placeholder="请输入密码"/>
            </van-cell-group>
            <div class="M_passed">
                <van-icon name="passed" :color="passedColor" @click="recordPassword"/>
                <span> 记住密码</span>
                <span @click="passNo" class="passNo">忘记密码？</span>
            </div>
            <div class="submit" @click="submit">
                <van-button type="danger" size="large">登录</van-button>
            </div>

        </main>

    </section>
</template>

<script>
    import apiLists from './../../interfase/apiLists'
    import {Toast} from 'vant'

    export default {
        name: "login",
        data() {
            return {
                auth_logo: require("./../../assets/imgs/auth_logo.png"),
                passedColor: '',
                username: null,
                password: null
            }
        },
        methods: {
            back() {
                window.history.back();
            },
            recordPassword() {
                if (this.passedColor) {
                    this.passedColor = '';
                } else {
                    this.passedColor = 'red';
                }
            },
            passNo(){
                sessionStorage.setItem('demo','5555');
                this.$router.push({
                    path: '/login/forgetPassword',
                    query: {

                    }
                })
            },
            submit() {
                if (!this.username) {
                    Toast("请输入账号");
                    return;
                }
                if (!this.password) {
                    Toast("请输入密码");
                    return;
                }
                if (typeof this.username === 'string' && typeof this.password === 'string') {
                    Toast.loading({
                        mask: true,
                        message: '加载中...'
                    });
                    apiLists.dataAjax({
                        mobile: this.username,
                        password: this.password
                    }, 'userLogin').then(res => {
                        if (res.code == 1001) {
                            console.log(res);
                            let password = this.Util.Encrypt(this.password);
                            let userInfo = {
                                phone: this.username,
                                password: password,
                            };
                            localStorage.setItem("userInfo", JSON.stringify(userInfo));
                            this.Util.localStorageSet("userInfo", res.result);
                            this.Util.setCookie("usertoken", res.result.token);
                            localStorage.setItem("token", res.result.token);
                            let url = this.Util.localStorageGet('routerFromPath');
                            setTimeout(() => {
                                Toast.clear(50);
                                Toast.success("登录成功");
                            },1000);
                            let newH5 = JSON.parse(localStorage.getItem('newH5'));
                            if(newH5.routerFromPath.toString().indexOf('login')){
                                url = '/'
                            }
                            this.$router.push({
                                path: url,
                                query: {}
                            });
                        } else if (res.code == "1002") {
                            setTimeout(() => {
                                Toast.clear(50);
                                Toast.fail(res.message);
                            },1000);
                        } else {
                            setTimeout(() => {
                                Toast.clear(50);
                                Toast.fail("网络错误");
                            },1000);
                        }
                    });
                } else {
                    Toast.fail("登录失败");
                }

            },
        },
    }
</script>

<style lang="scss" scoped>
    #login {
        padding-top: 56px;
        .icon_img {
            width: 110px;
            height: 110px;
            margin: 0 auto;
            padding: 20px;
            box-sizing: border-box;
            img {
                width: 100%;
            }
        }

        main {
            margin-top: 20px;
            .M_passed {
                padding: 15px;
                font-size: 20px;
                span {
                    font-size: 16px;
                    position: relative;
                    top: -3px;
                }
                .passNo {
                    float: right;
                    font-size: 16px;
                    color: #127cdf;
                }
            }

            .submit {
                padding: 0px 15px;
            }

        }

    }
</style>
