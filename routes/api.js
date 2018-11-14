'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const request = require('request');
const populateAll = require('../utils/apiBuilder').populateAll;
const populateFinances = require('../utils/apiBuilder').populateFinances;
const populateState = require('../utils/apiBuilder').populateState;
const axiosCatch = require('../utils/axiosFuncs').axiosCatch;

// mongodb connection and log msg to notify us
mongoose.connect('mongodb://localhost/whofundsme', function(err) {
  if (err) {
    console.log('MongoDB connection error', err);
  } else {
    console.log('MongoDB connection successful');
  }
});

const db = mongoose.connection;
const Legislator = require('../models/legislator.js');

// testing route
router.get('/test/add/allData', (req, res, next) => {
  populateAll().then(value => {
    Legislator.find(function(err, data) {
        if (err) return next(err);
        res.json({
          results: data
        });
      });
  }).catch(err => {
    axiosCatch(err);
  });

  // getFinances(req.params.cid).then(response => {console.log(response)}).catch(response=>{axiosCatch(response)});
  // var promised = new Promise((resolve, reject) => {
  //     return populateLegislators([req.params.state])
  //       .then(value => {
  //         populateBills(value.bio_ids)
  //         resolve(value.cids)
  //       }).catch(err => {
  //         axiosCatch(err);
  //       })
  //   })
  //   // populateFinances(value.cids)
  // promised.then((value) => {
  //   console.log('promise api resolve', value);
  //   Legislator.find({
  //     crp_id: {
  //       $in: value
  //     }
  //   }, (err, docs) => {
  //     res.json(docs);
  //   })
  // }).catch(err => {
  //   axiosCatch(err);
  // })
});

// function getAllState() {
//   let states = ['AK', 'DD', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MH', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'PW', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY'];
//   let legs = populateLegislators(states);
//   legs.then(() => {
//     Legislator.find(function(err, data) {
//       if (err) return next(err);
//       res.json({
//         results: data
//       });
//     });
//   });
// }

// CREATE
// by state
router.get('/addDataByState/:state', function(req, res) {
  var state = [req.params.state];
  let legs = populateState(state);
  console.log(legs);
  legs.then(() => {
    Legislator.find({
      state: state
    }, function(err, data) {
      if (err) return next(err);
      res.json({
        results: data
      });
    });
  });
});

// READ
// api with query paramaters (eg: /legislators?state=OR&chamber=senate&party=D)
router.get('/legislators*', function(req, res, next) {
  var query = req.query;
  var legislators = Legislator.find(query,{_id:0}, function(err, data) {
    if (err) console.error(err);
    console.log(query, data.length);
    if (data.length > 1){
    res.json(data);
  } else {
    res.json(data[0]);
  }

  });
});

// router.get('/index', function(req, res, next) {
//   Legislator.find(function(err, data) {
//     if (err) return next(err);
//     res.json({
//       results: data
//     });
//   });
// });

// READ

// router.get('/legislatorByCrpId/:crp_id', function(req, res, next) {
//   console.log(req.params.crp_id);
//   Legislator.find({
//     crp_id: req.params.crp_id
//   }, function(err, data) {
//     if (err) console.error(err);
//     // console.log(data[0]);
//     res.json(data[0]);
//   });
// });

router.get('/addAllDataByCrpId/:crp_id', function(req, res, next) {
  Legislator.find({
    crp_id: req.params.crp_id
  }, function(err, data) {
    if (err) console.error(err);
    var cids = [req.params.crp_id];
    var promised = new Promise(function(resolve, reject) {
        resolve(populateFinances(cids))
    });

    promised.then(function(data) {
      console.log(promised);
      console.log(data);
      var result = data[0]
      res.json(result);
    });
  });
});

