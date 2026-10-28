// Namespace children described by generated UniversalReference pages carry no type,
// which the built-in namespace grouping requires. Generated pages are all classes.
exports.preTransform = function (model) {
  if (model.children) {
    model.children.forEach(function (child) {
      if (!child.type) child.type = 'class';
    });
  }
  return model;
};

exports.postTransform = function (model) {
  return model;
};
