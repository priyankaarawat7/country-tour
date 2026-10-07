import countryFacts from "../api/countryData.json";

export const About = () => {
  return (
    <section className="section-about container">
      <h2 className="container-title">
        Here are the Interesting Facts
        <br />
        we're proud of
      </h2>

      <div className="gradient-cards">
        {countryFacts.map((country) => {
          const {
            id,
            countryName,
            capital,
            population,
            interestingFact,
          } = country;

          return (
            <div className="card" key={id}>
              <div className="container-card bg-blue-box">

                <h3 className="card-title">{countryName}</h3>

                <div className="about-basic-info">
                  <p className="card-detail">
                    <span className="card-description">
                      Capital:
                    </span>
                    <span>{capital}</span>
                  </p>

                  <p className="card-detail">
                    <span className="card-description">
                      Population:
                    </span>
                    <span>{Number(population).toLocaleString("en-IN")}</span>
                  </p>
                </div>

                <p className="card-fact">
                  <span className="card-description">
                    Interesting Fact:
                  </span>
                  <span>{interestingFact}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};