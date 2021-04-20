(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"emoji_linoyalbahari_atlas_1", frames: [[0,0,1295,1295]]},
		{name:"emoji_linoyalbahari_atlas_2", frames: [[0,0,1111,1114]]},
		{name:"emoji_linoyalbahari_atlas_3", frames: [[0,0,998,1176],[1000,0,998,1176]]},
		{name:"emoji_linoyalbahari_atlas_4", frames: [[0,0,998,1176],[1000,0,998,1176]]},
		{name:"emoji_linoyalbahari_atlas_5", frames: [[0,0,992,1128],[796,1304,790,652],[994,0,804,650],[994,652,794,650],[0,1304,794,650]]},
		{name:"emoji_linoyalbahari_atlas_6", frames: [[787,649,970,444],[0,654,777,652],[0,0,785,652],[787,0,763,647],[724,1595,755,450],[0,1308,722,688],[779,1095,797,498]]},
		{name:"emoji_linoyalbahari_atlas_7", frames: [[1320,1399,356,352],[1320,1043,359,354],[1681,1269,358,353],[1678,1624,356,352],[0,0,557,557],[876,619,421,422],[1722,619,220,648],[876,1269,220,648],[1435,0,421,423],[0,559,436,436],[0,997,436,436],[1299,619,421,422],[0,1435,436,436],[438,559,436,436],[559,0,436,436],[438,997,436,436],[438,1435,436,436],[997,0,436,436],[1098,1269,220,648],[876,438,1001,179]]},
		{name:"emoji_linoyalbahari_atlas_8", frames: [[0,0,355,351],[714,0,351,351],[357,0,355,351],[1307,1032,296,297],[444,1236,296,297],[1605,1137,296,297],[444,1535,296,297],[742,1312,296,297],[742,1611,296,297],[1040,1331,296,297],[649,353,333,174],[1040,1630,296,297],[1338,1436,296,297],[1338,1735,296,297],[419,662,220,412],[1743,309,220,412],[1383,618,220,412],[0,891,220,412],[641,822,220,412],[222,1076,220,412],[0,1305,220,412],[222,1490,220,412],[1605,723,220,412],[863,898,220,412],[1085,898,220,412],[1842,0,179,239],[1827,723,179,239],[1785,1753,179,239],[0,1904,511,140],[1489,0,351,307],[1067,280,340,307],[0,353,326,307],[328,353,319,307],[1068,589,313,307],[1409,309,332,307],[1636,1753,147,293],[1636,1436,268,315],[649,589,417,231],[1067,0,420,278],[0,662,417,227]]},
		{name:"emoji_linoyalbahari_atlas_9", frames: [[750,624,73,58],[905,452,37,28],[390,482,194,81],[586,482,194,81],[782,482,194,81],[390,565,194,81],[958,565,64,106],[905,360,92,90],[181,587,79,95],[181,482,207,103],[262,587,79,95],[0,0,179,239],[181,0,179,239],[362,0,179,239],[543,0,179,239],[724,0,179,239],[0,241,179,239],[181,241,179,239],[362,241,179,239],[543,241,179,239],[724,241,179,239],[885,624,50,50],[0,482,179,239],[586,565,162,90],[905,206,89,152],[825,624,58,47],[905,0,81,204],[750,565,206,57]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_133 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_130 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_131 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_7"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_125 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_7"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_132 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_7"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_129 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_127 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_7"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_128 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_124 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_117 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_119 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_120 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_118 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_122 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_121 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_110 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_112 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_109 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_123 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_111 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_108 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_104 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_107 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_7"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_106 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_102 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_103 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_7"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_93 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_7"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_92 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_7"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_105 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_7"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_89 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_7"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_87 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_7"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_101 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_7"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_88 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_7"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_84 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_7"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_81 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_7"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_82 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_7"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_91 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_7"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_85 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_7"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_73 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_71 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_69 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_66 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_67 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_70 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_68 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_65 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_64 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_59 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_58 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_57 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_60 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_63 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_62 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_56 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_55 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_52 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_54 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_53 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_50 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_51 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_49 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_47 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_43 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_45 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_44 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_46 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_48 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_41 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_74 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_39 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_37 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_7"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_100 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_99 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_98 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_6"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_38 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_94 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_6"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_6"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_5"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_5"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_5"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_5"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap1 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap10 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap3 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap5 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_7"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap6 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap7 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_8"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.leg = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap4 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_9"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_6"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_6"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_6"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["emoji_linoyalbahari_atlas_6"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(img.CachedBmp_29);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2630,1496);


(lib.CachedBmp_3 = function() {
	this.initialize(img.CachedBmp_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2570,1379);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
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


(lib.Symbol3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap3();
	this.instance.setTransform(12,7.2,0.0264,0.0587,0,62.2623,68.0083);

	this.instance_1 = new lib.Bitmap6();
	this.instance_1.setTransform(25.2,0,0.0264,0.055,0,62.092,67.4286);

	this.instance_2 = new lib.CachedBmp_133();
	this.instance_2.setTransform(-3.65,-2.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(-3.6,-2.1,36.5,29), null);


(lib.star = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_125();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_132();
	this.instance_1.setTransform(1,0.9,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_127();
	this.instance_2.setTransform(1.6,1.35,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_128();
	this.instance_3.setTransform(1.6,1.5,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_129();
	this.instance_4.setTransform(1.6,1.5,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_130();
	this.instance_5.setTransform(1.6,1.5,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_131();
	this.instance_6.setTransform(1.6,1.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},3).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_3}]},3).to({state:[{t:this.instance_4}]},3).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_6}]},3).to({state:[{t:this.instance_1}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,180,177.4);


(lib.Smiley = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_111();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_112();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_123();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_122();
	this.instance_3.setTransform(0,0,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_121();
	this.instance_4.setTransform(0,0,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_120();
	this.instance_5.setTransform(0,0,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_117();
	this.instance_6.setTransform(0,0,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_118();
	this.instance_7.setTransform(0,0,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_119();
	this.instance_8.setTransform(0,0,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_124();
	this.instance_9.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},3).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_3}]},3).to({state:[{t:this.instance_4}]},3).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_6}]},3).to({state:[{t:this.instance_7}]},3).to({state:[{t:this.instance_8}]},3).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_4}]},3).to({state:[{t:this.instance_3}]},3).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_9}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,148,148.5);


(lib.Shoes1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_110();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,166.5,87);


(lib.Scene_1_window_background = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// window_background
	this.instance = new lib.CachedBmp_4();
	this.instance.setTransform(140.5,84.7,0.5,0.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(296).to({_off:false},0).wait(304));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_window = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// window
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(129.95,71.65,0.5,0.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(296).to({_off:false},0).wait(304));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_sending = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// sending
	this.instance = new lib.Bitmap4();
	this.instance.setTransform(627.7,-129.8,0.1474,0.1448,22.9584);

	this.instance_1 = new lib.Bitmap3();
	this.instance_1.setTransform(622.3,-124.35,0.2007,0.2184,23.452);

	this.instance_2 = new lib.Bitmap6();
	this.instance_2.setTransform(643.05,-173.1,0.2014,0.199,23.2072);

	this.instance_3 = new lib.Bitmap10();
	this.instance_3.setTransform(756,574,0.0836,0.1076);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1,p:{scaleX:0.2007,scaleY:0.2184,rotation:23.452,x:622.3,y:-124.35}},{t:this.instance,p:{scaleX:0.1474,scaleY:0.1448,rotation:22.9584,x:627.7,y:-129.8}}]}).to({state:[{t:this.instance_1,p:{scaleX:0.2005,scaleY:0.2105,rotation:23.4363,x:728.95,y:569.35}},{t:this.instance,p:{scaleX:0.1473,scaleY:0.1447,rotation:22.9456,x:735.3,y:562.65}}]},105).to({state:[{t:this.instance_1,p:{scaleX:0.2005,scaleY:0.2105,rotation:23.4363,x:728.95,y:569.35}},{t:this.instance,p:{scaleX:0.1473,scaleY:0.1447,rotation:22.9456,x:735.3,y:562.65}},{t:this.instance_3,p:{scaleX:0.0836,scaleY:0.1076,rotation:0,x:756,y:574,skewX:0,skewY:0}}]},20).to({state:[{t:this.instance_1,p:{scaleX:0.2005,scaleY:0.2105,rotation:23.4363,x:728.95,y:569.35}},{t:this.instance,p:{scaleX:0.1473,scaleY:0.1447,rotation:22.9456,x:735.3,y:562.65}},{t:this.instance_3,p:{scaleX:0.1517,scaleY:0.1124,rotation:-160.6277,x:759.95,y:580.05,skewX:0,skewY:0}}]},39).to({state:[{t:this.instance_1,p:{scaleX:0.2005,scaleY:0.2105,rotation:23.4363,x:728.95,y:569.35}},{t:this.instance,p:{scaleX:0.1473,scaleY:0.1447,rotation:22.9456,x:735.3,y:562.65}},{t:this.instance_3,p:{scaleX:0.2203,scaleY:0.1208,rotation:0,x:760.1,y:580.15,skewX:-160.9725,skewY:-160.807}}]},41).to({state:[{t:this.instance_1,p:{scaleX:0.2005,scaleY:0.2105,rotation:23.4363,x:728.95,y:569.35}},{t:this.instance,p:{scaleX:0.1473,scaleY:0.1447,rotation:22.9456,x:735.3,y:562.65}},{t:this.instance_3,p:{scaleX:0.3175,scaleY:0.1207,rotation:0,x:760.9,y:580.75,skewX:-158.2564,skewY:-158.0743}}]},40).wait(51));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_hair = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// hair
	this.instance = new lib.CachedBmp_5();
	this.instance.setTransform(309.85,59.45,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_6();
	this.instance_1.setTransform(335.7,67.5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_7();
	this.instance_2.setTransform(332.65,67.5,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_8();
	this.instance_3.setTransform(332.65,67.5,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_9();
	this.instance_4.setTransform(332.65,67.5,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_10();
	this.instance_5.setTransform(335.7,67.5,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_11();
	this.instance_6.setTransform(335.7,67.5,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_12();
	this.instance_7.setTransform(335.7,67.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},42).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},2).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).wait(246));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_blue_background = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// blue_background
	this.instance = new lib.CachedBmp_29();
	this.instance.setTransform(-21.2,-16.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(296));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_background = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// background
	this.instance = new lib.CachedBmp_3();
	this.instance.setTransform(0,-28,0.5,0.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(296).to({_off:false},0).wait(304));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.playbutton = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_102();
	this.instance.setTransform(41.75,93.65,0.3513,0.3513);

	this.instance_1 = new lib.CachedBmp_101();
	this.instance_1.setTransform(0,0,0.3513,0.3513);

	this.instance_2 = new lib.CachedBmp_104();
	this.instance_2.setTransform(41.75,93.65,0.3513,0.3513);

	this.instance_3 = new lib.CachedBmp_103();
	this.instance_3.setTransform(0,0,0.3513,0.3513);

	this.instance_4 = new lib.CachedBmp_106();
	this.instance_4.setTransform(41.75,93.65,0.3513,0.3513);

	this.instance_5 = new lib.CachedBmp_105();
	this.instance_5.setTransform(0,0,0.3513,0.3513);

	this.instance_6 = new lib.CachedBmp_108();
	this.instance_6.setTransform(41.75,93.65,0.3513,0.3513);

	this.instance_7 = new lib.CachedBmp_107();
	this.instance_7.setTransform(-19.65,-27.85,0.3513,0.3513);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2}]},1).to({state:[{t:this.instance_5},{t:this.instance_4}]},1).to({state:[{t:this.instance_7},{t:this.instance_6}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.6,-27.8,195.7,195.70000000000002);


(lib.love = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_81();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_82();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_91();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_84();
	this.instance_3.setTransform(0,0,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_85();
	this.instance_4.setTransform(0,0,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_88();
	this.instance_5.setTransform(0,0,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_87();
	this.instance_6.setTransform(0,0,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_89();
	this.instance_7.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},3).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_3}]},3).to({state:[{t:this.instance_4}]},3).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_6}]},3).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_7}]},3).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,218,218);


(lib.leg1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.leg();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,81,204);


(lib.legwalk = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap1();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,89,152);


(lib.hand = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_60();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,103.5,51.5);


(lib.finger = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_56();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_57();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_58();
	this.instance_2.setTransform(-2.4,4.45,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_59();
	this.instance_3.setTransform(0.35,-3.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},59).to({state:[{t:this.instance_2}]},15).to({state:[{t:this.instance_3}]},31).wait(191));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.4,-3.7,46,53.2);


(lib.eye = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_41();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,25,25);


(lib.end = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_39();
	this.instance.setTransform(42.2,99.3,0.1332,0.1332);

	this.instance_1 = new lib.CachedBmp_38();
	this.instance_1.setTransform(0,0,0.1332,0.1332);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,148,148.4);


