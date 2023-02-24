const { Schema, model, models } = require("mongoose");

const termSchema = new Schema({
  term: {
    type: String,
    required: true,
  },
  normalized: {
    type: String,
    required: true,
  },
  meaning: {
    type: String,
    required: true,
  },
});

module.exports = models.Term || model("Term", termSchema);
