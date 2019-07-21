// import EyeHapi from 'eye-hapi';
import Boom from 'boom';
import AttachmentService from '../../services/attachment';
import Attachment from '../../models/attachment';
import BindAll from '../../utils/bind-all';
import FileUtil from '../../utils/file';

const CONTROLLER = 'AttachmentController';

class AttachmentController {
  constructor() {
    console.log(CONTROLLER);
    console.log('ctor');
    this.attachmentSvc = AttachmentService;
    BindAll(this);
  }

  // upload a file with type of (ZIP, VID,IMG, URL, OTHER)
  uploadDocument(request) {
    return FileUtil.fileUploader(request, file => this.attachmentSvc.uploadDocument(
      request.auth.credentials.user_id,
      file,
      request.payload.item_type,
      request.payload.item_id,
      request.payload.file.filename,
    ));
  }

  async fetchPostAttachments(request) {
    try {
      return Attachment.byPost(request.params.id);
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async fetchCommentAttachments(request) {
    try {
      return Attachment.byComment(request.params.id);
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async fetchReplyAttachments(request) {
    try {
      return Attachment.byReply(request.params.id);
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  // download all for application
  getAllDownloadUrl(request) {
    return this.attachmentSvc.getAllDownloadUrl(request.params.id);
  }

  // download for one
  getDownloadUrl(request) {
    return this.attachmentSvc.getDownloadUrl(request.params.id, request.params.type);
  }
}

module.exports = new AttachmentController();
