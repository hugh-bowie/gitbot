const cheerio = require('cheerio')
const fs = require('fs')
const { gitlog, clear, replaceHours } = require('./src/helpers')

// Clear existing data
clear()

// Load the HTML
const html = fs.readFileSync('./src/activity.html', 'utf8')
const $ = cheerio.load(html)

// Select commit rows with hours indicated by the presence of a pipe '|'
const commitRows = $('div.commit-row-title').filter((i, el) => $(el).text().includes('|'))

// Extract commit data
const commitsData = commitRows
	.map((i, el) => {
		const $el = $(el)
		const timeStamps = $el.closest('.event-item').find('.js-timeago').attr('title') || 'na'
		const issueNumber = $el.find('a.gfm').text() || 'N/A'
		let repositoryTitle = $el.find('a.gfm').attr('title') || 'N/A'
		const repositoryLink = $el.find('a.gfm').attr('href') || 'N/A'

		let wfNumber = null
		if (repositoryTitle !== 'N/A') {
			wfNumber = (repositoryTitle.match(/\b\d{6}\b/) || [])[0]
		} else {
			repositoryTitle = 'N/A'
		}

		const commitText = $el.text()
		let hours = (commitText.match(/\|\s*(\w+)/) || [])[1] || '0'

		return { timeStamps, issueNumber, repositoryTitle, wfNumber, hours, repositoryLink }
	})
	.get()

replaceHours(commitsData)

// Output the results
commitsData.forEach(({ timeStamps, issueNumber, repositoryTitle, wfNumber, hours, repositoryLink }) => {
	gitlog(`${timeStamps}\t${issueNumber}\t${repositoryTitle}\t${repositoryLink}\t${wfNumber}\t${hours}`)
})

// Replace hour symbols with numerical values
// hours = hours
// .replace(/\|\s*iiiii/g, '5')
// .replace(/\|\s*5/g, '5')
// .replace(/\|\s*d/g, '4')
// .replace(/\|\s*iiii/g, '4')
// .replace(/\|\s*iii/g, '3')
// .replace(/\|\s*ii/g, '2')
// .replace(/\|\s*i/g, '1')
// .replace(/\|\s*ov/g, '0.5')
// .replace(/\|/g, '') // Remove any remaining '|' symbols
