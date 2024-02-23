const cheerio = require('cheerio');
const fs = require('fs');
const { gitlog, convertToNormalTime, clear } = require('./src/helpers');
clear();

// Load the HTML
const html = fs.readFileSync('./src/activity.html', 'utf8');
const $ = cheerio.load(html);


// Select commit rows with hours indicated by the presence of a pipe '|'
const pushEventsOnly = $('div.commit-row-title').filter((i, el) => $(el).text().includes('|'));



//array initialization
const commitsData = pushEventsOnly.map((i, el) => {

	//////individual try
	const timeStamps = $(el).parent().parent().parent().parent().find('.js-timeago').text() || 'na';

	if (timeStamps) {
		console.log(`${timeStamps}\n`);
	} else {

		console.log(`na:\n`);
	}

	// Default if not found
	const issueNumber = $(el).find('a.gfm').text() || 'N/A'; // Default if not found
	let repositoryTitle = $(el).find('a.gfm').attr('title') || 'N/A';
	const repositoryLink = $(el).find('a.gfm').attr('href') || 'N/A'; // Default if not found
	let wfNumber = null, hours = '0'; // Default values

	if (repositoryTitle !== 'N/A') {
		wfNumber = repositoryTitle.match(/\b\d{6}\b/)?.[0] || null;
	} else {
		repositoryTitle = 'N/A'; // Default if not found
	}

	const commitText = $(el).text();
	if (commitText) {
		hours = commitText.match(/\|\s*(\w+)/)?.[1] || '0';
	}

	return { timeStamps, issueNumber, repositoryTitle, wfNumber, hours, repositoryLink };
}).get();


// Output the results
commitsData.forEach(({ timeStamps, issueNumber, repositoryTitle, wfNumber, hours, repositoryLink }) => {
	gitlog(`${timeStamps}\t${issueNumber}\t${repositoryTitle}\t${repositoryLink}\t${wfNumber}\t${(hours || '0')}`);

});
