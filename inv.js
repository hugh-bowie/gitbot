require('dotenv').config();
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const { r, log, clear, checkCookie, device, r15, r23 } = require('./src/helpers');
clear();

(async () => {
	try {

		//••••initialize
		const browser = await puppeteer.launch({ headless: false, args: ['--window-size=1920,1047', '--window-position=0,0', '--start-in-incognito'] }); //////// executablePath: process.env.XPTH, userDataDir: process.env.USDD, slowMo: 100  ♻♻♻♻♻♻♻♻♻♻
		const page = await browser.newPage();
		await page.goto('https://gitlab.com', { waitUntil: 'networkidle2' });
		await page.waitForTimeout(1111);

		await page.goto('https://gitlab.com/users/sign_in', { waitUntil: 'networkidle2' });

		//••••- login submit
		await page.waitForSelector("#user_login");
		await page.type("#user_login", process.env.GITUSR);
		await page.waitForTimeout(111);
		await page.type("#user_password", process.env.GITPW);
		await page.waitForTimeout(111);
		await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), page.click('[data-testid="sign-in-button"]')]);

		//•••• goto user activity
		await page.goto('https://gitlab.com/users/' + process.env.GITUSR + '/activity', { waitUntil: 'networkidle2' });
		for (let i = 0; i < 50; i++) {
			await page.keyboard.press('PageDown');
			await page.waitForTimeout(100);
		}

		//•••• get all ccommit rows
		let commitRows = await page.$$eval('li.commit > div', pub => pub.map(pu => pu.innerText)); // returns dc017fff · 1|00482 updated for MLR	15068
		let commitTitles = await page.$$eval('div.commit-row-title a.gfm', tit => tit.map(ti => ti.getAttribute('title')));
		let issueNo = await page.$$eval('div.commit-row-title a.gfm.gfm-issue', te => te.map(t => t.innerText));
		let timeStamps = await page.$$eval('div.commit-row-title', time => time.map(tim => tim.parentNode.parentNode.parentNode.parentNode.children[0].innerText)); // Mar 3, 2022, 3:13 PM
		await page.waitForTimeout(111);

		//log all commit rows if they have the '|' char
		
		for (let i = 0; i < commitRows.length; i++) {
			const invoiceArray = [];
			let dexA = commitRows[i].indexOf("|");
			let dexB = commitRows[i].indexOf("#");

			// let dexPay = commitTitles[i].indexOf("#");
			const regex = /(wf\:?\s?\d{5,6})/ig;
			
			let workForceNumber = commitTitles[i].search(regex);

			if (dexA >= 0) {
				let hrs = commitRows[i].substring(dexA)
					.replace(/\|\s?iiiii/g, '5')
					.replace(/\|\s?iiii/g, '4')
					.replace(/\|\s?iii/g, '3')
					.replace(/\|\s?ii/g, '2')
					.replace(/\|\s?i/g, '1')
					.replace(/\|\s?ov/g, '0.5');
				let issue = issueNo[i];
				let times = timeStamps[i];
				let body = commitTitles[i];
				let payMe = commitTitles[i].substring(workForceNumber);
				await page.waitForTimeout(111);

				if (issue == undefined || body == undefined) {
					issue = commitRows[i].substring(dexB, dexB + 4);
					body = commitRows[i].substring(dexB + 4, commitRows.length);
					log(`${times}\t${issue}\t${body}\t${payMe}\t${hrs}`); 
					await page.waitForTimeout(111);
				} else {
					log(`${times}\t${issue}\t${body}\t${payMe}\t${hrs}`);
					await page.waitForTimeout(111);
				}
				
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