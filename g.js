/*

const fs = require('fs');
const { gitlog, convertToNormalTime } = require('./src/helpers');
const jsonData = require('./src/dfa-invoice-git-response.json');

function clear() {
  fs.truncate(`dfa-invoice.txt`, 0, () => {
    console.log(`Results cleared`);
  });
}

clear();


// Extract commit titles for "pushed to" actions
const commitTitles = jsonData.filter(item => item.action_name === "pushed to").map(item => item.push_data.commit_title);

// Extract and transform creation times to normal time
const normalTimes = jsonData.map(item => convertToNormalTime(item.created_at));

// Extract titles for "commented on" actions
const commentedTitles = jsonData.filter(item => item.action_name === "commented on").map(item => item.target_title);
// const issueNumber = commentedTitles.match(/\#\d{1,3}/);
// if (issueNumber) {
//   issueNumber = issueNumber[0].trim();
//   return issueNumber;
// }
// Extract WF numbers from commented titles, default to 'none in title' if not found
const wfNumbers = jsonData.filter(item => item.action_name === "commented on").map(item => {
  const match = item.target_title.match(/[wf]?\#?\s?\d{6}/i);
  if (match) {
    // Convert match to string and apply replacements
    let issueString = match[0].trim();
    issueString = issueString.replace(/[wf#\s]/ig, '');
    return issueString;
  } else {
    return '';
  }
});

// Extract billable hours from commit titles, default to 'none in title' if not found
const billableHours = jsonData.filter(item => item.action_name === "pushed to").map(item => {
  const match = item.push_data.commit_title.match(/ \|\w{1,}/);
  if (match) {
    // Convert match to string and apply replacements
    let hoursString = match[0].trim();
    hoursString = hoursString.replace('|ov', '0.5').replace('|iiii', '4').replace('|iii', '3').replace('|ii', '2').replace('|i', '1').replace('|d', '4');
    return hoursString;
  } else {
    return 'none in title';
  }
});

// Preprocess commentedTitles to fill 'N/A' with the next available commentedTitle
const filledCommentedTitles = commentedTitles.reduce((acc, current, index, array) => {
  if (current !== 'N/A') {
    acc.push(current); // If current is not 'N/A', just use it
  } else {
    // Find the next non-'N/A' title
    const nextAvailable = array.slice(index).find(title => title !== 'N/A');
    acc.push(nextAvailable || 'N/A'); // Use the next available or 'N/A' if none are found
  }
  return acc;
}, []);

// Then merge the data
const mergedData = normalTimes.map((time, index) => {
  let title = commitTitles[index] && commitTitles[index] !== 'N/A' ? commitTitles[index] : filledCommentedTitles[index] || 'N/A';

  return [
    time, // Normalized time
    title, // Use the adjusted logic for title
    filledCommentedTitles[index] || 'N/A', // Use the filled commentedTitles
    wfNumbers[index] || 'N/A', // WF number, 'N/A' as default
    billableHours[index] || 'N/A', // Billable hours from the adjusted logic above
  ];
});


// Filter `mergedData` to include only rows with the "|" symbol in any of their elements
const filteredMergedData = mergedData.filter(row => row.some(element => element.includes('|')));

// Prepare `spreadsheetData` with the filtered data
const spreadsheetData = [
  "Timestamp\tIssue Number\tRepository Title\tWF Number\tHours", // Header row
  ...filteredMergedData.map(item => item.join('\t')) // Each `item` is a filtered row of your data
];

// Use `gitlog` to write `spreadsheetData` to the file
gitlog(spreadsheetData.join('\n')); // Assuming `gitlog` expects a single string
*/