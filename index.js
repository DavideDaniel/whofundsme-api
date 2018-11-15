const env = require('dotenv').config();
const fs = require('fs');
const { promisify } = require('util');

const read = promisify(fs.readFile);

const { prisma } = require('./generated/prisma-client');
const fetch = require('./utils/fetch-client');

const openKey = env.parsed.OPENSECRETS;
const CONGRESS_API_PATH = 'https://api.propublica.org/congress/v1';
const OPENSECRETS_API_PATH = 'http://www.opensecrets.org/api';
const ATTRIBUTES = '@attributes';

if (env.error) {
  throw env.error;
}

// https://api.propublica.org/congress/v1/${congress}/${chamber}/members.json
const getCongressChamber = (chamber = 'senate', congress = '115') => {
  const legsUrl = `${CONGRESS_API_PATH}/${congress}/${chamber}/members.json`;
  console.log(legsUrl);
  return fetch(legsUrl);
};

// GET https://api.propublica.org/congress/v1/members/{member-id}/bills/{type}.json
const getBills = (memberId, type = 'cosponsored') => {
  const billsUrl = `${CONGRESS_API_PATH}/members/${memberId}/bills/${type}.json`;
  return fetch(billsUrl);
};

function getIndustries(cid) {
  const year = new Date().getFullYear();
  console.log(`getting industries for ${cid} in ${year}`);
  const industryUrl = `${OPENSECRETS_API_PATH}/?method=candIndustry&cid=${cid}&cycle=${year}&output=json&apikey=${openKey}`;
  return fetch(industryUrl);
}

function getSectors(cid) {
  const year = new Date().getFullYear();
  console.log(`getting sectors for ${cid} in ${year}`);
  const sectorUrl = `${OPENSECRETS_API_PATH}/?method=candSector&cid=${cid}&cycle=${year}&output=json&apikey=${openKey}`;
  return fetch(sectorUrl);
}

function getContributors(cid) {
  const year = new Date().getFullYear();
  console.log(`getting contributors for ${cid} in ${year}`);
  const contributorUrl = `${OPENSECRETS_API_PATH}/?method=candContrib&cid=${cid}&cycle=${year}&output=json&apikey=${openKey}`;
  return fetch(contributorUrl);
}

function getSummary(cid) {
  const year = new Date().getFullYear();
  console.log(`getting monies for ${cid} in ${year}`);
  const summaryUrl = `${OPENSECRETS_API_PATH}/?method=candSummary&cid=${cid}&cycle=${year}&output=json&apikey=${openKey}`;
  return fetch(summaryUrl);
}

const mapFilterAttributes = arr => arr.map(d => d[ATTRIBUTES]).filter(x => x);

const getFinances = (cid, id) => Promise.all([
  getIndustries(cid),
  getContributors(cid),
  getSectors(cid),
  getSummary(cid),
  getBills(id),
]).then(([industries, contributors, sectors, summary, bills]) => ({
  industries: mapFilterAttributes(industries.response.industries.industry || []),
  contributors: mapFilterAttributes(contributors.response.contributors.contributor || []),
  sectors: mapFilterAttributes(sectors.response.sectors.sector || []),
  summary: summary.response.summary[ATTRIBUTES] || {},
  bills: bills.results[0] ? bills.results[0].bills : [],
}),
);

// getCongressChamber()
//   .then(({ results }) => results[0].members.filter(({ state }) => state === 'OR'))
//   .then(results => {
//     const sectorPromises = results.map(({ crp_id }) => getSectors(crp_id));
//     const industryPromises = results.map(({ crp_id }) => getIndustries(crp_id));
//     const promises = [...sectorPromises, ...industryPromises].filter(x => x);
//     return Promise.all(promises)
//       .then(data => console.log(data))
//   })

// getCongressChamber('house')
// .then(({ results }) => results[0].members.filter(({ state }) => state === 'OR'))
// .then(results => {
//     const sectorPromises = results.map(({ crp_id }) => getSectors(crp_id));
//     const industryPromises = results.map(({ crp_id }) => getIndustries(crp_id));
//     const promises = [...sectorPromises, ...industryPromises].filter(x => x);
//     return Promise.all(promises)
//       .then(data => console.log(data))
// })
/* eslint-disable camelcase */
function createMock() {
  const currState = 'OR';
  return getCongressChamber()
    .then(({ results }) => results[0].members.filter(({ state }) => state === currState))
    .then(async (results) => {
      const data = await Promise.all(results.map(({ crp_id, id }) => getFinances(crp_id, id)));
      console.log('data', data);
      const fileName = `${currState}.json`;
      fs.writeFile(fileName, JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
        console.log(`Wrote ${fileName}`);
      });
    });
}

const trimData = ({
  id,
  short_title,
  first_name,
  middle_name,
  last_name,
  suffix,
  gender,
  party,
  twitter_account,
  facebook_account,
  youtube_account,
  govtrack_id,
  cspan_id,
  votesmart_id,
  icpsr_id,
  crp_id,
  fec_candidate_id,
  url,
  rss_url,
  contact_form,
  in_office,
  next_election,
  total_votes,
  missed_votes,
  total_present,
  office,
  phone,
  fax,
  state,
  state_rank,
  lis_id,
  missed_votes_pct,
  votes_with_party_pct,
}) => ({
  bio_id: id,
  short_title,
  first_name,
  middle_name,
  last_name,
  suffix,
  gender,
  party,
  twitter_account,
  facebook_account,
  youtube_account,
  govtrack_id,
  cspan_id,
  votesmart_id,
  icpsr_id,
  crp_id,
  fec_candidate_id,
  url,
  rss_url,
  contact_form,
  in_office,
  next_election,
  total_votes,
  missed_votes,
  total_present,
  office,
  phone,
  fax,
  state,
  state_rank,
  lis_id,
  missed_votes_pct,
  votes_with_party_pct,
});


async function addLegislators(state) {
  const [senate, house] = await Promise.all([getCongressChamber(), getCongressChamber('house')]);
  const legislators = [...senate.results[0].members, ...house.results[0].members];
  fs.writeFile('legislators.json', JSON.stringify(legislators, null, 2), (err) => {
    if (err) throw err;
    console.log('Wrote legislators.json');
  });
  // legislators.forEach((legislator) => prisma.createLegislator(legislator))
  // });
}
// A `main` function so that we can use async/await
async function main() {
  // Create a new user called `Alice`
  // const newUser = await prisma.createUser({ name: 'Alice' });
  // const data = await read('legislators.json', { encoding: 'utf8' });
  // const parsed = JSON.parse(data);
  // const filtered = parsed.filter(({ crp_id }) => crp_id);
  // try {
  //   const promises = await Promise.all(filtered.map(l => prisma.createLegislator(trimData(l))));
  //   console.log(promises);
  // } catch (error) {
  //   console.error(error);
  // }


  // console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`);

  // Read all users from the database and print them to the console
  const allUsers = await prisma.legislators();
  const results = allUsers.filter(({ state }) => state === 'OR');
  const data = await Promise.all(results.map(({ crp_id, bio_id }) => getFinances(crp_id, bio_id)));


  // const deletedUser = await Promise.all(allUsers.map(async ({ id }) => prisma
  //   .deleteUser({ id })));

  // console.log(deletedUser);
}
/* eslint-enable camelcase */
// addLegislators();

main().catch(e => console.error(e));
