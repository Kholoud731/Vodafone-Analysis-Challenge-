
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import '@testing-library/jest-dom'
import { store } from '../store/rootStore';
import { Provider } from 'react-redux';
import MainPage from '../components/MainPage';
import {render , screen, } from "@testing-library/react"
import ThemeSwitch from '../components/ThemeSwitch';

it('renders without crashing', () => {
  const history = createMemoryHistory()
  history.push('/')

  render(
    <Provider store={store}>
    <Router location={history.location} navigator={history}>
    <MainPage>
      <ThemeSwitch/>
    </MainPage>

    </Router>
    </Provider>
    );
    expect(screen.getByText(/Analysis Chart/i)).toBeInTheDocument();
    expect(screen.getByText(/Dark mode/i)).toBeInTheDocument();
});

