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
};
