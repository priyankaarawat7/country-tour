import { Link, NavLink } from "react-router-dom";

export const CountryCard = ({ country }) => {

  const name = country?.names?.common || "Unknown Country";

  const population = country?.population ?? 0;

  const region =
    typeof country?.region === "string"
      ? country.region
      : country?.region?.name || "N/A";

  const capital =
    country?.capitals?.map((item) => item.name).join(", ") ||
    "N/A";

  const countryCode = country?.codes?.alpha_2
    ?.toLowerCase()
    ?.trim();

  const flagUrl = countryCode
    ? `https://flags.restcountries.com/v5/w320/${countryCode}.png`
    : country?.flag?.url_png;

  return (
    <li className="country-card">
      <Link
        to={`/country/${encodeURIComponent(name)}`}
        className="country-card-link"
      >
        <div className="country-flag">
          <img
            src={flagUrl}
            alt={`${name} flag`}
          />
        </div>

        <div className="country-info">

          <h2 className="country-name" title={name}>
            {name}
          </h2>

          <div className="country-main-info">

            <p>
              <span>Capital:</span> {capital}
            </p>

            <p>
              <span>Population:</span>{" "}
              {Number(population).toLocaleString("en-IN")}
            </p>

          </div>

          <p className="country-region">
            <span>Region:</span> {region}
          </p>

          <NavLink
            to={`/country/${encodeURIComponent(name)}`}
            className="read-more-btn"
          >
            Read More
          </NavLink>

        </div>
      </Link>
    </li>
  );
};