const https = require('https');

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("❌ Error: GEMINI_API_KEY is not set.");
    process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

console.log("🔍 Querying Google API for active 2026 models...");

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            
            if (json.error) {
                console.error("❌ API Error:", json.error.message);
                return;
            }

            if (!json.models) {
                console.log("❌ No models found. Check your API key permissions.");
                return;
            }

            console.log("\n✅ AVAILABLE MODELS (Copy one of these names):");
            console.log("---------------------------------------------");
            
            // Filter for only "generateContent" supported models
            const validModels = json.models.filter(m => 
                m.supportedGenerationMethods.includes("generateContent")
            );

            validModels.forEach(model => {
                // We strip 'models/' from the start to give you the clean name
                console.log(`🌟 ${model.name.replace("models/", "")}`);
            });
            console.log("---------------------------------------------");

        } catch (e) {
            console.error("❌ Failed to parse response:", e.message);
        }
    });

}).on('error', (err) => {
    console.error("❌ Network Error:", err.message);
});