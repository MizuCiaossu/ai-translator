// File: api/translate.js

// --- CÁC HÀM GỌI API CHO TỪNG NỀN TẢNG ---

async function callGroqAPI(prompt, apiKey) {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            messages: [{ role: "user", content: prompt }],
            model: "llama3-8b-8192",
        }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || `Groq API call failed`);
    return data.choices[0].message.content.trim();
}

async function callGeminiAPI(prompt, apiKey, model) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || `Gemini API call failed`);
    return data.candidates[0].content.parts[0].text.trim();
}

// HÀM MỚI: Gọi API của OpenRouter
async function callOpenRouterAPI(prompt, apiKey, model) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: model, // Sử dụng model được gửi từ frontend
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

    const { prompt, service, model } = req.body;

    if (!prompt || !service) {
        return res.status(400).json({ error: "Bad request: 'prompt' and 'service' are required." });
    }

    try {
        let resultText;
        
        if (service === 'groq_translate') {
            const apiKey = process.env.GROQ_API_KEY;
            if (!apiKey) return res.status(500).json({ error: "Server config error: GROQ_API_KEY not found." });
            resultText = await callGroqAPI(prompt, apiKey);

        } else if (service === 'gemini_analyze') {
            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) return res.status(500).json({ error: "Server config error: GEMINI_API_KEY not found." });
            resultText = await callGeminiAPI(prompt, apiKey, model);
        
        // BỔ SUNG: Logic cho OpenRouter
        } else if (service === 'openrouter_translate') {
            const apiKey = process.env.OPENROUTER_API_KEY;
            if (!apiKey) return res.status(500).json({ error: "Server config error: OPENROUTER_API_KEY not found." });
            if (!model) return res.status(400).json({ error: "Bad request: 'model' is required for OpenRouter." });
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
