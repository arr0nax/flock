import DB from './db';

class BaseModel extends DB.Model {
  static create(data, options = {}) {
    return this.forge(data).save(null, options);
  }

  static findAll() {
    return this.fetchAll();
  }
//
//   // Find Model by some properties
  static findOne(selectData, filter = {}) {
    return this.forge(selectData).where(filter).fetch();
  }
//
//   // Find many Model by filter and tokoptions
//   static findAll(filter = {}, pagination = {}) {
//     return this.forge()
//       .where(filter)
//       .orderBy(this.idAttribute)
//       .fetchPage(pagination);
//   }
//
  static findByID(id) {
    return this.findOne({}, {
      id,
    });
  }
//
//   static destroyById(id, options = {}) {
//     return this.forge({
//       [this.prototype.idAttribute]: id,
//     })
//       .destroy(options);
//   }
//
//   static updateById(id, data, options = {}) {
//     return this.forge({
//       [this.prototype.idAttribute]: id,
//     }).fetch(options)
//       .then(model => (model ? model.save(data, options) : undefined));
//   }
//
//   static async upsert(selectData, updateData) {
//     const existingModel = await this.findOne(selectData);
//     if (existingModel) {
//       return existingModel.set(updateData).save();
//     }
//     return new this(updateData).save();
//   }
//
//   static getList(pagination, filters = null, orders = this.idAttribute) {
//     return this
//       .query((qb) => {
//         qb.select('*');
//         if (filters !== null) {
//           qb.where(filters);
//         }
//       })
//       .orderBy(orders)
//       .fetchPage(pagination);
//   }
}
//
export default BaseModel;
