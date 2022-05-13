import ManageResume from "features/user/ManageResume";
import Profile from "features/user/Profile";
import UpdateProfile from "features/user/UpdateProfile";
import useAuth from "hooks/useAuth";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import { Box } from "@mui/system";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab, Tabs } from "@mui/material";
import { useSelector } from "react-redux";
import ManageApplication from "features/application/ManageApplication";
const TAB = [
  {
    value: "Update profile",
    icon: <EditIcon sx={{ fontSize: 24 }} />,
    component: <UpdateProfile />,
  },
  {
    value: "Manage Resumes",
    icon: <PeopleIcon sx={{ fontSize: 24 }} />,
    component: <ManageResume />,
  },
  {
    value: "Manage Application",
    icon: <WorkIcon sx={{ fontSize: 24 }} />,
    component: <ManageApplication />,
  },
];
const AccountPage = () => {
  const { user } = useAuth();

  const [value, setValue] = useState(TAB[0].value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box>
        AccountPage
        <Profile user={user} />
      </Box>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs
              // orientation="vertical"
              onChange={handleChange}
              aria-label="account tab"
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
            >
              {TAB.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                />
              ))}
            </Tabs>
          </Box>

          {TAB.map((tab) => (
            <TabPanel key={tab.value} value={tab.value}>
              {tab.component}
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </>
  );
};

export default AccountPage;
