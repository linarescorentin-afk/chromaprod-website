import { useFilterStore } from "@/store/useFilterStore";
import { motion } from "framer-motion";

function MobileNavItems({
  name,
  onClick,
  pathname,
  isMenuOpen,
  delay,
}: {
  name: string;
  onClick: () => void;
  pathname: string;
  isMenuOpen: boolean;
  delay: number;
}) {
  const selectedFilter = useFilterStore((state) => state.selectedFilter);

  const listVariants = {
    open: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    closed: {},
  };

  const itemVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "100%", opacity: 0 },
  };
  return (
    <motion.div
      initial="closed"
      animate={isMenuOpen ? "open" : "closed"}
      variants={listVariants}
      className="flex flex-col h-full"
    >
      <motion.button
        key={name}
        variants={itemVariants}
        transition={{ duration: 0.5 + delay, delay }}
        className={`${selectedFilter === name.toLowerCase() || pathname === `/${name.toLowerCase()}` ? "bg-black text-white border-y lg:border-x lg:border-white border-black" : "text-black bg-white"} border-y lg:border-x lg:border-y-0 border-black w-full h-full border-dashed cursor-pointer`}
        onClick={onClick}
      >
        {name}
      </motion.button>
    </motion.div>
  );
}

export default MobileNavItems;
