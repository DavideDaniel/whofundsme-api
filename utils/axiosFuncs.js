

const env = require('dotenv').config();
const fetch = require('./fetch-client');

const fs = require('fs');
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
  console.log(legsUrl)
  return fetch(legsUrl)
};

// GET https://api.propublica.org/congress/v1/members/{member-id}/bills/{type}.json
const getBills = (memberId, type ='cosponsored') => {
  const billsUrl = `${CONGRESS_API_PATH}/members/${memberId}/bills/cosponsored.json`;
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

const getFinances = (cid, id) => Promise.all([getIndustries(cid), getContributors(cid), getSectors(cid), getSummary(cid), getBills(id)])
  .then(([industries, contributors, sectors, summary, bills]) => ({
    industries: (industries.response.industries.industry || []).map(d => d[ATTRIBUTES]).filter(x => x),
    contributors: (contributors.response.contributors.contributor || []).map(d => d[ATTRIBUTES]).filter(x => x),
    sectors: (sectors.response.sectors.sector || []).map(d => d[ATTRIBUTES]).filter(x => x),
    summary: summary.response.summary[ATTRIBUTES] || {},
    bills: bills.results[0] && bills.results[0].bills || [],
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

function createMock() {
  const currState = 'OR';
  return getCongressChamber()
    .then(({ results }) => results[0].members.filter(({ state }) => state === currState))
    .then(async results => {
      const data = await Promise.all(results.map(({ crp_id, id }) => getFinances(crp_id, id)));
      console.log('data', data);
      const fileName = `${currState}.json`;
      fs.writeFile(fileName, JSON.stringify(data, null, 2), err => {
        if(err) throw err;
        console.log('Wrote '+fileName);
      });
    });
}

async function addLegislators(state) {
  const legislators = await Promise.all([getCongressChamber(), getCongressChamber('house')]);
  legislators.map(legislator => {
    
  })
}