import Member from "../schema/memberSchema.js";
import reportSchema from "../schema/reportSchema.js";
import axios from "axios"
export const addFamily =  async (req, res) => {
  try {
    const newMember =await Member.create(req.body);
    res.status(201).json({ success: true, member: newMember });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export const getaddFamily =  async (req, res) => {
  try {
    const members = await Member.find();
    res.json({ success: true, members });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}


export const addReport = async (req, res) => {
  console.log("📩 addReport route hit!");
  console.log("Request body:", req.body);
  console.log("Request files:", req.files);

  try {
    const { memberId, testName } = req.body;
    if (!memberId || !testName) {
      return res.status(400).json({
        success: false,
        message: "memberId and testName are required",
      });
    }

    // ✅ Step 1: Save the report in MongoDB
    const newReport = await reportSchema.create({
      ...req.body,
      files: req.files?.map((file) => ({
        fileName: file.originalname,
        fileUrl: `uploads/${file.originalname}`,
      })),
    });

    console.log("🧠 Using model: Hermes-2-Pro-Llama3 (OpenRouter)");

    // ✅ Step 2: Create AI prompt
    const prompt = `
You are an AI medical assistant.
Analyze this medical report and return a JSON response ONLY with these keys:

{
  "diagnosis": "short English diagnosis",
  "diagnosis_roman": "short diagnosis in Roman Urdu",
  "doctor_advice": ["3–5 short bullet points"],
  "diet_plan": {"eat": ["foods to eat"], "avoid": ["foods to avoid"]},
  "home_remedies": ["simple remedies"],
  "short_summary": "one short summary for patient"
}

Report:
${JSON.stringify(req.body, null, 2)}
`;

    // ✅ Step 3: Call OpenRouter API (using Hermes-2-Pro-Llama-3)
    let aiOutput = "";
    try {
      const aiRes = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "nousresearch/hermes-2-pro-llama-3-8b",
          messages: [{ role: "user", content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 60000,
        }
      );

      aiOutput =
        aiRes.data?.choices?.[0]?.message?.content ||
        JSON.stringify(aiRes.data);

      console.log("✅ OpenRouter AI Response received");
      console.log("🧩 Raw AI Output:", aiOutput);
    } catch (err) {
      console.error("❌ OpenRouter API Error:", err.response?.data || err.message);
      aiOutput = "AI service unavailable or invalid response.";
    }

    // ✅ Step 4: Parse JSON safely
    let parsed = {};
    try {
      const firstBrace = aiOutput.indexOf("{");
      const lastBrace = aiOutput.lastIndexOf("}");
      const jsonText =
        firstBrace >= 0 && lastBrace > firstBrace
          ? aiOutput.slice(firstBrace, lastBrace + 1)
          : "{}";

      parsed = JSON.parse(jsonText);
    } catch (err) {
      console.warn("⚠️ Failed to parse AI JSON, using fallback");
      parsed = {
        diagnosis: "",
        diagnosis_roman: "",
        doctor_advice: [],
        diet_plan: { eat: [], avoid: [] },
        home_remedies: [],
        short_summary: aiOutput.slice(0, 1000),
      };
    }

    // ✅ Step 5: Save AI response
    newReport.aiResponse = parsed;
    await newReport.save();

    return res.status(201).json({
      success: true,
      message: "Report saved and AI feedback stored successfully.",
      report: newReport,
    });
  } catch (error) {
    console.error("Add Report Error:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};



// in controller
export const getReports = async (req, res) => {
  try {
    const { memberId } = req.params;
    const reports = await reportSchema.find({ memberId });
    res.json({ success: true, reports });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
