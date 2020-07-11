import topicService from '../services/topics';
var CronJob = require('cron').CronJob;

export default () => {
  new CronJob('0 0 2 * * *', function() {
    console.log('hello cronjob!');
    topicService.chooseTopic();
  }, null, true, 'America/Los_Angeles', this, true);
}
