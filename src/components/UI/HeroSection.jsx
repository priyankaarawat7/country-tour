import { FaLongArrowAltRight } from "react-icons/fa";

export const HeroSection = () => {
 return(
    <main className="hero-section main">
        <div className="container grid grid-two-column">
            <div className="hero-content">
                <h1 className="heading-xl">
                           Explore the World, One 
                           Country at a time
                 </h1>
                 <p className="paragraph">
                           Discover the history,culture and beauty of every nation.
                           Sort, search, and filter through countries to find the details you need.
                 </p>
                 <button className="btn btn-dark btn-inline bg-white-box">
                            Start Exploring <FaLongArrowAltRight/>
                </button>
            </div>
            <div className="hero-image">
                <img 
                   src="/images/country.jpg" 
                   alt="world beauty"
                   className = "banner-image"
                 />
            </div>
         </div>
     </main>
    );
};