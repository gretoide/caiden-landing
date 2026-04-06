export type EventItem = {
  city: string;
  name: string;
  logoId: string;
  years: string[];
  type: string;
  lat?: number;
  lng?: number;
  rank?: string;
};

export type LocationItem = {
  id: string;
  name: string;
  provinceName: string;
  country: string;
  lat: number;
  lng: number;
  description: string;
  events: EventItem[];
};
