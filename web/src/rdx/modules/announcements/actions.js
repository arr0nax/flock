import types from 'rdx/modules/announcements/types';
import createAction from 'rdx/utils/createAction';

export default {
  getAnnouncements: payload => createAction(types.GET_ANNOUNCEMENTS_REQUEST, payload),
  getAnnouncementsSuccess: payload => createAction(types.GET_ANNOUNCEMENTS_SUCCESS, payload),
  getAnnouncementsFailure: payload => createAction(types.GET_ANNOUNCEMENTS_FAILURE, payload),

  postAnnouncementSeen: payload => createAction(types.POST_ANNOUNCEMENT_SEEN_REQUEST, payload),
  postAnnouncementSeenSuccess: payload => createAction(types.POST_ANNOUNCEMENT_SEEN_SUCCESS, payload),
  postAnnouncementSeenFailure: payload => createAction(types.POST_ANNOUNCEMENT_SEEN_FAILURE, payload),
};
