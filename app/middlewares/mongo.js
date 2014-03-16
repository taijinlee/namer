module.exports = function(model) {
  return function(req, res, next) {
    var crud = {
      create: function() {
        model.insert(req.model, next);
      },

      read: function() {
        if (req.model.id) {
          model.retrieve(req.model, next);
        } else {
          model.query(req.model, {}, next);
        }
      },

      update: function() {
        var modelData = {};
        for (var key in req.model) {
          modelData[key] = req.model[key];
        }
        delete modelData.id;

        model.update({ id: req.model.id }, modelData, next);
      },

      delete: function() {
        model.remove({ id: req.model.id }, next);
      }
    };

    if (!crud[req.method]) { return next(new Error('Unsuppored method ' + req.method)); }
    return crud[req.method]();
  };
};