(lib.crying = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_32();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_33();
	this.instance_1.setTransform(-1.75,0,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_34();
	this.instance_2.setTransform(-3.25,0,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_35();
	this.instance_3.setTransform(-4.75,0,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_36();
	this.instance_4.setTransform(-6.75,0,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_37();
	this.instance_5.setTransform(-9.5,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},3).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_3}]},3).to({state:[{t:this.instance_4}]},3).to({state:[{t:this.instance_5}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.5,0,175.5,153.5);


(lib.cloud = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap5();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1001,179);


(lib.Almoststraightleg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_30();
	this.instance.setTransform(-0.5,-0.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.5,-0.5,73.5,146.5);


(lib.___Camera___ = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.visible = false;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// cameraBoundary
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(2,1,1,3,true).p("EAq+AfQMhV7AAAMAAAg+fMBV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-641,-361,1282,722);


(lib.Shoes = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Shoes1("synched",0);
	this.instance.setTransform(49.35,26.5,0.6013,0.6013,0,0,0,82.1,44.1);

	this.instance_1 = new lib.CachedBmp_109();
	this.instance_1.setTransform(14.4,8.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,100.1,52.3);


(lib.Scene_1_stars_Jump = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// stars_Jump
	this.instance = new lib.star("synched",0);
	this.instance.setTransform(747.2,572.05,0.0217,0.0217,22.1387,0,0,56.1,64.4);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(245).to({_off:false},0).wait(1).to({regX:90,regY:88.7,scaleX:0.0281,scaleY:0.0281,rotation:22.1604,x:744.4,y:568.05,startPosition:1},0).wait(1).to({scaleX:0.0346,scaleY:0.0346,x:741.2,y:563.65,startPosition:2},0).wait(1).to({scaleX:0.041,scaleY:0.041,x:738.05,y:559.55,startPosition:3},0).wait(1).to({scaleX:0.0475,scaleY:0.0475,x:734.9,y:555.75,startPosition:4},0).wait(1).to({scaleX:0.0539,scaleY:0.0539,x:731.8,y:552.3,startPosition:5},0).wait(1).to({scaleX:0.0604,scaleY:0.0604,x:728.75,y:549.1,startPosition:6},0).wait(1).to({scaleX:0.0669,scaleY:0.0669,x:725.65,y:546.2,startPosition:7},0).wait(1).to({scaleX:0.0733,scaleY:0.0733,x:722.65,y:543.65,startPosition:8},0).wait(1).to({scaleX:0.0798,scaleY:0.0798,x:719.7,y:541.4,startPosition:9},0).wait(1).to({scaleX:0.0862,scaleY:0.0862,x:716.7,y:539.55,startPosition:10},0).wait(1).to({scaleX:0.0927,scaleY:0.0927,x:713.75,y:537.85,startPosition:11},0).wait(1).to({scaleX:0.0991,scaleY:0.0991,x:710.85,y:536.55,startPosition:12},0).wait(1).to({scaleX:0.1056,scaleY:0.1056,x:707.95,y:535.5,startPosition:13},0).wait(1).to({scaleX:0.112,scaleY:0.112,x:705.15,y:534.8,startPosition:14},0).wait(1).to({scaleX:0.1185,scaleY:0.1185,x:702.3,y:534.4,startPosition:15},0).wait(1).to({scaleX:0.1249,scaleY:0.1249,x:699.45,y:534.3,startPosition:16},0).wait(1).to({scaleX:0.1314,scaleY:0.1314,x:696.75,y:534.5,startPosition:17},0).wait(1).to({scaleX:0.1378,scaleY:0.1378,x:694,y:535.05,startPosition:18},0).wait(1).to({scaleX:0.1443,scaleY:0.1443,x:691.25,y:535.85,startPosition:19},0).wait(1).to({scaleX:0.1507,scaleY:0.1507,x:688.55,y:537,startPosition:20},0).wait(1).to({scaleX:0.1572,scaleY:0.1572,x:685.9,y:538.45,startPosition:21},0).wait(1).to({scaleX:0.1636,scaleY:0.1636,x:683.3,y:540.15,startPosition:0},0).wait(1).to({scaleX:0.1701,scaleY:0.1701,x:680.7,y:542.15,startPosition:1},0).wait(1).to({scaleX:0.1766,scaleY:0.1766,x:678.05,y:544.55,startPosition:2},0).wait(1).to({scaleX:0.183,scaleY:0.183,x:675.55,y:547.2,startPosition:3},0).wait(1).to({scaleX:0.1895,scaleY:0.1895,x:673,y:550.15,startPosition:4},0).wait(1).to({scaleX:0.1959,scaleY:0.1959,x:670.5,y:553.4,startPosition:5},0).wait(1).to({scaleX:0.2024,scaleY:0.2024,x:668,y:556.95,startPosition:6},0).wait(1).to({scaleX:0.2088,scaleY:0.2088,x:665.5,y:560.85,startPosition:7},0).wait(1).to({scaleX:0.2153,scaleY:0.2153,x:663.1,y:565,startPosition:8},0).wait(1).to({scaleX:0.2217,scaleY:0.2217,x:660.75,y:569.5,startPosition:9},0).wait(1).to({scaleX:0.2282,scaleY:0.2282,x:658.25,y:574.25,startPosition:10},0).wait(1).to({scaleX:0.2346,scaleY:0.2346,x:655.95,y:579.3,startPosition:11},0).wait(1).to({scaleX:0.2411,scaleY:0.2411,x:653.65,y:584.7,startPosition:12},0).wait(1).to({scaleX:0.2475,scaleY:0.2475,x:651.3,y:590.4,startPosition:13},0).wait(1).to({scaleX:0.254,scaleY:0.254,x:649,y:596.35,startPosition:14},0).wait(1).to({scaleX:0.2604,scaleY:0.2604,x:646.75,y:602.65,startPosition:15},0).wait(1).to({scaleX:0.2669,scaleY:0.2669,x:644.5,y:609.2,startPosition:16},0).wait(1).to({scaleX:0.2733,scaleY:0.2733,x:642.3,y:616.15,startPosition:17},0).wait(1).to({scaleX:0.2798,scaleY:0.2798,x:640.1,y:623.35,startPosition:18},0).wait(1).to({scaleX:0.2863,scaleY:0.2863,x:637.9,y:630.8,startPosition:19},0).wait(1).to({scaleX:0.2927,scaleY:0.2927,x:635.8,y:638.6,startPosition:20},0).wait(1).to({scaleX:0.2992,scaleY:0.2992,x:633.7,y:646.65,startPosition:21},0).wait(1).to({scaleX:0.3056,scaleY:0.3056,x:631.6,y:655.05,startPosition:0},0).wait(1).to({scaleX:0.3121,scaleY:0.3121,x:629.5,y:663.8,startPosition:1},0).wait(1).to({scaleX:0.3185,scaleY:0.3185,x:627.45,y:672.75,startPosition:2},0).wait(1).to({scaleX:0.325,scaleY:0.325,x:625.45,y:682.1,startPosition:3},0).wait(1).to({scaleX:0.3314,scaleY:0.3314,x:623.4,y:691.65,startPosition:4},0).wait(1).to({scaleX:0.3379,scaleY:0.3379,x:621.45,y:701.55,startPosition:5},0).wait(1).to({scaleX:0.3443,scaleY:0.3443,x:619.5,y:711.8,startPosition:6},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_stars = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// stars
	this.instance = new lib.star("synched",0);
	this.instance.setTransform(584.35,-52.8,0.8897,0.8897,0,0,0,89.4,85.6);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(404).to({_off:false},0).wait(1).to({regX:90,regY:88.7,x:585.7,y:-31,startPosition:1},0).wait(1).to({x:586.55,y:-11.95,startPosition:2},0).wait(1).to({x:587.45,y:7.05,startPosition:3},0).wait(1).to({x:588.3,y:26.1,startPosition:4},0).wait(1).to({x:589.2,y:45.1,startPosition:5},0).wait(1).to({x:590.05,y:64.15,startPosition:6},0).wait(1).to({x:590.95,y:83.15,startPosition:7},0).wait(1).to({x:591.8,y:102.15,startPosition:8},0).wait(1).to({x:592.7,y:121.2,startPosition:9},0).wait(1).to({x:593.55,y:140.2,startPosition:10},0).wait(1).to({x:594.45,y:159.25,startPosition:11},0).wait(1).to({x:595.3,y:178.3,startPosition:12},0).wait(1).to({x:596.2,y:197.3,startPosition:13},0).wait(1).to({x:597.05,y:216.35,startPosition:14},0).wait(1).to({x:597.95,y:235.35,startPosition:15},0).wait(1).to({x:598.8,y:254.4,startPosition:16},0).wait(1).to({x:599.7,y:273.45,startPosition:17},0).wait(1).to({x:600.55,y:292.45,startPosition:18},0).wait(1).to({x:601.45,y:311.5,startPosition:19},0).wait(1).to({x:602.3,y:330.5,startPosition:20},0).wait(1).to({x:603.2,y:349.55,startPosition:21},0).wait(1).to({x:604.05,y:368.6,startPosition:0},0).wait(1).to({x:604.95,y:387.6,startPosition:1},0).wait(1).to({x:605.8,y:406.65,startPosition:2},0).wait(1).to({x:606.7,y:425.65,startPosition:3},0).wait(1).to({x:607.55,y:444.7,startPosition:4},0).wait(1).to({x:608.45,y:463.75,startPosition:5},0).wait(1).to({x:609.3,y:482.75,startPosition:6},0).wait(1).to({x:610.2,y:501.8,startPosition:7},0).wait(1).to({x:611.05,y:520.8,startPosition:8},0).wait(1).to({x:611.95,y:539.85,startPosition:9},0).wait(1).to({x:612.8,y:558.9,startPosition:10},0).wait(1).to({x:613.7,y:577.9,startPosition:11},0).wait(1).to({x:614.55,y:596.95,startPosition:12},0).wait(1).to({x:615.4,y:615.95,startPosition:13},0).wait(1).to({x:602.95,y:608.65,startPosition:14},0).wait(1).to({x:590.5,y:601.3,startPosition:15},0).wait(1).to({x:578.05,y:593.95,startPosition:16},0).wait(1).to({x:565.6,y:586.6,startPosition:17},0).wait(1).to({x:553.15,y:579.25,startPosition:18},0).wait(1).to({x:540.7,y:571.95,startPosition:19},0).wait(1).to({x:528.25,y:564.6,startPosition:20},0).wait(1).to({x:515.75,y:557.25,startPosition:21},0).wait(1).to({x:503.3,y:549.9,startPosition:0},0).wait(1).to({x:490.85,y:542.55,startPosition:1},0).wait(1).to({x:478.4,y:535.25,startPosition:2},0).wait(1).to({x:465.95,y:527.9,startPosition:3},0).wait(1).to({x:453.5,y:520.55,startPosition:4},0).wait(1).to({x:441.05,y:513.2,startPosition:5},0).wait(1).to({x:428.55,y:505.85,startPosition:6},0).wait(1).to({x:423.15,y:513.35,startPosition:7},0).wait(1).to({x:417.7,y:520.85,startPosition:8},0).wait(1).to({x:412.25,y:528.35,startPosition:9},0).wait(1).to({x:406.8,y:535.85,startPosition:10},0).wait(1).to({x:401.4,y:543.35,startPosition:11},0).wait(1).to({x:395.95,y:550.85,startPosition:12},0).wait(1).to({x:390.5,y:558.35,startPosition:13},0).wait(1).to({x:385.05,y:565.85,startPosition:14},0).wait(1).to({x:379.65,y:573.3,startPosition:15},0).wait(1).to({x:374.2,y:580.8,startPosition:16},0).wait(1).to({x:368.75,y:588.3,startPosition:17},0).wait(1).to({x:363.3,y:595.8,startPosition:18},0).wait(1).to({x:357.9,y:603.3,startPosition:19},0).wait(1).to({x:352.45,y:610.8,startPosition:20},0).wait(1).to({x:347,y:618.3,startPosition:21},0).wait(1).to({x:341.55,y:625.8,startPosition:0},0).wait(1).to({x:336.1,y:633.25,startPosition:1},0).wait(1).to({x:342.75,y:623.3,startPosition:2},0).wait(1).to({x:349.4,y:613.3,startPosition:3},0).wait(1).to({x:356.05,y:603.3,startPosition:4},0).wait(1).to({x:362.7,y:593.35,startPosition:5},0).wait(1).to({x:369.35,y:583.35,startPosition:6},0).wait(1).to({x:376,y:573.35,startPosition:7},0).wait(1).to({x:382.6,y:563.35,startPosition:8},0).wait(1).to({x:389.25,y:553.4,startPosition:9},0).wait(1).to({x:395.9,y:543.4,startPosition:10},0).wait(1).to({x:402.55,y:533.4,startPosition:11},0).wait(1).to({x:409.2,y:523.45,startPosition:12},0).wait(1).to({x:415.85,y:513.45,startPosition:13},0).wait(1).to({x:422.5,y:503.45,startPosition:14},0).wait(1).to({x:429.15,y:493.45,startPosition:15},0).wait(1).to({x:435.75,y:483.5,startPosition:16},0).wait(1).to({x:442.4,y:473.5,startPosition:17},0).wait(1).to({x:449.05,y:463.5,startPosition:18},0).wait(1).to({x:455.7,y:453.5,startPosition:19},0).wait(1).to({x:462.35,y:443.55,startPosition:20},0).wait(1).to({x:469,y:433.55,startPosition:21},0).wait(1).to({x:475.65,y:423.55,startPosition:0},0).wait(1).to({x:482.25,y:413.6,startPosition:1},0).wait(1).to({x:488.9,y:403.6,startPosition:2},0).wait(1).to({x:495.55,y:393.6,startPosition:3},0).wait(1).to({x:502.2,y:383.6,startPosition:4},0).wait(1).to({x:508.85,y:373.65,startPosition:5},0).wait(1).to({x:515.5,y:363.65,startPosition:6},0).wait(1).to({x:522.15,y:353.65,startPosition:7},0).wait(1).to({x:528.75,y:343.7,startPosition:8},0).wait(1).to({x:535.4,y:333.7,startPosition:9},0).wait(1).to({x:542.05,y:323.7,startPosition:10},0).wait(1).to({x:548.7,y:313.7,startPosition:11},0).wait(1).to({x:555.35,y:303.75,startPosition:12},0).wait(1).to({x:562,y:293.75,startPosition:13},0).wait(1).to({x:568.65,y:283.75,startPosition:14},0).wait(1).to({x:575.25,y:273.8,startPosition:15},0).wait(1).to({x:581.9,y:263.8,startPosition:16},0).wait(1).to({x:588.55,y:253.8,startPosition:17},0).wait(1).to({x:595.2,y:243.8,startPosition:18},0).wait(1).to({x:601.85,y:233.85,startPosition:19},0).wait(1).to({x:608.5,y:223.85,startPosition:20},0).wait(1).to({x:615.15,y:213.85,startPosition:21},0).wait(1).to({x:621.75,y:203.85,startPosition:0},0).wait(1).to({x:628.55,y:213.35,startPosition:1},0).wait(1).to({x:635.35,y:222.85,startPosition:2},0).wait(1).to({x:642.15,y:232.35,startPosition:3},0).wait(1).to({x:648.9,y:241.85,startPosition:4},0).wait(1).to({x:655.7,y:251.35,startPosition:5},0).wait(1).to({x:662.5,y:260.85,startPosition:6},0).wait(1).to({x:669.3,y:270.35,startPosition:7},0).wait(1).to({x:676.05,y:279.85,startPosition:8},0).wait(1).to({x:682.85,y:289.35,startPosition:9},0).wait(1).to({x:689.65,y:298.85,startPosition:10},0).wait(1).to({x:696.45,y:308.35,startPosition:11},0).wait(1).to({x:703.2,y:317.85,startPosition:12},0).wait(1).to({x:710,y:327.35,startPosition:13},0).wait(1).to({x:716.8,y:336.85,startPosition:14},0).wait(1).to({x:723.55,y:346.35,startPosition:15},0).wait(1).to({x:730.35,y:355.85,startPosition:16},0).wait(1).to({x:737.15,y:365.35,startPosition:17},0).wait(1).to({x:743.95,y:374.85,startPosition:18},0).wait(1).to({x:750.7,y:384.35,startPosition:19},0).wait(1).to({x:757.5,y:393.85,startPosition:20},0).wait(1).to({x:764.3,y:403.35,startPosition:21},0).wait(1).to({x:771.1,y:412.85,startPosition:0},0).wait(1).to({x:777.85,y:422.35,startPosition:1},0).wait(1).to({x:784.65,y:431.85,startPosition:2},0).wait(1).to({x:791.45,y:441.35,startPosition:3},0).wait(1).to({x:798.25,y:450.85,startPosition:4},0).wait(1).to({x:805,y:460.35,startPosition:5},0).wait(1).to({x:811.8,y:469.85,startPosition:6},0).wait(1).to({x:818.6,y:479.35,startPosition:7},0).wait(1).to({x:825.35,y:488.85,startPosition:8},0).wait(1).to({x:832.15,y:498.35,startPosition:9},0).wait(1).to({x:838.95,y:507.85,startPosition:10},0).wait(1).to({x:845.75,y:517.35,startPosition:11},0).wait(1).to({x:852.5,y:526.85,startPosition:12},0).wait(1).to({x:859.3,y:536.35,startPosition:13},0).wait(1).to({x:866.1,y:545.85,startPosition:14},0).wait(1).to({x:872.9,y:555.35,startPosition:15},0).wait(1).to({x:879.65,y:564.85,startPosition:16},0).wait(1).to({x:886.45,y:574.35,startPosition:17},0).wait(1).to({x:893.25,y:583.85,startPosition:18},0).wait(1).to({x:900.05,y:593.35,startPosition:19},0).wait(1).to({x:906.8,y:602.85,startPosition:20},0).wait(1).to({x:913.6,y:612.35,startPosition:21},0).wait(1).to({x:920.4,y:621.85,startPosition:0},0).wait(1).to({x:927.15,y:631.35,startPosition:1},0).wait(1).to({x:933.05,y:616.05,startPosition:2},0).wait(1).to({x:938.95,y:600.7,startPosition:3},0).wait(1).to({x:944.85,y:585.35,startPosition:4},0).wait(1).to({x:950.75,y:570,startPosition:5},0).wait(1).to({x:956.6,y:554.65,startPosition:6},0).wait(1).to({x:962.5,y:539.3,startPosition:7},0).wait(1).to({x:968.4,y:523.95,startPosition:8},0).wait(1).to({x:974.3,y:508.65,startPosition:9},0).wait(1).to({x:980.2,y:493.3,startPosition:10},0).wait(1).to({x:986.05,y:477.95,startPosition:11},0).wait(1).to({x:991.95,y:462.6,startPosition:12},0).wait(1).to({x:997.85,y:447.25,startPosition:13},0).wait(1).to({x:1003.75,y:431.9,startPosition:14},0).wait(1).to({x:1009.65,y:416.55,startPosition:15},0).wait(1).to({x:1015.5,y:401.25,startPosition:16},0).wait(1).to({x:1021.4,y:385.9,startPosition:17},0).wait(1).to({x:1027.3,y:370.55,startPosition:18},0).wait(1).to({x:1033.2,y:355.2,startPosition:19},0).wait(1).to({x:1039.1,y:339.85,startPosition:20},0).wait(1).to({x:1044.95,y:324.5,startPosition:21},0).wait(1).to({x:1050.85,y:309.15,startPosition:0},0).wait(1).to({x:1056.75,y:293.85,startPosition:1},0).wait(1).to({x:1062.65,y:278.5,startPosition:2},0).wait(1).to({x:1068.55,y:263.15,startPosition:3},0).wait(1).to({x:1074.4,y:247.8,startPosition:4},0).wait(1).to({x:1080.3,y:232.45,startPosition:5},0).wait(1).to({x:1086.2,y:217.1,startPosition:6},0).wait(1).to({x:1092.1,y:201.75,startPosition:7},0).wait(1).to({x:1097.95,y:186.4,startPosition:8},0).wait(1).to({x:1106.5,y:209.05,startPosition:9},0).wait(1).to({x:1115,y:231.65,startPosition:10},0).wait(1).to({x:1123.5,y:254.3,startPosition:11},0).wait(1).to({x:1132,y:276.9,startPosition:12},0).wait(1).to({x:1140.5,y:299.5,startPosition:13},0).wait(1).to({x:1149,y:322.15,startPosition:14},0).wait(1).to({x:1157.5,y:344.75,startPosition:15},0).wait(1).to({x:1166,y:367.35,startPosition:16},0).wait(1).to({x:1174.5,y:390,startPosition:17},0).wait(1).to({x:1183,y:412.6,startPosition:18},0).wait(1).to({x:1191.5,y:435.2,startPosition:19},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Smiley_Jump = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Smiley_Jump
	this.instance = new lib.Smiley("synched",0);
	this.instance.setTransform(757.15,574.2,0.0236,0.0236,21.8426);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(125).to({_off:false},0).wait(1).to({regX:74,regY:74.3,scaleX:0.0331,scaleY:0.0331,rotation:21.8493,x:762.35,y:573.75,startPosition:1},0).wait(1).to({scaleX:0.0426,scaleY:0.0426,x:766.7,y:571.25,startPosition:2},0).wait(1).to({scaleX:0.052,scaleY:0.052,x:771.2,y:568.85,startPosition:3},0).wait(1).to({scaleX:0.0615,scaleY:0.0615,x:775.85,y:566.6,startPosition:4},0).wait(1).to({scaleX:0.071,scaleY:0.071,x:780.55,y:564.45,startPosition:5},0).wait(1).to({scaleX:0.0804,scaleY:0.0804,x:785.4,y:562.45,startPosition:6},0).wait(1).to({scaleX:0.0899,scaleY:0.0899,x:790.25,y:560.65,startPosition:7},0).wait(1).to({scaleX:0.0993,scaleY:0.0993,x:795.25,y:558.9,startPosition:8},0).wait(1).to({scaleX:0.1088,scaleY:0.1088,x:800.3,y:557.35,startPosition:9},0).wait(1).to({scaleX:0.1183,scaleY:0.1183,x:805.5,y:555.95,startPosition:10},0).wait(1).to({scaleX:0.1277,scaleY:0.1277,x:810.7,y:554.8,startPosition:11},0).wait(1).to({scaleX:0.1372,scaleY:0.1372,x:816.05,y:553.9,startPosition:12},0).wait(1).to({scaleX:0.1467,scaleY:0.1467,x:821.5,y:553.3,startPosition:13},0).wait(1).to({scaleX:0.1561,scaleY:0.1561,x:827.1,y:553.05,startPosition:14},0).wait(1).to({scaleX:0.1656,scaleY:0.1656,x:832.7,y:553.35,startPosition:15},0).wait(1).to({scaleX:0.175,scaleY:0.175,x:838.35,y:554.3,startPosition:16},0).wait(1).to({scaleX:0.1845,scaleY:0.1845,x:843.95,y:556.25,startPosition:17},0).wait(1).to({scaleX:0.194,scaleY:0.194,x:849.15,y:559.4,startPosition:18},0).wait(1).to({scaleX:0.2034,scaleY:0.2034,x:853.55,y:563.7,startPosition:19},0).wait(1).to({scaleX:0.2129,scaleY:0.2129,x:856.7,y:569,startPosition:20},0).wait(1).to({scaleX:0.2223,scaleY:0.2223,x:858.85,y:574.85,startPosition:21},0).wait(1).to({scaleX:0.2318,scaleY:0.2318,x:860.7,y:580.95,startPosition:22},0).wait(1).to({scaleX:0.2413,scaleY:0.2413,x:862.35,y:587,startPosition:23},0).wait(1).to({scaleX:0.2507,scaleY:0.2507,x:863.75,y:593.1,startPosition:24},0).wait(1).to({scaleX:0.2602,scaleY:0.2602,x:865.1,y:599.2,startPosition:25},0).wait(1).to({scaleX:0.2697,scaleY:0.2697,x:866.35,y:605.35,startPosition:26},0).wait(1).to({scaleX:0.2791,scaleY:0.2791,x:867.5,y:611.5,startPosition:27},0).wait(1).to({scaleX:0.2886,scaleY:0.2886,x:868.5,y:617.65,startPosition:28},0).wait(1).to({scaleX:0.298,scaleY:0.298,x:869.45,y:623.8,startPosition:29},0).wait(1).to({scaleX:0.3075,scaleY:0.3075,x:870.3,y:630,startPosition:30},0).wait(1).to({scaleX:0.317,scaleY:0.317,x:871.05,y:636.2,startPosition:31},0).wait(1).to({scaleX:0.3264,scaleY:0.3264,x:871.65,y:642.4,startPosition:32},0).wait(1).to({scaleX:0.3359,scaleY:0.3359,x:872.15,y:648.55,startPosition:33},0).wait(1).to({scaleX:0.3454,scaleY:0.3454,x:872.65,y:654.75,startPosition:34},0).wait(1).to({scaleX:0.3548,scaleY:0.3548,x:873.05,y:660.95,startPosition:35},0).wait(1).to({scaleX:0.3643,scaleY:0.3643,x:873.45,y:667.15,startPosition:36},0).wait(1).to({scaleX:0.3737,scaleY:0.3737,x:873.75,y:673.35,startPosition:37},0).wait(1).to({scaleX:0.3832,scaleY:0.3832,x:874.05,y:679.6,startPosition:38},0).wait(1).to({scaleX:0.3927,scaleY:0.3927,x:874.3,y:685.8,startPosition:39},0).wait(1).to({scaleX:0.4021,scaleY:0.4021,x:874.55,y:691.95,startPosition:0},0).wait(1).to({scaleX:0.4116,scaleY:0.4116,x:874.7,y:698.2,startPosition:1},0).wait(1).to({scaleX:0.421,scaleY:0.421,x:874.9,y:704.4,startPosition:2},0).wait(1).to({scaleX:0.4305,scaleY:0.4305,x:875.05,y:710.6,startPosition:3},0).wait(1).to({scaleX:0.44,scaleY:0.44,x:875.15,y:716.75,startPosition:4},0).wait(1).to({scaleX:0.4494,scaleY:0.4494,x:875.2,y:723,startPosition:5},0).wait(1).to({scaleX:0.4589,scaleY:0.4589,x:875.25,y:729.2,startPosition:6},0).wait(1).to({scaleX:0.4684,scaleY:0.4684,y:735.35,startPosition:7},0).wait(1).to({scaleX:0.4778,scaleY:0.4778,x:875.2,y:741.5,startPosition:8},0).wait(1).to({scaleX:0.4873,scaleY:0.4873,x:875.05,y:747.65,startPosition:9},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Smiley = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Smiley
	this.instance = new lib.Smiley("synched",0);
	this.instance.setTransform(1195.25,-111.5,1,1,0,0,0,74,62.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(296).to({_off:false},0).wait(1).to({regY:74.3,x:1193.55,y:-80.2,startPosition:1},0).wait(1).to({x:1191.85,y:-61.1,startPosition:2},0).wait(1).to({x:1190.15,y:-42.05,startPosition:3},0).wait(1).to({x:1188.5,y:-22.95,startPosition:4},0).wait(1).to({x:1186.8,y:-3.9,startPosition:5},0).wait(1).to({x:1185.1,y:15.2,startPosition:6},0).wait(1).to({x:1183.45,y:34.3,startPosition:7},0).wait(1).to({x:1181.75,y:53.35,startPosition:8},0).wait(1).to({x:1180.05,y:72.45,startPosition:9},0).wait(1).to({x:1178.35,y:91.45,startPosition:10},0).wait(1).to({x:1176.7,y:110.55,startPosition:11},0).wait(1).to({x:1175,y:129.6,startPosition:12},0).wait(1).to({x:1173.3,y:148.7,startPosition:13},0).wait(1).to({x:1171.65,y:167.8,startPosition:14},0).wait(1).to({x:1169.95,y:186.85,startPosition:15},0).wait(1).to({x:1168.25,y:205.95,startPosition:16},0).wait(1).to({x:1166.55,y:225,startPosition:17},0).wait(1).to({x:1164.9,y:244.1,startPosition:18},0).wait(1).to({x:1163.2,y:263.2,startPosition:19},0).wait(1).to({x:1161.5,y:282.25,startPosition:20},0).wait(1).to({x:1159.85,y:301.35,startPosition:21},0).wait(1).to({x:1158.15,y:320.4,startPosition:22},0).wait(1).to({x:1156.45,y:339.5,startPosition:23},0).wait(1).to({x:1154.75,y:358.55,startPosition:24},0).wait(1).to({x:1153.1,y:377.65,startPosition:25},0).wait(1).to({x:1151.4,y:396.75,startPosition:26},0).wait(1).to({x:1149.7,y:415.8,startPosition:27},0).wait(1).to({x:1148.05,y:434.9,startPosition:28},0).wait(1).to({x:1146.35,y:453.95,startPosition:29},0).wait(1).to({x:1144.65,y:473.05,startPosition:30},0).wait(1).to({x:1142.95,y:492.1,startPosition:31},0).wait(1).to({x:1141.3,y:511.2,startPosition:32},0).wait(1).to({x:1139.6,y:530.3,startPosition:33},0).wait(1).to({x:1137.9,y:549.35,startPosition:34},0).wait(1).to({x:1136.25,y:568.45,startPosition:35},0).wait(1).to({x:1134.55,y:587.5,startPosition:36},0).wait(1).to({x:1132.85,y:606.6,startPosition:37},0).wait(1).to({x:1131.2,y:625.7,startPosition:38},0).wait(1).to({x:1125.2,y:610.15,startPosition:39},0).wait(1).to({x:1119.25,y:594.65,startPosition:0},0).wait(1).to({x:1113.3,y:579.15,startPosition:1},0).wait(1).to({x:1107.35,y:563.6,startPosition:2},0).wait(1).to({x:1101.4,y:548.1,startPosition:3},0).wait(1).to({x:1095.45,y:532.6,startPosition:4},0).wait(1).to({x:1089.5,y:517.05,startPosition:5},0).wait(1).to({x:1083.55,y:501.55,startPosition:6},0).wait(1).to({x:1077.6,y:486.05,startPosition:7},0).wait(1).to({x:1071.65,y:470.55,startPosition:8},0).wait(1).to({x:1065.7,y:455,startPosition:9},0).wait(1).to({x:1059.75,y:439.5,startPosition:10},0).wait(1).to({x:1053.75,y:424,startPosition:11},0).wait(1).to({x:1047.8,y:408.45,startPosition:12},0).wait(1).to({x:1041.85,y:392.95,startPosition:13},0).wait(1).to({x:1035.9,y:377.45,startPosition:14},0).wait(1).to({x:1029.95,y:361.95,startPosition:15},0).wait(1).to({x:1024,y:346.4,startPosition:16},0).wait(1).to({x:1018.05,y:330.9,startPosition:17},0).wait(1).to({x:1012.1,y:315.4,startPosition:18},0).wait(1).to({x:1006.15,y:299.85,startPosition:19},0).wait(1).to({x:1000.2,y:284.35,startPosition:20},0).wait(1).to({x:994.25,y:268.85,startPosition:21},0).wait(1).to({x:988.3,y:253.35,startPosition:22},0).wait(1).to({x:981.15,y:271.05,startPosition:23},0).wait(1).to({x:974.05,y:288.8,startPosition:24},0).wait(1).to({x:966.9,y:306.5,startPosition:25},0).wait(1).to({x:959.8,y:324.25,startPosition:26},0).wait(1).to({x:952.65,y:341.95,startPosition:27},0).wait(1).to({x:945.55,y:359.7,startPosition:28},0).wait(1).to({x:938.45,y:377.45,startPosition:29},0).wait(1).to({x:931.3,y:395.15,startPosition:30},0).wait(1).to({x:924.2,y:412.9,startPosition:31},0).wait(1).to({x:917.05,y:430.6,startPosition:32},0).wait(1).to({x:909.95,y:448.35,startPosition:33},0).wait(1).to({x:902.8,y:466.05,startPosition:34},0).wait(1).to({x:895.7,y:483.8,startPosition:35},0).wait(1).to({x:888.6,y:501.55,startPosition:36},0).wait(1).to({x:881.45,y:519.25,startPosition:37},0).wait(1).to({x:874.35,y:537,startPosition:38},0).wait(1).to({x:867.2,y:554.7,startPosition:39},0).wait(1).to({x:860.1,y:572.45,startPosition:0},0).wait(1).to({x:852.95,y:590.15,startPosition:1},0).wait(1).to({x:845.85,y:607.9,startPosition:2},0).wait(1).to({x:838.75,y:625.65,startPosition:3},0).wait(1).to({x:835,y:617.35,startPosition:4},0).wait(1).to({x:831.3,y:609.1,startPosition:5},0).wait(1).to({x:827.55,y:600.8,startPosition:6},0).wait(1).to({x:823.85,y:592.55,startPosition:7},0).wait(1).to({x:820.1,y:584.25,startPosition:8},0).wait(1).to({x:816.4,y:576,startPosition:9},0).wait(1).to({x:812.65,y:567.75,startPosition:10},0).wait(1).to({x:808.95,y:559.45,startPosition:11},0).wait(1).to({x:805.25,y:551.2,startPosition:12},0).wait(1).to({x:801.5,y:542.9,startPosition:13},0).wait(1).to({x:797.8,y:534.65,startPosition:14},0).wait(1).to({x:794.05,y:526.35,startPosition:15},0).wait(1).to({x:790.35,y:518.1,startPosition:16},0).wait(1).to({x:786.6,y:509.85,startPosition:17},0).wait(1).to({x:782.9,y:501.55,startPosition:18},0).wait(1).to({x:779.15,y:493.3,startPosition:19},0).wait(1).to({x:775.45,y:485,startPosition:20},0).wait(1).to({x:771.75,y:476.75,startPosition:21},0).wait(1).to({x:768,y:468.45,startPosition:22},0).wait(1).to({x:764.3,y:460.2,startPosition:23},0).wait(1).to({x:760.55,y:451.95,startPosition:24},0).wait(1).to({x:756.85,y:443.65,startPosition:25},0).wait(1).to({x:753.1,y:435.4,startPosition:26},0).wait(1).to({x:749.4,y:427.1,startPosition:27},0).wait(1).to({x:745.65,y:418.85,startPosition:28},0).wait(1).to({x:741.95,y:410.6,startPosition:29},0).wait(1).to({x:738.25,y:402.3,startPosition:30},0).wait(1).to({x:734.5,y:394.05,startPosition:31},0).wait(1).to({x:730.8,y:385.75,startPosition:32},0).wait(1).to({x:727.05,y:377.5,startPosition:33},0).wait(1).to({x:723.35,y:369.2,startPosition:34},0).wait(1).to({x:719.6,y:360.95,startPosition:35},0).wait(1).to({x:715.9,y:352.7,startPosition:36},0).wait(1).to({x:712.15,y:344.4,startPosition:37},0).wait(1).to({x:708.45,y:336.15,startPosition:38},0).wait(1).to({x:704.75,y:327.85,startPosition:39},0).wait(1).to({x:701,y:319.6,startPosition:0},0).wait(1).to({x:697.3,y:311.3,startPosition:1},0).wait(1).to({x:693.55,y:303.05,startPosition:2},0).wait(1).to({x:689.85,y:294.8,startPosition:3},0).wait(1).to({x:686.1,y:286.5,startPosition:4},0).wait(1).to({x:682.4,y:278.25,startPosition:5},0).wait(1).to({x:678.65,y:269.95,startPosition:6},0).wait(1).to({x:674.95,y:261.7,startPosition:7},0).wait(1).to({x:671.25,y:253.45,startPosition:8},0).wait(1).to({x:664.1,y:262.3,startPosition:9},0).wait(1).to({x:657,y:271.15,startPosition:10},0).wait(1).to({x:649.9,y:280,startPosition:11},0).wait(1).to({x:642.8,y:288.9,startPosition:12},0).wait(1).to({x:635.7,y:297.75,startPosition:13},0).wait(1).to({x:628.6,y:306.6,startPosition:14},0).wait(1).to({x:621.5,y:315.5,startPosition:15},0).wait(1).to({x:614.4,y:324.35,startPosition:16},0).wait(1).to({x:607.25,y:333.2,startPosition:17},0).wait(1).to({x:600.15,y:342.1,startPosition:18},0).wait(1).to({x:593.05,y:350.95,startPosition:19},0).wait(1).to({x:585.95,y:359.8,startPosition:20},0).wait(1).to({x:578.85,y:368.7,startPosition:21},0).wait(1).to({x:571.75,y:377.55,startPosition:22},0).wait(1).to({x:564.65,y:386.4,startPosition:23},0).wait(1).to({x:557.55,y:395.3,startPosition:24},0).wait(1).to({x:550.4,y:404.15,startPosition:25},0).wait(1).to({x:543.3,y:413,startPosition:26},0).wait(1).to({x:536.2,y:421.9,startPosition:27},0).wait(1).to({x:529.1,y:430.75,startPosition:28},0).wait(1).to({x:522,y:439.6,startPosition:29},0).wait(1).to({x:514.9,y:448.45,startPosition:30},0).wait(1).to({x:507.8,y:457.35,startPosition:31},0).wait(1).to({x:500.7,y:466.2,startPosition:32},0).wait(1).to({x:493.55,y:475.05,startPosition:33},0).wait(1).to({x:486.45,y:483.95,startPosition:34},0).wait(1).to({x:479.35,y:492.8,startPosition:35},0).wait(1).to({x:472.25,y:501.65,startPosition:36},0).wait(1).to({x:465.15,y:510.55,startPosition:37},0).wait(1).to({x:458.05,y:519.4,startPosition:38},0).wait(1).to({x:450.95,y:528.25,startPosition:39},0).wait(1).to({x:443.85,y:537.15,startPosition:0},0).wait(1).to({x:436.7,y:546,startPosition:1},0).wait(1).to({x:429.6,y:554.85,startPosition:2},0).wait(1).to({x:422.5,y:563.75,startPosition:3},0).wait(1).to({x:415.4,y:572.6,startPosition:4},0).wait(1).to({x:408.3,y:581.45,startPosition:5},0).wait(1).to({x:401.2,y:590.35,startPosition:6},0).wait(1).to({x:394.1,y:599.2,startPosition:7},0).wait(1).to({x:387,y:608.05,startPosition:8},0).wait(1).to({x:379.9,y:616.95,startPosition:9},0).wait(1).to({x:389.35,y:609.3,startPosition:10},0).wait(1).to({x:398.85,y:601.65,startPosition:11},0).wait(1).to({x:408.35,y:594,startPosition:12},0).wait(1).to({x:417.85,y:586.35,startPosition:13},0).wait(1).to({x:427.3,y:578.7,startPosition:14},0).wait(1).to({x:436.8,y:571.1,startPosition:15},0).wait(1).to({x:446.3,y:563.45,startPosition:16},0).wait(1).to({x:455.8,y:555.8,startPosition:17},0).wait(1).to({x:465.3,y:548.15,startPosition:18},0).wait(1).to({x:474.75,y:540.5,startPosition:19},0).wait(1).to({x:484.25,y:532.9,startPosition:20},0).wait(1).to({x:493.75,y:525.25,startPosition:21},0).wait(1).to({x:503.25,y:517.6,startPosition:22},0).wait(1).to({x:512.7,y:509.95,startPosition:23},0).wait(1).to({x:522.2,y:502.3,startPosition:24},0).wait(1).to({x:531.7,y:494.7,startPosition:25},0).wait(1).to({x:541.2,y:487.05,startPosition:26},0).wait(1).to({x:550.7,y:479.4,startPosition:27},0).wait(1).to({x:560.15,y:471.75,startPosition:28},0).wait(1).to({x:569.65,y:464.1,startPosition:29},0).wait(1).to({x:579.15,y:456.5,startPosition:30},0).wait(1).to({x:588.65,y:448.85,startPosition:31},0).wait(1).to({x:598.1,y:441.2,startPosition:32},0).wait(1).to({x:607.6,y:433.55,startPosition:33},0).wait(1).to({x:617.1,y:425.9,startPosition:34},0).wait(1).to({x:626.6,y:418.3,startPosition:35},0).wait(1).to({x:636.1,y:410.65,startPosition:36},0).wait(1).to({x:645.55,y:403,startPosition:37},0).wait(1).to({x:655.05,y:395.35,startPosition:38},0).wait(1).to({x:664.55,y:387.7,startPosition:39},0).wait(1).to({x:674.05,y:380.1,startPosition:0},0).wait(1).to({x:683.5,y:372.45,startPosition:1},0).wait(1).to({x:693,y:364.8,startPosition:2},0).wait(1).to({x:702.5,y:357.15,startPosition:3},0).wait(1).to({x:712,y:349.5,startPosition:4},0).wait(1).to({x:721.5,y:341.9,startPosition:5},0).wait(1).to({x:730.95,y:334.25,startPosition:6},0).wait(1).to({x:740.45,y:326.6,startPosition:7},0).wait(1).to({x:749.95,y:318.95,startPosition:8},0).wait(1).to({x:759.45,y:311.3,startPosition:9},0).wait(1).to({x:768.95,y:303.7,startPosition:10},0).wait(1).to({x:774.2,y:311.55,startPosition:11},0).wait(1).to({x:779.45,y:319.45,startPosition:12},0).wait(1).to({x:784.75,y:327.35,startPosition:13},0).wait(1).to({x:790,y:335.25,startPosition:14},0).wait(1).to({x:795.3,y:343.15,startPosition:15},0).wait(1).to({x:800.55,y:351.05,startPosition:16},0).wait(1).to({x:805.85,y:358.95,startPosition:17},0).wait(1).to({x:811.1,y:366.85,startPosition:18},0).wait(1).to({x:816.4,y:374.7,startPosition:19},0).wait(1).to({x:821.65,y:382.6,startPosition:20},0).wait(1).to({x:826.95,y:390.5,startPosition:21},0).wait(1).to({x:832.2,y:398.4,startPosition:22},0).wait(1).to({x:837.5,y:406.3,startPosition:23},0).wait(1).to({x:842.75,y:414.2,startPosition:24},0).wait(1).to({x:848,y:422.1,startPosition:25},0).wait(1).to({x:853.3,y:430,startPosition:26},0).wait(1).to({x:858.55,y:437.9,startPosition:27},0).wait(1).to({x:863.85,y:445.75,startPosition:28},0).wait(1).to({x:869.1,y:453.65,startPosition:29},0).wait(1).to({x:874.4,y:461.55,startPosition:30},0).wait(1).to({x:879.65,y:469.45,startPosition:31},0).wait(1).to({x:884.95,y:477.35,startPosition:32},0).wait(1).to({x:890.2,y:485.25,startPosition:33},0).wait(1).to({x:895.5,y:493.15,startPosition:34},0).wait(1).to({x:900.75,y:501.05,startPosition:35},0).wait(1).to({x:906.05,y:508.9,startPosition:36},0).wait(1).to({x:911.3,y:516.8,startPosition:37},0).wait(1).to({x:916.6,y:524.7,startPosition:38},0).wait(1).to({x:921.85,y:532.6,startPosition:39},0).wait(1).to({x:927.1,y:540.5,startPosition:0},0).wait(1).to({x:932.4,y:548.4,startPosition:1},0).wait(1).to({x:937.65,y:556.3,startPosition:2},0).wait(1).to({x:942.95,y:564.2,startPosition:3},0).wait(1).to({x:948.2,y:572.1,startPosition:4},0).wait(1).to({x:953.5,y:579.95,startPosition:5},0).wait(1).to({x:958.75,y:587.85,startPosition:6},0).wait(1).to({x:964.05,y:595.75,startPosition:7},0).wait(1).to({x:969.3,y:603.65,startPosition:8},0).wait(1).to({x:974.6,y:611.55,startPosition:9},0).wait(1).to({x:979.85,y:619.45,startPosition:10},0).wait(1).to({x:985.15,y:627.35,startPosition:11},0).wait(1).to({x:990.4,y:635.25,startPosition:12},0).wait(1).to({x:995.7,y:643.15,startPosition:13},0).wait(1).to({x:1001.05,y:631.85,startPosition:14},0).wait(1).to({x:1006.4,y:620.55,startPosition:15},0).wait(1).to({x:1011.8,y:609.3,startPosition:16},0).wait(1).to({x:1017.15,y:598,startPosition:17},0).wait(1).to({x:1022.5,y:586.75,startPosition:18},0).wait(1).to({x:1027.9,y:575.45,startPosition:19},0).wait(1).to({x:1033.25,y:564.2,startPosition:20},0).wait(1).to({x:1038.6,y:552.9,startPosition:21},0).wait(1).to({x:1044,y:541.65,startPosition:22},0).wait(1).to({x:1049.35,y:530.35,startPosition:23},0).wait(1).to({x:1054.7,y:519.1,startPosition:24},0).wait(1).to({x:1060.1,y:507.8,startPosition:25},0).wait(1).to({x:1065.45,y:496.55,startPosition:26},0).wait(1).to({x:1070.85,y:485.25,startPosition:27},0).wait(1).to({x:1076.2,y:474,startPosition:28},0).wait(1).to({x:1081.55,y:462.7,startPosition:29},0).wait(1).to({x:1086.95,y:451.45,startPosition:30},0).wait(1).to({x:1092.3,y:440.15,startPosition:31},0).wait(1).to({x:1097.65,y:428.85,startPosition:32},0).wait(1).to({x:1103.05,y:417.6,startPosition:33},0).wait(1).to({x:1108.4,y:406.3,startPosition:34},0).wait(1).to({x:1113.75,y:395.05,startPosition:35},0).wait(1).to({x:1119.15,y:383.75,startPosition:36},0).wait(1).to({x:1124.5,y:372.5,startPosition:37},0).wait(1).to({x:1129.9,y:361.2,startPosition:38},0).wait(1).to({x:1135.25,y:349.95,startPosition:39},0).wait(1).to({x:1140.6,y:338.65,startPosition:0},0).wait(1).to({x:1146,y:327.4,startPosition:1},0).wait(1).to({x:1151.35,y:316.1,startPosition:2},0).wait(1).to({x:1156.7,y:304.85,startPosition:3},0).wait(1).to({x:1162.1,y:293.55,startPosition:4},0).wait(1).to({x:1167.45,y:282.3,startPosition:5},0).wait(1).to({x:1172.8,y:271,startPosition:6},0).wait(1).to({x:1178.2,y:259.75,startPosition:7},0).wait(1).to({x:1183.55,y:248.45,startPosition:8},0).wait(1).to({x:1188.95,y:237.2,startPosition:9},0).wait(1).to({x:1179.8,y:257.15,startPosition:10},0).wait(1).to({x:1170.65,y:277.15,startPosition:11},0).wait(1).to({x:1161.5,y:297.1,startPosition:12},0).wait(1).to({x:1152.4,y:317.1,startPosition:13},0).wait(1).to({x:1143.25,y:337.05,startPosition:14},0).wait(1).to({x:1134.1,y:357.05,startPosition:15},0).wait(1).to({x:1125,y:377.05,startPosition:16},0).wait(1).to({x:1115.85,y:397,startPosition:17},0).wait(1).to({x:1106.7,y:417,startPosition:18},0).wait(1).to({x:1097.55,y:436.95,startPosition:19},0).wait(1).to({x:1088.45,y:456.95,startPosition:20},0).wait(1).to({x:1079.3,y:476.9,startPosition:21},0).wait(1).to({x:1070.15,y:496.9,startPosition:22},0).wait(1).to({x:1061.05,y:516.9,startPosition:23},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Love_Jump = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Love_Jump
	this.instance = new lib.love("synched",0);
	this.instance.setTransform(751.1,573.4,0.0158,0.0158,23.3797,0,0,74.5,84.7);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(205).to({_off:false},0).wait(1).to({regX:109,regY:109,scaleX:0.0198,scaleY:0.0198,rotation:23.4081,x:760.2,y:568.55,startPosition:1},0).wait(1).to({scaleX:0.0237,scaleY:0.0237,x:767.75,y:564.35,startPosition:2},0).wait(1).to({scaleX:0.0276,scaleY:0.0276,x:774.55,y:560.9,startPosition:3},0).wait(1).to({scaleX:0.0316,scaleY:0.0316,x:780.75,y:558.1,startPosition:4},0).wait(1).to({scaleX:0.0355,scaleY:0.0355,x:786.4,y:555.9,startPosition:5},0).wait(1).to({scaleX:0.0394,scaleY:0.0394,x:791.7,y:554.05,startPosition:6},0).wait(1).to({scaleX:0.0433,scaleY:0.0433,x:796.65,y:552.65,startPosition:7},0).wait(1).to({scaleX:0.0473,scaleY:0.0473,x:801.35,y:551.5,startPosition:8},0).wait(1).to({scaleX:0.0512,scaleY:0.0512,x:805.75,y:550.6,startPosition:9},0).wait(1).to({scaleX:0.0551,scaleY:0.0551,x:809.95,y:550.05,startPosition:10},0).wait(1).to({scaleX:0.059,scaleY:0.059,x:814,y:549.7,startPosition:11},0).wait(1).to({scaleX:0.0629,scaleY:0.0629,x:817.9,y:549.55,startPosition:12},0).wait(1).to({scaleX:0.0669,scaleY:0.0669,x:821.55,y:549.7,startPosition:13},0).wait(1).to({scaleX:0.0708,scaleY:0.0708,x:825.15,y:549.95,startPosition:14},0).wait(1).to({scaleX:0.0747,scaleY:0.0747,x:828.5,y:550.4,startPosition:15},0).wait(1).to({scaleX:0.0786,scaleY:0.0786,x:831.85,y:551.1,startPosition:16},0).wait(1).to({scaleX:0.0826,scaleY:0.0826,x:835.05,y:551.9,startPosition:17},0).wait(1).to({scaleX:0.0865,scaleY:0.0865,x:838.1,y:552.95,startPosition:18},0).wait(1).to({scaleX:0.0904,scaleY:0.0904,x:841.1,y:554.1,startPosition:19},0).wait(1).to({scaleX:0.0943,scaleY:0.0943,x:844,y:555.5,startPosition:20},0).wait(1).to({scaleX:0.0983,scaleY:0.0983,x:846.85,y:557,startPosition:21},0).wait(1).to({scaleX:0.1022,scaleY:0.1022,x:849.55,y:558.6,startPosition:22},0).wait(1).to({scaleX:0.1061,scaleY:0.1061,x:852.15,y:560.5,startPosition:23},0).wait(1).to({scaleX:0.11,scaleY:0.11,x:854.75,y:562.45,startPosition:24},0).wait(1).to({scaleX:0.114,scaleY:0.114,x:857.25,y:564.65,startPosition:25},0).wait(1).to({scaleX:0.1179,scaleY:0.1179,x:859.7,y:566.95,startPosition:26},0).wait(1).to({scaleX:0.1218,scaleY:0.1218,x:862.1,y:569.45,startPosition:27},0).wait(1).to({scaleX:0.1257,scaleY:0.1257,x:864.4,y:572.15,startPosition:28},0).wait(1).to({scaleX:0.1296,scaleY:0.1296,x:866.6,y:574.95,startPosition:29},0).wait(1).to({scaleX:0.1336,scaleY:0.1336,x:868.8,y:578,startPosition:30},0).wait(1).to({scaleX:0.1375,scaleY:0.1375,x:870.95,y:581.2,startPosition:0},0).wait(1).to({scaleX:0.1414,scaleY:0.1414,x:873.05,y:584.6,startPosition:1},0).wait(1).to({scaleX:0.1453,scaleY:0.1453,x:875,y:588.25,startPosition:2},0).wait(1).to({scaleX:0.1493,scaleY:0.1493,x:877,y:592.05,startPosition:3},0).wait(1).to({scaleX:0.1532,scaleY:0.1532,x:878.85,y:596.1,startPosition:4},0).wait(1).to({scaleX:0.1571,scaleY:0.1571,x:880.7,y:600.4,startPosition:5},0).wait(1).to({scaleX:0.161,scaleY:0.161,x:882.55,y:604.95,startPosition:6},0).wait(1).to({scaleX:0.165,scaleY:0.165,x:884.25,y:609.8,startPosition:7},0).wait(1).to({scaleX:0.1689,scaleY:0.1689,x:885.95,y:614.9,startPosition:8},0).wait(1).to({scaleX:0.1728,scaleY:0.1728,x:887.55,y:620.4,startPosition:9},0).wait(1).to({scaleX:0.1767,scaleY:0.1767,x:889.15,y:626.25,startPosition:10},0).wait(1).to({scaleX:0.1807,scaleY:0.1807,x:890.65,y:632.4,startPosition:11},0).wait(1).to({scaleX:0.1846,scaleY:0.1846,x:892.1,y:639.1,startPosition:12},0).wait(1).to({scaleX:0.1885,scaleY:0.1885,x:893.5,y:646.25,startPosition:13},0).wait(1).to({scaleX:0.1924,scaleY:0.1924,x:894.8,y:654.1,startPosition:14},0).wait(1).to({scaleX:0.1963,scaleY:0.1963,x:896.05,y:662.6,startPosition:15},0).wait(1).to({scaleX:0.2003,scaleY:0.2003,x:897.25,y:671.95,startPosition:16},0).wait(1).to({scaleX:0.2042,scaleY:0.2042,x:898.25,y:682.4,startPosition:17},0).wait(1).to({scaleX:0.2081,scaleY:0.2081,x:899.2,y:694.3,startPosition:18},0).wait(1).to({scaleX:0.212,scaleY:0.212,x:899.95,y:708.25,startPosition:19},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Love = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Love
	this.instance = new lib.love("synched",0);
	this.instance.setTransform(323.95,-75.35,0.7307,0.6901,0,0,0,109.5,109);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(369).to({_off:false},0).wait(1).to({regX:109,x:324.05,y:-55.15,startPosition:1},0).wait(1).to({x:324.55,y:-34.95,startPosition:2},0).wait(1).to({x:325,y:-14.75,startPosition:3},0).wait(1).to({x:325.5,y:5.45,startPosition:4},0).wait(1).to({x:325.95,y:25.6,startPosition:5},0).wait(1).to({x:326.45,y:45.8,startPosition:6},0).wait(1).to({x:326.95,y:66,startPosition:7},0).wait(1).to({x:327.4,y:86.15,startPosition:8},0).wait(1).to({x:327.9,y:106.3,startPosition:9},0).wait(1).to({x:328.35,y:126.5,startPosition:10},0).wait(1).to({x:328.85,y:146.7,startPosition:11},0).wait(1).to({x:329.35,y:166.9,startPosition:12},0).wait(1).to({x:329.8,y:187.05,startPosition:13},0).wait(1).to({x:330.3,y:207.25,startPosition:14},0).wait(1).to({x:330.75,y:227.45,startPosition:15},0).wait(1).to({x:331.25,y:247.65,startPosition:16},0).wait(1).to({x:331.75,y:267.85,startPosition:17},0).wait(1).to({x:332.2,y:288,startPosition:18},0).wait(1).to({x:332.7,y:308.2,startPosition:19},0).wait(1).to({x:333.15,y:328.4,startPosition:20},0).wait(1).to({x:333.65,y:348.6,startPosition:21},0).wait(1).to({x:334.15,y:368.75,startPosition:22},0).wait(1).to({x:334.6,y:388.95,startPosition:23},0).wait(1).to({x:335.1,y:409.15,startPosition:24},0).wait(1).to({x:335.55,y:429.35,startPosition:25},0).wait(1).to({x:336.05,y:449.55,startPosition:26},0).wait(1).to({x:336.55,y:469.7,startPosition:27},0).wait(1).to({x:337,y:489.9,startPosition:28},0).wait(1).to({x:337.5,y:510.1,startPosition:29},0).wait(1).to({x:337.95,y:530.3,startPosition:30},0).wait(1).to({x:338.45,y:550.45,startPosition:0},0).wait(1).to({x:338.95,y:570.65,startPosition:1},0).wait(1).to({x:339.4,y:590.85,startPosition:2},0).wait(1).to({x:339.9,y:611.05,startPosition:3},0).wait(1).to({x:340.35,y:631.2,startPosition:4},0).wait(1).to({x:351.8,y:620.9,startPosition:5},0).wait(1).to({x:363.2,y:610.55,startPosition:6},0).wait(1).to({x:374.6,y:600.2,startPosition:7},0).wait(1).to({x:386,y:589.85,startPosition:8},0).wait(1).to({x:397.4,y:579.5,startPosition:9},0).wait(1).to({x:408.85,y:569.15,startPosition:10},0).wait(1).to({x:420.25,y:558.8,startPosition:11},0).wait(1).to({x:431.65,y:548.5,startPosition:12},0).wait(1).to({x:443.05,y:538.15,startPosition:13},0).wait(1).to({x:454.45,y:527.8,startPosition:14},0).wait(1).to({x:465.9,y:517.45,startPosition:15},0).wait(1).to({x:477.3,y:507.1,startPosition:16},0).wait(1).to({x:488.7,y:496.75,startPosition:17},0).wait(1).to({x:500.1,y:486.4,startPosition:18},0).wait(1).to({x:511.5,y:476.05,startPosition:19},0).wait(1).to({x:522.1,y:485,startPosition:20},0).wait(1).to({x:532.65,y:493.95,startPosition:21},0).wait(1).to({x:543.2,y:502.9,startPosition:22},0).wait(1).to({x:553.75,y:511.85,startPosition:23},0).wait(1).to({x:564.3,y:520.8,startPosition:24},0).wait(1).to({x:574.9,y:529.75,startPosition:25},0).wait(1).to({x:585.45,y:538.7,startPosition:26},0).wait(1).to({x:596,y:547.65,startPosition:27},0).wait(1).to({x:606.55,y:556.6,startPosition:28},0).wait(1).to({x:617.1,y:565.55,startPosition:29},0).wait(1).to({x:627.65,y:574.5,startPosition:30},0).wait(1).to({x:638.25,y:583.45,startPosition:0},0).wait(1).to({x:648.8,y:592.4,startPosition:1},0).wait(1).to({x:659.35,y:601.35,startPosition:2},0).wait(1).to({x:669.9,y:610.3,startPosition:3},0).wait(1).to({x:680.45,y:619.25,startPosition:4},0).wait(1).to({x:691,y:628.15,startPosition:5},0).wait(1).to({x:699.2,y:617.7,startPosition:6},0).wait(1).to({x:707.4,y:607.25,startPosition:7},0).wait(1).to({x:715.55,y:596.8,startPosition:8},0).wait(1).to({x:723.75,y:586.35,startPosition:9},0).wait(1).to({x:731.9,y:575.9,startPosition:10},0).wait(1).to({x:740.1,y:565.45,startPosition:11},0).wait(1).to({x:748.3,y:554.95,startPosition:12},0).wait(1).to({x:756.45,y:544.5,startPosition:13},0).wait(1).to({x:764.65,y:534.05,startPosition:14},0).wait(1).to({x:772.8,y:523.6,startPosition:15},0).wait(1).to({x:781,y:513.15,startPosition:16},0).wait(1).to({x:789.15,y:502.7,startPosition:17},0).wait(1).to({x:797.35,y:492.2,startPosition:18},0).wait(1).to({x:805.55,y:481.75,startPosition:19},0).wait(1).to({x:813.7,y:471.3,startPosition:20},0).wait(1).to({x:821.9,y:460.85,startPosition:21},0).wait(1).to({x:830.05,y:450.4,startPosition:22},0).wait(1).to({x:838.25,y:439.95,startPosition:23},0).wait(1).to({x:846.4,y:429.45,startPosition:24},0).wait(1).to({x:854.6,y:419,startPosition:25},0).wait(1).to({x:862.8,y:408.55,startPosition:26},0).wait(1).to({x:870.95,y:398.1,startPosition:27},0).wait(1).to({x:879.15,y:387.65,startPosition:28},0).wait(1).to({x:887.3,y:377.2,startPosition:29},0).wait(1).to({x:895.5,y:366.75,startPosition:30},0).wait(1).to({x:903.7,y:356.25,startPosition:0},0).wait(1).to({x:911.85,y:345.8,startPosition:1},0).wait(1).to({x:920.05,y:335.35,startPosition:2},0).wait(1).to({x:928.2,y:324.9,startPosition:3},0).wait(1).to({x:936.4,y:314.45,startPosition:4},0).wait(1).to({x:944.55,y:304,startPosition:5},0).wait(1).to({x:952.75,y:293.5,startPosition:6},0).wait(1).to({x:960.95,y:283.05,startPosition:7},0).wait(1).to({x:969.1,y:272.6,startPosition:8},0).wait(1).to({x:977.3,y:262.15,startPosition:9},0).wait(1).to({x:985.45,y:251.7,startPosition:10},0).wait(1).to({x:993.65,y:241.25,startPosition:11},0).wait(1).to({x:1001.8,y:230.75,startPosition:12},0).wait(1).to({x:1006.35,y:240.2,startPosition:13},0).wait(1).to({x:1010.9,y:249.6,startPosition:14},0).wait(1).to({x:1015.45,y:259.05,startPosition:15},0).wait(1).to({x:1020,y:268.45,startPosition:16},0).wait(1).to({x:1024.55,y:277.9,startPosition:17},0).wait(1).to({x:1029.05,y:287.3,startPosition:18},0).wait(1).to({x:1033.6,y:296.75,startPosition:19},0).wait(1).to({x:1038.15,y:306.15,startPosition:20},0).wait(1).to({x:1042.7,y:315.6,startPosition:21},0).wait(1).to({x:1047.25,y:325,startPosition:22},0).wait(1).to({x:1051.8,y:334.45,startPosition:23},0).wait(1).to({x:1056.3,y:343.85,startPosition:24},0).wait(1).to({x:1060.85,y:353.3,startPosition:25},0).wait(1).to({x:1065.4,y:362.7,startPosition:26},0).wait(1).to({x:1069.95,y:372.15,startPosition:27},0).wait(1).to({x:1074.5,y:381.55,startPosition:28},0).wait(1).to({x:1079.05,y:391,startPosition:29},0).wait(1).to({x:1083.55,y:400.4,startPosition:30},0).wait(1).to({x:1088.1,y:409.85,startPosition:0},0).wait(1).to({x:1092.65,y:419.25,startPosition:1},0).wait(1).to({x:1097.2,y:428.65,startPosition:2},0).wait(1).to({x:1101.75,y:438.1,startPosition:3},0).wait(1).to({x:1106.3,y:447.5,startPosition:4},0).wait(1).to({x:1110.8,y:456.95,startPosition:5},0).wait(1).to({x:1115.35,y:466.35,startPosition:6},0).wait(1).to({x:1119.9,y:475.8,startPosition:7},0).wait(1).to({x:1124.45,y:485.2,startPosition:8},0).wait(1).to({x:1129,y:494.65,startPosition:9},0).wait(1).to({x:1133.55,y:504.05,startPosition:10},0).wait(1).to({x:1138.05,y:513.5,startPosition:11},0).wait(1).to({x:1142.6,y:522.9,startPosition:12},0).wait(1).to({x:1147.15,y:532.35,startPosition:13},0).wait(1).to({x:1151.7,y:541.75,startPosition:14},0).wait(1).to({x:1156.25,y:551.2,startPosition:15},0).wait(1).to({x:1160.8,y:560.6,startPosition:16},0).wait(1).to({x:1165.3,y:570.05,startPosition:17},0).wait(1).to({x:1169.85,y:579.45,startPosition:18},0).wait(1).to({x:1174.4,y:588.9,startPosition:19},0).wait(1).to({x:1178.95,y:598.3,startPosition:20},0).wait(1).to({x:1183.5,y:607.75,startPosition:21},0).wait(1).to({x:1188.05,y:617.15,startPosition:22},0).wait(1).to({x:1192.55,y:626.55,startPosition:23},0).wait(1).to({x:1183.6,y:615.65,startPosition:24},0).wait(1).to({x:1174.6,y:604.75,startPosition:25},0).wait(1).to({x:1165.6,y:593.85,startPosition:26},0).wait(1).to({x:1156.6,y:582.9,startPosition:27},0).wait(1).to({x:1147.6,y:572,startPosition:28},0).wait(1).to({x:1138.65,y:561.1,startPosition:29},0).wait(1).to({x:1129.65,y:550.15,startPosition:30},0).wait(1).to({x:1120.65,y:539.25,startPosition:0},0).wait(1).to({x:1111.65,y:528.35,startPosition:1},0).wait(1).to({x:1102.65,y:517.4,startPosition:2},0).wait(1).to({x:1093.65,y:506.5,startPosition:3},0).wait(1).to({x:1084.7,y:495.6,startPosition:4},0).wait(1).to({x:1075.7,y:484.7,startPosition:5},0).wait(1).to({x:1066.7,y:473.75,startPosition:6},0).wait(1).to({x:1057.7,y:462.85,startPosition:7},0).wait(1).to({x:1048.7,y:451.95,startPosition:8},0).wait(1).to({x:1039.7,y:441,startPosition:9},0).wait(1).to({x:1030.75,y:430.1,startPosition:10},0).wait(1).to({x:1021.75,y:419.2,startPosition:11},0).wait(1).to({x:1012.75,y:408.25,startPosition:12},0).wait(1).to({x:1003.75,y:397.35,startPosition:13},0).wait(1).to({x:994.75,y:386.45,startPosition:14},0).wait(1).to({x:985.75,y:375.55,startPosition:15},0).wait(1).to({x:976.8,y:364.6,startPosition:16},0).wait(1).to({x:967.8,y:353.7,startPosition:17},0).wait(1).to({x:958.8,y:342.8,startPosition:18},0).wait(1).to({x:949.8,y:331.85,startPosition:19},0).wait(1).to({x:940.8,y:320.95,startPosition:20},0).wait(1).to({x:931.85,y:310.05,startPosition:21},0).wait(1).to({x:922.85,y:299.1,startPosition:22},0).wait(1).to({x:913.85,y:288.2,startPosition:23},0).wait(1).to({x:904.85,y:277.3,startPosition:24},0).wait(1).to({x:895.85,y:266.4,startPosition:25},0).wait(1).to({x:886.85,y:255.45,startPosition:26},0).wait(1).to({x:877.9,y:244.55,startPosition:27},0).wait(1).to({x:868.9,y:233.65,startPosition:28},0).wait(1).to({x:859.9,y:222.7,startPosition:29},0).wait(1).to({x:850.9,y:211.8,startPosition:30},0).wait(1).to({x:841.9,y:200.9,startPosition:0},0).wait(1).to({x:832.9,y:189.95,startPosition:1},0).wait(1).to({x:824.75,y:203.5,startPosition:2},0).wait(1).to({x:816.55,y:217,startPosition:3},0).wait(1).to({x:808.4,y:230.5,startPosition:4},0).wait(1).to({x:800.2,y:244,startPosition:5},0).wait(1).to({x:792.05,y:257.5,startPosition:6},0).wait(1).to({x:783.85,y:271,startPosition:7},0).wait(1).to({x:775.7,y:284.5,startPosition:8},0).wait(1).to({x:767.5,y:298,startPosition:9},0).wait(1).to({x:759.3,y:311.5,startPosition:10},0).wait(1).to({x:751.15,y:325,startPosition:11},0).wait(1).to({x:742.95,y:338.5,startPosition:12},0).wait(1).to({x:734.8,y:352,startPosition:13},0).wait(1).to({x:726.6,y:365.5,startPosition:14},0).wait(1).to({x:718.45,y:379,startPosition:15},0).wait(1).to({x:710.25,y:392.5,startPosition:16},0).wait(1).to({x:702.05,y:406,startPosition:17},0).wait(1).to({x:693.9,y:419.55,startPosition:18},0).wait(1).to({x:685.7,y:433.05,startPosition:19},0).wait(1).to({x:677.55,y:446.55,startPosition:20},0).wait(1).to({x:669.35,y:460.05,startPosition:21},0).wait(1).to({x:661.2,y:473.55,startPosition:22},0).wait(1).to({x:653,y:487.05,startPosition:23},0).wait(1).to({x:644.85,y:500.55,startPosition:24},0).wait(1).to({x:636.65,y:514.05,startPosition:25},0).wait(1).to({x:628.45,y:527.55,startPosition:26},0).wait(1).to({x:620.3,y:541.05,startPosition:27},0).wait(1).to({x:612.1,y:554.55,startPosition:28},0).wait(1).to({x:603.95,y:568.05,startPosition:29},0).wait(1).to({x:595.75,y:581.55,startPosition:30},0).wait(1).to({x:587.6,y:595.05,startPosition:0},0).wait(1).to({x:579.4,y:608.55,startPosition:1},0).wait(1).to({x:571.2,y:622.05,startPosition:2},0).wait(1).to({x:557.8,y:600.45,startPosition:3},0).wait(1).to({x:544.4,y:578.85,startPosition:4},0).wait(1).to({x:531,y:557.25,startPosition:5},0).wait(1).to({x:517.55,y:535.65,startPosition:6},0).wait(1).to({x:504.15,y:514.05,startPosition:7},0).wait(1).to({x:490.75,y:492.4,startPosition:8},0).wait(1).to({x:477.35,y:470.8,startPosition:9},0).wait(1).to({x:463.9,y:449.2,startPosition:10},0).wait(1).to({x:450.5,y:427.6,startPosition:11},0).wait(1).to({x:437.1,y:406,startPosition:12},0).wait(1).to({x:423.65,y:384.35,startPosition:13},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_finger = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// finger
	this.instance = new lib.finger("synched",0);
	this.instance.setTransform(708.95,590.85,0.8181,1,0.2387,0,0,19.9,23.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(296));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Crying_Jump = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Crying_Jump
	this.instance = new lib.crying("synched",0);
	this.instance.setTransform(754.85,574.9,0.0223,0.0223,20.1069,0,0,41.8,49.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(164).to({_off:false},0).wait(1).to({regX:78.3,regY:76.8,scaleX:0.0337,scaleY:0.0337,rotation:20.1164,x:750.55,y:570.4,startPosition:1},0).wait(1).to({scaleX:0.045,scaleY:0.045,x:745.75,y:565.35,startPosition:2},0).wait(1).to({scaleX:0.0564,scaleY:0.0564,x:741.1,y:560.65,startPosition:3},0).wait(1).to({scaleX:0.0677,scaleY:0.0677,x:736.5,y:556.35,startPosition:4},0).wait(1).to({scaleX:0.0791,scaleY:0.0791,x:731.95,y:552.35,startPosition:5},0).wait(1).to({scaleX:0.0904,scaleY:0.0904,x:727.55,y:548.7,startPosition:6},0).wait(1).to({scaleX:0.1018,scaleY:0.1018,x:723.2,y:545.35,startPosition:7},0).wait(1).to({scaleX:0.1131,scaleY:0.1131,x:718.9,y:542.35,startPosition:8},0).wait(1).to({scaleX:0.1244,scaleY:0.1244,x:714.7,y:539.65,startPosition:9},0).wait(1).to({scaleX:0.1358,scaleY:0.1358,x:710.6,y:537.35,startPosition:10},0).wait(1).to({scaleX:0.1471,scaleY:0.1471,x:706.55,y:535.35,startPosition:11},0).wait(1).to({scaleX:0.1585,scaleY:0.1585,x:702.6,y:533.7,startPosition:12},0).wait(1).to({scaleX:0.1698,scaleY:0.1698,x:698.75,y:532.35,startPosition:13},0).wait(1).to({scaleX:0.1812,scaleY:0.1812,x:694.9,y:531.4,startPosition:14},0).wait(1).to({scaleX:0.1925,scaleY:0.1925,x:691.2,y:530.75,startPosition:15},0).wait(1).to({scaleX:0.2039,scaleY:0.2039,x:687.55,y:530.4,startPosition:0},0).wait(1).to({scaleX:0.2152,scaleY:0.2152,x:683.95,y:530.35,startPosition:1},0).wait(1).to({scaleX:0.2265,scaleY:0.2265,x:680.5,y:530.7,startPosition:2},0).wait(1).to({scaleX:0.2379,scaleY:0.2379,x:677.1,y:531.35,startPosition:3},0).wait(1).to({scaleX:0.2492,scaleY:0.2492,x:673.75,y:532.35,startPosition:4},0).wait(1).to({scaleX:0.2606,scaleY:0.2606,x:670.5,y:533.7,startPosition:5},0).wait(1).to({scaleX:0.2719,scaleY:0.2719,x:667.35,y:535.3,startPosition:6},0).wait(1).to({scaleX:0.2833,scaleY:0.2833,x:664.25,y:537.4,startPosition:7},0).wait(1).to({scaleX:0.2946,scaleY:0.2946,x:661.25,y:539.65,startPosition:8},0).wait(1).to({scaleX:0.3059,scaleY:0.3059,x:658.3,y:542.3,startPosition:9},0).wait(1).to({scaleX:0.3173,scaleY:0.3173,x:655.5,y:545.3,startPosition:10},0).wait(1).to({scaleX:0.3286,scaleY:0.3286,x:652.65,y:548.6,startPosition:11},0).wait(1).to({scaleX:0.34,scaleY:0.34,x:650,y:552.2,startPosition:12},0).wait(1).to({scaleX:0.3513,scaleY:0.3513,x:647.35,y:556.2,startPosition:13},0).wait(1).to({scaleX:0.3627,scaleY:0.3627,x:644.8,y:560.45,startPosition:14},0).wait(1).to({scaleX:0.374,scaleY:0.374,x:642.35,y:565.05,startPosition:15},0).wait(1).to({scaleX:0.3853,scaleY:0.3853,x:639.95,y:570.1,startPosition:0},0).wait(1).to({scaleX:0.3967,scaleY:0.3967,x:637.6,y:575.35,startPosition:1},0).wait(1).to({scaleX:0.408,scaleY:0.408,x:635.35,y:580.9,startPosition:2},0).wait(1).to({scaleX:0.4194,scaleY:0.4194,x:633.25,y:586.9,startPosition:3},0).wait(1).to({scaleX:0.4307,scaleY:0.4307,x:631.1,y:593.15,startPosition:4},0).wait(1).to({scaleX:0.4421,scaleY:0.4421,x:629.1,y:599.75,startPosition:5},0).wait(1).to({scaleX:0.4534,scaleY:0.4534,x:627.2,y:606.65,startPosition:6},0).wait(1).to({scaleX:0.4648,scaleY:0.4648,x:625.3,y:613.85,startPosition:7},0).wait(1).to({scaleX:0.4761,scaleY:0.4761,x:623.6,y:621.45,startPosition:8},0).wait(1).to({scaleX:0.4874,scaleY:0.4874,x:621.9,y:629.4,startPosition:9},0).wait(1).to({scaleX:0.4988,scaleY:0.4988,x:620.25,y:637.6,startPosition:10},0).wait(1).to({scaleX:0.5101,scaleY:0.5101,x:618.7,y:646.2,startPosition:11},0).wait(1).to({scaleX:0.5215,scaleY:0.5215,x:617.25,y:655.05,startPosition:12},0).wait(1).to({scaleX:0.5328,scaleY:0.5328,x:615.8,y:664.25,startPosition:13},0).wait(1).to({scaleX:0.5442,scaleY:0.5442,x:614.5,y:673.8,startPosition:14},0).wait(1).to({scaleX:0.5555,scaleY:0.5555,x:613.3,y:683.65,startPosition:15},0).wait(1).to({scaleX:0.5668,scaleY:0.5668,x:612.05,y:693.9,startPosition:0},0).wait(1).to({scaleX:0.5782,scaleY:0.5782,x:611,y:704.4,startPosition:1},0).wait(1).to({scaleX:0.5895,scaleY:0.5895,x:610,y:715.2,startPosition:2},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Crying = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Crying
	this.instance = new lib.crying("synched",0);
	this.instance.setTransform(820.45,-41.8,0.9999,0.9999,0,0,0,78,68.2);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(334).to({_off:false},0).wait(1).to({regX:78.3,regY:76.8,x:821.75,y:-13.7,startPosition:1},0).wait(1).to({x:822.8,y:5.75,startPosition:2},0).wait(1).to({x:823.85,y:25.25,startPosition:3},0).wait(1).to({x:824.9,y:44.7,startPosition:4},0).wait(1).to({x:825.95,y:64.2,startPosition:5},0).wait(1).to({x:827,y:83.6,startPosition:6},0).wait(1).to({x:828.05,y:103.05,startPosition:7},0).wait(1).to({x:829.1,y:122.55,startPosition:8},0).wait(1).to({x:830.15,y:142,startPosition:9},0).wait(1).to({x:831.2,y:161.5,startPosition:10},0).wait(1).to({x:832.25,y:180.95,startPosition:11},0).wait(1).to({x:833.3,y:200.45,startPosition:12},0).wait(1).to({x:834.35,y:219.9,startPosition:13},0).wait(1).to({x:835.4,y:239.35,startPosition:14},0).wait(1).to({x:836.45,y:258.85,startPosition:15},0).wait(1).to({x:837.5,y:278.3,startPosition:0},0).wait(1).to({x:838.55,y:297.8,startPosition:1},0).wait(1).to({x:839.6,y:317.25,startPosition:2},0).wait(1).to({x:840.65,y:336.75,startPosition:3},0).wait(1).to({x:841.7,y:356.2,startPosition:4},0).wait(1).to({x:842.75,y:375.65,startPosition:5},0).wait(1).to({x:843.8,y:395.15,startPosition:6},0).wait(1).to({x:844.85,y:414.6,startPosition:7},0).wait(1).to({x:845.9,y:434.1,startPosition:8},0).wait(1).to({x:846.95,y:453.55,startPosition:9},0).wait(1).to({x:848,y:473.05,startPosition:10},0).wait(1).to({x:849.05,y:492.5,startPosition:11},0).wait(1).to({x:850.1,y:511.95,startPosition:12},0).wait(1).to({x:851.15,y:531.45,startPosition:13},0).wait(1).to({x:852.2,y:550.9,startPosition:14},0).wait(1).to({x:853.25,y:570.4,startPosition:15},0).wait(1).to({x:854.3,y:589.85,startPosition:0},0).wait(1).to({x:855.35,y:609.35,startPosition:1},0).wait(1).to({x:856.4,y:628.8,startPosition:2},0).wait(1).to({x:857.45,y:648.25,startPosition:3},0).wait(1).to({x:879.7,y:639.85,startPosition:4},0).wait(1).to({x:901.95,y:631.45,startPosition:5},0).wait(1).to({x:924.2,y:623.05,startPosition:6},0).wait(1).to({x:946.45,y:614.6,startPosition:7},0).wait(1).to({x:968.7,y:606.2,startPosition:8},0).wait(1).to({x:990.95,y:597.8,startPosition:9},0).wait(1).to({x:1013.2,y:589.4,startPosition:10},0).wait(1).to({x:1035.45,y:580.95,startPosition:11},0).wait(1).to({x:1057.7,y:572.55,startPosition:12},0).wait(1).to({x:1079.95,y:564.15,startPosition:13},0).wait(1).to({x:1102.2,y:555.75,startPosition:14},0).wait(1).to({x:1124.45,y:547.3,startPosition:15},0).wait(1).to({x:1146.7,y:538.9,startPosition:0},0).wait(1).to({x:1168.95,y:530.5,startPosition:1},0).wait(1).to({x:1191.2,y:522.05,startPosition:2},0).wait(1).to({x:1180.85,y:534.6,startPosition:3},0).wait(1).to({x:1170.5,y:547.1,startPosition:4},0).wait(1).to({x:1160.15,y:559.6,startPosition:5},0).wait(1).to({x:1149.8,y:572.1,startPosition:6},0).wait(1).to({x:1139.45,y:584.6,startPosition:7},0).wait(1).to({x:1129.1,y:597.1,startPosition:8},0).wait(1).to({x:1118.75,y:609.6,startPosition:9},0).wait(1).to({x:1108.4,y:622.1,startPosition:10},0).wait(1).to({x:1098.05,y:634.6,startPosition:11},0).wait(1).to({x:1089.9,y:618.5,startPosition:12},0).wait(1).to({x:1081.7,y:602.35,startPosition:13},0).wait(1).to({x:1073.5,y:586.25,startPosition:14},0).wait(1).to({x:1065.3,y:570.1,startPosition:15},0).wait(1).to({x:1057.15,y:554,startPosition:0},0).wait(1).to({x:1048.95,y:537.85,startPosition:1},0).wait(1).to({x:1040.75,y:521.75,startPosition:2},0).wait(1).to({x:1032.55,y:505.6,startPosition:3},0).wait(1).to({x:1024.4,y:489.5,startPosition:4},0).wait(1).to({x:1016.2,y:473.35,startPosition:5},0).wait(1).to({x:1008,y:457.25,startPosition:6},0).wait(1).to({x:999.8,y:441.1,startPosition:7},0).wait(1).to({x:991.6,y:425,startPosition:8},0).wait(1).to({x:983.45,y:408.85,startPosition:9},0).wait(1).to({x:975.25,y:392.75,startPosition:10},0).wait(1).to({x:967.05,y:376.6,startPosition:11},0).wait(1).to({x:958.85,y:360.5,startPosition:12},0).wait(1).to({x:950.7,y:344.35,startPosition:13},0).wait(1).to({x:942.5,y:328.25,startPosition:14},0).wait(1).to({x:934.3,y:312.1,startPosition:15},0).wait(1).to({x:926.1,y:296,startPosition:0},0).wait(1).to({x:917.95,y:279.85,startPosition:1},0).wait(1).to({x:909.75,y:263.75,startPosition:2},0).wait(1).to({x:901.55,y:247.6,startPosition:3},0).wait(1).to({x:893.35,y:231.5,startPosition:4},0).wait(1).to({x:885.15,y:215.35,startPosition:5},0).wait(1).to({x:879,y:227.25,startPosition:6},0).wait(1).to({x:872.8,y:239.1,startPosition:7},0).wait(1).to({x:866.6,y:250.95,startPosition:8},0).wait(1).to({x:860.4,y:262.8,startPosition:9},0).wait(1).to({x:854.2,y:274.7,startPosition:10},0).wait(1).to({x:848,y:286.55,startPosition:11},0).wait(1).to({x:841.8,y:298.4,startPosition:12},0).wait(1).to({x:835.6,y:310.25,startPosition:13},0).wait(1).to({x:829.4,y:322.15,startPosition:14},0).wait(1).to({x:823.2,y:334,startPosition:15},0).wait(1).to({x:817,y:345.85,startPosition:0},0).wait(1).to({x:810.8,y:357.7,startPosition:1},0).wait(1).to({x:804.6,y:369.55,startPosition:2},0).wait(1).to({x:798.4,y:381.45,startPosition:3},0).wait(1).to({x:792.2,y:393.3,startPosition:4},0).wait(1).to({x:786,y:405.15,startPosition:5},0).wait(1).to({x:779.8,y:417,startPosition:6},0).wait(1).to({x:773.6,y:428.9,startPosition:7},0).wait(1).to({x:767.4,y:440.75,startPosition:8},0).wait(1).to({x:761.2,y:452.6,startPosition:9},0).wait(1).to({x:755,y:464.45,startPosition:10},0).wait(1).to({x:748.8,y:476.35,startPosition:11},0).wait(1).to({x:742.6,y:488.2,startPosition:12},0).wait(1).to({x:736.4,y:500.05,startPosition:13},0).wait(1).to({x:730.2,y:511.9,startPosition:14},0).wait(1).to({x:724,y:523.75,startPosition:15},0).wait(1).to({x:717.8,y:535.65,startPosition:0},0).wait(1).to({x:711.6,y:547.5,startPosition:1},0).wait(1).to({x:705.4,y:559.35,startPosition:2},0).wait(1).to({x:699.2,y:571.2,startPosition:3},0).wait(1).to({x:693,y:583.1,startPosition:4},0).wait(1).to({x:686.8,y:594.95,startPosition:5},0).wait(1).to({x:680.6,y:606.8,startPosition:6},0).wait(1).to({x:674.4,y:618.65,startPosition:7},0).wait(1).to({x:668.2,y:630.5,startPosition:8},0).wait(1).to({x:662.8,y:619.1,startPosition:9},0).wait(1).to({x:657.4,y:607.65,startPosition:10},0).wait(1).to({x:651.95,y:596.2,startPosition:11},0).wait(1).to({x:646.55,y:584.75,startPosition:12},0).wait(1).to({x:641.1,y:573.3,startPosition:13},0).wait(1).to({x:635.7,y:561.85,startPosition:14},0).wait(1).to({x:630.3,y:550.4,startPosition:15},0).wait(1).to({x:624.85,y:538.95,startPosition:0},0).wait(1).to({x:619.45,y:527.5,startPosition:1},0).wait(1).to({x:614,y:516.05,startPosition:2},0).wait(1).to({x:608.6,y:504.6,startPosition:3},0).wait(1).to({x:603.15,y:493.15,startPosition:4},0).wait(1).to({x:597.75,y:481.7,startPosition:5},0).wait(1).to({x:592.35,y:470.25,startPosition:6},0).wait(1).to({x:586.9,y:458.8,startPosition:7},0).wait(1).to({x:581.5,y:447.35,startPosition:8},0).wait(1).to({x:576.05,y:435.9,startPosition:9},0).wait(1).to({x:570.65,y:424.45,startPosition:10},0).wait(1).to({x:565.25,y:413,startPosition:11},0).wait(1).to({x:559.8,y:401.55,startPosition:12},0).wait(1).to({x:554.4,y:390.1,startPosition:13},0).wait(1).to({x:548.95,y:378.65,startPosition:14},0).wait(1).to({x:543.55,y:367.2,startPosition:15},0).wait(1).to({x:538.1,y:355.75,startPosition:0},0).wait(1).to({x:532.7,y:344.3,startPosition:1},0).wait(1).to({x:527.3,y:332.85,startPosition:2},0).wait(1).to({x:521.85,y:321.4,startPosition:3},0).wait(1).to({x:516.45,y:309.95,startPosition:4},0).wait(1).to({x:511,y:298.5,startPosition:5},0).wait(1).to({x:505.6,y:287.05,startPosition:6},0).wait(1).to({x:500.2,y:275.6,startPosition:7},0).wait(1).to({x:494.75,y:264.15,startPosition:8},0).wait(1).to({x:489.35,y:252.7,startPosition:9},0).wait(1).to({x:483.9,y:241.25,startPosition:10},0).wait(1).to({x:478.5,y:229.8,startPosition:11},0).wait(1).to({x:473.05,y:218.35,startPosition:12},0).wait(1).to({x:469.35,y:232.1,startPosition:13},0).wait(1).to({x:465.6,y:245.85,startPosition:14},0).wait(1).to({x:461.9,y:259.55,startPosition:15},0).wait(1).to({x:458.15,y:273.3,startPosition:0},0).wait(1).to({x:454.4,y:287,startPosition:1},0).wait(1).to({x:450.7,y:300.75,startPosition:2},0).wait(1).to({x:446.95,y:314.5,startPosition:3},0).wait(1).to({x:443.25,y:328.2,startPosition:4},0).wait(1).to({x:439.5,y:341.95,startPosition:5},0).wait(1).to({x:435.75,y:355.65,startPosition:6},0).wait(1).to({x:432.05,y:369.4,startPosition:7},0).wait(1).to({x:428.3,y:383.15,startPosition:8},0).wait(1).to({x:424.6,y:396.85,startPosition:9},0).wait(1).to({x:420.85,y:410.6,startPosition:10},0).wait(1).to({x:417.1,y:424.3,startPosition:11},0).wait(1).to({x:413.4,y:438.05,startPosition:12},0).wait(1).to({x:409.65,y:451.8,startPosition:13},0).wait(1).to({x:405.95,y:465.5,startPosition:14},0).wait(1).to({x:402.2,y:479.25,startPosition:15},0).wait(1).to({x:398.45,y:492.95,startPosition:0},0).wait(1).to({x:394.75,y:506.7,startPosition:1},0).wait(1).to({x:391,y:520.45,startPosition:2},0).wait(1).to({x:387.3,y:534.15,startPosition:3},0).wait(1).to({x:383.55,y:547.9,startPosition:4},0).wait(1).to({x:379.8,y:561.6,startPosition:5},0).wait(1).to({x:376.1,y:575.35,startPosition:6},0).wait(1).to({x:372.35,y:589.1,startPosition:7},0).wait(1).to({x:368.65,y:602.8,startPosition:8},0).wait(1).to({x:364.9,y:616.55,startPosition:9},0).wait(1).to({x:361.15,y:630.25,startPosition:10},0).wait(1).to({x:369.45,y:618.85,startPosition:11},0).wait(1).to({x:377.75,y:607.45,startPosition:12},0).wait(1).to({x:386.05,y:596.05,startPosition:13},0).wait(1).to({x:394.35,y:584.65,startPosition:14},0).wait(1).to({x:402.6,y:573.25,startPosition:15},0).wait(1).to({x:410.9,y:561.85,startPosition:0},0).wait(1).to({x:419.2,y:550.4,startPosition:1},0).wait(1).to({x:427.5,y:539,startPosition:2},0).wait(1).to({x:435.75,y:527.6,startPosition:3},0).wait(1).to({x:444.05,y:516.2,startPosition:4},0).wait(1).to({x:452.35,y:504.8,startPosition:5},0).wait(1).to({x:460.65,y:493.4,startPosition:6},0).wait(1).to({x:468.95,y:481.95,startPosition:7},0).wait(1).to({x:477.2,y:470.55,startPosition:8},0).wait(1).to({x:485.5,y:459.15,startPosition:9},0).wait(1).to({x:493.8,y:447.75,startPosition:10},0).wait(1).to({x:502.1,y:436.35,startPosition:11},0).wait(1).to({x:510.35,y:424.95,startPosition:12},0).wait(1).to({x:518.65,y:413.5,startPosition:13},0).wait(1).to({x:526.95,y:402.1,startPosition:14},0).wait(1).to({x:535.25,y:390.7,startPosition:15},0).wait(1).to({x:543.55,y:379.3,startPosition:0},0).wait(1).to({x:551.8,y:367.9,startPosition:1},0).wait(1).to({x:560.1,y:356.5,startPosition:2},0).wait(1).to({x:568.4,y:345.05,startPosition:3},0).wait(1).to({x:576.7,y:333.65,startPosition:4},0).wait(1).to({x:584.95,y:322.25,startPosition:5},0).wait(1).to({x:593.25,y:310.85,startPosition:6},0).wait(1).to({x:601.55,y:299.45,startPosition:7},0).wait(1).to({x:609.85,y:288.05,startPosition:8},0).wait(1).to({x:618.1,y:276.6,startPosition:9},0).wait(1).to({x:623.9,y:289.25,startPosition:10},0).wait(1).to({x:629.65,y:301.9,startPosition:11},0).wait(1).to({x:635.4,y:314.55,startPosition:12},0).wait(1).to({x:641.2,y:327.2,startPosition:13},0).wait(1).to({x:646.95,y:339.85,startPosition:14},0).wait(1).to({x:652.7,y:352.5,startPosition:15},0).wait(1).to({x:658.5,y:365.15,startPosition:0},0).wait(1).to({x:664.25,y:377.8,startPosition:1},0).wait(1).to({x:670,y:390.45,startPosition:2},0).wait(1).to({x:675.8,y:403.1,startPosition:3},0).wait(1).to({x:681.55,y:415.75,startPosition:4},0).wait(1).to({x:687.3,y:428.4,startPosition:5},0).wait(1).to({x:693.1,y:441.05,startPosition:6},0).wait(1).to({x:698.85,y:453.7,startPosition:7},0).wait(1).to({x:704.6,y:466.35,startPosition:8},0).wait(1).to({x:710.4,y:479,startPosition:9},0).wait(1).to({x:716.15,y:491.65,startPosition:10},0).wait(1).to({x:721.9,y:504.3,startPosition:11},0).wait(1).to({x:727.7,y:516.95,startPosition:12},0).wait(1).to({x:733.45,y:529.6,startPosition:13},0).wait(1).to({x:739.2,y:542.25,startPosition:14},0).wait(1).to({x:745,y:554.9,startPosition:15},0).wait(1).to({x:750.75,y:567.55,startPosition:0},0).wait(1).to({x:756.5,y:580.2,startPosition:1},0).wait(1).to({x:762.3,y:592.85,startPosition:2},0).wait(1).to({x:768.05,y:605.5,startPosition:3},0).wait(1).to({x:773.8,y:618.15,startPosition:4},0).wait(1).to({x:779.55,y:630.8,startPosition:5},0).wait(1).to({x:791.85,y:613.1,startPosition:6},0).wait(1).to({x:804.1,y:595.35,startPosition:7},0).wait(1).to({x:816.35,y:577.65,startPosition:8},0).wait(1).to({x:828.6,y:559.9,startPosition:9},0).wait(1).to({x:840.85,y:542.2,startPosition:10},0).wait(1).to({x:853.1,y:524.45,startPosition:11},0).wait(1).to({x:865.35,y:506.75,startPosition:12},0).wait(1).to({x:877.6,y:489,startPosition:13},0).wait(1).to({x:889.85,y:471.3,startPosition:14},0).wait(1).to({x:902.1,y:453.55,startPosition:15},0).wait(1).to({x:914.35,y:435.8,startPosition:0},0).wait(1).to({x:926.6,y:418.1,startPosition:1},0).wait(1).to({x:938.85,y:400.35,startPosition:2},0).wait(1).to({x:951.1,y:382.65,startPosition:3},0).wait(1).to({x:963.35,y:364.9,startPosition:4},0).wait(1).to({x:975.6,y:347.2,startPosition:5},0).wait(1).to({x:987.85,y:329.45,startPosition:6},0).wait(1).to({x:1000.1,y:311.75,startPosition:7},0).wait(1).to({x:1012.35,y:294,startPosition:8},0).wait(1).to({x:1024.6,y:276.25,startPosition:9},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_clouds = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// clouds
	this.instance = new lib.cloud("synched",0);
	this.instance.setTransform(181.9,145.95,1,1,0,0,0,500.4,89.6);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(296).to({_off:false},0).wait(1).to({regX:500.5,regY:89.5,x:183.05,y:145.8},0).wait(1).to({x:184.1},0).wait(1).to({x:185.15},0).wait(1).to({x:186.2},0).wait(1).to({x:187.2},0).wait(1).to({x:188.25},0).wait(1).to({x:189.3},0).wait(1).to({x:190.35},0).wait(1).to({x:191.35},0).wait(1).to({x:192.4},0).wait(1).to({x:193.45},0).wait(1).to({x:194.5},0).wait(1).to({x:195.5,y:145.75},0).wait(1).to({x:196.55},0).wait(1).to({x:197.6},0).wait(1).to({x:198.65},0).wait(1).to({x:199.65},0).wait(1).to({x:200.7},0).wait(1).to({x:201.75},0).wait(1).to({x:202.8},0).wait(1).to({x:203.8},0).wait(1).to({x:204.85},0).wait(1).to({x:205.9},0).wait(1).to({x:206.95},0).wait(1).to({x:207.95,y:145.7},0).wait(1).to({x:209},0).wait(1).to({x:210.05},0).wait(1).to({x:211.1},0).wait(1).to({x:212.15},0).wait(1).to({x:213.15},0).wait(1).to({x:214.2},0).wait(1).to({x:215.25},0).wait(1).to({x:216.3},0).wait(1).to({x:217.3},0).wait(1).to({x:218.35},0).wait(1).to({x:219.4},0).wait(1).to({x:220.45,y:145.65},0).wait(1).to({x:221.45},0).wait(1).to({x:222.5},0).wait(1).to({x:223.55},0).wait(1).to({x:224.6},0).wait(1).to({x:225.6},0).wait(1).to({x:226.65},0).wait(1).to({x:227.7},0).wait(1).to({x:228.75},0).wait(1).to({x:229.75},0).wait(1).to({x:230.8},0).wait(1).to({x:231.85},0).wait(1).to({x:232.9,y:145.6},0).wait(1).to({x:233.9},0).wait(1).to({x:234.95},0).wait(1).to({x:236},0).wait(1).to({x:237.05},0).wait(1).to({x:238.05},0).wait(1).to({x:239.1},0).wait(1).to({x:240.15},0).wait(1).to({x:241.2},0).wait(1).to({x:242.25},0).wait(1).to({x:243.25},0).wait(1).to({x:244.3},0).wait(1).to({x:245.35,y:145.55},0).wait(1).to({x:246.4},0).wait(1).to({x:247.4},0).wait(1).to({x:248.45},0).wait(1).to({x:249.5},0).wait(1).to({x:250.55},0).wait(1).to({x:251.55},0).wait(1).to({x:252.6},0).wait(1).to({x:253.65},0).wait(1).to({x:254.7},0).wait(1).to({x:255.7},0).wait(1).to({x:256.75},0).wait(1).to({x:257.8,y:145.5},0).wait(1).to({x:258.85},0).wait(1).to({x:259.85},0).wait(1).to({x:260.9},0).wait(1).to({x:261.95},0).wait(1).to({x:263},0).wait(1).to({x:264},0).wait(1).to({x:265.05},0).wait(1).to({x:266.1},0).wait(1).to({x:267.15},0).wait(1).to({x:268.2},0).wait(1).to({x:269.2},0).wait(1).to({x:270.25,y:145.45},0).wait(1).to({x:271.3},0).wait(1).to({x:272.35},0).wait(1).to({x:273.35},0).wait(1).to({x:274.4},0).wait(1).to({x:275.45},0).wait(1).to({x:276.5},0).wait(1).to({x:277.5},0).wait(1).to({x:278.55},0).wait(1).to({x:279.6},0).wait(1).to({x:280.65},0).wait(1).to({x:281.65},0).wait(1).to({x:282.7,y:145.4},0).wait(1).to({x:283.75},0).wait(1).to({x:284.8},0).wait(1).to({x:285.8},0).wait(1).to({x:286.85},0).wait(1).to({x:287.9},0).wait(1).to({x:288.95},0).wait(1).to({x:289.95},0).wait(1).to({x:291},0).wait(1).to({x:292.05},0).wait(1).to({x:293.1},0).wait(1).to({x:294.1},0).wait(1).to({x:295.15},0).wait(1).to({x:296.2,y:145.35},0).wait(1).to({x:297.25},0).wait(1).to({x:298.3},0).wait(1).to({x:299.3},0).wait(1).to({x:300.35},0).wait(1).to({x:301.4},0).wait(1).to({x:302.45},0).wait(1).to({x:303.45},0).wait(1).to({x:304.5},0).wait(1).to({x:305.55},0).wait(1).to({x:306.6},0).wait(1).to({x:307.6},0).wait(1).to({x:308.65,y:145.3},0).wait(1).to({x:309.7},0).wait(1).to({x:310.75},0).wait(1).to({x:311.75},0).wait(1).to({x:312.8},0).wait(1).to({x:313.85},0).wait(1).to({x:314.9},0).wait(1).to({x:315.9},0).wait(1).to({x:316.95},0).wait(1).to({x:318},0).wait(1).to({x:319.05},0).wait(1).to({x:320.05},0).wait(1).to({x:321.1,y:145.25},0).wait(1).to({x:322.15},0).wait(1).to({x:323.2},0).wait(1).to({x:324.2},0).wait(1).to({x:325.25},0).wait(1).to({x:326.3},0).wait(1).to({x:327.35},0).wait(1).to({x:328.4},0).wait(1).to({x:329.4},0).wait(1).to({x:330.45},0).wait(1).to({x:331.5},0).wait(1).to({x:332.55},0).wait(1).to({x:333.55,y:145.2},0).wait(1).to({x:334.6},0).wait(1).to({x:335.65},0).wait(1).to({x:336.7},0).wait(1).to({x:337.7},0).wait(1).to({x:338.75},0).wait(1).to({x:339.8},0).wait(1).to({x:340.85},0).wait(1).to({x:341.85},0).wait(1).to({x:342.9},0).wait(1).to({x:343.95},0).wait(1).to({x:345},0).wait(1).to({x:346,y:145.15},0).wait(1).to({x:347.05},0).wait(1).to({x:348.1},0).wait(1).to({x:349.15},0).wait(1).to({x:350.15},0).wait(1).to({x:351.2},0).wait(1).to({x:352.25},0).wait(1).to({x:353.3},0).wait(1).to({x:354.35},0).wait(1).to({x:355.35},0).wait(1).to({x:356.4},0).wait(1).to({x:357.45},0).wait(1).to({x:358.5,y:145.1},0).wait(1).to({x:359.5},0).wait(1).to({x:360.55},0).wait(1).to({x:361.6},0).wait(1).to({x:362.65},0).wait(1).to({x:363.65},0).wait(1).to({x:364.7},0).wait(1).to({x:365.75},0).wait(1).to({x:366.8},0).wait(1).to({x:367.8},0).wait(1).to({x:368.85},0).wait(1).to({x:369.9},0).wait(1).to({x:370.95,y:145.05},0).wait(1).to({x:371.95},0).wait(1).to({x:373},0).wait(1).to({x:374.05},0).wait(1).to({x:375.1},0).wait(1).to({x:376.1},0).wait(1).to({x:377.15},0).wait(1).to({x:378.2},0).wait(1).to({x:379.25},0).wait(1).to({x:380.25},0).wait(1).to({x:381.3},0).wait(1).to({x:382.35},0).wait(1).to({x:383.4,y:145},0).wait(1).to({x:384.45},0).wait(1).to({x:385.45},0).wait(1).to({x:386.5},0).wait(1).to({x:387.55},0).wait(1).to({x:388.6},0).wait(1).to({x:389.6},0).wait(1).to({x:390.65},0).wait(1).to({x:391.7},0).wait(1).to({x:392.75},0).wait(1).to({x:393.75},0).wait(1).to({x:394.8},0).wait(1).to({x:395.85},0).wait(1).to({x:396.9,y:144.95},0).wait(1).to({x:397.9},0).wait(1).to({x:398.95},0).wait(1).to({x:400},0).wait(1).to({x:401.05},0).wait(1).to({x:402.05},0).wait(1).to({x:403.1},0).wait(1).to({x:404.15},0).wait(1).to({x:405.2},0).wait(1).to({x:406.2},0).wait(1).to({x:407.25},0).wait(1).to({x:408.3},0).wait(1).to({x:409.35,y:144.9},0).wait(1).to({x:410.35},0).wait(1).to({x:411.4},0).wait(1).to({x:412.45},0).wait(1).to({x:413.5},0).wait(1).to({x:414.55},0).wait(1).to({x:415.55},0).wait(1).to({x:416.6},0).wait(1).to({x:417.65},0).wait(1).to({x:418.7},0).wait(1).to({x:419.7},0).wait(1).to({x:420.75},0).wait(1).to({x:421.8,y:144.85},0).wait(1).to({x:422.85},0).wait(1).to({x:423.85},0).wait(1).to({x:424.9},0).wait(1).to({x:425.95},0).wait(1).to({x:427},0).wait(1).to({x:428},0).wait(1).to({x:429.05},0).wait(1).to({x:430.1},0).wait(1).to({x:431.15},0).wait(1).to({x:432.15},0).wait(1).to({x:433.2},0).wait(1).to({x:434.25,y:144.8},0).wait(1).to({x:435.3},0).wait(1).to({x:436.3},0).wait(1).to({x:437.35},0).wait(1).to({x:438.4},0).wait(1).to({x:439.45},0).wait(1).to({x:440.5},0).wait(1).to({x:441.5},0).wait(1).to({x:442.55},0).wait(1).to({x:443.6},0).wait(1).to({x:444.65},0).wait(1).to({x:445.65},0).wait(1).to({x:446.7,y:144.75},0).wait(1).to({x:447.75},0).wait(1).to({x:448.8},0).wait(1).to({x:449.8},0).wait(1).to({x:450.85},0).wait(1).to({x:451.9},0).wait(1).to({x:452.95},0).wait(1).to({x:453.95},0).wait(1).to({x:455},0).wait(1).to({x:456.05},0).wait(1).to({x:457.1},0).wait(1).to({x:458.1},0).wait(1).to({x:459.15,y:144.7},0).wait(1).to({x:460.2},0).wait(1).to({x:461.25},0).wait(1).to({x:462.25},0).wait(1).to({x:463.3},0).wait(1).to({x:464.35},0).wait(1).to({x:465.4},0).wait(1).to({x:466.4},0).wait(1).to({x:467.45},0).wait(1).to({x:468.5},0).wait(1).to({x:469.55},0).wait(1).to({x:470.6},0).wait(1).to({x:471.6,y:144.65},0).wait(1).to({x:472.65},0).wait(1).to({x:473.7},0).wait(1).to({x:474.75},0).wait(1).to({x:475.75},0).wait(1).to({x:476.8},0).wait(1).to({x:477.85},0).wait(1).to({x:478.9},0).wait(1).to({x:479.9},0).wait(1).to({x:480.95},0).wait(1).to({x:482},0).wait(1).to({x:483.05},0).wait(1).to({x:484.05,y:144.6},0).wait(1).to({x:485.1},0).wait(1).to({x:486.15},0).wait(1).to({x:487.2},0).wait(1).to({x:488.2},0).wait(1).to({x:489.25},0).wait(1).to({x:490.3},0).wait(1).to({x:491.35},0).wait(1).to({x:492.35},0).wait(1).to({x:493.4},0).wait(1).to({x:494.45},0).wait(1).to({x:495.5},0).wait(1).to({x:496.5},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.manstart = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap7();
	this.instance.setTransform(498.6,520.45,0.2024,0.2097,23.4723);

	this.instance_1 = new lib.Bitmap6();
	this.instance_1.setTransform(520.35,469.5,0.2014,0.2063,23.2081);

	this.instance_2 = new lib.CachedBmp_100();
	this.instance_2.setTransform(475.65,565.45,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_99();
	this.instance_3.setTransform(470.7,457.3,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_98();
	this.instance_4.setTransform(0,526.2,0.5,0.5);

	this.instance_5 = new lib.eye("synched",0);
	this.instance_5.setTransform(334.95,214.55,1,1,10.4876);

	this.instance_6 = new lib.Bitmap7();
	this.instance_6.setTransform(498.6,520.45,0.2024,0.2097,23.4723);

	this.instance_7 = new lib.Bitmap6();
	this.instance_7.setTransform(520.35,469.5,0.2014,0.2063,23.2081);

	this.instance_8 = new lib.CachedBmp_100();
	this.instance_8.setTransform(475.65,565.45,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_99();
	this.instance_9.setTransform(470.7,457.3,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_98();
	this.instance_10.setTransform(0,526.2,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_94();
	this.instance_11.setTransform(103.3,145.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.manstart, new cjs.Rectangle(0,145.1,604.7,603.1), null);


(lib.iphone = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Symbol3();
	this.instance.setTransform(14.7,23.8,1,1,0,0,0,14.7,23.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.6,-2.1,36.5,29);


(lib.head2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap7();
	this.instance.setTransform(498.6,515.25,0.2024,0.2097,23.4723);

	this.instance_1 = new lib.Bitmap6();
	this.instance_1.setTransform(520.35,464.3,0.2014,0.2063,23.2081);

	this.instance_2 = new lib.CachedBmp_100();
	this.instance_2.setTransform(475.65,560.25,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_99();
	this.instance_3.setTransform(470.7,452.1,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_98();
	this.instance_4.setTransform(0,521,0.5,0.5);

	this.instance_5 = new lib.eye("synched",0);
	this.instance_5.setTransform(371.25,229.9,1,1,18.4377);

	this.instance_6 = new lib.Bitmap7();
	this.instance_6.setTransform(498.6,515.25,0.2024,0.2097,23.4723);

	this.instance_7 = new lib.Bitmap6();
	this.instance_7.setTransform(520.35,464.3,0.2014,0.2063,23.2081);

	this.instance_8 = new lib.CachedBmp_100();
	this.instance_8.setTransform(475.65,560.25,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_99();
	this.instance_9.setTransform(470.7,452.1,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_98();
	this.instance_10.setTransform(0,521,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_74();
	this.instance_11.setTransform(127.05,163.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.head2, new cjs.Rectangle(0,163.8,623.1,579.2), null);


(lib.head = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.head2();
	this.instance.setTransform(302.3,371.6,1,1,0,0,0,302.3,371.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.head, new cjs.Rectangle(0,163.8,623.1,579.2), null);


(lib.handmoves = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.hand("synched",0);
	this.instance.setTransform(57.3,38.8,0.9995,0.9995,14.9867,0,0,52.7,26.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(23).to({regX:52.8,regY:24.4,rotation:14.9861,x:57.85,y:37.2},0).wait(3).to({rotation:-0.0122,x:64.5,y:24.4},0).wait(3).to({regX:52.9,regY:24.5,rotation:-15.0109,x:75.45,y:12.75},0).wait(3).to({rotation:-30.0101,x:88.9,y:-1.9},0).wait(3).to({scaleX:0.9994,scaleY:0.9994,rotation:-45.0093,y:-14.1},0).wait(3).to({regX:52.8,regY:24.6,rotation:-60.009,x:87.65,y:-32.4},0).wait(3).to({rotation:-75.0081,x:82.75,y:-50.85},0).wait(3).to({rotation:-90.007,x:72.65,y:-64.3},0).wait(3).to({rotation:-105.0057,x:64.85,y:-83.5},0).wait(3).to({x:58.75,y:-93.55},0).wait(3).to({y:-101.9},0).wait(35).to({startPosition:0},0).to({_off:true},1).wait(6));

	// Layer_2
	this.instance_1 = new lib.CachedBmp_62();
	this.instance_1.setTransform(-35.8,-69.35,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_63();
	this.instance_2.setTransform(-35.8,-69.35,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_64();
	this.instance_3.setTransform(-35.8,-69.35,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_65();
	this.instance_4.setTransform(-35.8,-69.35,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_66();
	this.instance_5.setTransform(-35.8,-69.35,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_67();
	this.instance_6.setTransform(-35.8,-69.35,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_68();
	this.instance_7.setTransform(-35.8,-69.35,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_69();
	this.instance_8.setTransform(-35.8,-69.35,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_70();
	this.instance_9.setTransform(-35.8,-69.35,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_71();
	this.instance_10.setTransform(-35.8,-69.35,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_73();
	this.instance_11.setTransform(-35.8,-69.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_1}]},23).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_3}]},3).to({state:[{t:this.instance_4}]},3).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_6}]},3).to({state:[{t:this.instance_7}]},3).to({state:[{t:this.instance_8}]},3).to({state:[{t:this.instance_9}]},3).to({state:[{t:this.instance_10}]},3).to({state:[{t:this.instance_11}]},3).to({state:[{t:this.instance_11}]},35).to({state:[]},1).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-35.8,-157.8,182,294.5);


(lib.face = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.eye("synched",0);
	this.instance.setTransform(63.35,54.95,0.2499,0.2499,10.4037,0,0,-3.9,6.8);

	this.instance_1 = new lib.CachedBmp_42();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_43();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_44();
	this.instance_3.setTransform(0,0,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_45();
	this.instance_4.setTransform(0,0,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_46();
	this.instance_5.setTransform(0,0,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_47();
	this.instance_6.setTransform(0,0,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_48();
	this.instance_7.setTransform(0,0,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_49();
	this.instance_8.setTransform(0,0,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_50();
	this.instance_9.setTransform(0,0,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_51();
	this.instance_10.setTransform(0,0,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_52();
	this.instance_11.setTransform(0,0,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_53();
	this.instance_12.setTransform(0,0,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_54();
	this.instance_13.setTransform(0,0,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_55();
	this.instance_14.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance}]},2).to({state:[{t:this.instance_3},{t:this.instance}]},2).to({state:[{t:this.instance_4},{t:this.instance}]},2).to({state:[{t:this.instance_5},{t:this.instance}]},2).to({state:[{t:this.instance_6},{t:this.instance}]},2).to({state:[{t:this.instance_7},{t:this.instance}]},2).to({state:[{t:this.instance_8},{t:this.instance}]},2).to({state:[{t:this.instance_9},{t:this.instance}]},2).to({state:[{t:this.instance_10},{t:this.instance}]},2).to({state:[{t:this.instance_11},{t:this.instance}]},2).to({state:[{t:this.instance_12},{t:this.instance}]},2).to({state:[{t:this.instance_13},{t:this.instance}]},2).to({state:[{t:this.instance_14},{t:this.instance}]},64).to({state:[]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,89.5,119.5);


(lib.end_smiley_button = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.end("synched",0);
	this.instance.setTransform(278.15,279.65,3.7536,3.7536,0,0,0,74.1,74.5);

	this.instance_1 = new lib.CachedBmp_40();
	this.instance_1.setTransform(-48.7,-54.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1},{t:this.instance}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.7,-54.1,647.5,647.5);


(lib.body = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.eye("synched",0);
	this.instance.setTransform(73.75,54.95,0.25,0.25,10.4093,0,0,-4.1,6.5);

	this.instance_1 = new lib.CachedBmp_31();
	this.instance_1.setTransform(-0.5,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.5,0,110,324);


(lib.Scene_1_start_end_smiley = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// start_end_smiley
	this.instance = new lib.star("synched",0);
	this.instance.setTransform(1217.4,269.45,0.535,0.535,14.9978,0,0,90,88.6);

	this.instance_1 = new lib.love("synched",0);
	this.instance_1.setTransform(889.25,268.8,0.4402,0.4402,-14.9978,0,0,109.1,109);

	this.start = new lib.playbutton();
	this.start.name = "start";
	this.start.setTransform(948.05,87.6,1.4232,1.4232,0,0,0,0,0.1);
	new cjs.ButtonHelper(this.start, 0, 1, 2, false, new lib.playbutton(), 3);

	this.again = new lib.end_smiley_button();
	this.again.name = "again";
	this.again.setTransform(150,168.1,0.25,0.25);
	new cjs.ButtonHelper(this.again, 0, 1, 2, false, new lib.end_smiley_button(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.start},{t:this.instance_1},{t:this.instance}]}).to({state:[]},2).to({state:[{t:this.again}]},597).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_man_start = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// man_start
	this.instance = new lib.Bitmap7();
	this.instance.setTransform(728.4,570.15,0.2024,0.2097,23.4723);

	this.instance_1 = new lib.Bitmap6();
	this.instance_1.setTransform(750.15,519.2,0.2014,0.2063,23.2081);

	this.instance_2 = new lib.CachedBmp_100();
	this.instance_2.setTransform(705.45,615.15,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_99();
	this.instance_3.setTransform(700.5,507,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_98();
	this.instance_4.setTransform(229.8,575.9,0.5,0.5);

	this.instance_5 = new lib.eye("synched",0);
	this.instance_5.setTransform(564.75,264.25,1,1,10.4876);

	this.instance_6 = new lib.CachedBmp_13();
	this.instance_6.setTransform(333.1,194.75,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_17();
	this.instance_7.setTransform(333.1,194.75,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_94();
	this.instance_8.setTransform(333.1,194.75,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_25();
	this.instance_9.setTransform(333.1,194.75,0.5,0.5);

	this.instance_10 = new lib.manstart();
	this.instance_10.setTransform(532.1,423.9,1,1,0,0,0,302.3,374.2);

	this.instance_11 = new lib.head();
	this.instance_11.setTransform(532.1,426.5,1,1,0,0,0,302.3,371.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_7},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},7).to({state:[{t:this.instance_8},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},6).to({state:[{t:this.instance_9},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},7).to({state:[{t:this.instance_10}]},7).to({state:[{t:this.instance_11}]},15).to({state:[{t:this.instance_11}]},17).to({state:[{t:this.instance_11}]},40).wait(197));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_IPhone_falls = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// IPhone_falls
	this.instance = new lib.handmoves("synched",0);
	this.instance.setTransform(217.9,372.45,1,1,0,0,0,56.4,37.9);

	this.instance_1 = new lib.body("synched",0);
	this.instance_1.setTransform(181.85,310.5,0.9996,0.9996,0,0,0,55.6,163);

	this.instance_2 = new lib.Shoes("synched",0);
	this.instance_2.setTransform(256.15,681.25,0.9995,0.9995,0,0,0,51.3,27.4);

	this.instance_3 = new lib.Shoes("synched",0);
	this.instance_3.setTransform(159.15,675.9,0.9999,0.9999,0,0,0,50.2,26.4);

	this.instance_4 = new lib.leg1("synched",0);
	this.instance_4.setTransform(147.2,571,0.9967,0.9967,17.2266,0,0,49.9,110.1);

	this.instance_5 = new lib.leg1("synched",0);
	this.instance_5.setTransform(211.8,572.4,0.9978,0.9978,0,0,0,47.6,109.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},511).wait(89));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_iphone = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// iphone
	this.instance = new lib.iphone("synched",0);
	this.instance.setTransform(271.9,379.05,0.9999,0.9999,14.9959,0,0,14.3,12.3);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(511).to({_off:false},0).wait(1).to({regX:14.6,regY:12.4,rotation:14.9973,x:275.1,y:392.85},0).wait(1).to({x:278,y:406.45},0).wait(1).to({x:280.9,y:420.05},0).wait(1).to({x:283.8,y:433.65},0).wait(1).to({x:286.7,y:447.25},0).wait(1).to({x:289.65,y:460.85},0).wait(1).to({x:292.55,y:474.45},0).wait(1).to({x:295.45,y:488.05},0).wait(1).to({x:298.35,y:501.65},0).wait(1).to({x:301.25,y:515.25},0).wait(1).to({x:304.15,y:528.85},0).wait(1).to({x:307.1,y:542.5},0).wait(1).to({x:310,y:556.1},0).wait(1).to({x:312.9,y:569.7},0).wait(1).to({x:315.8,y:583.3},0).wait(1).to({x:318.7,y:596.9},0).wait(1).to({x:321.6,y:610.5},0).wait(1).to({x:324.55,y:624.1},0).wait(1).to({x:327.45,y:637.7},0).wait(1).to({x:330.35,y:651.3},0).wait(1).to({x:333.25,y:664.9},0).wait(1).to({x:336.15,y:678.5},0).wait(1).to({x:339.1,y:692.1},0).wait(1).to({scaleX:0.9998,scaleY:1.1845,rotation:0,skewX:47.7831,skewY:15.3426,x:339,y:696.95},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_face = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// face
	this.instance = new lib.face("synched",0);
	this.instance.setTransform(182.25,207.55,0.9997,0.9997,0,0,0,45.6,60.4);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(511).to({_off:false},0).wait(89));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.manend = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// אייפון
	this.instance = new lib.iphone("synched",0);
	this.instance.setTransform(171.85,193.65);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(6).to({regX:14.6,regY:12.3,rotation:14.9992,x:177.65,y:226.25},0).wait(6));

	// יד_ימין
	this.instance_1 = new lib.hand("synched",0);
	this.instance_1.setTransform(133.25,215.35,1,1,0.4712,0,0,51.6,25.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(6).to({regX:51.7,rotation:12.9238,x:121.85,y:223.4},0).wait(6));

	// שאר_הגוף
	this.instance_2 = new lib.eye("synched",0);
	this.instance_2.setTransform(104,54.95,0.25,0.25,10.4093,0,0,-4.1,6.5);

	this.instance_3 = new lib.CachedBmp_92();
	this.instance_3.setTransform(29.75,0,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_93();
	this.instance_4.setTransform(29.75,4.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2,p:{y:54.95}}]}).to({state:[{t:this.instance_4},{t:this.instance_2,p:{y:59}}]},6).wait(6));

	// נעל_ימין
	this.instance_5 = new lib.Shoes("synched",0);
	this.instance_5.setTransform(59.25,528.9,1,1,0,0,0,50,26.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(6).to({regX:50.4,regY:26.4,scaleX:0.9998,scaleY:0.9998,rotation:36.1413,x:58.5,y:491.3},0).wait(2).to({rotation:14.6821,x:113.4,y:488.5},0).wait(2).to({rotation:-7.5436,x:160.6,y:530.2},0).wait(2));

	// נעל_שמאל
	this.instance_6 = new lib.Shoes("synched",0);
	this.instance_6.setTransform(160.35,521.2,1,1,-14.9992,0,0,50,26.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(2).to({regX:50.1,rotation:-8.5321,x:139.7,y:526.15},0).wait(2).to({rotation:-1.8144,x:125.25,y:527.45},0).wait(2).to({regX:50,rotation:5.9822,x:104.85,y:528.2},0).wait(1).to({x:99.6},0).wait(1).to({x:95.85},0).wait(1).to({x:86.85},0).wait(1).to({regX:50.1,rotation:13.9991,x:74,y:533.6},0).wait(2));

	// רגל_שמאל
	this.instance_7 = new lib.leg1("synched",0);
	this.instance_7.setTransform(107.5,421,1,1,0,0,0,40.5,102);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(2).to({rotation:5.1924,x:97.1,y:418.9},0).wait(2).to({regX:40.6,rotation:9.6796,x:88.8,y:416.15},0).wait(2).to({regY:102.1,rotation:14.665,x:80.45,y:412.7},0).wait(1).to({x:74.45},0).wait(1).to({x:67.5},0).wait(1).to({x:60},0).wait(1).to({rotation:19.6405,x:61.55,y:410.6},0).wait(2));

	// רגל_ימין
	this.instance_8 = new lib.leg1("synched",0);
	this.instance_8.setTransform(42.45,413.6,1,1,17.986,0,0,40.6,102.1);

	this.instance_9 = new lib.legwalk("synched",0);
	this.instance_9.setTransform(77.95,395,1,1,0,0,0,44.5,76);

	this.instance_10 = new lib.Almoststraightleg("synched",0);
	this.instance_10.setTransform(86.25,394.85,1,1,0,0,0,36.3,72.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8,p:{regX:40.6,regY:102.1,rotation:17.986,x:42.45,y:413.6}}]}).to({state:[{t:this.instance_9}]},6).to({state:[{t:this.instance_10}]},2).to({state:[{t:this.instance_8,p:{regX:40.5,regY:102,rotation:0,x:107.5,y:421}}]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.6,0,243.1,571);


(lib.Scene_1_man = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// man
	this.instance = new lib.manend("synched",0);
	this.instance.setTransform(-140.95,435.75,1,1,0,0,0,93.9,288.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(449).to({_off:false},0).wait(1).to({regY:285.5,x:-135.5,y:433.15,startPosition:1},0).wait(1).to({x:-130.05,startPosition:2},0).wait(1).to({x:-124.6,startPosition:3},0).wait(1).to({x:-119.2,startPosition:4},0).wait(1).to({x:-113.75,startPosition:5},0).wait(1).to({x:-108.3,startPosition:6},0).wait(1).to({x:-102.9,startPosition:7},0).wait(1).to({x:-97.45,startPosition:8},0).wait(1).to({x:-92,startPosition:9},0).wait(1).to({x:-86.6,startPosition:10},0).wait(1).to({x:-81.15,startPosition:11},0).wait(1).to({x:-75.7,startPosition:0},0).wait(1).to({x:-70.3,startPosition:1},0).wait(1).to({x:-64.85,startPosition:2},0).wait(1).to({x:-59.4,startPosition:3},0).wait(1).to({x:-53.95,startPosition:4},0).wait(1).to({x:-48.55,startPosition:5},0).wait(1).to({x:-43.1,startPosition:6},0).wait(1).to({x:-37.65,startPosition:7},0).wait(1).to({x:-32.25,startPosition:8},0).wait(1).to({x:-26.8,startPosition:9},0).wait(1).to({x:-21.35,startPosition:10},0).wait(1).to({x:-15.95,startPosition:11},0).wait(1).to({x:-10.5,startPosition:0},0).wait(1).to({x:-5.05,startPosition:1},0).wait(1).to({x:0.35,startPosition:2},0).wait(1).to({x:5.8,startPosition:3},0).wait(1).to({x:11.25,startPosition:4},0).wait(1).to({x:16.65,startPosition:5},0).wait(1).to({x:22.1,startPosition:6},0).wait(1).to({x:27.55,startPosition:7},0).wait(1).to({x:33,startPosition:8},0).wait(1).to({x:38.4,startPosition:9},0).wait(1).to({x:43.85,startPosition:10},0).wait(1).to({x:49.3,startPosition:11},0).wait(1).to({x:54.7,startPosition:0},0).wait(1).to({x:60.15,startPosition:1},0).wait(1).to({x:65.6,startPosition:2},0).wait(1).to({x:71,startPosition:3},0).wait(1).to({x:76.45,startPosition:4},0).wait(1).to({x:81.9,startPosition:5},0).wait(1).to({x:87.3,startPosition:6},0).wait(1).to({x:92.75,startPosition:7},0).wait(1).to({x:98.15,startPosition:8},0).wait(1).to({x:103.55,startPosition:9},0).wait(1).to({x:109,startPosition:10},0).wait(1).to({x:114.45,startPosition:11},0).wait(1).to({x:119.9,startPosition:0},0).wait(1).to({x:125.3,startPosition:1},0).wait(1).to({x:130.75,startPosition:2},0).wait(1).to({x:136.2,startPosition:3},0).wait(1).to({x:141.6,startPosition:4},0).wait(1).to({x:147.05,startPosition:5},0).wait(1).to({x:152.5,startPosition:6},0).wait(1).to({x:157.9,startPosition:7},0).wait(1).to({x:163.35,startPosition:8},0).wait(1).to({x:168.8,startPosition:9},0).wait(1).to({x:174.2,startPosition:10},0).wait(1).to({x:179.65,startPosition:11},0).wait(1).to({x:185.1,startPosition:0},0).wait(1).to({x:190.55,y:433.2,startPosition:1},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.emoji__linoyalbahari = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0,1,2,38,77,125,164,205,244,333,368,403,438,468,541,599];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.start = this.start_end_smiley.start;
		var self= this;
		self.stop();
		self.start.addEventListener("click",startplaying);
		
		function startplaying(){
		self.gotoAndPlay(0);	
		
			}
	}
	this.frame_1 = function() {
		playSound("song");
		playSound("blink3");
	}
	this.frame_2 = function() {
		this.start = undefined;
	}
	this.frame_38 = function() {
		playSound("bendover");
	}
	this.frame_77 = function() {
		playSound("הקלטה3");
	}
	this.frame_125 = function() {
		playSound("jump1");
	}
	this.frame_164 = function() {
		playSound("jump1");
	}
	this.frame_205 = function() {
		playSound("jump1");
	}
	this.frame_244 = function() {
		playSound("jump1");
	}
	this.frame_333 = function() {
		playSound("boing");
	}
	this.frame_368 = function() {
		playSound("boing");
	}
	this.frame_403 = function() {
		playSound("boing");
	}
	this.frame_438 = function() {
		playSound("boing");
	}
	this.frame_468 = function() {
		playSound("walking");
	}
	this.frame_541 = function() {
		playSound("PainSoundBiblecom1883168362");
	}
	this.frame_599 = function() {
		this.again = this.start_end_smiley.again;
		this.___loopingOver___ = true;
		var self=this;
		self.stop();
		self.again.addEventListener("click",playAgain);
		
		function playAgain() {
			self.gotoAndPlay(1);
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(36).call(this.frame_38).wait(39).call(this.frame_77).wait(48).call(this.frame_125).wait(39).call(this.frame_164).wait(41).call(this.frame_205).wait(39).call(this.frame_244).wait(89).call(this.frame_333).wait(35).call(this.frame_368).wait(35).call(this.frame_403).wait(35).call(this.frame_438).wait(30).call(this.frame_468).wait(73).call(this.frame_541).wait(58).call(this.frame_599).wait(1));

	// Camera
	this.___camera___instance = new lib.___Camera___();
	this.___camera___instance.name = "___camera___instance";
	this.___camera___instance.setTransform(640,360);
	this.___camera___instance.depth = 0;
	this.___camera___instance.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.___camera___instance).wait(47).to({scaleX:0.9748,scaleY:0.9748,x:643.9,y:367.95},0).wait(1).to({scaleX:0.9306,scaleY:0.9306,x:650.8064,y:381.8686},0).wait(1).to({scaleX:0.8865,scaleY:0.8865,x:657.7129,y:395.7871},0).wait(1).to({scaleX:0.8423,scaleY:0.8423,x:664.6193,y:409.7057},0).wait(1).to({scaleX:0.7982,scaleY:0.7982,x:671.5258,y:423.6243},0).wait(1).to({scaleX:0.754,scaleY:0.754,x:678.4322,y:437.5428},0).wait(1).to({scaleX:0.7099,scaleY:0.7099,x:685.3386,y:451.4614},0).wait(1).to({scaleX:0.6657,scaleY:0.6657,x:692.2451,y:465.3799},0).wait(1).to({scaleX:0.6216,scaleY:0.6216,x:699.1515,y:479.2985},0).wait(1).to({scaleX:0.5775,scaleY:0.5775,x:706.0579,y:493.2171},0).wait(1).to({scaleX:0.5333,scaleY:0.5333,x:712.9644,y:507.1356},0).wait(1).to({scaleX:0.4892,scaleY:0.4892,x:719.8708,y:521.0542},0).wait(1).to({scaleX:0.445,scaleY:0.445,x:726.7773,y:534.9728},0).wait(1).to({scaleX:0.4009,scaleY:0.4009,x:733.6837,y:548.8913},0).wait(1).to({scaleX:0.3567,scaleY:0.3567,x:740.5901,y:562.8099},0).wait(1).to({scaleX:0.3126,scaleY:0.3126,x:747.4966,y:576.7284},0).wait(1).to({scaleX:0.2684,scaleY:0.2684,x:754.403,y:590.647},0).wait(233).to({scaleX:0.9662,scaleY:0.9662,x:656.053,y:388.447},0).wait(244).to({scaleX:0.9506,scaleY:0.9506,x:646.0666,y:384.88},0).wait(1).to({scaleX:0.935,scaleY:0.935,x:636.0803,y:381.3129},0).wait(1).to({scaleX:0.9194,scaleY:0.9194,x:626.0939,y:377.7459},0).wait(1).to({scaleX:0.9038,scaleY:0.9038,x:616.1075,y:374.1788},0).wait(1).to({scaleX:0.8882,scaleY:0.8882,x:606.1212,y:370.6118},0).wait(1).to({scaleX:0.8725,scaleY:0.8725,x:596.1348,y:367.0447},0).wait(1).to({scaleX:0.8569,scaleY:0.8569,x:586.1485,y:363.4777},0).wait(1).to({scaleX:0.8413,scaleY:0.8413,x:576.1621,y:359.9106},0).wait(1).to({scaleX:0.8257,scaleY:0.8257,x:566.1757,y:356.3436},0).wait(1).to({scaleX:0.8101,scaleY:0.8101,x:556.1894,y:352.7766},0).wait(1).to({scaleX:0.7945,scaleY:0.7945,x:546.203,y:349.2095},0).wait(1).to({scaleX:0.7788,scaleY:0.7788,x:536.2166,y:345.6425},0).wait(1).to({scaleX:0.7632,scaleY:0.7632,x:526.2303,y:342.0754},0).wait(1).to({scaleX:0.7476,scaleY:0.7476,x:516.2439,y:338.5084},0).wait(1).to({scaleX:0.732,scaleY:0.732,x:506.2576,y:334.9413},0).wait(1).to({scaleX:0.7164,scaleY:0.7164,x:496.2712,y:331.3743},0).wait(1).to({scaleX:0.7008,scaleY:0.7008,x:486.2848,y:327.8072},0).wait(1).to({scaleX:0.6851,scaleY:0.6851,x:476.2985,y:324.2402},0).wait(1).to({scaleX:0.6695,scaleY:0.6695,x:466.3121,y:320.6731},0).wait(1).to({scaleX:0.6539,scaleY:0.6539,x:456.3257,y:317.1061},0).wait(1).to({scaleX:0.6383,scaleY:0.6383,x:446.3394,y:313.539},0).wait(1).to({scaleX:0.6227,scaleY:0.6227,x:436.353,y:309.972},0).wait(1).to({scaleX:0.607,scaleY:0.607,x:426.3666,y:306.405},0).wait(1).to({scaleX:0.5914,scaleY:0.5914,x:416.3803,y:302.8379},0).wait(1).to({scaleX:0.5758,scaleY:0.5758,x:406.3939,y:299.2709},0).wait(1).to({scaleX:0.5602,scaleY:0.5602,x:396.4076,y:295.7038},0).wait(1).to({scaleX:0.5446,scaleY:0.5446,x:386.4212,y:292.1368},0).wait(1).to({scaleX:0.529,scaleY:0.529,x:376.4348,y:288.5697},0).wait(1).to({scaleX:0.5133,scaleY:0.5133,x:366.4485,y:285.0027},0).wait(1).to({scaleX:0.4977,scaleY:0.4977,x:356.4621,y:281.4356},0).wait(1).to({scaleX:0.4821,scaleY:0.4821,x:346.4757,y:277.8686},0).wait(1).to({scaleX:0.4665,scaleY:0.4665,x:336.4894,y:274.3016},0).wait(1).to({scaleX:0.4509,scaleY:0.4509,x:326.503,y:270.7345},0).wait(1).to({scaleX:0.4353,scaleY:0.4353,x:316.5166,y:267.1674},0).wait(1).to({scaleX:0.4196,scaleY:0.4196,x:306.5303,y:263.6004},0).wait(1).to({scaleX:0.404,scaleY:0.404,x:296.5439,y:260.0334},0).wait(1).to({scaleX:0.3884,scaleY:0.3884,x:286.5576,y:256.4663},0).wait(1).to({scaleX:0.3728,scaleY:0.3728,x:276.5712,y:252.8993},0).wait(1).to({scaleX:0.3572,scaleY:0.3572,x:266.5848,y:249.3322},0).wait(1).to({scaleX:0.3416,scaleY:0.3416,x:256.5985,y:245.7652},0).wait(1).to({scaleX:0.3259,scaleY:0.3259,x:246.6121,y:242.1981},0).wait(1).to({scaleX:0.3103,scaleY:0.3103,x:236.6257,y:238.6311},0).wait(1).to({scaleX:0.2947,scaleY:0.2947,x:226.6394,y:235.0641},0).wait(1).to({scaleX:0.2791,scaleY:0.2791,x:216.653,y:231.497},0).wait(17));

	// start_end_smiley_obj_
	this.start_end_smiley = new lib.Scene_1_start_end_smiley();
	this.start_end_smiley.name = "start_end_smiley";
	this.start_end_smiley.setTransform(1053.2,207.5,1,1,0,0,0,1053.2,207.5);
	this.start_end_smiley.depth = 0;
	this.start_end_smiley.isAttachedToCamera = 0
	this.start_end_smiley.isAttachedToMask = 0
	this.start_end_smiley.layerDepth = 0
	this.start_end_smiley.layerIndex = 0
	this.start_end_smiley.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.start_end_smiley).wait(599).to({regX:332,regY:189,scaleX:3.5835,scaleY:3.5835,x:1053.25,y:207.7},0).wait(1));

	// Smiley_Jump_obj_
	this.Smiley_Jump = new lib.Scene_1_Smiley_Jump();
	this.Smiley_Jump.name = "Smiley_Jump";
	this.Smiley_Jump.depth = 0;
	this.Smiley_Jump.isAttachedToCamera = 0
	this.Smiley_Jump.isAttachedToMask = 0
	this.Smiley_Jump.layerDepth = 0
	this.Smiley_Jump.layerIndex = 1
	this.Smiley_Jump.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Smiley_Jump).wait(99).to({regX:582.6,regY:493.9,scaleX:3.7255,scaleY:3.7255,y:-0.15},0).wait(27).to({regX:838.9,regY:666,scaleX:1,scaleY:1,x:256.3,y:172.1},0).wait(48).to({_off:true},1).wait(425));

	// Crying_Jump_obj_
	this.Crying_Jump = new lib.Scene_1_Crying_Jump();
	this.Crying_Jump.name = "Crying_Jump";
	this.Crying_Jump.depth = 0;
	this.Crying_Jump.isAttachedToCamera = 0
	this.Crying_Jump.isAttachedToMask = 0
	this.Crying_Jump.layerDepth = 0
	this.Crying_Jump.layerIndex = 2
	this.Crying_Jump.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Crying_Jump).wait(130).to({regX:582.6,regY:493.9,scaleX:3.7255,scaleY:3.7255,y:-0.15},0).wait(35).to({regX:651.8,regY:641.2,scaleX:1,scaleY:1,x:69.2,y:147.3},0).wait(49).to({_off:true},1).wait(385));

	// Love_Jump_obj_
	this.Love_Jump = new lib.Scene_1_Love_Jump();
	this.Love_Jump.name = "Love_Jump";
	this.Love_Jump.depth = 0;
	this.Love_Jump.isAttachedToCamera = 0
	this.Love_Jump.isAttachedToMask = 0
	this.Love_Jump.layerDepth = 0
	this.Love_Jump.layerIndex = 3
	this.Love_Jump.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Love_Jump).wait(178).to({regX:582.6,regY:493.9,scaleX:3.7255,scaleY:3.7255,y:-0.15},0).wait(28).to({regX:839.8,regY:639.2,scaleX:1,scaleY:1,x:257.2,y:145.3},0).wait(49).to({_off:true},1).wait(344));

	// stars_Jump_obj_
	this.stars_Jump = new lib.Scene_1_stars_Jump();
	this.stars_Jump.name = "stars_Jump";
	this.stars_Jump.depth = 0;
	this.stars_Jump.isAttachedToCamera = 0
	this.stars_Jump.isAttachedToMask = 0
	this.stars_Jump.layerDepth = 0
	this.stars_Jump.layerIndex = 4
	this.stars_Jump.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.stars_Jump).wait(213).to({regX:582.6,regY:493.9,scaleX:3.7255,scaleY:3.7255,y:-0.15},0).wait(33).to({regX:664.7,regY:635.4,scaleX:1,scaleY:1,x:82.1,y:141.5},0).wait(49).to({_off:true},1).wait(304));

	// man_obj_
	this.man = new lib.Scene_1_man();
	this.man.name = "man";
	this.man.depth = 0;
	this.man.isAttachedToCamera = 0
	this.man.isAttachedToMask = 0
	this.man.layerDepth = 0
	this.man.layerIndex = 5
	this.man.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.man).wait(449).to({regX:37.6,regY:40.6,scaleX:1.035,scaleY:1.035,x:-0.05,y:0.05},0).wait(1).to({regX:24.8,regY:433.2,scaleX:1,scaleY:1,x:-12.8,y:392.7},0).wait(60).to({_off:true},1).wait(89));

	// iphone_obj_
	this.iphone = new lib.Scene_1_iphone();
	this.iphone.name = "iphone";
	this.iphone.depth = 0;
	this.iphone.isAttachedToCamera = 0
	this.iphone.isAttachedToMask = 0
	this.iphone.layerDepth = 0
	this.iphone.layerIndex = 6
	this.iphone.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.iphone).wait(511).to({regX:37.6,regY:40.6,scaleX:1.035,scaleY:1.035,x:-0.05,y:0.05},0).wait(1).to({regX:310.1,regY:536.9,scaleX:1,scaleY:1,x:272.5,y:496.4},0).wait(88));

	// face_obj_
	this.face = new lib.Scene_1_face();
	this.face.name = "face";
	this.face.depth = 0;
	this.face.isAttachedToCamera = 0
	this.face.isAttachedToMask = 0
	this.face.layerDepth = 0
	this.face.layerIndex = 7
	this.face.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.face).wait(511).to({regX:37.6,regY:40.6,scaleX:1.035,scaleY:1.035,x:-0.05,y:0.05},0).wait(89));

	// IPhone_falls_obj_
	this.IPhone_falls = new lib.Scene_1_IPhone_falls();
	this.IPhone_falls.name = "IPhone_falls";
	this.IPhone_falls.depth = 0;
	this.IPhone_falls.isAttachedToCamera = 0
	this.IPhone_falls.isAttachedToMask = 0
	this.IPhone_falls.layerDepth = 0
	this.IPhone_falls.layerIndex = 8
	this.IPhone_falls.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.IPhone_falls).wait(508).to({regX:37.6,regY:40.6,scaleX:1.035,scaleY:1.035,x:-0.05,y:0.05},0).wait(92));

	// Smiley_obj_
	this.Smiley = new lib.Scene_1_Smiley();
	this.Smiley.name = "Smiley";
	this.Smiley.depth = 0;
	this.Smiley.isAttachedToCamera = 0
	this.Smiley.isAttachedToMask = 0
	this.Smiley.layerDepth = 0
	this.Smiley.layerIndex = 9
	this.Smiley.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Smiley).wait(296).to({regX:37.6,regY:40.6,scaleX:1.035,scaleY:1.035,x:-0.05,y:0.05},0).wait(1).to({regX:787.6,regY:271.9,scaleX:1,scaleY:1,x:750,y:231.4},0).wait(303));

	// Crying_obj_
	this.Crying = new lib.Scene_1_Crying();
	this.Crying.name = "Crying";
	this.Crying.depth = 0;
	this.Crying.isAttachedToCamera = 0
	this.Crying.isAttachedToMask = 0
	this.Crying.layerDepth = 0
	this.Crying.layerIndex = 10
	this.Crying.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Crying).wait(333).to({regX:37.6,regY:40.6,scaleX:1.035,scaleY:1.035,x:-0.05,y:0.05},0).wait(2).to({regX:776.2,regY:307.5,scaleX:1,scaleY:1,x:738.6,y:267},0).wait(265));

	// Love_obj_
	this.Love = new lib.Scene_1_Love();
	this.Love.name = "Love";
	this.Love.depth = 0;
	this.Love.isAttachedToCamera = 0
	this.Love.isAttachedToMask = 0
	this.Love.layerDepth = 0
	this.Love.layerIndex = 11
	this.Love.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Love).wait(368).to({regX:37.6,regY:40.6,scaleX:1.035,scaleY:1.035,x:-0.05,y:0.05},0).wait(2).to({regX:758.1,regY:278,scaleX:1,scaleY:1,x:720.5,y:237.5},0).wait(230));

	// stars_obj_
	this.stars = new lib.Scene_1_stars();
	this.stars.name = "stars";
	this.stars.depth = 0;
	this.stars.isAttachedToCamera = 0
	this.stars.isAttachedToMask = 0
	this.stars.layerDepth = 0
	this.stars.layerIndex = 12
	this.stars.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.stars).wait(403).to({regX:37.6,regY:40.6,scaleX:1.035,scaleY:1.035,x:-0.05,y:0.05},0).wait(2).to({regX:763.9,regY:291.6,scaleX:1,scaleY:1,x:726.3,y:251.1},0).wait(195));

	// window_obj_
	this.window = new lib.Scene_1_window();
	this.window.name = "window";
	this.window.depth = 0;
	this.window.isAttachedToCamera = 0
	this.window.isAttachedToMask = 0
	this.window.layerDepth = 0
	this.window.layerIndex = 13
	this.window.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.window).wait(296).to({regX:37.6,regY:40.6,scaleX:1.035,scaleY:1.035,x:-0.05,y:0.05},0).wait(304));

	// background_obj_
	this.background = new lib.Scene_1_background();
	this.background.name = "background";
	this.background.depth = 0;
	this.background.isAttachedToCamera = 0
	this.background.isAttachedToMask = 0
	this.background.layerDepth = 0
	this.background.layerIndex = 14
	this.background.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.background).wait(295).to({regX:582.6,regY:493.9,scaleX:3.7255,scaleY:3.7255,y:-0.15},0).wait(1).to({regX:37.6,regY:40.6,scaleX:1.035,scaleY:1.035,x:-0.05,y:0.05},0).wait(304));

	// clouds_obj_
	this.clouds = new lib.Scene_1_clouds();
	this.clouds.name = "clouds";
	this.clouds.depth = 0;
	this.clouds.isAttachedToCamera = 0
	this.clouds.isAttachedToMask = 0
	this.clouds.layerDepth = 0
	this.clouds.layerIndex = 15
	this.clouds.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.clouds).wait(296).to({regX:37.6,regY:40.6,scaleX:1.035,scaleY:1.035,x:-0.05,y:0.05},0).wait(1).to({regX:339.3,regY:145.2,scaleX:1,scaleY:1,x:301.7,y:104.7},0).wait(303));

	// window_background_obj_
	this.window_background = new lib.Scene_1_window_background();
	this.window_background.name = "window_background";
	this.window_background.depth = 0;
	this.window_background.isAttachedToCamera = 0
	this.window_background.isAttachedToMask = 0
	this.window_background.layerDepth = 0
	this.window_background.layerIndex = 16
	this.window_background.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.window_background).wait(296).to({regX:37.6,regY:40.6,scaleX:1.035,scaleY:1.035,x:-0.05,y:0.05},0).wait(304));

	// sending_obj_
	this.sending = new lib.Scene_1_sending();
	this.sending.name = "sending";
	this.sending.setTransform(661.5,-109,1,1,0,0,0,661.5,-109);
	this.sending.depth = 0;
	this.sending.isAttachedToCamera = 0
	this.sending.isAttachedToMask = 0
	this.sending.layerDepth = 0
	this.sending.layerIndex = 17
	this.sending.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.sending).wait(105).to({regX:760.1,regY:464.7,scaleX:3.7255,scaleY:3.7255,x:661.25,y:-108.95},0).wait(140).to({_off:true},51).wait(304));

	// finger_obj_
	this.finger = new lib.Scene_1_finger();
	this.finger.name = "finger";
	this.finger.setTransform(708.8,590.8,1,1,0,0,0,708.8,590.8);
	this.finger.depth = 0;
	this.finger.isAttachedToCamera = 0
	this.finger.isAttachedToMask = 0
	this.finger.layerDepth = 0
	this.finger.layerIndex = 18
	this.finger.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.finger).to({_off:true},296).wait(304));

	// hair_obj_
	this.hair = new lib.Scene_1_hair();
	this.hair.name = "hair";
	this.hair.setTransform(490.4,231.5,1,1,0,0,0,490.4,231.5);
	this.hair.depth = 0;
	this.hair.isAttachedToCamera = 0
	this.hair.isAttachedToMask = 0
	this.hair.layerDepth = 0
	this.hair.layerIndex = 19
	this.hair.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.hair).wait(48).to({regX:511.5,regY:262.1,scaleX:1.0746,scaleY:1.0746,x:490.35,y:231.4},0).wait(1).to({regX:525,regY:281.8,scaleX:1.1281,scaleY:1.1281,y:231.45},0).wait(1).to({regX:538.5,regY:301.4,scaleX:1.1872,scaleY:1.1872},0).to({_off:true},246).wait(304));

	// man_start_obj_
	this.man_start = new lib.Scene_1_man_start();
	this.man_start.name = "man_start";
	this.man_start.setTransform(532.1,496.3,1,1,0,0,0,532.1,496.3);
	this.man_start.depth = 0;
	this.man_start.isAttachedToCamera = 0
	this.man_start.isAttachedToMask = 0
	this.man_start.layerDepth = 0
	this.man_start.layerIndex = 20
	this.man_start.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.man_start).wait(59).to({regX:678.8,regY:595.6,scaleX:2.2473,scaleY:2.2473,x:532.15,y:496.35},0).wait(40).to({regX:725.5,regY:627.1,scaleX:3.7255,scaleY:3.7255,x:532.35,y:496.1},0).to({_off:true},197).wait(304));

	// blue_background_obj_
	this.blue_background = new lib.Scene_1_blue_background();
	this.blue_background.name = "blue_background";
	this.blue_background.setTransform(636.3,357.2,1,1,0,0,0,636.3,357.2);
	this.blue_background.depth = 0;
	this.blue_background.isAttachedToCamera = 0
	this.blue_background.isAttachedToMask = 0
	this.blue_background.layerDepth = 0
	this.blue_background.layerIndex = 21
	this.blue_background.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.blue_background).to({_off:true},296).wait(304));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(321.5,186.4,972.3,611.5);
