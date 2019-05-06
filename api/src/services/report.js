import Path from 'path';

// import Log from '../utils/log';
import BindAll from '../utils/bind-all';
import Attachment from '../models/attachment';
import User from '../models/user';
import Post from '../models/post';
import Comment from '../models/comment';
import Reply from '../models/reply';
import Report from '../models/report';




const LOG_NAME = 'ReportService';

class ReportService {
  static instance = null;

  static create() {
    this.instance = this.instance == null ? new ReportService() : this.instance;
    return this.instance;
  }

  constructor() {
    console.log(LOG_NAME);
    BindAll(this);
  }

  async evaluateReport(id) {
    const report = await Report.findByID(id);
    const trueVotes = await report.getTrueVotes();
    const falseVotes = await report.getFalseVotes();

    if (parseInt(falseVotes, 10) > 0) {
      switch(report.attributes.item_type) {
        case 'post':
           await report.save({resolved: true}, {patch: true});
           Post.forge({id: report.attributes.item_id}).fetch().then((model) => {
             console.log(model);
             return model.destroy()
           });
          break;
        case 'comment':
          await report.save({resolved: true}, {patch: true});
           Comment.forge({id: report.attributes.item_id}).fetch().then((model) => {
             return model.destroy()
           });

          break;
        case 'reply':
          await report.save({resolved: true}, {patch: true});
           Reply.forge({id: report.attributes.item_id}).fetch().then((model) => {
             return model.destroy()
           });
          break;
        default:
          return 'something has gone wrong';
          break;
      }
    } else {

    }

  }

}

module.exports = ReportService.create();
