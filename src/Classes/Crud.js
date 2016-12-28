module.exports = class Crud {

  async _create(model, data) {
    try {
      let document = new model(data);
      return await document.save();
    } catch (e) {
      throw e;
    }
  }

  async _read(model, _id, populate, limit, skip) {
    try {
      let query = _id ? model.findOne({_id}) : model.find();
      query.limit(limit || 0);
      query.skip(skip || 0);
      if (populate) query.populate(populate);
      return await query.exec();
    } catch (e) {
      throw e;
    }
  }

  async _update(model, _id, schema, changes) {
    try {
      let document = await model.findOne({_id}).exec();
      if (!document) throw {message: 'Not found', code: 404};
      for (let change in changes) if (schema.hasOwnProperty(change)) document[change] = changes[change];
      if (schema.hasOwnProperty('updatedAt')) document.updatedAt = Date.now();
      return await document.save();
    } catch (e) {
      throw e;
    }
  }

  async _remove(model, _id) {
    try {
      if (!_id) throw {message: 'Missed `_id`', code: 400};
      return await model.remove({_id})
    } catch (e) {
      throw e;
    }
  }

  async _findOlder(model, targetDate, populate) {
    try {
      return await model.find({})
      .or([
        {createdAt: {$gte: targetDate}},
        {updatedAt: {$gte: targetDate}}
      ])
      .populate(populate || '')
      .exec()
    } catch (e) {
      throw e;
    }
  }
};