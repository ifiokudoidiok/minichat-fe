import React, { memo } from 'react';
import { fontWeight } from 'theme/typography';
import Typography, { TypographyProps } from '@mui/material/Typography';

interface ICustomTypographyOwnProps {
  fontWeightKey?:
    | 'regular'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'extrabold'
    | 'large';
  children: React.ReactNode;
}

type ICustomTypographyProps = TypographyProps & ICustomTypographyOwnProps;

const CustomTypography = memo(
  ({ fontWeightKey, children, ...other }: ICustomTypographyProps) => {
    return (
      <Typography
        fontWeight={fontWeightKey && fontWeight[fontWeightKey]}
        {...other}
      >
        {children}
      </Typography>
    );
  },
);

export default CustomTypography;
