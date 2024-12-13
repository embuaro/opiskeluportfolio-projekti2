import React, { useState } from 'react'
import { Button, Container, TextField, Typography } from '@mui/material';
import { Link, NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { fi } from 'date-fns/locale';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { format } from 'date-fns';

interface Props {
    paivakirjamerkinnat : Paivakirjamerkinta[]
    setPaivakirjamerkinnat : (arg0 : Paivakirjamerkinta[]) => void
}

const Muokkaa : React.FC<Props> = ({ paivakirjamerkinnat, setPaivakirjamerkinnat }) : React.ReactElement => {
    
    const { id } = useParams<any>();

    const muokattavaMerkinta : Paivakirjamerkinta | undefined = paivakirjamerkinnat.find((paivakirjamerkinta : Paivakirjamerkinta) => {
        return paivakirjamerkinta.id === id;
    });

    const navigate : NavigateFunction = useNavigate();

    const [paiva, setPaiva] = useState<Date>(muokattavaMerkinta?.paiva ? new Date(muokattavaMerkinta.paiva) : new Date());
    const [teksti, setTeksti] = useState<string>(muokattavaMerkinta?.teksti || "");

    const tallennaMerkinta = () : void => {
        
        let apuMerkinta : Paivakirjamerkinta = {
            id : muokattavaMerkinta!.id,
            paiva : paiva,
            teksti : teksti,
        }

        const uudetMerkinnat = paivakirjamerkinnat.map((paivakirjamerkinta) =>
            paivakirjamerkinta.id === muokattavaMerkinta!.id ? apuMerkinta : paivakirjamerkinta
        );
        setPaivakirjamerkinnat(uudetMerkinnat);

        navigate("/paivakirja");
    }


    return (
        <Container sx={{marginTop:"10px"}}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
    
            <Typography sx={{fontSize : "30px"}}>Muokkaa havaintoa</Typography>

            <Typography
                sx={{marginBottom : "20px;"}}
            >Olet muokkaamassa "{format(muokattavaMerkinta?.paiva ? new Date(muokattavaMerkinta?.paiva) : new Date(), 'd.M.y')}" päivän merkintää, oletko varma?</Typography>
            
            <DatePicker 
                label="Päivä"
                value={paiva}
                sx={{marginBottom : "10px"}}
                maxDate={new Date()}
                onChange={(uusiPvm : Date | null) => setPaiva(uusiPvm!)}        
            />

            <TextField 
                label="Muokkaa tekstiä"
                value={teksti}
                variant="outlined"
                multiline
                rows={5}
                fullWidth={true}
                sx={{marginBottom : "10px"}}
                onChange={(e) => setTeksti(e.target.value )}>
            </TextField>

            <Button
                variant="contained"
                fullWidth={true}
                onClick={tallennaMerkinta}
                sx={{backgroundColor: "purple", marginBottom: "10px"}}
            >Tallenna muutokset</Button>  

            <Button
                fullWidth={true}
                component={Link}
                to="/paivakirja"
                sx={{color: "purple", marginBottom: "10px"}}
            >Peruuta</Button>    
            
            </LocalizationProvider>
        </Container>
    )
}

export default Muokkaa;