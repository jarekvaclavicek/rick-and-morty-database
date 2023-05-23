//Character
export type PaginationInfo = {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

export type CharacterOrigin = {
    name: string;
    url: string;
}

export type CharacterLocation = {
    name: string;
    url: string;
}

export type Character = {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: CharacterOrigin;
    location: CharacterLocation;
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export type CharacterPaginatedResult = {
    info: PaginationInfo;
    results: Character[];
}
  //Location
  export type Location = {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    url: string;
    created: string;
  }
  
  export type LocationPaginatedResult = {
    info: PaginationInfo;
    results: Location[];
  }

//Episode
export type Episode = {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    created: string;
  }

  export type EpisodePaginatedResult = {
    info: PaginationInfo;
    results: Episode[];
  }
  



