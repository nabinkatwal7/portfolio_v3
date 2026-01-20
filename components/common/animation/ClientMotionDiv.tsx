"use client";
import { HTMLMotionProps, motion } from "framer-motion";

export const ClientMotionDiv = (props: HTMLMotionProps<"div">) => {
  return <motion.div {...props}>{props.children}</motion.div>;
};
