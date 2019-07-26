import Path from 'path';
import Boom from 'boom';

// import Log from '../utils/log';
import BindAll from '../utils/bind-all';
import Attachment from '../models/attachment';
import User from '../models/user';
// import S3API from '../integrations/s3';
import Config from '../../config/config';
const fs = require('fs');
var Jimp = require('jimp');

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
    BindAll(this);
  }

  // static getUploadKey(type, filePath) {
  //   const key = `${type}/${Date.now()}_${Path.basename(filePath)}`;
  //   return key;
  // }

  async uploadDocument(user_id, file, item_type, item_id, filePart = null) {

    const filePath = `${Config.get('files.path')}/${item_type}/${item_id}`;

    Jimp.read(file.path, (err, image) => {
      if (err) return Boom.forbidden(err);
      var w = image.bitmap.width; // the width of the image
      var h = image.bitmap.height; // the height of the image
      if (w > 700 || h > 700) {
        image
          .scaleToFit(700, 700) // resize
          .write(`${filePath}/${file.filename}`);
      } else {
        image
          .write(`${filePath}/${file.filename}`);
      }
    });
    // fs.mkdir(filePath, { recursive: true }, (err) => {
    //   if (err) throw err;
    //   fs.readFile(file.path, (err, data) => {
    //     fs.writeFileSync(`${filePath}/${file.filename}`, data, (err) => {
    //       if (err) throw err;
    //       console.log('The file has been saved!');
    //     })
    //   })
    // });

    const attachment = await Attachment.create({
      filename: file.filename,
      user_id,
      item_type,
      item_id,
    })

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
    // return `https://${this.bucketName}.s3.${S3_REGION}.amazonaws.com/${fileKey}`
  }

  // generate 10 mins download from Amazon S3
  // getSignedDownloadUrl(key) {
  //   return this.s3API.getSignedUrl(key, this.bucketName);
  // }
}

module.exports = AttachmentService.create();
