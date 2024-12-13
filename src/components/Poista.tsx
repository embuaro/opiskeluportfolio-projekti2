import React, { } from 'react'
import { Button, Container, Typography } from '@mui/material';
import { Link, NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';

interface Props {
    paivakirjamerkinnat : Paivakirjamerkinta[]
    setPaivakirjamerkinnat : (arg0 : Paivakirjamerkinta[]) => void
}

const Poista : React.FC<Props> = ({ paivakirjamerkinnat, setPaivakirjamerkinnat }) : React.ReactElement => {
    
    const navigate : NavigateFunction = useNavigate();

    const { id } = useParams<any>();

    const poistettavaMerkinta : Paivakirjamerkinta | undefined = paivakirjamerkinnat.find((paivakirjamerkinta : Paivakirjamerkinta) => {
        return paivakirjamerkinta.id === id;
    });

    const vahvistaPoisto = () => {
        setPaivakirjamerkinnat([...paivakirjamerkinnat.filter((paivakirjamerkinta : Paivakirjamerkinta) => paivakirjamerkinta.id !== id)]);
        navigate("/paivakirja")
    }

    return (
        <>
        <Container sx={{marginTop:"10px"}}>
            <Typography sx={{fontSize : "30px"}}>Poista merkintä</Typography>

            <Typography
                sx={{marginBottom : "20px;"}}
            >Olet poistamassa "{format(poistettavaMerkinta?.paiva ? new Date(poistettavaMerkinta?.paiva) : new Date(), 'd.M.y')}" päivän merkintää, oletko varma?</Typography>

            <Button
                variant="contained"
                fullWidth={true}
                onClick={vahvistaPoisto}
                sx={{backgroundColor: "purple", marginBottom: "10px"}}
            >Poista</Button>  

            <Button
                fullWidth={true}
                component={Link}
                to="/paivakirja"
                sx={{color: "purple", marginBottom: "10px"}}
            >Peruuta</Button>    
     </Container>
    </>
          
    )
}

export default Poista;