// Returns a random integer between min (included) and max (excluded)

var ModelManager = {};
window.ModelManager = ModelManager;
ModelManager.allModel = {};

ModelManager.creatModel = function(type, data){
    var modelClass = require(type);
    var model = new modelClass();
    model.initData(data);
    if(!ModelManager.allModel[type]){
        ModelManager.allModel[type] = {};
    }
    ModelManager.allModel[type][model.uid] = model;
    return model;
}

ModelManager.getmodel = function(type, uid){
    if(!ModelManager.allModel[type]){
        return null;
    }
    return ModelManager.allModel[type][uid];
}

module.exports = ModelManager;