// library properties:
lib.properties = {
	id: '0A988691E02D7447A45140D4F912B470',
	width: 1280,
	height: 720,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_29.png?1618900100550", id:"CachedBmp_29"},
		{src:"images/CachedBmp_3.png?1618900100550", id:"CachedBmp_3"},
		{src:"images/emoji_linoyalbahari_atlas_1.png?1618900099872", id:"emoji_linoyalbahari_atlas_1"},
		{src:"images/emoji_linoyalbahari_atlas_2.png?1618900099873", id:"emoji_linoyalbahari_atlas_2"},
		{src:"images/emoji_linoyalbahari_atlas_3.png?1618900099873", id:"emoji_linoyalbahari_atlas_3"},
		{src:"images/emoji_linoyalbahari_atlas_4.png?1618900099873", id:"emoji_linoyalbahari_atlas_4"},
		{src:"images/emoji_linoyalbahari_atlas_5.png?1618900099874", id:"emoji_linoyalbahari_atlas_5"},
		{src:"images/emoji_linoyalbahari_atlas_6.png?1618900099874", id:"emoji_linoyalbahari_atlas_6"},
		{src:"images/emoji_linoyalbahari_atlas_7.png?1618900099875", id:"emoji_linoyalbahari_atlas_7"},
		{src:"images/emoji_linoyalbahari_atlas_8.png?1618900099878", id:"emoji_linoyalbahari_atlas_8"},
		{src:"images/emoji_linoyalbahari_atlas_9.png?1618900099880", id:"emoji_linoyalbahari_atlas_9"},
		{src:"sounds/bendover.mp3?1618900100550", id:"bendover"},
		{src:"sounds/boing.mp3?1618900100550", id:"boing"},
		{src:"sounds/jump1.mp3?1618900100550", id:"jump1"},
		{src:"sounds/PainSoundBiblecom1883168362.mp3?1618900100550", id:"PainSoundBiblecom1883168362"},
		{src:"sounds/song.mp3?1618900100550", id:"song"},
		{src:"sounds/הקלטה3.mp3?1618900100550", id:"הקלטה3"},
		{src:"sounds/walking.mp3?1618900100550", id:"walking"},
		{src:"sounds/blink3.mp3?1618900100550", id:"blink3"}
	],
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
an.compositions['0A988691E02D7447A45140D4F912B470'] = {
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

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
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

// Virtual camera API : 

an.VirtualCamera = new function() {
var _camera = new Object();
function VC(timeline) {
	this.timeline = timeline;
	this.camera = timeline.___camera___instance;
	this.centerX = lib.properties.width / 2;
	this.centerY = lib.properties.height / 2;
	this.camAxisX = this.camera.x;
	this.camAxisY = this.camera.y;
	if(timeline.___camera___instance == null || timeline.___camera___instance == undefined ) {
		timeline.___camera___instance = new cjs.MovieClip();
		timeline.___camera___instance.visible = false;
		timeline.___camera___instance.parent = timeline;
		timeline.___camera___instance.setTransform(this.centerX, this.centerY);
	}
	this.camera = timeline.___camera___instance;
}

VC.prototype.moveBy = function(x, y, z) {
z = typeof z !== 'undefined' ? z : 0;
	var position = this.___getCamPosition___();
	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	this.camAxisX = this.camAxisX - x;
	this.camAxisY = this.camAxisY - y;
	var posX = position.x + offX;
	var posY = position.y + offY;
	this.camera.x = this.centerX - posX;
	this.camera.y = this.centerY - posY;
	this.camera.depth += z;
};

VC.prototype.setPosition = function(x, y, z) {
	z = typeof z !== 'undefined' ? z : 0;

	const MAX_X = 10000;
	const MIN_X = -10000;
	const MAX_Y = 10000;
	const MIN_Y = -10000;
	const MAX_Z = 10000;
	const MIN_Z = -5000;

	if(x > MAX_X)
	  x = MAX_X;
	else if(x < MIN_X)
	  x = MIN_X;
	if(y > MAX_Y)
	  y = MAX_Y;
	else if(y < MIN_Y)
	  y = MIN_Y;
	if(z > MAX_Z)
	  z = MAX_Z;
	else if(z < MIN_Z)
	  z = MIN_Z;

	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	
	this.camAxisX = this.centerX - x;
	this.camAxisY = this.centerY - y;
	this.camera.x = this.centerX - offX;
	this.camera.y = this.centerY - offY;
	this.camera.depth = z;
};

VC.prototype.getPosition = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camAxisX;
	loc['y'] = this.centerY - this.camAxisY;
	loc['z'] = this.camera.depth;
	return loc;
};

VC.prototype.resetPosition = function() {
	this.setPosition(0, 0);
};

VC.prototype.zoomBy = function(zoom) {
	this.setZoom( (this.getZoom() * zoom) / 100);
};

VC.prototype.setZoom = function(zoom) {
	const MAX_zoom = 10000;
	const MIN_zoom = 1;
	if(zoom > MAX_zoom)
	zoom = MAX_zoom;
	else if(zoom < MIN_zoom)
	zoom = MIN_zoom;
	this.camera.scaleX = 100 / zoom;
	this.camera.scaleY = 100 / zoom;
};

VC.prototype.getZoom = function() {
	return 100 / this.camera.scaleX;
};

VC.prototype.resetZoom = function() {
	this.setZoom(100);
};

VC.prototype.rotateBy = function(angle) {
	this.setRotation( this.getRotation() + angle );
};

VC.prototype.setRotation = function(angle) {
	const MAX_angle = 180;
	const MIN_angle = -179;
	if(angle > MAX_angle)
		angle = MAX_angle;
	else if(angle < MIN_angle)
		angle = MIN_angle;
	this.camera.rotation = -angle;
};

VC.prototype.getRotation = function() {
	return -this.camera.rotation;
};

VC.prototype.resetRotation = function() {
	this.setRotation(0);
};

VC.prototype.reset = function() {
	this.resetPosition();
	this.resetZoom();
	this.resetRotation();
	this.unpinCamera();
};
VC.prototype.setZDepth = function(zDepth) {
	const MAX_zDepth = 10000;
	const MIN_zDepth = -5000;
	if(zDepth > MAX_zDepth)
		zDepth = MAX_zDepth;
	else if(zDepth < MIN_zDepth)
		zDepth = MIN_zDepth;
	this.camera.depth = zDepth;
}
VC.prototype.getZDepth = function() {
	return this.camera.depth;
}
VC.prototype.resetZDepth = function() {
	this.camera.depth = 0;
}

VC.prototype.pinCameraToObject = function(obj, offsetX, offsetY, offsetZ) {

	offsetX = typeof offsetX !== 'undefined' ? offsetX : 0;

	offsetY = typeof offsetY !== 'undefined' ? offsetY : 0;

	offsetZ = typeof offsetZ !== 'undefined' ? offsetZ : 0;
	if(obj === undefined)
		return;
	this.camera.pinToObject = obj;
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
};

VC.prototype.setPinOffset = function(offsetX, offsetY, offsetZ) {
	if(this.camera.pinToObject != undefined) {
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
	}
};

VC.prototype.unpinCamera = function() {
	this.camera.pinToObject = undefined;
};
VC.prototype.___getCamPosition___ = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camera.x;
	loc['y'] = this.centerY - this.camera.y;
	loc['z'] = this.depth;
	return loc;
};

this.getCamera = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	if(_camera[timeline] == undefined)
	_camera[timeline] = new VC(timeline);
	return _camera[timeline];
}

this.getCameraAsMovieClip = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	return this.getCamera(timeline).camera;
}
}


// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;