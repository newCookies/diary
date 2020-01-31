import {
    baseAjax
} from './baseConfig'; //ajax公共处理方法，便于对登录失效等错误统一处理
let apiList = {
    userLogin: { // 用户登录
        type: 'post',
        noToken: true,
        url: '/user/login'
    },
    life_allMeeting: { // 组织生活查询全部会议
        type: 'post',
        noToken: true,
        url: '/meeting/front/selectmy'
    },
    life_myMeeting: { // 组织生活查询我的会议
        type: 'post',
        noToken: true,
        url: '/meeting/front/mymeeting'
    },
    life_addMeeting: { // 组织生活新建会议
        type: 'post',
        noToken: true,
        url: '/meeting/front/savemeeting'
    },
    life_editorialMeeting: { // 组织生活编辑会议
        type: 'post',
        noToken: true,
        url: '/meeting/front/editmeeting'
    },
    life_ManagerialRganization: {//查询组织的下级组织节点及所属人员数量
        type: 'get',
        noToken: true,
        url: '/organization/front/get/sub/'
    },
    life_ManagerialRganizationThree: {//查询用户所属二级组织和二级组织的下级组织节点及所属人员数量
        type: 'get',
        noToken: true,
        url: '/organization/front/second'
    },
    life_ManagerialRganizationAll: {//查询组织的下级组织节点及所属人员数量
        type: 'get',
        noToken: true,
        url: '/organization/front/get/sub/'
    },
    life_ManagerialRganizationAl: {//查询组织的下级组织节点及所属人员数量
        type: 'get',
        noToken: true,
        url: '/organization/front/list'
    },
    life_LevelOrganizations: {//查询登录者所管理的组织（只有管理的当前一级）
        type: 'get',
        noToken: true,
        url: '/organization/back/managerorg'
    },
    life_meetingDetails: {//查询组织会议的详情
        type: 'get',
        noToken: true,
        url: '/meeting/front/selcetsingle/'
    },
    life_inspiration: {//查询组织生活心得体会
        type: 'post',
        noToken: true,
        url: '/meetingexp/front/select'
    },
    life_getSignIn: {//查询组织生活用户签到明细
        type: 'post',
        noToken: true,
        url: '/meeting/front/selectsign'
    },
    life_IDNumber: {//根据组织id查询人员数量
        type: 'get',
        noToken: true,
        url: '/organization/front/usercount/'
    },
    life_QueryTags: {//查询标签
        type: 'post',
        noToken: true,
        url: '/meetingtag/front/select'
    },
    life_pigeonhole: { // 归档和删除会议
        type: 'get',
        noToken: true,
        url: '/meeting/front/update/'
    },
    life_setSignIn: { // 会议签到
        type: 'post',
        noToken: true,
        url: '/meeting/front/signbegin'
    },
    life_addrecord: { // 添加会议记录
        type: 'post',
        noToken: true,
        url: '/meeting/front/recordmeeting'
    },
    life_addThoughts: { // 添加会议心得
        type: 'post',
        noToken: true,
        url: '/meetingexp/front/addexp'
    },
    life_updateThoughts: { // 编辑会议心得
        type: 'post',
        noToken: true,
        url: '/meetingexp/front/update'
    },
    learn_allMission: { // 在线学习全部列表
        type: 'post',
        noToken: true,
        url: '/studytask/front/select'
    },
    learn_missionDedail: { // 在线学习查询单个学习任务详情
        type: 'get',
        noToken: true,
        url: '/studytask/front/selectsingle/'
    },
    learn_allAlone: { // 自主学习全部列表
        type: 'post',
        noToken: true,
        url: '/study/front/select'
    },

    learn_myAlone: { // 自主学习我的
        type: 'post',
        noToken: true,
        url: '/study/front/selectmine'
    },
    learn_aloneDetails: { // 自主学习详情
        type: 'get',
        noToken: true,
        url: '/study/front/selectsingle/'
    },

    learn_deleteAlone: { // 删除自主学习
        type: 'get',
        noToken: true,
        url: '/study/front/delete/'
    },
    learn_aloneNum: { // 查询自主学习和学习任务的总数以及自己未完成数量
        type: 'get',
        noToken: true,
        url: '/study/front/allAndUnfinished'
    },
    learn_LearnDetail: { // 查询全部学习明细，返回数据中的studyTimeList：全部学习时间，timeForStudy：学习总时长
        type: 'post',
        noToken: true,
        url: '/studytask/front/selectall/detail'
    },
    learn_inspiration: { // 查询全部的学习心得
        type: 'post',
        noToken: true,
        url: '/studytask/front/selectall/experience'
    },
    learn_addLearningTasks: { // 新增自主学习任务
        type: 'post',
        noToken: true,
        url: '/study/front/save'
    },
    learn_redactLearningTasks: { // 编辑自主学习任务
        type: 'post',
        noToken: true,
        url: '/study/front/revise'
    },
    learn_writeThoughts: { // 填写心得体会并结束保存或发布学习，3表示发布，保存时可以不传
        type: 'post',
        noToken: true,
        url: '/study/front/addexperience'
    },
    learn_studytaskWriteThoughts: { // 填写心得体会并结束保存或发布学习,学习任务
        type: 'post',
        noToken: true,
        url: '/studytask/front/addexperience'
    },
    pioneer_all: {//党建先锋全部
        type: 'post',
        noToken: true,
        url: '/pioneer/front/issue/list'
    },
    pioneer_my: {//我的党建先锋
        type: 'post',
        noToken: true,
        url: '/pioneer/front/mylist'
    },
    pioneer_keep: {//党建先锋保存未发布列表
        type: 'post',
        noToken: true,
        url: '/pioneer/front/not/issue/list'
    },
    pioneer_auditing: {//党建先锋审核
        type: 'post',
        noToken: true,
        url: '/pioneer/front/approval'
    },
    pioneer_details: {//党建先锋详情
        type: 'get',
        noToken: true,
        url: '/pioneer/front/getbyid/'
    },
    pioneer_add: {//党建先锋添加
        type: 'post',
        noToken: true,
        url: '/pioneer/front/save'
    },
    pioneer_delet: {//党建先锋删除
        type: 'get',
        noToken: true,
        url: '/pioneer/front/delete/'
    },
    pioneer_edit: {//党建先锋编辑
        type: 'post',
        noToken: true,
        url: '/pioneer/front/update'
    },
    pioneer_release: {//党建先锋将保存的发布
        type: 'get',
        noToken: true,
        url: '/pioneer/front/issue/'
    },
    pioneer_type: {//查看党建先锋类型
        type: 'post',
        noToken: true,
        url: '/datatype/front/list'
    },
    salon_all: {//党建沙龙全部话题列表
        type: 'post',
        noToken: true,
        url: '/salon/front/select'
    },
    salon_details: {//党建沙龙详情
        type: 'get',
        noToken: true,
        url: '/salon/front/selectsingle/'
    },
    salon_praise: {//党建沙龙点赞
        type: 'get',
        noToken: true,
        url: '/salon/front/like/'
    },
    salon_add: {//党建沙龙添加
        type: 'post',
        noToken: true,
        url: '/salon/front/save'
    },
    salon_release: {//党建沙龙发布
        type: 'get',
        noToken: true,
        url: '/salon/front/public/'
    },
    salon_delet: {//党建沙龙删除
        type: 'get',
        noToken: true,
        url: '/salon/front/drop/'
    },
    salon_edit: {//党建沙龙编辑
        type: 'post',
        noToken: true,
        url: '/salon/front/update'
    },
    salon_comment: {//保存评论
        type: 'post',
        noToken: true,
        url: '/comment/front/save'
    },
    salon_allcomment: {//查询沙龙全部评论
        type: 'post',
        noToken: true,
        url: '/comment/front/select'
    },
    record_all: {//工作日志查询全部
        type: 'post',
        noToken: true,
        url: '/diary/front/select/all'
    },
    record_my: {//我的工作日志查询
        type: 'post',
        noToken: true,
        url: '/diary/front/select/diary'
    },
    record_details: {//工作日志详情
        type: 'get',
        noToken: true,
        url: '/diary/front/selcetdiarysingle/'
    },
    record_add: {//工作日志添加
        type: 'post',
        noToken: true,
        url: '/diary/front/savediary'
    },
    record_delet: {//工作日志删除
        type: 'get',
        noToken: true,
        url: '/diary/front/dropdiary/'
    },
    record_edit: {//工作日志编辑
        type: 'post',
        noToken: true,
        url: '/diary/front/editdiary'
    },
    record_release: {//工作日志发布
        type: 'get',
        noToken: true,
        url: '/diary/front/updatediary/'
    },
    record_type: {//工作日志类型
        type: 'get',
        noToken: true,
        url: '/diaryType/front/select'
    },
    MobileRecord_all: {//移动纪实查询全部
        type: 'post',
        noToken: true,
        url: '/documentary/front/select/all/docu'
    },
    MobileRecord_my: {//移动纪实用户自己查看
        type: 'post',
        noToken: true,
        url: '/documentary/front/select/mine/docu'
    },
    MobileRecord_details: {//移动纪实详情
        type: 'get',
        noToken: true,
        url: '/documentary/front/selcetdocusingle/'
    },
    MobileRecord_add: {//新增移动纪实
        type: 'post',
        noToken: true,
        url: '/documentary/front/savedocumentary'
    },
    MobileRecord_delet: {//移动纪实删除
        type: 'get',
        noToken: true,
        url: '/documentary/front/drop/'
    },
    MobileRecord_release: {//移动纪实发布
        type: 'get',
        noToken: true,
        url: '/documentary/front/update/'
    },
    MobileRecord_edit: {//移动纪实编辑
        type: 'post',
        noToken: false,
        url: '/documentary/front/editdocu'
    },
    user_upodateHadeImg: {//用户修改头像
        type: 'post',
        noToken: true,
        url: '/user/front/updatepic'
    },
    user_userDetail: {//通过用户Id查询用户详情
        type: 'get',
        noToken: true,
        url: '/user/front/selcetsingle/'
    },
    user_personalInformation: {//通过组织ID查询所属组织人员信息
        type: 'get',
        noToken: true,
        url: '/user/front/findsubo/'
    },
    user_getCode: {//用户重置密码获取验证码
        type: 'get',
        noToken: true,
        url: '/user/get/reset/password/code/'
    },
    user_verifyCode: {//检查短信验证码
        type: 'get',
        noToken: true,
        url: '/user/check/code/'
    },
    user_updatePassword: {//通过手机验证码修改密码
        type: 'post',
        noToken: true,
        url: '/user/reset/password/bymobile'
    },
    user_getIntegral: {//获取童虎积分
        type: 'get',
        noToken: true,
        url: '/user/front/act/point'
    },
    checkingIn_activeUser: { //考勤查询当前用户纪实区域
        type: 'post',
        noToken: true,
        url: '/attendance/front/selectlogin/documentaryarea'
    },
    checkingIn_addCheckingIn: { //新增正常考勤 考勤签到
        type: 'post',
        noToken: true,
        url: '/attendance/front/saveattendance'
    },
    checkingIn_queryList: { //考勤查询列表
        type: 'post',
        noToken: true,
        url: '/attendance/front/select'
    },
    addImg: {
        type: 'post',
        noToken: true,
        url: '/upload/image'
    },
    pulic_deleteThoughts: {
        type: 'get',
        noToken: true,
        url: '/meetingexp/front/drop/'
    },
    enshrine_details: {//查询收藏详情
        type: 'post',
        noToken: true,
        url: '/appcollection/front/selectsingle'
    },
    enshrine_list: {//分页查询收藏
        type: 'post',
        noToken: true,
        url: '/appcollection/front/selectpage'
    },
    pulic_report_onfiguration: { //APP查询登录者所属的大组织的报表配置
        type: 'get',
        noToken: true,
        url: '/dataforms/front/dataforms'
    },
    message_getAllMessage: { //APP查询当前用户是否有新的消息
        type: 'post',
        noToken: true,
        url: '/message/front/selectmes'
    },
    new_comment: { //评论需求
        type: 'post',
        noToken: true,
        url: '/userreply/front/save'
    },
    comment_list: { //评论列表
        type: 'post',
        noToken: true,
        url: '/userreply/front/list'
    },
    new_praise: { //点赞需求
        type: 'post',
        noToken: true,
        url: '/userreply/front/add/like'
    }

};

export default {
    dataAjax: (params, type, joint) => {
        if (!type) return;
        if (!joint) {
            joint = '';
        }
        //获取请求类型和请求接口
        let ajaxType = apiList[type].type,
            ajaxUrl = apiList[type].url,
            noToken = apiList[type].noToken || false,
            ajaxConfig = {};
        //将url和请求数据提交给公共方法处理
        return baseAjax({
            params: params,
            type: ajaxType,
            ajaxUrl: ajaxUrl + joint,
            noToken: noToken,
            ajaxConfig: ajaxConfig
        });
    }
};
