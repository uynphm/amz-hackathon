import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Enable CORS for the extension
        },
        body: JSON.stringify({
            message: 'SkyVoice Backend: Voice processing signal received.',
            status: 'Ready',
            timestamp: new Date().toISOString(),
        }),
    };
};
