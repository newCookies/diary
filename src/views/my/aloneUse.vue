<template>
    <section id="aloneUse">
        <van-nav-bar title="使用帮助" :fixed="true" left-arrow @click-left="back"  :z-index="999"/>
        <div class="content">
            <div id="title">《自主学习》使用帮助</div>

            <div id="time">
                <i class="icon iconfont">&#xe607;</i>
                <span>时间：2018-01-18  15：49</span>
            </div>

            <div id="head">《自主学习》功能是用户自主发起的，单人或小范围的非正式集中性质的学习方式，自主记录学习过程，开始、结束时间、
                学习内容、现场图片等。</div>

            <div>新增自主学习可选择通过手机APP，实现简单快速的文字录入、图片上传功能，如图：</div>
            <div><img src="./../../assets/imgs/life_img1.png"></div>

            <div>也可以选择在电脑上使用WEB个人端，进行功能更为强大的图文混排编辑功能，如图：</div>
            <div><img src="../../assets/imgs/life_img3.png"></div>

            <ul>
                <li><span>&bull;</span>保存：保存后记录未公开，后续还可以继续进行内容的修改。</li>

            </ul>

            <div id="danger">注意：由于WEB端与APP在文图内容编辑功能的差异，凡WEB端保存过的内容，APP端不能在进行修改，只能在WEB端修改。</div>

            <div>自主学习成功新增后需要继续在APP端进行结束以及写心得才能发布学习，如图：</div>
            <div><img src="../../assets/imgs/life_img4.png"></div>

            <div>也可以在电脑上使用WEB个人端进行操作，写心得更加便捷，如图：</div>
            <div><img src="../../assets/imgs/life_img4.png"></div>

            <ul id="ul">
                <li><span>&bull;</span>结束学习：结束学习前必须填写心得体会，结束时直接计算本次学习时长，并提醒是否直接发布。</li>
                <li><span>&bull;</span>写心得：自主学习未发布前，心得可以继续编辑。</li>
                <li><span>&bull;</span>发布：发布学习前必须先结束学习以及填写心得，发布后记录正式公开，无法再进行修改，组织管理员可以进行后台删除。</li>
            </ul>
        </div>
    </section>
</template>

<script>
    export default {
        name: "aloneUse",
        methods:{
            back(){
                window.history.back();
            }
        },
    }
</script>

<style lang="scss" scoped>
    .content{
        margin-top: -10px;
    }
    .content div{
        margin: 10px 10px;
        font-size: 14px;
    }
    ul{
        margin: 40px 20px;
    }
    ul li{
        font-size: 14px;
    }
    ul li span{
        margin-right: 20px;
    }
    #ul{
        margin: 0px 20px 20px 20px;
    }
    img{
        width: 100%;
    }
    #title{
        font-size: 16px;
        padding-top: 10px;
    }
    #time span,#time i{
        font-size: 14px;
        color: #666666;
    }
    #head{
        font-size: 14px;
    }
    #danger{
        color: red;
        margin: 40px 10px;
    }
    i {
        position: relative;
        top: -1px;
    }
</style>