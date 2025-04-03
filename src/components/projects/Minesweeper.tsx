import React from 'react';

const Minesweeper: React.FC = () => {
  // For now, you can embed an iframe or a simplified demo.
  return (
    <div data-testid="minesweeper-preview" className="p-4 border rounded">
      <h2 className="text-xl font-bold">React Minesweeper</h2>
      <iframe
        src="https://master.d2h1ss9oz1hikk.amplifyapp.com/"
        title="Minesweeper Demo"
        className="w-full h-[600px]"
        frameBorder="0"
      />
      <p className="mt-2 text-sm text-gray-600">
        Explore the demo above to see the Minesweeper game in action.
      </p>
    </div>
  );
};

export default Minesweeper;
