import { fetchDataFromTMDB } from "../services/tmdb.service.js"



export const getTrendingMovie = async (req,res) => {
    
    const url = 'https://api.themoviedb.org/3/trending/all/day?language=en-US'

    try {
        const data = await fetchDataFromTMDB(url)
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]

        res.json({success: true, content: randomMovie})

        
    } catch (error) {

        console.log(error)

        res.status(500).json({success: false, message: "Internal server error"})
        
    }
}

export const getMovieTrailers = async (req,res) => {    

    try {

        const { id } = req.params
        const data = await fetchDataFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)  
        res.json({success: true, trailers: data.results})      
        
        
    } catch (error) {

        if (error.message.includes('404')) {
            return res.status(404).json({success: false, message: "Movie not found"})
        }

        res.status(500).json({success: false, message: "Internal server error"})
        
    }
}


export const getMovieDetails = async (req,res) => {    

    try {

        const { id } = req.params
        const data = await fetchDataFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)  
        res.json({success: true, details: data})      
        
        
    } catch (error) {

        if (error.message.includes('404')) {
            return res.status(404).json({success: false, message: "Movie not found"})
        }

        res.status(500).json({success: false, message: "Internal server error"})
        
    }
}

export const getSimilarMovies = async (req,res) => {    

    try {

        const { id } = req.params
        const data = await fetchDataFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)  
        res.json({success: true, similar: data.results})      
        
        
    } catch (error) {

        if (error.message.includes('404')) {
            return res.status(404).json({success: false, message: "Movie not found"})
        }

        res.status(500).json({success: false, message: "Internal server error"})
        
    }
}

export const getMoviesByCategory = async (req,res) => {    

    try {

        const { category } = req.params
        const data = await fetchDataFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)  
        res.json({success: true, content: data.results})      
        
        
    } catch (error) {

        if (error.message.includes('404')) {
            return res.status(404).json({success: false, message: "Category not found"})
        }

        res.status(500).json({success: false, message: "Internal server error"})
        
    }
}