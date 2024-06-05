//Hecho con ayuda de chat GPT, y en base a documentación de https://www.nps.gov/subjects/developer/api-documentation.htm#/parks/getPark
import { writable } from "svelte/store";
let API_KEY = import.meta.env.VITE_API_KEY;

export const parks = writable([]);
export const isLoading = writable(false);
export const errorMessage = writable("");

export const articles = writable({});
export const totalArticles = writable(0);

export const itemsPerPage = 5; 



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

export async function fetchArticles(page = 1) {
  isLoading.set(true);
  errorMessage.set("");
  const apiKey = API_KEY;
  const start = (page - 1) * itemsPerPage;
  const url = `https://developer.nps.gov/api/v1/articles?start=${start}&limit=${itemsPerPage}&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    const data = await response.json();
    articles.set(data.data);
    totalArticles.set(data.total); // Asigna el total de artículos desde la respuesta de la API
  } catch (error) {
    console.error('Error:', error);
    errorMessage.set('Failed to load articles. Please try again later.');
  } finally {
    isLoading.set(false);
  }
}