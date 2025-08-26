import { MotionValue, useTransform } from "framer-motion";

function useParallax(value: MotionValue<number>, start: number, end: number) {
  return useTransform(value, [0.1, 1], [start, end]);
}

export default useParallax;
