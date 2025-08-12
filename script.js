document.addEventListener('DOMContentLoaded', () => {

    const PROMPTS = {
        translate: {
            "Tiếng Anh": "Translate the following text to English, providing only the translated text and nothing else:",
            "Tiếng Tây Ban Nha": "Translate the following text to Spanish, providing only the translated text and nothing else:",
            "Tiếng Bồ Đào Nha (Brazil)": "Translate the following text to Brazilian Portuguese, providing only the translated text and nothing else:",
            "Tiếng Filipino": "Translate the following text to Filipino, providing only the translated text and nothing else:",
            "Tiếng Indonesia": "Translate the following text to Indonesian, providing only the translated text and nothing else:",
            "Tiếng Thái Lan": "Translate the following text to Thai, providing only the translated text and nothing else:",
            "Tiếng Myanmar": "Translate the following text to Burmese, providing only the translated text and nothing else:",
            "Tiếng Nhật": "Translate the following text to Japanese, providing only the translated text and nothing else:",
            "Tiếng Sinhala": "Translate the following text to Sinhala, providing only the translated text and nothing else:",
            "Tiếng Hindi": "Translate the following text to Hindi, providing only the translated text and nothing else:",
            "Tiếng Nepal": "Translate the following text to Nepali, providing only the translated text and nothing else:",
        },
        analyze: "Summarize the key intent of the following customer message in a few bullet points. Focus on what the customer wants (e.g., refund, information, complaint). Provide only the bullet points."
    };

    const modelSelect = document.getElementById('modelSelect');
    const languageSelect = document.getElementById('languageSelect');
    const sourceText = document.getElementById('sourceText');
    const translateBtn = document.getElementById('translateBtn');
    const translatedText = document.getElementById('translatedText');
    const customerMessage = document.getElementById('customerMessage');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const analysisResult = document.getElementById('analysisResult');
    const copyButtons = document.querySelectorAll('.copy-button');

    async function callApi(payload) {
        try {
            const response = await fetch('/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'An unknown error occurred.');
            }
            return data.text;
        } catch (error) {
            console.error("API Call Error:", error);
            return `Error: ${error.message}`;
        }
    }

    async function handleTranslate() {
        if (!sourceText.value) {
            alert("Please enter text to translate.");
            return;
        }

        const promptTemplate = PROMPTS.translate[languageSelect.value];
        const fullPrompt = `${promptTemplate}\n\n"${sourceText.value}"`;

        translateBtn.textContent = 'Translating...';
        translateBtn.disabled = true;
        translatedText.value = 'Waiting for response...';

        const result = await callApi({
            prompt: fullPrompt,
            model: modelSelect.value
        });
        translatedText.value = result;

        translateBtn.textContent = 'Translate';
        translateBtn.disabled = false;
    }

    async function handleAnalyze() {
        if (!customerMessage.value) {
            alert("Please enter a customer message.");
            return;
        }
        const fullPrompt = `${PROMPTS.analyze}\n\nCustomer Message:\n"${customerMessage.value}"`;
        
        analyzeBtn.textContent = 'Analyzing...';
        analyzeBtn.disabled = true;
        analysisResult.value = 'Waiting for response...';

        const result = await callApi({
            prompt: fullPrompt,
            model: modelSelect.value
        });
        analysisResult.value = result;

        analyzeBtn.textContent = 'Analyze Intent';
        analyzeBtn.disabled = false;
    }

    function handleCopy(event) {
        const targetId = event.target.dataset.target;
        const textToCopy = document.getElementById(targetId).value;
        if (!textToCopy) return;
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = event.target.textContent;
            event.target.textContent = 'Copied!';
            setTimeout(() => { event.target.textContent = originalText; }, 1500);
        });
    }

    function init() {
        const languages = Object.keys(PROMPTS.translate);
        languages.forEach(lang => {
            const option = document.createElement('option');
            option.value = lang;
            option.textContent = lang;
            languageSelect.appendChild(option);
        });
        
        translateBtn.addEventListener('click', handleTranslate);
        analyzeBtn.addEventListener('click', handleAnalyze);
        copyButtons.forEach(button => button.addEventListener('click', handleCopy));
    }

    init();
});