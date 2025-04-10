import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you could integrate with a form service or backend API.
    console.log({ name, email, message });
    setStatus('Thank you for contacting me! I will get back to you shortly.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white pt-8 pb-16">
      <div className="max-w-4xl mx-auto p-8 ">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Me</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-700 font-semibold mb-1">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message..."
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded font-bold transition-colors"
        >
          Send Message
        </button>
      </form>
      {status && (
        <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded text-green-700">
          {status}
        </div>
      )}
      <div className="mt-8 text-center text-gray-700">
        <p>Or get in touch directly:</p>
        <p>
          Email: <a className="text-blue-600 hover:underline" href="mailto:diego.pitsillides@gmail.com">diego.pitsillides@gmail.com</a>
        </p>
      </div>
    </div>
    </div>
    
  );
};

export default Contact;
