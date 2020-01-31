import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Vant from 'vant'
import './assets/fonts/iconfont.css'// 引用的外部图标样式
import './../public/css/public.css'// 引用的外部图标样式
import 'vant/lib/index.css'
import util from './common/util'; //导入公用函数
import config from './common/config'; //导入设置
import './assets/pubic.css'
import VueAMap from 'vue-amap'
import BaiduMap from 'vue-baidu-map'

Vue.use(VueAMap);
Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'DD279b2a90afdf0ae7a3796787a0742e'
})
// import 'vant/lib/icon/local.css';//vant图标使用本地样式文件，否则无网络时图标无法显示
Vue.use(Vant);
// 组织默认启动提示语
Vue.config.productionTip = false;
// 初始化vue-amap
VueAMap.initAMapApiLoader({
    // 高德key
    key: '232a8ac24c44c0fa7832223ff9edb80e',
    // 插件集合 （插件按需引入）
    plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation'],
    v: '1.4.4'
});

//全局引入自定义函数
Vue.prototype.Util = util;
//全局引入设置
Vue.prototype.Config = config;
if (process.env.NODE_ENV == 'development') {
    Vue.config.devtools = true;
} else {
    Vue.config.devtools = false;
}

router.beforeEach((to, from, next) => {
    //缓存上个页面路径
    if (from && from.fullPath) {
        util.localStorageSet("routerFromPath", from.fullPath);
    }
    //缓存当前页面路径
    if (to && to.fullPath) {
        util.localStorageSet("routerToPath", to.fullPath);
    }

    if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
        let token = localStorage.getItem('token');
        console.log("token = ",token);
        if (token) { // 判断缓存里面是否有 token  //在登录的时候设置它的值
            next();
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next();
    }
});
localStorage.setItem('htmlHeight', window.screen.height);
localStorage.setItem('width', window.screen.width);
// $mount表示手动挂载
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
