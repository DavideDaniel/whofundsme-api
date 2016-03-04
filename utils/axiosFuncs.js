'use strict';
const axios = require('axios');
const sunKey = process.env.SUNLIGHT;
const openKey = process.env.OPENSECRETS;

function axiosCatch(response){
  if (response instanceof Error) {} else {
    console.log(response.data);
    console.log(response.status);
    console.log(response.headers);
    console.log(response.config);
  }
}

exports.getLegislatorsInState = (state) => {
  console.log(`request for ${state}`);
  var sunStateurl = 'https://congress.api.sunlightfoundation.com/legislators?per_page=all&fields=&apikey=' + sunKey + '&state=' + state;
  return axios.get(sunStateurl)
    .catch((response) => {
      axiosCatch(response);
    });
}

exports.getBills = (bio_id) => {
  let billsUrl = 'https://congress.api.sunlightfoundation.com/bills/search/?sponsor_id=' + bio_id + '&fields=official_title,introduced_on,history.active,history.enacted,history.vetoed,keywords,bill_id&apikey=' + sunKey
  return axios.get(billsUrl).catch((response) => {
    axiosCatch(response);
  });
}

function getIndustries(cid) {
  let year = new Date().getFullYear();
  console.log(`getting industries for ${cid} in ${year}`);
  let industryUrl = 'http://www.opensecrets.org/api/?method=candIndustry&cid=' + cid + '&cycle=' + year + '&output=json&apikey=' + openKey;
  return axios.get(industryUrl).catch((response) => {
    console.log('indu',response);
    axiosCatch(response);
  });
}

function getSectors(cid) {
  let year = new Date().getFullYear();
  console.log(`getting sectors for ${cid} in ${year}`);
  let sectorUrl = 'http://www.opensecrets.org/api/?method=candSector&cid=' + cid + '&cycle=' + year + '&output=json&apikey=' + openKey;
  return axios.get(sectorUrl).catch((response) => {
    console.log('sec',response);
    axiosCatch(response);
  });
}

function getContributors(cid) {
  let year = new Date().getFullYear();
  console.log(`getting contributors for ${cid} in ${year}`);
  let contributorUrl = 'http://www.opensecrets.org/api/?method=candContrib&cid=' + cid + '&cycle=' + year + '&output=json&apikey=' + openKey;
  return axios.get(contributorUrl).catch((response) => {
    console.log('cont',response);
    axiosCatch(response);
  });
}

function getSummary(cid) {
  let year = new Date().getFullYear();
  console.log(`getting monies for ${cid} in ${year}`);
  let summaryUrl = 'http://www.opensecrets.org/api/?method=candSummary&cid=' + cid + '&cycle=' + year + '&output=json&apikey=' + openKey;
  console.log(summaryUrl);
  return axios.get(summaryUrl).catch((response) => {
    console.log('mon',response);
    axiosCatch(response);
  });
}

exports.getFinances = (cid) => {
  return axios.all([getIndustries(cid), getContributors(cid), getSectors(cid), getSummary(cid)]).then(axios.spread(
      (industries,contributors,sectors,summary)=>{
        return {
          industries:industries.data.response.industries.industry,
          contributors:contributors.data.response.contributors.contributor,
          sectors:sectors.data.response.sectors.sector,
          summary:summary.data.response.summary['@attributes'],
        }
      }
  ))
}