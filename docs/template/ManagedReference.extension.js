exports.preTransform = function (model) {
  if (model.generatedContent) {
    model.conceptual = model.generatedContent + (model.conceptual || '');
  }
  return model;
};
exports.postTransform = function (model) { return model; };