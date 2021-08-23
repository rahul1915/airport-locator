import { withTranslation } from "react-i18next";
import './App.css';
import Header from './components/header';
import Tabs from './components/tabs';

function App() {
  return (
    <div className='App'>
      <Header />
      <Tabs />
    </div>
  );
}

export default withTranslation('translations')(App);