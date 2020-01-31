import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/Home.vue'
Vue.use(Router)
export default new Router({
    mode: "history",
    // mode: 'hash',
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        // console.log(to, from, savedPosition)
        if (savedPosition) {
            return savedPosition
        } else {
            //需要保持滚动位置时，记录滚动位置
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop
            }
            return {
                x: 0,
                y: to.meta.savedPosition || 0
            }
        }
    },
    routes: [
        {path: '/', name: '首页', meta: {  }, component: Home},
        {
            path: '/information', name: '消息', meta: { requireAuth: true },
            component: () => import("./views/home/information.vue")
        },
        //组织生活
        {
            path: '/life', name: '组织生活', meta: {  },
            component: () => import("./views/home/life/index.vue"),
            children: [
                {path: '/', component: () => import("./views/home/life/life.vue")},
                {path: 'addLife', namme:'添加组织生活', meta: { requireAuth: true }, component: () => import("./views/home/life/addLife.vue")},
                {path: 'addPersonnel',namme:'添加出席人员',meta: { requireAuth: true }, component: () => import("./views/home/life/addPersonnel.vue")},
                {path: 'personnel',name:'人员管理', meta: {  }, component: () => import("./views/home/life/personnel.vue")},
                {path: 'lifeDetails', name: '组织生活详情', component: () => import("./views/home/life/lifeDetails.vue")},
                {path: 'attendee', name: '出席人员详情', component: () => import("./views/home/life/attendee.vue")},
                {path: 'selectionID', name: '出席人员选择', component: () => import("./views/home/life/selectionID.vue")},
                {path: 'signIn', name: '签到明细', component: () => import("./views/home/life/signIn.vue")},
                {path: 'inspiration', name: '心得体会', component: () => import("./views/home/life/inspiration.vue")},
                {path: 'thoughts', name: '心得体会', component: () => import("./views/home/life/thoughts.vue")},
                {path: 'addRecord', name: '添加记录', component: () => import("./views/home/life/addRecord.vue")},
            ]
        },

        //党建先锋
        {
            path: '/pioneer',
            name: '党建先锋',
            meta: {},
            component: () => import("./views/home/pioneer/index.vue"),
            children: [
                {path: '/',meta: {}, component: () => import("./views/home/pioneer/pioneer.vue")},
                {path: '/pioneer/pioneerDetails',name: '党建先锋详情', meta: {}, component: () => import("./views/home/pioneer/pioneerDetails.vue")},
                {path: '/pioneer/pioneerAdd', name: '党建先锋添加', meta: {}, component: () => import("./views/home/pioneer/pioneerAdd.vue")},
                {path: '/pioneer/pioneerEdit', name: '党建先锋编辑', meta: {}, component: () => import("./views/home/pioneer/pioneerEdit.vue")},
                {path: '/pioneer/pioneerComment', name: '党建先锋评论', meta: {}, component: () => import("./views/home/pioneer/pioneerComment.vue")},
            ]
        },
        //党建沙龙
        {
            path: '/salon',
            name: '党建沙龙',
            meta: {},
            component: () => import("./views/home/salon/index.vue"),
            children: [
                {path: '/',meta: {}, component: () => import("./views/home/salon/salon.vue")},
                {path: '/salon/salonComment', name: '党建沙龙评论', meta: {}, component: () => import("./views/home/salon/salonComment.vue")},
                {path: '/salon/salonAllComment', name: '党建沙龙全部评论', meta: {}, component: () => import("./views/home/salon/salonAllComment.vue")},
                {path: '/salon/salonDetails', name: '党建沙龙详情', meta: {}, component: () => import("./views/home/salon/salonDetails.vue")},
                {path: '/salon/salonAdd', name: '党建沙龙添加',meta: {}, component: () => import("./views/home/salon/salonAdd.vue")},
                {path: '/salon/salonEdit', name: '党建沙龙编辑',meta: {}, component: () => import("./views/home/salon/salonEdit.vue")},
            ]
        },
        {path: '/allComment', name: '党建沙龙编辑',meta: {}, component: () => import("./components/allComment.vue")},
        {
            path: '/group',
            name: '组织团队',
            meta: {},
            component: () => import("./views/home/group/index.vue"),
            children: [
                {path: '/', redirect: 'index'},
                {path: 'index', meta:{ requireAuth: true }, component: () => import("./views/home/group/group.vue")},
                {path: 'PersonnelList', name: '查看人员', component: () => import("./views/home/group/PersonnelList.vue")},
                {path: 'personnelDetails', name: '人员详情', component: () => import("./views/home/group/personnelDetails.vue")},
            ]
        },

        //工作日志
        {
            path: '/record',
            name: '工作日志',
            meta: {},
            component: () => import("./views/home/record/index.vue"),
            children: [
                {path: '/',meta: {}, component: () => import("./views/home/record/record.vue")},
                {path: '/record/recordAdd', name: '工作日志添加', meta: {}, component: () => import("./views/home/record/recordAdd.vue")},
                {path: '/record/recordDetails', name: '工作日志详情', meta: {}, component: () => import("./views/home/record/recordDetails.vue")},
                {path: '/record/recordEdit', name: '工作日志编辑', meta: {}, component: () => import("./views/home/record/recordEdit.vue")},
                {path: '/record/recordComment', name: '工作日志评论', meta: {}, component: () => import("./views/home/record/recordComment.vue")},
            ]
        },
        //移动纪实
        {
            path: '/MobileRecord',
            name: '移动纪实',
            meta: {},
            component: () => import("./views/home/MobileRecord/index.vue"),
            children: [
                {path: '/', meta: {}, component: () => import("./views/home/MobileRecord/MobileRecord.vue")},
                {path: '/MobileRecord/MobileAdd',name: '移动记实添加', meta: {}, component: () => import("./views/home/MobileRecord/MobileAdd.vue")},
                {path: '/MobileRecord/MobileDetails',name: '移动记实详情',meta: {},  component: () => import("./views/home/MobileRecord/MobileDetails.vue")},
                {path: '/MobileRecord/MobileEdit',name: '移动记实编辑', meta: {}, component: () => import("./views/home/MobileRecord/MobileEdit.vue")},
                {path: '/MobileRecord/MobileComment', name: '移动纪实评论', meta: {}, component: () => import("./views/home/MobileRecord/MobileComment.vue")},
            ]
        },

        {
            path: '/checkingIn',
            name: '考勤签到',
            meta: {},
            component: () => import("./views/home/checkingIn/index.vue"),
            children: [
                {path: '/', redirect: 'index'},
                {path: 'index', meta: { requireAuth: true }, component: () => import("./views/home/checkingIn/checkingIn.vue")},
                {path: 'attendanceRecord', name: '考勤记录', component: () => import("./views/home/checkingIn/attendanceRecord.vue")},
            ]
        },{
            path: '/journalism',
            name: '咨询',
            meta: { requireAuth: true },
            component: () => import("./views/journalism/journalism.vue")
        }, {
            path: '/ranking',
            name: '数据',
            meta: {},
            component: () => import("./views/ranking/index.vue"),
            children: [
                {path: '/', redirect: 'index'},
                {path: 'index', component: () => import("./views/ranking/ranking.vue")},
                {path: 'ifrom', component: () => import("./views/ranking/ifrom.vue")},
            ]
        }, {
            path: '/login',
            name: '登录',
            meta: {},
            component: () => import("./views/login/index.vue"),
            children: [
                {path: '/', redirect: 'index'},
                {path: 'index', component: () => import("./views/login/login.vue")},
                {path: 'forgetPassword',name: '忘记密码', component: () => import("./views/login/forgetPassword.vue")},
            ]
        }, {
            path: '/my',
            name: '我的',
            meta: { requireAuth: true },
            component: () => import("./views/my/my.vue"),
            children: [
                {path: '/', redirect: 'index'},
                {path: 'index', component: () => import("./views/my/index.vue")},
                {path: 'pass', component: () => import("./views/my/alterPassword.vue")},
                {path: 'use', component: () => import("./views/my/use.vue")},
                {path: 'aboutUs', component: () => import("./views/my/aboutUs.vue")},
                {path: 'enshrine', component: () => import("./views/my/enshrine.vue")},
                {path: 'lifeUse', component: () => import("./views/my/lifeUse.vue")},
                {path: 'learnUse', component: () => import("./views/my/learnUse.vue")},
                {path: 'aloneUse', component: () => import("./views/my/aloneUse.vue")},
                {path: 'pioneerUse', component: () => import("./views/my/pioneerUse.vue")},
                {path: 'salonUse', component: () => import("./views/my/salonUse.vue")},
                {path: 'mobileUse', component: () => import("./views/my/mobileUse.vue")},
                {path: 'recordUse', component: () => import("./views/my/recordUse.vue")},
            ]
        },{
            path: '/learn',
            name: '在线学习',
            meta: {},
            component: () => import("./views/home/learn/index.vue"),
            children: [
                {path: '/', redirect: 'index'},
                {path: 'index',name: '首页', component: () => import("./views/home/learn/learn.vue")},
                {path: 'alone',name: '自主学习', component: () => import("./views/home/learn/alone.vue")},
                {path: 'mission',name: '学习任务', component: () => import("./views/home/learn/mission.vue")},
                {path: 'missionDetails', name: '学习任务详情', component: () => import("./views/home/learn/missionDetails.vue")},
                {path: 'addAlone',name: '添加自主学习', meta:{ requireAuth: true }, component: () => import("./views/home/learn/addAlone.vue")},
                {path: 'aloneDetail',name: '自主学习详情', component: () => import("./views/home/learn/aloneDetail.vue")},
                {path: 'LearnDetail',name: '学习明细', component: () => import("./views/home/learn/LearnDetail.vue")},
                {path: 'learnInspiration',name: '学习心得', component: () => import("./views/home/learn/learnInspiration.vue")},
                {path: 'thoughts',name: '写心得', component: () => import("./views/home/learn/thoughts.vue")},
            ]
        },
        {
            path: "*",
            redirect: "/"
        }
    ]
})
