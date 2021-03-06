export interface IGuest {
  id: number;
  email: string;
  name: string;
  firstName: string;
  adults: number;
  children: number;
  drink: boolean;
  confirm: boolean;
  emailSent: boolean;
  responded: boolean;
}

export interface IGuestProviderState {
  email: string | null;
  guest: IGuest | null;
  error: string | null;
  isLoading: boolean;
}

export interface IGuestContextValue {
  guest?: IGuest | null;
  actions: { fetchGuest: Function; respondToInvitation: Function };
  error: string | null;
  isLoading: boolean;
}

export interface IGuestData {
  adults: number;
  children: number;
  comments: string;
  confirm: boolean;
}
