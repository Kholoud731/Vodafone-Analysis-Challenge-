
import '@testing-library/jest-dom'
import {render , screen, } from "@testing-library/react"
import ThemeSwitch from '../components/ThemeSwitch';

it('renders without crashing', () => {
   
  render(<ThemeSwitch />);
  expect(screen.getByText(/Dark Mode/i)).toBeInTheDocument();
});

