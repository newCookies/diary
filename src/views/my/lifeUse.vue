<template>
    <section id="lifeUse">
        <van-nav-bar title="使用帮助" :fixed="true" left-arrow @click-left="back"  :z-index="999"/>
        <div class="content">
           <div id="title">《组织生活》使用帮助</div>
           <div id="time">
                <i class="icon iconfont">&#xe607;</i>
            <span>时间：2018-01-18  16：42</span>
           </div>
           <div id="head">《组织生活》功能用于党建工作的核心部分-组织生活的在线开展，包括在线发布、签到签退、现场记录、写心得体会、查看签到数据等功能。</div>
           <div>《组织生活》的在线发布只能由组织的管理人员发布，可以直接通过手机APP端新增、发布维护，如图：</div>
           <div><img src="./../../assets/imgs/life_img1.png"></div>
           <div><img src="./../../assets/imgs/life_img2.png"></div>
           <div>也可以通过WEB端新增、发布维护，WEB端支持上传资料功能，如图：</div>
            <div><img src="../../assets/imgs/life_img3.png"></div>
            <ul>
                <li><span>&bull;</span>保存：保存后记录未公开，后续还可以继续进行内容的修改。</li>
                <li><span>&bull;</span>发布：发布后根据管理员配置，决定是否对非参会人员进行公开，发布后不能删除，内容可修改，有签到数据后，不能对开始时间、地点、
                    有效签到位置、出席人员进行修改。</li>
            </ul>
            <div>出席人员在指定签到时间和范围，可通过手机APP端进行签到签退、写心得、做记录，如图：</div>
           <div><img src="../../assets/imgs/life_img4.png"></div>
            <ul id="ul">
               <li><span>&bull;</span>写心得：参会人员签到后，可发表心得体会，组织生活归档前，可随时编辑和删除自己的心得体会。</li>
               <li><span>&bull;</span>做记录：记录人员签到后，可使用该功能，进行组织生活记录，填写记录、决议、现场照片，提交后在详情页展示。</li>
                <li><span>&bull;</span>归档：会议结束半小时后，会议发布人可进行归档，归档后内容不允许再进行修改。</li>
            </ul>
        </div>
    </section>
</template>

<script>
    export default {
        name: "lifeUse",
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