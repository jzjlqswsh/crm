// Returns a random integer between min (included) and max (excluded)

var HttpUtil = {};

// post请求
// 格式化post 传递的数据
HttpUtil.postDataFormat = function(type, obj, url){
    if(typeof obj != "object" ) {
        alert("输入的参数必须是对象");
        return;
    }
    if(type == "GET"){
        for(var attr in obj) {
            url = url + "&" + attr + '=' + obj[attr];
        }
        return url
    }
    // 支持有FormData的浏览器（Firefox 4+ , Safari 5+, Chrome和Android 3+版的Webkit）
    if(typeof FormData == "function") {
        var data = new FormData();
        for(var attr in obj) {
            data.append(attr, obj[attr]);
        }
        return data;
    }else {
        // 不支持FormData的浏览器的处理 
        var arr = new Array();
        var i = 0;
        for(var attr in obj) {
            arr[i] = encodeURIComponent(attr) + "=" + encodeURIComponent(obj[attr]);
            i++;
        }
        return arr.join("&");
    }
}


HttpUtil.sendUrl = function (url, params, fun, type, isOpen) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
            var response = xhr.responseText;
            try{
                var jsonData = JSON.parse(response);
                cc.log(jsonData);
                if(jsonData.err){
                    if(jsonData.err == "0"){
                        if(fun){
                            fun(jsonData);
                        }
                    }else{
                        display.showTips(jsonData.err);    
                    }
                }else{
                    cc.log("not my data!");  
                    // display.showTips("数据错误");
                }
            }catch(err){
                cc.log(err);    
            }   
        }
    };
    cc.log(url);
    cc.log(params);
    if(type == null){
        type = "POST"
    }
    var data = HttpUtil.postDataFormat(type, params, url);
    if(type == "POST"){
        xhr.open(type, url, true);
        cc.log(data);
        xhr.send(data);
    }else{
        url = data
        if(isOpen){
            window.open(url);
        }else{
            xhr.open(type, url, true);
            cc.log(url);
            xhr.send();    
        }    
    }
}

module.exports = HttpUtil;
