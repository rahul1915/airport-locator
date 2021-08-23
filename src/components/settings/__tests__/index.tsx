//React Dependencies
import { render, screen, fireEvent, RenderResult } from '@testing-library/react';

//Component Import
import Settings from '../index';

//Localization
import i18n from "../../../i18n";
import { I18nextProvider } from "react-i18next";

//Store
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';

//Component Render
const renderSettings = (): RenderResult =>
  render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Settings />
      </I18nextProvider>
    </Provider>
  );

//Test cases
test('Renders settings with labels and radio buttons', () => {
  renderSettings();
  const SettingsElement = screen.getByText(/Select Language/i);
  expect(SettingsElement).toBeInTheDocument();
  const SettingsUnitElement = screen.getByText(/Select Unit/i);
  expect(SettingsUnitElement).toBeInTheDocument();
  expect(screen.getByText(/Dutch/i)).toBeInTheDocument();
  expect(screen.getByText(/English/i)).toBeInTheDocument();
  expect(screen.getByText(/KM/i)).toBeInTheDocument();
  expect(screen.getByText(/Mile/i)).toBeInTheDocument();
});

test('it should change language to dutch', () => {
  renderSettings();
  fireEvent.click(screen.getByText('Dutch'));
  const radioDutch = document.querySelector('#radio-dutch');
  expect(radioDutch.checked).toEqual(true);
});

test('it should change unit to mile', () => {
  renderSettings();
  fireEvent.click(screen.getByText('Mile'));
  const radioMile = document.querySelector('#radio-mile');
  expect(radioMile.checked).toEqual(true);
});
