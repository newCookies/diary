<template>
    <section id="myUse">
        <van-nav-bar title="关于我们" :fixed="true" left-arrow @click-left="back"  :z-index="999"/>
        <div class="box">
            <img src="./../../assets/imgs/dangjian.png">
            <div class="text">当前版本：V2.3</div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "myUse",
        methods:{
            back(){
                window.history.back();
            }
        },
    }
</script>

<style lang="scss" scoped>
    #myUse{

    }
    .box{
        text-align: center;
        margin-top: 150px;
    }
    .text{
        font-size: 16px;
    }
</style>
