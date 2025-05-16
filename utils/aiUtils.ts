/**
 * Sends user messages to the webhook and processes AI responses.
 */
export const simulateAiResponse = async (
  userMessage: string,
  documentText: string,
  sessionId: string
): Promise<string> => {
  try {
    const response = await fetch('https://n8n.systemify.net/webhook/c8a5cd38-6ec5-402d-bc77-a15b4e54402e', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        context: documentText,
        sessionId: sessionId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();
    return data.output || 'I apologize, but I could not generate a response. Please try again.';
  } catch (error) {
    console.error('Error getting AI response:', error);
    throw error;
  }
};