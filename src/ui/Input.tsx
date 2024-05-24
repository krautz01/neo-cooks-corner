import styled from "styled-components";
import { ChangeEventHandler } from "react";

interface IInputProps {
  type: string;
  id: string;
  value?: string | null;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  register?: string;
  placeholder?: string | null;
  accept?: string;
}

export const Input = styled.input<IInputProps>`
  width: 100%;
  height: 100%;
  padding: 9px 24px 9px 24px;
  border-radius: 1.75rem;
  border: none;
  background: #ededed;
  font-size: 1rem;
  color: #343434;
`;
