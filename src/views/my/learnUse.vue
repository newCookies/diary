<template>
    <section id="learnUse">
        <van-nav-bar title="使用帮助" :fixed="true" left-arrow @click-left="back"  :z-index="999"/>
        <div class="content">
            <div id="title">《学习任务》的使用帮助</div>
            <div id="time">
                <i class="icon iconfont">&#xe607;</i>
                <span>时间：2018-01-18  16：39</span>
            </div>
            <div id="head">《学习任务》是由上级发起的，指定学习人员和学习要求的在线学习，学习任务包括：学习课题、学习资料（PPT、WORD、网页链
            接、在线视频链接等）、学习要求（学习时长、写心得体会的字数）等组成，学习人需按照任务发布者规定的学习要求完成在线学习，方可结束
            本次在线学习任务。</div>
            <div>学习任务是由上级管理员通过WEB端进行新增、管理维护，如图：</div>
            <div><img src="./../../assets/imgs/learn_img1.png"></div>
            <ul>
                <li><span>&bull;</span>保存：保存后记录未公开，后续还可以继续进行内容的修改。</li>
                <li><span>&bull;</span>发布：发布后学习任务仅学习人可见，若选择“公开”，则所有人可见，组织管理员可以进行内容修改。</li>
            </ul>
            <div>学习人可通过手机APP参与学习，填写心得，提交学习任务，如图：</div>
            <div><img src="../../assets/imgs/learn_img2.png"></div>
            <div>也可以通过WEB端个人版参与学习、填写心得提交、学习任务，如图：</div>
            <div><img src="../../assets/imgs/learn_img3.png"></div>
            <ul id="ul">
                <li><span>&bull;</span>开始（继续）学习：点击开始（继续）学习，选择资料后，直接开始倒计时。</li>
                <li><span>&bull;</span>结束学习：学习任务可随时结束，再次开始继续学习，可查看学习人学习明细。</li>
                <li><span>&bull;</span>写心得：根据上级管理员配置的心得体会字数要求，完成相应的要求。</li>
                <li><span>&bull;</span>达到时长和字数要求后可进行提交任务，完成学习后，无法再次学习以及写心得。</li>
            </ul>
        </div>
    </section>
</template>

<script>
    export default {
        name: "learnUse",
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
        margin:10px 20px 20px 20px;
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
    i {
        position: relative;
        top: -1px;
    }
</style>