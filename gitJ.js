
const fs = require('fs');
const { gitlog, convertToNormalTime } = require('./src/helpers');
const jsonData = require('./src/dfa-invoice-git-response.json');
function clear() {
	fs.truncate(`dfa-invoice.txt`, 0, () => {
		console.log(`results cleared`);
	});
}
clear()


function processData(jsonData) {
  // Arrays to store pushes and comments
  let pushes = [];
  let comments = [];

  // Filtering and populating pushes and comments arrays
	jsonData.forEach(item => {
			const isoTimestamp = item.created_at;
			const normalTime = convertToNormalTime(isoTimestamp);
		if (item.action_name === 'pushed to') {
			
      pushes.push({
        Time: normalTime,
        Issue: item.push_data.commit_title.match(/\#\d{1,3}/),
        Repo: '',
        WF: '',
        Hours: item.push_data.commit_title.match(/\|[a-zA-Z]{1,6}/),
      });
    } else if (item.action_name === 'commented on') {
			comments.push({
				Time: normalTime,
				Issue: '',
				Repo: item.target_title,
				WF: item.target_title.match(/\#\s?wf?\d{6}/), // Extracting WF#
        Hours: '', 
      });
    }
  });

  // Merging pushes and comments arrays
  let mergedArray = pushes.join(comments, "\t");

  // Formatting the final array for tab-separated values with headers
	let finalArray = [
    
		...mergedArray.map(item => [item.Time, item.Issue, item.Repo , item.WF, item.Hours]),
	];
	
	//finalArray = finalArray.map(item => item.join('\t'));
return finalArray;
}

// Example usage

const result = processData(jsonData);

// Logging the result
gitlog(result);
