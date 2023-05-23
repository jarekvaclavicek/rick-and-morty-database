import axios from 'axios'
import { Character, CharacterPaginatedResult, EpisodePaginatedResult, LocationPaginatedResult } from './api.types';

const API_BASE_URL = 'https://rickandmortyapi.com/api'

// Function to fetch a list of characters
export const fetchCharacters = async (page: number, nameFilter?: string, statusFilter?: string) => {
  const response = await axios.get<CharacterPaginatedResult>(`${API_BASE_URL}/character`, {
    params: {
      page: page, 
      name: nameFilter,
      status: statusFilter
    }
  })
  return response.data;
};

// Function to fetch a single character
export const fetchCharacter = async (characterId: string) => {
  const response = await axios.get<Character>(`${API_BASE_URL}/character/${characterId}`);
  return response.data;
};


// Function to fetch a list of locations
export const fetchLocations = async (page: number) => {
  const response = await axios.get<LocationPaginatedResult>(`${API_BASE_URL}/location?page=${page}`);
  return response.data;
};

// Function to fetch a single location
export const fetchLocation = async (locationId: string) => {
  const response = await axios.get(`${API_BASE_URL}/location/${locationId}`);
  return response.data;
};

// Function to fetch a list of episodes
export const fetchEpisodes = async (page: number) => {
  const response = await axios.get<EpisodePaginatedResult>(`${API_BASE_URL}/episode?page=${page}`);
  return response.data;
};

// Function to fetch a single episode
export const fetchEpisode = async (episodeId: string) => {
  const response = await axios.get(`${API_BASE_URL}/episode/${episodeId}`);
  return response.data;
};

