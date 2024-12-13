import { Button, Container, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3/AdapterDateFnsV3';
import { fi } from 'date-fns/locale';
import { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';


interface Props {
    paivakirjamerkinnat : Paivakirjamerkinta[]
    setPaivakirjamerkinnat : (arg0 : Paivakirjamerkinta[]) => void
}

const Kirjoita : React.FC<Props> = ({ paivakirjamerkinnat, setPaivakirjamerkinnat }) : React.ReactElement => {

    const navigate : NavigateFunction = useNavigate();

    const [paiva, setPaiva] = useState<Date | null>(null);
    const [teksti, setTeksti] = useState<string>('');

    const lisaaMerkinta = () : void => {
      if (!paiva) {
        alert('Valitse päivämäärä!');
        return;
      }

        let apuMerkinta : Paivakirjamerkinta = {
            id : uuid(),
            paiva : paiva?.toISOString().split('T')[0],
            teksti : teksti || "Määrittämätön teksti",
        }
    
        setPaivakirjamerkinnat([...paivakirjamerkinnat, apuMerkinta]);
        navigate("/paivakirja");
    }

    return (
      <Container>
        <form
          onSubmit={(e) => {
          e.preventDefault();
          lisaaMerkinta();
        }}
        >
          <Typography sx={{fontSize : "30px", margin : "10px"}}>Kirjoita päiväkirjaan</Typography>

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>

            <DatePicker 
              label="Päivä"
              value={paiva}
              onChange={(newValue) => setPaiva(newValue)}
              maxDate={new Date()}
              slots={{textField : TextField}}
              slotProps={{textField: {fullWidth : true, sx: {marginBottom: "10px"} }}}
            />
          </LocalizationProvider>
            
            <TextField 
                label="Kirjoita tähän päivästäsi..."
                multiline
                rows={10}
                value={teksti}
                onChange={(e) => setTeksti(e.target.value)}
                variant="outlined"
                fullWidth={true}
                sx={{marginBottom : "10px"}}
            />

            <Button
                type= "submit"
                sx={{backgroundColor : "purple"}}
                variant="contained"
                fullWidth={true}
            >Tallenna</Button>  
        </form>
      </Container>
        
    );
}


export default Kirjoita;