// app/actions.ts
"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function getDailyNotsense() {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite",
      generationConfig: {
        temperature: 1.8, // 창의성(헛소리) 최대화
        maxOutputTokens: 50, // 메인 페이지 디자인을 위해 짧게 제한
      },
    });

    const prompt = `
      너는 엉터리 명언 제조기야. 
      개발, 인생, 커피, 우주 중 하나의 주제를 골라서
      전혀 논리에 맞지 않지만 묘하게 설득력 있는 '헛소리 명언'을 딱 한 문장만 말해줘.
      예시: "코딩은 사실 키보드와 손가락의 탭댄스 대결이다."
      어조: 진지하고 철학적인 척.
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error(error);
    return "서버가 너무 정상적이라 헛소리를 못 했어요."; // 에러 발생 시 문구
  }
}
