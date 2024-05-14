import { useContext } from 'react';
import { ConfigContext } from 'utils/contexts/ConfigContext';

const useConfig = () => useContext(ConfigContext);

export default useConfig;
