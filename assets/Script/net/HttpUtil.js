// Returns a random integer between min (included) and max (excluded)

var HttpUtil = {};
HttpUtil.serverUrl = "";
HttpUtil.sendUrl = function (url, fun) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
            var response = xhr.responseText;
            var jsonData = JSON.parse(response);
            fun(jsonData)
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}

module.exports = HttpUtil;
