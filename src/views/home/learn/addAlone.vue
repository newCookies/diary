<template>
    <section id="addAlone">
        <van-nav-bar title="自主学习" left-arrow @click-left="back" right-text="保存"
                     @click-right="onSubmit" :z-index="999"/>
        <main>
            <van-cell-group>
                <van-field v-model="aloneVal" label="自学主题" placeholder="请输入学习主题"/>
                <van-field v-model="placeVal" label="地点" placeholder="请输入学习地点"/>
            </van-cell-group>

            <p class="content">学习内容</p>
            <van-cell-group>
                <van-field type="textarea" :autosize="utosize" v-model="contentVal" placeholder="请输入学习内容"/>
            </van-cell-group>

            <p class="content">自学照片</p>
            <div class="uploadingImg">
                <van-uploader :after-read="afterRead" v-model="fileList" preview-size="75"
                              upload-text="添加照片" :max-count="maxImage"/>
            </div>
        </main>
    </section>
</template>

<script>
    import apiList from './../../../interfase/apiLists'
    import {fileUpload} from './../../../interfase/baseConfig'
    import {Toast} from 'vant';
    import axios from 'axios';
    export default {
        name: "addAlone",
        data() {
            return {
                aloneVal: '',
                placeVal: '',
                contentVal: '',
                utosize: {
                    minHeight: 160
                },
                fileList: [],
                fileListImg: [],
                postData: [],
                fileFlag: true,
                maxImage: this.Config.maxImage,
                picValue:'',
                files: {
                    name: "",
                    type: ""
                },
                headerImage: {
                    content: '',
                    file: ''
                },
                picValue: null,
            }
        },
        mounted() {
            let location  = localStorage.getItem('location');
            if(!!location && typeof location == 'string'){
                this.placeVal = JSON.parse(location).formattedAddress;
            }
        },
        methods: {
            back() {
                window.history.back();
            },
            /*  describe: submit message -- 提交
			 *   @parameter：null
			 *   @return：null
			 */
            onSubmit() {
                if (this.verifyAddlearnParameter()) {
                    Toast.loading({
                        mask: true,
                        message: '加载中...'
                    });
                    apiList.dataAjax({
                        subject: this.aloneVal, //自学主题
                        content: this.contentVal, //自学内容
                        picture: this.fileListImg, //自学图片
                        location: this.placeVal, //自学地点
                        headPic: this.fileListImg[0], //自学题图
                    }, 'learn_addLearningTasks').then(res => {
                        if (res.code == 1001) {
                            setTimeout(() => {
                                Toast.clear(500);
                                Toast.success("发布成功");
                                window.history.back();
                            }, 1000);
                        } else {
                            setTimeout(() => {
                                Toast.clear(500);
                                Toast.fail("发布失败");
                            }, 1000);
                        }
                    });
                }
            },

            /*  describe: verify Add learn Parameter -- 校验数据参数
			 *   @parameter：alone value、place value、content value
			 *   @return：true/false
			 */
            verifyAddlearnParameter() {
                if (this.aloneVal) {
                    if (typeof this.aloneVal !== 'string') {
                        Toast("自学主题错误");
                        this.aloneVal == '';
                        return false;
                    }
                } else {
                    Toast("请输入自学主题");
                    return false;
                }

                if (this.placeVal) {
                    if (typeof this.placeVal !== 'string') {
                        Toast.fail("地点错误");
                        this.placeVal == '';
                        return false;
                    }
                } else {
                    Toast("请输入地点");
                    return false;
                }

                if (this.contentVal) {
                    if (typeof this.contentVal !== 'string') {
                        Toast("自学内容错误");
                        this.contentVal == '';
                        return Toast;
                    }
                } else {
                    Toast("请输入自学内容");
                    return false;
                }
                if (this.fileListImg.length < 1) {
                    Toast("请添加图片");
                    return false;
                }
                return true;
            },
            /*  describe: submit img -- 提交图片
			 *   @parameter：call-back img
			 *   @return：null
			 */
            afterRead(file) {
                let me = this;
                if (this.fileListImg.length > 5) {
                    Toast("图片最多上传5张");
                    return;
                }

                Toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                console.log("file = ",file);
                if(file.content.toString().length > 10000 * 1024){
                    Toast.fail("最大可上传图片为10M");
                    return;
                }
                this.Util.compressImg(file, (file)=>{
                    fileUpload(file).then(res => {
                        if (!!res && res.code == 1001) {
                            console.log(res);
                            this.fileListImg.push(res.result);
                            setTimeout(() => {
                                Toast.clear(50);
                                Toast.success("图片上传成功");
                            }, 1000);
                        } else {
                            setTimeout(() => {
                                Toast.clear(50);
                                Toast.success("图片上传失败");
                            }, 1000);
                        }
                    }).catch(error => {
                        console.log("error = ", error);
                        setTimeout(() => {
                            Toast.clear(500);
                            Toast.success("网络错误，上传失败");
                        }, 1000);
                    });
                });

            },
        },
    }
</script>

<style lang="scss" scoped>
    #addAlone {
        .content {
            font-size: 14px;
            padding: 5px 15px;
            margin-top: 15px;
        }

        .uploadingImg {
            padding: 0 15px;
            .van-uploader__preview {
                margin: 15px;
            }
        }
    }
</style>
