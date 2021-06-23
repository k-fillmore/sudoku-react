import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Sudoku/);
  expect(linkElement).toBeInTheDocument();
});

test('Button text displayed', () => {
  render(<App />);

  const newPuzzleButtonElement = screen.getByText(/New Puzzle/)
  const solutionButtonElement = screen.getByText(/Solution/)
  const resetButtonElement = screen.getByText(/Reset/)

  expect(newPuzzleButtonElement).toBeInTheDocument();
  expect(solutionButtonElement).toBeInTheDocument();
  expect(resetButtonElement).toBeInTheDocument();
})
