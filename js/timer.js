// begin and end time in minutes since 00:00:00 of today (local time)
var times = [
	[7*60+45,8*60+30],
	[8*60+40,9*60+25],
	[9*60+45,11*60+15],
	[11*60+35,12*60+20],
	[12*60+30,13*60+15],
	[13*60+40,14*60+25],
	[14*60+30,15*60+15],
	[15*60+20,16*60+05]
];

var timer = {
	e: null,
	h: null,
	m: null,
	s: null
};

window.onload = function(){
	timer.e = document.getElementById('timer');
	timer.h = document.getElementById('hours');
	timer.m = document.getElementById('minutes');
	timer.s = document.getElementById('seconds');

	adaptfont(timer.e);
};

window.onresize = function(){
	adaptfont(timer.e);
}



function adaptfont(e) {
	if (typeof e === 'undefined') {
		return false
	}
	if (e.style.fontSize === '') {
		e.style.fontSize = '1px';
	}
	while (e.offsetWidth >= e.scrollWidth) {
		e.style.fontSize = parseInt(e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[1]) * 1.1 +1 + e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[2]
	}
	while (e.offsetWidth < e.scrollWidth) {
		e.style.fontSize = parseInt(e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[1]) * 0.9 -1 + e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[2]
	}
	return true;
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