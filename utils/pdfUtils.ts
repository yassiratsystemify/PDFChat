/**
 * Sends the PDF file to the webhook and processes the response.
 */
export const extractTextFromPdf = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('https://n8n.systemify.net/webhook/d7728614-a34f-4eaf-95e2-7ae6bc1d28ea', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();
    return data.text || 'No text content available';
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw new Error('Failed to process PDF. Please try again.');
  }
};