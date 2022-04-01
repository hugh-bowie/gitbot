require('dotenv').config();
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const { r, log, device, r15, r23 } = require('./src/helpers');


(async () => {
	try {

		//----initialize
		const browser = await puppeteer.launch({ headless: false, args: ['--incognito'] }); //////// executablePath: process.env.XPTH, userDataDir: process.env.USDD, slowMo: 100  ♻♻♻♻♻♻♻♻♻♻
		const page = await browser.newPage();
		//await page.emulate(device);

		//---- redirect to login page
		await page.goto('https://gitlab.com', { waitUntil: 'domcontentloaded' });
		await page.waitForSelector('a[href="https://gitlab.com/users/sign_in"] > svg');
		await Promise.all([page.waitForNavigation({ waitUntil: 'domcontentloaded' }), page.click('a[href="https://gitlab.com/users/sign_in"] > svg')]);
		await page.waitForTimeout(r15);

		//----- login submit
		await page.waitForSelector("#user_login", { visible: true });
		await page.type("#user_login", process.env.GITUSR, { delay: r(50, 100) });
		await page.type("#user_password", process.env.GITPW, { delay: r(50, 100) });
		await Promise.all([page.waitForNavigation({ waitUntil: 'domcontentloaded' }), page.click('[data-testid="sign-in-button"]')]);

		//---- goto user activity
		await page.goto('https://gitlab.com/users/' + process.env.GITUSR + '/activity', { waitUntil: 'networkidle2' });
		for (let i = 0; i < 20; i++) {
			await page.keyboard.press('PageDown');
			await page.waitForTimeout(555);
		}

		//get all ccommit rows
		const commitRows = await page.$$eval('div.commit-row-title', pub => pub.map(pu => pu.innerText)); // returns dc017fff · 1|00482 updated for MLR	15068
		const timeStamps = await page.$$eval('div.commit-row-title', time => time.map(tim => tim.parentNode.parentNode.parentNode.parentNode.children[0].innerText)); // Mar 3, 2022, 3:13 PM
		await page.waitForTimeout(111);

		//log all commit rows if they have the '|' char
		for (let i = 0; i < commitRows.length; i++) {
			let dexA = commitRows[i].indexOf('|');
			let dexB = commitRows[i].indexOf('#');
			let dexC = timeStamps[i].indexOf(',');
			if (dexA >= 0) {
				let hrs = commitRows[i].toString().slice(dexA - 2, dexA).trim();// returns two places left of the "|"
				let issue = commitRows[i].toString().slice(dexB, dexB + 3).replace('#', '');// returns 
				let times = timeStamps[i].toString().slice(0, dexC) + ' 2022';
				let body = commitRows[i].toString().replace(/\#../, "").slice(dexA + 1);
				await page.waitForTimeout(111);
				log(`${times}\t${issue}\t${body}\tunk\t${hrs}`);
			}
		}

		//BACK AND CLOSE BROWSER
		await page.waitForTimeout(555);
		await browser.close();
		process.exit(1);
	} catch (e) {
		console.log(`--ERROR--ERROR--ERROR--ERROR\n${e}\nERROR--ERROR--ERROR--ERROR`);
		process.exit(1);
	}
})();


// let str = "Don’t be jelly • . .• .•. #dontbejelly #peanutbutterjellytime #peanutbutter #peanutbutterjelly #easylunch #breakfast #foodie #pbj #peanutbutteraddict #peanutbutterandjelly #aesthetic #almondbutterflavor #almondbuttertoast #breakfastideas #cooking101 #cookinghacks #cookingmom #cookingtips #diylifehacks #easylunchboxes #easylunchideas #easylunchrecipes #easyrecipesathome #eatlover #foodblogger #foodhacks #foodiesofinstagram #foodporn #dropsquad #onlydwightschrute";

// const tagrex = /(#\w+)/ig;
// const tags = str.match(tagrex);//ARRAY
// const dotrex = /[•.]/ig;
// const capt = str.replace(tagrex, "").replace(dotrex, "").trim();

// console.log(`${capt.toString()}\n${tags.toString()}`);

// const timeString = "Mar 3, 2022, 3:13 PM"
// const bodyString = "dc017fff · 1|00482 updated for MLR";
// const hoursRegex = /(?<=·)(.+)(?=\|)/g;
// const bodyRegex = /(?<=\|)(.*)/g;
// let body = bodyString.match(bodyRegex, t => t.trim());
// let hours = bodyString.match(hoursRegex, t => t.trim());
// let date = timeString.slice(0, 12);
// //console.log(teststring);
// //console.log(body + '\t' + hours);
// console.log(`${date}\t${body}\t${hours}`);

		// let goodCommits = commitRows.filter(co => co.includes == '|');
		// console.log(timeStamps.toString());
		// console.log(commitRows.toString());
		// console.log(goodCommits.toString());
		//*[@id="activity"]/div[2]/div[83]/div[5]/ul/li/div/text()

		// await page.waitForTimeout(222);
		// for (const rows of commitRows) {
		// 	if (rows.includes('|')) {
		// 		await page.waitForTimeout(111);
		// 		log(rows.slice(11));
		// 	}
		// }