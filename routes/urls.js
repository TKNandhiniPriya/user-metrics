const searchUser = `/rest/api/3/user/search`;
const searchIssues = `/rest/api/3/search?jql=assignee=`;
const searchDevDetail = `/rest/dev-status/latest/issue/details?issueId=`;

module.exports = { searchUser, searchIssues, searchDevDetail };
