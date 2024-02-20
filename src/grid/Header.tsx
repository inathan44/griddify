import { numberToCapitalLetter } from "@/lib/helperFunctions";
import { cn } from "@/lib/utils";

type HeaderProps = {
  headerNumber: number;
  type: "row" | "column";
};

const Header = ({ headerNumber, type }: HeaderProps) => {
  return (
    <div
      className={cn(
        "flex border-collapse items-center justify-center border border-black focus:border-red-300",
        { "h-8 w-8": type === "row", "h-8 w-24": type === "column" },
      )}
    >
      {type === "column"
        ? numberToCapitalLetter(headerNumber - 1)
        : headerNumber}
    </div>
  );
};

export default Header;
