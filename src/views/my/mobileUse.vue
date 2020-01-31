<template>
    <section id="mobileUse">
        <van-nav-bar title="使用帮助" :fixed="true" left-arrow @click-left="back"  :z-index="999"/>
        <div class="content">
            <div id="title">《移动纪实》的使用帮助</div>

            <div id="time">
                <i class="icon iconfont">&#xe607;</i>
                <span>时间：2018-01-18  14：24</span>
            </div>

            <div id="head">《移动纪实》功能能够方便、快捷的将党员在外勤工作时的工作情况进行记录和汇报；新增移动纪实分为定点纪实和非定点
             纪实，根据管理后台为人员配置不同的纪实权限而确定相应的使用权限。</div>

            <ul>
                <li><span>&bull;</span>定点纪实：定点纪实与纪实区域相关联，用户只能在指定的纪实区域才能开展纪实，适用于常规性工作纪实。</li>
                <li><span>&bull;</span>非定点纪实：非定点纪实可以随时发起，不限制地点，适用于未预设，突发性的工作纪实。</li>
            </ul>

            <div>其中纪实区域地址由管理员根据组织不同情况，通过WEB管理端维护，如图：</div>
            <div><img src="./../../assets/imgs/mobile_img1.png"></div>

            <div>新增移动纪实，若当前位置不在纪实范围内，用户可选择查看纪实区域以及两者之间的距离，如图：</div>
            <div><img src="../../assets/imgs/mobile_img2.png"></div>

            <div>新增移动纪实可通过手机APP，实现简单快速的文字录入、图片上传功能，如图：</div>
            <div><img src="../../assets/imgs/mobile_img3.png"></div>

            <ul>
                <li><span>&bull;</span>保存：保存后纪实直接开始计时，此时记录未公开，后续还可以继续进行内容的修改和发布。</li>
            </ul>

            <div>完成当次纪实工作后，需要选择结束纪实后才能发布此次纪实工作，如图：</div>
            <div><img src="../../assets/imgs/mobile_img4.png"></div>

            <ul id="ul">
                <li><span>&bull;</span>结束：完成当次纪实工作，选择结束纪实，系统自动计算本次纪实时长，并提示用户需要本地保存还是立即发布。</li>
                <li><span>&bull;</span>发布：发布后记录正式公开，无法再进行修改，组织管理员可以进行后台删除。</li>
            </ul>
        </div>
    </section>
</template>

<script>
    export default {
        name: "mobileUse",
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
        margin: 20px 20px;
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