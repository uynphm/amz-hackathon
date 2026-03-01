import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { NovaSonicBidirectionalStreamClient } from './client';
import { DefaultAudioInputConfiguration, DefaultSystemPrompt } from './consts';
import { Buffer } from 'node:buffer';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    // Initialize the client
    const client = new NovaSonicBidirectionalStreamClient({
        clientConfig: {
            region: process.env.AWS_REGION || 'us-east-1',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
            }
        }
    });

    // Create a new session
    const session = client.createStreamSession();
    const sessionId = session.getSessionId();

    // Register handlers for extraction results
    let extractedResult: any = null;
    session.onEvent('toolUse', (data) => {
        if (data.toolName === 'InformationExtractionTool') {
            console.log('EXTRACTED JSON:', data.input);
            extractedResult = data.input;
        }
    });

    try {
        // Start the bidirectional stream
        const streamPromise = client.initiateBidirectionalStreaming(sessionId);

        // Sequence of setup events
        await session.setupSessionAndPromptStart();
        await session.setupSystemPrompt(undefined, DefaultSystemPrompt);
        await session.setupStartAudio(DefaultAudioInputConfiguration);

        // In a real scenario, you would stream audio chunks from a WebSocket or S3
        // For this example, we'll just demonstrate the setup and close
        // await session.streamAudio(someAudioBuffer);

        // End the audio content and prompt
        await session.endAudioContent();
        await session.endPrompt();

        // Wait for the stream to finish processing
        await streamPromise;

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                message: 'Voice processing completed',
                sessionId: sessionId,
                extractedResult: extractedResult,
                status: 'Success'
            }),
        };
    } catch (error) {
        console.error('Error processing voice:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error', message: (error as Error).message }),
        };
    }
};
