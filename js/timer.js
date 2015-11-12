// begin and end time in minutes since 00:00:00 of today (local time)
var periods = [
	{name:'1st Period', time:{from:{h:7,m:45},to:{h:8,m:30}}},
	{name:'2nd Period', time:{from:{h:8,m:40},to:{h:9,m:25}}},
	{name:'3rd & 4th Period', time:{from:{h:9,m:45},to:{h:11,m:15}}},
	{name:'5th Period', time:{from:{h:11,m:35},to:{h:12,m:20}}},
	{name:'6th Period', time:{from:{h:12,m:30},to:{h:13,m:15}}},
	{name:'7th Period', time:{from:{h:13,m:40},to:{h:14,m:25}}},
	{name:'8th Period', time:{from:{h:14,m:30},to:{h:15,m:15}}},
	{name:'9th Period', time:{from:{h:15,m:20},to:{h:16,m:05}}},
	{name:'The Dark Period', time:{from:{h:00,m:20},to:{h:00,m:24}}}
];

var timer = {
	e: null,
	h: null,
	m: null,
	s: null,
	i: null
};

function update() {
	var date = new Date();
	var now = {
		h: date.getHours(),
		m: date.getMinutes(),
		s: date.getSeconds(),
		ms: date.getMilliseconds()
	};
	for (var p = 0; p < periods.length; p++) {
		if (((now.h == periods[p].time.from.h && now.m >= periods[p].time.from.m) && (now.h == periods[p].time.to.h && now.m < periods[p].time.to.m)) ||
			((now.h == periods[p].time.from.h && now.m >= periods[p].time.from.m) && now.h < periods[p].time.to.h) ||
			(now.h > periods[p].time.from.h && (now.h == periods[p].time.to.h && now.m < periods[p].time.to.m)) ||
			(now.h > periods[p].time.from.h && now.h < periods[p].time.to.h)) {
			//providing a leading zero for consistent string width
			timer.h.innerHTML = ('0'+(periods[p].time.to.h - now.h)).slice(-2);
			timer.m.innerHTML = ('0'+(periods[p].time.to.m - now.m -1)).slice(-2);
			timer.s.innerHTML = ('0'+(59 - now.s)).slice(-2);
			timer.i.innerHTML = periods[p].name;
			break;
		} else if (p == periods.length-1) {
			//p = null;
			//providing a leading zero for consistent string width
			timer.h.innerHTML = ('0'+now.h).slice(-2);
			timer.m.innerHTML = ('0'+now.m).slice(-2);
			timer.s.innerHTML = ('0'+now.s).slice(-2);
			timer.i.innerHTML = '';
			break;
		}
	}
	setTimeout(function(){window.requestAnimationFrame(update);}, 990-(new Date().getMilliseconds()));
	return p;
}

window.onload = function(){
	timer.e = document.getElementById('timer');
	timer.h = document.getElementById('hours');
	timer.m = document.getElementById('minutes');
	timer.s = document.getElementById('seconds');
	timer.i = document.getElementById('info');

	update();
	adaptfont(timer.e);
	timer.i.style.fontSize = parseInt(timer.e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[1]) /5 + timer.e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[2];
};

window.onresize = function(){
	adaptfont(timer.e);
	timer.i.style.fontSize = parseInt(timer.e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[1]) /5 + timer.e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[2];
}

function adaptfont(e) {
	if (typeof e === 'undefined') {
		return false
	}
	if (e.style.fontSize === '') {
		e.style.fontSize = '1px';
	}
	while (e.offsetWidth >= e.scrollWidth) {
		//increase size
		e.style.fontSize = parseInt(e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[1]) * 1.1 +1 + e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[2];
	}
	while (e.offsetWidth < e.scrollWidth) {
		//decrease size
		e.style.fontSize = parseInt(e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[1]) * 0.9 -1 + e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[2];
	}
	return e.style.fontSize;
}

/*
function adaptfont(e) {
	if (typeof e === 'undefined') {
		return false
	}
	if (e.style.fontSize === '') {
		e.style.fontSize = '1px';
	}
	//console.log(e);
	return abc1(e);
}

function abc1(e) {
	if (e.offsetWidth >= e.scrollWidth && e.offsetHeight >= e.scrollHeight) {
		//console.log('abc1: ' + e.style.fontSize);
		e.style.fontSize = parseInt(e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[1]) * 1.1 +1 + e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[2]
		//return window.requestAnimationFrame(function(){abc1(e);});
		return abc1(e);
	} else {
		//return window.requestAnimationFrame(function(){abc2(e);});
		return abc2(e);
	}
}
function abc2(e) {
	if (e.offsetWidth < e.scrollWidth || e.offsetHeight < e.scrollHeight) {
		//console.log('abc2: ' + e.style.fontSize);
		e.style.fontSize = parseInt(e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[1]) * 0.9 -1 + e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[2]
		//return window.requestAnimationFrame(function(){abc2(e);});
		return abc2(e);
	} else {
		//console.log('done');
		return true;
	}
}
*/