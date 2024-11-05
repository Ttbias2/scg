export interface Super {
    response: string;
    id: number;
    name: string;
    powerstats: Powerstats;
    biography: Biography;
    appearance: Appearance;
    work: Work;
    connections: Connections;
    image: Image;
  }
  
  export interface Powerstats {
    intelligence: string | number; // Cambiado para permitir number
    strength: string | number;
    speed: string | number; // Cambiado para permitir number
    durability: string | number; // Cambiado para permitir number
    power: string | number; // Cambiado para permitir number
    combat: string | number; // Cambiado para permitir number
  }
  
  export interface Biography {
    "full-name": string;
    "alter-egos": string;
    aliases: string[];
    "place-of-birth": string;
    "first-appearance": string;
    publisher: string;
    alignment: string;
  }
  
  export interface Appearance {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    "eye-color": string;
    "hair-color": string;
  }
  
  export interface Work {
    occupation: string;
    base: string;
  }
  
  export interface Connections {
    "group-affiliation": string;
    relatives: string;
  }
  
  export interface Image {
    url: string;
  }