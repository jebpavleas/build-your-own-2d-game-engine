/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

DyePack2.kReferencePosition = [ [-15, 80], // top-left
                               [120, 80], // top-right
                               [-15, -15], // bottom-left
                               [120, -15]  // bottom-right
                              ];
DyePack2.eDyePackState = Object.freeze({
    eTopLeftRegion: 0,
    eTopRightRegion: 1,
    eBottomLeftRegion: 2,
    eBottomRightRegion: 3,
    eExcitedCWRotate: 10,
    eExcitedCCWRotate: 11,
    eChaseState: 12,
    eCoolDownEnlarge: 13,
    eCoolDownShrink: 14
});

function DyePack2(spriteTexture, x, y) {
    this.kRefWidth = 1.6;
    this.kRefHeight = 2.6;
    this.kReferenceSpeed = 100 / (5 * 60);
    this.li=1;
            // cover 100 units in 5 seconds     
            
            
    this.mDyePack = new SpriteRenderable(spriteTexture);
    this.mDyePack.setColor([0.2, 0.2, 0.5, 0.1]);
    this.mDyePack.getXform().setPosition(x, y);
    this.mDyePack.getXform().setSize(this.kRefWidth, this.kRefHeight);
    this.mDyePack.setElementPixelPositions(610, 690, 53, 193);
    GameObject.call(this, this.mDyePack);
    
    this._computeNextState();
    // to support the chasing states
    
    
    // state is goverened by time
    this.mStateTimeTick = 0;  // this is the time
    
    // Expired to remove
    this.mExpired = false;
}
gEngine.Core.inheritPrototype(DyePack2, GameObject);

DyePack2.prototype.setExpired = function() {
    this.li--;
};
DyePack2.prototype.hasExpired = function() {
    return this.li;
};

DyePack2.prototype._computeNextState = function() {
    this.mCurrentState = this._getRandomState();
        
    var nextState = this._getRandomState();
    this.mTargetPosition = this._getRandomizedPosition(nextState);
    this._computeSpeed();
};
    
DyePack2.prototype._computeSpeed = function() {
     //var toNextPos = [];
     //vec2.subtract(toNextPos, this.mTargetPosition, this.getXform().getPosition());
    // DO NOT set this now! Move there gradually
          this.setCurrentFrontDir(vec2.fromValues(0, -1));
    // 
    this.setSpeed(1.6* this.kReferenceSpeed);
        // +-20% variation from covering 100 units in 5 seconds
};

DyePack2.prototype._getRandomizedPosition = function(region) {
    var p = DyePack2.kReferencePosition[region];
    var x = p[0] + ((Math.random() - 0.5) * 15);
    var y = p[1] + ((Math.random() - 0.5) * 10);
    return vec2.fromValues(x, y);
};

DyePack2.prototype._getRandomState = function() {
    var r = Math.random();
    var s;
    if (r < 0.25)
        s = DyePack2.eDyePackState.eTopLeftRegion;
    else if (r < 0.5)
        s = DyePack2.eDyePackState.eTopRightRegion;
    else if (r < 0.75)
        s = DyePack2.eDyePackState.eBottomLeftRegion;
    else 
        s = DyePack2.eDyePackState.eBottomRightRegion;
    return s;
};
this.x=null;
this.y=null;
