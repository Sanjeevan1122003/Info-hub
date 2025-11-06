const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios")
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const quotes = [
  {
    id: 1,
    content:
      "Give me a lever long enough and a fulcrum on which to place it, and I shall move the world.",
    author: "Archimedes",
    tags: ["Wisdom"],
    authorSlug: "archimedes",
    length: 91,
    dateAdded: "2020-07-10",
    dateModified: "2023-04-14",
  },
  {
    id: 2,
    content:
      "By accepting yourself and being fully what you are, your presence can make others happy.",
    author: "Jane Roberts",
    tags: ["Famous Quotes"],
    authorSlug: "jane-roberts",
    length: 88,
    dateAdded: "2020-01-12",
    dateModified: "2023-04-14",
  },
  {
    id: 3,
    content:
      "The spirit, the will to win, and the will to excel, are the things that endure. These qualities are so much more important than the events that occur.",
    author: "Vince Lombardi",
    tags: ["Famous Quotes"],
    authorSlug: "vince-lombardi",
    length: 150,
    dateAdded: "2021-02-27",
    dateModified: "2023-04-14",
  },
  {
    id: 4,
    content: "We may encounter many defeats, but we must not be defeated.",
    author: "Maya Angelou",
    tags: ["Famous Quotes"],
    authorSlug: "maya-angelou",
    length: 59,
    dateAdded: "2020-12-06",
    dateModified: "2023-04-14",
  },
  {
    id: 5,
    content:
      "There surely is in human nature an inherent propensity to extract all the good out of all the evil.",
    author: "Benjamin Haydon",
    tags: ["Famous Quotes", "Wisdom", "Character"],
    authorSlug: "benjamin-haydon",
    length: 99,
    dateAdded: "2019-01-14",
    dateModified: "2023-04-14",
  },
  {
    id: 6,
    content:
      "Blessed are the hearts that can bend; they shall never be broken.",
    author: "Albert Camus",
    tags: ["Famous Quotes"],
    authorSlug: "albert-camus",
    length: 65,
    dateAdded: "2021-03-28",
    dateModified: "2023-04-14",
  },
  {
    id: 7,
    content:
      "A mind unruffled by the vagaries of fortune, from sorrow freed, from defilements cleansed, from fear liberated — this is the greatest blessing.",
    author: "The Buddha",
    tags: ["Wisdom"],
    authorSlug: "the-buddha",
    length: 143,
    dateAdded: "2023-03-30",
    dateModified: "2023-04-14",
  },
  {
    id: 8,
    content:
      "The purpose of learning is growth, and our minds, unlike our bodies, can continue growing as we continue to live.",
    author: "Mortimer J. Adler",
    tags: ["Famous Quotes"],
    authorSlug: "mortimer-j-adler",
    length: 113,
    dateAdded: "2019-09-13",
    dateModified: "2023-04-14",
  },
  {
    id: 9,
    content:
      "Can miles truly separate you from friends... If you want to be with someone you love, aren't you already there?",
    author: "Richard Bach",
    tags: ["Love", "Friendship"],
    authorSlug: "richard-bach",
    length: 111,
    dateAdded: "2019-02-13",
    dateModified: "2023-04-14",
  },
  {
    id: 10,
    content:
      "Wisdom is a kind of knowledge. It is knowledge of the nature, career, and consequences of human values.",
    author: "Sidney Hook",
    tags: ["Wisdom"],
    authorSlug: "sidney-hook",
    length: 103,
    dateAdded: "2020-01-27",
    dateModified: "2023-04-14",
  },
  {
    id: 11,
    content: "A really great talent finds its happiness in execution.",
    author: "Johann Wolfgang von Goethe",
    tags: ["Famous Quotes", "Happiness"],
    authorSlug: "johann-wolfgang-von-goethe",
    length: 55,
    dateAdded: "2020-07-10",
    dateModified: "2023-04-14",
  },
  {
    id: 12,
    content: "Fear not for the future, weep not for the past.",
    author: "Percy Bysshe Shelley",
    tags: ["Wisdom"],
    authorSlug: "percy-bysshe-shelley",
    length: 47,
    dateAdded: "2019-02-17",
    dateModified: "2023-04-14",
  },
  {
    id: 13,
    content:
      "They say that time changes things, but you actually have to change them yourself.",
    author: "Andy Warhol",
    tags: ["Change", "Wisdom"],
    authorSlug: "andy-warhol",
    length: 81,
    dateAdded: "2019-09-13",
    dateModified: "2023-04-14",
  },
  {
    id: 14,
    content: "Without some goals and some efforts to reach it, no man can live.",
    author: "John Dewey",
    tags: ["Famous Quotes"],
    authorSlug: "john-dewey",
    length: 65,
    dateAdded: "2019-10-18",
    dateModified: "2023-04-14",
  },
  {
    id: 15,
    content: "It is good even for old men to learn wisdom.",
    author: "Aeschylus",
    tags: ["Wisdom"],
    authorSlug: "aeschylus",
    length: 44,
    dateAdded: "2019-09-13",
    dateModified: "2023-04-14",
  },
  {
    id: 16,
    content: "It is better to understand a little than to misunderstand a lot.",
    author: "Anatole France",
    tags: ["Famous Quotes"],
    authorSlug: "anatole-france",
    length: 64,
    dateAdded: "2020-02-22",
    dateModified: "2023-04-14",
  },
  {
    id: 17,
    content:
      "Pure, holy simplicity confounds all the wisdom of this world and the wisdom of the flesh.",
    author: "Francis of Assisi",
    tags: ["Wisdom"],
    authorSlug: "francis-of-assisi",
    length: 89,
    dateAdded: "2020-03-11",
    dateModified: "2023-04-14",
  },
  {
    id: 18,
    content:
      "The ultimate promise of technology is to make us master of a world that we command by the push of a button.",
    author: "Volker Grassmuck",
    tags: ["Technology"],
    authorSlug: "volker-grassmuck",
    length: 107,
    dateAdded: "2020-03-11",
    dateModified: "2023-04-14",
  },
  {
    id: 19,
    content:
      "There is no friendship, no love, like that of the parent for the child.",
    author: "Henry Ward Beecher",
    tags: ["Friendship"],
    authorSlug: "henry-ward-beecher",
    length: 71,
    dateAdded: "2019-03-24",
    dateModified: "2023-04-14",
  },
  {
    id: 20,
    content:
      "There is nothing happens to any person but what was in his power to go through with.",
    author: "Marcus Aurelius",
    tags: ["Famous Quotes"],
    authorSlug: "marcus-aurelius",
    length: 84,
    dateAdded: "2020-03-01",
    dateModified: "2023-04-14",
  },
  {
    id: 21,
    content:
      "The fox has many tricks. The hedgehog has but one. But that is the best of all.",
    author: "Erasmus",
    tags: ["Famous Quotes"],
    authorSlug: "erasmus",
    length: 79,
    dateAdded: "2021-03-28",
    dateModified: "2023-04-14",
  },
  {
    id: 22,
    content:
      "Reality is merely an illusion, albeit a very persistent one.",
    author: "Albert Einstein",
    tags: ["Famous Quotes", "Science", "Wisdom"],
    authorSlug: "albert-einstein",
    length: 60,
    dateAdded: "2019-09-08",
    dateModified: "2023-04-14",
  },
  {
    id: 23,
    content:
      "There is a difference between happiness and wisdom: he that thinks himself the happiest man is really so; but he that thinks himself the wisest is generally the greatest fool.",
    author: "Francis Bacon",
    tags: ["Wisdom"],
    authorSlug: "francis-bacon",
    length: 175,
    dateAdded: "2020-12-06",
    dateModified: "2023-04-14",
  },
  {
    id: 24,
    content:
      "Men of perverse opinion do not know the excellence of what is in their hands, till someone dash it from them.",
    author: "Sophocles",
    tags: ["Famous Quotes"],
    authorSlug: "sophocles",
    length: 109,
    dateAdded: "2020-04-15",
    dateModified: "2023-04-14",
  },
  {
    id: 25,
    content:
      "How far that little candle throws its beams! So shines a good deed in a naughty world.",
    author: "William Shakespeare",
    tags: ["Famous Quotes"],
    authorSlug: "william-shakespeare",
    length: 86,
    dateAdded: "2020-12-19",
    dateModified: "2023-04-14",
  },
  {
    id: 26,
    content:
      "Fine words and an insinuating appearance are seldom associated with true virtue",
    author: "Confucius",
    tags: ["Wisdom"],
    authorSlug: "confucius",
    length: 79,
    dateAdded: "2019-03-17",
    dateModified: "2023-04-14",
  },
  {
    id: 27,
    content:
      "Friendship is a very taxing and arduous form of leisure activity.",
    author: "Mortimer J. Adler",
    tags: ["Friendship"],
    authorSlug: "mortimer-j-adler",
    length: 65,
    dateAdded: "2021-05-07",
    dateModified: "2023-04-14",
  },
  {
    id: 28,
    content:
      "This is the final test of a gentleman: his respect for those who can be of no possible value to him.",
    author: "William Lyon Phelps",
    tags: ["Wisdom", "Life"],
    authorSlug: "william-lyon-phelps",
    length: 100,
    dateAdded: "2019-01-08",
    dateModified: "2023-04-14",
  },
  {
    id: 29,
    content:
      "How is it possible to find meaning in a finite world, given my waist and shirt size?",
    author: "Woody Allen",
    tags: ["Film"],
    authorSlug: "woody-allen",
    length: 84,
    dateAdded: "2020-03-11",
    dateModified: "2023-04-14",
  },
  {
    id: 30,
    content:
      "Aerodynamically the bumblebee shouldn't be able to fly, but the bumblebee doesn't know that, so it goes on flying anyway.",
    author: "Mary Kay Ash",
    tags: ["Famous Quotes"],
    authorSlug: "mary-kay-ash",
    length: 121,
    dateAdded: "2020-04-02",
    dateModified: "2023-04-14",
  },
  {
    id: 31,
    content:
      "I have been impressed with the urgency of doing. Knowing is not enough; we must apply. Being willing is not enough; we must do.",
    author: "Leonardo da Vinci",
    tags: ["Famous Quotes"],
    authorSlug: "leonardo-da-vinci",
    length: 127,
    dateAdded: "2019-10-18",
    dateModified: "2023-04-14",
  },
  {
    id: 32,
    content:
      "You need chaos in your soul to give birth to a dancing star.",
    author: "Friedrich Nietzsche",
    tags: ["Famous Quotes"],
    authorSlug: "friedrich-nietzsche",
    length: 60,
    dateAdded: "2020-10-14",
    dateModified: "2023-04-14",
  },
  {
    id: 33,
    content:
      "There is a wisdom of the head, and a wisdom of the heart.",
    author: "Charles Dickens",
    tags: ["Wisdom"],
    authorSlug: "charles-dickens",
    length: 57,
    dateAdded: "2020-10-14",
    dateModified: "2023-04-14",
  },
  {
    id: 34,
    content:
      "When times are bad is when the real entrepreneurs emerge.",
    author: "Robert Kiyosaki",
    tags: ["Business"],
    authorSlug: "robert-kiyosaki",
    length: 57,
    dateAdded: "2022-07-06",
    dateModified: "2023-04-14",
  },
  {
    id: 35,
    content:
      "Study the past, if you would divine the future.",
    author: "Confucius",
    tags: ["Wisdom"],
    authorSlug: "confucius",
    length: 47,
    dateAdded: "2021-04-23",
    dateModified: "2023-04-14",
  },
  {
    id: 36,
    content:
      "It is not the possession of truth, but the success which attends the seeking after it, that enriches the seeker and brings happiness to him.",
    author: "Max Planck",
    tags: ["Success"],
    authorSlug: "max-planck",
    length: 140,
    dateAdded: "2019-12-02",
    dateModified: "2023-04-14",
  },
  {
    id: 37,
    content:
      "'All conditioned things are impermanent' — when one sees this with wisdom, one turns away from suffering.",
    author: "The Buddha",
    tags: ["Wisdom", "Philosophy"],
    authorSlug: "the-buddha",
    length: 105,
    dateAdded: "2023-03-30",
    dateModified: "2023-04-14",
  },
  {
    id: 38,
    content:
      "People are not lazy. They simply have impotent goals - that is, goals that do not inspire them.",
    author: "Tony Robbins",
    tags: ["Famous Quotes"],
    authorSlug: "tony-robbins",
    length: 95,
    dateAdded: "2020-02-07",
    dateModified: "2023-04-14",
  },
  {
    id: 39,
    content: "One today is worth two tomorrows.",
    author: "Benjamin Franklin",
    tags: ["Famous Quotes"],
    authorSlug: "benjamin-franklin",
    length: 33,
    dateAdded: "2021-03-08",
    dateModified: "2023-04-14",
  },
  {
    id: 40,
    content:
      "The final wisdom of life requires not the annulment of incongruity but the achievement of serenity within and above it.",
    author: "Reinhold Niebuhr",
    tags: ["Wisdom"],
    authorSlug: "reinhold-niebuhr",
    length: 119,
    dateAdded: "2020-11-13",
    dateModified: "2023-04-14",
  },
];

app.get("/api/weather", async (req, res) => {
    try {
        const city = req.query.city ;
        const apiKey = process.env.WEATHER_API_KEY;

        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        const { name } = response.data;
        const { description } = response.data.weather[0];
        const { temp, temp_min, temp_max, humidity, feels_like } = response.data.main;

        res.json({
            name,
            condition: description,
            temperature: temp,
            minimumTemperature: temp_min,
            maximumTemperature: temp_max,
            humidity,
            feelsLike: feels_like,
        });
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({error});
        } else {
            res.status(500).json({error});
        }
    }
});

app.get("/api/currency", async (req, res) => {
    try {
        const currency = req.query.currency || "INR";
        const apiKey = process.env.CURRENCY_API_KEY;
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency}`)
        const { base_code } = response.data;
        const rates = response.data.conversion_rates;

        res.json({
            base: base_code,
            rates
        });
    }
    catch (error) {
        res.status(500).json({error});
    }
});

app.get("/api/quote", async (req, res) => {
    try{
        const quote = quotes[Math.floor(Math.random() * quotes.length)]
        res.json(quote);
    }
    catch(error) {
        res.status(500).json({errro});
    }
})

const PORT = 5000

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})