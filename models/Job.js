const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = Schema(
  {
    authorId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["Full time", "Part time", "Temporary"],
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Community",
        "Environment",
        "Health care",
        "Sports",
        "Wildlife Protection",
      ],
      required: true,
    },
    description: { type: String, required: true },
    location: { type: String, required: true },
    imgUrl: { type: String },
    detailedInformation: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    status: { type: String, enum: ["done", "ongoing"], default: "ongoing" },
  },
  {
    timestamp: true,
  }
);

jobSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.isDeleted;
  return obj;
};

const Job = mongoose.model("Jobs", jobSchema);
module.exports = Job;
// _jobId:
// authorId:
// name:
// type: fulltime, part time, temporary
// category: environment , Education , Health,Agriculture,Wildlife Protection
// https://www.hachettebookgroup.JOcom/travel/trip-ideas/types-of-volunteer-opportunities/
// description:
// location:
// imageUrl:
// status: "done","ongoing"
// isDeleted:
// detailedInformation:
