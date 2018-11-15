
const getLegislatorsInState = require('./axiosFuncs').getLegislatorsInState;
const getBills = require('./axiosFuncs').getBills;
const getFinances = require('./axiosFuncs').getFinances;
const sequenceRecursive = require('./utils').sequenceRecursive;
const rejectWith = require('./utils').rejectWith;
const Legislator = require('../models/legislator.js');

const states = ['AK', 'DD', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MH', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'PW', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY'];

const populateLegislators = state => new Promise((resolve, reject) => {
  const cids = [];
  const bioIds = [];
  return getLegislatorsInState(state).then((value) => {
    console.log(value, 'inside get legs');
    if (value.status === 200) {
      value.data.results.map((item) => {
        const legislator = {
          bioguide_id: item.bioguide_id,
          crp_id: item.crp_id,
          first_name: item.first_name,
          last_name: item.last_name,
          state_name: item.state_name,
          state: item.state,
          party: item.party,
          chamber: item.chamber,
          gender: item.gender,
          term_start: item.term_start,
          term_end: item.term_end,
          website: item.website,
          in_office: item.in_office,
          twitter_id: item.twitter_id,
          facebook_id: item.facebook_id,
        };
        Legislator.update({
          crp_id: item.crp_id,
        }, {
          $setOnInsert: legislator,
        }, {
          upsert: true,
        },
        (err, numAffected) => {
          if (err) {
            console.error(err);
          }
          console.log(state, numAffected);
        },
        );
        cids.push(item.crp_id);
        bioIds.push(item.bioguide_id);
      });
    } else {
      console.log('something bad happened');
    }
    console.log('resolving get legs');
    resolve({
      cids,
      bio_ids: bioIds,
    });
  }).catch((err) => {
    rejectWith(err);
  });
});

const populateBills = bioId => new Promise((resolve, reject) => {
  sequenceRecursive(bio_ids, bio_id => getBills(bio_id).then((value) => {
    if (value.status === 200) {
      const bills = value.data.results.map(item => ({
        bill_id: item.bill_id,
        official_title: item.official_title,
        introduced_on: item.introduced_on,
        active: item.history.active,
        enacted: item.history.enacted,
        vetoed: item.history.vetoed,
        keywords: item.keywords,
      }));
      Legislator.update({
        bioguide_id: bio_id,
      }, {
        $set: {
          bills,
        },
      }, (err) => {
        if (err) {
          rejectWith(err);
        }
      });
      resolve();
    } else {
      console.log('something bad happened');
    }
  })).catch((err) => {
    rejectWith(err);
  });
});

const populateFinances = cids => new Promise((resolve, reject) => {
  const chain = sequenceRecursive(cids, (cid) => {
    console.log('inside rec', cid);
    return getFinances(cid).then((value) => {
      const summary = {
        total: value.summary.total,
        spent: value.summary.spent,
        cash_on_hand: value.summary.cash_on_hand,
        debt: value.summary.debt,
        date_last_filed: value.summary.last_updated,
      };
      const industries = value.industries.map(item => ({
        industry_name: item['@attributes'].industry_name,
        industry_code: item['@attributes'].industry_code,
        money_from_indivs: item['@attributes'].indivs,
        money_from_pacs: item['@attributes'].pacs,
      }));
      const contributors = value.contributors.map(item => ({
        org_name: item['@attributes'].org_name,
        money_from_indivs: item['@attributes'].indivs,
        money_from_pacs: item['@attributes'].pacs,
      }));
      const sectors = value.sectors.map(item => ({
        sector_name: item['@attributes'].sector_name,
        sector_code: item['@attributes'].sectorid,
        money_from_indivs: item['@attributes'].indivs,
        money_from_pacs: item['@attributes'].pacs,
      }));
      Legislator.update({
        crp_id: cid,
      }, {
        $set: {
          summary,
          industries,
          contributors,
          sectors,
        },
      }, (err) => {
        if (err) {
          console.log(err);
          rejectWith(err);
        }
      }); // updated finished
      // resolve(chain);
      console.log(chain);
      resolve({ summary, sectors, industries, contributors });
    });
  }).catch((err) => {
    rejectWith(err);
  });
});

const populateAll = () => sequenceRecursive(states, (state) => {
  populateLegislators(state).then((value) => {
    populateBills(value.bio_ids);
    populateFinances(value.cids);
  });
}).catch((err) => {
  rejectWith(err);
});

const populateState = state => populateLegislators(state).then((value) => {
  populateBills(value.bio_ids);
  populateFinances(value.cids);
}).catch((err) => {
  rejectWith(err);
});

module.exports = {
  populateLegislators,
  populateAll,
  populateBills,
  populateState,
};
