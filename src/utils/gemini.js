import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_KEY } from "./constants";

const genAI = new GoogleGenerativeAI(GEMINI_KEY);

// OLD: "gemini-1.5-flash" (Expired)
// NEW: "gemini-2.5-flash" (Latest & Fastest 2025 Model)
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export default model;