import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import StyleButton from "./StyleButton";
import { cn } from "@/lib/utils";
import { useStyleStore } from "@/store/style";
import { useGridStore } from "@/store/grid";

const colors = [
  "#000000",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#00FFFF",
];

type ColorPickerProps = {
  children: React.ReactNode;
  setter: (color: string) => void;
  styleType: "backgroundColor" | "textColor";
  styleColor: string;
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  styleType,
  setter,
  styleColor,
  children,
}) => {
  const textColor = useStyleStore((state) => state.textColor);
  const applyStyleToRange = useGridStore((state) => state.applyStyleToRange);

  function handleChangeColor(color: string) {
    setter(color);
    applyStyleToRange({ [styleType]: color });
  }

  return (
    <div className="flex items-center gap-1">
      <Select
        defaultValue={"#FF0000"}
        value={textColor}
        onValueChange={handleChangeColor}
      >
        <SelectTrigger
          variant="ribbonDropdown"
          size="fit"
          hideIcon
          className="w-auto justify-center border-0 bg-transparent p-0"
        >
          <StyleButton className="flex flex-col justify-between">
            {children}
            <div
              className={cn("h-1 w-5")}
              style={{ backgroundColor: styleColor }}
            ></div>
          </StyleButton>
        </SelectTrigger>
        <SelectContent className="" direction="horizontal" align="center">
          {colors.map((color) => (
            <SelectItem
              value={color}
              key={color}
              className="flex items-center justify-center px-2"
              hideCheck
            >
              <div
                className="h-8 w-12 rounded-md"
                style={{ backgroundColor: color }}
              />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ColorPicker;
