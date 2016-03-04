'use strict';
const getLegislatorsInState = require('./axiosFuncs').getLegislatorsInState;
const getBills = require('./axiosFuncs').getBills;
const getFinances = require('./axiosFuncs').getFinances;
const sequenceRecursive = require('./utils').sequenceRecursive;
const rejectWith = require('./utils').rejectWith;
const Legislator = require('../models/legislator.js');

exports.populateLegislators = (states) => {
  return new Promise((resolve, reject) => {
    let cids = [];
    let bio_ids = [];
    sequenceRecursive(states, (state) => {
      return getLegislatorsInState(state).then(value => {
        console.log(value, 'inside get legs');
        if (value.status == 200) {
          value.data.results.map((item) => {
            let legislator = {
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
              facebook_id: item.facebook_id
            }
            Legislator.update({
                crp_id: item.crp_id
              }, {
                $setOnInsert: legislator
              }, {
                upsert: true
              },
              (err, numAffected) => {
                if (err) {
                  console.error(err);
                }
                cids.push(item.crp_id);
                bio_ids.push(item.bioguide_id)
                // console.log(cids,bio_ids);
                resolve({cids:cids,bio_ids:bio_ids});
                console.log(state, numAffected);
              }
            )
          });
        } else {
          console.log('something bad happened');
        }
      });
    }).catch(err => {
      rejectWith(err);
    });
  });
}

exports.populateBills = (bio_ids) => {
  return new Promise((resolve, reject) => {
    sequenceRecursive(bio_ids, (bio_id) => {
      return getBills(bio_id).then(value => {
        if (value.status == 200) {
          let bills = value.data.results.map((item) => {
            return {
              bill_id: item.bill_id,
              official_title: item.official_title,
              introduced_on: item.introduced_on,
              active: item.history.active,
              enacted: item.history.enacted,
              vetoed: item.history.vetoed,
              keywords: item.keywords
            }
          })
          Legislator.update({
            bioguide_id: bio_id
          }, {
            $set: {
              'bills': bills
            }
          }, (err) => {
            if (err) {
              reject(err);
            }
            console.log({
              bio_id: bio_id,
              bills: bills
            });
          })
          // resolve(bio_ids);
        } else {
          console.log('something bad happened');
        }
      });
    }).catch(err => {
      rejectWith(err);
    });

  });
}

exports.populateFinances = (cids) => {
  return new Promise((resolve, reject) => {
    let chain = sequenceRecursive(cids, (cid) => {
      console.log('inside rec', cid);
      return getFinances(cid).then(value => {
        console.log('somthing');
        console.log(value)
        let summary = {
          total: value.summary.total,
          spent: value.summary.spent,
          cash_on_hand: value.summary.cash_on_hand,
          debt: value.summary.debt,
          date_last_filed: value.summary.last_updated
        }
        let industries = value.industries.map((item) => {
          return {
            industry_name: item['@attributes'].industry_name,
            industry_code: item['@attributes'].industry_code,
            money_from_indivs: item['@attributes'].indivs,
            money_from_pacs: item['@attributes'].pacs
          }
        });
        let contributors = value.contributors.map((item) => {
          return {
            org_name: item['@attributes'].org_name,
            money_from_indivs: item['@attributes'].indivs,
            money_from_pacs: item['@attributes'].pacs
          }
        });
        let sectors = value.sectors.map((item) => {
          return {
            sector_name: item['@attributes'].sector_name,
            sector_code: item['@attributes'].sectorid,
            money_from_indivs: item['@attributes'].indivs,
            money_from_pacs: item['@attributes'].pacs
          }
        });
        Legislator.update({
            crp_id: cid
          }, {
            $set: {
              'summary': summary,
              'industries': industries,
              'contributors': contributors,
              'sectors': sectors
            }
          }, (err) => {
            if (err) {
              console.log(err);
              rejectWith(err);
            }

            console.log({
              crp_id: cid,
              summary: summary
            });
          }) // updated finished
          // resolve(cids);
      });
    }).catch(err => {
      rejectWith(err);
    });
  });
}