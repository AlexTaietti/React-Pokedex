import { useEffect, useState } from 'react';

export function useVisibility () {

  const [visible, setVisibility] = useState(false);

  useEffect(() => { setTimeout( () => setVisibility(true) ); }, []);

  return visible;

}
