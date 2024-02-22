import FontDropdown from "@/ribbon/sections/styling/FontDropdown";
import TextProperties from "./TextProperties";
import { Separator } from "@/components/ui/separator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFillDrip } from "@fortawesome/free-solid-svg-icons";
import ColorPicker from "./ColorPicker";
import FontBoldItalics from "./FontBoldItalics";
import { useStyleStore } from "@/store/style";

const Styling = () => {
  const setTextColor = useStyleStore((state) => state.setTextColor);
  const setBackgroundColor = useStyleStore((state) => state.setBackgroundColor);
  const textColor = useStyleStore((state) => state.textColor);
  const backgroundColor = useStyleStore((state) => state.backgroundColor);

  return (
    <div className="space-y-2 rounded-lg bg-gray-100 px-2 py-3">
      <div className="flex items-center gap-2">
        <FontDropdown />
        <TextProperties />
      </div>
      <div className="flex h-5 items-center  justify-between gap-2">
        <FontBoldItalics />
        <Separator orientation="vertical" className="bg-gray-400" />
        <ColorPicker
          setter={setBackgroundColor}
          styleType="backgroundColor"
          styleColor={backgroundColor}
        >
          <FontAwesomeIcon
            icon={faFillDrip}
            height={22}
            className="mt-2 scale-110"
          />
        </ColorPicker>
        <ColorPicker
          setter={setTextColor}
          styleType="textColor"
          styleColor={textColor}
        >
          <p className="text-lg font-semibold">A</p>
        </ColorPicker>
      </div>
    </div>
  );
};

export default Styling;
