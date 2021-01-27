import { useEffect, useLayoutEffect, useState } from 'react';

export function useVisibility (initialValue) {

  const [visible, setVisibility] = useState(initialValue);

  useLayoutEffect(() => { if(!visible) setTimeout( () => setVisibility(true) ); }, []);

  return visible;

}
