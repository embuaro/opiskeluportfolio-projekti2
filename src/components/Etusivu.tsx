import { Backdrop, Button, CircularProgress, Container, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  paivakirjamerkinnat : Paivakirjamerkinta[]
  setPaivakirjamerkinnat : (arg0 : Paivakirjamerkinta[]) => void
}

const Etusivu : React.FC<Props> = () : React.ReactElement => {
  
  const [data, setData]  = useState <Data> ({
    vitsi: "",
    virhe : "",
    valmis : false   
  });

  const pyyntoLahetetty : React.MutableRefObject<boolean> = useRef(false);

  const haeData = async () : Promise<void> => {
    try {

    const yhteys : Response= await fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=racist,sexist&type=single")
    const data = await yhteys.json();

      if (data && data.joke) {
        setData({ ...data, vitsi: data.joke, valmis: true });
      } else {
        setData({ ...data, virhe: "Vitsiä ei löytynyt.", valmis: true });
      }
        
    } catch (e : any) {
        setData({...data, virhe : "Palvelimelle ei saada yhteyttä.", valmis : true});
      }
  }

  useEffect(() => {
    if (!pyyntoLahetetty.current) {
      haeData();
    }
      
      return () => {
        pyyntoLahetetty.current = true;
      }
  }, []);
  
  return (
    <>
    <img
    src="/hero.png"
    alt="herokuva"
    style={{ width:"100%"}}
    />
    <Container>
  
      <Typography 
        variant="h3"
        sx={{marginTop : "10px"}}
      >Tervetuloa käyttämään päiväkirjasovellusta</Typography>
        
      <Typography 
        variant="h5"
        sx={{marginTop : "30px"}}
      >Kirjoita päivästäsi tai jos kaipaat piristystä, kokeile auttaako päivän vitsi!</Typography>

      <Button
        variant="contained"
        component={Link}
        to="/kirjoita"
        sx={{ width: "300px", display: "block", margin: "20px auto", textAlign: "center", backgroundColor: "purple" }}
      >Kirjoita uusi päiväkirjamerkintä</Button>  

      <Button
        variant="contained"
        onClick={haeData}
        sx={{ width: "300px", display: "block", margin: "20px auto", textAlign: "center", backgroundColor: "purple" }}
      >Tell a joke!</Button>    

      {Boolean(data.virhe)
      ? <Typography sx={{marginTop: "10px",marginBottom:"20px", color: "#F00"}}>{data.virhe}</Typography>
      : !data.valmis
      ? <Backdrop open={true}><CircularProgress color="inherit"/></Backdrop>
      : data.vitsi && <Typography sx={{marginTop: "10px",marginBottom:"20px"}}>{data.vitsi}</Typography>
      }
    </Container>
    </>
  );
}

export default Etusivu;