// function addBills(bioIds) {
//   console.log('inside getbills w ' + bioIds.length);
//   var addBillData;
//   for (var i = 0; i < bioIds.length; i++) {
//     var bio_id = bioIds[i];
//     addBillData = function(bio_id) {
//       // 'https://congress.api.sunlightfoundation.com/bills?&sponsor_id='+bio_id+'&apikey='+sunKey
//       var billsurl = 'https://congress.api.sunlightfoundation.com/bills/search/?sponsor_id=' + bio_id + '&fields=official_title,introduced_on,history.active,history.enacted,history.vetoed,keywords,bill_id&apikey=' + sunKey
//       console.log(billsurl + '\n for id ' + bio_id);
//       request.get({
//         url: billsurl,
//         json: true
//       }, function(error, response, json) {
//         if (error) {
//           console.error(error);
//         }
//         console.log(response.statusCode);
//         if (!error && response.statusCode == 200) {
//           var billObj = json;
//           var results = billObj.results;
//           //
//           var bills = [];
//           for (var j = 0; j < results.length; j++) {
//             var bill = {
//               bill_id: results[j].bill_id,
//               official_title: results[j].official_title,
//               introduced_on: results[j].introduced_on,
//               active: results[j].history.active,
//               enacted: results[j].history.enacted,
//               vetoed: results[j].history.vetoed,
//               keywords: results[j].keywords
//             };
//             bills.push(bill);
//           }
//           console.log('about to update ' + bio_id);
//           Legislator.update({
//             bioguide_id: bio_id
//           }, {
//             $set: {
//               'bills': bills
//             }
//           }, function(err) {
//             if (err) {
//               console.error(err);
//             }
//             console.log('updated: ' + bio_id);
//           })
//         }
//       })
//     };
//     addBillData(bio_id);
//
//   }
//   console.log('bills done');
// };
// function to return all data

// function formatResponse(type, data) {
//   if (type === MONIES) {
//   }
//   let result = data.response.summary['@attributes'];
//   let monies = {
//     total_reciepts: result.total,
//     total_spent: result.spent,
//     cash_on_hand: result.cash_on_hand,
//     debt: result.debt,
//     date_last_filed: result.last_updated
//   };
// }

