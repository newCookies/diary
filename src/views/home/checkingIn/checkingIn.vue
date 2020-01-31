<template>
    <section id="checkingIn">
        <van-nav-bar title="考勤签到" :fixed="true" left-arrow @click-left="back" :z-index="999"/>
        <main>
            <div class="data-time">
                <p> {{ checkingInTime }}</p>
                <span> {{ checkingInData }}</span>
            </div>

            <div class="amap-page-container">
                <el-amap vid="amap" :zoom="zoom" :plugin="plugin" class="amap-demo" :center="center">
                </el-amap>
                <!--<div class="toolbar">
                    <span v-if="loaded">
                        location: lng = {{ lng }} lat = {{ lat }}
                    </span>
                    <span v-else>正在定位</span>
                </div>-->
            </div>

            <div class="footer">
                <div class="foot signIn" @click="onSignIn('0')">
                    <p class="text-1">签到</p>
                </div>
                <!--<div class="foot signIn" @click="onSignIn('3')">-->
                    <!--<p class="text-1">签退</p>-->
                <!--</div>-->
                <div class="foot checking-in">
                    <p class="text-2" @click="goPage">考勤记录</p>
                </div>
            </div>
        </main>

    </section>
</template>

<script>
    import {Toast} from 'vant';
    import apiLists from "../../../interfase/apiLists";

    export default {
        name: "learn",
        mounted() {
            let me = this;
            console.log(1);
            setInterval(function () {
                let flag = '';
                var today = new Date();
                var h = today.getHours();
                var m = today.getMinutes();
                var s = today.getSeconds() + 1;
                var myyear = today.getFullYear();
                var mymonth = today.getMonth();
                var monthArray = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                var mynowdate = today.getDate();
                var myday = today.getDay();
                var dayArray = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
                m = me.checkTime(m);
                s = me.checkTime(s);

                me.checkingInData = myyear + "年 " + monthArray[mymonth] + mynowdate + "日 " + dayArray[myday];
                me.checkingInTime = h + ":" + m + ":" + s;

            }, 1000);
        },
        computed: {},
        data() {
            let me = this;
            return {
                checkingInData: null,
                checkingInTime: null,
                center: [106.33, 29.35],
                zoom: 14,
                lng: 0,
                lat: 0,
                loaded: false,
                location: null,
                city: null,
                plugin: [   //一些工具插件
                    {
                        pName: 'Geolocation',   //定位
                        events: {
                            init(o) {
                                // o 是高德地图定位插件实例
                                o.getCurrentPosition((status, result) => {
                                    if (result && result.position) {
                                        me.lng = result.position.lng;             //设置经度
                                        me.lat = result.position.lat;             //设置维度
                                        me.center = [me.lng, me.lat];         //设置坐标
                                        me.loaded = true;                         //load
                                        me.$nextTick();                           //页面渲染好后
                                        localStorage.setItem("location",JSON.stringify(result));
                                        me.location = result;
                                    }
                                })
                            }
                        }
                    },
                    {
                        pName: 'ToolBar',  //工具栏
                        events: {
                            init(instance) {
                                // console.log(instance);
                            }
                        }
                    },
                    {
                        pName: 'OverView',  //鹰眼
                        events: {
                            init(instance) {
                                // console.log(instance);
                            }
                        }
                    },
                    {
                        pName: 'MapType',  //地图类型
                        defaultType: 0,
                        events: {
                            init(instance) {
                                // console.log(instance);
                            }
                        }
                    }
                ],
                pp: {
                    "type": "complete",
                    "info": "SUCCESS",
                    "status": 1,
                    "Eia": "jsonp_777971_",
                    "position": {"P": 29.57365, "O": 106.53078, "lng": 106.53078, "lat": 29.57365},
                    "message": "Get ipLocation success.Get address success.",
                    "location_type": "ip",
                    "accuracy": null,
                    "isConverted": true,
                    "addressComponent": {
                        "citycode": "023",
                        "adcode": "500105",
                        "businessAreas": [{
                            "name": "观音桥",
                            "id": "500105",
                            "location": {"P": 29.576787, "O": 106.53393900000003, "lng": 106.533939, "lat": 29.576787}
                        }, {
                            "name": "江北(商圈)",
                            "id": "500105",
                            "location": {"P": 29.575701, "O": 106.53391199999999, "lng": 106.533912, "lat": 29.575701}
                        }, {
                            "name": "华新街",
                            "id": "500105",
                            "location": {"P": 29.568066, "O": 106.53749099999999, "lng": 106.537491, "lat": 29.568066}
                        }],
                        "neighborhoodType": "",
                        "neighborhood": "",
                        "building": "",
                        "buildingType": "",
                        "street": "建新北路",
                        "streetNumber": "7",
                        "province": "重庆市",
                        "city": "",
                        "district": "江北区",
                        "township": "观音桥街道"
                    },
                    "formattedAddress": "重庆市江北区观音桥街道观音桥步行街嘉陵公园",
                    "roads": [],
                    "crosses": [],
                    "pois": []
                }
            };
        },
        methods: {
            // 返回上页
            back() {
                window.history.back();
            },
            checkTime(i) {
                if (i < 10) {
                    i = "0" + i
                }
                return i
            },
            goPage() {
                console.log(1);
                let url = '/checkingIn/attendanceRecord';
                this.$router.push({
                    path: url,
                    query: {}
                })
            },
            onSignIn(status) {
                let me = this;
                console.log(status);
                let stas = status == '0' ? '签到' : '签退';
                if(!this.location){
                    Toast.fail("定位失败，不能进行" + stas);
                    return;
                }
                let position = {
                    longitude: me.lng ? me.lng : '',
                    latitude: me.lat ? me.lat : ''
                };

                let data = {};
                if (!!this.city && typeof this.city === 'string') {
                    data = {
                        type: status,  // 0表示签到，  3表示签退
                        address: this.location.addressComponent.province,
                        documentaryarea: this.location.formattedAddress,
                        position: position
                    }
                } else {
                    data = {
                        type: status,  // 0表示签到，  3表示签退
                        address: this.location.addressComponent.province,
                        documentaryarea: this.location.formattedAddress,
                        position: position
                    }
                }
                Toast.loading({
                    mask: true,
                    message: '加载中'
                });
                apiLists.dataAjax(data, 'checkingIn_addCheckingIn').then(res => {
                    console.log("res = ", res);
                    if (res.code == 1001) {
                        setTimeout(() => {
                            Toast.success("签到成功");
                        },1000)
                    } else if (res.code == 1002) {
                        setTimeout(() => {
                            Toast("您已签到");
                        },1000)

                    } else {
                        Toast.fail("签到失败");
                    }
                });
            },
        },
    }
</script>

<style lang="scss" scoped>
    #checkingIn {
        padding-top: 46px;
        main {
            padding: 15px;
            .data-time {
                text-align: center;
                padding-bottom: 25px;
                p {
                    font-size: 24px;
                    color: red;
                    padding-bottom: 10px;
                }
                span {
                    font-size: 14px;
                    color: #999999;
                }
            }
            .footer {
                overflow: hidden;
                padding: 20px;
                .foot {
                    width: 50%;
                    float: left;
                    p {
                        width: 60px;
                        height: 60px;
                        margin: 0 auto;
                        font-size: 12px;
                        text-align: center;
                        line-height: 60px;
                        color: white;
                        border-radius: 50%;
                    }
                    .text-1 {
                        background-color: red;
                    }
                    .text-2 {
                        background-color: #127cdf;
                    }
                }
            }

        }
        .amap-demo {
            height: 400px;
        }
        .map {
            height: 200px;
            width: 100%;
        }
    }

</style>
