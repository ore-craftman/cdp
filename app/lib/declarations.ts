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

export interface IUser {
  id: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface UserPayload {
  type: "SPIME" | "CO" | "MDA" | "PDO" | string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  nin: string;
  role: string;
  communityRole?: string;
  assignedCommunity?: string;
  assignedMda?: string;
  pdoRole?: string;
}

// User schema
export interface User extends UserPayload {
  createdAt: Date;
  updatedAt: Date;
  verifiedEmail: boolean;
  password: string;
}

export interface SignupEmail {
  firstName: string;
  role: string;
  password: string;
  email: string;
}

export interface IPagination {
  totalCount: number;
  pageCount: number;
  currentPage: number;
  lastVisible: string;
  firstVisible: string;
}
