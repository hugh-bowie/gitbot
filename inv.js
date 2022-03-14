require('dotenv').config();
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const { r, log, device, r15, r23 } = require('./src/helpers');


(async () => {
	try {

		//----initialize
		const browser = await puppeteer.launch({ headless: false, args: ['--incognito'] }); //////// slowMo: 100,♻♻♻♻♻♻♻♻♻♻
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
		await Promise.all([page.waitForNavigation({ waitUntil: 'domcontentloaded' }), page.click('input[type="submit"]')]);

		//---- goto user activity
		await page.goto('https://gitlab.com/users/' + process.env.GITUSR + '/activity', { waitUntil: 'networkidle2' });
		for (let i = 0; i < 15; i++) {
			await page.keyboard.press('PageDown');
			await page.waitForTimeout(555);
		}

		//get all the commits
		//$x('//*[@class="commit-row-title"]')



		const commitRows = await page.$$eval('div.commit-row-title', pub => pub.map(pu => pu.innerText)); // returns dc017fff · 1|00482 updated for MLR	15068
		const timeStamps = await page.$$eval('div.commit-row-title', time => time.map(tim => tim.parentNode.parentNode.parentNode.parentNode.children[0].innerText)); // Mar 3, 2022, 3:13 PM

		// console.log(timeStamps)
		// console.log(commitRows);

		await page.waitForTimeout(222);
		for (const rows of commitRows) {
			if (rows.includes('|')) {
				await page.waitForTimeout(111);
				log(rows.slice(11));
			}
		}

		await page.waitForTimeout(555);
		//log(timeStamps);
		//console.log('found this many rows: ' + commitRows.length);
		console.log('found this many times: ' + timeStamps.length);


		//BACK AND CLOSE BROWSER
		//await browser.close();
		//process.exit(1);
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