"use client";

interface IProps {
  children?: React.ReactNode;
  className?: string;
  duration?: number;
  index?: number;
  delay?: number;
  y?: number;
  inView: boolean;
}

function AnimUp({
  children,
  className,
  duration = 1,
  delay = 0,
  y = 200,
  inView,
}: IProps): JSX.Element {
  const styles = {
    transition: `transform ${duration}s ease ${delay}s`,
    transform: inView ? "translateY(0)" : `translateY(${y}px)`,
  };
  return (
    <div className="overflow-hidden">
      <div className={`${className} ${inView ? "in-view" : ""}`} style={styles}>
        {children}
      </div>
    </div>
  );
}

export default AnimUp;
