
import '@testing-library/jest-dom'
import {render , screen, } from "@testing-library/react"
import Loading from '../components/Loading';

it('renders without crashing', () => {
   
  render(<Loading />);
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

