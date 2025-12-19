import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_KEY } from "./constants";

const genAI = new GoogleGenerativeAI(GEMINI_KEY);

// "gemini-1.5-flash" -> Retired (404)
// "gemini-2.5-flash" -> Busy (503)
// SOLUTION: "gemini-2.5-flash-lite" (Fast & Stable)
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

export default model;