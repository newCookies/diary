import axios from 'axios';
import Qs from 'qs';
import config from '../common/config';
import util from "../common/util";
import vueRouter from './../router';
let base,baseUrl;

/* 参数说明：
   params：请求数据,
   type：请求类型,
   ajaxUrl：请求api,
   noToken：请求是否需要token,
   ajaxConfig：请求headers,
   pageRouter：请求页面路径，用于token过期时的返回
   success:请求成功回调函数
*/
export const baseAjax = function (options) {
    let settingDeflaut = {
        params: {},
        type: 'get',
        ajaxConfig: {}
    };
    let setting = Object.assign(settingDeflaut, options),
        token = localStorage.getItem('token');

    if (!options.noToken && token) {
        setting.params.token = token;
    }

    base = config.apiUrl;

    function successFun(res) {
        // alert("接口请求url：" + setting.ajaxUrl + "；接口请求数据：" + JSON.stringify(setting.params) + "；接口返回数据：" + JSON.stringify(res.data))
        if(res.data.code == 1005){
            let routerFromPath = util.localStorageGet('routerFromPath');
            let routerToPath = util.localStorageGet('routerToPath');
            vueRouter.push({
                 path: '/login/index'
            })
        }
        return res.data;
    }

    if (setting.type.toLowerCase() == 'post') {
        return axios.post(base + setting.ajaxUrl, Qs.stringify(setting.params), {
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "usertoken": token
            },
        }).then(res => {
            let returnData = successFun(res); //请求结果
            if (returnData != null || returnData != undefined) {
                return returnData;
            }
        }).catch(function (err) {
            console.log(err);
        });
    }
    if (setting.type.toLowerCase() == 'get') {
        setting.ajaxConfig.params = setting.params;
        setting.header = setting.params;
        return axios.get(base + setting.ajaxUrl, {
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "usertoken": token
            },
        }).then(res => {
            let returnData = successFun(res); //请求结果
            if (returnData != null) {
                return returnData;
            }
        }).catch(function (err) {
            console.log(err)
        });
    }
};
//文件上传
export const fileUpload = params => {
    base = config.apiUrl;
    let file = '';
    if (!!!params) {
        return alert("图片为空");
    }
    let param = new window.FormData();
    param.append('upimage', params.file);
    return axios.post(`${base}` + '/upload/image', param, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => res.data).catch(function (err) {
        console.log(err)
    });
};
