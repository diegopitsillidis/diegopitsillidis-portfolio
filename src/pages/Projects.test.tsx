import { render, screen } from '@testing-library/react';
import Projects from './Projects';

describe('Projects Page', () => {
  test('renders Projects header', () => {
    render(<Projects />);
    const headerElement = screen.getByText(/Projects/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders React Minesweeper project preview', () => {
    render(<Projects />);
    const minesweeperPreview = screen.getByTestId('minesweeper-preview');
    expect(minesweeperPreview).toBeInTheDocument();
  });
});
