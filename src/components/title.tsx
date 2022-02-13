import React, { FunctionComponent } from "react";

interface TitleProps {
  title: string;
  subtitle?: string;
}

/**
 * Title component with optional subtitle as well
 */
const Title: FunctionComponent<TitleProps> = ({ title, subtitle }) => {
  return (
    <div>
      <h1 className="font-semibold text-[30px] md:text-[40px] text-white pr-[15%] md:pr-[30%] leading-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-500 font-semibold text-[18px] md:text-[20px] pr-[50%] md:pr-[60%] pt-5 leading-tight">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Title;
