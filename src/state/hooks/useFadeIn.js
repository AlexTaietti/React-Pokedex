import { useLayoutEffect, useState } from 'react';

export function useFadeIn (mountedOnce) {

  const [fadeIn, setFadeIn] = useState(!mountedOnce);

  useLayoutEffect(() => {

    if(fadeIn){ setTimeout( () => setFadeIn(false) ); }

  }, [fadeIn]);

  return fadeIn;

}
