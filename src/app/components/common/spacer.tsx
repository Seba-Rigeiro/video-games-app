import styled from "@emotion/styled";

interface SpacerProps {
  size: string;
}

export const Spacer = styled.div<SpacerProps>`
  height: ${({ size }) => size};
  width: 100%;
`;
