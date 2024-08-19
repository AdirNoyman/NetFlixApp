import { fetchDataFromTMDB } from "../services/tmdb.service";
import {User} from "../models/user.model.js";

export const searchPerson = async (req,res) => {

    try {

        const {query: person} = req.params;
        const response = await fetchDataFromTMDB(`https://api.themoviedb.org/3/search/person?query=${person}&include_adult=false&language=en-US&page=1`); 
        
        if (response.results.length > 0) {
            res.status(200).json(response.results);
        } else {
            res.status(404).json({message: "No results found"});
        }

        // Save search to history
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: "person",
                    createdAt: new Date()
                }
            }
        })
        
    } catch (error) {
        console.log("Error in search person controller: " + error.message);
        res.status(500).json({success: false, message: "Internal server error"});
        
    }


}

export const searchMovie = async (req,res) => {

    
}

export const searchTv = async (req,res) => {

    
}