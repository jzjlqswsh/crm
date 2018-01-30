var product = {};
window.productConfig = product;
product.propertyList = [
    {id :"productType",     name        : "产品类型"},
    {id :"carType",         name        : "车型"},
    {id :"name",            name        : "品名"},
    {id :"pinfang",         name        : "品番"},
    {id :"line",            name        : "生产线"},
    {id :"projectName",     name        : "工程名称"},
    {id :"fangNum",         name        : "机番号"},
    {id :"partName",        name        : "部位"},
    {id :"quFen",           name        : "区分"},
    {id :"content",         name        : "内容"},
    {id :"reason",          name        : "原因"},
    {id :"destroyNum",      name        : "废却数量"},
    {id :"prduct_time",      name        : "生产日期"},
    {id :"edit_time",       name        : "修改日期"},
]

product.titleList_bad = [
    {id :"name",            name        : "品名"},
    {id :"pinfang",         name        : "品番"},
    {id :"line",            name        : "生产线"},
    {id :"projectName",     name        : "工程名称"},
    {id :"fangNum",         name        : "机番号"},
    {id :"partName",        name        : "部位"},
    {id :"content",         name        : "内容"},
    {id :"reason",          name        : "原因"},
    {id :"destroyNum",      name        : "废却数量"},
    {id :"prduct_time",      name        : "生产日期"},
    {id :"edit_time",       name        : "修改日期"},
]

product.operation = [
    {name: "生产实绩管理", son: [
            {
                name: "工程内废却数据",
                type: "bad_data"
            },
            {
                name: "生产实绩",
                type: "product_data"
            },
        ]
    },
    {name: "废却报表", son: [
            {
                name: "ECU报表",
                type: "ECU_report"
            },
        ]
    },
]

product.productName = [
    {productType: "ECU", carType: "380A", name: "ABS/ECU", line: "AS02", projectName: "基板供给机", fangNum:  "FEPV0001", halfPinfang: ""},
    {productType: "ECU", carType: "380A", name: "ABS/ECU", line: "AS02", projectName: "基板异物除去", fangNum: "FECO0001", halfPinfang: ""},
    {productType: "ECU", carType: "380A", name: "ABS/ECU", line: "AS02", projectName: "焊锡膏焊锡印刷", fangNum:"FEPN0001", halfPinfang: ""},
    {productType: "ECU", carType: "380A", name: "ABS/ECU", line: "AS02", projectName: "焊锡印刷检查", fangNum: "FETM0001", halfPinfang: ""},
    {productType: "ECU", carType: "380A", name: "ABS/ECU", line: "AS02", projectName: "常用实装（1）", fangNum:"FEMT0001", halfPinfang: ""},
    {productType: "ECU", carType: "380A", name: "ABS/ECU", line: "AS02", projectName: "常用实装（2）", fangNum:"FEMT0002", halfPinfang: ""},
    {productType: "ECU", carType: "380A", name: "ABS/ECU", line: "AS02", projectName: "常用实装（3）", fangNum:"FEMT0003", halfPinfang: ""},
    {productType: "ECU", carType: "380A", name: "ABS/ECU", line: "AS02", projectName: "焊锡", fangNum: "FEWS0001", halfPinfang: ""},
    {productType: "ECU", carType: "380A", name: "ABS/ECU", line: "AS02", projectName: "基板収納", fangNum:   "FEPV0002", halfPinfang: ""},
]

product.productContent = [
    {content: "焊接不良"},
    {content: "检测不良"},
    {content: "来料不良"},
    {content: "贴装不良"},
    {content: "异物附着"},
    {content: "写入不良"},
    {content: "设备异常"},
    {content: "RIM未硬化"},
    {content: "RIM注入不良"},
    {content: "焊接不良"},
    {content: "烧焦"},
    {content: "设备异常"},
    {content: "异物附着"},
]
product.productReason = [
    {content: "焊接不良"},
    {content: "检测不良"},
    {content: "来料不良"},
    {content: "贴装不良"},
    {content: "异物附着"},
    {content: "写入不良"},
    {content: "设备异常"},
    {content: "RIM未硬化"},
    {content: "RIM注入不良"},
    {content: "焊接不良"},
    {content: "烧焦"},
    {content: "设备异常"},
    {content: "异物附着"},
]

product.quFenDesc = {
    "必要" : "normal",
    "不良" : "bad",
    "正常" : "good",
}

product.selectDic = {};
product.selectDic.quFen = {};
product.selectDic.quFen["必要"] = true;
product.selectDic.quFen["不良"] = true;

product.updataSelectData = function(tbName, data){
    var info = data.info.data
    // if(tbName == tableNames.the_projectName || tableNames.the_projectName){
    for (var i = 0; i < info.length; i++) {
        for(var key in info[i]){
            var value = info[i][key];
            if(tbName == tableNames.the_reason){
                if(key == "content"){
                    key = "reason";
                }
            }
            if(!product.selectDic[key]){
                product.selectDic[key] = {};
            }
            product.selectDic[key][value] = true;
        }
    }
    // }
}

product.addSelectInfoByName = function(name, key){
    var data = product.selectDic[name];
    if(!data){
        data = {};
    }
    data[key] = true;
}

product.getSelectInfoByName = function(name){
    cc.log(product.selectDic[name],name);
    return product.selectDic[name]
}



cc.log("require product");
module.exports = product;
