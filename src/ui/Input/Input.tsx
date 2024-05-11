import styled from "styled-components";
import { ChangeEventHandler } from "react";

interface IInputProps {
  type: string;
  id: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  register?: string;
}

export const Input = styled.input<IInputProps>`
  width: 30rem;
  height: 3.5rem;
  padding: 9px 24px 9px 24px;
  border-radius: 1.75rem;
  border: none;
  background: #ededed;
  font-size: 1rem;
`;
