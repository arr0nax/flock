import Boom from 'boom';
import Report from '../../models/report';
import ReportVote from '../../models/report_vote';
import User from '../../models/user';
import Post from '../../models/post';
import Comment from '../../models/comment';
import Reply from '../../models/reply';
import Notification from '../../models/notification';

const CONTROLLER = 'ReportVoteController';

class ReportVoteController {
  async create(request) {
    try {
      let vote = await new ReportVote({
        user_id: request.auth.credentials.user_id,
        report_id: request.params.id
      }).fetch();
      console.log(vote);
      if (vote) {
        vote = await vote
          .save({vote: request.payload.vote}, {patch: true})
      } else {
        vote = await ReportVote.create({
          vote: request.payload.vote,
          user_id: request.auth.credentials.user_id,
          report_id: request.params.id,
        });
      }

      return vote;
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async update(request) {
    try {
      return ReportVote.updateById(request.params.id, {
        vote: request.payload.vote
      });
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async destroy(request) {
    try {
      return ReportVote.destroyById(request.params.id);
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async fetchReportVotes(request) {
    try {
      const report = await Report.findByID(request.params.id);
      return report.getVotes();
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

}

module.exports = new ReportVoteController();
