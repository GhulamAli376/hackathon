import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const testModel = async () => {
  try {
    console.log("🔑 Testing Hugging Face token...");
    const res = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      { inputs: "Hello from HealthMate!" },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("✅ Response:", res.data);
  } catch (err) {
    console.error("❌ Error:", err.response?.data || err.message);
  }
};

testModel();
