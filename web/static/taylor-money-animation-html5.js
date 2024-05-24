(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Path = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#F04D5F").ss(1,0,0,4).p("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");
	this.shape.setTransform(82.2749,82.4253);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(-0.4,-0.4,165.4,165.70000000000002), null);


(lib.Tween85 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F04D5F").s().p("AgfAgQgNgNAAgTQAAgRANgOQAOgNARAAQATAAANANQANAOAAARQAAATgNANQgNANgTAAQgRAAgOgNg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.5,-4.5,9,9);


(lib.Tween82 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Management", "bold 34px 'Merriweather Bold'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 36;
	this.text.lineWidth = 240;
	this.text.parent = this;
	this.text.setTransform(0,-17);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-122,-19,244.1,38);


(lib.Tween81 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Management", "bold 34px 'Merriweather Bold'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 36;
	this.text.lineWidth = 240;
	this.text.parent = this;
	this.text.setTransform(0,-17);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-122,-19,244.1,38);


(lib.Tween80 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Management", "bold 34px 'Merriweather Bold'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 36;
	this.text.lineWidth = 240;
	this.text.parent = this;
	this.text.setTransform(0,-17);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-122,-19,244.1,38);


(lib.Tween79 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Management", "bold 34px 'Merriweather Bold'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 36;
	this.text.lineWidth = 240;
	this.text.parent = this;
	this.text.setTransform(0,-17);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-122,-19,244.1,38);


(lib.Tween75 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Investment", "bold 34px 'Merriweather Bold'", "#EF4E5F");
	this.text.textAlign = "center";
	this.text.lineHeight = 36;
	this.text.lineWidth = 299;
	this.text.parent = this;
	this.text.setTransform(0,-17);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-151.2,-19,302.5,38);


(lib.Tween73 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Planning", "bold 34px 'Merriweather Bold'", "#EF4E5F");
	this.text.textAlign = "center";
	this.text.lineHeight = 36;
	this.text.lineWidth = 231;
	this.text.parent = this;
	this.text.setTransform(-210,-17);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-327.6,-19,235.20000000000002,38);


(lib.Tween67 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Wealth", "bold 34px 'Merriweather Bold'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 36;
	this.text.lineWidth = 250;
	this.text.parent = this;
	this.text.setTransform(0,-17);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-127.1,-19,254.3,38);


