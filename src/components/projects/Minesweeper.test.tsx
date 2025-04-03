import { render, screen } from '@testing-library/react';
import Minesweeper from './Minesweeper';

describe('Minesweeper Component', () => {
  test('renders Minesweeper game preview', () => {
    render(<Minesweeper />);
    const previewElement = screen.getByTestId('minesweeper-preview');
    expect(previewElement).toBeInTheDocument();
  });
});
