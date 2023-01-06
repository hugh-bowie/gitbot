// mod.cjs
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const cheerio = require('cheerio');

(async () => {
	try {

		const response = await fetch('https://www.nordstromrack.com/c/men/clothing/shirts?breadcrumb=Home%2FMen%2FClothing%2FShirts&origin=topnav&sort=PriceLowToHigh&filterByNeckStyle=collared&filterBySize=men-s-clothing_l&filterBySize=men-s-clothing_xl&filterBySleeveLength=short-sleeve');

		const html = await response.text();
		console.log('html":', html);

		const $ = cheerio.load(html);
		const title = $('title').text();
		console.log('title:', title);

	} catch (err) {

		console.log(err);

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