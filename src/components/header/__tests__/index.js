//React Dependencies
import { render } from '@testing-library/react';

//Component Import
import Header from '../index';

//Localization
import i18n from "../../../i18n";
import { I18nextProvider } from "react-i18next";

//Store
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';

//Component Render
const renderHeader = () =>
  render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Header />
      </I18nextProvider>
    </Provider>
  );

//Test Cases
test('Should show header and title', () => {
  const { getByTestId } = renderHeader();
  expect(getByTestId('header-text')).toBeInTheDocument();
  expect(getByTestId('header-text').innerHTML).toBe('Airport');
});