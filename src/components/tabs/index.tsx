//React Dependencies
import React, { useState } from 'react';

//Components
import Map from '../map';
import Settings from '../settings';
import AirportList from '../airport-list';

//Localization
import { withTranslation } from "react-i18next";

//Material UI components and dependencies
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

//Global PropTypes
import PropTypes from 'prop-types';

//Local PropTypes
type FullWidthProps = {
  i18n: any,
  t: (label: string) => string,
  tReady: boolean
}
type TabPanelProps = {
  children: HTMLElement | JSX.Element,
  index: number,
  value: number
}

//Sub Component
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
}));

//Component
function FullWidthTabs(props: FullWidthProps) {
  const { t } = props;
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    setValue(newValue);
    return;
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
          >
          <Tab label={t('Map')} {...a11yProps(0)} />
          <Tab label={t('AirportList')} {...a11yProps(1)} />
          <Tab label={t('Settings')} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Map />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AirportList />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Settings />
      </TabPanel>
    </div>
  );
}

export default withTranslation("translations")(FullWidthTabs);
