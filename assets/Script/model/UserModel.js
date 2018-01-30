cc.Class({
    name: "UserModel",
    properties: {
        nickName: {
            get: function () {
                return this._nickName;
            },
        },
        userID: {
            get: function () {
                return this._userID;
            },
        }
    },

    ctor: function () {

    },
    // 初始化数据
    initData: function(data){
        this._nickName = data.nick;
        this._userID = data.user_id;
        Servers.sessid = data.sess;
    }
    // update (dt) {},
});
