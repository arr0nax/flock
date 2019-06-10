import get from 'lodash/get';

export default {
  getReports: state => get(state, 'reports.data'),
  getReportsRequested: state => get(state, 'reports.requested'),
};
