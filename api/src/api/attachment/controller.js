// import EyeHapi from 'eye-hapi';
import AttachmentService from '../../services/attachment';
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
    return FileUtil.fileUploader(request, f => this.attachmentSvc.uploadDocument(
      request.auth.credentials.user_id,
      f.path,
      request.payload.item_type,
      request.payload.item_id,
      request.payload.file.filename,
    ));
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
