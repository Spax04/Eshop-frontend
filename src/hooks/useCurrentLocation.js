import { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

const useCurrentLocation = () => {
    const location = useLocation();
    const [currentLocation, setCurrentLocation] = useState(location);
  
    useEffect(() => {
        setCurrentLocation(location);
      }, [location]);
  
    return currentLocation;
};

export default useCurrentLocation;