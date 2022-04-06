import { Superpower } from "./superpower";

export interface Hero {
  id: number;
  name: string;
  superpower: Superpower[];
}