// function addAllData(cids) {
//   console.log('inside the function ' + cids.length);
//   var addIndustries; // set vars
//   var addSectors;
//   var addContribs;
//   var addFinances;
//   var year = new Date().getFullYear();
//   for (var i = 0; i < cids.length; i++) { // loop through and request each legislator's donation data
//     var cid = cids[i]
//     console.log('inside the loop for ' + cid);
//     addIndustries = function(cid, year) { // change var to function
//       var industryUrl = 'http://www.opensecrets.org/api/?method=candIndustry&cid=' + cid + '&cycle=' + year + '&output=json&apikey=' + openKey;
//       request.get({
//         url: industryUrl,
//         json: true
//       }, function(error, response, json) {
//         if (error) {
//           console.log('there was an error');
//           console.error(error);
//         }
//         console.log(response.statusCode);
//
//         if (!error && response.statusCode == 200) {
//           var industriesObj = json;
//           var results = industriesObj.response.industries.industry;
//           var industries = [];
//           for (var j = 0; j < results.length; j++) {
//             var industry = {
//               industry_name: results[j]['@attributes'].industry_name,
//               industry_code: results[j]['@attributes'].industry_code,
//               money_from_indivs: results[j]['@attributes'].indivs,
//               money_from_pacs: results[j]['@attributes'].pacs
//             };
//             industries.push(industry);
//           }
//           Legislator.update({
//             crp_id: cid
//           }, {
//             $set: {
//               'industries': industries
//             }
//           }, function(err) {
//             if (err) {
//               console.error(err);
//             };
//             console.log('industry done for: ' + cid);
//           });
//         }
//       })
//     };
//     addSectors = function(cid, year) {
//       console.log('inside sectors fx with ' + cid);
//       var sectorUrl = 'http://www.opensecrets.org/api/?method=candSector&cid=' + cid + '&cycle=' + year + '&output=json&apikey=' + openKey;
//       request.get({
//         url: sectorUrl,
//         json: true
//       }, function(error, response, json) {
//         if (error) {
//           console.log('there was an error');
//           console.error(error);
//         }
//         console.log(response.statusCode);
//
//         if (!error && response.statusCode == 200) {
//           var sectorsObj = json;
//           var results = sectorsObj.response.sectors.sector;
//
//           var sectors = [];
//           for (var k = 0; k < results.length; k++) {
//             var sector = {
//               sector_name: results[k]['@attributes'].sector_name,
//               sector_code: results[k]['@attributes'].sectorid,
//               money_from_indivs: results[k]['@attributes'].indivs,
//               money_from_pacs: results[k]['@attributes'].pacs
//             };
//             sectors.push(sector);
//           }
//           Legislator.update({
//             crp_id: cid
//           }, {
//             $set: {
//               'sectors': sectors
//             }
//           }, function(err) {
//             if (err) {
//               console.error(err);
//             };
//             console.log('sectors done for ' + cid);
//           });
//         }
//       });
//     };
//     // contributor request
//     addContribs = function(cid, year) {
//       var contributorUrl = 'http://www.opensecrets.org/api/?method=candContrib&cid=' + cid + '&cycle=' + year + '&output=json&apikey=' + openKey
//       request.get({
//         url: contributorUrl,
//         json: true
//       }, function(error, response, json) {
//         if (error) {
//           console.log('there was an error');
//           console.error(error);
//         }
//         console.log(response.statusCode);
//
//         if (!error && response.statusCode == 200) {
//           var contributorsObj = json;
//           var results = contributorsObj.response.contributors.contributor;
//           //
//           var contributors = [];
//           for (var l = 0; l < results.length; l++) {
//             var contributor = {
//               org_name: results[l]['@attributes'].org_name,
//               money_from_indivs: results[l]['@attributes'].indivs,
//               money_from_pacs: results[l]['@attributes'].pacs
//             };
//             contributors.push(contributor);
//           }
//           Legislator.update({
//             crp_id: cid
//           }, {
//             $set: {
//               'contributors': contributors
//             }
//           }, function(err) {
//             if (err) {
//               console.error(err);
//             };
//             console.log('contributors done for ' + cid);
//           });
//         }
//       });
//     };
//     // summary request
//     addFinances = function(cid, year) {
//       var summaryUrl = 'http://www.opensecrets.org/api/?method=candSummary&cid=' + cid + '&cycle=' + year + '&output=json&apikey=' + openKey;
//       console.log('getting data for ' + cid);
//       request.get({
//         url: summaryUrl,
//         json: true
//       }, function(error, response, json) {
//         if (error) {
//           console.log('there was an error');
//           console.error(error);
//         }
//         console.log(response.statusCode);
//
//         if (!error && response.statusCode == 200) {
//           var summaryObj = json;
//           var result = summaryObj.response.summary['@attributes'];
//           var monies = {
//             total_reciepts: result.total,
//             total_spent: result.spent,
//             cash_on_hand: result.cash_on_hand,
//             debt: result.debt,
//             date_last_filed: result.last_updated
//           };
//           Legislator.update({
//             crp_id: cid
//           }, {
//             $set: {
//               'monies': monies
//             }
//           }, function(err) {
//             if (err) {
//               console.error(err);
//             };
//             console.log(monies + '\n added for ' + cid);
//           });
//         }
//       });
//       console.log('finances done');
//     };
//     addIndustries(cids[i], year); // limit of 200 calls per day
//     addSectors(cids[i], year); //call functions
//     addContribs(cids[i], year); //call functions
//     addFinances(cids[i], year); //call functions
//   }
// };
// add data route
// router.get('/addAllData/:party/:chamber/:state', function(req, res, next) {
//   Legislator.where('party').equals(req.params.party).where('chamber').equals(req.params.chamber).where('state').equals(req.params.state).exec(function(err, data) {
//     var bioguide_ids = [];
//     var cids = [];
//     if (err) {
//       console.error(err);
//     };
//     var legislators = data;
//     for (var i = 0; i < legislators.length; i++) {
//       console.log(legislators[i].last_name);
//       cids.push(legislators[i].crp_id);
//       bioguide_ids.push(legislators[i].bioguide_id);
//     }
//     addBills(bioguide_ids);
//     addAllData(cids);
//   });
//   res.redirect('/api/index/');
// });

