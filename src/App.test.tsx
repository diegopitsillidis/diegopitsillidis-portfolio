import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const linkElement = screen.getByText(/Diego Pitsillidis/i);
  expect(linkElement).toBeInTheDocument();
});