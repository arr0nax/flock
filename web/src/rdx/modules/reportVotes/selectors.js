import { get } from 'lodash';

export default {
  getReports: state => get(state, 'report_votes.data'),
};
