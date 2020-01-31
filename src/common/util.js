import CryptoJS from 'crypto-js' //加密js
import EXIF from 'exif-js'

const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量

export default {
    localStorageSet: function (item, value) {
        let data = localStorage.newH5;
        if (data) {
            data = JSON.parse(data);
        } else {
            data = {};
        }
        data[item] = value;
        localStorage.setItem('newH5', JSON.stringify(data)); //如果是对象转成字符串
    },
    localStorageGet: function (key) {
        let data = localStorage.newH5;
        if (data) {
            data = JSON.parse(data);
            return data[key] || null;
        }
        return null;
    },

    //判断终端
    device: function () {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            return 'Android'
        }
        if (isiOS) {
            return 'Ios'
        }
        return ''
    },

    getDeviceInfo: function (success, error) {
        //设备信息格式{name:"设备名称",platform:"设备类型",uuid:"通用唯一标识符",version:"操作系统版本",mac:"MAC地址"}
        if (success) {
            if (window.MacAddress) {
                window.MacAddress.getMacAddress(
                    function (macAddress) {
                        success({
                            mac: macAddress
                        });
                    },
                    function (fail) {
                        console.log(fail);
                    }
                );
            } else {
                success();
            }

        }

    },

    //url参数
    getQueryStringByName: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },

    //使用方式：dateFormatter('YYYY-MM-DD HH:mm', '1995/02/15 13:55') // 1995-02-15 13:55
    dateFormatter: (formatter, date) => {
        date = (date ? new Date(date) : new Date);
        const Y = date.getFullYear() + '',
            M = date.getMonth() + 1,
            D = date.getDate(),
            H = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();
        return formatter.replace(/YYYY|yyyy/g, Y)
            .replace(/YY|yy/g, Y.substr(2, 2))
            .replace(/MM/g, (M < 10 ? '0' : '') + M)
            .replace(/DD/g, (D < 10 ? '0' : '') + D)
            .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
            .replace(/mm/g, (m < 10 ? '0' : '') + m)
            .replace(/ss/g, (s < 10 ? '0' : '') + s)
    },

    //时分判断，date：字符串日期，返回例子：40分钟前,2小时40分钟前,2019-05-02 16:12
    DateDifference: function (faultDate, completeTime) {
        let usedTime = Date.parse(faultDate) - Date.parse(completeTime); // 相差的毫秒数
        let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出天数
        let leavel = usedTime % (24 * 3600 * 1000); // 计算天数后剩余的时间
        let hours = Math.floor(leavel / (3600 * 1000)); // 计算剩余的小时数
        let leavel2 = leavel % (3600 * 1000); // 计算剩余小时后剩余的毫秒数
        let minutes = Math.floor(leavel2 / (60 * 1000)); // 计算剩余的分钟数
        if (days !== 0) {
            return days + '天 ' + hours + '小时 ' + minutes + '分钟';
        } else if (hours !== 0) {
            return hours + '小时 ' + minutes + '分钟';
        } else if (minutes !== 0) {
            return minutes + '分钟';
        } else if (leavel2 != 0) {
            return leavel2.toString().substring(0, 2) + '秒';
        } else {
            return '';
        }
    },
    computingTime: (parms) => {
        if (!!!isNaN(parms)) {
            let time = parms.toString().substring(2);
            time = 60 / (10 / time * 100000) * 100;
            time = Number.parseInt(time);
            return parms.toString().substring(0, 1) + '小时' + time + '分钟';
        } else {
            return new TypeError;
        }
    },

    // 比较两个时间的大小
    CompareDate: (d1, d2) => {
        return ((new Date(d1.replace(/-/g, "\/"))) < (new Date(d2.replace(/-/g, "\/"))));
    },
    // 创建当前时间
    CurentTime: () => {
        var now = new Date();

        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日

        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss = now.getSeconds();           //秒

        var clock = year + "-";

        if (month < 10)
            clock += "0";

        clock += month + "-";

        if (day < 10)
            clock += "0";

        clock += day + " ";

        if (hh < 10)
            clock += "0";

        clock += hh + ":";
        if (mm < 10) clock += '0';
        clock += mm + ":";

        if (ss < 10) clock += '0';
        clock += ss;
        return (clock);
    },
    // 去除时间中的 - ：空格
    filtrationTime: (param) => {
        let time = null;
        let date = param.toString();
        date = date.replace(/\s+/g, "");
        date = date.replace(/[\s\:]+/g, '');
        date = date.replace(/-/g, '');
        return date
    },

    //阻止冒泡
    stopBubble: function (e) {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
        if (window.event) {
            window.event.cancelBubble = true;
            return false;
        }
        return false;
    },


    // 	生成随机UID
    //  使用方式：genUid.soup_ = '!#$%()*+,-./:;=?@[]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    //   genUid() // ;l`yCPc9A8IuK}?N6,%}
    genUid: () => {
        var length = 20
        var soupLength = genUid.soup_.length
        var id = []
        for (var i = 0; i < length; i++) {
            id[i] = genUid.soup_.charAt(Math.random() * soupLength)
        }
        return id.join('');
    },


    // RGB色值生成16进制色值
    // 使用方式：rgb2Hex('100, 50, 0') // '#643200'
    rgb2Hex: rgb => {
        let rgbList = rgb.toString().match(/\d+/g)
        let hex = '#'
        for (let i = 0, len = rgbList.length; i < len; ++i) {
            hex += ('0' + Number(rgbList[i]).toString(16)).slice(-2)
        }
        return hex
    },

    setCookie: (name, value) => {
        if (value) {
            var Days = 365;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
        }
    },
    getCookie: (name) => {
        if (document.cookie.length > 0) {
            var begin = document.cookie.indexOf(name + '=');
            if (begin !== -1) {
                begin += name.length + 1 // cookie值的初始位置
                var end = document.cookie.indexOf(';', begin);// 结束位置
                if (end === -1) {
                    end = document.cookie.length // 没有;则end为字符串结束位置
                }
                return unescape(document.cookie.substring(begin, end));
            }
        }
        return null;
    },
    //解密方法
    Decrypt: (word) => {
        let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
        let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        let decrypt = CryptoJS.AES.decrypt(srcs, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
        let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    },

    //加密方法
    Encrypt: (word) => {
        let srcs = CryptoJS.enc.Utf8.parse(word);
        let encrypted = CryptoJS.AES.encrypt(srcs, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
        return encrypted.ciphertext.toString().toUpperCase();
    },
    padding: (s, len) => {
        var len = len - (s + '').length;
        for (var i = 0; i < len; i++) {
            s = '0' + s;
        }
        return s;
    },
    arraySet: (arr) => {
        let obj = {};
        arr = arr.reduce((item, next) => {
            obj[next.name] ? '' : obj[next.name] = true && item.push(next);
            return item;
        }, []);
        return arr;
    },
    //图片压缩和拍照时旋转的处理
    compressImg: function (file, callback) {
        let compressNum = 0.1;
        let me = this;
        let files = {
            content: '',
            file: ''
        };
        let Orientation;
        //去获取拍照时的信息，解决拍出来的照片旋转问题
        EXIF.getData(file, function () {
            Orientation = EXIF.getTag(this, "Orientation");
        });
        // 处理旋转图片
        let rotateImg = (img, direction, canvas) => {
            //最小与最大旋转方向，图片旋转4次后回到原方向
            const min_step = 0;
            const max_step = 3;
            if (img == null) return;
            //img的高度和宽度不能在img元素隐藏后获取，否则会出错
            let height = img.height;
            let width = img.width;
            let step = 2;
            if (step == null) {
                step = min_step;
            }
            if (direction == "right") {
                step++;
                //旋转到原位置，即超过最大值
                step > max_step && (step = min_step);
            } else {
                step--;
                step < min_step && (step = max_step);
            }
            //旋转角度以弧度值为参数
            let degree = (step * 90 * Math.PI) / 180;
            let ctx = canvas.getContext("2d");
            switch (step) {
                case 0:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0);
                    break;
                case 1:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree);
                    ctx.drawImage(img, 0, -height);
                    break;
                case 2:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.rotate(degree);
                    ctx.drawImage(img, -width, -height);
                    break;
                case 3:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree);
                    ctx.drawImage(img, -width, 0);
                    break;
            }
        };
        // 压缩图片
        let compress = (img, Orientation) => {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            //瓦片canvas
            let tCanvas = document.createElement("canvas");
            let tctx = tCanvas.getContext("2d");
            // let initSize = img.src.length;
            let width = img.width;
            let height = img.height;
            //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
            let ratio;
            if ((ratio = (width * height) / 4000000) > 1) {
                // console.log("大于400万像素");
                ratio = Math.sqrt(ratio);
                width /= ratio;
                height /= ratio;
            } else {
                ratio = 1;
            }
            canvas.width = width;
            canvas.height = height;
            //    铺底色
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            //如果图片像素大于100万则使用瓦片绘制
            let count;
            if ((count = (width * height) / 1000000) > 1) {
                // console.log("超过100W像素");
                count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
                //      计算每块瓦片的宽和高
                let nw = ~~(width / count);
                let nh = ~~(height / count);
                tCanvas.width = nw;
                tCanvas.height = nh;
                for (let i = 0; i < count; i++) {
                    for (let j = 0; j < count; j++) {
                        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                    }
                }
            } else {
                ctx.drawImage(img, 0, 0, width, height);
            }
            //修复ios上传图片的时候 被旋转的问题
            if (Orientation != "" && Orientation != 1) {
                switch (Orientation) {
                    case 6: //需要顺时针（向左）90度旋转
                        rotateImg(img, "left", canvas);
                        break;
                    case 8: //需要逆时针（向右）90度旋转
                        rotateImg(img, "right", canvas);
                        break;
                    case 3: //需要180度旋转
                        rotateImg(img, "right", canvas); //转两次
                        rotateImg(img, "right", canvas);
                        break;
                }
            }
            //进行最小压缩
            let ndata = canvas.toDataURL("image/jpeg", compressNum);
            tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
            return ndata;
        };
        //将base64转换为文件
        let dataURLtoFile = (dataurl) => {
            var arr = dataurl.split(","),
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], file.file.name, {
                type: file.file.type
            });
        };
        // 看支持不支持FileReader
        if (!file || !window.FileReader) return;
        if (/^image/.test(file.file.type)) {
            // 创建一个reader
            let reader = new FileReader();
            // 读取成功后的回调
            reader.onloadend = function () {
                let result = file.content;
                let img = new Image();
                img.src = result;
                //判断图片是否大于500K,是就直接上传，反之压缩图片
                if (file.content.toString().length <= 500 * 1024) {
                    callback(file);
                } else {
                    if (file.content.toString().length > 3000 * 1024) {
                        compressNum = 0.01;
                    }
                    img.onload = function () {
                        let data = compress(img, Orientation);
                        files.content = data;
                        files.file = dataURLtoFile(files.content);
                        callback(files);
                    };
                }
            };
            reader.onloadend();
        }
    },


    // 处理字符串换行问题
    stringLineFeed: (string) => {
        if (!string) {
            return string;
        }
        if(typeof string === 'string'){
            return string.replace(/\n|\r\n/g, '<br/>');
        }
        return string;
    }
};
