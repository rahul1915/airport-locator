//React dependencies
import React from "react";

//Localiztion
import { withTranslation } from "react-i18next";

//Store
import { useAppSelector, useAppDispatch } from '../../hooks';
import { changeLanguage, changeUnit } from '../../redux/appData';

//Material UI component and dependencies
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

// Local PropTypes
type Props = {
  t: (lang: string) => string;
  i18n: any,
  tReady: Boolean;
}
type StateType = {
  data: {
    unitValue: string,
    value: string
  }
}

//Component
const Settings = (props: Props) => {
  const { t } = props;

  //Localization update
  const { i18n } = props;

  //Store update
  const dispatch = useAppDispatch();
  
  //Store fetch
  let language = useAppSelector((state: StateType) => state.data.value);
  language = (language === 'en-US' || language === 'nl') ? language : 'en-US';
  const unit = useAppSelector((state: StateType) => state.data.unitValue);
  
  //OnSelect Functions.
  const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    window.localStorage.setItem('unitValue', e.target.value);
    dispatch(changeUnit({ unitValue: e.target.value }))
  }
  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    i18n.changeLanguage(e.target.value);
    dispatch(changeLanguage({ value: e.target.value }))
  }

  return (
    <div>
      <div style={containerStyle}>
        <FormControl
          component="span"
        >
          <div style={languageSection}>
            <FormLabel style={languageLabel} component="legend">{t('SelectLanguage')}</FormLabel>
          </div>
          <RadioGroup
            aria-label={`Language-${language}`}
            name="language1"
            value={language}
            onChange={handleLanguageChange}
          >
            <FormControlLabel
              value="en-US"
              control={<Radio inputProps={{ "id": 'radio-english' }} />}
              label="English"
            />
            <FormControlLabel
              value="nl"
              control={<Radio inputProps={{ "id": 'radio-dutch' }} />}
              label="Dutch"
            />
          </RadioGroup>
          <div style={unitSection}>
            <FormLabel style={unitLabelStyle} component="legend">{t('SelectUnit')}</FormLabel>
          </div>
          <RadioGroup
            aria-label="Units"
            name="Units1"
            value={unit}
            onChange={handleUnitChange}
          >
            <FormControlLabel
              value="KM"
              control={<Radio inputProps={{ "id": 'radio-KM' }} />}
              label="KM"
            />
            <FormControlLabel
              value="mile"
              control={<Radio inputProps={{ "id": 'radio-mile' }} />}
              label="Mile"
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div >
  );
}

const containerStyle = { width: '40%', margin: 'auto', borderRadius: '10px', border: '1px solid #7d7d7d', textAlign: 'left' as any, padding: '2em' }
const languageSection = { margin: '1em 0' }
const languageLabel = { fontWeight: 'bold' as any, fontSize: '20px' }
const unitSection = { margin: '2em 0 1em 0' }
const unitLabelStyle = { fontWeight: 'bold' as any, textAlign: 'left' as any, fontSize: '20px' }
export default withTranslation("translations")(Settings);
