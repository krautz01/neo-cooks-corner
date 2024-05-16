import { PathMatch } from "react-router-dom";
import styled from "styled-components";

interface NavLinkWrapperProps {
  condition?: PathMatch<string> | null; // Определение типа для свойства condition
}

export const NavLinkWrapper = styled.div<NavLinkWrapperProps>`
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.condition ? " #FA9E31" : "#ffffff")};
  border-radius: 10px;
  opacity: 0px;
  @media (width< 426px) {
    background: #ffffff;
  }
`;
