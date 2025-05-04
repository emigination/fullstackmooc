import { CoursePart } from "../types";
import { assertNever } from "../utils";

type PartProps = { part: CoursePart };

const PartTitle = ({ part }: PartProps) => <b>{part.name} {part.exerciseCount}</b>

const Part = ({ part }: PartProps) => {
   switch (part.kind) {
      case "basic":
         return (
            <p>
               <PartTitle part={part} />
               <br /><i>{part.description}</i>
            </p>
         );
      case "group":
         return (
            <p>
               <PartTitle part={part} />
               <br /> Group projects: {part.groupProjectCount}
            </p>
         );
      case "background":
         return (
            <p>
               <PartTitle part={part} />
               <br /> <i>{part.description}</i>
               <br /> Background material: {part.backgroundMaterial}
            </p>
         );
      case "special":
         return (
            <p>
               <PartTitle part={part} />
               <br /> <i>{part.description}</i>
               <br /> Required skills: {part.requirements.join(", ")}
            </p>
         );
      default:
        return assertNever(part);
   }
}

export default Part;
