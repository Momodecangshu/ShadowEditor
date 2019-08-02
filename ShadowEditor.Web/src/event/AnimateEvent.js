import BaseEvent from './BaseEvent';

/**
 * 动画事件
 * @author tengge / https://github.com/tengge1
 * @param {*} app 
 */
function AnimateEvent(app) {
    BaseEvent.call(this, app);
    this.running = false;
    this.clock = new THREE.Clock();
}

AnimateEvent.prototype = Object.create(BaseEvent.prototype);
AnimateEvent.prototype.constructor = AnimateEvent;

AnimateEvent.prototype.start = function () {
    app.on(`appStarted.${this.id}`, this.onAppStarted.bind(this));
};

AnimateEvent.prototype.onAppStarted = function () {
    this.running = true;
    requestAnimationFrame(this.onAnimate.bind(this));
};

AnimateEvent.prototype.onAnimate = function () {
    var deltaTime = this.clock.getDelta();

    app.call('animate', this, this.clock, deltaTime);
    app.call('render', this);

    if (this.running) {
        requestAnimationFrame(this.onAnimate.bind(this));
    }
};

export default AnimateEvent;