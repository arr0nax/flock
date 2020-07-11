import get from 'lodash/get';

export default {
  getReports: state => get(state, 'reports.data'),
  getReportsRequested: state => get(state, 'reports.requested'),
  getNewReportsCount: state => {
    const reports = get(state, 'reports.data');
    const report_votes = get(state, 'report_votes.data');
    const length = reports.length - report_votes.length;
    return (length > 0 ? length : 0);
  },
};
