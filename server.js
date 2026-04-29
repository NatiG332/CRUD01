const http = require("http");
const fs = require("fs");

const PORT = 3000;
const FILE = "movies.json";

function readData() {
    try {
        return JSON.parse(fs.readFileSync(FILE, "utf8"));
    } catch {
        return [];
    }
}

function writeData(data) {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {

    res.setHeader("Content-Type", "application/json");

    
    if (req.method === "GET" && req.url === "/movies") {
        const movies = readData();
        res.end(JSON.stringify(movies));
    }

    
    else if (req.method === "GET" && req.url.startsWith("/movies/")) {
        const id = parseInt(req.url.split("/")[2]);
        const movies = readData();

        const movie = movies.find(m => m.id === id);

        if (movie) {
            res.end(JSON.stringify(movie));
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: "Movie not found" }));
        }
    }

   
    else if (req.method === "POST" && req.url === "/movies") {

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            const movies = readData();
            const newMovie = JSON.parse(body);

            newMovie.id = movies.length > 0 ? movies[movies.length - 1].id + 1 : 1;

            movies.push(newMovie);
            writeData(movies);

            res.statusCode = 201;
            res.end(JSON.stringify({
                message: "Movie added successfully",
                movie: newMovie
            }));
        });
    }

    
    else if (req.method === "PUT" && req.url.startsWith("/movies/")) {

        const id = parseInt(req.url.split("/")[2]);
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {

            const movies = readData();
            const index = movies.findIndex(m => m.id === id);

            if (index === -1) {
                res.statusCode = 404;
                return res.end(JSON.stringify({ message: "Movie not found" }));
            }

            const updatedMovie = JSON.parse(body);
            updatedMovie.id = id;

            movies[index] = updatedMovie;
            writeData(movies);

            res.end(JSON.stringify({
                message: "Movie updated successfully",
                movie: updatedMovie
            }));
        });
    }

    
    else if (req.method === "DELETE" && req.url.startsWith("/movies/")) {

        const id = parseInt(req.url.split("/")[2]);
        const movies = readData();

        const filteredMovies = movies.filter(m => m.id !== id);

        if (movies.length === filteredMovies.length) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ message: "Movie not found" }));
        }

        writeData(filteredMovies);

        res.end(JSON.stringify({
            message: "Movie deleted successfully"
        }));
    }

    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: "Route not found" }));
    }

});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
