import styled from '@emotion/styled';
import Box from '@mui/material/Box';

export const AppContainerBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 60px;
  padding: 16px 30px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
`;

export const LogoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.text.primary};
  align-items: center;
  text-transform: uppercase;
  font-weight: 500;
`;
