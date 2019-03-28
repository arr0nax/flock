import Boom from 'boom';
import Report from '../../models/report';
import User from '../../models/user';
import Post from '../../models/post';
import Comment from '../../models/comment';
import Reply from '../../models/reply';
import Notification from '../../models/notification';

const CONTROLLER = 'ReportController';

class ReportController {
  async create(request) {
    try {
      let reportExists = await new Report({
        item_type: request.payload.item_type,
        item_id: request.payload.item_id
      }).fetch();

      if (reportExists) {
        return Boom.forbidden('Report already exists')
      }

      let report;

      //////Notification
      switch(request.payload.item_type) {
        case 'post':
          const post = await Post.findByID(request.payload.item_id);
          console.log(post);
          const postUser = await User.findByID(post.attributes.user_id);
          console.log(postUser);
          const newPost = await post.save({reported: true}, {patch: true})
          report = await Report.create({
            item_id: post.attributes.id,
            item_type: 'post',
            group_id: postUser.attributes.group_id,
          });
          Notification.create({
            item_id: report.attributes.id,
            item_type: 'report',
            user_id: postUser.attributes.id,
            parent_id: post.attributes.id,
            parent_type: 'post',
            made_by: 0,
          });
          break;
        case 'comment':
          const comment = await Comment.findByID(request.payload.item_id);
          const commentUser = User.findByID(comment.attributes.user_id);
          const newComment = await comment.save({reported: true}, {patch: true})

          report = await Report.create({
            item_id: comment.attributes.id,
            item_type: 'comment',
            group_id: commentUser.attributes.group_id,
          });
          Notification.create({
            item_id: report.attributes.id,
            item_type: 'report',
            user_id: commentUser,
            parent_id: comment.attributes.id,
            parent_type: 'comment',
            made_by: 0,
          });
          break;
        case 'reply':
          const reply = await Reply.findByID(request.payload.item_id);
          const replyUser = User.findByID(reply.attributes.user_id);
          const newReply = await reply.save({reported: true}, {patch: true})
          report = await Report.create({
            item_id: reply.attributes.id,
            item_type: 'reply',
            group_id: replyUser.attributes.group_id,
          });
          Notification.create({
            item_id: report.attributes.id,
            item_type: 'report',
            user_id: replyUser.attributes.id,
            parent_id: reply.attributes.id,
            parent_type: 'reply',
            made_by: 0,
          });
          break;
      }

      return report;
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async update(request) {
    try {
      return Report.updateById(request.params.id, {
        report: request.payload.report
      });
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async destroy(request) {
    try {
      return Report.destroyById(request.params.id);
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async fetchReports(request) {
    try {
      return Report.byGroup(request.params.group_id);
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

}

module.exports = new ReportController();
