<template>
    <section id="salonUse">
        <van-nav-bar title="使用帮助" :fixed="true" left-arrow @click-left="back"  :z-index="999"/>
        <div class="content">
            <div id="title">《党建沙龙》的使用帮助</div>

            <div id="time">
                <i class="icon iconfont">&#xe607;</i>
                <span>时间：2018-01-18  15：35</span>
            </div>

            <div id="head">《党建沙龙》功能是专门为党建用户提供的一个小型移动端论坛，用户可以将日常工作中有兴趣的话沙龙发表
               与所有成员共同讨论，用户可以对话题进行点赞和回复，其中超级管理员可以对话题进行置顶和加精，如图：</div>
            <div><img src="./../../assets/imgs/salon_img1.png"></div>

            <div>新增党建沙龙可选择通过手机APP，实现简单快速的文字录入、图片上传功能，如图：</div>
            <div><img src="../../assets/imgs/salon_img2.png"></div>

            <div>也可以选择在电脑上使用WEB个人端，进行功能更为强大的图文混排编辑功能，如图：</div>
            <div><img src="../../assets/imgs/salon_img3.png"></div>

            <ul id="ul">
                <li><span>&bull;</span>保存：保存后记录未公开，后续还可以继续进行内容的修改。</li>
                <li><span>&bull;</span>发布：发布后记录正式公开，无法再进行修改，组织管理员可以进行后台删除。</li>
            </ul>

            <div id="danger">注意：由于WEB端与APP在文图内容编辑功能的差异，凡WEB端保存过的内容，APP端不能在进行修改，只能在WEB端修改。</div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "salonUse",
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
        margin: 10px 20px;
    }
    ul li{
        font-size: 14px;
    }
    ul li span{
        margin-right: 20px;
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
        margin: 0px 10px 20px 10px;
    }
    i {
        position: relative;
        top: -1px;
    }
</style>