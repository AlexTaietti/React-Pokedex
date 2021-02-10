const fetchData = async (url) => {

  try{

    const response = await fetch(url);

    if(!response.ok){ throw new Error(response.status); }

    const data = await response.json();

    return data;

  } catch(e) {

    console.error(e);

    return null;

  }

};

const localStorageReducer = (action, payload) => {

  switch(action){

    case 'SET':
      localStorage.setItem( payload.key, JSON.stringify(payload.data) );
      return true;

    case 'GET':
    const data = localStorage.getItem( payload );
    return data !== 'undefined' ? JSON.parse(data) : null;

    case 'CLEAR':
      localStorage.clear();
      return true;

    default:
      console.error('The localStorageReducer helper can only handle either SET, GET or CLEAR directives');
      return false;

  }


};

const sessionStorageReducer = (action, payload = undefined) => {

  switch(action){

    case 'SET':
      sessionStorage.setItem( payload.key, JSON.stringify(payload.data) );
      return true;

    case 'GET':
      const data = sessionStorage.getItem( payload );
      return data !== 'undefined' ? JSON.parse(data) : null;

    case 'CLEAR':
      sessionStorage.clear();
      return true;

    default:
      console.error('The localStorageReducer helper can only handle either a SET, GET or CLEAR directives');
      return false;

  }


};

export { fetchData, localStorageReducer, sessionStorageReducer };
