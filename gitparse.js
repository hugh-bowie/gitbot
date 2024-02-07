
const fs = require('fs');
const { gitlog, convertToNormalTime } = require('./src/helpers');
const jsonData = require('./src/dfa-invoice-git-response.json');
function clear() {
	fs.truncate(`dfa-invoice.txt`, 0, () => {
		console.log(`results cleared`);
	});
}
clear()

function parseJSONToPlainText(jsonData) {
	const headers = [

		'Date',
		'Issue Number',
		'Project Details',
		'P3 WF No',
		'Hrs',

	];

	const headerRow = headers.join('\t');

	const parsedData = jsonData.map(entry => {

		const isoTimestamp = entry.created_at || {};
		const normalTime = convertToNormalTime(isoTimestamp);
		const issueId = entry.note || {};
		const pushData = entry.push_data || {};
		const noteBody = entry.note || {};
		const issueResult = issueId.noteable_iid ? pushData.commit_title : {};



		return [
			normalTime || '',
			issueResult || '',
			entry.target_title,
			pushData.commit_title || '',
			/*noteBody.body || '',*/
			entry.action_name,

			entry.project_id,

			entry.id,
			entry.target_id,
			entry.target_iid,
			entry.target_type,
		].join('\t').replace(/\n/g, '___');
	});

	const result = [headerRow, ...parsedData].join('\n');
	return result;
}

// Usage: Pass your JSON data to this function


const plainTextData = parseJSONToPlainText(jsonData);
gitlog(plainTextData);

