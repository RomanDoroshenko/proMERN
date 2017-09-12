const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use('/static',express.static('public'));
app.use(bodyParser.json());

const issues = [
  {
    id: 1,
    status: 'Open',
    owner: 'Ravan',
    created: new Date('2016-08-15'),
    effort: 5,
    completionDate: undefined,
    title: 'Error in console when clicking Add',
  },
  {
    id: 2,
    status: 'Assigned',
    owner: 'Eddie',
    created: new Date('2016-08-16'),
    effort: 14,
    completionDate: new Date('2016-08-30'),
    title: 'Missing bottom border on panel',
  },
];

const validIssueStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Closed: true,
};

const issueFieldType = {
  id: 'required',
  status: 'required',
  owner: 'required',
  effort: 'optional',
  created: 'required',
  completionDate: 'optional',
  title: 'required'
};

function cleanUpIssue(issue) {
  const cleanedUpIssue = {};
  Object.keys(issueFieldType).map((field) => {
    if(issue[field])
      cleanedUpIssue[field] = issue[field];
  });
  return cleanedUpIssue;
}

function validateIssue(issue) {
  var errors = [];
  for (field in issueFieldType){
    if (!issue[field] && issueFieldType[field] === 'required')
      errors.push(`${field} - is required field.`);
  }

  if (!validIssueStatus[issue.status])
    errors.push(`${issue.status} - is not valid status!`);

  return (errors.length ? errors.join('; ') : null);
}


app.get('/', (req,res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/issues', (req,res) => {
  const metadata = { total_count: issues.length };
  res.json({
    metadata: metadata,
    records: issues,
  });
});

app.post('/api/issues',(req,res) => {
  const newIssue = req.body;
  newIssue.id = issues.length + 1;
  newIssue.created = new Date();
  newIssue.status = newIssue.status ? newIssue.status : 'New';
  cleanUpIssue(newIssue);
  const err = validateIssue(newIssue);
  if(err) {
    res.status(422).json({ message: `Invalid request: ${err}`});
    return;
  }
  issues.push(newIssue);
  res.json(newIssue);
});

app.listen(8080, function () {
console.log('App started on port 8080!!');
});
