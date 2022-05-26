import React from 'react';

export const LikeFillIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  width = 24,
  height = 24,
  fill = '#2B7E6BFF',
}) => (
  <svg width={width} height={height}>
    <path
      d='M18.4938,3.80125 C20.5893,5.02215 22.0628,7.50088 21.9979,10.3931 C21.861,16.5 
      13.5000003,21 12.0000003,21 C10.5000003,21 2.13902,16.5 2.00206,10.3931 C1.9372,7.50088 
      3.41065,5.02215 5.50615,3.80125 C7.46612,2.65932 9.92814,2.65319 12.0000003,4.33847 
      C14.0719,2.65319 16.5339,2.65932 18.4938,3.80125 Z'
      fill={fill}
    />
  </svg>
);
