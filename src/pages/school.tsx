import { type FunctionComponent } from "preact";
import { Chooser } from "../components/Chooser";

export const SchoolPage: FunctionComponent = () => {
  return <Chooser options={["13:00〜", "14:40〜", "16:20〜"]} />;
};
