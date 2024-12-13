import { Button, Container, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
    paivakirjamerkinnat : Paivakirjamerkinta[];
    setPaivakirjamerkinnat : (arg0 : Paivakirjamerkinta[]) => void;
}

const Paivakirja : React.FC<Props> = ({paivakirjamerkinnat, setPaivakirjamerkinnat}) : React.ReactElement => {

    paivakirjamerkinnat.sort(function(a,b){
  
        return new Date(b.paiva).getTime() - new Date(a.paiva).getTime();
      });

    return (
        <>  
        <Container>
            <Button
                variant="contained"
                fullWidth={true}
                component={Link}
                to="/kirjoita"
                sx={{ width: "300px", display: "block", margin: "20px auto", textAlign: "center", backgroundColor: "purple" }}
            >Kirjoita uusi päiväkirjamerkintä</Button>      

            <List>

            {paivakirjamerkinnat.map( (paivakirjamerkinta : Paivakirjamerkinta, idx : number) => {

                return (
                    <ListItem key={idx}
                    sx={{display: "flex", flexDirection:"column", alignItems:"flex-start", borderBottom: "1px solid #ccc", paddingBottom: "10px",marginBottom: "10px"
                    }}>

                        <ListItemText primary={format(paivakirjamerkinta.paiva, "d.M.y")} />
                        <ListItemText primary={paivakirjamerkinta.teksti}
                        sx={{flex: "1", wordBreak: "break-word"}}/>
                        <ListItemIcon sx={{ marginLeft: "auto" }}>
                            <IconButton 
                                component={Link}
                                to={`/poista/${paivakirjamerkinta.id}`}
                                edge="end"
                            >
                                <DeleteIcon />
                            </IconButton>
                            <IconButton 
                                component={Link}
                                to={`/muokkaa/${paivakirjamerkinta.id}`}
                                edge="end"
                            >
                                <EditIcon />
                            </IconButton>
                        </ListItemIcon>
                    </ListItem>
                );

            } ) }

            </List>

        </Container>
        </>
)
}

export default Paivakirja;