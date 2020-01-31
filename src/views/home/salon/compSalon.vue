<template>
    <section id="compSalon" @click="goPage(compData)">
        <van-row>
            <van-col span="7">
                <div class="life-img">
                    <img :src="( compData.img && compData.img !== null ) ? this.Config.apiUrl + compData.img : nullPic" alt="图片">
                </div>
            </van-col>
            <van-col span="17">
                <div class="life-message">
                    <div class="mess-life">
                        {{ compData.lifeDescribe }}
                        <div class="top" v-show="(compData.top =='1')?true:false">顶</div>
                        <div class="best" v-show="(compData.best=='1')?true:false">精</div>
                        <div class="hot" v-show="(compData.hot =='1')?true:false">
                            <img src="./../../../assets/imgs/ic_huo.png">
                        </div>
                    </div>
                    <div class="life-name">
                        <i class="icon iconfont">&#xe600;</i>
                        {{ compData.name }}
                    </div>
                    <div class="life-name">
                        <i class="icon iconfont">&#xe607;</i>
                        {{ compData.time }}
                    </div>
                    <div class="life-name">
                        <i class="icon iconfont">&#xe619;</i>
                        {{ (compData.read!=null)?compData.read:0 }}
                    </div>

                </div>
            </van-col>
        </van-row>


    </section>
</template>

<script>
    export default {
        name: "compSalon",
        props: {
            compData: Object, //用户信息
        },
        data(){
            return {
                nullPic: require('./../../../../public/imgs/life_default.jpg'),
        }
        },
        methods:{
            goPage(compData){
                console.log("compData = ",compData);
                this.$router.push({
                    path: compData.goPageUrl,
                    query: {
                        id: compData.id,
                    }
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
    #compSalon{
        .life-img {
            width: 100%;
            height: 66px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .life-message {
            padding: 0 10px;
            font-size: 13px;
            div {
                line-height: 16px;
            }
            .mess-life {
                color: black;
                font-size: 14px;
            }
            .life-name {
                color: #666666;
            }
            i {
                color: #666666;
                font-size: 13px;
            }
        }
        .top{
            display: inline-block;
            color: white;
            background-color:red;
            padding: 2px 2px 1px 2px;
        }
        .best{
            display: inline-block;
            color: white;
            background-color: orange;
            padding: 2px 2px 1px 2px;
            margin-left: 5px;
        }
        .hot{
            display: inline-block;
        }
        .hot img{
            width: 10px;
        }
    }
</style>