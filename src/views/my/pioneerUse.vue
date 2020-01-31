<template>
    <section id="pioneerUse">
        <van-nav-bar title="使用帮助" :fixed="true" left-arrow @click-left="back"  :z-index="999"/>
        <div class="content">
            <div id="title">《党建先锋》的使用帮助</div>

            <div id="time">
                <i class="icon iconfont">&#xe607;</i>
                <span>时间：2018-01-18  15：35</span>
            </div>

            <div id="head">《党建先锋》功能是用于宣传和展示组织内部党员或者党组织先锋实际的区域，组织内所有成员都可提交、查看，
            支持收藏和分享功能；组织管理员可直接发布先锋记录，普通用户提交的党建先锋记录，需上级组织管理员审核通过后才能正式发布。</div>

            <div>组织管理员可选择使用WEB管理端或者直接通过手机APP，进行先锋审核，如图：</div>
            <div><img src="./../../assets/imgs/pioneer_img1.png"></div>

            <div>新增党建沙龙可选择通过手机APP，实现简单快速的文字录入、图片上传功能，如图：</div>
            <div><img src="../../assets/imgs/pioneer_img2.png"></div>

            <div>也可以选择在电脑上使用WEB个人端，进行功能更为强大的图文混排编辑功能，如图：</div>
            <div><img src="../../assets/imgs/pioneer_img3.png"></div>

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
        name: "pioneerUse",
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
        margin: 10px 20px;
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