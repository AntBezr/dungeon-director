import { type BitProgressProps, Progress } from "ui/8bit/progress";

type ManaBarProps = Omit<BitProgressProps, "progressBg">;

export default function ManaBar({
  className,
  ...props
}: ManaBarProps) {
  return (
    <Progress
      {...props}
      className={className}
      progressBg="bg-blue-500"
    />
  );
}
