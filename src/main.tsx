import { render, type FunctionComponent } from "preact";
import { Router, Route } from "wouter-preact";
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
    <Router base="/proposal-schedule-in-kosen">
      <Route path="/">
        <Box>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/proposal-schedule-in-kosen/school"
              >
                <ListItemText primary="学校" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/proposal-schedule-in-kosen/lessons"
              >
                <ListItemText primary="塾" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Route>
      <Route path="/school" component={SchoolPage} />
      <Route path="/lessons" component={LessonsPage} />
    </Router>
  </LocalizationProvider>
);

render(<App />, document.body);
