export default function bindAll(obj, context) {
  const self = obj;
  const ctx = context || self;
  const keys = Object.getOwnPropertyNames(self.constructor.prototype);

  keys.forEach((key) => {
    const val = self[key];

    if (key !== 'constructor' && typeof val === 'function') {
      self[key] = val.bind(ctx);
    }
  });

  return self;
}
