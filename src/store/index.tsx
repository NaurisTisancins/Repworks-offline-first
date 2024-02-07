import { createContext, useContext } from 'react';
import Store from './Store';

type StoreProviderType = {
    children: any;
};

const store: Store = new Store();
const StoreContext: React.Context<Store> = createContext(store);

export const RoutineStoreProvider = ({ children }: StoreProviderType) => {
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);

export default store;
