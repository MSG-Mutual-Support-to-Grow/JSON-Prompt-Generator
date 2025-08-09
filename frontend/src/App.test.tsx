import { render, screen } from '@testing-library/react';
import App from './App';

test('renders text to json converter', () => {
  render(<App />);
  const titleElement = screen.getByText(/Plain Text to JSON Prompt Converter/i);
  expect(titleElement).toBeInTheDocument();
});
