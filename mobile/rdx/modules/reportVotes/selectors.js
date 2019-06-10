import { get } from 'lodash';

export default {
  getReportVotes: state => get(state, 'report_votes.data'),
};
