export interface ClockPrayRequest {
  name: string;
  description: string;
  clockType: ClockType
}

export interface ClockPrayResponse {
  id: number;
  name: string;
  description: string;
  
}

export interface ClockTimeResponse {
  id: number;
  time: string;
  reserved: boolean;
  reservedBy: string
}

export enum ClockType {
  DEFAULT_VALUE = 'Selecione o tipo',
  THIRTY_MINUTES = '30 minutos',
  ONE_HOUR = '1 hora'
}