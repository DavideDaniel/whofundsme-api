module.exports = {
        typeDefs: /* GraphQL */ `type AggregateBill {
  count: Int!
}

type AggregateContributor {
  count: Int!
}

type AggregateCosponsors_By_Party {
  count: Int!
}

type AggregateIndustry {
  count: Int!
}

type AggregateLegislator {
  count: Int!
}

type AggregateSector {
  count: Int!
}

type AggregateSummary {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Bill {
  bill_id: ID!
  bill_type: String
  title: String!
  short_title: String
  sponsor_id: String
  sponsor_name: String
  sponsor_state: String
  sponsor_party: String
  house_passage: Boolean
  senate_passage: Boolean
  enacted: Boolean
  vetoed: Boolean
  cosponsors: Int
  cosponsors_by_party: Cosponsors_By_Party
  committees: String
  primary_subject: String!
}

type BillConnection {
  pageInfo: PageInfo!
  edges: [BillEdge]!
  aggregate: AggregateBill!
}

input BillCreateInput {
  bill_id: ID!
  bill_type: String
  title: String!
  short_title: String
  sponsor_id: String
  sponsor_name: String
  sponsor_state: String
  sponsor_party: String
  house_passage: Boolean
  senate_passage: Boolean
  enacted: Boolean
  vetoed: Boolean
  cosponsors: Int
  cosponsors_by_party: Cosponsors_By_PartyCreateOneInput
  committees: String
  primary_subject: String!
}

input BillCreateManyInput {
  create: [BillCreateInput!]
}

type BillEdge {
  node: Bill!
  cursor: String!
}

enum BillOrderByInput {
  bill_id_ASC
  bill_id_DESC
  bill_type_ASC
  bill_type_DESC
  title_ASC
  title_DESC
  short_title_ASC
  short_title_DESC
  sponsor_id_ASC
  sponsor_id_DESC
  sponsor_name_ASC
  sponsor_name_DESC
  sponsor_state_ASC
  sponsor_state_DESC
  sponsor_party_ASC
  sponsor_party_DESC
  house_passage_ASC
  house_passage_DESC
  senate_passage_ASC
  senate_passage_DESC
  enacted_ASC
  enacted_DESC
  vetoed_ASC
  vetoed_DESC
  cosponsors_ASC
  cosponsors_DESC
  committees_ASC
  committees_DESC
  primary_subject_ASC
  primary_subject_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type BillPreviousValues {
  bill_id: ID!
  bill_type: String
  title: String!
  short_title: String
  sponsor_id: String
  sponsor_name: String
  sponsor_state: String
  sponsor_party: String
  house_passage: Boolean
  senate_passage: Boolean
  enacted: Boolean
  vetoed: Boolean
  cosponsors: Int
  committees: String
  primary_subject: String!
}

type BillSubscriptionPayload {
  mutation: MutationType!
  node: Bill
  updatedFields: [String!]
  previousValues: BillPreviousValues
}

input BillSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: BillWhereInput
  AND: [BillSubscriptionWhereInput!]
  OR: [BillSubscriptionWhereInput!]
  NOT: [BillSubscriptionWhereInput!]
}

input BillUpdateInput {
  bill_id: ID
  bill_type: String
  title: String
  short_title: String
  sponsor_id: String
  sponsor_name: String
  sponsor_state: String
  sponsor_party: String
  house_passage: Boolean
  senate_passage: Boolean
  enacted: Boolean
  vetoed: Boolean
  cosponsors: Int
  cosponsors_by_party: Cosponsors_By_PartyUpdateOneInput
  committees: String
  primary_subject: String
}

input BillUpdateManyInput {
  create: [BillCreateInput!]
}

input BillWhereInput {
  bill_id: ID
  bill_id_not: ID
  bill_id_in: [ID!]
  bill_id_not_in: [ID!]
  bill_id_lt: ID
  bill_id_lte: ID
  bill_id_gt: ID
  bill_id_gte: ID
  bill_id_contains: ID
  bill_id_not_contains: ID
  bill_id_starts_with: ID
  bill_id_not_starts_with: ID
  bill_id_ends_with: ID
  bill_id_not_ends_with: ID
  bill_type: String
  bill_type_not: String
  bill_type_in: [String!]
  bill_type_not_in: [String!]
  bill_type_lt: String
  bill_type_lte: String
  bill_type_gt: String
  bill_type_gte: String
  bill_type_contains: String
  bill_type_not_contains: String
  bill_type_starts_with: String
  bill_type_not_starts_with: String
  bill_type_ends_with: String
  bill_type_not_ends_with: String
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  short_title: String
  short_title_not: String
  short_title_in: [String!]
  short_title_not_in: [String!]
  short_title_lt: String
  short_title_lte: String
  short_title_gt: String
  short_title_gte: String
  short_title_contains: String
  short_title_not_contains: String
  short_title_starts_with: String
  short_title_not_starts_with: String
  short_title_ends_with: String
  short_title_not_ends_with: String
  sponsor_id: String
  sponsor_id_not: String
  sponsor_id_in: [String!]
  sponsor_id_not_in: [String!]
  sponsor_id_lt: String
  sponsor_id_lte: String
  sponsor_id_gt: String
  sponsor_id_gte: String
  sponsor_id_contains: String
  sponsor_id_not_contains: String
  sponsor_id_starts_with: String
  sponsor_id_not_starts_with: String
  sponsor_id_ends_with: String
  sponsor_id_not_ends_with: String
  sponsor_name: String
  sponsor_name_not: String
  sponsor_name_in: [String!]
  sponsor_name_not_in: [String!]
  sponsor_name_lt: String
  sponsor_name_lte: String
  sponsor_name_gt: String
  sponsor_name_gte: String
  sponsor_name_contains: String
  sponsor_name_not_contains: String
  sponsor_name_starts_with: String
  sponsor_name_not_starts_with: String
  sponsor_name_ends_with: String
  sponsor_name_not_ends_with: String
  sponsor_state: String
  sponsor_state_not: String
  sponsor_state_in: [String!]
  sponsor_state_not_in: [String!]
  sponsor_state_lt: String
  sponsor_state_lte: String
  sponsor_state_gt: String
  sponsor_state_gte: String
  sponsor_state_contains: String
  sponsor_state_not_contains: String
  sponsor_state_starts_with: String
  sponsor_state_not_starts_with: String
  sponsor_state_ends_with: String
  sponsor_state_not_ends_with: String
  sponsor_party: String
  sponsor_party_not: String
  sponsor_party_in: [String!]
  sponsor_party_not_in: [String!]
  sponsor_party_lt: String
  sponsor_party_lte: String
  sponsor_party_gt: String
  sponsor_party_gte: String
  sponsor_party_contains: String
  sponsor_party_not_contains: String
  sponsor_party_starts_with: String
  sponsor_party_not_starts_with: String
  sponsor_party_ends_with: String
  sponsor_party_not_ends_with: String
  house_passage: Boolean
  house_passage_not: Boolean
  senate_passage: Boolean
  senate_passage_not: Boolean
  enacted: Boolean
  enacted_not: Boolean
  vetoed: Boolean
  vetoed_not: Boolean
  cosponsors: Int
  cosponsors_not: Int
  cosponsors_in: [Int!]
  cosponsors_not_in: [Int!]
  cosponsors_lt: Int
  cosponsors_lte: Int
  cosponsors_gt: Int
  cosponsors_gte: Int
  cosponsors_by_party: Cosponsors_By_PartyWhereInput
  committees: String
  committees_not: String
  committees_in: [String!]
  committees_not_in: [String!]
  committees_lt: String
  committees_lte: String
  committees_gt: String
  committees_gte: String
  committees_contains: String
  committees_not_contains: String
  committees_starts_with: String
  committees_not_starts_with: String
  committees_ends_with: String
  committees_not_ends_with: String
  primary_subject: String
  primary_subject_not: String
  primary_subject_in: [String!]
  primary_subject_not_in: [String!]
  primary_subject_lt: String
  primary_subject_lte: String
  primary_subject_gt: String
  primary_subject_gte: String
  primary_subject_contains: String
  primary_subject_not_contains: String
  primary_subject_starts_with: String
  primary_subject_not_starts_with: String
  primary_subject_ends_with: String
  primary_subject_not_ends_with: String
  AND: [BillWhereInput!]
  OR: [BillWhereInput!]
  NOT: [BillWhereInput!]
}

type Contributor {
  org_name: ID!
  indivs: String
  pacs: String
  total: String
}

type ContributorConnection {
  pageInfo: PageInfo!
  edges: [ContributorEdge]!
  aggregate: AggregateContributor!
}

input ContributorCreateInput {
  org_name: ID!
  indivs: String
  pacs: String
  total: String
}

input ContributorCreateManyInput {
  create: [ContributorCreateInput!]
}

type ContributorEdge {
  node: Contributor!
  cursor: String!
}

enum ContributorOrderByInput {
  org_name_ASC
  org_name_DESC
  indivs_ASC
  indivs_DESC
  pacs_ASC
  pacs_DESC
  total_ASC
  total_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ContributorPreviousValues {
  org_name: ID!
  indivs: String
  pacs: String
  total: String
}

type ContributorSubscriptionPayload {
  mutation: MutationType!
  node: Contributor
  updatedFields: [String!]
  previousValues: ContributorPreviousValues
}

input ContributorSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ContributorWhereInput
  AND: [ContributorSubscriptionWhereInput!]
  OR: [ContributorSubscriptionWhereInput!]
  NOT: [ContributorSubscriptionWhereInput!]
}

input ContributorUpdateInput {
  org_name: ID
  indivs: String
  pacs: String
  total: String
}

input ContributorUpdateManyInput {
  create: [ContributorCreateInput!]
}

input ContributorWhereInput {
  org_name: ID
  org_name_not: ID
  org_name_in: [ID!]
  org_name_not_in: [ID!]
  org_name_lt: ID
  org_name_lte: ID
  org_name_gt: ID
  org_name_gte: ID
  org_name_contains: ID
  org_name_not_contains: ID
  org_name_starts_with: ID
  org_name_not_starts_with: ID
  org_name_ends_with: ID
  org_name_not_ends_with: ID
  indivs: String
  indivs_not: String
  indivs_in: [String!]
  indivs_not_in: [String!]
  indivs_lt: String
  indivs_lte: String
  indivs_gt: String
  indivs_gte: String
  indivs_contains: String
  indivs_not_contains: String
  indivs_starts_with: String
  indivs_not_starts_with: String
  indivs_ends_with: String
  indivs_not_ends_with: String
  pacs: String
  pacs_not: String
  pacs_in: [String!]
  pacs_not_in: [String!]
  pacs_lt: String
  pacs_lte: String
  pacs_gt: String
  pacs_gte: String
  pacs_contains: String
  pacs_not_contains: String
  pacs_starts_with: String
  pacs_not_starts_with: String
  pacs_ends_with: String
  pacs_not_ends_with: String
  total: String
  total_not: String
  total_in: [String!]
  total_not_in: [String!]
  total_lt: String
  total_lte: String
  total_gt: String
  total_gte: String
  total_contains: String
  total_not_contains: String
  total_starts_with: String
  total_not_starts_with: String
  total_ends_with: String
  total_not_ends_with: String
  AND: [ContributorWhereInput!]
  OR: [ContributorWhereInput!]
  NOT: [ContributorWhereInput!]
}

type Cosponsors_By_Party {
  D: Int
  I: Int
  R: Int
}

type Cosponsors_By_PartyConnection {
  pageInfo: PageInfo!
  edges: [Cosponsors_By_PartyEdge]!
  aggregate: AggregateCosponsors_By_Party!
}

input Cosponsors_By_PartyCreateInput {
  D: Int
  I: Int
  R: Int
}

input Cosponsors_By_PartyCreateOneInput {
  create: Cosponsors_By_PartyCreateInput
}

type Cosponsors_By_PartyEdge {
  node: Cosponsors_By_Party!
  cursor: String!
}

enum Cosponsors_By_PartyOrderByInput {
  D_ASC
  D_DESC
  I_ASC
  I_DESC
  R_ASC
  R_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type Cosponsors_By_PartyPreviousValues {
  D: Int
  I: Int
  R: Int
}

type Cosponsors_By_PartySubscriptionPayload {
  mutation: MutationType!
  node: Cosponsors_By_Party
  updatedFields: [String!]
  previousValues: Cosponsors_By_PartyPreviousValues
}

input Cosponsors_By_PartySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: Cosponsors_By_PartyWhereInput
  AND: [Cosponsors_By_PartySubscriptionWhereInput!]
  OR: [Cosponsors_By_PartySubscriptionWhereInput!]
  NOT: [Cosponsors_By_PartySubscriptionWhereInput!]
}

input Cosponsors_By_PartyUpdateDataInput {
  D: Int
  I: Int
  R: Int
}

input Cosponsors_By_PartyUpdateInput {
  D: Int
  I: Int
  R: Int
}

input Cosponsors_By_PartyUpdateOneInput {
  create: Cosponsors_By_PartyCreateInput
  update: Cosponsors_By_PartyUpdateDataInput
  upsert: Cosponsors_By_PartyUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
}

input Cosponsors_By_PartyUpsertNestedInput {
  update: Cosponsors_By_PartyUpdateDataInput!
  create: Cosponsors_By_PartyCreateInput!
}

input Cosponsors_By_PartyWhereInput {
  D: Int
  D_not: Int
  D_in: [Int!]
  D_not_in: [Int!]
  D_lt: Int
  D_lte: Int
  D_gt: Int
  D_gte: Int
  I: Int
  I_not: Int
  I_in: [Int!]
  I_not_in: [Int!]
  I_lt: Int
  I_lte: Int
  I_gt: Int
  I_gte: Int
  R: Int
  R_not: Int
  R_in: [Int!]
  R_not_in: [Int!]
  R_lt: Int
  R_lte: Int
  R_gt: Int
  R_gte: Int
  AND: [Cosponsors_By_PartyWhereInput!]
  OR: [Cosponsors_By_PartyWhereInput!]
  NOT: [Cosponsors_By_PartyWhereInput!]
}

type Industry {
  industry_name: String!
  industry_code: ID!
  indivs: String
  pacs: String
  total: String
}

type IndustryConnection {
  pageInfo: PageInfo!
  edges: [IndustryEdge]!
  aggregate: AggregateIndustry!
}

input IndustryCreateInput {
  industry_name: String!
  industry_code: ID!
  indivs: String
  pacs: String
  total: String
}

input IndustryCreateManyInput {
  create: [IndustryCreateInput!]
}

type IndustryEdge {
  node: Industry!
  cursor: String!
}

enum IndustryOrderByInput {
  industry_name_ASC
  industry_name_DESC
  industry_code_ASC
  industry_code_DESC
  indivs_ASC
  indivs_DESC
  pacs_ASC
  pacs_DESC
  total_ASC
  total_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type IndustryPreviousValues {
  industry_name: String!
  industry_code: ID!
  indivs: String
  pacs: String
  total: String
}

type IndustrySubscriptionPayload {
  mutation: MutationType!
  node: Industry
  updatedFields: [String!]
  previousValues: IndustryPreviousValues
}

input IndustrySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: IndustryWhereInput
  AND: [IndustrySubscriptionWhereInput!]
  OR: [IndustrySubscriptionWhereInput!]
  NOT: [IndustrySubscriptionWhereInput!]
}

input IndustryUpdateInput {
  industry_name: String
  industry_code: ID
  indivs: String
  pacs: String
  total: String
}

input IndustryUpdateManyInput {
  create: [IndustryCreateInput!]
}

input IndustryWhereInput {
  industry_name: String
  industry_name_not: String
  industry_name_in: [String!]
  industry_name_not_in: [String!]
  industry_name_lt: String
  industry_name_lte: String
  industry_name_gt: String
  industry_name_gte: String
  industry_name_contains: String
  industry_name_not_contains: String
  industry_name_starts_with: String
  industry_name_not_starts_with: String
  industry_name_ends_with: String
  industry_name_not_ends_with: String
  industry_code: ID
  industry_code_not: ID
  industry_code_in: [ID!]
  industry_code_not_in: [ID!]
  industry_code_lt: ID
  industry_code_lte: ID
  industry_code_gt: ID
  industry_code_gte: ID
  industry_code_contains: ID
  industry_code_not_contains: ID
  industry_code_starts_with: ID
  industry_code_not_starts_with: ID
  industry_code_ends_with: ID
  industry_code_not_ends_with: ID
  indivs: String
  indivs_not: String
  indivs_in: [String!]
  indivs_not_in: [String!]
  indivs_lt: String
  indivs_lte: String
  indivs_gt: String
  indivs_gte: String
  indivs_contains: String
  indivs_not_contains: String
  indivs_starts_with: String
  indivs_not_starts_with: String
  indivs_ends_with: String
  indivs_not_ends_with: String
  pacs: String
  pacs_not: String
  pacs_in: [String!]
  pacs_not_in: [String!]
  pacs_lt: String
  pacs_lte: String
  pacs_gt: String
  pacs_gte: String
  pacs_contains: String
  pacs_not_contains: String
  pacs_starts_with: String
  pacs_not_starts_with: String
  pacs_ends_with: String
  pacs_not_ends_with: String
  total: String
  total_not: String
  total_in: [String!]
  total_not_in: [String!]
  total_lt: String
  total_lte: String
  total_gt: String
  total_gte: String
  total_contains: String
  total_not_contains: String
  total_starts_with: String
  total_not_starts_with: String
  total_ends_with: String
  total_not_ends_with: String
  AND: [IndustryWhereInput!]
  OR: [IndustryWhereInput!]
  NOT: [IndustryWhereInput!]
}

type Legislator {
  bio_id: ID!
  short_title: String
  first_name: String!
  middle_name: String
  last_name: String!
  suffix: String
  gender: String
  party: String
  twitter_account: String
  facebook_account: String
  youtube_account: String
  govtrack_id: String
  cspan_id: String
  votesmart_id: String
  icpsr_id: String
  crp_id: String!
  fec_candidate_id: String
  url: String
  rss_url: String
  contact_form: String
  in_office: Boolean
  next_election: String
  total_votes: Int
  missed_votes: Int
  total_present: Int
  office: String
  phone: String
  fax: String
  state: String
  state_rank: String
  lis_id: String
  missed_votes_pct: Float
  votes_with_party_pct: Float
  bills(where: BillWhereInput, orderBy: BillOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Bill!]
  industries(where: IndustryWhereInput, orderBy: IndustryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Industry!]
  sectors(where: SectorWhereInput, orderBy: SectorOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Sector!]
  contributors(where: ContributorWhereInput, orderBy: ContributorOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Contributor!]
  summary: Summary
}

type LegislatorConnection {
  pageInfo: PageInfo!
  edges: [LegislatorEdge]!
  aggregate: AggregateLegislator!
}

input LegislatorCreateInput {
  bio_id: ID!
  short_title: String
  first_name: String!
  middle_name: String
  last_name: String!
  suffix: String
  gender: String
  party: String
  twitter_account: String
  facebook_account: String
  youtube_account: String
  govtrack_id: String
  cspan_id: String
  votesmart_id: String
  icpsr_id: String
  crp_id: String!
  fec_candidate_id: String
  url: String
  rss_url: String
  contact_form: String
  in_office: Boolean
  next_election: String
  total_votes: Int
  missed_votes: Int
  total_present: Int
  office: String
  phone: String
  fax: String
  state: String
  state_rank: String
  lis_id: String
  missed_votes_pct: Float
  votes_with_party_pct: Float
  bills: BillCreateManyInput
  industries: IndustryCreateManyInput
  sectors: SectorCreateManyInput
  contributors: ContributorCreateManyInput
  summary: SummaryCreateOneInput
}

type LegislatorEdge {
  node: Legislator!
  cursor: String!
}

enum LegislatorOrderByInput {
  bio_id_ASC
  bio_id_DESC
  short_title_ASC
  short_title_DESC
  first_name_ASC
  first_name_DESC
  middle_name_ASC
  middle_name_DESC
  last_name_ASC
  last_name_DESC
  suffix_ASC
  suffix_DESC
  gender_ASC
  gender_DESC
  party_ASC
  party_DESC
  twitter_account_ASC
  twitter_account_DESC
  facebook_account_ASC
  facebook_account_DESC
  youtube_account_ASC
  youtube_account_DESC
  govtrack_id_ASC
  govtrack_id_DESC
  cspan_id_ASC
  cspan_id_DESC
  votesmart_id_ASC
  votesmart_id_DESC
  icpsr_id_ASC
  icpsr_id_DESC
  crp_id_ASC
  crp_id_DESC
  fec_candidate_id_ASC
  fec_candidate_id_DESC
  url_ASC
  url_DESC
  rss_url_ASC
  rss_url_DESC
  contact_form_ASC
  contact_form_DESC
  in_office_ASC
  in_office_DESC
  next_election_ASC
  next_election_DESC
  total_votes_ASC
  total_votes_DESC
  missed_votes_ASC
  missed_votes_DESC
  total_present_ASC
  total_present_DESC
  office_ASC
  office_DESC
  phone_ASC
  phone_DESC
  fax_ASC
  fax_DESC
  state_ASC
  state_DESC
  state_rank_ASC
  state_rank_DESC
  lis_id_ASC
  lis_id_DESC
  missed_votes_pct_ASC
  missed_votes_pct_DESC
  votes_with_party_pct_ASC
  votes_with_party_pct_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type LegislatorPreviousValues {
  bio_id: ID!
  short_title: String
  first_name: String!
  middle_name: String
  last_name: String!
  suffix: String
  gender: String
  party: String
  twitter_account: String
  facebook_account: String
  youtube_account: String
  govtrack_id: String
  cspan_id: String
  votesmart_id: String
  icpsr_id: String
  crp_id: String!
  fec_candidate_id: String
  url: String
  rss_url: String
  contact_form: String
  in_office: Boolean
  next_election: String
  total_votes: Int
  missed_votes: Int
  total_present: Int
  office: String
  phone: String
  fax: String
  state: String
  state_rank: String
  lis_id: String
  missed_votes_pct: Float
  votes_with_party_pct: Float
}

type LegislatorSubscriptionPayload {
  mutation: MutationType!
  node: Legislator
  updatedFields: [String!]
  previousValues: LegislatorPreviousValues
}

input LegislatorSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: LegislatorWhereInput
  AND: [LegislatorSubscriptionWhereInput!]
  OR: [LegislatorSubscriptionWhereInput!]
  NOT: [LegislatorSubscriptionWhereInput!]
}

input LegislatorUpdateInput {
  bio_id: ID
  short_title: String
  first_name: String
  middle_name: String
  last_name: String
  suffix: String
  gender: String
  party: String
  twitter_account: String
  facebook_account: String
  youtube_account: String
  govtrack_id: String
  cspan_id: String
  votesmart_id: String
  icpsr_id: String
  crp_id: String
  fec_candidate_id: String
  url: String
  rss_url: String
  contact_form: String
  in_office: Boolean
  next_election: String
  total_votes: Int
  missed_votes: Int
  total_present: Int
  office: String
  phone: String
  fax: String
  state: String
  state_rank: String
  lis_id: String
  missed_votes_pct: Float
  votes_with_party_pct: Float
  bills: BillUpdateManyInput
  industries: IndustryUpdateManyInput
  sectors: SectorUpdateManyInput
  contributors: ContributorUpdateManyInput
  summary: SummaryUpdateOneInput
}

input LegislatorWhereInput {
  bio_id: ID
  bio_id_not: ID
  bio_id_in: [ID!]
  bio_id_not_in: [ID!]
  bio_id_lt: ID
  bio_id_lte: ID
  bio_id_gt: ID
  bio_id_gte: ID
  bio_id_contains: ID
  bio_id_not_contains: ID
  bio_id_starts_with: ID
  bio_id_not_starts_with: ID
  bio_id_ends_with: ID
  bio_id_not_ends_with: ID
  short_title: String
  short_title_not: String
  short_title_in: [String!]
  short_title_not_in: [String!]
  short_title_lt: String
  short_title_lte: String
  short_title_gt: String
  short_title_gte: String
  short_title_contains: String
  short_title_not_contains: String
  short_title_starts_with: String
  short_title_not_starts_with: String
  short_title_ends_with: String
  short_title_not_ends_with: String
  first_name: String
  first_name_not: String
  first_name_in: [String!]
  first_name_not_in: [String!]
  first_name_lt: String
  first_name_lte: String
  first_name_gt: String
  first_name_gte: String
  first_name_contains: String
  first_name_not_contains: String
  first_name_starts_with: String
  first_name_not_starts_with: String
  first_name_ends_with: String
  first_name_not_ends_with: String
  middle_name: String
  middle_name_not: String
  middle_name_in: [String!]
  middle_name_not_in: [String!]
  middle_name_lt: String
  middle_name_lte: String
  middle_name_gt: String
  middle_name_gte: String
  middle_name_contains: String
  middle_name_not_contains: String
  middle_name_starts_with: String
  middle_name_not_starts_with: String
  middle_name_ends_with: String
  middle_name_not_ends_with: String
  last_name: String
  last_name_not: String
  last_name_in: [String!]
  last_name_not_in: [String!]
  last_name_lt: String
  last_name_lte: String
  last_name_gt: String
  last_name_gte: String
  last_name_contains: String
  last_name_not_contains: String
  last_name_starts_with: String
  last_name_not_starts_with: String
  last_name_ends_with: String
  last_name_not_ends_with: String
  suffix: String
  suffix_not: String
  suffix_in: [String!]
  suffix_not_in: [String!]
  suffix_lt: String
  suffix_lte: String
  suffix_gt: String
  suffix_gte: String
  suffix_contains: String
  suffix_not_contains: String
  suffix_starts_with: String
  suffix_not_starts_with: String
  suffix_ends_with: String
  suffix_not_ends_with: String
  gender: String
  gender_not: String
  gender_in: [String!]
  gender_not_in: [String!]
  gender_lt: String
  gender_lte: String
  gender_gt: String
  gender_gte: String
  gender_contains: String
  gender_not_contains: String
  gender_starts_with: String
  gender_not_starts_with: String
  gender_ends_with: String
  gender_not_ends_with: String
  party: String
  party_not: String
  party_in: [String!]
  party_not_in: [String!]
  party_lt: String
  party_lte: String
  party_gt: String
  party_gte: String
  party_contains: String
  party_not_contains: String
  party_starts_with: String
  party_not_starts_with: String
  party_ends_with: String
  party_not_ends_with: String
  twitter_account: String
  twitter_account_not: String
  twitter_account_in: [String!]
  twitter_account_not_in: [String!]
  twitter_account_lt: String
  twitter_account_lte: String
  twitter_account_gt: String
  twitter_account_gte: String
  twitter_account_contains: String
  twitter_account_not_contains: String
  twitter_account_starts_with: String
  twitter_account_not_starts_with: String
  twitter_account_ends_with: String
  twitter_account_not_ends_with: String
  facebook_account: String
  facebook_account_not: String
  facebook_account_in: [String!]
  facebook_account_not_in: [String!]
  facebook_account_lt: String
  facebook_account_lte: String
  facebook_account_gt: String
  facebook_account_gte: String
  facebook_account_contains: String
  facebook_account_not_contains: String
  facebook_account_starts_with: String
  facebook_account_not_starts_with: String
  facebook_account_ends_with: String
  facebook_account_not_ends_with: String
  youtube_account: String
  youtube_account_not: String
  youtube_account_in: [String!]
  youtube_account_not_in: [String!]
  youtube_account_lt: String
  youtube_account_lte: String
  youtube_account_gt: String
  youtube_account_gte: String
  youtube_account_contains: String
  youtube_account_not_contains: String
  youtube_account_starts_with: String
  youtube_account_not_starts_with: String
  youtube_account_ends_with: String
  youtube_account_not_ends_with: String
  govtrack_id: String
  govtrack_id_not: String
  govtrack_id_in: [String!]
  govtrack_id_not_in: [String!]
  govtrack_id_lt: String
  govtrack_id_lte: String
  govtrack_id_gt: String
  govtrack_id_gte: String
  govtrack_id_contains: String
  govtrack_id_not_contains: String
  govtrack_id_starts_with: String
  govtrack_id_not_starts_with: String
  govtrack_id_ends_with: String
  govtrack_id_not_ends_with: String
  cspan_id: String
  cspan_id_not: String
  cspan_id_in: [String!]
  cspan_id_not_in: [String!]
  cspan_id_lt: String
  cspan_id_lte: String
  cspan_id_gt: String
  cspan_id_gte: String
  cspan_id_contains: String
  cspan_id_not_contains: String
  cspan_id_starts_with: String
  cspan_id_not_starts_with: String
  cspan_id_ends_with: String
  cspan_id_not_ends_with: String
  votesmart_id: String
  votesmart_id_not: String
  votesmart_id_in: [String!]
  votesmart_id_not_in: [String!]
  votesmart_id_lt: String
  votesmart_id_lte: String
  votesmart_id_gt: String
  votesmart_id_gte: String
  votesmart_id_contains: String
  votesmart_id_not_contains: String
  votesmart_id_starts_with: String
  votesmart_id_not_starts_with: String
  votesmart_id_ends_with: String
  votesmart_id_not_ends_with: String
  icpsr_id: String
  icpsr_id_not: String
  icpsr_id_in: [String!]
  icpsr_id_not_in: [String!]
  icpsr_id_lt: String
  icpsr_id_lte: String
  icpsr_id_gt: String
  icpsr_id_gte: String
  icpsr_id_contains: String
  icpsr_id_not_contains: String
  icpsr_id_starts_with: String
  icpsr_id_not_starts_with: String
  icpsr_id_ends_with: String
  icpsr_id_not_ends_with: String
  crp_id: String
  crp_id_not: String
  crp_id_in: [String!]
  crp_id_not_in: [String!]
  crp_id_lt: String
  crp_id_lte: String
  crp_id_gt: String
  crp_id_gte: String
  crp_id_contains: String
  crp_id_not_contains: String
  crp_id_starts_with: String
  crp_id_not_starts_with: String
  crp_id_ends_with: String
  crp_id_not_ends_with: String
  fec_candidate_id: String
  fec_candidate_id_not: String
  fec_candidate_id_in: [String!]
  fec_candidate_id_not_in: [String!]
  fec_candidate_id_lt: String
  fec_candidate_id_lte: String
  fec_candidate_id_gt: String
  fec_candidate_id_gte: String
  fec_candidate_id_contains: String
  fec_candidate_id_not_contains: String
  fec_candidate_id_starts_with: String
  fec_candidate_id_not_starts_with: String
  fec_candidate_id_ends_with: String
  fec_candidate_id_not_ends_with: String
  url: String
  url_not: String
  url_in: [String!]
  url_not_in: [String!]
  url_lt: String
  url_lte: String
  url_gt: String
  url_gte: String
  url_contains: String
  url_not_contains: String
  url_starts_with: String
  url_not_starts_with: String
  url_ends_with: String
  url_not_ends_with: String
  rss_url: String
  rss_url_not: String
  rss_url_in: [String!]
  rss_url_not_in: [String!]
  rss_url_lt: String
  rss_url_lte: String
  rss_url_gt: String
  rss_url_gte: String
  rss_url_contains: String
  rss_url_not_contains: String
  rss_url_starts_with: String
  rss_url_not_starts_with: String
  rss_url_ends_with: String
  rss_url_not_ends_with: String
  contact_form: String
  contact_form_not: String
  contact_form_in: [String!]
  contact_form_not_in: [String!]
  contact_form_lt: String
  contact_form_lte: String
  contact_form_gt: String
  contact_form_gte: String
  contact_form_contains: String
  contact_form_not_contains: String
  contact_form_starts_with: String
  contact_form_not_starts_with: String
  contact_form_ends_with: String
  contact_form_not_ends_with: String
  in_office: Boolean
  in_office_not: Boolean
  next_election: String
  next_election_not: String
  next_election_in: [String!]
  next_election_not_in: [String!]
  next_election_lt: String
  next_election_lte: String
  next_election_gt: String
  next_election_gte: String
  next_election_contains: String
  next_election_not_contains: String
  next_election_starts_with: String
  next_election_not_starts_with: String
  next_election_ends_with: String
  next_election_not_ends_with: String
  total_votes: Int
  total_votes_not: Int
  total_votes_in: [Int!]
  total_votes_not_in: [Int!]
  total_votes_lt: Int
  total_votes_lte: Int
  total_votes_gt: Int
  total_votes_gte: Int
  missed_votes: Int
  missed_votes_not: Int
  missed_votes_in: [Int!]
  missed_votes_not_in: [Int!]
  missed_votes_lt: Int
  missed_votes_lte: Int
  missed_votes_gt: Int
  missed_votes_gte: Int
  total_present: Int
  total_present_not: Int
  total_present_in: [Int!]
  total_present_not_in: [Int!]
  total_present_lt: Int
  total_present_lte: Int
  total_present_gt: Int
  total_present_gte: Int
  office: String
  office_not: String
  office_in: [String!]
  office_not_in: [String!]
  office_lt: String
  office_lte: String
  office_gt: String
  office_gte: String
  office_contains: String
  office_not_contains: String
  office_starts_with: String
  office_not_starts_with: String
  office_ends_with: String
  office_not_ends_with: String
  phone: String
  phone_not: String
  phone_in: [String!]
  phone_not_in: [String!]
  phone_lt: String
  phone_lte: String
  phone_gt: String
  phone_gte: String
  phone_contains: String
  phone_not_contains: String
  phone_starts_with: String
  phone_not_starts_with: String
  phone_ends_with: String
  phone_not_ends_with: String
  fax: String
  fax_not: String
  fax_in: [String!]
  fax_not_in: [String!]
  fax_lt: String
  fax_lte: String
  fax_gt: String
  fax_gte: String
  fax_contains: String
  fax_not_contains: String
  fax_starts_with: String
  fax_not_starts_with: String
  fax_ends_with: String
  fax_not_ends_with: String
  state: String
  state_not: String
  state_in: [String!]
  state_not_in: [String!]
  state_lt: String
  state_lte: String
  state_gt: String
  state_gte: String
  state_contains: String
  state_not_contains: String
  state_starts_with: String
  state_not_starts_with: String
  state_ends_with: String
  state_not_ends_with: String
  state_rank: String
  state_rank_not: String
  state_rank_in: [String!]
  state_rank_not_in: [String!]
  state_rank_lt: String
  state_rank_lte: String
  state_rank_gt: String
  state_rank_gte: String
  state_rank_contains: String
  state_rank_not_contains: String
  state_rank_starts_with: String
  state_rank_not_starts_with: String
  state_rank_ends_with: String
  state_rank_not_ends_with: String
  lis_id: String
  lis_id_not: String
  lis_id_in: [String!]
  lis_id_not_in: [String!]
  lis_id_lt: String
  lis_id_lte: String
  lis_id_gt: String
  lis_id_gte: String
  lis_id_contains: String
  lis_id_not_contains: String
  lis_id_starts_with: String
  lis_id_not_starts_with: String
  lis_id_ends_with: String
  lis_id_not_ends_with: String
  missed_votes_pct: Float
  missed_votes_pct_not: Float
  missed_votes_pct_in: [Float!]
  missed_votes_pct_not_in: [Float!]
  missed_votes_pct_lt: Float
  missed_votes_pct_lte: Float
  missed_votes_pct_gt: Float
  missed_votes_pct_gte: Float
  votes_with_party_pct: Float
  votes_with_party_pct_not: Float
  votes_with_party_pct_in: [Float!]
  votes_with_party_pct_not_in: [Float!]
  votes_with_party_pct_lt: Float
  votes_with_party_pct_lte: Float
  votes_with_party_pct_gt: Float
  votes_with_party_pct_gte: Float
  bills_every: BillWhereInput
  bills_some: BillWhereInput
  bills_none: BillWhereInput
  industries_every: IndustryWhereInput
  industries_some: IndustryWhereInput
  industries_none: IndustryWhereInput
  sectors_every: SectorWhereInput
  sectors_some: SectorWhereInput
  sectors_none: SectorWhereInput
  contributors_every: ContributorWhereInput
  contributors_some: ContributorWhereInput
  contributors_none: ContributorWhereInput
  summary: SummaryWhereInput
  AND: [LegislatorWhereInput!]
  OR: [LegislatorWhereInput!]
  NOT: [LegislatorWhereInput!]
}

input LegislatorWhereUniqueInput {
  bio_id: ID
}

scalar Long

type Mutation {
  createCosponsors_By_Party(data: Cosponsors_By_PartyCreateInput!): Cosponsors_By_Party!
  updateManyCosponsors_By_Parties(data: Cosponsors_By_PartyUpdateInput!, where: Cosponsors_By_PartyWhereInput): BatchPayload!
  deleteManyCosponsors_By_Parties(where: Cosponsors_By_PartyWhereInput): BatchPayload!
  createBill(data: BillCreateInput!): Bill!
  updateManyBills(data: BillUpdateInput!, where: BillWhereInput): BatchPayload!
  deleteManyBills(where: BillWhereInput): BatchPayload!
  createSummary(data: SummaryCreateInput!): Summary!
  updateManySummaries(data: SummaryUpdateInput!, where: SummaryWhereInput): BatchPayload!
  deleteManySummaries(where: SummaryWhereInput): BatchPayload!
  createSector(data: SectorCreateInput!): Sector!
  updateManySectors(data: SectorUpdateInput!, where: SectorWhereInput): BatchPayload!
  deleteManySectors(where: SectorWhereInput): BatchPayload!
  createIndustry(data: IndustryCreateInput!): Industry!
  updateManyIndustries(data: IndustryUpdateInput!, where: IndustryWhereInput): BatchPayload!
  deleteManyIndustries(where: IndustryWhereInput): BatchPayload!
  createContributor(data: ContributorCreateInput!): Contributor!
  updateManyContributors(data: ContributorUpdateInput!, where: ContributorWhereInput): BatchPayload!
  deleteManyContributors(where: ContributorWhereInput): BatchPayload!
  createLegislator(data: LegislatorCreateInput!): Legislator!
  updateLegislator(data: LegislatorUpdateInput!, where: LegislatorWhereUniqueInput!): Legislator
  updateManyLegislators(data: LegislatorUpdateInput!, where: LegislatorWhereInput): BatchPayload!
  upsertLegislator(where: LegislatorWhereUniqueInput!, create: LegislatorCreateInput!, update: LegislatorUpdateInput!): Legislator!
  deleteLegislator(where: LegislatorWhereUniqueInput!): Legislator
  deleteManyLegislators(where: LegislatorWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  cosponsors_By_Parties(where: Cosponsors_By_PartyWhereInput, orderBy: Cosponsors_By_PartyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Cosponsors_By_Party]!
  cosponsors_By_PartiesConnection(where: Cosponsors_By_PartyWhereInput, orderBy: Cosponsors_By_PartyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): Cosponsors_By_PartyConnection!
  bills(where: BillWhereInput, orderBy: BillOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Bill]!
  billsConnection(where: BillWhereInput, orderBy: BillOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BillConnection!
  summaries(where: SummaryWhereInput, orderBy: SummaryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Summary]!
  summariesConnection(where: SummaryWhereInput, orderBy: SummaryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SummaryConnection!
  sectors(where: SectorWhereInput, orderBy: SectorOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Sector]!
  sectorsConnection(where: SectorWhereInput, orderBy: SectorOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SectorConnection!
  industries(where: IndustryWhereInput, orderBy: IndustryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Industry]!
  industriesConnection(where: IndustryWhereInput, orderBy: IndustryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): IndustryConnection!
  contributors(where: ContributorWhereInput, orderBy: ContributorOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Contributor]!
  contributorsConnection(where: ContributorWhereInput, orderBy: ContributorOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ContributorConnection!
  legislator(where: LegislatorWhereUniqueInput!): Legislator
  legislators(where: LegislatorWhereInput, orderBy: LegislatorOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Legislator]!
  legislatorsConnection(where: LegislatorWhereInput, orderBy: LegislatorOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): LegislatorConnection!
  node(id: ID!): Node
}

type Sector {
  sector_name: String!
  sector_code: ID!
  indivs: String
  pacs: String
}

type SectorConnection {
  pageInfo: PageInfo!
  edges: [SectorEdge]!
  aggregate: AggregateSector!
}

input SectorCreateInput {
  sector_name: String!
  sector_code: ID!
  indivs: String
  pacs: String
}

input SectorCreateManyInput {
  create: [SectorCreateInput!]
}

type SectorEdge {
  node: Sector!
  cursor: String!
}

enum SectorOrderByInput {
  sector_name_ASC
  sector_name_DESC
  sector_code_ASC
  sector_code_DESC
  indivs_ASC
  indivs_DESC
  pacs_ASC
  pacs_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SectorPreviousValues {
  sector_name: String!
  sector_code: ID!
  indivs: String
  pacs: String
}

type SectorSubscriptionPayload {
  mutation: MutationType!
  node: Sector
  updatedFields: [String!]
  previousValues: SectorPreviousValues
}

input SectorSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SectorWhereInput
  AND: [SectorSubscriptionWhereInput!]
  OR: [SectorSubscriptionWhereInput!]
  NOT: [SectorSubscriptionWhereInput!]
}

input SectorUpdateInput {
  sector_name: String
  sector_code: ID
  indivs: String
  pacs: String
}

input SectorUpdateManyInput {
  create: [SectorCreateInput!]
}

input SectorWhereInput {
  sector_name: String
  sector_name_not: String
  sector_name_in: [String!]
  sector_name_not_in: [String!]
  sector_name_lt: String
  sector_name_lte: String
  sector_name_gt: String
  sector_name_gte: String
  sector_name_contains: String
  sector_name_not_contains: String
  sector_name_starts_with: String
  sector_name_not_starts_with: String
  sector_name_ends_with: String
  sector_name_not_ends_with: String
  sector_code: ID
  sector_code_not: ID
  sector_code_in: [ID!]
  sector_code_not_in: [ID!]
  sector_code_lt: ID
  sector_code_lte: ID
  sector_code_gt: ID
  sector_code_gte: ID
  sector_code_contains: ID
  sector_code_not_contains: ID
  sector_code_starts_with: ID
  sector_code_not_starts_with: ID
  sector_code_ends_with: ID
  sector_code_not_ends_with: ID
  indivs: String
  indivs_not: String
  indivs_in: [String!]
  indivs_not_in: [String!]
  indivs_lt: String
  indivs_lte: String
  indivs_gt: String
  indivs_gte: String
  indivs_contains: String
  indivs_not_contains: String
  indivs_starts_with: String
  indivs_not_starts_with: String
  indivs_ends_with: String
  indivs_not_ends_with: String
  pacs: String
  pacs_not: String
  pacs_in: [String!]
  pacs_not_in: [String!]
  pacs_lt: String
  pacs_lte: String
  pacs_gt: String
  pacs_gte: String
  pacs_contains: String
  pacs_not_contains: String
  pacs_starts_with: String
  pacs_not_starts_with: String
  pacs_ends_with: String
  pacs_not_ends_with: String
  AND: [SectorWhereInput!]
  OR: [SectorWhereInput!]
  NOT: [SectorWhereInput!]
}

type Subscription {
  cosponsors_By_Party(where: Cosponsors_By_PartySubscriptionWhereInput): Cosponsors_By_PartySubscriptionPayload
  bill(where: BillSubscriptionWhereInput): BillSubscriptionPayload
  summary(where: SummarySubscriptionWhereInput): SummarySubscriptionPayload
  sector(where: SectorSubscriptionWhereInput): SectorSubscriptionPayload
  industry(where: IndustrySubscriptionWhereInput): IndustrySubscriptionPayload
  contributor(where: ContributorSubscriptionWhereInput): ContributorSubscriptionPayload
  legislator(where: LegislatorSubscriptionWhereInput): LegislatorSubscriptionPayload
}

type Summary {
  total: String
  spent: String
  cash_on_hand: String
  debt: String
}

type SummaryConnection {
  pageInfo: PageInfo!
  edges: [SummaryEdge]!
  aggregate: AggregateSummary!
}

input SummaryCreateInput {
  total: String
  spent: String
  cash_on_hand: String
  debt: String
}

input SummaryCreateOneInput {
  create: SummaryCreateInput
}

type SummaryEdge {
  node: Summary!
  cursor: String!
}

enum SummaryOrderByInput {
  total_ASC
  total_DESC
  spent_ASC
  spent_DESC
  cash_on_hand_ASC
  cash_on_hand_DESC
  debt_ASC
  debt_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SummaryPreviousValues {
  total: String
  spent: String
  cash_on_hand: String
  debt: String
}

type SummarySubscriptionPayload {
  mutation: MutationType!
  node: Summary
  updatedFields: [String!]
  previousValues: SummaryPreviousValues
}

input SummarySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SummaryWhereInput
  AND: [SummarySubscriptionWhereInput!]
  OR: [SummarySubscriptionWhereInput!]
  NOT: [SummarySubscriptionWhereInput!]
}

input SummaryUpdateDataInput {
  total: String
  spent: String
  cash_on_hand: String
  debt: String
}

input SummaryUpdateInput {
  total: String
  spent: String
  cash_on_hand: String
  debt: String
}

input SummaryUpdateOneInput {
  create: SummaryCreateInput
  update: SummaryUpdateDataInput
  upsert: SummaryUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
}

input SummaryUpsertNestedInput {
  update: SummaryUpdateDataInput!
  create: SummaryCreateInput!
}

input SummaryWhereInput {
  total: String
  total_not: String
  total_in: [String!]
  total_not_in: [String!]
  total_lt: String
  total_lte: String
  total_gt: String
  total_gte: String
  total_contains: String
  total_not_contains: String
  total_starts_with: String
  total_not_starts_with: String
  total_ends_with: String
  total_not_ends_with: String
  spent: String
  spent_not: String
  spent_in: [String!]
  spent_not_in: [String!]
  spent_lt: String
  spent_lte: String
  spent_gt: String
  spent_gte: String
  spent_contains: String
  spent_not_contains: String
  spent_starts_with: String
  spent_not_starts_with: String
  spent_ends_with: String
  spent_not_ends_with: String
  cash_on_hand: String
  cash_on_hand_not: String
  cash_on_hand_in: [String!]
  cash_on_hand_not_in: [String!]
  cash_on_hand_lt: String
  cash_on_hand_lte: String
  cash_on_hand_gt: String
  cash_on_hand_gte: String
  cash_on_hand_contains: String
  cash_on_hand_not_contains: String
  cash_on_hand_starts_with: String
  cash_on_hand_not_starts_with: String
  cash_on_hand_ends_with: String
  cash_on_hand_not_ends_with: String
  debt: String
  debt_not: String
  debt_in: [String!]
  debt_not_in: [String!]
  debt_lt: String
  debt_lte: String
  debt_gt: String
  debt_gte: String
  debt_contains: String
  debt_not_contains: String
  debt_starts_with: String
  debt_not_starts_with: String
  debt_ends_with: String
  debt_not_ends_with: String
  AND: [SummaryWhereInput!]
  OR: [SummaryWhereInput!]
  NOT: [SummaryWhereInput!]
}
`
      }
    