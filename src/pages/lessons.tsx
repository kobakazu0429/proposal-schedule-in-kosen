import { type FunctionComponent } from "preact";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Chooser } from "../components/Chooser";

export const LessonsPage: FunctionComponent = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <List>
            <ListItem disablePadding>
              <ListItemText primary="A　14:40〜16:10" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="B　16:20〜17:50" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="C　18:00〜19:30" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="D　19:40〜21:10" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={4} />

        <Grid item xs={12}>
          <Chooser
            options={[
              { name: "A", start: "144000", end: "161000" },
              { name: "B", start: "162000", end: "175000" },
              { name: "C", start: "180000", end: "193000" },
              { name: "D", start: "194000", end: "211000" },
            ]}
            isConnectOption
            calendarSubject="明光義塾"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
