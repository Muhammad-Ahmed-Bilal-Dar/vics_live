import { ElementType, ReactNode } from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

// Declare a global module for Material UI components
declare module '@mui/material/Grid' {
  // Complete override of component props
  export interface GridProps {
    children?: ReactNode;
    className?: string;
    component?: ElementType;
    container?: boolean;
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    item?: boolean;
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
    xs?: boolean | number;
    sm?: boolean | number;
    md?: boolean | number;
    lg?: boolean | number;
    xl?: boolean | number;
    spacing?: number | string;
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    sx?: SxProps<Theme>;
    key?: number | string;
  }
}

// Also declare for direct imports from @mui/material
declare module '@mui/material' {
  export interface GridProps {
    children?: ReactNode;
    className?: string;
    component?: ElementType;
    container?: boolean;
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    item?: boolean;
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
    xs?: boolean | number;
    sm?: boolean | number;
    md?: boolean | number;
    lg?: boolean | number;
    xl?: boolean | number;
    spacing?: number | string;
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    sx?: SxProps<Theme>;
    key?: number | string;
  }
}

// Fix for MUI Grid component
declare module '@mui/material' {
  export interface MuiGridProps {
    children?: ReactNode;
    className?: string;
    component?: ElementType;
    container?: boolean;
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    item?: boolean;
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
    xs?: boolean | number;
    sm?: boolean | number;
    md?: boolean | number;
    lg?: boolean | number;
    xl?: boolean | number;
    spacing?: number | string;
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    sx?: SxProps<Theme>;
    key?: number | string;
  }
}

// Fix Input with accept property
declare module '@mui/material/Input' {
  interface InputProps {
    accept?: string;
  }
}

// Fix Select with onChange handler
declare module '@mui/material/Select' {
  interface SelectProps {
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown; }>) => void;
  }
} 