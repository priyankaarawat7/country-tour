import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCountryByName } from "../../api/countryApi";

export const CountryDetails = () => {
    const { id } = useParams();

    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDetails = async () => {
            try {
                console.log("Country ID:", id);

                const res = await getCountryByName(id);

                console.log("Country Response:", res);

                if (res.data && res.data.length > 0) {
                    setCountry(res.data[0]);
                } else {
                    setCountry(null);
                }
            } catch (error) {
                console.log("Country Details Error:", error);
                setCountry(null);
            } finally {
                setLoading(false);
            }
        };

        getDetails();
    }, [id]);

   if (loading) {
    return (
        <div className="loader-container">
            <div className="loader"></div>
        </div>
    );
}

    if (!country) {
        return <h2>Country not found</h2>;
    }

    return (
        <section className="card country-details-card container">

            <div className="container-card bg-white-box">

                <div className="country-image grid grid-two-column">

                    {/* Country Flag */}

                    <div className="country-flag">
                        <img
                            src={country.flag?.url_png}
                            alt={`${country.names?.common || "Country"} flag`}
                            className="flags"
                        />
                    </div>


                    {/* Country Information */}

                    <div className="country-content">

                        {/* Country Name */}

                        <h1 className="country-detail-name">
                            {country.names?.common}
                        </h1>


                        <div className="infoContainer">

                            {/* Native Names */}

                            <p>
                                <span className="card-description">
                                    Native Names:
                                </span>

                                {Object.values(country.names || {})
                                    .filter(
                                        (value) =>
                                            typeof value === "string"
                                    )
                                    .join(", ")}
                            </p>


                            {/* Population */}

                            <p>
                                <span className="card-description">
                                    Population:
                                </span>

                                {Number(
                                    country.population || 0
                                ).toLocaleString("en-IN")}
                            </p>


                            {/* Region */}

                            <p>
                                <span className="card-description">
                                    Region:
                                </span>

                                {country.region?.name ||
                                    country.region ||
                                    "N/A"}
                            </p>


                            {/* Sub Region */}

                            <p>
                                <span className="card-description">
                                    Sub Region:
                                </span>

                                {country.subregion || "N/A"}
                            </p>


                            {/* Capital */}

                            <p>
                                <span className="card-description">
                                    Capital:
                                </span>

                                {country.capitals
                                    ?.map((item) => item.name)
                                    .join(", ") || "N/A"}
                            </p>


                            {/* Top Level Domain */}

                            <p>
                                <span className="card-description">
                                    Top Level Domain:
                                </span>

                                {country.tld
                                    ? Array.isArray(country.tld)
                                        ? country.tld
                                            .map((item) =>
                                                typeof item === "string"
                                                    ? item
                                                    : item?.name || item?.domain || item?.value
                                            )
                                            .filter(Boolean)
                                            .join(", ")
                                        : typeof country.tld === "string"
                                            ? country.tld
                                            : country.tld?.name ||
                                            country.tld?.domain ||
                                            country.tld?.value ||
                                            "N/A"
                                    : "N/A"}
                            </p>

                            <p>
                                <span className="card-description">
                                    Currencies:
                                </span>
                                {Object.values(country.currencies || {})
                                    .map((currency) =>
                                        typeof currency === "string"
                                            ? currency
                                            : currency?.name || currency?.code || currency?.symbol
                                    )
                                    .filter(Boolean)
                                    .join(", ") || "N/A"}
                            </p>

                            <p>
                                <span className="card-description">
                                    Languages:
                                </span>
                                {Object.values(country.languages || {})
                                    .map((language) =>
                                        typeof language === "string"
                                            ? language
                                            : language?.name || language?.official || language?.common
                                    )
                                    .filter(Boolean)
                                    .join(", ") || "N/A"}
                            </p>
                        </div>

                    </div>

                </div>
             <div className="country-card-backbtn">
                 <NavLink to ="/country" className="backBtn"> 
                    <button> Go Back</button>
                 </NavLink>
             </div>
            </div>

        </section>
    );
};