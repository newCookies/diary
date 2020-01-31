<template>
    <section id="compLife" @click="goPage(compData)">
        <van-row>
            <van-col span="7">
                <div class="life-img">
                    <img :src="compData.img ? compData.img : titlePic" alt="图片">
                </div>
            </van-col>
            <van-col span="17">
                <div class="life-message">
                    <div class="mess-life">
                        <span v-if="compData.type">{{ compData.type == 1 ? '会议' : (compData.type == 2 ? '学习' : '活动') }}</span>
                        {{ compData.lifeDescribe }}
                    </div>
                    <div class="life-name text-cent">
                        <i class="icon iconfont">&#xe600;</i>
                        {{ compData.name }}
                    </div>
                    <div class="text-cent">
                        <i class="icon iconfont">&#xe607;</i>
                        {{ compData.time }}
                    </div>
                    <div class="text-cent">
                        <i class="icon iconfont">&#xe648;</i>
                        {{ compData.site }}
                    </div>
                </div>
            </van-col>
        </van-row>
        <div class="life" v-if="compData.meeting" >
            <span v-for="(item,index) in compData.meeting" :key="index">{{ item }}</span>
        </div>

    </section>
</template>

<script>
    export default {
        name: "compLife",
        props: {
            compData: Object, //用户信息
            compMy: String, //用户信息
        },
        data(){
            return {
                titlePic: require('./../../public/imgs/life_default.jpg')
            }
        },
        mounted(){
            if(!!this.compData.img && this.compData.img.toString().indexOf('http') < 0){
                this.compData.img = this.Config.apiUrl + this.compData.img;
            }
        },
        methods:{
            goPage(compData){
                console.log("compData = ",compData);
                let query = {
                    id: compData.id
                };
                if(this.compMy == 'myLife'){
                    query = {
                        id: compData.id,
                        source: 'myLife'
                    }
                }
                this.$router.push({
                    path: compData.goPageUrl,
                    query: query
                });
            },
        },
    }
</script>

<style lang="scss" scoped>
    #compLife {
        .life-img {
            width: 100%;
            height: 86px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .life-message {
            padding-left: 10px;
            font-size: 14px;
            div {
                line-height: 16px;
            }
            .mess-life {
                color: black;
                font-size: 16px;
                span {
                    background-color: #0077aa;
                    font-size: 12px;
                    color: white;
                    padding: 2px 5px;
                    border-radius: 5px;
                }
            }
            div {
                color: #666666;
            }
            .life-name {
                margin-top: 5px;
            }
            i {
                font-size: 14px;
            }
        }
        .life {
            margin-top: 3px;
            span {
                margin-right: 16px;
                font-size: 12px;
                padding: 5px 8px;
                background-color: #e9e9e9;
                border-radius: 5px;
            }
        }
        .text-cent{
            font-size: 12px;
        }
    }
</style>
