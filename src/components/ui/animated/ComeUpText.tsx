"use client";

interface IProps {
  text: string;
  className?: string;
  height?: string;
}

function ComeUpText({ text, className, height = "h-6" }: IProps) {
  return (
    <div
      className={`group cursor-pointer flex flex-col overflow-hidden ${className} ${height}`}
    >
      <p className="transform transition duration-500 group-hover:-translate-y-8 ">
        {text}
      </p>
      <p
        className={`-translate-y-0 transform ease-in-out transition duration-700 group-hover:-translate-y-[28px]`}
      >
        {text}
      </p>
    </div>
  );
}

export default ComeUpText;
