<template>
    <section id="addLife">
        <van-nav-bar title="创建会议" :fixed="true" left-arrow @click-left="back" :z-index="999"/>

        <main>
            <div class="box van-hairline--bottom" style="padding: 15px">
                <span style="font-size: 14px">自动生成标题</span>
                <div style="display: inline-block;float: right ">
                    <van-checkbox checked-color="red" icon-size="16px" v-model="checked"></van-checkbox>
                </div>
            </div>

            <div class="box van-hairline--bottom">
                <van-icon name="arrow"/>
                <van-field readonly clickable label="类型" :value="addLifeMessage.typeValue" placeholder="请选择类型"
                           @click="modelType = true"/>
                <van-popup v-model="modelType" position="bottom">
                    <van-picker show-toolbar :columns="columns" @cancel="modelType = false" @confirm="clickType"/>
                </van-popup>
            </div>
            <div class="van-hairline--bottom titel">
                <van-field v-model="addLifeMessage.titleVal" :disabled="checked" label="主题"
                           :placeholder="!checked ? '请输入标题': '选择下面标签后自动生成主题'"/>
            </div>
            <div class="box van-hairline--bottom">
                <van-icon name="arrow"/>
                <van-field readonly clickable label="开始时间" :value="addLifeMessage.startTimeValue" placeholder="请选择开始时间"
                           @click="startTime = true"/>
                <van-popup v-model="startTime" position="bottom">
                    <van-datetime-picker v-model="currentDate" type="datetime" :min-date="minDate"
                                         :max-date="maxDate" @confirm="onStartTime" @cancel="startTime = false"/>
                </van-popup>
            </div>
            <div class="box van-hairline--bottom">
                <van-icon name="arrow"/>
                <van-field readonly clickable label="结束时间" :value="addLifeMessage.endTimeValue" placeholder="请选择结束时间"
                           @click="endTime = true"/>
                <van-popup v-model="endTime" position="bottom">
                    <van-datetime-picker v-model="currentDate" type="datetime" :min-date="minDate"
                                         :max-date="maxDate" @confirm="onEndTime" @cancel="endTime = false"/>
                </van-popup>
            </div>
            <div class="van-hairline--bottom box">
                <van-icon @click="onLocation" name="location-o"/>
                <van-field v-model="addLifeMessage.locationVal" label="地点" placeholder="请输入地点"/>
            </div>
            <div class="theme">
                <h3>主题</h3>
                <textarea placeholder="请输入主题" v-model="addLifeMessage.subjectVal"/> <br> <br>
                <h3>流程</h3>
                <textarea placeholder="请输入流程" v-model="addLifeMessage.scheduleVal"/>
            </div>

            <div class="staff">
                <h3>出席人员
                    <span @click="goPage('personnel')">人员管理</span>
                </h3>
                <div class="main-personnel" v-if="portraitList.length > 0">
                    <div class="main-components" v-for="(item,index) in portraitList" :key="index">
                        <portrait :comp-data="item"></portrait>
                    </div>
                    <div class="MC_all" @click="goPage('attendee')">
                        <van-icon name="more-o"/>
                        <p>全部</p>
                    </div>
                </div>
            </div>

            <div class="label">
                <h3>标签</h3>
                <button class="btn_default_style" ref="btn_default" v-for="(item, index) in labelList" :key="index"
                        @click="onlabelList($event,item, index)">{{ item.name }}
                </button>
            </div>
        </main>
        <footer>
            <button class="btn_default_style" @click="submit('1')">保存</button>
            <button class="btn_default_style" @click="submit('2')">发布</button>
        </footer>
        <el-amap vid="amap" :plugin="plugin" class="amap-demo"></el-amap>
    </section>
</template>

