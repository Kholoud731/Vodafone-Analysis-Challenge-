
import '@testing-library/jest-dom'
import {render , screen, } from "@testing-library/react"
import Header from '../components/Header';

it('renders without crashing', () => {
   
  render(<Header />);
  const divs = screen.getAllByTestId("head")
  expect(divs[0]).toHaveTextContent("Analysis Chart")
  expect(divs[1]).toHaveTextContent("Number of lessons")
});

