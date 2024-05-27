import React, { useEffect, useState } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import useRefreshToken from 'hooks/useRefreshToken';
import { selectCurrentUser } from 'state/stateSlice';
import { useSelector } from 'react-redux';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const isNonMobile = useOutletContext();
    
    const accessToken = useSelector(selectCurrentUser);

    useEffect(() => {
        let isMounted = true;//It will prevent setting state on unmounted component
        const verifyRefreshToken = async () => {

            try {
                await refresh();
            }
            catch (error) {
                console.error(error);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }
        !accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => { isMounted = false }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {
                isLoading
                    ? <p>Loading...</p>
                    : <Outlet
                        context={isNonMobile}
                    />
            }
        </>
    )


}

export default PersistLogin