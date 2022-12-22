import React from "react";
import { useRouter } from "next/router";
import { ROUTES } from "constants/Routes";


import appStore from "store/AppStore";
import CustomTypography from "components/CustomTypography";
import { AppContainerBox, LogoutContainer } from "./index.styles";

const AppHeader = () => {
  const user = appStore((state) => state.user);
  const router = useRouter();
  const resetAppStore: any = appStore((state) => state.reset);

  const logout = async () => {

 
    resetAppStore();
    router.push(ROUTES.LOGIN);
  };
  return (
    <AppContainerBox>
      {/* <img alt="Logo here" />  */} 
      {user && (
        <LogoutContainer onClick={logout}>
         
          <CustomTypography variant="h3" fontWeightKey="semibold">
            Logout
          </CustomTypography>
        </LogoutContainer>
      )}
    </AppContainerBox>
  );
};

export default AppHeader