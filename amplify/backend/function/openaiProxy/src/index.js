const https = require('https');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

/**
 * Computes cosine similarity between two vectors.
 * @param {number[]} a 
 * @param {number[]} b 
 * @returns {number}
 */
function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] ** 2;
    normB += b[i] ** 2;
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Retrieve the embedding for a given text from OpenAI's Embedding API.
 * @param {string} text 
 * @returns {Promise<number[]>}
 */
async function getEmbedding(text) {
  const response = await axios.post(
    'https://api.openai.com/v1/embeddings',
    {
      input: text,
      model: 'text-embedding-ada-002'
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data.data[0].embedding;
}

exports.handler = async (event) => {
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        //'Access-Control-Allow-Origin': '*',
        //'Access-Control-Allow-Methods': 'POST, OPTIONS',
        //'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: ''
    };
  }

  try {
    // Parse the incoming request; we expect a JSON with a "query" field.
    const { query } = JSON.parse(event.body);
    if (!query) {
      throw new Error("Query not provided");
    }

    // Get the embedding for the query using OpenAI's embedding API.
    const queryEmbedding = await getEmbedding(query);

    // Load precomputed documents (with embeddings) from a bundled file.
    // Make sure documents.json is included in your Lambda package.
    const docsPath = path.join(__dirname, 'documents_with_embeddings.json');
    const docsData = fs.readFileSync(docsPath, 'utf8');
    console.log('Loaded documents:', docsData.substring(0, 100));
    const documents = JSON.parse(docsData);

    // Compute cosine similarity for each document.
    documents.forEach(doc => {
      if (doc.embedding && Array.isArray(doc.embedding)) {
        doc.similarity = cosineSimilarity(queryEmbedding, doc.embedding);
      } else {
        doc.similarity = 0;
      }
    });

    // Sort documents by similarity (highest first) and take the top 3.
    const topDocs = documents.sort((a, b) => b.similarity - a.similarity).slice(0, 3);
    const context = topDocs.map(doc => `From ${doc.name}: ${doc.text}`).join('\n\n');

    // Construct a prompt that includes the context and the user's query.
    const prompt = `Use the following context to answer the question:\n\n${context}\n\nQuestion: ${query}\nAnswer:`;

    // Prepare the payload for the OpenAI Chat Completion API.
    const chatPayload = JSON.stringify({
      model: "gpt-4o-mini", // or "gpt-4" if applicable
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7
    });

    // Set up options to call the ChatGPT endpoint.
    const options = {
      hostname: 'api.openai.com',
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    };

    // Make the HTTPS request to the ChatGPT API.
    const chatResponse = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            body: data
          });
        });
      });
      req.on('error', reject);
      req.write(chatPayload);
      req.end();
    });

    // Return the ChatGPT response with CORS headers.
    return {
      statusCode: chatResponse.statusCode,
      headers: {
        //'Access-Control-Allow-Origin': '*',
        //'Access-Control-Allow-Methods': 'POST, OPTIONS',
        //'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: chatResponse.body
    };

  } catch (error) {
    console.error('Lambda error:', error);
    return {
      statusCode: 500,
      headers: {
        //'Access-Control-Allow-Origin': '*',
        //'Access-Control-Allow-Methods': 'POST, OPTIONS',
        //'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: JSON.stringify({ error: 'Error processing your request' })
    };
  }
};
