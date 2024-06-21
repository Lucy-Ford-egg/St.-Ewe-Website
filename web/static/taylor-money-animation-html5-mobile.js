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
		this.text = new cjs.Text("Management", "bold 24px 'Merriweather'", "#FFFFFF");
		this.text.textAlign = "center";
		this.text.lineHeight = 26;
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
		this.text = new cjs.Text("Management", "bold 24px 'Merriweather'", "#FFFFFF");
		this.text.textAlign = "center";
		this.text.lineHeight = 26;
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
		this.text = new cjs.Text("Management", "bold 24px 'Merriweather'", "#FFFFFF");
		this.text.textAlign = "center";
		this.text.lineHeight = 26;
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
		this.text = new cjs.Text("Management", "bold 24px 'Merriweather'", "#FFFFFF");
		this.text.textAlign = "center";
		this.text.lineHeight = 26;
		this.text.lineWidth = 240;
		this.text.parent = this;
		this.text.setTransform(0,-17);
	
		this.timeline.addTween(cjs.Tween.get(this.text).wait(1));
	
		this._renderFirstFrame();
	
	}).prototype = p = new cjs.MovieClip();
	p.nominalBounds = new cjs.Rectangle(-122,-19,244.1,28);
	
	
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
		this.text = new cjs.Text("Investment", "bold 24px 'Merriweather'", "#EF4E5F");
		this.text.textAlign = "center";
		this.text.lineHeight = 26;
		this.text.lineWidth = 299;
		this.text.parent = this;
		this.text.setTransform(0,-7.4);
	
		this.timeline.addTween(cjs.Tween.get(this.text).wait(1));
	
		this._renderFirstFrame();
	
	}).prototype = p = new cjs.MovieClip();
	p.nominalBounds = new cjs.Rectangle(-151.2,-9.4,302.5,38);
	
	
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
		this.text = new cjs.Text("Planning", "bold 24px 'Merriweather'", "#EF4E5F");
		this.text.textAlign = "center";
		this.text.lineHeight = 26;
		this.text.lineWidth = 231;
		this.text.parent = this;
		this.text.setTransform(30,-8.6);
	
		this.timeline.addTween(cjs.Tween.get(this.text).wait(1));
	
		this._renderFirstFrame();
	
	}).prototype = p = new cjs.MovieClip();
	p.nominalBounds = new cjs.Rectangle(-87.6,-10.6,235.2,38);
	
	
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
		this.text = new cjs.Text("Wealth", "bold 25px 'Merriweather'", "#FFFFFF");
		this.text.textAlign = "center";
		this.text.lineHeight = 27;
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
		this.text = new cjs.Text("Wealth", "bold 34px 'Merriweather'", "#F04D5F");
		this.text.textAlign = "center";
		this.text.lineHeight = 36;
		this.text.lineWidth = 250;
		this.text.parent = this;
		this.text.setTransform(127.15,2);
	
		this.text_1 = new cjs.Text("Management", "bold 34px 'Merriweather'", "#F04D5F");
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
		this.shape.graphics.f("#F04D5F").s().p("AOcC0QgJgHAAgMQAAgOAJgKQAIgKAOAAQAGAAAIADQAJADADAAQAFAAAGgMQAGgLABgHIhEinQgDgGgFgBQgFgCgDgEIAAgCQAAgDAFgDIBcAAIADABIAFAFQgBAFgMADQgFACAAADQAAAFAOAjIASAsIASgsQAOgkAAgFQAAgCgIgCQgIgCAAgGQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBABAAQABAAAAgBQABAAAAgBQABAAAAAAQABAAABAAIAlAAIADABQAFABAAADQAAAFgDABIgKAFIgUArIhMC7QgQAbgXAAQgMAAgJgIgArDC0QgJgHAAgMQAAgOAJgKQAIgKAOAAQAFAAAJADQAJADADAAQAFAAAGgMIAHgSIhFinQgCgGgGgBQgGgCgBgEIAAgCQAAgDAEgDIBcAAIAFABIADAFQAAAFgLADQgGACAAADQAAAFAOAjIASAsIASgsQAOgkAAgFQAAgCgIgCQgJgCABgGQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABgBQABAAAAgBQABAAAAAAQABAAAAAAIAlAAIAEABQAFABAAADQAAAEgDACIgFACIgFADQgCABgSAqIg6CNQgPAogEAGQgPAbgWAAQgNAAgJgIgAL0BBQgXgXABgkQAAgsAagZQAZgaAsAAQAaAAATANQAXAOAAAaIAAAMIgDACIhhAAQAFAgALAOQAPAVAdAAQAHAAAJgEIASgHQAFAAABAHQAAACgFAFIgGAIQgdAggqAAQgmAAgVgXgAMng+QgGAIgDATIAeABQALAAAFgEQAFgFAAgKQAAgLgFgFQgFgHgKABQgOAAgIANgAFLBBQgcgXAAgpQABgsAegYQAcgWAvAAQAoAAAaAYQAaAXAAApQAAAqgfAYQgdAWgsAAQgpAAgZgWgAF4gwQgFATAAAXQAAAaAFAUQAHAfATAAQAUAAAHgaQADgOAAgcQAAgbgEgTQgJgggRAAQgSAAgIAbgAmPBBQgcgYAAgoQAAgsAfgYQAdgWAtAAQApAAAbAYQAaAXAAApQgBAqgfAYQgdAWgsAAQgpAAgZgWgAligwQgFARAAAZQAAAZAFAVQAHAfATAAQATAAAIgaQADgQAAgaQAAgXgEgXQgJgggRAAQgTAAgHAbgAsLBQQgJgGgJgPQgPANgKAGQgOAIgPAAQgWAAgKgLQgIgKAAgYQAAgFADgJQADgIAFgCQALgFAZgHIAlgKQAGgCADgEQACgCAAgHIAAgIQAAgRgEgIQgFgLgPAAQgJAAgDAEQgDAEAAAIIAAAGQABAHgTAJQgRAKgIgBQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAgBIgBgIQABgFABgEQABgFADgDQALgOAcgPQAcgOATAAIAGAAQAJAAAJADQAKAEAGAGQASANAAAXIAABHQgBANAEAIQAEAGAGAAIAJgBQAEAAABAEQAAAKgVAHQgQAGgLAAQgPAAgKgGgAsxAMQgPAIAAAUQAAAHADAEQADAFAHAAQAJAAAGgGQAHgHAAgIIAAgfgAJ0BTIgCgCIgBgDQAAgFAIgCQAHgCADgFIAAhWQgBgVgGgIQgHgIgLAAQgKAAgIAGQgHAIAAAKIAABiQABADAEACIAJADQAEACAAAEIgCAFIgFABIhYAAIgFgCIAAgDQAAgFAJgDQAJgDAAgFIAAhhQAAgOgJgDQgIgDgBgFIAAgDIASgGIA8gTIACAAIACADIAAAXQAPgKASgIQASgGATAAQAZAAAKAQQAJANAAAbIAABbQAAAHAJACQAIADAAAFQgCAFgEAAgAC4BTIgIgCIgBgBIAAgEQABgFAKgCQALgCABgBQABgCACgFIAAgHIgChVIgBhXIhBCtQgKAbgHADIgCAAQgEAAgDgFIgDgIIg5iXQgJgbgHgNIgEC0QAAAHAOADQANACgBAGQAAAGgGAAIg1AAQgHAAAAgGQAAgGAKgCQAJgDAAgDIACgNIAGi+QAAgRgOgEQgMgDAAgFQABgGAGAAIBWAAQAEgBADADIACAFIAPAmQAOAiAMAoIAGAVIAFAMIA1iLQAGgNAKAAIBNAAQAIgBAAAJQgEAFgKACQgMABAAAbIACCfQAAASABAFQACAQAIADIAKACQADACAAAFIgBADIgDACgAjXBTQgEgCAAgDIAAgEIAFgEIAJgBIACgCIABgDIAAhoQAAgHgEgDQgEgDgHgCQgDgEABgBIAAgEIA9gUQALgEAEAAIABAAIADABIACAnQAIgQAJgKQANgOAOAAQALAAAGAGQAEAFAAAOQAAAMgCAGQgDANgIAAQgFAAgHgDQgQgHgGAAQgKAAgFAKQgDAJAAANIAABCQAAAJABADQAEACAIAAIAGABQABAAABAAQAAABABAAQAAABABAAQAAABAAABIAAACQAAAEgEACgAoRBTQgFAAAAgHQgBgDAGgCQAMgDAAgHIAAjSIgNgKQgEgEAAgCQgBgDADgCIApgKQAcgHAGAAQAFAAAAAEIAADzQAAAIAIACQAJACAAAGQgDAFgEAAgAwOBTQgGAAgDgFQAAgHANgCQAOgCAAgJIAAjZIgiAAQgMAAgHAcQgGAbgGAAQgHAAAAgGIAAg6IACgFIADgDIDPAAQAGADAAADIAAA8QAAABAAABQAAAAgBABQAAAAAAAAQgBABAAAAIgGACQgFAAgGgbQgGgcgRAAIgfAAIAADTQgBAPALABQANACACACIACAFIgCAEIgCACg");
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
	(lib.taylormoneyrevision1spinningspiromobile = function(mode,startPosition,loop,reversed) {
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
		this.instance.setTransform(199.05,439.8,1,1,0,0,0,82.2,82.4);
		this.instance.alpha = 0;
		this.instance._off = true;
	
		this.timeline.addTween(cjs.Tween.get(this.instance).wait(139).to({_off:false},0).wait(1).to({regX:82.3,scaleX:1.0024,scaleY:1.0024,rotation:-0.2331,x:199.15,y:439.75,alpha:0.0003},0).wait(1).to({scaleX:1.01,scaleY:1.01,rotation:-0.9997,x:199.1,alpha:0.0011},0).wait(1).to({scaleX:1.0242,scaleY:1.0242,rotation:-2.4234,y:439.8,alpha:0.0027},0).wait(1).to({scaleX:1.0466,scaleY:1.0466,rotation:-4.6616,x:199.15,alpha:0.0053},0).wait(1).to({scaleX:1.0788,scaleY:1.0788,rotation:-7.8928,alpha:0.0089},0).wait(1).to({scaleX:1.1222,scaleY:1.1222,rotation:-12.2348,alpha:0.0138},0).wait(1).to({scaleX:1.1747,scaleY:1.1747,rotation:-17.4854,alpha:0.0197},0).wait(1).to({scaleX:1.2366,scaleY:1.2366,rotation:-23.6811,y:439.85,alpha:0.0267},0).wait(1).to({scaleX:1.3196,scaleY:1.3196,rotation:-31.9961,alpha:0.0361},0).wait(1).to({scaleX:1.4264,scaleY:1.4264,rotation:-42.6895,x:199.25,alpha:0.0482},0).wait(1).to({scaleX:1.5425,scaleY:1.5425,rotation:-54.3125,y:439.9,alpha:0.0613},0).wait(1).to({scaleX:1.6423,scaleY:1.6423,rotation:-64.2989,alpha:0.0726},0).wait(1).to({scaleX:1.7176,scaleY:1.7176,rotation:-71.8387,y:439.95,alpha:0.0811},0).wait(1).to({scaleX:1.7733,scaleY:1.7733,rotation:-77.4057,y:439.9,alpha:0.0874},0).wait(1).to({scaleX:1.8163,scaleY:1.8163,rotation:-81.717,y:440,alpha:0.0922},0).wait(1).to({scaleX:1.8551,scaleY:1.8551,rotation:-85.6049,y:439.95,alpha:0.0966},0).wait(1).to({scaleX:1.8799,scaleY:1.8799,rotation:-88.0813,alpha:0.0994},0).wait(1).to({scaleX:1.8923,scaleY:1.8923,rotation:-89.3195,y:440,alpha:0.1008},0).wait(1).to({scaleX:1.8977,scaleY:1.8977,rotation:-89.8589,y:440.05,alpha:0.1014},0).wait(1).to({regY:82.5,scaleX:1.899,scaleY:1.899,rotation:-90,x:199.35,y:440.1,alpha:0.1016},0).wait(21));
	
		// Wealthfirst
		this.instance_1 = new lib.Tween67("synched",0);
		this.instance_1.setTransform(199.6,424.45);
		this.instance_1.alpha = 0;
		this.instance_1._off = true;
	
		this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(60).to({_off:false},0).wait(1).to({alpha:0.0242},0).wait(1).to({alpha:0.1209},0).wait(1).to({alpha:0.3126},0).wait(1).to({alpha:0.6543},0).wait(1).to({alpha:0.8746},0).wait(1).to({alpha:0.9813},0).wait(1).to({alpha:1},0).wait(34).to({startPosition:0},0).wait(1).to({x:197.7573,y:424.4716},0).wait(1).to({x:190.6241,y:424.5552},0).wait(1).to({x:176.4473,y:424.7215},0).wait(1).to({x:151.0525,y:425.0192},0).wait(1).to({x:121.8653,y:425.3614},0).wait(1).to({x:106.6696,y:425.5396},0).wait(1).to({x:98.5967,y:425.6342},0).wait(1).to({x:97.25,y:425.65},0).wait(30).to({startPosition:0},0).wait(1).to({alpha:0.8789},0).wait(1).to({alpha:0.7568},0).wait(1).to({alpha:0.6335},0).wait(1).to({alpha:0.5091},0).wait(1).to({alpha:0.3835},0).wait(1).to({alpha:0.2568},0).wait(1).to({alpha:0.129},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(32));
	
		// WM_Last
		this.instance_2 = new lib.Symbol8();
		this.instance_2.setTransform(199.65,436.75,1,1,0,0,0,127.2,42.1);
		this.instance_2.alpha = 0;
		this.instance_2._off = true;
	
		this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(150).to({_off:false},0).wait(1).to({regY:42.2,y:436.85,alpha:0.0174},0).wait(1).to({alpha:0.085},0).wait(1).to({alpha:0.2191},0).wait(1).to({alpha:0.4595},0).wait(1).to({alpha:0.7358},0).wait(1).to({alpha:0.8796},0).wait(1).to({alpha:0.956},0).wait(1).to({regY:42.1,y:436.75,alpha:0.9688},0).wait(22));
	
		// Mangefrist
		this.instance_3 = new lib.Tween79("synched",0);
		this.instance_3.setTransform(201,466.6);
		this.instance_3.alpha = 0;
		this.instance_3._off = true;
	
		this.instance_4 = new lib.Tween80("synched",0);
		this.instance_4.setTransform(201,467.8);
	
		this.instance_5 = new lib.Tween81("synched",0);
		this.instance_5.setTransform(201,467.2);
		this.instance_5._off = true;
	
		this.instance_6 = new lib.Tween82("synched",0);
		this.instance_6.setTransform(290.9,467.4);
		this.instance_6._off = true;
	
		this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_3}]},60).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},34).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},30).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[]},1).wait(32));
		this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(60).to({_off:false},0).wait(1).to({regY:-5,y:461.6,alpha:0.0242},0).wait(1).to({y:461.7,alpha:0.1209},0).wait(1).to({y:461.95,alpha:0.3126},0).wait(1).to({y:462.35,alpha:0.6543},0).wait(1).to({y:462.6,alpha:0.8746},0).wait(1).to({y:462.75,alpha:0.9813},0).to({_off:true},1).wait(113));
		this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(101).to({_off:false},0).wait(1).to({x:202.6186,y:467.2036},0).wait(1).to({x:208.884,y:467.2175},0).wait(1).to({x:221.3364,y:467.2452},0).wait(1).to({x:243.6421,y:467.2949},0).wait(1).to({x:269.2789,y:467.3519},0).wait(1).to({x:282.6262,y:467.3816},0).wait(1).to({x:289.7172,y:467.3974},0).to({_off:true},1).wait(71));
		this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(109).to({_off:false},0).wait(30).to({startPosition:0},0).wait(1).to({alpha:0.982},0).wait(1).to({alpha:0.9123},0).wait(1).to({alpha:0.7738},0).wait(1).to({alpha:0.5257},0).wait(1).to({alpha:0.2405},0).wait(1).to({alpha:0.092},0).wait(1).to({alpha:0.0132},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(32));
	
		// dot
		this.instance_7 = new lib.Tween28("synched",0);
		this.instance_7.setTransform(324.05,421.95,1.0166,1.0161);
		this.instance_7._off = true;
	
		this.instance_8 = new lib.Tween85("synched",0);
		this.instance_8.setTransform(198.1,443.15);
		this.instance_8._off = true;
	
		this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(8).to({_off:false},0).to({startPosition:0},15,cjs.Ease.quartOut).wait(5).to({startPosition:0},0).wait(1).to({regX:23.5,regY:19.8,x:347.3,y:442.05},0).wait(1).to({x:345.2},0).wait(1).to({x:341.2},0).wait(1).to({x:334.7},0).wait(1).to({x:325.3},0).wait(1).to({x:313.75},0).wait(1).to({x:298.1},0).wait(1).to({x:276.3},0).wait(1).to({x:252.2},0).wait(1).to({x:233.2},0).wait(1).to({x:220.1},0).wait(1).to({x:210.8},0).wait(1).to({x:202.95},0).wait(1).to({x:198.85},0).wait(1).to({x:197.25},0).wait(1).to({regX:0,regY:0,x:173,y:421.95},0).wait(1).to({startPosition:0},0).to({_off:true},4).wait(131));
		this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(49).to({_off:false},0).to({scaleX:20.0028,scaleY:20.0028,x:197.8,y:442.85},7,cjs.Ease.bounceInOut).wait(43).to({scaleX:20.0029,scaleY:20.0029,x:198,y:443.05},0).wait(1).to({alpha:0.9758},0).wait(1).to({alpha:0.8791},0).wait(1).to({alpha:0.6874},0).wait(1).to({alpha:0.3457},0).wait(1).to({alpha:0.1254},0).wait(1).to({alpha:0.0187},0).wait(1).to({alpha:0},0).to({_off:true},22).wait(52));
	
		// planning
		this.instance_9 = new lib.Tween73("synched",0);
		this.instance_9.setTransform(99.2,458.05);
		this.instance_9.alpha = 0;
		this.instance_9._off = true;
	
		this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(102).to({_off:false},0).wait(1).to({regX:30,regY:8.4,x:128.45,y:466.45,alpha:0.0242},0).wait(1).to({x:125.6,alpha:0.1209},0).wait(1).to({x:119.85,alpha:0.3126},0).wait(1).to({x:109.7,alpha:0.6543},0).wait(1).to({x:103.15,alpha:0.8746},0).wait(1).to({x:100,alpha:0.9813},0).wait(1).to({regX:0,regY:0,x:69.45,y:458.05,alpha:1},0).wait(1).to({regX:30,regY:8.4,x:99.45,y:466.45},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({regX:0,regY:0,x:69.45,y:458.05},0).wait(1).to({regX:30,regY:8.4,x:99.45,y:466.45,alpha:0.982},0).wait(1).to({alpha:0.9123},0).wait(1).to({alpha:0.7738},0).wait(1).to({alpha:0.5257},0).wait(1).to({alpha:0.2405},0).wait(1).to({alpha:0.092},0).wait(1).to({alpha:0.0132},0).wait(1).to({regX:0,regY:0,x:69.45,y:458.05,alpha:0},0).wait(33));
	
		// semitop
		this.instance_10 = new lib.Tween51("synched",0);
		this.instance_10.setTransform(198.85,412.9,0.5533,0.5532);
		this.instance_10.alpha = 0;
		this.instance_10._off = true;
	
		this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(100).to({_off:false},0).wait(1).to({regX:0.2,regY:-27.5,x:197.55,y:397.7,alpha:0.0139},0).wait(1).to({x:192.35,alpha:0.0663},0).wait(1).to({x:181.6,alpha:0.1741},0).wait(1).to({x:164.75,alpha:0.3439},0).wait(1).to({x:137.6,alpha:0.6171},0).wait(1).to({x:117.35,alpha:0.8209},0).wait(1).to({x:106.15,alpha:0.9333},0).wait(1).to({x:100.5,alpha:0.9902},0).wait(1).to({regX:0,regY:0,x:99.45,y:412.9,alpha:1},0).wait(30).to({startPosition:0},0).wait(1).to({regX:0.2,regY:-27.5,x:99.55,y:397.7,alpha:0.982},0).wait(1).to({alpha:0.9123},0).wait(1).to({alpha:0.7738},0).wait(1).to({alpha:0.5257},0).wait(1).to({alpha:0.2405},0).wait(1).to({alpha:0.092},0).wait(1).to({alpha:0.0132},0).wait(1).to({regX:0,regY:0,x:99.45,y:412.9,alpha:0},0).to({_off:true},1).wait(32));
	
		// Investment
		this.instance_11 = new lib.Tween75("synched",0);
		this.instance_11.setTransform(289.1,415.85);
		this.instance_11.alpha = 0;
		this.instance_11._off = true;
	
		this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(100).to({_off:false},0).wait(1).to({regY:9.6,y:425.45,alpha:0.0139},0).wait(1).to({alpha:0.0663},0).wait(1).to({alpha:0.1741},0).wait(1).to({alpha:0.3439},0).wait(1).to({alpha:0.6171},0).wait(1).to({alpha:0.8209},0).wait(1).to({alpha:0.9333},0).wait(1).to({alpha:0.9902},0).wait(1).to({regY:0,y:415.85,alpha:1},0).wait(30).to({startPosition:0},0).wait(1).to({regY:9.6,y:425.45,alpha:0.8359},0).wait(1).to({alpha:0.6838},0).wait(1).to({alpha:0.5433},0).wait(1).to({alpha:0.4139},0).wait(1).to({alpha:0.2952},0).wait(1).to({alpha:0.1869},0).wait(1).to({alpha:0.0886},0).wait(1).to({regY:0,y:415.85,alpha:0},0).to({_off:true},1).wait(32));
	
		// semiBot
		this.instance_12 = new lib.Tween63("synched",0);
		this.instance_12.setTransform(68.65,360.2,0.5533,0.5532,0,0,0,0,0.1);
		this.instance_12._off = true;
	
		this.instance_13 = new lib.Tween64("synched",0);
		this.instance_13.setTransform(160.95,361.4,0.5533,0.5532,0,0,0,0.1,0.1);
		this.instance_13._off = true;
	
		this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(100).to({_off:false},0).wait(1).to({regX:234.9,regY:230.9,x:199.85,y:487.9},0).wait(1).to({x:204.7,y:487.95},0).wait(1).to({x:214.65,y:488.1},0).wait(1).to({x:230.3,y:488.3},0).wait(1).to({x:255.55,y:488.6},0).wait(1).to({x:274.35,y:488.85},0).wait(1).to({x:284.75,y:489},0).wait(1).to({x:290,y:489.05},0).to({_off:true},1).wait(71));
		this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(109).to({_off:false},0).wait(30).to({startPosition:0},0).to({alpha:0},8).to({_off:true},1).wait(32));
	
		// mask_idn (mask)
		var mask = new cjs.Shape();
		mask._off = true;
		var mask_graphics_0 = new cjs.Graphics().p("EgXCAkJIAAohMAy7AAAIAAIhg");
		var mask_graphics_25 = new cjs.Graphics().p("EgXCAkJIAAohMAy7AAAIAAIhg");
		var mask_graphics_26 = new cjs.Graphics().p("EgXDAkJIAAohMAy8AAAIAAIhg");
		var mask_graphics_27 = new cjs.Graphics().p("EgXFAkJIAAohMAy8AAAIAAIhg");
		var mask_graphics_28 = new cjs.Graphics().p("EgXPAkJIAAohMAy8AAAIAAIhg");
		var mask_graphics_29 = new cjs.Graphics().p("EgXpAkJIAAohMAy8AAAIAAIhg");
		var mask_graphics_30 = new cjs.Graphics().p("EgYgAkJIAAohMAy8AAAIAAIhg");
		var mask_graphics_31 = new cjs.Graphics().p("EgZdAkJIAAohMAy7AAAIAAIhg");
		var mask_graphics_32 = new cjs.Graphics().p("EgZdAkJIAAohMAy7AAAIAAIhg");
		var mask_graphics_33 = new cjs.Graphics().p("EgZdAkJIAAohMAy7AAAIAAIhg");
		var mask_graphics_34 = new cjs.Graphics().p("EgZdAkJIAAohMAy7AAAIAAIhg");
		var mask_graphics_35 = new cjs.Graphics().p("EgZdAkJIAAohMAy7AAAIAAIhg");
		var mask_graphics_36 = new cjs.Graphics().p("EgZdAkJIAAohMAy7AAAIAAIhg");
		var mask_graphics_37 = new cjs.Graphics().p("EgZdAkJIAAohMAy7AAAIAAIhg");
		var mask_graphics_38 = new cjs.Graphics().p("EgZdAkJIAAohMAy7AAAIAAIhg");
		var mask_graphics_39 = new cjs.Graphics().p("EgZdAkJIAAohMAy7AAAIAAIhg");
		var mask_graphics_40 = new cjs.Graphics().p("EgZdAkJIAAohMAy7AAAIAAIhg");
		var mask_graphics_41 = new cjs.Graphics().p("EgZdAkJIAAohMAy7AAAIAAIhg");
		var mask_graphics_42 = new cjs.Graphics().p("EgZdAkJIAAohMAy7AAAIAAIhg");
	
		this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:178.5386,y:231.2873}).wait(25).to({graphics:mask_graphics_25,x:178.5386,y:231.2873}).wait(1).to({graphics:mask_graphics_26,x:178.5236,y:231.2873}).wait(1).to({graphics:mask_graphics_27,x:178.2988,y:231.2873}).wait(1).to({graphics:mask_graphics_28,x:177.3246,y:231.2873}).wait(1).to({graphics:mask_graphics_29,x:174.7017,y:231.2873}).wait(1).to({graphics:mask_graphics_30,x:169.1712,y:231.2873}).wait(1).to({graphics:mask_graphics_31,x:155.1876,y:231.2873}).wait(1).to({graphics:mask_graphics_32,x:122.0644,y:231.2873}).wait(1).to({graphics:mask_graphics_33,x:71.2556,y:231.2873}).wait(1).to({graphics:mask_graphics_34,x:3.8665,y:231.2873}).wait(1).to({graphics:mask_graphics_35,x:-46.9423,y:231.2873}).wait(1).to({graphics:mask_graphics_36,x:-80.0654,y:231.2873}).wait(1).to({graphics:mask_graphics_37,x:-100.1791,y:231.2873}).wait(1).to({graphics:mask_graphics_38,x:-111.2401,y:231.2873}).wait(1).to({graphics:mask_graphics_39,x:-116.4859,y:231.2873}).wait(1).to({graphics:mask_graphics_40,x:-118.4343,y:231.2873}).wait(1).to({graphics:mask_graphics_41,x:-118.8839,y:231.2873}).wait(1).to({graphics:mask_graphics_42,x:-118.9139,y:231.2873}).wait(138));
	
		// logo
		this.instance_14 = new lib.Symbol2();
		this.instance_14.setTransform(196.45,435.5,1.3724,1.3723,0,0,0,109.3,18.8);
		this.instance_14.alpha = 0.1211;
	
		this.instance_15 = new lib.Symbol3();
		this.instance_15.setTransform(196.45,435.5,1.3724,1.3723,0,0,0,109.3,18.8);
	
		var maskedShapeInstanceList = [this.instance_14,this.instance_15];
	
		for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
			maskedShapeInstanceList[shapedInstanceItr].mask = mask;
		}
	
		this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_14}]}).to({state:[{t:this.instance_15}]},13).to({state:[]},69).wait(98));
		this.timeline.addTween(cjs.Tween.get(this.instance_14).to({_off:true,alpha:1},13,cjs.Ease.quartIn).wait(167));
	
		// background
		this.instance_16 = new lib.Tween55("synched",0);
		this.instance_16.setTransform(195.4,421.35);
		this.instance_16.alpha = 0;
		this.instance_16._off = true;
	
		this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(73).to({_off:false},0).to({startPosition:0},9,cjs.Ease.quartInOut).to({startPosition:0},62,cjs.Ease.quartInOut).to({_off:true},1).wait(35));
	
		this._renderFirstFrame();
	
	}).prototype = p = new lib.AnMovieClip();
	p.nominalBounds = new cjs.Rectangle(-119.1,460.2,824.1,344.40000000000003);
	// library properties:
	lib.properties = {
		id: '12ABE26C81814E43AEB504FB91596CBA',
		width: 390,
		height: 844,
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