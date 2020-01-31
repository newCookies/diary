<template>
    <section id="addrecord">
        <van-nav-bar title="做记录" left-arrow @click-left="back" right-text="保存"
                     @click-right="onSubmit" :z-index="999"/>
        <main>
            <p class="content">记录</p>
            <van-cell-group>
                <van-field v-html="recordVal" type="textarea" :autosize="utosize" v-model="recordVal" placeholder="请输入学习内容"/>
            </van-cell-group>

            <p class="content">决议</p>
            <van-cell-group>
                <van-field v-html="contentVal" type="textarea" :autosize="utosize" v-model="contentVal" placeholder="请输入学习内容"/>
            </van-cell-group>

            <p class="content">现场照片</p>
            <div class="imgList">
                <img class="content-img" v-for="(item,index) in lifeDetails.picture" :src="item" alt="" :key="index">
            </div>
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
        name: "addrecord",
        data() {
            return {
                recordVal: '',
                contentVal: '',
                fileListImg: [],
                fileList: [],
                utosize: {
                    minHeight: 90
                },
                maxImage: this.Config.maxImage,
                lifeDetails: JSON.parse(localStorage.getItem("lifeDetails"))
            }
        },
        mounted() {
            if(!!this.lifeDetails.summary){
                this.recordVal = this.lifeDetails.summary;
                this.contentVal = this.lifeDetails.resolution;
                this.fileListImg.push(...this.lifeDetails.picture);
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
                        meetingId: this.$route.query.id, //会议ID
                        summary: this.recordVal, //会议记录
                        resolution: this.contentVal, ////会议决议
                        picture: this.fileListImg, //现场照片
                    }, 'life_addrecord').then(res => {
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
                if (!!this.recordVal) {
                    if (typeof this.recordVal !== 'string') {
                        Toast("记录数据错误");
                        this.recordVal == '';
                        return false;
                    }
                } else {
                    Toast("请输入记录内容");
                    return false;
                }

                if (this.contentVal) {
                    if (typeof this.contentVal !== 'string') {
                        Toast("决议内容错误");
                        this.contentVal == '';
                        return Toast;
                    }
                } else {
                    Toast("请输入决议内容");
                    return false;
                }
                if(this.fileListImg.length < 1){
                    Toast("请添加图片");
                    return false;
                }
                if (this.fileListImg.length > 5) {
                    Toast("图片最多可上传5张");
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
    #addrecord {
        .content {
            font-size: 18px;
            padding: 5px 15px;
            margin-top: 15px;
        }
        main{
            .imgList{
                padding: 15px;
                display: inline-block;
                .content-img{
                    width: 75px;
                    height: 75px;
                    margin-right: 10px;
                }
            }

            textarea{
                font-size: 16px;
            }
        }

        .uploadingImg {
            padding: 0 15px;
            .van-uploader__preview {
                margin: 15px;
            }
        }
    }
</style>
