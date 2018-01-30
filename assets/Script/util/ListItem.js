cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        index: -1,
        clickFun: null,
        data: null,
    },

    init (fun) {
        this.index = -1;
        this.clickFun = fun;
        this.node.on('mousedown', this.clickMe, this);
    },

    clickMe(){
        if(this.clickFun){
            this.clickFun(this.data);
        }
        this.node.dispatchEvent(new cc.Event.EventCustom('closeSelectList', true));
    },

    updateItem (idx, y, data) {
        this.index = idx;
        this.node.y = y;
        this.data = data;
        this.label.string = this.data;
    }
});
