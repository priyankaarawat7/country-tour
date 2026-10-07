import express from "express";
import cors from "cors";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const formatCountry = (country) => {
  let region = country.region || "N/A";

  if (region === "Americas") {
    if (country.subregion === "South America") {
      region = "South America";
    } else {
      region = "North America";
    }
  }

  if (region === "Polar") {
    region = "Antarctica";
  }

  const names = {
    common: country.name || "Unknown Country",
  };

  if (country.nativeName) {
    names.native = country.nativeName;
  }

  const capitals = country.capital
    ? [{ name: country.capital }]
    : [];

  const currencies = {};

  if (Array.isArray(country.currencies)) {
    country.currencies.forEach((currency) => {
      if (currency.code) {
        currencies[currency.code] = {
          name: currency.name || "",
          symbol: currency.symbol || "",
        };
      }
    });
  }

  const languages = {};

  if (Array.isArray(country.languages)) {
    country.languages.forEach((language) => {
      const key =
        language.iso639_1 ||
        language.iso639_2 ||
        language.name;

      if (key) {
        languages[key] = {
          name: language.name || "",
          native: language.nativeName || "",
        };
      }
    });
  }

  return {
    names,
    codes: {
      alpha_2: country.alpha2Code || "",
      alpha_3: country.alpha3Code || "",
    },
    flag: {
      url_png:
        country.flags?.png ||
        country.flag ||
        "",
      url_svg:
        country.flags?.svg || "",
      emoji:
        country.flag?.startsWith("http")
          ? ""
          : country.flag || "",
    },
    population: country.population || 0,
    region,
    subregion: country.subregion || "N/A",
    capitals,
    tld: country.topLevelDomain || [],
    currencies,
    languages,
  };
};

// Get all countries
app.get("/api/countries", async (req, res) => {
  try {
    const response = await axios.get(
      "https://countries.dev/countries"
    );

    const countries = response.data || [];

    res.json(countries.map(formatCountry));
  } catch (error) {
    console.error(
      "Backend API error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "Unable to fetch countries",
    });
  }
});

// Get one country
app.get("/api/countries/:name", async (req, res) => {
  try {
    const countryName = decodeURIComponent(req.params.name);

    const response = await axios.get(
      `https://countries.dev/name/${encodeURIComponent(
        countryName
      )}`
    );

    const countries = response.data || [];

    const exactCountry =
      countries.find(
        (country) =>
          country.name?.toLowerCase().trim() ===
          countryName.toLowerCase().trim()
      ) || countries[0];

    if (!exactCountry) {
      return res.status(404).json({
        message: "Country not found",
      });
    }

    res.json([formatCountry(exactCountry)]);
  } catch (error) {
    console.error(
      "Country Details API error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "Unable to fetch country details",
    });
  }
});

// Serve React frontend
app.use(express.static(path.join(__dirname, "dist")));

// React Router fallback
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Render port
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});