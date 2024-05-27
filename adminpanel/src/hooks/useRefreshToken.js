import { useDispatch } from 'react-redux';
import { useRefreshMutation } from 'state/apiDevelopmentSlice';
import { setCredentials } from 'state/stateSlice';

const useRefreshToken = () => {
  const [refresher] = useRefreshMutation();
  const dispatch = useDispatch();

  const refresh = async () => {    
    const response = await refresher().unwrap();
    dispatch(setCredentials({ ...response }))

    return response?.accessToken;
  }
  return refresh;
}

export default useRefreshToken