// File: api/translate.js (Phiên bản hoàn chỉnh hỗ trợ cả Gemini và OpenRouter)

// --- CÁC HÀM GỌI API CHO TỪNG NỀN TẢNG ---

// Hàm gọi API của Gemini
async function callGeminiAPI(prompt, apiKey, model) {
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || `Gemini API call failed`);
    return data.candidates[0].content.parts[0].text.trim();
}

// Hàm gọi API của OpenRouter
async function callOpenRouterAPI(prompt, apiKey, model) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: model,
            messages: [{ role: "user", content: prompt }],
        }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || `OpenRouter API call failed`);
    return data.choices[0].message.content.trim();
}


// --- HÀM XỬ LÝ CHÍNH ---
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end('Method Not Allowed');
    }

    const { prompt, model, service } = req.body;

    if (!prompt || !model || !service) {
        return res.status(400).json({ error: "Bad request: 'prompt', 'model', and 'service' are required." });
    }

    try {
        let resultText;
        
        if (service === 'gemini') {
            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) {
                // Nếu không tìm thấy key, trả về lỗi JSON rõ ràng
                return res.status(500).json({ error: "Server config error: GEMINI_API_KEY not found." });
            }
            resultText = await callGeminiAPI(prompt, apiKey, model);

        } else if (service === 'openrouter') {
            const apiKey = process.env.OPENROUTER_API_KEY;
            if (!apiKey) {
                // Nếu không tìm thấy key, trả về lỗi JSON rõ ràng
                return res.status(500).json({ error: "Server config error: OPENROUTER_API_KEY not found." });
            }
            resultText = await callOpenRouterAPI(prompt, apiKey, model);

        } else {
            return res.status(400).json({ error: "Invalid service specified." });
        }
        
        return res.status(200).json({ text: resultText });

    } catch (error) {
        console.error(`Error in service '${service}':`, error.message);
        return res.status(500).json({ error: error.message });
    }
}
