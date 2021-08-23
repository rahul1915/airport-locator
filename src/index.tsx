import ReactDOM from "react-dom";

//Localization
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";

//Store
import { store } from './redux/store';
import { Provider } from 'react-redux'

//Components
import App from "./App";


// wrap the app in I18next Provider with the configuration loaded from i18n.js
ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>
  ,
  document.getElementById("root")
);
