import { render, type FunctionComponent } from "preact";
import Router from "preact-router";
import "dayjs/locale/ja";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { SchoolPage } from "./pages/school";
import { LessonsPage } from "./pages/lessons";

import "./index.css";
dayjs.locale("ja");

const App: FunctionComponent = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Router>
      <Box path="/">
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/school">
              <ListItemText primary="学校" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/lessons">
              <ListItemText primary="塾" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <SchoolPage path="/school" />
      <LessonsPage path="/lessons" />
    </Router>
  </LocalizationProvider>
);

render(<App />, document.body);
