import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Etusivu from './components/Etusivu';
import Kirjoita from './components/Kirjoita';
import Paivakirja from './components/Paivakirja';
import Valikko from './components/Valikko';
import Muokkaa from './components/Muokkaa';
import Poista from './components/Poista';


const App : React.FC = () : React.ReactElement => {

  const kaynnistetty : React.MutableRefObject<boolean> = useRef(false);

  const [paivakirjamerkinnat, setPaivakirjamerkinnat] = useState<Paivakirjamerkinta[]>([]);
  
  useEffect(() => {

    if (!kaynnistetty.current)  {

      if (localStorage.getItem("paivakirjalista")) {

        setPaivakirjamerkinnat(JSON.parse(String(localStorage.getItem("paivakirjalista"))).map((paivakirjamerkinta : Paivakirjamerkinta) => {

          return {
            ...paivakirjamerkinta,
            pvmAika : new Date(paivakirjamerkinta.paiva)
          }
        }))
      }
    }

    return () => {
      kaynnistetty.current = true;
    }

  }, []);

  useEffect(() => {

    localStorage.setItem("paivakirjalista", JSON.stringify(paivakirjamerkinnat));

  }, [paivakirjamerkinnat]);


  return (
    <>
    <Valikko/>
    <Routes>
    <Route path='/' element={<Etusivu paivakirjamerkinnat={paivakirjamerkinnat} setPaivakirjamerkinnat={setPaivakirjamerkinnat}/>}/>
    <Route path='/kirjoita' element={<Kirjoita paivakirjamerkinnat={paivakirjamerkinnat} setPaivakirjamerkinnat={setPaivakirjamerkinnat}/>}/>
    <Route path='/paivakirja' element={<Paivakirja paivakirjamerkinnat={paivakirjamerkinnat} setPaivakirjamerkinnat={setPaivakirjamerkinnat}/>}/>
    <Route path='/muokkaa/:id' element={<Muokkaa paivakirjamerkinnat={paivakirjamerkinnat} setPaivakirjamerkinnat={setPaivakirjamerkinnat}/>}/>
    <Route path='/poista/:id' element={<Poista paivakirjamerkinnat={paivakirjamerkinnat} setPaivakirjamerkinnat={setPaivakirjamerkinnat}/>}/>
    </Routes>
    </>
  );
}

export default App;
