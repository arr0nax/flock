import Boom from 'boom';
import Report from '../../models/report';
import ReportService from '../../services/report';
import ReportVote from '../../models/report_vote';
import User from '../../models/user';
import Post from '../../models/post';
import Comment from '../../models/comment';
import Reply from '../../models/reply';
import Notification from '../../models/notification';
import BindAll from '../../utils/bind-all';

const CONTROLLER = 'ReportVoteController';

class ReportVoteController {
  constructor() {
    console.log(CONTROLLER);
    console.log('ctor');
    this.reportSvc = ReportService;
    BindAll(this);
  }

  async create(request) {
    try {
      let vote = await new ReportVote({
        user_id: request.auth.credentials.user_id,
        report_id: request.params.id
      }).fetch();
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

      const report = await Report.findByID(request.params.id);
      this.reportSvc.evaluateReport(report.attributes.id);
      return vote;
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async update(request) {
    try {
      const report_vote = await ReportVote.findByID(request.params.id);
      const report = await Report.findByID(report_vote.attributes.report_id);
      const updated = await ReportVote.updateById(request.params.id, {
        vote: request.payload.vote
      });
      this.reportSvc.evaluateReport(report.attributes.id);
      return updated;
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

  async fetchUserVotes(request) {
    try {
      const user = await User.findByID(request.auth.credentials.user_id);
      return user.getReportVotes();
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

}

module.exports = new ReportVoteController();