<script>
    import vDate from './../../../components/v_date'
    import apiLists from './../../../interfase/apiLists'
    import portrait from './../../../components/portrait'
    import {Toast} from 'vant'

    export default {
        name: "addLife",
        components: {
            vDate,
            portrait
        },
        data() {
            let me = this;
            return {
                portraitList: [],
                columns: ['会议', '学习', '活动'], // 开会类型
                typeValue: '', // 地点
                modelType: false,
                checked: true,
                editFlag: this.$route.query.source || null, // 判断是从life编辑处进入
                editObject: null, // 编辑进入的数据回显

                titleVal: null, // 会议标题
                locationVal: null, //地点
                subjectVal: null, //会议主题
                scheduleVal: null, //会议内容
                startTimeValue: '',
                startTime: false,

                endTimeValue: '',
                endTime: false,
                location: null,

                Picker: false,
                minHour: 10,
                maxHour: 20,
                minDate: new Date(2019, 1, 1),
                maxDate: new Date(2119, 12, 12),
                currentDate: new Date(),
                labelList: [], // 标签
                pageIndex: 1,
                pageSize: 20,
                labelValList: [],
                attendUser: localStorage.getItem('userList') && JSON.parse(localStorage.getItem('userList')), // 参与人员
                recorder: null, // 记录人员
                addLifeMessage: JSON.parse(localStorage.getItem("addLifeMessage")),// 确保缓存
                plugin: [   //一些工具插件
                    {
                        pName: 'Geolocation',   //定位
                        events: {
                            init(o) {
                                // o 是高德地图定位插件实例
                                o.getCurrentPosition((status, result) => {
                                    if (result && result.position) {
                                        me.$nextTick();                           //页面渲染好后
                                        localStorage.setItem("location", JSON.stringify(result));
                                        me.location = result;
                                    }
                                })
                            }
                        }
                    },
                ],
            }
        },

        mounted() {
            const me = this;
            if (this.editFlag) {
                apiLists.dataAjax({}, 'life_meetingDetails', this.$route.query.id).then(res => {
                    this.editObject = res.result;
                    console.log(this.editObject);
                    this.addLifeMessage.typeValue = this.editObject.type == '1' ? '会议' : (this.editObject.type == '2' ? '学习' : '活动');
                    this.addLifeMessage.titleVal = this.editObject.title;
                    this.addLifeMessage.startTimeValue = this.editObject.beginDate;
                    this.addLifeMessage.endTimeValue = this.editObject.endDate;
                    this.addLifeMessage.locationVal = this.editObject.location;
                    this.addLifeMessage.subjectVal = this.editObject.subject;
                    this.addLifeMessage.scheduleVal = this.editObject.schedule;
                    let newH5 = JSON.parse(localStorage.getItem('newH5'));
                    if(newH5.routerFromPath.toString() == '/life'){
                        this.attendUser = [];
                        this.editObject.attendUser.forEach(item => {
                            this.attendUser.push(item._id);
                        });
                    }
                    if (this.labelList) {
                        this.labelList.forEach(item => {
                            this.editObject.tags.forEach(it => {
                                if (it.name == item.name) {
                                    this.labelValList.push(item);
                                }
                            })
                        })
                    }
                    let btnDefault = this.$refs.btn_default;
                    if (btnDefault instanceof Array) {
                        btnDefault.forEach(item => {
                            if (this.editObject.tags instanceof Array) {
                                this.editObject.tags.forEach(edititem => {
                                    if (item.innerText == edititem.name) {
                                        item.style.backgroundColor = 'red';
                                        item.style.color = 'white';
                                    }
                                })
                            } else {
                                Toast.fail("数据错误");
                            }
                        });
                    }
                    for (let i = 0; i < res.result.picture.length; i++) {
                        res.result.picture[i] = this.Config.apiUrl + res.result.picture[i];
                    }
                    this.list = res.result;
                    if(newH5.routerFromPath.toString() == '/life'){
                        this.portraitList = [];
                        for (let j = 0; j < this.list.attendUser.length; j++) {
                            if (j < 3) {
                                this.portraitList.push(this.list.attendUser[j]);
                            }
                        }
                        localStorage.setItem('userList', JSON.stringify(this.list.attendUser));
                    }else{
                        for (let j = 0; j < this.attendUser.length; j++) {
                            if (j < 3) {
                                this.portraitList.push(this.attendUser[j]);
                            }
                        }
                    }
                    this.list.isPrototypeOf();
                });
            }else{
                if (this.attendUser) {
                    for (let i = 0; i < this.attendUser.length; i++) {
                        if (i < 3) {
                            this.portraitList.push(this.attendUser[i]);
                        }
                    }
                }
            }

            apiLists.dataAjax({
                pageNo: this.pageIndex,
                pageSize: this.pageSize
            }, 'life_QueryTags').then(res => {
                if (res.code == 1001) {
                    this.labelList = res.result.list;
                }
            });
            // 监听器、监听数组的变化时做的操作
            this.$watch('labelValList', () => {
                if (this.checked) {
                    me.addLifeMessage.titleVal = '';
                    for (let i = 0; i < me.labelValList.length; i++) {
                        me.addLifeMessage.titleVal =
                            (me.addLifeMessage.titleVal ? me.addLifeMessage.titleVal + '、' : '') +
                            me.labelValList[i].name;
                    }
                    this.$forceUpdate();
                }
                let btnDefault = this.$refs.btn_default;
                if (btnDefault instanceof Array) {
                    this.labelValList.forEach(labelItem => {
                        btnDefault.forEach(btnItem => {
                            if (labelItem.name == btnItem.innerText) {
                                btnItem.style.backgroundColor = 'red';
                                btnItem.style.color = 'white';
                            }
                        })
                    });
                } else {
                    Toast.fail("数据错误");
                }

            }, {
                deep: true
            })
        },
        methods: {
            /*  describe: Go back to the previous page -- 返回上一页面
			 *   @parameter：null
			 *   @return：null
			 */
            back() {
                window.history.back();
            },
            /*  describe: type selection -- 类型选择
			 *   @parameter：The callback returns
			 *   @return：null
			 */
            clickType(value) {
                this.addLifeMessage.typeValue = value;
                localStorage.setItem("addLifeMessage", JSON.stringify(this.addLifeMessage));
                this.modelType = false;
            },
            /*  describe: Get start time -- 获取开始时间
            *   @parameter：The callback returns
            *   @return：null
            */
            onStartTime(e) {
                this.addLifeMessage.startTimeValue = this.Util.dateFormatter('YYYY-MM-DD HH:mm', e);
                localStorage.setItem("addLifeMessage", JSON.stringify(this.addLifeMessage));
                this.startTime = false;
            },
            /*  describe: Fetch end time -- 获取结束时间
            *   @parameter：The callback returns
            *   @return：null
            */
            onEndTime(e) {
                this.addLifeMessage.endTimeValue = this.Util.dateFormatter('YYYY-MM-DD HH:mm', e);
                localStorage.setItem("addLifeMessage", JSON.stringify(this.addLifeMessage));
                this.endTime = false;
            },
            /*  describe: Go to new page -- 去到新的页面
            *   @parameter：new page url
            *   @return：null
            */
            goPage(url) {
                if (url && typeof url === 'string') {
                    if (url == 'attendee') {
                        localStorage.setItem('portraitList', JSON.stringify(this.attendUser));
                        this.$router.push({
                            path: '/life/' + url,
                            query: {
                                id: this.$route.query.id
                            }
                        })
                    } else {
                        localStorage.setItem("addLifeMessage", JSON.stringify(this.addLifeMessage));
                        this.$router.push({
                            path: '/life/' + url,
                            query: {}
                        })
                    }
                } else {
                    Toast.fail('页面错误，无法跳转');
                }
            },
            /*  describe: Select tag list -- 选择标签集合
            *   @parameter：The event object、Current tag object、index
            *   @return：null
            */
            onlabelList(e, item, index) {
                let btnDefault = this.$refs.btn_default;
                for (let i = 0; i < btnDefault.length; i++) {
                    if (btnDefault[index].style.backgroundColor == 'red') {
                        btnDefault[index].style.backgroundColor = '#e9e9e9';
                        btnDefault[index].style.color = '#000';
                        this.labelValList.splice(this.labelValList.indexOf(item), 1);
                    } else {
                        btnDefault[index].style.backgroundColor = 'red';
                        btnDefault[index].style.color = 'white';
                        this.labelValList.push(item);
                    }
                }
                // localStorage.setItem("addLifeMessage",JSON.stringify(this.addLifeMessage));
            },
            /*  describe: submit message -- 提交当前资料
            *   @parameter：message list
            *   @return：null
            */
            submit(status) {
                let me = this;
                if(!me.verifyAddLifeParameter()){
                    return;
                }
                // return;
                this.recorder = JSON.parse(localStorage.getItem("recorder"));
                if(!!this.recorder){
                    this.recorder = this.recorder._id;
                }else{
                    Toast.fail("未设置记录人");
                    return;
                }
                let longitude = '';
                let latitude = '';
                if(this.location){
                    longitude = this.location.position ? this.location.position.lng : '';
                    latitude = this.location.position ? this.location.position.lat : '';
                }
                Toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                let data = {};
                let url = '';
                if (this.editFlag) {
                    data = {
                        meetingId: this.$route.query.id, // 会议id
                        title: this.addLifeMessage.titleVal, // 会议标题
                        type: this.addLifeMessage.typeValue == '会议' ? 1 : (this.typeValue == '学习' ? 2 : 3), // 会议类型  1:会议 2：学习 3:活动
                        location: this.addLifeMessage.locationVal, // 会议地址
                        beginDate: this.addLifeMessage.startTimeValue, // 开始时间
                        endDate: this.addLifeMessage.endTimeValue, // 结束时间
                        tags: this.labelValList, // 会议标签
                        titlePic: '', // 题图
                        subject: this.addLifeMessage.subjectVal, // 会议主题
                        schedule: this.addLifeMessage.scheduleVal, // 会议流程
                        files: [], // 文件数组
                        attendUser: this.attendUser, // 参与人员数组
                        recorder: this.recorder, // 会议记录人员
                        status: status, // 1:保存 2:发布
                        position: {
                            longitude: longitude,
                            latitude: latitude
                        },
                        isPublic: 1, // 是否公开 0：不公开  1:公开
                        subOrganization: this.editObject, //会议所属组织
                    };
                    url = 'life_editorialMeeting';
                } else {
                    data = {
                        title: this.addLifeMessage.titleVal, // 会议标题
                        type: this.addLifeMessage.typeValue == '会议' ? 1 : (this.typeValue == '学习' ? 2 : 3), // 会议类型  1:会议 2：学习 3:活动
                        location: this.addLifeMessage.locationVal, // 会议地址
                        beginDate: this.addLifeMessage.startTimeValue, // 开始时间
                        endDate: this.addLifeMessage.endTimeValue, // 结束时间
                        tags: this.labelValList, // 会议标签
                        titlePic: '', // 题图
                        subject: this.addLifeMessage.subjectVal, // 会议主题
                        schedule: this.addLifeMessage.scheduleVal, // 会议流程
                        files: [], // 文件数组
                        attendUser: this.attendUser, // 参与人员数组
                        recorder: this.recorder, // 会议记录人员
                        status: status, // 1:保存 2:发布
                        position: {
                            longitude: longitude,
                            latitude: latitude
                        },
                        isPublic: 1, // 是否公开 0：不公开  1:公开
                        subOrganization: '', //会议所属组织
                    }
                    url = 'life_addMeeting';
                }
                apiLists.dataAjax(data, url).then(res => {
                    if (res.code == 1001) {
                        let status = status == 1 ? '保存' : '发布';
                        localStorage.setItem('userList', null);
                        localStorage.setItem('portraitList', null);
                        localStorage.setItem('recorder', null);
                        setTimeout(() => {
                            Toast.clear(50);
                            Toast.success(status + '成功');
                            me.back();
                        }, 1000);
                    } else if (res.code == 1002) {
                        setTimeout(() => {
                            Toast.clear(50);
                            Toast.fail(res.message);
                        }, 1000);

                    } else {
                        setTimeout(() => {
                            Toast.clear(50);
                            Toast.fail("其他错误");
                        }, 1000);
                    }
                })
            },

            /*  describe: Check the organization's new club parameters -- 检查组织生活新建会参数
             *   @parameter：title、type、startTime、endTime、location、subject、schedule、labelValLis
             *   @return：true/false
             */
            verifyAddLifeParameter() {
                if (this.addLifeMessage.typeValue) {
                    if (typeof this.addLifeMessage.typeValue !== 'string') {
                        Toast.fail("类型选择错误");
                        this.addLifeMessage.typeValue = '';
                        return false;
                    }
                } else {
                    Toast.fail("请选择类型");
                    return false;
                }
                if (this.addLifeMessage.titleVal) {
                    if (typeof this.addLifeMessage.titleVal !== 'string') {
                        Toast.fail("自学主题输入错误");
                        this.addLifeMessage.titleVal == '';
                        return false;
                    }
                } else {
                    Toast.fail("请输入自学主题");
                    return false;
                }

                if (this.addLifeMessage.startTimeValue) {
                    if (typeof this.addLifeMessage.startTimeValue !== 'string') {
                        Toast.fail("开始时间不正确");
                        this.addLifeMessage.startTimeValue == '';
                        return false;
                    }
                    if(!this.Util.CompareDate(this.Util.CurentTime(), this.addLifeMessage.startTimeValue)){
                        Toast.fail("开始时间必须大于现在时间");
                        return false
                    }
                } else {
                    Toast.fail("请选择开始时间");
                    return false;
                }

                if (this.addLifeMessage.endTimeValue) {
                    if (typeof this.addLifeMessage.endTimeValue !== 'string') {
                        Toast.fail("结束时间不正确");
                        this.addLifeMessage.endTimeValue == '';
                        return false;
                    } else {
                        if (!this.Util.CompareDate(this.addLifeMessage.startTimeValue, this.addLifeMessage.endTimeValue)) {
                            Toast.fail("结束时间不能小于开始时间");
                            return false;
                        }
                    }
                } else {
                    Toast.fail("请选择结束时间");
                    return false;
                }

                if (this.addLifeMessage.locationVal) {
                    if (typeof this.addLifeMessage.locationVal !== 'string') {
                        Toast.fail("地点不正确");
                        this.addLifeMessage.locationVal == '';
                        return false;
                    }
                } else {
                    Toast.fail("请输入地点");
                    return false;
                }

                if (this.addLifeMessage.subjectVal) {
                    if (typeof this.addLifeMessage.subjectVal !== 'string') {
                        Toast.fail("主题输入错误");
                        this.this.addLifeMessage.subjectVal == '';
                        return false;
                    }
                } else {
                    Toast.fail("请输入主题");
                    return false;
                }

                if (this.addLifeMessage.scheduleVal) {
                    if (typeof this.addLifeMessage.scheduleVal !== 'string') {
                        Toast.fail("流程输入错误");
                        this.scheduleVal = '';
                        return false;
                    }
                } else {
                    Toast.fail("请输入流程");
                    return false;
                }
                if (!!this.labelValList) {
                    if (typeof this.labelValList == 'object') {
                        if (!this.labelValList instanceof Array) {
                            Toast.fail("标签错误");
                            this.labelValList = [];
                            return false;
                        }
                    } else {
                        Toast.fail("标签类型错误");
                        return false;
                    }
                } else {
                    Toast.fail("请选择标签");
                    return false;
                }
                console.log(this.attendUser);
                if(!this.attendUser){
                    Toast.fail("请添加出席人员");
                    return false;
                }else{
                    if(this.attendUser.length < 1){
                        Toast.fail("请添加出席人员");
                        return false;
                    }
                }

                return true;
            },

            onLocation() {
                if(this.location){
                    let loca = this.location.addressComponent.province + this.location.addressComponent.district + this.location.addressComponent.township;
                    this.addLifeMessage.locationVal = loca;
                }else{
                    Toast.fail("您当前无法获取定位");
                }

            },
        },
    }
