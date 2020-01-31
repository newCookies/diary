<template>
    <section id="MobileAdd">
        <van-nav-bar title="新增移动纪实" :fixed="true" left-arrow @click-left="back" :z-index="999">
            <span  slot="right" @click="keepBtn()" >保存</span>
        </van-nav-bar>

        <span class="local">区域</span>
        <div class="place-details">{{ formattedAddress }}</div>
        <span class="title">主题</span>
        <input type="text" placeholder="请输入主题" class="input-title" v-model="titleVal"/>
        <span class="content">纪实内容</span>
        <textarea class="input-content" placeholder="请输入纪实内容" v-model="contentVal"></textarea>
        <span class="photo">纪实照片</span>
        <van-uploader v-model="fileList" :after-read="afterRead" class="up-img" multiple/>

    </section>
</template>

<script>
    import apiLists from './../../../interfase/apiLists';
    import { fileUpload } from './../../../interfase/baseConfig';
    import { Toast } from 'vant';
    export default {
        name: "MobileAdd",
        data() {
            return {
                titleVal:'',
                contentVal:'',
                fileList: [],
                fileListImg:[],
                postData: [],
                location: null,
                formattedAddress: '',
            }
        },
        mounted(){
            this.location = JSON.parse(localStorage.getItem("location"));
            if(!!this.location.formattedAddress){
                this.formattedAddress = this.location.formattedAddress;
            }
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
                        message: '请输入主题',
                        icon: 'cross'
                    });
                    return ;
                }else if(!this.contentVal){
                    this.$toast({
                        message: '请输入纪实内容',
                        icon: 'cross'
                    });
                    return;
                } else if(this.fileList.length < 1){
                    this.$toast({
                        message: '请上传纪实照片',
                        icon: 'cross'
                    });
                }else {
                    if(this.verifyAddlearnParameter()){
                        let cname = '定位失败';
                        if(!!this.location){
                            cname = this.location.formattedAddress;
                        }
                        Toast.loading({
                            mask: true,
                            message: '加载中'
                        });
                        apiLists.dataAjax({
                            title: this.titleVal, //主题
                            content: this.contentVal, //内容
                            picture: this.fileListImg, //图片
                            headPic: this.fileListImg[0], //题图
                            address: cname,//定位
                        }, 'MobileRecord_add').then(res => {
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

            //文件上传
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
                        Toast.clear(50);
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
                }else if (typeof this.contentVal !== 'string') {
                    Toast("自学内容错误");
                    this.contentVal == '';
                    return false;
                }
                    return true;
            }

        }//methods结尾

    }
</script>

<style lang="scss">
    #MobileAdd{
        padding-top: 56px;
        .local{
            margin-left:20px ;
            font-size: 16px;
        }
        .place-details{
            margin-left:20px ;
            margin-right: 10px;
            font-size: 16px;
            color: #666666;
        }
        .title{
            display: block;
            margin-left: 20px;
            font-size: 16px;
            margin-top: 20px;
        }
        .input-title{
            display: block;
            width: 93%;
            height: 40px;
            margin: 5px auto;
            border:1px solid #eee;
            border-radius: 8px 8px 8px 8px;
            font-size: 16px;
            padding-left: 5px;
            padding-right: 5px;
        }
        .content{
            display: block;
            font-size: 16px;
            margin-left: 20px;
            margin-top: 20px;
        }
        .input-content{
            display: block;
            width: 93%;
            height: 230px;
            font-size: 16px;
            margin: 5px auto;
            border:1px solid #eee;
            border-radius: 8px 8px 8px 8px;
            padding: 5px 5px;
        }
        .photo{
            display: block;
            font-size: 16px;
            margin-left: 20px;
            margin-top: 20px;
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
    }
</style>
