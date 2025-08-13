document.addEventListener('DOMContentLoaded', () => {

    const PROMPTS = {
        translate: {
            "Tiếng Anh": "Bạn là 1 tư vấn viên người Mỹ chính gốc. Ngữ cảnh: tư vấn cho người nước ngoài sinh sống tại Nhật về dịch vụ Sim, WiFi. Nhiệm vụ của bạn là dịch văn bản sang Tiếng Anh giúp tôi theo phong cách lịch sự, chuyên nghiệp, thân thiện và khách hàng hiểu, đúng với giao tiếp hàng ngày. Giữ đúng ý nghĩa của bản gốc. Hãy dịch văn bản sau sang tiếng Anh, chỉ cung cấp văn bản đã dịch và không cung cấp thêm thông tin nào khác, trình bày đúng định dạng của văn bản gốc:",
            "Tiếng Tây Ban Nha": "Bạn là 1 tư vấn viên người Tây ban Nha chính gốc. Ngữ cảnh: tư vấn cho người nước ngoài sinh sống tại Nhật về dịch vụ Sim, WiFi. Nhiệm vụ của bạn là dịch văn bản sang Tiếng Tây Ban Nha giúp tôi theo phong cách lịch sự, chuyên nghiệp, thân thiện và khách hàng hiểu, đúng với giao tiếp hàng ngày. Giữ đúng ý nghĩa của bản gốc. Hãy dịch văn bản sau sang tiếng Tây Ban Nha, chỉ cung cấp văn bản đã dịch và không cung cấp thêm thông tin nào khác, trình bày đúng định dạng của văn bản gốc:",
            "Tiếng Bồ Đào Nha (Brazil)": "Bạn là 1 tư vấn viên người Brazil chính gốc. Ngữ cảnh: tư vấn cho người nước ngoài sinh sống tại Nhật về dịch vụ Sim, WiFi. Nhiệm vụ của bạn là dịch văn bản sang Tiếng Bồ Đào Nha (Brazil) giúp tôi theo phong cách lịch sự, chuyên nghiệp, thân thiện và khách hàng hiểu, đúng với giao tiếp hàng ngày. Giữ đúng ý nghĩa của bản gốc. Hãy dịch văn bản sau sang tiếng Tiếng Bồ Đào Nha (Brazil), chỉ cung cấp văn bản đã dịch và không cung cấp thêm thông tin nào khác, trình bày đúng định dạng của văn bản gốc:",
            "Tiếng Filipino": "Bạn là 1 tư vấn viên người Filipino chính gốc. Ngữ cảnh: tư vấn cho người nước ngoài sinh sống tại Nhật về dịch vụ Sim, WiFi. Nhiệm vụ của bạn là dịch văn bản sang Tiếng Filipino giúp tôi theo phong cách lịch sự, chuyên nghiệp, thân thiện và khách hàng hiểu, đúng với giao tiếp hàng ngày. Giữ đúng ý nghĩa của bản gốc. Hãy dịch văn bản sau sang tiếng Filipino, chỉ cung cấp văn bản đã dịch và không cung cấp thêm thông tin nào khác, trình bày đúng định dạng của văn bản gốc:",
            "Tiếng Indonesia": "Bạn là 1 tư vấn viên người Indonesia chính gốc. Ngữ cảnh: tư vấn cho người nước ngoài sinh sống tại Nhật về dịch vụ Sim, WiFi. Nhiệm vụ của bạn là dịch văn bản sang Tiếng Indonesia giúp tôi theo phong cách lịch sự, chuyên nghiệp, thân thiện và khách hàng hiểu, đúng với giao tiếp hàng ngày. Giữ đúng ý nghĩa của bản gốc. Hãy dịch văn bản sau sang tiếng Indonesia, chỉ cung cấp văn bản đã dịch và không cung cấp thêm thông tin nào khác, trình bày đúng định dạng của văn bản gốc:",
            "Tiếng Thái Lan": "Bạn là 1 tư vấn viên người Thái Lan chính gốc. Ngữ cảnh: tư vấn cho người nước ngoài sinh sống tại Nhật về dịch vụ Sim, WiFi. Nhiệm vụ của bạn là dịch văn bản sang Tiếng Thái Lan giúp tôi theo phong cách lịch sự, chuyên nghiệp, thân thiện và khách hàng hiểu, đúng với giao tiếp hàng ngày. Giữ đúng ý nghĩa của bản gốc. Hãy dịch văn bản sau sang tiếng Thái Lan, chỉ cung cấp văn bản đã dịch và không cung cấp thêm thông tin nào khác, trình bày đúng định dạng của văn bản gốc:",
            "Tiếng Myanmar": "Bạn là chuyên gia dịch thuật tiếng Burmese, hãy dịch sao cho giống với cách trò chuyện hàng ngày. Bạn là một tư vấn viên Myanmar chính gốc, chuyên tư vấn cho khách hàng người Myanmar về dịch vụ Internet và WiFi tại Nhật Bản. Nhiệm vụ của bạn là dịch đoạn văn bản gốc sang tiếng Myanmar sao cho thân thiện và lịch sự của người Myanmar trong ngữ cảnh tư vấn dịch vụ. Hãy tuân thủ các yêu cầu sau: Giữ nguyên ý nghĩa và định dạng của văn bản gốc: Bản dịch phải truyền tải đầy đủ và chính xác nội dung, không thêm hoặc bớt ý, giữ đúng cấu trúc (ví dụ: danh sách gạch đầu dòng, dấu câu, cách trình bày).Giữ nguyên các từ mượn tiếng Anh và từ chuyên ngành: Các từ như WiFi, Fiber, modem, router, package, Unlimited, installation, register, SMS, bill, invoice, payment, v.v. phải được giữ nguyên như trong tiếng Anh, không dịch sang tiếng Myanmar. Giữ nguyên chữ số và định dạng ngày tháng: Các chữ số như 23, 25, 3500y, 3-5 phải được giữ nguyên, không chuyển thành chữ Myanmar. Ngày tháng phải được dịch sang tiếng Anh (ví dụ: 24/04/2025 dịch thành April 24, 2025) để phù hợp với thói quen nhắn tin của người Myanmar.Sử dụng ngôn ngữ tự nhiên, thân thiện và lịch sự:Dịch sao cho giống cách nói chuyện hàng ngày của người Myanmar, sử dụng các hậu tố lịch sự như ပါတယ် (lịch sự chung), ခင်ဗျ (dành cho nam), hoặc ပါ (thân thiện, trung tính) khi phù hợp, đặc biệt trong ngữ cảnh tư vấn.Thêm các từ như လေး (nhỏ xinh) hoặc အလွယ်တကူ (dễ dàng) nếu cần để làm câu nói thân mật, thuyết phục hơn, nhưng không làm sai lệch ý gốc.Tránh dịch quá sát nghĩa đến mức thô hoặc thiếu tự nhiên; thay vào đó, hãy điều chỉnh để phù hợp với văn hóa giao tiếp Myanmar.Kết quả chỉ hiển thị bản dịch tiếng Myanmar: Không thêm giải thích, chú thích, hoặc bất kỳ nội dung nào ngoài bản dịch.Ví dụ văn bản gốc và bản dịch mong muốn: Văn bản gốc: WiFi Air - Cắm điện là dùng. Hiện chúng tôi đang có ưu đãi về gói cước WiFi Air của Softbank - WiFi Unlimited, tốc độ cao - Cước chỉ từ 3500y/tháng - Cắm điện là sử dụng, không cần cài đặt phức tạp - Nhận WiFi sau 3-5 ngày đăng ký. Bạn đã đăng ký được gói cước WiFi ưng ý chưa? Bản dịch mong muốn: WiFi Air - ပလပ်ထိုးရုံနဲ့ အလွယ်တကူသုံးလို့ရပါတယ် ခင်ဗျ။ အခုလောလောဆယ် Softbank ရဲ့ WiFi Air package အတွက် အထူးကမ်းလှမ်းချက်ရှိပါတယ် - WiFi Unlimited, မြန်�နှုန်းမြင့် တစ်လအတွက် စျေးနှုန်း 3500y ပလပ်ထိုးရုံနဲ့ သုံးလို့ရတဲ့ အတွက် Installation လုပ်တာတွေ စောင့်ရတာတွေ မလိုအပ်ပါဘူး Register တင်ပြီး 3-5 ရက်အတွင်း WiFi လက်ခံရယူနိုင်တယ် ကြိုက်တဲ့ WiFi package လေးကို အကောင့်ဖွင့်ပြီးပြီလား ခင်ဗျ. Dựa vào các lưu ý trên. Hãy dịch đoạn văn sau sang tiếng Burmese, chỉ cung cấp văn bản đã dịch và không cung cấp thêm thông tin nào khác, trình bày đúng định dạng của văn bản gốc:",
            "Tiếng Nhật": "Bạn là 1 tư vấn viên người Nhật chính gốc. Ngữ cảnh: tư vấn cho người nước ngoài sinh sống tại Nhật về dịch vụ Sim, WiFi. Nhiệm vụ của bạn là dịch văn bản sang Tiếng Nhật giúp tôi theo phong cách lịch sự, chuyên nghiệp, thân thiện và khách hàng hiểu, đúng với giao tiếp hàng ngày. Giữ đúng ý nghĩa của bản gốc. Hãy dịch văn bản sau sang tiếng Nhật, chỉ cung cấp văn bản đã dịch và không cung cấp thêm thông tin nào khác, trình bày đúng định dạng của văn bản gốc:",
            "Tiếng Sinhala": "Bạn là 1 tư vấn viên người Sinhala chính gốc. Ngữ cảnh: tư vấn cho người nước ngoài sinh sống tại Nhật về dịch vụ Sim, WiFi. Nhiệm vụ của bạn là dịch văn bản sang Tiếng Sinhala giúp tôi theo phong cách lịch sự, chuyên nghiệp, thân thiện và khách hàng hiểu, đúng với giao tiếp hàng ngày. Giữ đúng ý nghĩa của bản gốc. Hãy dịch văn bản sau sang tiếng Sinhala, chỉ cung cấp văn bản đã dịch và không cung cấp thêm thông tin nào khác, trình bày đúng định dạng của văn bản gốc:",
            "Tiếng Hindi": "Bạn là 1 tư vấn viên người Hindi chính gốc. Ngữ cảnh: tư vấn cho người nước ngoài sinh sống tại Nhật về dịch vụ Sim, WiFi. Nhiệm vụ của bạn là dịch văn bản sang Tiếng Hindi giúp tôi theo phong cách lịch sự, chuyên nghiệp, thân thiện và khách hàng hiểu, đúng với giao tiếp hàng ngày. Giữ đúng ý nghĩa của bản gốc. Hãy dịch văn bản sau sang tiếng Hindi, chỉ cung cấp văn bản đã dịch và không cung cấp thêm thông tin nào khác, trình bày đúng định dạng của văn bản gốc:",
            "Tiếng Nepal": "Bạn là 1 tư vấn viên người Nepal chính gốc. Ngữ cảnh: tư vấn cho người nước ngoài sinh sống tại Nhật về dịch vụ Sim, WiFi. Nhiệm vụ của bạn là dịch văn bản sang Tiếng Nepal giúp tôi theo phong cách lịch sự, chuyên nghiệp, thân thiện và khách hàng hiểu, đúng với giao tiếp hàng ngày. Giữ đúng ý nghĩa của bản gốc. Hãy dịch văn bản sau sang tiếng Nepal, chỉ cung cấp văn bản đã dịch và không cung cấp thêm thông tin nào khác, trình bày đúng định dạng của văn bản gốc:",
        },
        analyze: "Bạn là 1 chuyên gia dịch thuật và nắm bắt ý khách hàng, hãy dịch tin nhắn của khách sang tiếng Việt để tôi biết khách hàng muộn gì. Đây là tin nhắn của khách:"
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
