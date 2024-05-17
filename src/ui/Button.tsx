import styled from "styled-components";

interface ButtonProps {
  type: string;
  onClick?: void;
}

export const Button = styled.button<ButtonProps>`
  width: 100%;
  border-radius: 1.75rem;
  border: none;
  background: #fa9e31;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  justify-content: center;
`;
