import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export const GridContainer = styled(Grid)`
  height: calc(100vh - 60px);
`;

export const LoginErrorContainer = styled(Box)`
  padding: 20px;
  margin: 20px auto;
  border: 1px solid ${({ theme }) => theme.palette.error.outline};
  background-color: ${({ theme }) => theme.palette.error.background};
`;
