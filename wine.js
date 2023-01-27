require('dotenv').config();
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const { r, logLinks, device, r15, r23 } = require('./src/helpers');

(async () => {
	try {

		//////// executablePath: process.env.XPTH, userDataDir: process.env.USDD, slowMo: 100  ♻♻♻♻♻♻♻♻♻♻
		const browser = await puppeteer.launch({ headless: false, args: ['--window-size=1920,1047', '--window-position=0,0'] });
		const page = await browser.newPage();

		await page.goto('https://www.winerelease.com/Winery_List/Alphabetical_Winery_List_with_Winery_Mailing_List_links-alphabetical.html', { waitUntil: 'networkidle0' });

		const listA = await page.$$eval('li b  a', pub => pub.map(pu => pu.getAttribute('href')));
		// console.log(listA.length);
		// console.log(listA);

		for (let i = 0; i < listA.length; i++) {
			try {
				await page.goto(listA[i], { waitUntil: 'networkidle0' });
				const companywebsite = await page.$eval('font a', el => el.getAttribute('href'));
				if (companywebsite.length > 0) {
					logLinks(companywebsite);
					await page.goto(companywebsite, { waitUntil: 'networkidle0' });
					let PageURL = await page.url();
					try {
						await page.goto(`${PageURL}contact`, { waitUntil: 'networkidle0' });
						let companyAddress = await page.$eval('body', el => el.innerText);
						logLinks(companyAddress);
					} catch (error) {
						logLinks(error);
					}
				}
				logLinks(`no site found here: ${listA[i]}`);
			} catch (error) {
			}




			// companywebsite.forEach(async () => {
			// 	await page.goto(companywebsite, { waitUntil: 'networkidle0' });
			// 	let contactPageURL = await page.url();
			// 	try{
			// 		await page.goto(`${contactPageURL}contact`, { waitUntil: 'networkidle0' });
			// 		let companyAddress = await page.$eval('body', el => el.innerText);
			// 	} catch (error) {
			// 		console.log(error);
			// 	}

			// }

		}
		// await page.goto('https://gitlab.com/users/sign_in', { waitUntil: 'networkidle0' });

		// //••••- login submit
		// await page.waitForSelector("#user_login", { visible: true });
		// await page.type("#user_login", process.env.GITUSR);
		// await page.waitForTimeout(111);
		// await page.type("#user_password", process.env.GITPW);
		// await page.waitForTimeout(111);
		// await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), page.click('[data-testid="sign-in-button"]')]);

		// //•••• goto user activity
		// await page.goto('https://gitlab.com/users/' + process.env.GITUSR + '/activity', { waitUntil: 'networkidle2' });
		// for (let i = 0; i < 50; i++) {
		// 	await page.keyboard.press('PageDown');
		// 	await page.waitForTimeout(555);
		// }

		// //•••• get all ccommit rows
		// let commitRows = await page.$$eval('li.commit > div', pub => pub.map(pu => pu.innerText)); // returns dc017fff · 1|00482 updated for MLR	15068
		// let commitTitles = await page.$$eval('div.commit-row-title a.gfm', tit => tit.map(ti => ti.getAttribute('title')));
		// let issueNo = await page.$$eval('div.commit-row-title a.gfm.gfm-issue', te => te.map(t => t.innerText));
		// let timeStamps = await page.$$eval('div.commit-row-title', time => time.map(tim => tim.parentNode.parentNode.parentNode.parentNode.children[0].innerText)); // Mar 3, 2022, 3:13 PM
		// await page.waitForTimeout(111);

		// //log all commit rows if they have the '|' char
		// for (let i = 0; i < commitRows.length; i++) {
		// 	let dexA = commitRows[i].indexOf("|");
		// 	let dexB = commitRows[i].indexOf("#");

		// 	let dexPay = commitTitles[i].indexOf("#");

		// 	if (dexA >= 0) {
		// 		let hrs = commitRows[i].substring(dexA)
		// 			.replace(/\|\s?iiiii/g, '5')
		// 			.replace(/\|\s?iiii/g, '4')
		// 			.replace(/\|\s?iii/g, '3')
		// 			.replace(/\|\s?ii/g, '2')
		// 			.replace(/\|\s?i/g, '1')
		// 			.replace(/\|\s?ov/g, '0.5');
		// 		let issue = issueNo[i];
		// 		let times = timeStamps[i];
		// 		let body = commitTitles[i];
		// 		let payMe = commitTitles[i].substring(dexPay);
		// 		await page.waitForTimeout(111);

		// 		if (issue == undefined || body == undefined) {
		// 			issue = commitRows[i].substring(dexB, dexB + 4);
		// 			body = commitRows[i].substring(dexB + 4, commitRows.length);
		// 			log(`${times}\t${issue}\t${body}\t${payMe}\t${hrs}`);
		// 			await page.waitForTimeout(111);
		// 		} else {
		// 			log(`${times}\t${issue}\t${body}\t${payMe}\t${hrs}`);
		// 			await page.waitForTimeout(111);
		// 		}
		// 	}
		// }

		//BACK AND CLOSE BROWSER
		await page.waitForTimeout(555);
		// await browser.close();
		// process.exit(1);
	} catch (e) {
		console.log(`--ERROR--ERROR--ERROR--ERROR\n${e}\nERROR--ERROR--ERROR--ERROR`);
		// process.exit(1);
	}
})();