<template>
    <section id="portrait">
        <div class="por_modus">
            <img v-if="compDataId === compData._id" class="recorderImg" :src="recorderImg" alt="">
            <img :src="compData.headPic ? this.Config.apiUrl + compData.headPic : titlePic" alt="">
            <p>{{ compData.name }}</p>
        </div>
    </section>
</template>

<script>
    export default {
        name: "portrait",
        props: {
            compData: Object, //用户信息
            compDataId: String, //用户信息
        },
        mounted(){
        },
        data(){
            return {
                titlePic: require('./../../public/imgs/life_default.jpg'),
                recorderImg: require('./../../public/imgs/recorder.png')
            }
        }
    }
</script>

<style lang="scss" scoped>
    #portrait{
        width: 100%;
        .por_modus{
            width: 100%;
            height: 60px;
            text-align: center;
            display: inline-block;
            padding: 5px 0;
            position: relative;
            img{
                width: 46px;
                height: 46px;
                border-radius: 50%;
            }
            p{
                font-size: 14px;
            }
            .recorderImg{
                position: absolute;
                width: 16px;
                height: 16px;
                right: 18px;
            }
        }
    }
</style>
