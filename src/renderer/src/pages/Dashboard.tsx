import Header from '../components/Header';
import {
  Box,
} from '@mui/material';
import { RestDashboard } from './RestDashboard';
import { FC, useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function tabProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Dashboard: FC = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header handleChange={handleChange} tab={tab} tabProps={tabProps} />

      <Box sx={{ display: 'flex', flex: 1 }}>
        <CustomTabPanel value={tab} index={0}>
          <RestDashboard />
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={1}>
          {/* <SocketsDashboard/> */}
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={2}>
          {/* <HooksDashboard/> */}
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={3}>
          {/* <SoapDashboard/> */}
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default Dashboard;
