import { useContext, createContext } from "react";

const EZFormContext = createContext(null);

const EZFormProvider = ({ children, value }) => {
  return (
    <EZFormContext.Provider value={value}>{children}</EZFormContext.Provider>
  );
};

const useEZFormContext = () => {
  const context = useContext(EZFormContext);

  if (!context) {
    throw new Error("useEZFormContext must be used inside EZFormProvider");
  }

  return context;
};

export { EZFormProvider, useEZFormContext };
