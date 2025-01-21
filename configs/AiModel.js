const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Write a script to generate 30 seconds video on topic : Interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and ContentText as field"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n    {\n        \"imagePrompt\": \"A bustling marketplace in ancient Babylon, with merchants selling spices, textiles, and pottery. The ziggurat towers in the background, rendered in realistic style with warm, golden hour lighting.\",\n        \"ContentText\": \"Thousands of years ago, in the heart of Mesopotamia, the city of Babylon thrived.\"\n    },\n  {\n        \"imagePrompt\":\"Close up view of a clay tablet with cuneiform writing on it. Details are crisp and the texture of the clay is palpable. Lighting simulates a study lamp effect, with realistic shadows. \",\n         \"ContentText\":\"Here, a system of writing was invented, called cuneiform. They pressed wedge shaped marks onto clay tablets.\"\n    },\n   {\n        \"imagePrompt\": \"Realistic depiction of a Babylonian scribe carefully inscribing cuneiform onto a wet clay tablet. He is illuminated by a single light source with realistic falloff. The setting should be the corner of a modest workroom with some clay jars around him.\",\n        \"ContentText\": \"These writings documented laws, trade, and even stories, preserving their history.\"\n   },\n    {\n        \"imagePrompt\":\"A wide shot view of the legendary Hanging Gardens of Babylon, with lush greenery cascading down terraced structures. The colors are vibrant and realistic, bathed in warm sunlight, with water features visible. Rendered in realistic style with many details.\",\n        \"ContentText\":\"It was believed they built immense wonders, like the famed Hanging Gardens, a magnificent feat of engineering.\"\n    },\n    {\n        \"imagePrompt\":\"Realistic depiction of a map, in old, parchment style, with an overlay of the fertile crescent region of Mesopotamia. The map is partially unfurled, with a rolled edge on one side, and shows rivers and cities in detail.\",\n        \"ContentText\":\"Babylonians shaped the cradle of civilization, laying the foundation for laws, science, and mathematics.\"\n    },\n     {\n        \"imagePrompt\": \"A detailed shot of the Ishtar Gate, with vibrant blue tiles and intricate animal reliefs. The scene is rendered in a realistic style, capturing the details and colors accurately and the grandeur of the architecture.\",\n        \"ContentText\": \"Their grand structures, like the Ishtar Gate, still inspire awe.\"\n    },\n   {\n         \"imagePrompt\": \"A time-lapse effect of the sun setting over the ruins of Babylon with crumbling walls and the remnants of a ziggurat. Rendered in a realistic style, showing the effects of time and nature on stone structures, with a somber mood and golden hour lighting.\",\n         \"ContentText\": \"Though time has taken its toll, the legacy of Babylon remains a fascinating and important part of human history.\"\n    }\n\n]\n```\n"},
          ],
        },
      ],
    });
  
   