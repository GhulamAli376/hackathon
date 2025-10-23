import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  fileName: String,
  fileUrl: String,
});

const aiResponseSchema = new mongoose.Schema({
  diagnosis: String,
  diagnosis_roman: String,
  doctor_advice: [String],
  diet_plan: {
    eat: [String],
    avoid: [String],
  },
  home_remedies: [String],
  short_summary: String,
});

const reportSchema = new mongoose.Schema(
  {
    memberId: { type: String, required: true },
    title: String,
    testName: String,
    hospital: String,
    doctor: String,
    date: Date,
    price: Number,
    notes: String,
    files: [fileSchema],
    aiResponse: aiResponseSchema,
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