</script>

<style lang="scss" scoped>
    #addLife {
        padding-top: 46px;
        .box {
            position: relative;
            i {
                position: absolute;
                right: 15px;
                z-index: 10;
                line-height: 44px;
                color: #999999;
            }
        }
        main {
            .van-hairline--bottom {
                margin-top: 2px;
            }
            .theme {
                padding: 15px;
                font-size: 14px;
                textarea {
                    box-sizing: border-box;
                    width: 100%;
                    height: 120px;
                    padding: 5px;
                    border-radius: 5px;

                }
            }
            .label {
                padding: 0px 15px 15px 15px;
                p {
                    font-size: 14px;
                }
                .btn_default_style {
                    width: 21%;
                    border: 1px;
                    margin: 2%;
                    font-size: 10px;
                    background-color: #e9e9e9;
                    padding: 10px 2px;
                    text-align: center;
                }
                .color-red {
                    background-color: red;
                    color: white;
                }
            }
            .staff {
                font-size: 12px;
                padding: 0 15px;
                span {
                    float: right;
                    color: red;
                }
            }
            .main-personnel {
                padding: 10px 0;
                .main-components {
                    display: inline-block;
                    width: 25%;
                }
                .MC_all {
                    display: inline-block;
                    width: 25%;
                    text-align: center;
                    margin-top: 3px;
                    i {
                        font-size: 43px;
                        color: red;
                    }
                }
            }
        }
        footer {
            padding: 0px 15px 15px 15px;
            overflow: auto;
            .btn_default_style {
                float: left;
                width: 46%;
                background-color: red;
                color: white;
                margin: 2%;
                padding: 5px;
                border: 0px;
                border-radius: 5px;
            }
        }

    }
</style>
