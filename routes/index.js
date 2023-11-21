var express = require("express");
const { verifyValidParams } = require("../utils/middleware/track");
const { searchUser, searchIssues, searchDevDetail } = require("./urls");
const { default: axios } = require("axios");
const { DatesMap } = require("../utils/map");
const moment = require("moment");
require("dotenv").config();
var router = express.Router();

const auth = {
  username: process.env.username,
  password: process.env.apiToken,
};

/* GET home page. */
router.get("/", verifyValidParams, async function (req, res, next) {
  let userData = {
    accountId: "",
    user: "",
    role: "orgData:member",
    function_group: "orgData:Dev",
    function: "orgData:Dev-BE",
    organisation: "orgData:Emerging Business",
    sub_organisation: "orgData:Partner Integrations",
    manager: "orgData:manager_name",
    organisation_leader: "orgData:org_leader_name",
    employment_type: "orgData:Indirect",
    location: "orgData:Chennai",
    location_group: "orgData:India",
    lead: "orgData:lead_name",
    vendor: "orgData:vendor_name",
  };

  const users = await retrieveUser(req.email);
  if (users.data && users.data.length) {
    userData.accountId = users.data[0].accountId;
    userData.user = users.data[0].displayName;
  } else {
    return res.status(200).json({ msg: "no user found" });
  }

  for (const monthNo of req.months) {
    let month = DatesMap.get(monthNo);
    userData[`${month.name}`] = {
      git_commits_made: 0,
      total_features: 0,
      total_feature_prs: 0,
      total_prs_raised: 0,
      total_timespent: 0,
      planned_estimate: 0,
      bugs_introduced: 0,
      bugs_per_commit_ratio: 0,
      files_changed: 0,
      lines_of_code_written: 0,
      code_commit_dates: [],
    };
    const issues = await retrieveIssues(
      userData.accountId,
      month.start,
      month.end
    );
    // return res.status(200).json(issues.data);
    if (issues.data && issues.data.issues.length) {
      for (const iss of issues.data.issues) {
        if (iss.fields.issuetype.name == "Feature") {
          userData[`${month.name}`].total_features += 1;
        } else if (iss.fields.issuetype.name == "Bug") {
          userData[`${month.name}`].bugs_introduced += 1;
        } else if (iss.fields.issuetype.name == "Task") {
        } else if (iss.fields.issuetype.name == "Story") {
        }

        if (iss.fields.aggregatetimeoriginalestimate) {
          userData[`${month.name}`].planned_estimate +=
            iss.fields.aggregatetimeoriginalestimate / 3600;
        }

        if (iss.fields.aggregatetimespent) {
          userData[`${month.name}`].total_timespent +=
            iss.fields.aggregatetimespent / 3600;
        }
        const devDetail = await retrieveDevDetail(iss.id);

        if (devDetail.data && devDetail.data.detail.length) {
          devDetail.data.detail.forEach((devD) => {
            if (
              iss.fields.issuetype.name == "Feature" &&
              devD.pullRequests &&
              devD.pullRequests.length
            ) {
              userData[`${month.name}`].total_feature_prs +=
                devD.pullRequests.length;
            }
            if (devD.pullRequests && devD.pullRequests.length) {
              userData[`${month.name}`].total_prs_raised +=
                devD.pullRequests.length;
            }
            devD.repositories.forEach((repo) => {
              userData[`${month.name}`].git_commits_made += repo.commits.length;
              repo.commits.forEach((commit) => {
                let date = moment(commit.authorTimestamp).format("YYYY-MM-DD");
                userData[`${month.name}`].code_commit_dates.push(date);
                userData[`${month.name}`].files_changed += commit.fileCount;

                commit.files.forEach((file) => {
                  userData[`${month.name}`].lines_of_code_written +=
                    file.linesAdded;
                });
              });
            });
          });
        }
      }
    }
  }

  return res.status(200).json(userData);
});

const retrieveUser = async (email) => {
  return axios.get(process.env.domain + searchUser, {
    auth: auth,
    params: {
      query: email,
    },
  });
};

const retrieveIssues = async (id, startDate, endDate) => {
  return axios.get(
    process.env.domain +
      searchIssues +
      id +
      ` AND created >="${startDate}" AND created <="${endDate}"`,
    {
      auth: auth,
    }
  );
};

const retrieveDevDetail = async (id) => {
  return axios.get(
    process.env.domain +
      searchDevDetail +
      `${id}&applicationType=GitHub&dataType=pullrequest`,
    {
      auth: auth,
    }
  );
};

module.exports = router;
