import { useEffect, useState } from "react";
import { getCountryData } from "../api/countryApi";
import { Loader } from "../components/UI/Loader";
import { CountryCard } from "../components/Layout/CountryCard";
import { SearchFilter } from "../components/UI/SearchFilter";

export const Country = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getCountryData();

        console.log("Countries Response:", res.data);

        // API response array hai tabhi countries mein save karo
        if (Array.isArray(res.data)) {
          setCountries(res.data);
        } else {
          console.error(
            "Countries API did not return an array:",
            res.data
          );
          setCountries([]);
        }
      } catch (error) {
        console.error("API ERROR:", error);
        setCountries([]);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const searchCountry = (country) => {
    if (!search.trim()) {
      return true;
    }

    return (
      country.names?.common
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  };

  const filterRegion = (country) => {
    if (filter === "All") {
      return true;
    }

    return country.region === filter;
  };

  const filterCountries = countries
    .filter(
      (country) =>
        searchCountry(country) &&
        filterRegion(country)
    )
    .sort((a, b) => {
      if (!search.trim()) {
        return 0;
      }

      const nameA =
        a.names?.common?.toLowerCase() || "";

      const nameB =
        b.names?.common?.toLowerCase() || "";

      const searchText =
        search.toLowerCase().trim();

      if (nameA === searchText) {
        return -1;
      }

      if (nameB === searchText) {
        return 1;
      }

      return 0;
    });

  return (
    <section className="country-section">

      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

      <div className="container">
        <ul className="country-grid">

          {filterCountries.map((country) => (
            <CountryCard
              key={
                country.codes?.alpha_2 ||
                country.names?.common
              }
              country={country}
            />
          ))}

        </ul>
      </div>

    </section>
  );
};