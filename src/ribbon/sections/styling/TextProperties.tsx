import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import StyleButton from "./StyleButton";
import { useStyleStore } from "@/store/style";
import { useGridStore } from "@/store/grid";

const fontSizes = ["8", "9", "10", "12", "14", "16", "18", "20"];

const TextProperties = () => {
  const fontSize = useStyleStore((state) => state.fontSize);
  const setFontSize = useStyleStore((state) => state.setFontSize);
  const applyStyleToRange = useGridStore((state) => state.applyStyleToRange);

  const handleChangeFontSize = (size: number) => {
    setFontSize(size);
    applyStyleToRange({ fontSize: size });
  };

  return (
    <div className="flex items-center gap-1">
      <Select
        defaultValue="12"
        onValueChange={(fontSize) => handleChangeFontSize(parseInt(fontSize))}
      >
        <SelectTrigger variant="ribbonDropdown" size="fit">
          {fontSize}
        </SelectTrigger>
        <SelectContent>
          {fontSizes.map((size) => (
            <SelectItem value={size} key={size}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <StyleButton onClick={() => handleChangeFontSize(fontSize - 1)}>
        {"∨A"}
      </StyleButton>
      <StyleButton
        className="text-base"
        onClick={() => handleChangeFontSize(fontSize + 1)}
      >
        A^
      </StyleButton>
    </div>
  );
};

export default TextProperties;
