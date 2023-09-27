import React from "react";
import AgePic from "./age.jpg";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll"; // Import the ScrollLink component
import { animateScroll as scroll } from "react-scroll"; // Import the scroll function for smooth scrolling

const About = () => {
  const scrollToGraph = () => {
    // Use the scroll function to scroll to the graph section
    scroll.scrollTo("graph-section", {
      duration: 800, // Scroll duration in milliseconds
      smooth: "easeInOutQuart", // Scroll animation type
    });
  };

  return (
    <div>
      <div className=" hero h-500 2xl:h-700 bg-base-200 shadow-xl rounded-xl mt-10 my-10">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={AgePic}
            className="scale-80 2xl:scale-150 max-w-sm 2xl:mr-16"
          />
          <div className="ml-1 xl:ml-10">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold">
              Compliance analysis tools
            </h1>
            <p className="py-6 text-lg">
              Easy-to-use yet powerful, compliance analysis tools make
              investigations hassle-free. The collection of tools support
              functions including one-click address mining, transaction graph
              display, NFT traceability, and data visualization.
            </p>

            <ScrollLink to="graph-section" smooth={true} duration={800}>
              <button className="btn btn-primary">Explore !</button>
            </ScrollLink>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
