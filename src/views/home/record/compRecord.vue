<template>
    <section id="compRecord" @click="goPage(compData)">
        <van-row>
            <van-col span="7">
                <div class="life-img">
                    <img :src="( compData.img && compData.img.toString().length > 0 ) ? this.Config.apiUrl + compData.img : nullPic" alt="图片">
                </div>
            </van-col>
            <van-col span="17">
                <div class="life-message">
                    <div class="mess-life">
                        {{ compData.lifeDescribe }}
                    </div>
                    <div class="life-name">
                        <i class="icon iconfont">&#xe600;</i>
                        {{ compData.name }}
                    </div>
                    <div>
                        <i class="icon iconfont">&#xe607;</i>
                        {{ compData.time }}
                    </div>
                    <div>
                        <i class="icon iconfont">&#xe648;</i>
                        {{ compData.site }}
                    </div>
                </div>
            </van-col>
        </van-row>
    </section>
</template>

<script>
    export default {
        name: "compRecord",
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
            },
        },
    }
</script>

<style lang="scss" scoped>
    #compRecord{
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
            div {
                color: #666666;
            }
            .life-name {
                margin-top: 5px;
            }
            i {
                font-size: 13px;
            }
        }
    }
</style>
