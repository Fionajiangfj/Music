const express = require("express");
const app = express();

const HTTP_PORT = process.env.PORT || 8080;
const path = require("path");

app.use(express.static("assets"));

// import handlebars
const exphbs = require("express-handlebars");
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

// import middleware to process encoded form data
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// ---------------------------------------------

let music = [
    {
        id: "01",
        title: "Dance The Night",
        artist: "Dua Lipa",
    },
    {
        id: "02",
        title: "Cruel Summer",
        artist: "Taylor Swift",
    },
    {
        id: "03",
        title: "Vampire",
        artist: "Olivia Rodrigo",
    },
    {
        id: "04",
        title: "Paint The Town Red",
        artist: "Doja Cat",
    },
];

let playlist = [];

app.get("/", (req, res) => {
    res.render("home", {
        layout: "layout.hbs",
        music: music,
    });
});

app.get("/playlist", (req, res) => {
    let has_song = false;
    if (playlist.length === 0) {
        has_song = false;
    } else {
        has_song = true;
    }

    res.render("playlist", {
        layout: "layout.hbs",
        playlist: playlist,
        has_song: has_song,
    });
});

app.post("/add-song/:id", (req, res) => {
    const id = req.params.id;
    for (song of music) {
        if (id === song.id) {
            playlist.push(song);
            res.redirect("/playlist");
        }
    }
});

app.post("/delete-song/:id", (req, res) => {
    const id = req.params.id;

    // loop from the end of the playlist array to avoid messing up the indices
    for (let i = playlist.length - 1; i >= 0; i--) {
        if (playlist[i].id === id) {
            playlist.splice(i, 1);
        }
    }
    res.redirect("/playlist");
});

// ---------------------------------------------

const onHttpStart = () => {
    console.log(`The web server has started at http://localhost:${HTTP_PORT}`);
    console.log("Press CTRL+C to stop the server.");
};

app.listen(HTTP_PORT, onHttpStart);
