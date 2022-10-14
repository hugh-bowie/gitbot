const fs = require('fs');
const r23 = r(1500, 3000);
const r15 = r(1000, 1500);


//random number function
function r(min, max) {
	return ~~(Math.random() * (max - min) + min);
}

//Function that logs timeStamp + data + \n
function log(data) {

	fs.appendFile(`invoice.txt`, `${data}\n`, () => {
		console.log(`${data}`);
	});
}

function logLinks(data) {

	fs.appendFile('linklist.txt', `${data}\n`, () => {
		console.log(`${data}\n`);

	});
}


function makeList(data) {
	let date = new Date();
	let t = date.toLocaleTimeString(); // 2:22:09 PM
	let d = date.toLocaleDateString(); // 01/03/1984	
	fs.writeFile('linklist.txt', `File Created: ${d}@${t}\n`, (err) => {
		if (err) throw err;
		console.log(`File Created: ${d}@${t}\n`);
	});
}



//\\\\ test delay function ////\\
// setTimeout(function () {
// 	log('some shit + 2000');
// }, 2000);

// pretends this is a phone not a desktop
const mobile = {
	name: 'iPhone 13 Pro Max',
	userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1',
	viewport: {
		width: 428,
		height: 926,
		deviceScaleFactor: 3,
		isMobile: true,
		hasTouch: true,
		isLandscape: false,
	},
};

const desktop = {
	name: 'PC',
	userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
	viewport: {
		width: 1920,
		height: 937,
		deviceScaleFactor: 1,
		isMobile: false,
		hasTouch: false,
		isLandscape: false,
	},
};



module.exports = { mobile, desktop, r, log, makeList, logLinks, r15, r23 };
