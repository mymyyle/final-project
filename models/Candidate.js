const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const candidateSchema = Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Jobs",
      required: true,
    },
    registers: {
      type: Array,
    },
    acceptedList: {
      type: Array,
    },
  },
  {
    timestamp: true,
  }
);

const Candidate = mongoose.model("Candidates", candidateSchema);
module.exports = Candidate;

// _candidateId:
// authorId:
// jobId:
// candidates: [
//   { id, content },
//   { id, content },
//  ];
// acceptedList: [id, id, id];
