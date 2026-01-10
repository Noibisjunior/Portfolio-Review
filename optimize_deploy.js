const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

// Access your API key
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("Error: GEMINI_API_KEY is not set. Please set it in your terminal.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
// Using 1.5 Flash for speed
const model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" });

async function generateInfrastructure() {
  console.log("Asking Gemini to architect your deployment...");

  // We read your package.json to give the AI context
  const packageJson = fs.readFileSync("package.json", "utf8");

  
  const prompt = `
    I have a React Single Page Application (Create React App) with this package.json:
    ${packageJson}

    I need to deploy this to Google Cloud Run. Please write a highly optimized 'Dockerfile'.
    
    Requirements for the Dockerfile:
    1. Use a Multi-stage build.
    2. Stage 1: Build the React app using Node (run 'npm run build').
    3. Stage 2: Serve the 'build' folder using 'nginx:alpine' (this is crucial for performance).
    4. COPY a custom 'nginx.conf' to handle client-side routing (try_files $uri /index.html).
    5. Expose port 8080 (required by Cloud Run).
    
    Output ONLY the raw content of the Dockerfile. Do not include markdown formatting or backticks.
  `;

  const result = await model.generateContent(prompt);
  const dockerfileContent = result.response.text().replace(/```dockerfile|```/g, "").trim();

  // Save the Dockerfile
  fs.writeFileSync("Dockerfile", dockerfileContent);
  console.log("Dockerfile generated successfully!");

  const nginxPrompt = `
    Generate a minimal, high-performance 'nginx.conf' file for a React SPA running in Docker on Google Cloud Run.
    - It must listen on port 8080.
    - It must serve files from /usr/share/nginx/html.
    - It must include 'try_files $uri $uri/ /index.html;' to fix React Router 404 errors.
    - Output ONLY the raw content of the nginx.conf. No markdown.
  `;
  
  const nginxResult = await model.generateContent(nginxPrompt);
  const nginxContent = nginxResult.response.text().replace(/```nginx|```/g, "").trim();
  
  fs.writeFileSync("nginx.conf", nginxContent);
  console.log("nginx.conf generated successfully!");
}

generateInfrastructure();


//$env:GEMINI_API_KEY="AIzaSyDi8YPkCTmbareg4v4EkDwL0Bbxa1p0oN8"
//  https://portfolio-v2-1093096103222.us-central1.run.app