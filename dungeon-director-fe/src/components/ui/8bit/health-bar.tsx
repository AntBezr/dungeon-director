import { type BitProgressProps, Progress } from "ui/8bit/progress";

type HealthBarProps = Omit<BitProgressProps, "progressBg">;

export default function HealthBar({
  className,
  ...props
}: HealthBarProps) {
  return (
    <Progress
      {...props}
      className={className}
      progressBg="bg-red-500"
    />
  );
}
