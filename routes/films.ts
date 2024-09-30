import { Router } from "express";
import { Film, NewFilm } from "../types";
const router = Router();

const films: Film[] = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    duration: 148,
    budget: 160,
    description: "A mind-bending thriller about dream invasion.",
    imageUrl: "https://example.com/inception.jpg",
  },
  {
    id: 2,
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    duration: 136,
    budget: 63,
    description: "A hacker discovers the reality is a simulation.",
    imageUrl: "https://example.com/matrix.jpg",
  },
  {
    id: 3,
    title: "Interstellar",
    director: "Christopher Nolan",
    duration: 169,
    budget: 165,
    description: "A journey through space to save humanity.",
    imageUrl: "https://example.com/interstellar.jpg",
  },
];

router.get("/", (req, res) => {
  if (!req.query["minimum-duration"]) {
    return res.json(films);
  }
  const minimumDuration = Number(req.query["minimum-duration"]);
  const filteredFilms = films.filter((film) => {
    return film.duration >= minimumDuration;
  });

  return res.json(filteredFilms);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((film) => film.id === id);
  if (!film) {
    return res.sendStatus(404);
  }
  return res.json(film);
});

router.post("/", (req, res) => {
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number" ||
    !body.title.trim() ||
    !body.director.trim() ||
    body.duration <= 0 ||
    ("budget" in body && (typeof body.budget !== "number" || body.budget <= 0))  ||
    ("description" in body && (typeof body.description !== "string"|| !body.description.trim())) ||
    ("imageUrl" in body && (typeof body.imageUrl !== "string"|| !body.imageUrl.trim()))
  ) {
    return res.sendStatus(400);
  }

  const { title, director,duration,budget,description,imageUrl  } = body as NewFilm;

  const nextId =
    films.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) +
    1;

  const newFilm: Film = {
    id: nextId,
    title,
    director,
    duration,
    budget,
    description,
    imageUrl
  };

  films.push(newFilm);
  return res.json(newFilm);
});

export default router;
