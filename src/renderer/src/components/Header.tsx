import { Box, Tabs, Tab } from "@mui/material";

interface HeaderProps {
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tabProps: (index: number) => any;
  tab: number;
}

const Header: React.FC<HeaderProps> = ({ tab, handleChange, tabProps }: HeaderProps) => {
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider", height: "2" }}>
        <Tabs value={tab} onChange={handleChange} aria-label="tabs">
          <Tab label="REST" {...tabProps(0)} />
          <Tab label="WebSockets" {...tabProps(1)} />
          <Tab label="WebHooks" {...tabProps(2)} />
          <Tab label="SOAP" {...tabProps(3)} />
        </Tabs>
      </Box>
    </Box>
  );
};

export default Header;
