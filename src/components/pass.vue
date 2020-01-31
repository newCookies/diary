<template>
    <section id="pass">
        <van-cell-group>
            <van-field v-model="tel" label="手机号码" type="tel" @input="telVal" placeholder="请输入手机号码"/>
            <van-field v-model="password" type="password" maxlength="30" label="新密码" placeholder="请输入新密码" required/>
            <van-field v-model="inPassword" type="password" maxlength="30" label="确认密码" placeholder="请再次输入新密码"
                       required/>
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="code" center clearable maxlength="6" label="短信验证码" placeholder="请输入短信验证码">
                <van-button slot="button" size="small" type="danger" @click="onButton">发送验证码</van-button>
            </van-field>
        </van-cell-group>
        <div class="submit">
            <van-button type="danger" size="large" @click="onSubmit">提交</van-button>
        </div>
    </section>
</template>

<script>
    import apiList from './../interfase/apiLists'
    import {Toast} from 'vant'
    export default {
        name: "pass",
        data() {
            return {
                tel: '',
                code: '',
                password: '',
                inPassword: '',
            }
        },
        methods: {
            back() {
                window.history.back();
            },
            telVal() {
                console.log(this.tel);
                if (this.tel.length > 11) {
                    Toast.fail('手机号码为11位');
                    this.tel = this.tel.substring(0, 11);
                }
            },

            onButton() {
                if (!this.tel) {
                    Toast("请输入手机号");
                    return;
                }
                if (!(/^1[3456789]\d{9}$/.test(this.tel))) {
                    Toast("手机号输入不正确");
                    return;
                }
                Toast.loading({
                    mask: true,
                    message: '加载中'
                });
                apiList.dataAjax({}, 'user_getCode', this.tel).then(res => {
                    console.log(res);
                    if (res.code == 1001) {
                        setTimeout(() => {
                            Toast.clear(50);
                            Toast.success("验证码发送成功");
                        }, 1000)
                    } else {
                        setTimeout(() => {
                            Toast.clear(50);
                            Toast.success("验证码发送失败");
                        }, 1000)
                    }
                })
            },
            onSubmit() {
                if (this.verifyParame()) {
                    Toast.loading({
                        mask: true,
                        message: '加载中'
                    });
                    apiList.dataAjax({}, 'user_verifyCode', this.tel + '/' + this.code).then(res => {
                        console.log(res);
                        if (res.code != 1001) {
                            setTimeout(() => {
                                Toast.clear(50);
                                Toast.fail("验证码验证失败");
                            },1000);
                        }
                        return res;
                    }).then(result => {
                        if (result.code == 1001) {
                            apiList.dataAjax({
                                mobile: this.tel,
                                code: this.code,
                                newPassword: this.password
                            }, 'user_updatePassword').then(res => {
                                console.log(res);
                                if (res.code == 1001) {
                                    setTimeout(() => {
                                        Toast.clear(50);
                                        Toast.success("密码修改成功");
                                        window.history.back();
                                    },1000);
                                }else{
                                    setTimeout(() => {
                                        Toast.clear(50);
                                        Toast.success("密码修改失败");
                                    },1000);
                                }
                            })
                        }
                    })
                }

            },
            verifyParame() {
                if (!this.tel) {
                    Toast("请输入手机号");
                    return false;
                } else {
                    if (!(/^1[3456789]\d{9}$/.test(this.tel))) {
                        Toast("手机号输入不正确");
                        return false;
                    }
                    return true;
                }
                if (!this.password) {
                    Toast("请输入新密码");
                    return false;
                } else {
                    return true;
                }
                if (!this.inPassword) {
                    Toast("请输入确认密码");
                    return false;
                } else {
                    if (this.password !== this.inPassword) {
                        Toast("两次密码输入一致，请重新输入");
                        return false;
                    }
                    return true;
                }
                if (!this.code) {
                    Toast.fail("验证码不能为空");
                    return false;
                } else {
                    if (this.code.length !== 6) {
                        Toast.fail("验证码格式不正确");
                        return false;
                    }
                    return true;
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    #pass{
        .submit {
            margin-top: 15px;
            padding: 0px 15px;
        }
    }
</style>
