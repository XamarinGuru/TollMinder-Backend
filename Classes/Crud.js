module.exports = class Crud {

  _create(model, data) {
    return new Promise((resolve, reject) => {
      let document = new model(data);
      document.save()
      .then(resolve)
      .catch(reject);
    });
  }

  _read(model, _id, populate, limit, skip) {
    return new Promise((resolve, reject) => {
      let query = _id ? model.findOne({_id}) : model.find();
      query.limit(limit || 20);
      query.skip(skip || 0);
      if (populate) query.populate(populate);
      query.exec()
      .then(resolve)
      .catch(reject);
    });
  }

  _update(model, _id, schema, changes) {
    return new Promise((resolve, reject) => {
      model.findOne({_id})
      .exec()
      .then(document => {
        if (!document) return reject({message: 'Not found', code: 404});
        for (let change in changes) if (schema.hasOwnProperty(change)) document[change] = changes[change];
        if (schema.hasOwnProperty('updatedAt')) document.updatedAt = Date.now();
        return document.save();
      })
      .then(resolve)
      .catch(reject);
    });
  }

  _remove(model, _id) {
    return new Promise((resolve, reject) => {
      if (!_id) return reject({message:'Missed `_id`', code: 400 });
      model.remove({_id})
      .then(resolve)
      .catch(reject);
    });
  }

  _findOlder(model, targetDate, populate) {
    return new Promise((resolve, reject) => {
      model.find({})
      .or([
        {createdAt: {gte: targetDate}},
        {updatedAt: {gte: targetDate}}
      ])
      .populate(populate || '')
      .exec()
      .then(resolve)
      .catch(reject);
    });
  }
};