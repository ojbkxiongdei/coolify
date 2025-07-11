import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      elfType, 
      gender, 
      nameCount, 
      nameStyle, 
      includeBackground,
      customRequirements 
    } = body;

    // 构建AI提示词
    let prompt = `Generate ${nameCount} authentic fantasy elf names`;
    
    if (elfType && elfType !== "any") {
      prompt += ` for ${elfType}`;
    }
    
    if (gender && gender !== "any") {
      prompt += ` (${gender})`;
    }
    
    prompt += `. The names should be ${nameStyle} and suitable for fantasy settings like D&D, Tolkien-style fantasy, or similar RPG games.`;

    if (includeBackground) {
      prompt += ` For each name, also provide a brief background story or characteristic that fits the elf's nature and type.`;
    }

    if (customRequirements) {
      prompt += ` Additional requirements: ${customRequirements}`;
    }

    prompt += `

Please format the response as a JSON array with objects containing:
- name: the elf name
- pronunciation: phonetic pronunciation guide
- meaning: meaning or etymology of the name
${includeBackground ? '- background: a brief background story or characteristic' : ''}
- elfType: the type of elf this name suits best

Example format:
[
  {
    "name": "Aelindra",
    "pronunciation": "AY-lin-dra", 
    "meaning": "Moonlight dancer",
    ${includeBackground ? '"background": "A graceful wood elf who dances under the moonlight, known for her connection to nature spirits",' : ''}
    "elfType": "Wood Elf"
  }
]`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "You are a fantasy name generator expert specializing in creating authentic, lore-friendly elf names for various fantasy settings. Generate names that sound elvish and fit the requested characteristics."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 2000,
    }, {
      timeout: 30000,
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error("No response from AI");
    }

    // 尝试解析JSON
    let parsedResponse;
    try {
      // 清理响应文本，移除可能的markdown标记
      const cleanResponse = response.replace(/```json\n?|\n?```/g, '').trim();
      parsedResponse = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
      // 如果解析失败，返回原始文本
      parsedResponse = {
        rawText: response,
        error: "Failed to parse structured response"
      };
    }

    return NextResponse.json({
      success: true,
      data: parsedResponse,
      usage: completion.usage
    });

  } catch (error) {
    console.error("Error generating elf names:", error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { 
          success: false, 
          error: error.message 
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: "An unexpected error occurred" 
      },
      { status: 500 }
    );
  }
}