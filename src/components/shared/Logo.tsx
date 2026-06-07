import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function Logo({ className, ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 50,0 L 93.3,25 L 93.3,75 L 50,100 L 6.7,75 L 6.7,25 Z M 50,16 L 79.4,33 L 79.4,67 L 50,84 L 20.6,67 L 20.6,33 Z M 50,33 L 64.7,41.5 L 64.7,58.5 L 50,67 L 35.3,58.5 L 35.3,41.5 Z"
      />
    </svg>
  );
}
