import React from "react";

interface IProps {
  children?: React.ReactNode;
  className?: string;
  duration?: number;
  index?: number;
  delay?: number;
  y?: number;
  inView: boolean;
}

function AnimLeft({
  children,
  className,
  duration = 1,
  delay = 0,
  y = 500,
  inView,
}: IProps): JSX.Element {
  const styles = {
    transition: `transform ${duration}s ease ${delay}s`,
    transform: inView ? `translateX(${0}px)` : `translateX(${-y}px)`,
  };
  return (
    <div className="overflow-hidden">
      <div className={`${className} ${inView ? "in-view" : ""}`} style={styles}>
        {children}
      </div>
    </div>
  );
}

export default AnimLeft;
