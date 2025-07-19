async function sendMessage() {
  const userInput = document.getElementById('userInput').value.trim();
  const chatBox = document.getElementById('chatBox');

  if (!userInput) return; // Ignore empty input

  // Add user message to chat
  const userMessage = document.createElement('div');
  userMessage.className = 'message user-message';
  userMessage.textContent = userInput;
  chatBox.appendChild(userMessage);

  // Clear input
  document.getElementById('userInput').value = '';

  // Scroll to bottom
  chatBox.scrollTop = chatBox.scrollHeight;

  // Add loading message
  const loadingMessage = document.createElement('div');
  loadingMessage.className = 'message ai-message';
  loadingMessage.textContent = 'Thinking...';
  chatBox.appendChild(loadingMessage);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    // Call DeepSeek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer REPLACE_WITH_YOUR_ACTUAL_DEEPSEEK_API_KEY' // Replace with your valid DeepSeek API key
      },
      body: JSON.stringify({
        model: 'deepseek-r1', // Use DeepSeek R1 model (confirm availability in DeepSeek docs)
        messages: [
          { role: 'system', content: 'You are a helpful and advanced AI assistant.' },
          { role: 'user', content: userInput }
        ],
        max_tokens: 100, // Limit response length
        temperature: 0.7 // Control randomness
      })
    });

    // Check if response is OK
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('API Response:', data); // Debug: Log the full response

    // Remove loading message
    chatBox.removeChild(loadingMessage);

    // Handle API errors or unexpected response
    if (data.error) {
      throw new Error(`API Error: ${data.error.message || data.error}`);
    }
    let aiContent = '';
    if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
      aiContent = data.choices[0].message.content.trim();
    } else if (data.choices && data.choices[0] && data.choices[0].text) {
      aiContent = data.choices[0].text.trim();
    } else {
      aiContent = 'Sorry, I could not generate a response. Please check your API key and try again.';
    }

    // Add AI response
    const aiMessage = document.createElement('div');
    aiMessage.className = 'message ai-message';
    aiMessage.textContent = aiContent;
    chatBox.appendChild(aiMessage);
  } catch (error) {
    // Remove loading message
    chatBox.removeChild(loadingMessage);

    // Show detailed error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'message ai-message';
    errorMessage.textContent = `Error: ${error.message}. Please check your API key or try again later.`;
    chatBox.appendChild(errorMessage);

    // Debug: Log error to console
    console.error('Error details:', error);
  }

  // Scroll to bottom
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Allow sending message with Enter key
document.getElementById('userInput').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});