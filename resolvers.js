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

const trimSummary = data => ({
  total: data.total,
  spent: data.spent,
  cash_on_hand: data.cash_on_hand,
  debt: data.debt,
});

const trimBills = arr => arr.map(({
  bill_id,
  bill_type,
  title,
  short_title,
  sponsor_id,
  sponsor_name,
  sponsor_state,
  sponsor_party,
  house_passage,
  senate_passage,
  enacted,
  vetoed,
  cosponsors,
  cosponsors_by_party,
  committees,
  primary_subject,
}) => ({
  bill_id,
  bill_type,
  title,
  short_title,
  sponsor_id,
  sponsor_name,
  sponsor_state,
  sponsor_party,
  house_passage,
  senate_passage,
  enacted,
  vetoed,
  cosponsors,
  cosponsors_by_party,
  committees,
  primary_subject,
}));

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
  summary: trimSummary(summary.response.summary[ATTRIBUTES] || {}),
  bills: trimBills(bills.results[0] ? bills.results[0].bills : []),
}),
);


module.exports = {
  Legislator: {
    bills: async (obj, args, context, info) => {
      const bills = await getBills(obj.bio_id);
      return trimBills(bills.results[0] ? bills.results[0].bills : []);
    },
    industries: async (obj, args, context, info) => {
      const industries = await getIndustries(obj.crp_id);
      return mapFilterAttributes(industries.response.industries.industry || []);
    },
    contributors: async (obj, args, context, info) => {
      const contributors = await getContributors(obj.crp_id);
      return mapFilterAttributes(contributors.response.contributors.contributor || []);
    },
    sectors: async (obj, args, context, info) => {
      const sectors = await getSectors(obj.crp_id);
      return mapFilterAttributes(sectors.response.sectors.sector || []);
    },
    summary: async (obj, args, context, info) => {
      const summary = await getSummary(obj.crp_id);
      return trimSummary(summary.response.summary[ATTRIBUTES] || {});
    },
  },
  Query: {
    legislators: (_, args, context, info) => context.prisma.query.legislators(
      {
        where: {
          OR: [
            { state_contains: args.searchString },
          ],
        },
      },
      info,
    ),
    legislator: (_, args, context, info) => context.prisma.query.legislator(
      {
        where: {
          OR: [
            { bio_id: args.id },
            { crp_id: args.crp_id },
          ],
        },
      },
      info,
    ),
  },
};
