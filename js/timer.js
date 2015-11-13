// begin and end time in minutes since 00:00:00 of today (local time)
var periods = [
	{name:'1st Period', time:{from:{h:7,m:45,t:null},to:{h:8,m:30,t:null}}},
	{name:'2nd Period', time:{from:{h:8,m:40,t:null},to:{h:9,m:25,t:null}}},
	{name:'3rd & 4th Period', time:{from:{h:9,m:45,t:null},to:{h:11,m:15,t:null}}},
	{name:'5th Period', time:{from:{h:11,m:35,t:null},to:{h:12,m:20,t:null}}},
	{name:'6th Period', time:{from:{h:12,m:30,t:null},to:{h:13,m:15,t:null}}},
	{name:'7th Period', time:{from:{h:13,m:40,t:null},to:{h:14,m:25,t:null}}},
	{name:'8th Period', time:{from:{h:14,m:30,t:null},to:{h:15,m:15,t:null}}},
	{name:'9th Period', time:{from:{h:15,m:20,t:null},to:{h:16,m:05,t:null}}}
];

var timer = {
	i: null,
	e: null,
	h: null,
	m: null,
	s: null,
	p: null
};

function update() {
	var date = new Date();
	var day1 = new Date(0).setDate(2);
	for (var p = 0; p < periods.length; p++) {
		if (date % day1 >= periods[p].time.from.t && date % day1 < periods[p].time.to.t) {
			//providing a leading zero for consistent string width
			var now = new Date(periods[p].time.to.t - date % day1);
			// Watch out for local timezones! Use UTC methods!
			timer.h.innerHTML = ('0'+now.getUTCHours()).slice(-2);
			timer.m.innerHTML = ('0'+now.getUTCMinutes()).slice(-2);
			timer.s.innerHTML = ('0'+now.getUTCSeconds()).slice(-2);
			timer.p.innerHTML = periods[p].name+', ends '+('0'+periods[p].time.to.t.getHours()).slice(-2)+':'+('0'+periods[p].time.to.t.getMinutes()).slice(-2);
			timer.e.classList.remove('clock');
			if (now <= new Date(0).setMinutes(10)) {
				timer.e.classList.add('ending');
				if (now <= new Date(0).setSeconds(10)) {
					timer.e.classList.add('theend');
				}
			} else {
				timer.e.classList.remove('ending');
				timer.e.classList.remove('theend');
			}
			break;
		} else if (p == periods.length-1) {
			//p = null;
			//providing a leading zero for consistent string width
			timer.h.innerHTML = ('0'+date.getHours()).slice(-2);
			timer.m.innerHTML = ('0'+date.getMinutes()).slice(-2);
			timer.s.innerHTML = ('0'+date.getSeconds()).slice(-2);
			timer.p.innerHTML = '';
			timer.e.classList.add('clock');
			timer.e.classList.remove('ending');
			timer.e.classList.remove('theend');
			break;
		}
	}
	setTimeout(function(){window.requestAnimationFrame(update);}, 990-(new Date().getMilliseconds()));
	return p;
}

window.onload = function(){
	timer.i = document.querySelector('#info');
	timer.e = document.querySelector('#timer');
	timer.h = document.querySelector('#hours');
	timer.m = document.querySelector('#minutes');
	timer.s = document.querySelector('#seconds');
	timer.p = document.querySelector('#period');

	parsePeriods();

	update();
	adaptfont(timer.e);
	//timer.p.style.fontSize = parseInt(timer.e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[1]) /5 + timer.e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[2];
};

window.onresize = function(){
	adaptfont(timer.e);
	//timer.p.style.fontSize = parseInt(timer.e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[1]) /5 + timer.e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[2];
}

function parsePeriods() {
	var zero = new Date(0);
	for (var i = 0; i < periods.length; i++) {
		periods[i].time.from.t = new Date((function(){zero.setHours(periods[i].time.from.h);zero.setMinutes(periods[i].time.from.m);return zero;})());
		periods[i].time.to.t = new Date((function(){zero.setHours(periods[i].time.to.h);zero.setMinutes(periods[i].time.to.m);return zero;})());
		if (periods[i].time.from.t > periods[i].time.to.t) {
			periods[i].time.to.t.setDate(periods[i].time.to.t.getDate()+1);
		}
	}
	return true;
}

function adaptfont(e) {
	if (typeof e === 'undefined') {
		return false
	}
	if (e.style.fontSize === '') {
		e.style.fontSize = '1px';
	}
	while (e.offsetWidth >= e.scrollWidth && document.body.clientHeight > document.querySelector('section').scrollHeight) {
		//increase size
		e.style.fontSize = parseInt(e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[1]) * 1.1 +1 + e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[2];
		timer.i.style.fontSize = parseInt(e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[1]) /6 + e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[2];
		timer.p.style.fontSize = parseInt(e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[1]) /5 + e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[2];
	}
	while (e.offsetWidth < e.scrollWidth || document.body.clientHeight < document.querySelector('section').scrollHeight) {
		//decrease size
		e.style.fontSize = parseInt(e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[1]) * 0.9 -1 + e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[2];
		timer.i.style.fontSize = parseInt(e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[1]) /6 + e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[2];
		timer.p.style.fontSize = parseInt(e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[1]) /5 + e.style.fontSize.match(/^(\d+(?:\.\d+)?)(.*)$/)[2];
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