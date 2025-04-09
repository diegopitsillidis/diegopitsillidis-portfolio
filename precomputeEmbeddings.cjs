//run this command to run: node precomputeEmbeddings.cjs
const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config(); // Make sure you have a .env file with your API key

// The OpenAI Embedding API endpoint and model
const EMBEDDING_MODEL = 'text-embedding-ada-002';
const OPENAI_EMBEDDING_URL = 'https://api.openai.com/v1/embeddings';

// Function to get an embedding for a given text
async function getEmbedding(text) {
  try {
    const response = await axios.post(
      OPENAI_EMBEDDING_URL,
      { input: text, model: EMBEDDING_MODEL },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );
    // The API returns an embedding in response.data.data[0].embedding
    return response.data.data[0].embedding;
  } catch (error) {
    console.error(`Error retrieving embedding for text: ${text.substring(0, 30)}...`, error.response ? error.response.data : error.message);
    return null;
  }
}

// Main function to process documents
async function precomputeEmbeddings() {
  // Path to your original documents file
  const inputPath = path.join(__dirname, 'public/documents/documents.json');
  // Path to the new file with embeddings
  const outputPath = path.join(__dirname, 'public/documents/documents_with_embeddings.json');

  // Load documents
  const rawData = fs.readFileSync(inputPath, 'utf8');
  let documents = JSON.parse(rawData);

  // Process each document
  for (let doc of documents) {
    console.log(`Processing ${doc.name}...`);
    const embedding = await getEmbedding(doc.text);
    if (embedding) {
      doc.embedding = embedding;
    } else {
      console.error(`Failed to get embedding for ${doc.name}`);
    }
  }

  // Write out updated documents to a new file
  fs.writeFileSync(outputPath, JSON.stringify(documents, null, 2));
  console.log(`Embeddings computed and saved to ${outputPath}`);
}

// Run the precompute function
precomputeEmbeddings().catch((error) => {
  console.error("An error occurred during precomputation:", error);
});
