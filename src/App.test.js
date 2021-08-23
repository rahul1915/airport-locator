import { Provider } from 'react-redux';
import { I18nextProvider } from "react-i18next";
import {
  render,
  screen
} from '@testing-library/react';
import App from './App';
import i18n from "./i18n";
import { store } from '../src/redux/store';

const renderApp = () =>
  render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  );
test('Should show header and title', () => {
  const { getByTestId } = renderApp();
      const SettingsElement = screen.getByText(/Settings/i);
      expect(SettingsElement).toBeInTheDocument();
      const AirportListElement = screen.getByText(/Airport List/i);
      expect(AirportListElement).toBeInTheDocument();
      const MapElement = screen.getByText(/Map/i);
      expect(MapElement).toBeInTheDocument();
      expect(getByTestId('header-text')).toBeInTheDocument();
      expect(getByTestId('header-text').innerHTML).toBe('Airport');
});
