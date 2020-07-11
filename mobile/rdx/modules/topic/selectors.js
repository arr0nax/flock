import { get } from 'lodash';

export default {
  getTopic: state => get(state, 'topic.data'),
};
