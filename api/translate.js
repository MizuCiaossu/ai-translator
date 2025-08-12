// This is a Node.js function that runs on Vercel's backend.
export default async function handler(req, res) {
    // 1. Only allow POST requests
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    // 2. Get the secret API key from environment variables
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "Server configuration error: API key not found." });
    }

    // 3. Get data from the frontend request
    const { prompt, model } = req.body;
    if (!prompt || !model) {
        return res.status(400).json({ error: "Bad request: 'prompt' and 'model' are required." });
    }

    // 4. Call the actual Gemini API
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    try {
        const geminiResponse = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
            }),
        });

        const data = await geminiResponse.json();

        if (!geminiResponse.ok) {
            // Forward Gemini's error message if available
            const errorMessage = data?.error?.message || `API call failed with status: ${geminiResponse.status}`;
            throw new Error(errorMessage);
        }

        const translatedText = data.candidates[0].content.parts[0].text.trim();

        // 5. Send the successful result back to the frontend
        return res.status(200).json({ text: translatedText });

    } catch (error) {
        console.error("Error in serverless function:", error.message);
        return res.status(500).json({ error: error.message });
    }
}