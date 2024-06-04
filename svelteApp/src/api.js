//Hecho con ayuda de chat GPT, y en base a documentación de https://www.nps.gov/subjects/developer/api-documentation.htm#/parks/getPark
import { writable } from "svelte/store";
let API_KEY = import.meta.env.VITE_API_KEY;

export const parks = writable([]);
export const isLoading = writable(false);
export const errorMessage = writable("");

export const events = writable([]);


export async function fetchParks() {
  isLoading.set(true);
  errorMessage.set("");
  const apiKey = API_KEY;
  try {
    const response = await fetch(`https://developer.nps.gov/api/v1/parks?limit=50&api_key=${apiKey}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    parks.set(data.data);
  } catch (error) {
    console.error("Failed to fetch parks:", error);
    errorMessage.set("Failed to load parks. Please try again later.");
    parks.set([]);
  } finally {
    isLoading.set(false);
  }
}

  export async function fetchEvents(parkCode) {
    const apiKey = API_KEY; 
    const url = `https://developer.nps.gov/api/v1/events?parkCode=${parkCode}&api_key=${apiKey}`;

    isLoading.set(true);
    errorMessage.set('');
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data = await response.json();
      events.set(data.data);
    } catch (error) {
      console.error('Error:', error);
      errorMessage.set('Failed to load events. Please try again later.');
    } finally {
      isLoading.set(false);
    }
  }