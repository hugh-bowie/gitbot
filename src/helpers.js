const fs = require('fs');
const r23 = r(1500, 3000);
const r15 = r(1000, 1500);


//random number function
function r(min, max) {
	return ~~(Math.random() * (max - min) + min);
}

//Function that logs timeStamp + data + \n
function log(data) {
	let date = new Date().toLocaleDateString().replaceAll("/", "-");// 01-03-1984	

	fs.appendFile(`K:/My Drive/invoice_${date}.txt`, `${data}\n`, () => {
		console.log(`${data}`);
	});
}


//\\\\ test delay function ////\\
// setTimeout(function () {
// 	log('some shit + 2000');
// }, 2000);

// pretends this is a phone not a desktop
const device = {
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



module.exports = { device, r, log, badAccounts, r15, r23 };
