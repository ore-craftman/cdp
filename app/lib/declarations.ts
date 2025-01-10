export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
}

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children?: React.ReactNode;
}

export interface SelectProps extends React.ComponentPropsWithoutRef<"select"> {
  label: string;
  children?: React.ReactNode;
}
