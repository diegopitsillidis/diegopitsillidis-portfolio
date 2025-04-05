import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface DocumentData {
  name: string;
  text: string;
}

const ChatGPTChat: React.FC = () => {
  const [query, setQuery] = useState('');
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  //const [context, setContext] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  // Load documents on mount
  useEffect(() => {
    fetch('/documents/documents.json')
      .then((res) => res.json())
      .then((data: DocumentData[]) => setDocuments(data))
      .catch((err) => console.error('Error loading documents:', err));
  }, []);

  // A very simple retrieval function that finds docs containing keywords from the query.
  const retrieveContext = (q: string): string => {
    const lowerQ = q.toLowerCase();
    const relevantDocs = documents.filter(doc => doc.text.toLowerCase().includes(lowerQ));
    return relevantDocs.map(doc => `From ${doc.name}: ${doc.text}`).join('\n\n');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Retrieve context based on the query
    const retrievedContext = retrieveContext(query);
    // Construct a prompt that includes the context and the user query.
    const prompt = `Use the following context to answer the question:\n\n${retrievedContext}\n\nQuestion: ${query}\nAnswer:`;

    try {
      const response = await axios.post(
        //lambda function URL to get secret
        'https://eu-central-1.admin.amplifyapp.com/admin/login?appId=dw2inj1y3rth4&backendEnvironmentName=dev',
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt }
          ],
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json'
            // No 'Authorization' header is needed on the client side
          }
        }
      ) as { data: { choices: { message: { content: string } }[] } };
  
      setAnswer(response.data.choices[0].message.content);
    } catch (error) {
      console.error(error);
      setAnswer('An error occurred while fetching the answer.');
    } finally {
      setLoading(false);
    }
  };
  
// for local use only
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     // Retrieve context based on the query
//     const retrievedContext = retrieveContext(query);
//     //setContext(retrievedContext);

//     // Construct a prompt that includes the context and the user query.
//     const prompt = `Use the following context to answer the question:\n\n${retrievedContext}\n\nQuestion: ${query}\nAnswer:`;

//     try {
//       // For demonstration, we call the ChatGPT API.
//       // In a production app, you would not expose your API key in the client.
//       // Instead, use a serverless function or backend proxy.
//       const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
//       const response = await axios.post('https://api.openai.com/v1/chat/completions', {
//         model: "gpt-3.5-turbo",
//         messages: [
//           { role: "system", content: "You are a helpful assistant." },
//           { role: "user", content: prompt }
//         ],
//         temperature: 0.7
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${apiKey}`
//         }
//       }) as { data: { choices: { message: { content: string } }[] } };
//       setAnswer(response.data.choices[0].message.content);
//     } catch (error) {
//       console.error(error);
//       setAnswer('An error occurred while fetching the answer.');
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <div className="p-4 border rounded bg-white">
      <h2 className="text-xl font-bold mb-2">Chat with ChatGPT (with RAG)</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border p-2 mb-2"
          rows={4}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your question here..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {answer && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default ChatGPTChat;
