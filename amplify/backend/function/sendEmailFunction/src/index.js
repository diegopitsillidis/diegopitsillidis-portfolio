/* Amplify Params - DO NOT EDIT
    ENV
    REGION
Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk');

// Initialize SES with the provided region (or default)
const ses = new AWS.SES({ region: process.env.AWS_REGION || 'eu-central-1' });

// Define common CORS headers if needed
const corsHeaders = {
  // 'Access-Control-Allow-Origin': '*',
  // 'Access-Control-Allow-Methods': 'POST, OPTIONS',
  // 'Access-Control-Allow-Headers': 'Content-Type'
};

exports.handler = async (event) => {
  // Handle preflight OPTIONS request for CORS.
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  // Ensure event.body is defined
  if (!event.body) {
    console.error('No request body provided.');
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'No request body provided.' })
    };
  }
  
  let data;
  try {
    data = JSON.parse(event.body);
  } catch (parseError) {
    console.error('Error parsing request body:', parseError);
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Invalid JSON format in request body.' })
    };
  }

  const { name, email, message } = data;
  if (!name || !email || !message) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Missing required fields: name, email, and message are required.' })
    };
  }

  // Prepare the email parameters.
  console.log('A', process.env.SENDER_EMAIL)
  console.log('B', process.env.RECIPIENT_EMAIL)
  const params = {
    Source: process.env.SENDER_EMAIL,
    Destination: {
      ToAddresses: [process.env.RECIPIENT_EMAIL],
    },
    Message: {
      Subject: { Data: `Portfolio Contact: Message from ${name}` },
      Body: {
        Text: {
          Data: `You have received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        }
      }
    }
  };

  try {
    // Send the email using SES.
    await ses.sendEmail(params).promise();
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ success: true, message: 'Email sent successfully.' })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Error sending email.' })
    };
  }
};
