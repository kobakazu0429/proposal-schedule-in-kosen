import { type FunctionComponent } from "preact";
import { useCallback, useState } from "preact/hooks";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import type { Dayjs } from "dayjs";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import groupBy from "just-group-by";

type HHmmss = string;

export interface Props {
  options: { name: string; start: HHmmss; end: HHmmss }[];
  isConnectOption?: boolean;
  calendarSubject: string;
}

export const Chooser: FunctionComponent<Props> = ({
  options,
  isConnectOption = false,
  calendarSubject,
}) => {
  const [selectedDates, setSelectedDates] = useState<Dayjs[]>([]);
  const [checkedDates, setCheckedDates] = useState<
    { date: Dayjs; option: string }[]
  >([]);

  const handleClick = useCallback((date: Dayjs) => {
    setSelectedDates((prev) =>
      [...prev, date].sort((a, b) => a.unix() - b.unix())
    );
    console.log(date);
  }, []);

  const handleCheckboxClick = useCallback(
    (date: Dayjs, option: string, checked: boolean) => {
      if (checked) {
        setCheckedDates((prev) =>
          [...prev, { date, option }].sort((a, b) => {
            const diffDate = a.date.unix() - b.date.unix();
            if (diffDate !== 0) return diffDate;
            return (
              options.findIndex((o) => o.name === a.option) -
              options.findIndex((o) => o.name === b.option)
            );
          })
        );
      } else {
        setCheckedDates((prev) =>
          prev.filter((t) => !(t.date.isSame(date) && t.option === option))
        );
      }
    },
    []
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <DateCalendar onChange={handleClick} />
        </Grid>

        <Grid item xs={4}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>日付</TableCell>
                  {options.map((option) => (
                    <TableCell align="center">{option.name}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedDates.map((date) => (
                  <TableRow
                    key={date.unix()}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {date.locale("ja").format("MM/DD(dd)")}
                    </TableCell>
                    {options.map((option) => (
                      <TableCell align="center">
                        <Checkbox
                          onChange={(_e, checked) =>
                            handleCheckboxClick(date, option.name, checked)
                          }
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={4}>
          {isConnectOption
            ? Object.entries(
                groupBy(checkedDates, ({ date }) =>
                  date.locale("ja").format("MM/DD(dd)")
                )
              ).map(([date, dates]) => (
                <Box sx={{ flexGrow: 1 }}>
                  <Grid
                    container
                    spacing={2}
                    justifyContent="left"
                    alignItems="center"
                  >
                    <Grid item xs={2}>
                      <p>{`${date} ${dates
                        .map(({ option }) => option)
                        .join("")}`}</p>
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        variant="outlined"
                        startIcon={<EditCalendarIcon />}
                        href={generateRegisterCalendarLink({
                          subject: calendarSubject,
                          start:
                            dates.at(0)!.date.format("YYYYMMDDT") +
                            options.find((o) => o.name === dates.at(0)?.option)
                              ?.start,
                          end: dates.at(-1)
                            ? dates.at(-1)!.date.format("YYYYMMDDT") +
                              options.find(
                                (o) => o.name === dates.at(-1)!.option
                              )!.end
                            : "",
                        })}
                        target="_blank"
                      >
                        カレンダーに追加する
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              ))
            : checkedDates.map(({ date, option }) => (
                <p>{`${date.locale("ja").format("MM/DD(dd)")} ${option}`}</p>
              ))}

          <Button
            variant="outlined"
            startIcon={<ContentCopyIcon />}
            onClick={() => {
              if (isConnectOption) {
                const texts = Object.entries(
                  groupBy(checkedDates, ({ date }) =>
                    date.locale("ja").format("MM/DD(dd)")
                  )
                )
                  .map(
                    ([date, dates]) =>
                      `${date} ${dates.map(({ option }) => option).join("")}`
                  )
                  .join("\n");
                navigator.clipboard.writeText(texts);
              } else {
                const texts = checkedDates
                  .map(
                    ({ date, option }) =>
                      `${date.locale("ja").format("MM/DD(dd)")} ${option}`
                  )
                  .join("\n");
                navigator.clipboard.writeText(texts);
              }
            }}
          >
            コピーする
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const generateRegisterCalendarLink = (params: {
  subject: string;
  start: Dayjs | string;
  end: Dayjs | string;
}) => {
  const f = "YYYYMMDDTHHmm00";
  const dates =
    (typeof params.start === "string" ? params.start : params.start.format(f)) +
    "/" +
    (typeof params.end === "string" ? params.end : params.end.format(f)) +
    "";

  const base = "https://www.google.com/calendar/render";
  const url = new URL(base);
  // @ts-expect-error
  url.search = new URLSearchParams({
    action: "TEMPLATE",
    text: params.subject,
    dates,
  });
  return url.toString();
};
