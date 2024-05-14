import React from "react";
import { Link, useMatch } from "react-router-dom";

const CustomNavLink: React.FC<{to: string}> = ({to}) => {
  const matched = useMatch(to);
  return (
    <Link to={to}>
      
    </Link>
  );
};

export default CustomNavLink;
