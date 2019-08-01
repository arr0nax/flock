import { get } from 'lodash';

export default {
  getGroup: state => get(state, 'group.data'),
};
