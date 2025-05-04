import { CoursePart } from "../types";
import Part from "./Part";

type ContentProps = { courseParts: CoursePart[] };

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((part, index) => <Part key={index} part={part} />)}
    </div>
  );
}

export default Content;