(lib.Tween55 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(253,227,230,0.498)").s().p("EhPmA74MAAAh3vMCfOAAAMAAAB3vg");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-509.5,-383.2,1019.1,766.5);


(lib.Tween50 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.Tween33 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F04D5F").s().p("A5YMsQAAlKB/kuQB7kjDijgQDhjhEkh8QEth/FKAAQFLAAEtB/QEkB8DhDhQDiDgB7EjQB/EuAAFKg");
	this.shape.setTransform(0.125,-49.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-162.4,-131.2,325.1,162.5);


(lib.Tween23 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F04D5F").s().p("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");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-109.3,-18.8,218.6,37.6);


(lib.Tween5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.Symbol8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Wealth", "bold 34px 'Merriweather Bold'", "#F04D5F");
	this.text.textAlign = "center";
	this.text.lineHeight = 36;
	this.text.lineWidth = 250;
	this.text.parent = this;
	this.text.setTransform(127.15,2);

	this.text_1 = new cjs.Text("Management", "bold 34px 'Merriweather Bold'", "#F04D5F");
	this.text_1.textAlign = "center";
	this.text_1.lineHeight = 36;
	this.text_1.lineWidth = 240;
	this.text_1.parent = this;
	this.text_1.setTransform(128.55,48.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.text_1},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol8, new cjs.Rectangle(0,0,254.3,84.4), null);


(lib.Symbol1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F04D5F").s().p("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");
	this.shape.setTransform(109.3,18.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,218.6,37.6), null);


(lib.Tween51 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween50("synched",0);
	this.instance.setTransform(0.05,53.75);

	this.instance_1 = new lib.Tween33("synched",0);
	this.instance_1.setTransform(0.05,22.45,1.0009,1.0006);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-162.5,-108.8,325.4,162.6);


(lib.Tween28 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween5("synched",0);
	this.instance.setTransform(-27.05,-23.35);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F04D5F").s().p("AgZAYQgJgMgBgNQABgNAKgKQALgLANAAQAOAAALAKQAKALAAAOQAAAQgKAJQgKALgPAAQgOAAgLgMg");
	this.shape.setTransform(23.5,19.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(20,16.2,7.100000000000001,7.199999999999999);


(lib.Symbol3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween23("synched",0);
	this.instance.setTransform(109.3,18.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(0,0,218.6,37.6), null);


(lib.Symbol2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Symbol1();
	this.instance.setTransform(109.3,18.8,1,1,0,0,0,109.3,18.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(0,0,218.6,37.6), null);


(lib.Tween61 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween51("synched",0);
	this.instance.setTransform(235.05,203.35,1,1,180);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(72.2,149.6,325.40000000000003,162.6);


(lib.Tween64 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween61("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(72.2,149.6,325.40000000000003,162.6);


(lib.Tween63 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween61("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(72.2,149.6,325.40000000000003,162.6);


// stage content:
(lib.taylormoneyrevision1spinningspiro = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// spiro
	this.instance = new lib.Path();
	this.instance.setTransform(724.05,370.3,1,1,0,0,0,82.2,82.4);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(67).to({_off:false},0).wait(1).to({regX:82.3,scaleX:1.0001,scaleY:1.0001,rotation:-0.0105,x:724.1},0).wait(1).to({scaleX:1.0004,scaleY:1.0004,rotation:-0.0425,x:724.15},0).wait(1).to({scaleX:1.001,scaleY:1.001,rotation:-0.0969,alpha:0.0001},0).wait(1).to({scaleX:1.0018,scaleY:1.0018,rotation:-0.1748,alpha:0.0002},0).wait(1).to({scaleX:1.0028,scaleY:1.0028,rotation:-0.2771,alpha:0.0003},0).wait(1).to({scaleX:1.0041,scaleY:1.0041,rotation:-0.4049,alpha:0.0005},0).wait(1).to({scaleX:1.0056,scaleY:1.0056,rotation:-0.5595,x:724.1,alpha:0.0006},0).wait(1).to({scaleX:1.0074,scaleY:1.0074,rotation:-0.742,alpha:0.0008},0).wait(1).to({scaleX:1.0095,scaleY:1.0095,rotation:-0.9537,y:370.25,alpha:0.0011},0).wait(1).to({scaleX:1.012,scaleY:1.012,rotation:-1.1961,alpha:0.0013},0).wait(1).to({scaleX:1.0147,scaleY:1.0147,rotation:-1.4706,x:724.15,y:370.3,alpha:0.0017},0).wait(1).to({scaleX:1.0178,scaleY:1.0178,rotation:-1.7787,x:724.1,y:370.25,alpha:0.002},0).wait(1).to({scaleX:1.0212,scaleY:1.0212,rotation:-2.1221,x:724.15,y:370.3,alpha:0.0024},0).wait(1).to({scaleX:1.025,scaleY:1.025,rotation:-2.5025,alpha:0.0028},0).wait(1).to({scaleX:1.0292,scaleY:1.0292,rotation:-2.9216,x:724.1,alpha:0.0033},0).wait(1).to({scaleX:1.0338,scaleY:1.0338,rotation:-3.3813,x:724.15,alpha:0.0038},0).wait(1).to({scaleX:1.0388,scaleY:1.0388,rotation:-3.8835,y:370.25,alpha:0.0044},0).wait(1).to({scaleX:1.0442,scaleY:1.0442,rotation:-4.4301,y:370.3,alpha:0.005},0).wait(1).to({scaleX:1.0502,scaleY:1.0502,rotation:-5.023,alpha:0.0057},0).wait(1).to({scaleX:1.0566,scaleY:1.0566,rotation:-5.664,alpha:0.0064},0).wait(1).to({scaleX:1.0635,scaleY:1.0635,rotation:-6.3551,alpha:0.0072},0).wait(1).to({scaleX:1.0709,scaleY:1.0709,rotation:-7.0975,y:370.25,alpha:0.008},0).wait(1).to({scaleX:1.0788,scaleY:1.0788,rotation:-7.8928,y:370.3,alpha:0.0089},0).wait(1).to({scaleX:1.0873,scaleY:1.0873,rotation:-8.7416,alpha:0.0099},0).wait(1).to({scaleX:1.0963,scaleY:1.0963,rotation:-9.6442,alpha:0.0109},0).wait(1).to({scaleX:1.1059,scaleY:1.1059,rotation:-10.5999,y:370.25,alpha:0.012},0).wait(1).to({scaleX:1.116,scaleY:1.116,rotation:-11.6071,alpha:0.0131},0).wait(1).to({scaleX:1.1265,scaleY:1.1265,rotation:-12.6626,y:370.3,alpha:0.0143},0).wait(1).to({scaleX:1.1375,scaleY:1.1375,rotation:-13.7619,x:724.2,y:370.35,alpha:0.0155},0).wait(1).to({scaleX:1.1488,scaleY:1.1488,rotation:-14.8985,x:724.15,alpha:0.0168},0).wait(1).to({scaleX:1.1605,scaleY:1.1605,rotation:-16.0638,x:724.2,y:370.3,alpha:0.0181},0).wait(1).to({scaleX:1.1723,scaleY:1.1723,rotation:-17.2475,alpha:0.0195},0).wait(1).to({scaleX:1.1842,scaleY:1.1842,rotation:-18.4425,x:724.15,alpha:0.0208},0).wait(1).to({scaleX:1.1968,scaleY:1.1968,rotation:-19.6997,x:724.2,y:370.35,alpha:0.0222},0).wait(1).to({scaleX:1.2102,scaleY:1.2102,rotation:-21.0398,x:724.15,y:370.3,alpha:0.0237},0).wait(1).to({scaleX:1.2245,scaleY:1.2245,rotation:-22.4691,y:370.35,alpha:0.0254},0).wait(1).to({scaleX:1.2397,scaleY:1.2397,rotation:-23.9941,x:724.2,y:370.3,alpha:0.0271},0).wait(1).to({scaleX:1.2559,scaleY:1.2559,rotation:-25.6214,alpha:0.0289},0).wait(1).to({scaleX:1.2733,scaleY:1.2733,rotation:-27.3573,x:724.15,y:370.35,alpha:0.0309},0).wait(1).to({scaleX:1.2918,scaleY:1.2918,rotation:-29.2073,x:724.2,y:370.3,alpha:0.033},0).wait(1).to({scaleX:1.3114,scaleY:1.3114,rotation:-31.1754,y:370.35,alpha:0.0352},0).wait(1).to({scaleX:1.3323,scaleY:1.3323,rotation:-33.2632,alpha:0.0375},0).wait(1).to({scaleX:1.3543,scaleY:1.3543,rotation:-35.4686,y:370.4,alpha:0.04},0).wait(1).to({scaleX:1.3774,scaleY:1.3774,rotation:-37.7847,y:370.35,alpha:0.0426},0).wait(1).to({scaleX:1.4015,scaleY:1.4015,rotation:-40.1983,alpha:0.0454},0).wait(1).to({scaleX:1.4264,scaleY:1.4264,rotation:-42.6895,x:724.25,alpha:0.0482},0).wait(1).to({scaleX:1.4518,scaleY:1.4518,rotation:-45.2319,alpha:0.051},0).wait(1).to({scaleX:1.4774,scaleY:1.4774,rotation:-47.794,y:370.4,alpha:0.0539},0).wait(1).to({scaleX:1.5029,scaleY:1.5029,rotation:-50.3424,y:370.45,alpha:0.0568},0).wait(1).to({scaleX:1.5279,scaleY:1.5279,rotation:-52.8449,alpha:0.0596},0).wait(1).to({scaleX:1.5522,scaleY:1.5522,rotation:-55.2736,x:724.2,y:370.4,alpha:0.0624},0).wait(1).to({scaleX:1.5755,scaleY:1.5755,rotation:-57.6068,alpha:0.065},0).wait(1).to({scaleX:1.5977,scaleY:1.5977,rotation:-59.8298,x:724.25,alpha:0.0675},0).wait(1).to({scaleX:1.6187,scaleY:1.6187,rotation:-61.9342,alpha:0.0699},0).wait(1).to({scaleX:1.6385,scaleY:1.6385,rotation:-63.9169,alpha:0.0721},0).wait(1).to({scaleX:1.6571,scaleY:1.6571,rotation:-65.7791,x:724.2,y:370.45,alpha:0.0742},0).wait(1).to({scaleX:1.6745,scaleY:1.6745,rotation:-67.5244,x:724.25,alpha:0.0762},0).wait(1).to({scaleX:1.6909,scaleY:1.6909,rotation:-69.1582,x:724.2,y:370.4,alpha:0.078},0).wait(1).to({scaleX:1.7061,scaleY:1.7061,rotation:-70.6869,x:724.25,y:370.45,alpha:0.0798},0).wait(1).to({scaleX:1.7204,scaleY:1.7204,rotation:-72.1172,alpha:0.0814},0).wait(1).to({scaleX:1.7338,scaleY:1.7338,rotation:-73.4558,alpha:0.0829},0).wait(1).to({scaleX:1.7463,scaleY:1.7463,rotation:-74.7091,alpha:0.0843},0).wait(1).to({scaleX:1.758,scaleY:1.758,rotation:-75.8835,y:370.5,alpha:0.0856},0).wait(1).to({scaleX:1.7691,scaleY:1.7691,rotation:-76.9846,y:370.45,alpha:0.0869},0).wait(1).to({scaleX:1.7794,scaleY:1.7794,rotation:-78.0177,x:724.2,alpha:0.088},0).wait(1).to({scaleX:1.7891,scaleY:1.7891,rotation:-78.9878,alpha:0.0891},0).wait(1).to({scaleX:1.7982,scaleY:1.7982,rotation:-79.8997,alpha:0.0902},0).wait(1).to({scaleX:1.8072,scaleY:1.8072,rotation:-80.8017,x:724.25,y:370.5,alpha:0.0912},0).wait(1).to({scaleX:1.8163,scaleY:1.8163,rotation:-81.717,alpha:0.0922},0).wait(1).to({scaleX:1.8255,scaleY:1.8255,rotation:-82.6301,x:724.2,y:370.45,alpha:0.0932},0).wait(1).to({scaleX:1.8344,scaleY:1.8344,rotation:-83.5221,x:724.3,alpha:0.0943},0).wait(1).to({scaleX:1.8429,scaleY:1.8429,rotation:-84.3727,x:724.2,alpha:0.0952},0).wait(1).to({scaleX:1.8508,scaleY:1.8508,rotation:-85.1641,x:724.25,y:370.5,alpha:0.0961},0).wait(1).to({scaleX:1.858,scaleY:1.858,rotation:-85.8836,x:724.3,alpha:0.0969},0).wait(1).to({scaleX:1.8643,scaleY:1.8643,rotation:-86.5254,x:724.25,y:370.45,alpha:0.0976},0).wait(1).to({scaleX:1.87,scaleY:1.87,rotation:-87.0897,alpha:0.0983},0).wait(1).to({scaleX:1.8749,scaleY:1.8749,rotation:-87.5804,alpha:0.0988},0).wait(1).to({scaleX:1.8791,scaleY:1.8791,rotation:-88.004,y:370.5,alpha:0.0993},0).wait(1).to({scaleX:1.8828,scaleY:1.8828,rotation:-88.3676,x:724.2,y:370.45,alpha:0.0997},0).wait(1).to({scaleX:1.8859,scaleY:1.8859,rotation:-88.6783,x:724.25,y:370.5,alpha:0.1001},0).wait(1).to({scaleX:1.8885,scaleY:1.8885,rotation:-88.9426,y:370.45,alpha:0.1004},0).wait(1).to({scaleX:1.8907,scaleY:1.8907,rotation:-89.1663,alpha:0.1006},0).wait(1).to({scaleX:1.8926,scaleY:1.8926,rotation:-89.3545,y:370.5,alpha:0.1008},0).wait(1).to({scaleX:1.8942,scaleY:1.8942,rotation:-89.5116,alpha:0.101},0).wait(1).to({scaleX:1.8955,scaleY:1.8955,rotation:-89.6413,x:724.3,alpha:0.1012},0).wait(1).to({scaleX:1.8966,scaleY:1.8966,rotation:-89.7468,x:724.25,alpha:0.1013},0).wait(1).to({scaleX:1.8974,scaleY:1.8974,rotation:-89.8308,alpha:0.1014},0).wait(1).to({scaleX:1.898,scaleY:1.898,rotation:-89.8956},0).wait(1).to({scaleX:1.8985,scaleY:1.8985,rotation:-89.9433,alpha:0.1015},0).wait(1).to({scaleX:1.8988,scaleY:1.8988,rotation:-89.9757,x:724.2},0).wait(1).to({scaleX:1.899,scaleY:1.899,rotation:-89.9941,x:724.25,y:370.45,alpha:0.1016},0).wait(1).to({regY:82.5,rotation:-90,x:724.35,y:370.6},0).wait(21));

	// Wealthfirst
	this.instance_1 = new lib.Tween67("synched",0);
	this.instance_1.setTransform(724.6,344.15);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(60).to({_off:false},0).wait(1).to({alpha:0.0242},0).wait(1).to({alpha:0.1209},0).wait(1).to({alpha:0.3126},0).wait(1).to({alpha:0.6543},0).wait(1).to({alpha:0.8746},0).wait(1).to({alpha:0.9813},0).wait(1).to({alpha:1},0).wait(34).to({startPosition:0},0).wait(1).to({x:718.5011},0).wait(1).to({x:694.8924},0).wait(1).to({x:647.971},0).wait(1).to({x:563.9213},0).wait(1).to({x:467.3199},0).wait(1).to({x:417.0264},0).wait(1).to({x:390.3071},0).wait(1).to({x:385.85},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({alpha:0.982},0).wait(1).to({alpha:0.9123},0).wait(1).to({alpha:0.7738},0).wait(1).to({alpha:0.5257},0).wait(1).to({alpha:0.2405},0).wait(1).to({alpha:0.092},0).wait(1).to({alpha:0.0132},0).wait(1).to({alpha:0},0).wait(33));

	// WM_Last
	this.instance_2 = new lib.Symbol8();
	this.instance_2.setTransform(724.65,367.25,1,1,0,0,0,127.2,42.1);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(139).to({_off:false},0).wait(1).to({regY:42.2,y:367.35,alpha:0.0174},0).wait(1).to({alpha:0.085},0).wait(1).to({alpha:0.2191},0).wait(1).to({alpha:0.4595},0).wait(1).to({alpha:0.7358},0).wait(1).to({alpha:0.8796},0).wait(1).to({alpha:0.956},0).wait(1).to({regY:42.1,y:367.25,alpha:0.9688},0).wait(33));

	// Mangefrist
	this.instance_3 = new lib.Tween79("synched",0);
	this.instance_3.setTransform(726,390.5);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.instance_4 = new lib.Tween80("synched",0);
	this.instance_4.setTransform(726,390.5);

	this.instance_5 = new lib.Tween81("synched",0);
	this.instance_5.setTransform(726,390.5);
	this.instance_5._off = true;

	this.instance_6 = new lib.Tween82("synched",0);
	this.instance_6.setTransform(1063.1,384.7);
	this.instance_6._off = true;
	var instance_6Filter_1 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_6.filters = [instance_6Filter_1];
	this.instance_6.cache(-124,-21,248,42);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_3}]},60).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},34).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},30).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).wait(33));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(60).to({_off:false},0).wait(1).to({alpha:0.0242},0).wait(1).to({alpha:0.1209},0).wait(1).to({alpha:0.3126},0).wait(1).to({alpha:0.6543},0).wait(1).to({alpha:0.8746},0).wait(1).to({alpha:0.9813},0).to({_off:true},1).wait(113));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(101).to({_off:false},0).wait(1).to({x:732.0692,y:390.3956},0).wait(1).to({x:755.5629,y:389.9914},0).wait(1).to({x:802.2557,y:389.188},0).wait(1).to({x:885.8961,y:387.7489},0).wait(1).to({x:982.027,y:386.0949},0).wait(1).to({x:1032.0755,y:385.2338},0).wait(1).to({x:1058.6646,y:384.7763},0).to({_off:true},1).wait(71));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(109).to({_off:false},0).wait(30).to({startPosition:0},0).wait(1).to({alpha:0.982},0).wait(1).to({alpha:0.9123},0).wait(1).to({alpha:0.7738},0).wait(1).to({alpha:0.5257},0).wait(1).to({alpha:0.2405},0).wait(1).to({alpha:0.092},0).wait(1).to({alpha:0.0132},0).wait(1).to({alpha:0},0).wait(33));
	this.timeline.addTween(cjs.Tween.get(instance_6Filter_1).wait(109).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(30).to(new cjs.ColorFilter(1,1,1,1,255,255,255,1), 0).wait(1).to(new cjs.ColorFilter(1,1,1,1,250.40892137,250.40892137,250.40892137,0.98199577), 0).wait(1).to(new cjs.ColorFilter(1,1,1,1,232.63708456,232.63708456,232.63708456,0.91230229), 0).wait(1).to(new cjs.ColorFilter(1,1,1,1,197.31620617,197.31620617,197.31620617,0.77378904), 0).wait(1).to(new cjs.ColorFilter(1,1,1,1,134.04629543,134.04629543,134.04629543,0.52567175), 0).wait(1).to(new cjs.ColorFilter(1,1,1,1,61.32787062,61.32787062,61.32787062,0.24050145), 0).wait(1).to(new cjs.ColorFilter(1,1,1,1,23.46857087,23.46857087,23.46857087,0.09203361), 0).wait(1).to(new cjs.ColorFilter(1,1,1,1,3.35513011,3.35513011,3.35513011,0.01315737), 0).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(33));

	// dot
	this.instance_7 = new lib.Tween28("synched",0);
	this.instance_7.setTransform(889.55,352.45,1.0166,1.0161);
	this.instance_7._off = true;

	this.instance_8 = new lib.Tween85("synched",0);
	this.instance_8.setTransform(723.1,373.65);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(8).to({_off:false},0).to({startPosition:0},15,cjs.Ease.quartOut).wait(5).to({startPosition:0},0).wait(1).to({regX:23.5,regY:19.8,x:912.65,y:372.55},0).wait(1).to({x:910},0).wait(1).to({x:904.9},0).wait(1).to({x:896.65},0).wait(1).to({x:884.75},0).wait(1).to({x:870.1},0).wait(1).to({x:850.25},0).wait(1).to({x:822.55},0).wait(1).to({x:792.05},0).wait(1).to({x:767.95},0).wait(1).to({x:751.3},0).wait(1).to({x:739.5},0).wait(1).to({x:729.6},0).wait(1).to({x:724.4},0).wait(1).to({x:722.35},0).wait(1).to({regX:0,regY:0,x:698,y:352.45},0).wait(1).to({startPosition:0},0).to({_off:true},4).wait(131));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(49).to({_off:false},0).to({scaleX:36.15,scaleY:36.15,x:723.05,y:373.6},7,cjs.Ease.bounceInOut).wait(43).to({startPosition:0},0).wait(1).to({alpha:0.9758},0).wait(1).to({alpha:0.8791},0).wait(1).to({alpha:0.6874},0).wait(1).to({alpha:0.3457},0).wait(1).to({alpha:0.1254},0).wait(1).to({alpha:0.0187},0).wait(1).to({alpha:0},0).to({_off:true},22).wait(52));

	// planning
	this.instance_9 = new lib.Tween73("synched",0);
	this.instance_9.setTransform(624.2,388.55);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(102).to({_off:false},0).wait(1).to({regX:-210,x:413.45,alpha:0.0242},0).wait(1).to({x:410.6,alpha:0.1209},0).wait(1).to({x:404.85,alpha:0.3126},0).wait(1).to({x:394.7,alpha:0.6543},0).wait(1).to({x:388.15,alpha:0.8746},0).wait(1).to({x:385,alpha:0.9813},0).wait(1).to({regX:0,x:594.45,alpha:1},0).wait(1).to({regX:-210,x:384.45},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({regX:0,x:594.45},0).wait(1).to({regX:-210,x:384.45,alpha:0.982},0).wait(1).to({alpha:0.9123},0).wait(1).to({alpha:0.7738},0).wait(1).to({alpha:0.5257},0).wait(1).to({alpha:0.2405},0).wait(1).to({alpha:0.092},0).wait(1).to({alpha:0.0132},0).wait(1).to({regX:0,x:594.45,alpha:0},0).wait(33));

	// semitop
	this.instance_10 = new lib.Tween51("synched",0);
	this.instance_10.setTransform(723.85,311.4);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(100).to({_off:false},0).wait(1).to({regX:0.2,regY:-27.5,x:719.3,y:283.85,alpha:0.0139},0).wait(1).to({x:701.55,y:283.8,alpha:0.0663},0).wait(1).to({x:664.9,y:283.7,alpha:0.1741},0).wait(1).to({x:607.3,y:283.55,alpha:0.3439},0).wait(1).to({x:514.6,y:283.25,alpha:0.6171},0).wait(1).to({x:445.4,y:283.05,alpha:0.8209},0).wait(1).to({x:407.25,y:282.95,alpha:0.9333},0).wait(1).to({x:387.95,y:282.9,alpha:0.9902},0).wait(1).to({regX:0,regY:0,x:384.45,y:310.4,alpha:1},0).wait(30).to({startPosition:0},0).wait(1).to({regX:0.2,regY:-27.5,x:384.65,y:282.9,alpha:0.982},0).wait(1).to({alpha:0.9123},0).wait(1).to({alpha:0.7738},0).wait(1).to({alpha:0.5257},0).wait(1).to({alpha:0.2405},0).wait(1).to({alpha:0.092},0).wait(1).to({alpha:0.0132},0).wait(1).to({regX:0,regY:0,x:384.45,y:310.4,alpha:0},0).to({_off:true},1).wait(32));

	// Investment
	this.instance_11 = new lib.Tween75("synched",0);
	this.instance_11.setTransform(999.65,346.35);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(100).to({_off:false},0).wait(1).to({x:1000.3481,alpha:0.0111},0).wait(1).to({x:1002.9053,alpha:0.0518},0).wait(1).to({x:1008.194,alpha:0.1359},0).wait(1).to({x:1016.1873,alpha:0.2631},0).wait(1).to({x:1029.4615,alpha:0.4743},0).wait(1).to({x:1044.5521,alpha:0.7144},0).wait(1).to({x:1053.705,alpha:0.8601},0).wait(1).to({x:1059.4308,alpha:0.9512},0).wait(1).to({x:1062.0248,alpha:0.9924},0).wait(1).to({x:1062.5,alpha:1},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({alpha:0.982},0).wait(1).to({alpha:0.9123},0).wait(1).to({alpha:0.7738},0).wait(1).to({alpha:0.5257},0).wait(1).to({alpha:0.2405},0).wait(1).to({alpha:0.092},0).wait(1).to({alpha:0.0132},0).wait(1).to({alpha:0},0).wait(33));

	// semiBot
	this.instance_12 = new lib.Tween63("synched",0);
	this.instance_12.setTransform(489.8,215.55);
	this.instance_12._off = true;

	this.instance_13 = new lib.Tween64("synched",0);
	this.instance_13.setTransform(828.45,215.55);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(100).to({_off:false},0).wait(1).to({regX:234.9,regY:230.9,x:729.4,y:446.45},0).wait(1).to({x:747.1},0).wait(1).to({x:783.65},0).wait(1).to({x:841.15},0).wait(1).to({x:933.65},0).wait(1).to({x:1002.7},0).wait(1).to({x:1040.75},0).wait(1).to({x:1060},0).to({_off:true},1).wait(71));
	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(109).to({_off:false},0).wait(30).to({startPosition:0},0).wait(1).to({regX:234.9,regY:230.9,x:1063.35,y:446.45,alpha:0.982},0).wait(1).to({alpha:0.9123},0).wait(1).to({alpha:0.7738},0).wait(1).to({alpha:0.5257},0).wait(1).to({alpha:0.2405},0).wait(1).to({alpha:0.092},0).wait(1).to({alpha:0.0132},0).wait(1).to({regX:0,regY:0,x:828.45,y:215.55,alpha:0},0).to({_off:true},1).wait(32));

	// mask_idn (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("AVIetIAAogMAy9AAAIAAIgg");
	var mask_graphics_25 = new cjs.Graphics().p("AVIetIAAogMAy9AAAIAAIgg");
	var mask_graphics_26 = new cjs.Graphics().p("AVIetIAAogMAy9AAAIAAIgg");
	var mask_graphics_27 = new cjs.Graphics().p("AVGetIAAogMAy8AAAIAAIgg");
	var mask_graphics_28 = new cjs.Graphics().p("AU8etIAAogMAy9AAAIAAIgg");
	var mask_graphics_29 = new cjs.Graphics().p("AUietIAAogMAy9AAAIAAIgg");
	var mask_graphics_30 = new cjs.Graphics().p("ATqetIAAogMAy9AAAIAAIgg");
	var mask_graphics_31 = new cjs.Graphics().p("ASGetIAAogMAy9AAAIAAIgg");
	var mask_graphics_32 = new cjs.Graphics().p("APgetIAAogMAy9AAAIAAIgg");
	var mask_graphics_33 = new cjs.Graphics().p("ALietIAAogMAy9AAAIAAIgg");
	var mask_graphics_34 = new cjs.Graphics().p("AGRetIAAogMAy9AAAIAAIgg");
	var mask_graphics_35 = new cjs.Graphics().p("ACTetIAAogMAy9AAAIAAIgg");
	var mask_graphics_36 = new cjs.Graphics().p("AgRetIAAogMAy7AAAIAAIgg");
	var mask_graphics_37 = new cjs.Graphics().p("Ah2etIAAogMAy8AAAIAAIgg");
	var mask_graphics_38 = new cjs.Graphics().p("AitetIAAogMAy8AAAIAAIgg");
	var mask_graphics_39 = new cjs.Graphics().p("AjIetIAAogMAy8AAAIAAIgg");
	var mask_graphics_40 = new cjs.Graphics().p("AjRetIAAogMAy8AAAIAAIgg");
	var mask_graphics_41 = new cjs.Graphics().p("AjUetIAAogMAy8AAAIAAIgg");
	var mask_graphics_42 = new cjs.Graphics().p("AjUetIAAogMAy8AAAIAAIgg");
	var mask_graphics_43 = new cjs.Graphics().p("AjTetIAAogMAy7AAAIAAIgg");
	var mask_graphics_44 = new cjs.Graphics().p("AjRetIAAogMAy5AAAIAAIgg");
	var mask_graphics_45 = new cjs.Graphics().p("AjOetIAAogMAy2AAAIAAIgg");
	var mask_graphics_46 = new cjs.Graphics().p("AjIetIAAogMAywAAAIAAIgg");
	var mask_graphics_47 = new cjs.Graphics().p("AjBetIAAogMAypAAAIAAIgg");
	var mask_graphics_48 = new cjs.Graphics().p("Ai4etIAAogMAygAAAIAAIgg");
	var mask_graphics_49 = new cjs.Graphics().p("AitetIAAofMAyWAAAIAAIfg");
	var mask_graphics_50 = new cjs.Graphics().p("AifetIAAofMAyIAAAIAAIfg");
	var mask_graphics_51 = new cjs.Graphics().p("AiPetIAAofMAx4AAAIAAIfg");
	var mask_graphics_52 = new cjs.Graphics().p("Ah7etIAAoeMAxkAAAIAAIeg");
	var mask_graphics_53 = new cjs.Graphics().p("AhketIAAoeMAxNAAAIAAIeg");
	var mask_graphics_54 = new cjs.Graphics().p("AhKesIAAocMAw0AAAIAAIcg");
	var mask_graphics_55 = new cjs.Graphics().p("AgtesIAAocMAwXAAAIAAIcg");
	var mask_graphics_56 = new cjs.Graphics().p("AgPesIAAobMAv5AAAIAAIbg");
	var mask_graphics_57 = new cjs.Graphics().p("AAQesIAAoaMAvbAAAIAAIag");
	var mask_graphics_58 = new cjs.Graphics().p("AA2erIAAoYMAu1AAAIAAIYg");
	var mask_graphics_59 = new cjs.Graphics().p("ABherIAAoXMAuLAAAIAAIXg");
	var mask_graphics_60 = new cjs.Graphics().p("ACTerIAAoWMAtZAAAIAAIWg");
	var mask_graphics_61 = new cjs.Graphics().p("ADNeqIAAoUMAsgAAAIAAIUg");
	var mask_graphics_62 = new cjs.Graphics().p("AEMeqIAAoTMAriAAAIAAITg");
	var mask_graphics_63 = new cjs.Graphics().p("AFOepIAAoQMAqgAAAIAAIQg");
	var mask_graphics_64 = new cjs.Graphics().p("AGOepIAAoPMAphAAAIAAIPg");
	var mask_graphics_65 = new cjs.Graphics().p("AHKeoIAAoNMAomAAAIAAINg");
	var mask_graphics_66 = new cjs.Graphics().p("AH/eoIAAoLMAnxAAAIAAILg");
	var mask_graphics_67 = new cjs.Graphics().p("AIseoIAAoLMAnFAAAIAAILg");
	var mask_graphics_68 = new cjs.Graphics().p("AJUenIAAoJMAmdAAAIAAIJg");
	var mask_graphics_69 = new cjs.Graphics().p("AJ1enIAAoIMAl9AAAIAAIIg");
	var mask_graphics_70 = new cjs.Graphics().p("AKSenIAAoHMAlgAAAIAAIHg");
	var mask_graphics_71 = new cjs.Graphics().p("AKrenIAAoHMAlHAAAIAAIHg");
	var mask_graphics_72 = new cjs.Graphics().p("ALDemIAAoFMAkvAAAIAAIFg");
	var mask_graphics_73 = new cjs.Graphics().p("ALaemIAAoFMAkZAAAIAAIFg");
	var mask_graphics_74 = new cjs.Graphics().p("ALvemIAAoEMAkEAAAIAAIEg");
	var mask_graphics_75 = new cjs.Graphics().p("AL/emIAAoEMAj0AAAIAAIEg");
	var mask_graphics_76 = new cjs.Graphics().p("AMKemIAAoEMAjpAAAIAAIEg");
	var mask_graphics_77 = new cjs.Graphics().p("AMTemIAAoEMAjgAAAIAAIEg");
	var mask_graphics_78 = new cjs.Graphics().p("AMYemIAAoDMAjbAAAIAAIDg");
	var mask_graphics_79 = new cjs.Graphics().p("AMcemIAAoDMAjXAAAIAAIDg");
	var mask_graphics_80 = new cjs.Graphics().p("AMeemIAAoDMAjVAAAIAAIDg");
	var mask_graphics_81 = new cjs.Graphics().p("AMgemIAAoDMAjTAAAIAAIDg");
	var mask_graphics_82 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_83 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_84 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_85 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_86 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_87 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_88 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_89 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_90 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_91 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_92 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_93 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_94 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_95 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_96 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_97 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_98 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_99 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_100 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_101 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_102 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_103 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_104 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_105 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_106 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_107 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_108 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_109 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_110 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_111 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_112 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_113 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_114 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_115 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_116 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_117 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_118 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_119 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_120 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_121 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_122 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_123 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_124 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_125 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_126 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_127 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_128 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_129 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_130 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_131 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_132 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_133 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_134 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_135 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_136 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_137 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_138 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_139 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_140 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_141 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_142 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_143 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");
	var mask_graphics_144 = new cjs.Graphics().p("AMgemIAAoDMAjUAAAIAAIDg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:461.2886,y:196.5373}).wait(25).to({graphics:mask_graphics_25,x:461.2886,y:196.5373}).wait(1).to({graphics:mask_graphics_26,x:461.2736,y:196.5373}).wait(1).to({graphics:mask_graphics_27,x:461.0488,y:196.5373}).wait(1).to({graphics:mask_graphics_28,x:460.0746,y:196.5373}).wait(1).to({graphics:mask_graphics_29,x:457.4517,y:196.5373}).wait(1).to({graphics:mask_graphics_30,x:451.9212,y:196.5373}).wait(1).to({graphics:mask_graphics_31,x:441.8643,y:196.5373}).wait(1).to({graphics:mask_graphics_32,x:425.3028,y:196.5373}).wait(1).to({graphics:mask_graphics_33,x:399.8984,y:196.5373}).wait(1).to({graphics:mask_graphics_34,x:366.2038,y:196.5373}).wait(1).to({graphics:mask_graphics_35,x:340.7994,y:196.5373}).wait(1).to({graphics:mask_graphics_36,x:324.2378,y:196.5373}).wait(1).to({graphics:mask_graphics_37,x:314.181,y:196.5373}).wait(1).to({graphics:mask_graphics_38,x:308.6505,y:196.5373}).wait(1).to({graphics:mask_graphics_39,x:306.0276,y:196.5373}).wait(1).to({graphics:mask_graphics_40,x:305.0534,y:196.5373}).wait(1).to({graphics:mask_graphics_41,x:304.8286,y:196.5373}).wait(1).to({graphics:mask_graphics_42,x:304.8136,y:196.5373}).wait(1).to({graphics:mask_graphics_43,x:304.8143,y:196.5368}).wait(1).to({graphics:mask_graphics_44,x:304.8165,y:196.5353}).wait(1).to({graphics:mask_graphics_45,x:304.8205,y:196.5327}).wait(1).to({graphics:mask_graphics_46,x:304.8262,y:196.5288}).wait(1).to({graphics:mask_graphics_47,x:304.8341,y:196.5236}).wait(1).to({graphics:mask_graphics_48,x:304.8442,y:196.5168}).wait(1).to({graphics:mask_graphics_49,x:304.8569,y:196.5083}).wait(1).to({graphics:mask_graphics_50,x:304.8725,y:196.4978}).wait(1).to({graphics:mask_graphics_51,x:304.8912,y:196.4853}).wait(1).to({graphics:mask_graphics_52,x:304.9133,y:196.4705}).wait(1).to({graphics:mask_graphics_53,x:304.9389,y:196.4532}).wait(1).to({graphics:mask_graphics_54,x:304.9681,y:196.4337}).wait(1).to({graphics:mask_graphics_55,x:305.0003,y:196.4121}).wait(1).to({graphics:mask_graphics_56,x:305.0344,y:196.3892}).wait(1).to({graphics:mask_graphics_57,x:305.0707,y:196.3649}).wait(1).to({graphics:mask_graphics_58,x:305.1126,y:196.3367}).wait(1).to({graphics:mask_graphics_59,x:305.1613,y:196.3041}).wait(1).to({graphics:mask_graphics_60,x:305.2176,y:196.2663}).wait(1).to({graphics:mask_graphics_61,x:305.2818,y:196.2232}).wait(1).to({graphics:mask_graphics_62,x:305.3526,y:196.1757}).wait(1).to({graphics:mask_graphics_63,x:305.4268,y:196.126}).wait(1).to({graphics:mask_graphics_64,x:305.4994,y:196.0773}).wait(1).to({graphics:mask_graphics_65,x:305.5663,y:196.0324}).wait(1).to({graphics:mask_graphics_66,x:305.6255,y:195.9927}).wait(1).to({graphics:mask_graphics_67,x:305.6767,y:195.9583}).wait(1).to({graphics:mask_graphics_68,x:305.7207,y:195.9288}).wait(1).to({graphics:mask_graphics_69,x:305.7585,y:195.9035}).wait(1).to({graphics:mask_graphics_70,x:305.791,y:195.8817}).wait(1).to({graphics:mask_graphics_71,x:305.8191,y:195.8628}).wait(1).to({graphics:mask_graphics_72,x:305.8454,y:195.8452}).wait(1).to({graphics:mask_graphics_73,x:305.8715,y:195.8277}).wait(1).to({graphics:mask_graphics_74,x:305.8945,y:195.8122}).wait(1).to({graphics:mask_graphics_75,x:305.9126,y:195.8001}).wait(1).to({graphics:mask_graphics_76,x:305.9258,y:195.7913}).wait(1).to({graphics:mask_graphics_77,x:305.935,y:195.785}).wait(1).to({graphics:mask_graphics_78,x:305.9414,y:195.7808}).wait(1).to({graphics:mask_graphics_79,x:305.9456,y:195.7779}).wait(1).to({graphics:mask_graphics_80,x:305.9482,y:195.7762}).wait(1).to({graphics:mask_graphics_81,x:305.9496,y:195.7753}).wait(1).to({graphics:mask_graphics_82,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_83,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_84,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_85,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_86,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_87,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_88,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_89,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_90,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_91,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_92,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_93,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_94,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_95,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_96,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_97,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_98,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_99,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_100,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_101,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_102,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_103,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_104,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_105,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_106,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_107,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_108,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_109,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_110,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_111,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_112,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_113,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_114,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_115,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_116,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_117,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_118,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_119,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_120,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_121,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_122,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_123,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_124,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_125,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_126,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_127,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_128,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_129,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_130,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_131,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_132,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_133,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_134,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_135,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_136,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_137,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_138,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_139,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_140,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_141,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_142,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_143,x:305.975,y:195.85}).wait(1).to({graphics:mask_graphics_144,x:305.975,y:195.85}).wait(36));

	// logo
	this.instance_14 = new lib.Symbol2();
	this.instance_14.setTransform(761.95,366,1.3724,1.3723,0,0,0,109.3,18.8);
	this.instance_14.alpha = 0.1211;

	this.instance_15 = new lib.Symbol3();
	this.instance_15.setTransform(761.95,366,1.3724,1.3723,0,0,0,109.3,18.8);
	this.instance_15._off = true;

	var maskedShapeInstanceList = [this.instance_14,this.instance_15];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_14).to({_off:true,alpha:1},13,cjs.Ease.quartIn).wait(167));
	this.timeline.addTween(cjs.Tween.get(this.instance_15).to({_off:false},13,cjs.Ease.quartIn).to({scaleX:1,scaleY:1,x:721.25,y:359},69,cjs.Ease.quartIn).wait(62).to({_off:true},1).wait(35));

	// background
	this.instance_16 = new lib.Tween55("synched",0);
	this.instance_16.setTransform(720.4,351.85);
	this.instance_16.alpha = 0;
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(73).to({_off:false},0).to({startPosition:0},9,cjs.Ease.quartInOut).to({startPosition:0},62,cjs.Ease.quartInOut).to({_off:true},1).wait(35));

	this.filterCacheList = [];
	this.filterCacheList.push({instance: this.instance_6, startFrame:109, endFrame:109, x:-124, y:-21, w:248, h:42});
	this.filterCacheList.push({instance: this.instance_6, startFrame:139, endFrame:139, x:-124, y:-21, w:248, h:42});
	this.filterCacheList.push({instance: this.instance_6, startFrame:140, endFrame:140, x:-124, y:-21, w:248, h:42});
	this.filterCacheList.push({instance: this.instance_6, startFrame:141, endFrame:141, x:-124, y:-21, w:248, h:42});
	this.filterCacheList.push({instance: this.instance_6, startFrame:142, endFrame:142, x:-124, y:-21, w:248, h:42});
	this.filterCacheList.push({instance: this.instance_6, startFrame:143, endFrame:143, x:-124, y:-21, w:248, h:42});
	this.filterCacheList.push({instance: this.instance_6, startFrame:144, endFrame:144, x:-124, y:-21, w:248, h:42});
	this.filterCacheList.push({instance: this.instance_6, startFrame:145, endFrame:145, x:-124, y:-21, w:248, h:42});
	this.filterCacheList.push({instance: this.instance_6, startFrame:146, endFrame:146, x:-124, y:-21, w:248, h:42});
	this.filterCacheList.push({instance: this.instance_6, startFrame:147, endFrame:147, x:-124, y:-21, w:248, h:42});
	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(930.9,321.2,299.1,413.90000000000003);
// library properties:
lib.properties = {
	id: '12ABE26C81814E43AEB504FB91596CBA',
	width: 1440,
	height: 705,
	fps: 22,
	color: "#FFFFFF",
	opacity: 0.00,
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['12ABE26C81814E43AEB504FB91596CBA'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;