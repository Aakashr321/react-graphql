import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_QUOTES } from "../gqloperations/queries";
import { Link } from "react-router-dom";

function Home() {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES);

  if (loading) return <h1>...Loading</h1>;
  if (error) {
    console.log(error.message);
  }
  if (data.quotes.length === 0) {
    return <h2>No records found</h2>;
  }
  return (
    <div className="container">
      {data.quotes.map((quote, index) => {
        return (
          <blockquote key={index}>
            <h6>{quote.name}</h6>
            <Link to={`/profile/${quote.by._id}`}>
              <p className="right-align">{quote.by.firstName}</p>
            </Link>
          </blockquote>
        );
      })}
    </div>
  );
}

export default Home;
