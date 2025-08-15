"use client";

interface IProps {
  text: string;
  className?: string;
  height?: string;
}

function ComeUpText({ text, className, height = "h-6" }: IProps) {
  return (
    <div
      className={`group flex flex-col overflow-hidden ${className} ${height}`}
    >
      <p className="transform transition duration-500 group-hover:-translate-y-8 ">
        {text}
      </p>
      <p
        className={`-translate-y-0 transform transition duration-500 group-hover:-translate-y-[30px]`}
      >
        {text}
      </p>
    </div>
  );
}

export default ComeUpText;
