import types from '../../modules/announcements/types';
import createAction from '../../utils/createAction';

export default {
  getAnnouncements: payload => createAction(types.GET_ANNOUNCEMENTS_REQUEST, payload),
  getAnnouncementsSuccess: payload => createAction(types.GET_ANNOUNCEMENTS_SUCCESS, payload),
  getAnnouncementsFailure: payload => createAction(types.GET_ANNOUNCEMENTS_FAILURE, payload),

  postAnnouncementSeen: payload => createAction(types.POST_ANNOUNCEMENT_SEEN_REQUEST, payload),
  postAnnouncementSeenSuccess: payload => createAction(types.POST_ANNOUNCEMENT_SEEN_SUCCESS, payload),
  postAnnouncementSeenFailure: payload => createAction(types.POST_ANNOUNCEMENT_SEEN_FAILURE, payload),

  postAnnouncement: payload => createAction(types.POST_ANNOUNCEMENT_REQUEST, payload),
  postAnnouncementSuccess: payload => createAction(types.POST_ANNOUNCEMENT_SUCCESS, payload),
  postAnnouncementFailure: payload => createAction(types.POST_ANNOUNCEMENT_FAILURE, payload),
};
