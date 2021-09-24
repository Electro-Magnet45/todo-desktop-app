import React from "react";
import "./Home.css";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div className="home">
      <Helmet>
        <title>Home - Todo</title>
      </Helmet>
      <div className="home_container">
        <h1>ToDo</h1>
      </div>
    </div>
  );
};

export default Home;
