import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SwitchLangButton from "./SwitchLangButton";
import { Dispatch } from "react";

function MobileHeader({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<React.SetStateAction<boolean>>;
}) {
  const itemVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "100%", opacity: 0 },
  };
  return (
    <motion.div
      initial="closed"
      animate={isMenuOpen ? "open" : "closed"}
      variants={itemVariants}
      transition={{ duration: 0.5, delay: 0 }}
      className="h-full w-full bg-black flex items-center px-5 justify-between"
    >
      <Link href="/">
        <Image src="/chromalogo2.png" alt="Logo" width={170} height={100} />
      </Link>
      <div className="flex space-x-10 items-center h-full ">
        <SwitchLangButton setIsMenuOpen={setIsMenuOpen} />
        <button
          className="text-[80px] leading-[60px] -translate-y-2"
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          x
        </button>
      </div>
    </motion.div>
  );
}

export default MobileHeader;
