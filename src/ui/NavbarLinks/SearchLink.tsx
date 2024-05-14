import React from "react";
import { Link, useMatch } from "react-router-dom";

const SearchLink: React.FC<{ to: string }> = ({ to }) => {
  const matched = useMatch(to);
  return (
    <Link to={to}>
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="56"
          height="56"
          rx="10"
          fill={matched ? "#fafafa" : "#FA9E31"}
        />
        <path
          d="M25.8102 33.2585C29.9238 33.2585 33.2585 29.9238 33.2585 25.8102C33.2585 21.6966 29.9238 18.3619 25.8102 18.3619C21.6966 18.3619 18.3619 21.6966 18.3619 25.8102C18.3619 29.9238 21.6966 33.2585 25.8102 33.2585Z"
          stroke={matched ? "#8a8a8a" : "#fafafa"}
          stroke-width="2"
          stroke-miterlimit="10"
        />
        <path
          d="M31.2698 31.2698L37.6381 37.6381"
          stroke={matched ? "#8a8a8a" : "#fafafa"}
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Link>
  );
};

export default SearchLink;
