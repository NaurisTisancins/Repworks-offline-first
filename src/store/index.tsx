import { createContext, useContext } from 'react';
import { RoutineStore } from './Store';

type StoreProviderType = {
  children: any;
};

const store: RoutineStore = new RoutineStore();
const StoreContext: React.Context<RoutineStore> = createContext(store);

export const RoutineStoreProvider = ({ children }: StoreProviderType) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);

export default store;
