import { put } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* getMeta(action) {
    const { success, data, error } = yield* makeRequest.get('/init');
    if (success && data) {
      yield put(actions.getInitSuccess(data));
      yield put(actions.getPostsSuccess(data));
      yield put(actions.getTopicSuccess(data.topic));
      yield put(actions.getGroupUsersSuccess(data.users))
      yield put(actions.initSetComments(data.comments));
      yield put(actions.initSetReplies(data.replies));
      yield put(actions.initSetPostReacts(data.post_reacts))
      yield put(actions.initSetCommentReacts(data.comment_reacts))
      yield put(actions.initSetCommentAttachments(data.comment_attachments))
      yield put(actions.initSetReplyReacts(data.reply_reacts))
      yield put(actions.initSetReplyAttachments(data.reply_attachments))
      yield put(actions.getNotificationsSuccess(data.notifications))
      yield put(actions.getReportsSuccess(data.reports))
      yield put(actions.getReportVotesSuccess(data.votes))
      yield put(actions.getAnnouncementsSuccess(data.announcements))
    } else {
      yield put(actions.getInitFailure(error));
    }
    return null;
}

export default getMeta;
