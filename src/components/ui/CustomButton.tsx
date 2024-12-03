import React from "react";

type customButtonProps = {
  name: string;
  w: string;
  h: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export default function CustomButton({
  name,
  w = "1",
  h = "1",
  onClick = () => {},
}: customButtonProps) {
  return (
    <div
      onClick={onClick}
      style={{ height: `${h}rem`, width: `${w}rem` }}
      className={
        "flex justify-center items-center bg-button-bg hover:bg-button-bg-light cursor-pointer p-3"
      }
    >
      {name}
    </div>
  );
}
