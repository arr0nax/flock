import get from 'lodash/get';

export default {
  getPathname: state => get(state, 'router.location.pathname'),
};
