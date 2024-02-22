import StyleButton from "@/ribbon/sections/styling/StyleButton";
import { useGridStore } from "@/store/grid";
import { useStyleStore } from "@/store/style";
import { Bold, Italic, Underline } from "lucide-react";

const FontBoldItalics = () => {
  const setBold = useStyleStore((state) => state.setBold);
  const setItalic = useStyleStore((state) => state.setItalic);
  const setUnderline = useStyleStore((state) => state.setUnderline);
  const bold = useStyleStore((state) => state.bold);
  const italic = useStyleStore((state) => state.italic);
  const underline = useStyleStore((state) => state.underline);
  const applyStyleToRange = useGridStore((state) => state.applyStyleToRange);

  function handleClick(style: "bold" | "italic" | "underline") {
    let newStyle;

    switch (style) {
      case "bold":
        setBold(!bold);
        newStyle = !bold;
        break;
      case "italic":
        setItalic(!italic);
        newStyle = !italic;
        break;
      case "underline":
        setUnderline(!underline);
        newStyle = !underline;
        break;
    }

    applyStyleToRange({ [style]: newStyle });
  }

  return (
    <>
      <StyleButton onClick={() => handleClick("bold")}>
        <Bold size={16} className="stroke-[2]" />
      </StyleButton>
      <StyleButton onClick={() => handleClick("italic")}>
        <Italic size={16} className="stroke-[2]" />
      </StyleButton>
      <StyleButton onClick={() => handleClick("underline")}>
        <Underline size={16} className="stroke-[2]" />
      </StyleButton>
    </>
  );
};

export default FontBoldItalics;
