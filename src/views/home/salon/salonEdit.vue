<template>
    <section id="salonEdit">
        <van-nav-bar title="编辑话题" :fixed="true" left-arrow @click-left="back" :z-index="999"/>
        <span class="title">标题</span>
        <input type="text" placeholder="请输入标题" class="input-title" v-model="titleVal"/>

        <span class="content">内容</span>
        <div class="main_content" v-html="contentVal" contentEditable="true" ref="divText">
            {{ contentVal }}
        </div>

        <span class="photo">照片</span>
        <van-uploader v-model="fileList" :after-read="afterRead" class="up-img" multiple/>

        <div class="active">
            <button class="keep-btn" @click="keepBtn()">保存</button>
            <button class="release-btn" @click="releaseBtn()">发布</button>
        </div>
    </section>
</template>

<script>
    import apiLists from './../../../interfase/apiLists'
    import { fileUpload } from './../../../interfase/baseConfig'
    import { Toast } from 'vant';
    export default {
        name: "salonEdit",
        data() {
            return {
                titleVal:'',
                contentVal:'',
                fileList: [],
                fileListImg:[],
                fileFlag: true,
                postData: [],
            }
        },
        mounted(){
            this.contentVal = this.Util.stringLineFeed(this.contentVal);
        },
        methods:{
            back(){
                this.$dialog.confirm({
                    title: '提示',
                    message: '您确定要退出编辑吗'
                }).then(() => {
                    window.history.back();
                    // on confirm
                }).catch(() => {
                    // on cancel
                });
            },

            //保存
            keepBtn(){
                if(!this.titleVal){
                    this.$toast({
                        message: '请输入标题',
                        icon: 'cross'
                    });
                    return ;
                }else if(!this.contentVal){
                    this.$toast({
                        message: '请输入内容',
                        icon: 'cross'
                    });
                    return;
                } else{
                    if(this.verifyAddlearnParameter()){
                        Toast.loading({
                            mask: true,
                            message: '加载中'
                        });
                        let $id=this.$route.query.idTest;
                        apiLists.dataAjax({
                            salonId:$id,//id
                            title: this.titleVal, //主题
                            content: this.$refs.divText.innerText, //内容
                            picture: this.fileListImg, //图片
                            headPic: this.fileListImg[0], //题图
                        }, 'salon_edit').then(res => {
                            console.log(res);
                            if (res.code == 1001) {
                                setTimeout(() => {
                                    Toast.clear(50);
                                    Toast.success("保存成功");
                                    window.history.back();
                                },1000);
                            } else {
                                setTimeout(() => {
                                    Toast.clear(50);
                                    Toast.fail("保存失败");
                                },1000);
                            }
                        })
                    }
                }
            },

            //发布
            releaseBtn(){
                if(!this.titleVal){
                    this.$toast({
                        message: '请输入标题',
                        icon: 'cross'
                    });
                    return ;
                }else if(!this.contentVal){
                    this.$toast({
                        message: '请输入内容',
                        icon: 'cross'
                    });
                    return;
                } else{
                    this.$dialog.confirm({
                        title: '提示',
                        message: '您确定要发布吗'
                    }).then(() => {
                    if(this.verifyAddlearnParameter()){
                        Toast.loading({
                            mask: true,
                            message: '加载中'
                        });
                        let $id=this.$route.query.idTest;
                        apiLists.dataAjax({
                            salonId:$id,//id
                            title: this.titleVal, //主题
                            content: this.$refs.divText.innerText, //内容
                            picture: this.fileListImg, //图片
                            headPic: this.fileListImg[0], //题图
                            onLine:1
                        }, 'salon_add').then(res => {
                            console.log(res);
                            if (res.code == 1001) {
                                setTimeout(() => {
                                    Toast.clear(50);
                                    Toast.success("发布成功");
                                    window.history.back();
                                },1000);
                            } else {
                                setTimeout(() => {
                                    Toast.clear(50);
                                    Toast.fail("发布失败");
                                },1000);
                            }
                        })
                    }
                        // on confirm
                    }).catch(() => {
                        // on cancel
                    });
                }
            },

            //图片上传
            afterRead(file) {
                Toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                if(file.content.toString().length > 10000 * 1024){
                    Toast.fail("最大可上传图片为10M");
                    return;
                }
                this.Util.compressImg(file, (file)=>{
                fileUpload(file).then(res => {
                    if(res.code == 1001){
                        this.fileListImg.push(res.result);
                        setTimeout(()=>{
                            Toast.clear(50);
                            Toast.success("图片上传成功");
                        },1000);
                    }else{
                        setTimeout(()=>{
                            Toast.clear(50);
                            Toast.success("图片上传失败");
                        },1000);
                    }
                }).catch(error =>{
                    console.log("error = ",error);
                    setTimeout(()=>{
                        Toast.clear(500);
                        Toast.success("网络错误，上传失败");
                    },1000);
                });
              });
            },

            verifyAddlearnParameter(){
                if (typeof this.titleVal !== 'string') {
                    Toast("标题错误");
                    this.titleVal == '';
                    return false;
                }

                if (typeof this.contentVal !== 'string') {
                    Toast("自学内容错误");
                    this.contentVal == '';
                    return false;
                }
                return true;
            }


        },

        created(){
            let $titleVal=this.$route.query.titleTest;
            let $contentVal=this.$route.query.contentTest;
            this.titleVal=$titleVal;
            this.contentVal=$contentVal;
        }
    }
</script>

<style lang="scss">
    #salonEdit{
        padding-top: 56px;
        .title{
            display: block;
            margin-left: 20px;
            font-size: 14px;
        }
        .input-title{
            display: block;
            width: 93%;
            height: 40px;
            margin: 5px auto;
            border:1px solid #eee;
            border-radius: 8px 8px 8px 8px;
            font-size: 14px;
            padding-left: 5px;
            padding-right: 5px;
        }
        .content{
            display: block;
            font-size: 14px;
            margin-left: 20px;
            margin-top: 30px;
        }
        .main_content{
            display: block;
            width: 93%;
            height: 230px;
            font-size: 16px;
            margin: 5px auto;
            border:1px solid #eee;
            border-radius: 8px 8px 8px 8px;
            padding: 5px 5px;
            word-wrap: break-word;
            outline: none;
            font-size: 14px;
        }
        .photo{
            display: block;
            font-size: 14px;
            margin-left: 20px;
            margin-top: 30px;
        }
        .up-img{
            margin-top: 5px;
            margin-left:12px ;
        }
        .up-img .van-uploader__upload{
            border: 1px solid red;
        }
        .up-img .van-uploader__upload-icon{
            color: red;
        }

        .keep-btn{
            width: 46%;
            line-height: 35px;
            color: white;
            background-color: red;
            border:1px solid red;
            border-radius: 5px 5px 5px 5px;
            margin-left: 10px;
        }
        .release-btn{
            width: 46%;
            line-height: 35px;
            color: white;
            background-color: red;
            border:1px solid red;
            border-radius: 5px 5px 5px 5px;
            margin-left: 10px;
        }
        .active{
            margin-top: 10px;
        }
    }
</style>