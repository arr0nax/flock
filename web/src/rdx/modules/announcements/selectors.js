import { filter, get } from 'lodash';

export default {
  getAnnouncements: state => get(state, 'announcements.data'),
  getNewAnnouncements: state => {
    const announcements = get(state, 'announcements.data')
    return filter(announcements, 'new')
  },
};
