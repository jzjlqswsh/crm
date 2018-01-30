cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: {
            default: null,
            type: cc.Prefab
        },
        initItemCount: 0,
        itemHeight: 24,
        scrollView: cc.ScrollView,
        bufferZone: 0, // when item is away from bufferZone, we relocate it
        itemList: [],
        clickFun: null,
    },

    init ( dataList, width, fun) {
        this.clickFun = fun;
        var offset = -1;
        if(dataList.length < this.initItemCount){
            this.initItemCount = dataList.length;
            offset = 0;
        }
        this.node.width = width - 20;
        this.node.parent.width = width;
        this.node.parent.height = this.itemHeight * (this.initItemCount + offset);
        this.scrollView.node.width = width;
        this.scrollView.node.height = this.itemHeight * (this.initItemCount + offset);
        this.dataList = dataList;
        this.itemList = [];
        this.updateTimer = 0;
        this.updateInterval = 0.2;
        this.lastContentPosY = 0; // use this variable to detect if we are scrolling up or down
        this.initList();

        var self = this;
        display.addCloseShiled(this.scrollView.node,function(){
            cc.log("deletMe");
            self.scrollView.node.destroy();
            window.currentEditBox = null;
        });
        this.node.on('closeSelectList', function(){
            self.scheduleOnce(function(){  
                self.scrollView.node.destroy();
                window.currentEditBox = null;
            }, 0.1);
            
        }, this);
    },

    // use this for initialization
    initList () {
        let y = -2;
        this.node.height = (this.dataList.length) * this.itemHeight;
        // this.node.height = Math.max(this.node.height, this.scrollView.height);
        for (let i = 0; i < this.initItemCount; ++i) {
            let item = cc.instantiate(this.itemPrefab).getComponent('ListItem');
            let itemInfo = this.dataList[i];
            item.init(this.clickFun);
            this.node.addChild(item.node);
            item.updateItem (i, y, itemInfo);
            y -= this.itemHeight;
            this.itemList.push(item);
        }
    },

    getPositionInView: function (item) { // get item position in scrollview's node space
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },

    update (dt) {
        if(this.initItemCount == this.dataList.length){
            return;
        }
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) {
            return; // we don't need to do the math every frame
        }
        if(this.lastContentPosY == this.node.y){
            return;
        }
        this.updateTimer = 0;
        let items = this.itemList;
        let buffer = this.bufferZone;
        let isDown = this.node.y < this.lastContentPosY; // scrolling direction
        let curItemCount = this.itemList.length;
        let offset = this.itemHeight * curItemCount;
        for (let i = 0; i < curItemCount; ++i) {
            let item = items[i];
            let itemNode = item.node;
            let viewPos = this.getPositionInView(itemNode);
            // cc.log(viewPos,i);
            if (isDown) {
                // if away from buffer zone and not reaching top of content
                if (viewPos.y < -buffer && itemNode.y + this.node.y + this.node.parent.height < 0) {
                    let newIdx = item.index - curItemCount;
                    if(newIdx < 0){
                        return;
                    }
                    cc.log(newIdx,"isDown");
                    let newInfo = this.dataList[newIdx];
                    item.updateItem(newIdx, itemNode.y + offset, newInfo);
                }
            } else {
                // if away from buffer zone and not reaching bottom of content
                if (viewPos.y > buffer && itemNode.y + this.node.y > this.itemHeight) {
                    let newIdx = item.index + curItemCount;
                    cc.log(newIdx);
                    if(newIdx >= this.dataList.length){
                        return;
                    }
                    let newInfo = this.dataList[newIdx];
                    item.updateItem(newIdx, itemNode.y - offset, newInfo);
                }
            }
        }
        // update lastContentPosY
        this.lastContentPosY = this.node.y;
    },
});
