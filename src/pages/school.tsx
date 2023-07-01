import { type FunctionComponent } from "preact";
import { Chooser } from "../components/Chooser";

export const SchoolPage: FunctionComponent = () => {
  return (
    <Chooser
      options={[
        { name: "13:00〜", start: "130000", end: "143000" },
        { name: "14:40〜", start: "144000", end: "161000" },
        { name: "16:20〜", start: "162000", end: "170000" },
      ]}
      calendarSubject=""
    />
  );
};
