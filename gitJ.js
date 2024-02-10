

const fs = require('fs');
const { gitlog, convertToNormalTime } = require('./src/helpers');
const jsonData = require('./src/dfa-invoice-git-response.json');

function clear() {
  fs.truncate(`dfa-invoice.txt`, 0, () => {
    console.log(`Results cleared`);
  });
}

clear();
function processData(jsonData) {
  // Array to store final results
  let finalArray = [];

  // Map to store Repository values from comment events
  const repositoryMap = new Map();

  // Filtering and populating the final array
  jsonData.forEach(item => {
    const isoTimestamp = item.created_at;
    const normalTime = convertToNormalTime(isoTimestamp);

    // Push events
    if (item.action_name === 'pushed to' && item.push_data.commit_title.includes('|')) {
      const repoKey = item.target_title; // Assuming this is a unique identifier for the Repository

      finalArray.push({
        Time: normalTime,
        Issue: item.push_data.commit_title.match(/\#\d{1,}/) || '',
        Repository: repositoryMap.has(repoKey) ? repositoryMap.get(repoKey) : '',
        WF: '', // Placeholder for WF#
        Hours: item.push_data.commit_title.match(/ \|\w{1,}/) || '', // Placeholder for Hours

      });
    } else if (item.action_name === 'commented on') {
      // Comment events
      const repoKey = item.target_title; // Assuming this is a unique identifier for the Repository
      repositoryMap.set(repoKey, item.target_title); // Store Repository value for later use

      finalArray.push({
        Time: normalTime,
        Issue: '', // Placeholder for Issue
        Repository: item.target_title,
        WF: (item.target_title.match(/wf\#?\s?\d{6}/i) || [''])[0], // Extracting WF#
        Hours: '', // Placeholder for Hours
      });
    }
  });

  // Formatting the final array for tab-separated values with headers
  let resultArray = [
    ['Time', 'Issue', 'Repo', 'WF#', 'Hours'],
    ...finalArray.map(item => [item.Time, item.Issue, item.Repository, item.WF, item.Hours]),
  ];
  resultArray = resultArray.map(item => item.join('\t'));

  return resultArray;
}

// Example usage
const result = processData(jsonData).join('\n');

// Logging the result
gitlog(result.replaceAll('|iiiii', '5').replaceAll('|iiii', '4').replaceAll('|iii', '3').replaceAll('|ii', '2').replaceAll('|i', '1').replaceAll('|ov', '0.5').replaceAll('|d', '4'));

