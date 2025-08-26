// File: api/translate.js (Phiên bản chỉ dùng Gemini)

async function callGeminiAPI(prompt, apiKey, model) {
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
        }),
    });

    const data = await response.json();
    if (!response.ok) {
        const errorMessage = data?.error?.message || `Gemini API call failed with status: ${response.status}`;
        throw new Error(errorMessage);
    }
    return data.candidates[0].content.parts[0].text.trim();
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end('Method Not Allowed');
    }

    // Chỉ cần lấy API Key của Gemini
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "Server configuration error: GEMINI_API_KEY not found." });
    }

    const { prompt, model } = req.body;
    if (!prompt || !model) {
        return res.status(400).json({ error: "Bad request: 'prompt' and 'model' are required." });
    }

    try {
        const resultText = await callGeminiAPI(prompt, apiKey, model);
        return res.status(200).json({ text: resultText });
    } catch (error) {
        console.error("Error calling Gemini:", error.message);
        return res.status(500).json({ error: error.message });
    }
}