// router.get('/senatorDataByState/:state', function(req, res, next) {
//   Legislator.where('chamber').equals('senate').where('state').equals(req.params.state).exec(function(err, data) {
//     var bioguide_ids = [];
//     var cids = [];
//     if (err) {
//       console.error(err);
//     };
//     var legislators = data;
//     for (var i = 0; i < legislators.length; i++) {
//       console.log(legislators[i].last_name);
//       cids.push(legislators[i].crp_id);
//       bioguide_ids.push(legislators[i].bioguide_id);
//     }
//     addBills(bioguide_ids);
//     addAllData(cids);
//     res.json(data);
//   });
// });
// router.get('/addAllLegislators/:state', function(req, res, next) {
//   Legislator.where('state').equals(req.params.state).exec(function(err, data) {
//     var bioguide_ids = [];
//     var cids = [];
//     if (err) {
//       console.error(err);
//     };
//     var legislators = data;
//     for (var i = 0; i < legislators.length; i++) {
//       console.log(legislators[i].last_name);
//       cids.push(legislators[i].crp_id);
//       bioguide_ids.push(legislators[i].bioguide_id);
//     }
//     addBills(bioguide_ids);
//     addAllData(cids);
//     res.json(data);
//   });
// });
// router.get('/allLegislators/:state', function(req, res, next) {
//   Legislator.where('state').equals(req.params.state).exec(function(err, data) {
//     var bioguide_ids = [];
//     var cids = [];
//     if (err) {
//       console.error(err);
//     };
//     var legislators = data;
//     for (var i = 0; i < legislators.length; i++) {
//       console.log(legislators[i].last_name);
//       cids.push(legislators[i].crp_id);
//       bioguide_ids.push(legislators[i].bioguide_id);
//     }
//     addBills(bioguide_ids);
//     addAllData(cids);
//     res.json(data);
//   });
// });
// UPDATE get bills
// router.get('/billDataByState/:state', function(req, res, next) {
//   Legislator.where('state').equals(req.params.state).exec(function(err, data) {
//     var bioguide_ids = [];
//     if (err) {
//       console.error(err);
//     };
//     var legislators = data;
//     for (var i = 0; i < legislators.length; i++) {
//       bioguide_ids.push(legislators[i].bioguide_id);
//     }
//     console.log(bioguide_ids);
//     addBills(bioguide_ids);
//     res.json(data)
//   });
// });
// by party
// router.get('/billDataByChamber/:chamber', function(req, res, next) {
//   Legislator.where('chamber').equals(req.params.chamber).exec(function(err, data) {
//     var bioguide_ids = [];
//     if (err) {
//       console.error(err);
//     };
//     var legislators = data;
//     for (var i = 0; i < legislators.length; i++) {
//       bioguide_ids.push(legislators[i].bioguide_id);
//     }
//     console.log(bioguide_ids);
//     addBills(bioguide_ids);
//     res.json(data)
//   });
// });
// router.get('/addbills/:id', function(req, res) {
//   Legislator.findById(req.params.id, function(err, legislator) {
//     if (err) return next(err);
//     var bio = legislator.bioguide_id;
//     var billsurl = 'https://congress.api.sunlightfoundation.com/bills?&apikey=' + sunKey; + '&sponsor_id=' + bio
//     request(billsurl, function(error, response, data) {
//       if (!error && response.statusCode == 200) {
//         var billObj = JSON.parse(data);
//         var results = billObj.results;
//         var bills = [];
//         for (var i = 0; i < results.length; i++) {
//           var bill = {
//             bill_id: results[i].bill_id,
//             official_title: results[i].official_title,
//             introduced_on: results[i].introduced_on,
//             active: results[i].history.active,
//             enacted: results[i].history.enacted,
//             vetoed: results[i].history.active
//           };
//           bills.push(bill);
//         }
//         // console.log(bills);
//         Legislator.update({
//           _id: legislator._id
//         }, {
//           $set: {
//             'bills': bills
//           }
//         }, function(err) {
//           if (err) console.log('contact addMsg error: ' + err);
//           res.redirect('/api/addIndustries/' + legislator.crp_id);
//         });
//         // res.send(data)
//         // res.redirect('/api/index')
//       }
//     });
//   });
// });
// UPDATE get donations
// router.get('/addIndustries/:crp_id', function(req, res) {
//   var cid = req.params.crp_id;
//   var year = new Date().getFullYear();
//   var industryUrl = 'http://www.opensecrets.org/api/?method=candIndustry&cid=' + cid + '&cycle=' + year + '&output=json&apikey=' + openKey;
//   request(industryUrl, function(error, response, data) {
//     if (error) res.send(error);
//     if (!error && response.statusCode == 200) {
//       var industriesObj = JSON.parse(data);
//       var results = industriesObj.response.industries.industry;
//       //
//       var industries = [];
//       for (var i = 0; i < results.length; i++) {
//         var industry = {
//           industry_name: results[i]['@attributes'].industry_name,
//           industry_code: results[i]['@attributes'].industry_code,
//           money_from_indivs: results[i]['@attributes'].indivs,
//           money_from_pacs: results[i]['@attributes'].pacs
//         };
//         industries.push(industry);
//       }
//       Legislator.update({
//         crp_id: cid
//       }, {
//         $set: {
//           'industries': industries
//         }
//       }, function(err) {
//         if (err) console.log('contact addMsg error: ' + err);
//         res.redirect('/api/addSectors/' + cid);
//       });
//     }
//   });
// });
// router.get('/addSectors/:crp_id', function(req, res) {
//   var cid = req.params.crp_id;
//   var year = new Date().getFullYear();
//   var sectorUrl = 'http://www.opensecrets.org/api/?method=candSector&cid=' + cid + '&cycle=' + year + '&output=json&apikey=' + openKey;
//   request(sectorUrl, function(error, response, data) {
//     if (!error && response.statusCode == 200) {
//       var sectorsObj = JSON.parse(data);
//       var results = sectorsObj.response.sectors.sector;
//       //
//       var sectors = [];
//       for (var i = 0; i < results.length; i++) {
//         var sector = {
//           sector_name: results[i]['@attributes'].sector_name,
//           sector_code: results[i]['@attributes'].sectorid,
//           money_from_indivs: results[i]['@attributes'].indivs,
//           money_from_pacs: results[i]['@attributes'].pacs
//         };
//         sectors.push(sector);
//       }
//       Legislator.update({
//         crp_id: cid
//       }, {
//         $set: {
//           'sectors': sectors
//         }
//       }, function(err) {
//         if (err) console.log('contact addMsg error: ' + err);
//         res.redirect('/api/addContrib/' + cid);
//       });
//     }
//   });
// });
// router.get('/addContrib/:crp_id', function(req, res) {
//   var cid = req.params.crp_id;
//   var year = new Date().getFullYear();
//   var contributorUrl = 'http://www.opensecrets.org/api/?method=candContrib&cid=' + cid + '&cycle=' + year + '&output=json&apikey=' + openKey;
//   request(contributorUrl, function(error, response, data) {
//     if (!error && response.statusCode == 200) {
//       var contributorsObj = JSON.parse(data);
//       var results = contributorsObj.response.contributors.contributor;
//       //
//       var contributors = [];
//       for (var i = 0; i < results.length; i++) {
//         var contributor = {
//           org_name: results[i]['@attributes'].org_name,
//           money_from_indivs: results[i]['@attributes'].indivs,
//           money_from_pacs: results[i]['@attributes'].pacs
//         };
//         contributors.push(contributor);
//       }
//       Legislator.update({
//         crp_id: cid
//       }, {
//         $set: {
//           'contributors': contributors
//         }
//       }, function(err) {
//         if (err) console.log('contact addMsg error: ' + err);
//         res.redirect('/api/addMonies/' + cid);
//       });
//     }
//   });
// });
// router.get('/addMonies/:crp_id', function(req, res) {
//   var cid = req.params.crp_id;
//   var year = new Date().getFullYear();
//   var summaryUrl = 'http://www.opensecrets.org/api/?method=candSummary&cid=' + cid + '&cycle=' + year + '&output=json&apikey=' + openKey;
//   request(summaryUrl, function(error, response, data) {
//     if (!error && response.statusCode == 200) {
//       var summaryObj = JSON.parse(data);
//       var result = summaryObj.response.summary['@attributes'];
//       var monies = {
//         total_reciepts: result.total,
//         total_spent: result.spent,
//         cash_on_hand: result.cash_on_hand,
//         debt: result.debt,
//         date_last_filed: result.last_updated
//       };
//       Legislator.update({
//         crp_id: cid
//       }, {
//         $set: {
//           'monies': monies
//         }
//       }, function(err) {
//         if (err) console.log('contact addMsg error: ' + err);
//         res.redirect('/api/index/');
//       });
//     }
//   });
// });

// router.get('/indexAll', function(req, res) {
//   db.collection.createIndex({
//     crp_id: 1,
//     bioguide_id: 1
//   }, {
//     unique: true,
//     sparse: true
//   })
//   res.json()
// });
//   Legislator.ensureIndex( { crp_id: 1, bioguide_id: 1 }, { unique: true, dropDups: true } );
// });

// DESTROY
// router.get('/cleanAll', function(req, res) {
//
//   Legislator.find(function(err, data) {
//     let allLegs = data.filter(() => {
//
//     });
//     data.forEach(
//       function(obj) {
//         var cur = Legislator.findById({
//           crp_id: obj._id
//         }, {
//           _id: 1
//         });
//         var first = true;
//         while (cur.hasNext()) {
//           var second = cur.next();
//           console.log(cur)
//           if (first) {
//             first = false;
//             continue;
//           }
//           // db.legislators.remove({ _id: second._id });
//           Legislator.findById(second._id, function(err, data) {
//             if (err) console.error(err);
//             res.json({
//               result: data
//             });
//           });
//         }
//       })
//   });
// })

router.delete('/legislators/:id', function(req, res, next) {
  Legislator.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
module.exports = router;