import styled from "styled-components";

interface ButtonProps {
  type: string;
  onClick?: void;
}

export const Button = styled.button<ButtonProps>`
  width: 100%;
  padding: 8px 127px 8px 127px;
  border-radius: 1.75rem;
  border: none;
  background: #fa9e31;
`;
