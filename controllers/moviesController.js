const moviesModel = require('../models/moviesModel')
const puppeteer = require('puppeteer');


const getMovies = (req,res) =>{
    moviesModel.find()
    .sort( {title:1})
    .then(movies => {
        res.status(200).json(movies)
    })
    .catch(err =>{
        res.status(400).json(err)
    })
}

const getMovie = (req,res) =>{
    moviesModel.findById(req.params.id)
    .then(movie =>{
        res.status(200).json(movie)
    })
    .catch(err =>{
        res.status(400).json(err)
    })
}

const deleteMovie = (req,res) =>{
    moviesModel.findByIdAndDelete(req.params.id)
    .then(movie =>{
        res.status(200).json(movie)
    })
    .catch(err =>{
        res.status(400).json(err)
    })
}

const addMovie = (req,res) =>{
    const movie = new moviesModel(req.body)
    movie.save()
    .then(movie =>{
        res.status(200).json(movie)
    })
    .catch(err =>{
        res.status(400).json(err)
    })
}

const updateMovie = (req,res) =>{
    moviesModel.findByIdAndUpdate(req.params.id, req.body)
    .then(movie =>{
        res.status(200).json(movie)
    })
    .catch(err =>{
        res.status(400).json(err)
    })
}


const getMoviesByGenre = async (req, res) => {
    try {
        const genre = req.params.genre;
        const movies = await moviesModel.find({ genre: genre }); // Use genres as an array of strings
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "Genre not found" });
    }
}

const scrapMovieTeaser = async (req, res) => {
    const { imdbId } = req.params;

    try {
        const browser = await puppeteer.launch({
            args: [
                "--no-sandbox",
                "--disable-gpu"
            ],
            headless: "new",
            executablePath: "/usr/bin/chromium-browser"
        });
        const page = await browser.newPage();
        console.log('Browser and page created successfully');
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36');
        console.log('User agent set successfully');

        await page.goto(`https://www.imdb.com/title/${imdbId}/`);
        console.log('Navigated to IMDb page');

        // Function to wait for and find an element
        const findElement = async (selector) => {
            try {
                await page.waitForSelector(selector);
                return await page.$(selector);
            } catch (error) {
                return null;
            }
        };

        // Click the teaser element to navigate to the second page
        const teaserElement = await findElement(`a[aria-label="Watch Official Trailer"]`);
        if (teaserElement) {
            await teaserElement.click();

            // Find and click the "unmute" button
            const unmuteButton = await findElement('.jw-icon.jw-icon-display.jw-button-color.jw-reset[aria-label="Play"]');
            if (unmuteButton) {
                await unmuteButton.click();
            }

            // Wait for the video element to appear on the second page
            const videoElement = await findElement('video.jw-video.jw-reset');

            if (videoElement) {
                const videoSrc = await videoElement.evaluate((el) => el.getAttribute('src'));
                res.status(200).json({ videoSrc });
            } else {
                res.status(404).json({ error: 'Video not found' });
            }
        } else {
            res.status(404).json({ error: 'Teaser not found' });
        }

        await browser.close();
        console.log('Browser closed successfully');
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {getMovies, getMovie, deleteMovie, addMovie, updateMovie, getMoviesByGenre, scrapMovieTeaser}