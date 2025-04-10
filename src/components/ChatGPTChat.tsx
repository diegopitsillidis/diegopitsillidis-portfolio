import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface DocumentData {
  name: string;
  text: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatGPTChat: React.FC = () => {
  const [query, setQuery] = useState('');
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // Load documents on mount
  useEffect(() => {
    fetch('/documents/documents.json')
      .then((res) => res.json())
      .then((data: DocumentData[]) => setDocuments(data))
      .catch((err) => console.error('Error loading documents:', err));
  }, []);

  // A simple retrieval function that finds documents containing keywords from the query
  const retrieveContext = (q: string): string => {
    const lowerQ = q.toLowerCase();
    const relevantDocs = documents.filter(doc =>
      doc.text.toLowerCase().includes(lowerQ)
    );
    return relevantDocs.map(doc => `From ${doc.name}: ${doc.text}`).join('\n\n');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Append user message to conversation history
    setConversation(prev => [...prev, { role: 'user', content: query }]);

    // Retrieve context and construct the prompt
    const retrievedContext = retrieveContext(query);
    const prompt = `Use the following context to answer the question:\n\n${retrievedContext}\n\nQuestion: ${query}\nAnswer:`;

    try {
      const response = await axios.post(
        'https://wpa4vo72aituzuijtfptzmjkoi0fqozs.lambda-url.eu-central-1.on.aws/',
        {
          query: query, // now included in payload
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt }
          ],
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      ) as { data: { choices: { message: { content: string } }[] } };

      const assistantReply = response.data.choices[0].message.content;
      // Append assistant message to conversation
      setConversation(prev => [...prev, { role: 'assistant', content: assistantReply }]);
    } catch (error) {
      console.error(error);
      setConversation(prev => [
        ...prev,
        { role: 'assistant', content: 'An error occurred while fetching the answer.' }
      ]);
    } finally {
      setLoading(false);
      setQuery('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="h-96 border rounded-lg p-4 overflow-y-auto bg-gray-50">
        {conversation.map((msg, index) => {
          const isUser = msg.role === 'user';
          const bubbleClasses = isUser
            ? 'bg-green-200 text-gray-900'
            : 'bg-white text-gray-900';
          return (
            <div key={index} className={`mb-3 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`${bubbleClasses} px-4 py-2 max-w-md rounded-md shadow`} style={{ whiteSpace: 'pre-wrap' }}>
                {msg.content}
              </div>
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          className="w-full border p-2 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your question here..."
          style={{ resize: 'none' }}
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 rounded-md font-semibold text-white transition-colors ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ChatGPTChat;
