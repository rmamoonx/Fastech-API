var mongoose = require("mongoose");
const SupportSchema = mongoose.Schema({
  _id: {
    type: Object,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
});
module.exports = Support = mongoose.model("support", SupportSchema);
