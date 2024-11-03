import React, { createContext, useContext, useState, ReactNode } from 'react';

type WelcomeScreenType = 'default' | 'custom-internal' | 'custom-external' | null;

interface UserFlowContextType {
  accountInformationRequired: boolean;
  setAccountInformationRequired: (value: boolean) => void;
  shippingAddressRequired: boolean;
  setShippingAddressRequired: (value: boolean) => void;
  welcomeScreen: WelcomeScreenType;
  setWelcomeScreen: (value: WelcomeScreenType) => void;
}

const UserFlowContext = createContext<UserFlowContextType | undefined>(undefined);

export function UserFlowProvider({ children }: { children: ReactNode }) {
  const [accountInformationRequired, setAccountInformationRequired] = useState(false);
  const [shippingAddressRequired, setShippingAddressRequired] = useState(true);
  const [welcomeScreen, setWelcomeScreen] = useState<WelcomeScreenType>('custom-internal');

  return (
    <UserFlowContext.Provider
      value={{
        accountInformationRequired,
        setAccountInformationRequired,
        shippingAddressRequired,
        setShippingAddressRequired,
        welcomeScreen,
        setWelcomeScreen,
      }}
    >
      {children}
    </UserFlowContext.Provider>
  );
}

export function useUserFlow() {
  const context = useContext(UserFlowContext);
  if (context === undefined) {
    throw new Error('useUserFlow must be used within a UserFlowProvider');
  }
  return context;
} 