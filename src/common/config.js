
	let apiUrl,url;
	//测试正式环境开关

	// let surroundingsSwitch = true;//测试环境
	let surroundingsSwitch = false;//正式环境


	if(surroundingsSwitch){
        apiUrl = 'http://zhdj.ccfan.com.cn/api'; //接口测试环境地址
        url = 'http://zhdj.ccfan.com.cn/'; //网页测试环境地址
	}else{
        apiUrl = 'https://szct.qiantongyun.cn/api'; //接口正式环境地址
        url = 'https://szct.qiantongyun.cn/'; //网页正式环境地址
	}

module.exports = {
    apiUrl: apiUrl,
    url: url,
	maxImage: 5, //上传图片数量限制


	minInput: 4, //文本输入框，输入字数限制
	maxInput: 100, //文本输入框，输入字数限制
	backCode: {
		"1001": "请求响应成功",
		"1002": "请求失败",
		"1005": "用户未登录",
	},
};
