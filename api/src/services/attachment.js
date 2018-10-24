import Path from 'path';

// import Log from '../utils/log';
import BindAll from '../utils/bind-all';
import Attachment from '../models/attachment';
import User from '../models/user';
import S3API from '../integrations/s3';
import Config from '../../config/config';

const S3_REGION = 'us-west-2';



const LOG_NAME = 'AttachmentService';

class AttachmentService {
  static instance = null;

  static create() {
    this.instance = this.instance == null ? new AttachmentService() : this.instance;
    return this.instance;
  }

  constructor() {
    console.log(LOG_NAME);
    this.s3API = S3API.createInstance();
    this.bucketName = this.s3API.getBucketName();
    BindAll(this);
  }

  static getUploadKey(type, filePath) {
    const key = `${type}/${Date.now()}_${Path.basename(filePath)}`;
    return key;
  }

  async uploadDocument(user_id, fullPath, item_type, item_id, filePart = null) {
    console.log(`uploadDocument ${fullPath}, ${item_type}, ${filePart}`);
    const filenameOnly = filePart == null ? Path.basename(fullPath) : filePart;
    const fileKey = await AttachmentService
      .getUploadKey(item_type, filenameOnly);

    // upload file to s3
    console.log(this.bucketName);
    await this.s3API.uploadFile(fullPath, this.bucketName, {
      deleteAfter: true,
      contentType: AttachmentService.mapContentType(item_type),
      isPublic: true,
    }, () => fileKey);

    const data = {
      name: filenameOnly,
      key: fileKey,
      user_id,
      item_id,
      item_type,
    };

    console.log(data);
    const attachment = await Attachment.create(data);
    const url = await this.getDownloadUrl(fileKey);
    console.log(data);
    if (item_type === 'user') {
      const user = await User.updateProfileImage(data, url);
    }

    return attachment;
  }

  static mapContentType(type) {
    const mappings = {
      ZIP: 'application/zip',
    };

    return mappings[type] ? mappings[type] : 'application/octet-stream';
  }

  // async getAllDownloadUrl(applicationId) {
  //   const attachs = await Attachment.getByApplicationID(applicationId);
  //   const attachList = attachs.models.map(async (attach) => {
  //     const a = attach.attributes;
  //     a.url = await this.getSignedDownloadUrl(attach.attributes.key);
  //     return a;
  //   });
  //
  //   return Promise.all(attachList);
  // }

  async getDownloadUrl(fileKey, item_type) {
    // const attachs = await Attachment.getByApplicationIDType(applicationId, item_type);
      // return this.getSignedDownloadUrl(fileKey);
    return `https://${this.bucketName}.s3.${S3_REGION}.amazonaws.com/${fileKey}`
  }

  // generate 10 mins download from Amazon S3
  getSignedDownloadUrl(key) {
    return this.s3API.getSignedUrl(key, this.bucketName);
  }
}

module.exports = AttachmentService.create();
