export const SearchFilter = ({
  search,
  setSearch,
  filter,
  setFilter,
}) => {


  const handleInputChange = (event) => {

    setSearch(event.target.value);

  };


  const handleSelectChange = (event) => {

    setFilter(event.target.value);

  };


  return (

    <section className="section-searchFilter container">

      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleInputChange}
      />


      <div>

        <select
          className="select-section"
          value={filter}
          onChange={handleSelectChange}
        >

          <option value="All">
            All Countries
          </option>

          <option value="Africa">
            Africa
          </option>

          <option value="Antarctica">
            Antarctica
          </option>

          <option value="Asia">
            Asia
          </option>

          <option value="Europe">
            Europe
          </option>

          <option value="North America">
            North America
          </option>

          <option value="Oceania">
            Oceania
          </option>

          <option value="South America">
            South America
          </option>

        </select>

      </div>

    </section>

  );

};