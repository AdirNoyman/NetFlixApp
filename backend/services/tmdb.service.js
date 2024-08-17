import axios from 'axios';
import { ENV_VARS } from '../config/envVars.js';


export const fetchDataFromTMDB = async (url) => {

  console.log("api key => ",ENV_VARS.TMDB_API_KEY)
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ENV_VARS.TMDB_API_KEY}`,
    },
  };

  const response = await axios.get(url, options);

  console.log("The reponse is: ",response)

  if (response.status !== 200) {

    throw new Error('Failed to fetch movies from TMDB 😫 => ' + response.statusText);

  }

  return response.data;
};
