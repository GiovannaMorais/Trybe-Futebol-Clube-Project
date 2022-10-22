export interface Login {
  email: string;
  password: string;
}

export interface ReturnLogin{
  status: number | null;
  message: string;
}

export interface TokenLogin { token: string, status?:number, message?:string}
