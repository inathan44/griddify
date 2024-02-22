import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type StyleButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

const StyleButton = ({ children, className, ...props }: StyleButtonProps) => {
  return (
    <Button
      variant={"ghost"}
      className={cn(
        "h-8 w-8 rounded p-0 brightness-75 active:brightness-90",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default StyleButton;
