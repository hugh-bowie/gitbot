require('dotenv').config();
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const { r, log, clear, clearCookies, setEmailCookie, device, r15, r23 } = require('./src/helpers');
//clear();
//clearCookies();

(async () => {
	try {
		//----initialize
		/// options -> executablePath: process.env.XPTH, userDataDir: process.env.USDD, slowMo: 100  ♻♻♻♻♻♻♻♻♻♻
		const browser = await puppeteer.launch({ headless: false, args: ['--window-size=1920,1047', '--start-in-incognito', '--window-position=0,0'] });
		const page = await browser.newPage();
		//const emailCookies = JSON.parse(fs.readFileSync('cookies.json', 'utf8'));
		//await page.setCookie(emailCookies);

		await page.goto('https://www.saksoff5th.com/on/demandware.store/Sites-SaksOff5th-Site/en_US/EmailSubscribe-SetDeclineSubscriptionCookie', { waitUntil: 'networkidle0' });
		await page.waitForTimeout(r15);

		await page.goto('https://www.saksoff5th.com/search?q=Ben%20Sherman&prefn1=refinementProductType&prefv1=Casual%20Button-Down%20Shirts%7CShorts%7CT-Shirts&prefn2=sizeRefinement&prefv2=34%7CX-Large%7CLarge%7C33%7C36&srule=newest');

		//const popupModal = await page.$('div#popup-modal');
		await page.waitForSelector('h1.search-results-header');

		for (let i = 0; i < 10; i++) {
			await page.keyboard.press('PageDown');
			await page.waitForTimeout(r(111, 222));
		}

		const output = [];
		const benShermanProducts = await page.$$('div.product.bfx-disable-product.standard');
		for (let i = 0; i < benShermanProducts.length; i++) {

			const benShermanPhotos = await page.$$eval('div.image-container img:first-of-type', imgs => imgs.map((img) => img.getAttribute('src')));
			const benShermanPrice = await page.$$eval('span.value.bfx-price', get => get.map(ge => ge.getAttribute('content')));
			const benShermanTitle = await page.$$eval('h3 span.pdp-link', get => get.map(ge => ge.innerText()));
			output.push({ benShermanPhotos, benShermanPrice, benShermanTitle });

		}





		//await page.goto('https://gitlab.com/users/sign_in', { waitUntil: 'networkidle0' });

		//used for testing bad cookies
		// const cookies = await page.cookies();
		// const fs = require('fs');
		// fs.writeFileSync('cookies.json', JSON.stringify(cookies));

		// const cookies = JSON.parse(fs.readFileSync('cookies.json', 'utf8'));
		// if (cookies.length > 0) {
		// 	// Set the cookies to check on the page
		// 	for (const cookie of cookies) {
		// 		await page.setCookie(cookie);
		// 	}
		// }

		// const sessionCookie = await page.cookies('https://gitlab.com/users/sign_in');
		// if (sessionCookie) {
		// 	// Check the expiration date of the cookie
		// 	const now = new Date();
		// 	if (!sessionCookie.expires > now.getTime()) {
		// 		console.log('Cookie is expired');
		// 		// call login function
		// 		await page.waitForSelector("#user_login", { visible: true });
		// 		await page.type("#user_login", process.env.GITUSR);
		// 		await page.waitForTimeout(111);
		// 		await page.type("#user_password", process.env.GITPW);
		// 		await page.waitForTimeout(111);
		// 		await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), page.click('[data-testid="sign-in-button"]')]);

		// 		const cookies = await page.cookies();
		// 		const fs = require('fs');
		// 		fs.writeFileSync('cookies.json', JSON.stringify(cookies));

		// 	} else {
		// 		console.log('Cookie is current and valid');
		// 		// Do something with the cookie

		// 	}
		// }

		// await page.waitForSelector('a[data-nav="login"]');
		// await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), page.click('a[data-nav="login"]')]);

		//----- login submit



		//---- goto user activity

		/*
		
	
		//get all ccommit rows
	
		let commitRows = await page.$$eval('li.commit > div', pub => pub.map(pu => pu.innerText)); // returns dc017fff · 1|00482 updated for MLR	15068
		let commitTitles = await page.$$eval('div.commit-row-title a.gfm', tit => tit.map(ti => ti.getAttribute('title')));
		let issueNo = await page.$$eval('div.commit-row-title a.gfm.gfm-issue', te => te.map(t => t.innerText));
		let timeStamps = await page.$$eval('div.commit-row-title', time => time.map(tim => tim.parentNode.parentNode.parentNode.parentNode.children[0].innerText)); // Mar 3, 2022, 3:13 PM
		await page.waitForTimeout(111);
	
		//log all commit rows if they have the '|' char
		for (let i = 0; i < commitRows.length; i++) {
			let dexA = commitRows[i].indexOf("|");
			let dexB = commitRows[i].indexOf("#");
	
			let dexPay = commitTitles[i].indexOf("#");
	
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
				let payMe = commitTitles[i].substring(dexPay);
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
		*/
		//BACK AND CLOSE BROWSER

		await browser.close();
		process.exit(1);
	} catch (e) {
		console.log(`--ERROR--ERROR--ERROR--ERROR\n${e}\nERROR--ERROR--ERROR--ERROR`);
		//process.exit(1);
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