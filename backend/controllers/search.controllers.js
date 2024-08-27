import { fetchDataFromTMDB } from '../services/tmdb.service.js';
import { User } from '../models/user.model.js';

// Search for a person
export const searchPerson = async (req, res) => {
  try {
    const { q: person } = req.query;
    const response = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${person}&include_adult=false&language=en-US&page=1`
    );

    if (!response.results.length >= 1) {
      res.status(404).json({ message: 'No results found' });
    }

    // Save search to history
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: 'person',
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, data: response.results });
  } catch (error) {
    console.log('Error in search person controller: ' + error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Search for a movie
export const searchMovie = async (req, res) => {
  try {
    const { q: movie } = req.query;
    const response = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`
    );

    if (!response.results.length >= 1) {
      res.status(404).json({ message: 'No results found' });
    }

    // Save search to history
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: 'movie',
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, data: response.results });
  } catch (error) {
    console.log('Error in search movie controller: ' + error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Search for a tv show
export const searchTv = async (req, res) => {
  try {
    const { q: tvshow } = req.query;
    const response = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${tvshow}&include_adult=false&language=en-US&page=1`
    );

    if (!response.results.length >= 1) {
      res.status(404).json({ message: 'No results found' });
    }

    // Save search to history
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].name,
          searchType: 'tvShow',
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, data: response.results });
  } catch (error) {
    console.log('Error in search tvShow controller: ' + error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get search history
export const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json({ success: true, data: req.user.searchHistory });
  } catch (error) {
    console.log('Error in get search history controller: ' + error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Remove item from search history
export const removeItemFromSearchHistory = async (req, res) => {

    try {

        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: {
                    id: Number(req.params.id)
                }
            }
        });

        res.status(200).json({ success: true, message: 'Item removed from search history' });
        
    } catch (error) {

        console.log('Error in remove item from search history controller: ' + error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
        
    }
  
};
