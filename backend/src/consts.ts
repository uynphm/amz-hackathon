import { AudioConfiguration, TextConfiguration, InferenceConfig } from "./types";

export const DefaultInferenceConfiguration: InferenceConfig = {
    maxTokens: 1024,
    topP: 0.9,
    temperature: 0.7,
};

export const DefaultAudioInputConfiguration: AudioConfiguration = {
    audioType: "SPEECH",
    encoding: "base64",
    mediaType: "audio/lpcm",
    sampleRateHertz: 16000,
    sampleSizeBits: 16,
    channelCount: 1,
};

export const DefaultAudioOutputConfiguration: AudioConfiguration = {
    ...DefaultAudioInputConfiguration,
    sampleRateHertz: 24000,
    voiceId: "tiffany",
};

export const DefaultTextConfiguration: TextConfiguration = {
    mediaType: "text/plain",
};

export const DefaultSystemPrompt = "You are a friend. The user and you will engage in a spoken " +
    "dialog exchanging the transcripts of a natural real-time conversation. Keep your responses short, " +
    "generally two or three sentences for chatty scenarios.";

export const ExtractionToolSchema = JSON.stringify({
    "type": "object",
    "properties": {
        "extracted_data": {
            "type": "object",
            "description": "The structured JSON data extracted from the voice input.",
            "properties": {
                "intent": { "type": "string" },
                "entities": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "name": { "type": "string" },
                            "value": { "type": "string" },
                            "type": { "type": "string" }
                        }
                    }
                },
                "confidence": { "type": "number" }
            }
        }
    },
    "required": ["extracted_data"]
});
