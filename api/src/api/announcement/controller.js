import Boom from 'boom';
import Announcement from '../../models/announcement';
import AnnouncementSeen from '../../models/announcement_seen';
import User from '../../models/user';
import Group from '../../models/group';

const CONTROLLER = 'AnnouncementController';

class AnnouncementController {
  async create(request) {
    try {
      const user = await User.findByID(request.auth.credentials.user_id);
      const announcement = await Announcement.create({
        text: request.payload.text,
        user_id: request.auth.credentials.user_id,
        group_id: user.attributes.group_id,
      });
      const group = await Group.findByID(user.attributes.group_id);
      const users = await group.getUsers();
      Promise.all(users.map(
        user => new Promise((resolve, reject) => {
          AnnouncementSeen.create({
            user_id: user.attributes.id,
            announcement_id: announcement.attributes.id,
          })
          resolve();
        })
      ))

      return announcement;
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async destroy(request) {
    try {
      return Announcement.destroyById(request.params.id);
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async update(request) {
    try {
      return Announcement.updateById(request.params.id, {
        text: request.payload.text,
      });
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async fetchAll(request) {
    try {
      // const posts = await Announcement.fetchAll();
      // const newAnnouncements = posts.map(async (post) => {
      //   const user = await post.getUser();
      //   console.log(user);
      //   return {
      //     post,
      //     user,
      //   }
      // });
      const user = await User.findByID(request.auth.credentials.user_id);
      const group = await Group.findByID(user.attributes.group_id);
      let announcements = await group.getAnnouncements();

      const cnew = await Promise.all(announcements.map(
        announcement => new Promise((resolve, reject) => {
          resolve(AnnouncementSeen.byUserIdAnnouncementId(user.attributes.id, announcement.attributes.id));
        })
      ))

      announcements.forEach((announcement, index) => {
        if (cnew[index][0] && cnew[index][0].id) {
          announcement.attributes.new = true;
        } else {
          announcement.attributes.new = false;
        }
      })
      return announcements;

    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async fetchOne(request)  {
    return Announcement.findByID(request.params.id)
  }

  async markSeenByUser(request) {
    try {
      const announcement_seen = await AnnouncementSeen.byUserIdAnnouncementId(request.auth.credentials.user_id, request.params.id);
      let done = null;
      if (announcement_seen.length) {
        done = await AnnouncementSeen.destroyById(announcement_seen[0].id);
      }
      return done;
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

}

module.exports = new AnnouncementController();
