var display = {};
window.display = display;
display.addShiled = function(node){
    function onTouchBegan(touch, event){
        return true;
    }
    cc.log("display.addShiled");
    var touchListener = {
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: onTouchBegan
    };
    cc.eventManager.addListener(touchListener, node);
}

display.addCloseShiled = function(node, closeFun){
    function onTouchBegan(touch, event){
        return true;
    }
    function onTouchEnded(touch, event){
        var target = event.getCurrentTarget();
        if(!isTouchInside(target,touch)){
          if(closeFun){
            closeFun();
          }
        }
    }
    function isTouchInside (owner,touch) {
        if(!owner || !owner.getParent()){
          return false;
        }
        var touchLocation = touch.getLocation(); // Get the touch position
        touchLocation = owner.getParent().convertToNodeSpace(touchLocation);
        touchLocation.x = touchLocation.x - owner.getParent().anchorX * owner.getParent().width;
        touchLocation.y = touchLocation.y - owner.getParent().anchorY * owner.getParent().height;
        var bl = cc.rectContainsPoint(owner.getBoundingBox(), touchLocation);
        cc.log(owner.getBoundingBox());
        cc.log(touchLocation);
        return bl;
    }
    var touchListener = {
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: onTouchBegan,
      onTouchEnded: onTouchEnded
    };
    cc.eventManager.addListener(touchListener, node);
}

display.showTips = function(tips){
  cc.loader.loadRes("tips", function (err, prefab) {
      var node = cc.instantiate(prefab);
      window.mainView.node.addChild(node,10);
      node.y = 100;
      node.getChildByName("Label").getComponent(cc.Label).string = tips;
      node.runAction(cc.sequence(
          cc.moveBy(0.5,cc.p(0,50)),
          cc.spawn(
            cc.moveBy(0.3,cc.p(0,30)),
            cc.fadeOut(0.3)
          ),
          cc.callFunc(function(){
            node.destroy();
          })
        ));
  });
}

display.addChooseText = function(editBox, type, fun){
    editBox.node.on('touchend', function ( event ) {
      display.showChooseText(event, type);
    });
}

display.showChooseText = function(event, type){
  if(window.currentEditBox){
      return;
  }
  var dataList = productConfig.getSelectInfoByName(type);
  if(dataList){
      var keys = Object.keys(dataList);
      var main = window.mainView;
      let worldPos = event.target.parent.convertToWorldSpaceAR(event.target.position);
      let viewPos = main.node.convertToNodeSpaceAR(worldPos);
      viewPos.y -= event.target.anchorY * event.target.height;
      window.currentEditBox = event.target;
      main.showSelectList(keys, viewPos, event.target.width, function(data){
          display.setTextBySelect(data);
      });
  }
}

display.setTextBySelect = function(data){
  window.currentEditBox.getComponent(cc.EditBox).string = data;
}







module.exports = display;