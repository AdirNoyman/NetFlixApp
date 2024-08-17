import { fetchDataFromTMDB } from "../services/tmdb.service.js"

const url = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US'

export const getTrendingTv = async (req,res) => {   

    try {

        const data = await fetchDataFromTMDB(url)
        const randomTvSeries = data.results[Math.floor(Math.random() * data.results?.length)]

        res.json({success: true, content: randomTvSeries})

        
    } catch (error) {

        console.log(error)

        res.status(500).json({success: false, message: "Internal server error"})
        
    }
}

export const getTvTrailers = async (req,res) => {    

    try {

        const { id } = req.params
        const data = await fetchDataFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)  
        res.json({success: true, trailers: data.results})      
        
        
    } catch (error) {

        if (error.message.includes('404')) {
            return res.status(404).json({success: false, message: "TV Series not found"})
        }

        res.status(500).json({success: false, message: "Internal server error"})
        
    }
}


export const getTvDetails = async (req,res) => {    

    try {

        const { id } = req.params
        const data = await fetchDataFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)  
        res.json({success: true, details: data})      
        
        
    } catch (error) {

        if (error.message.includes('404')) {
            return res.status(404).json({success: false, message: "TV Series not found"})
        }

        res.status(500).json({success: false, message: "Internal server error"})
        
    }
}

export const getSimilarTv = async (req,res) => {    

    try {

        const { id } = req.params
        const data = await fetchDataFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`)  
        res.json({success: true, similar: data.results})      
        
        
    } catch (error) {

        if (error.message.includes('404')) {
            return res.status(404).json({success: false, message: "TV Series not found"})
        }

        res.status(500).json({success: false, message: "Internal server error"})
        
    }
}

export const getTvByCategory = async (req,res) => {    

    try {

        const { category } = req.params
        const data = await fetchDataFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)  
        res.json({success: true, content: data.results})      
        
        
    } catch (error) {

        if (error.message.includes('404')) {
            return res.status(404).json({success: false, message: "Category not found"})
        }

        res.status(500).json({success: false, message: "Internal server error"})
        
    }
}