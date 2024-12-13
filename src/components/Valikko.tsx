import { AppBar, CssBaseline, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DrawIcon from '@mui/icons-material/Draw';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Valikko : React.FC = () : React.ReactElement => {

  const [valikkoAuki, setValikkoAuki] = useState<boolean>(false);

  return (
    <CssBaseline>
      <AppBar position="static" sx={{backgroundColor : "purple"}}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setValikkoAuki(true)}
            >
              <MenuIcon/>
            </IconButton>
              <Drawer
                open={valikkoAuki}  
                onClose={() => setValikkoAuki(false)}
              >
                <List
                  sx={{
                    width : "250px",
                    marginTop : "50px"
                  }}
                  onClick={() => setValikkoAuki(false)}
                >
                  <ListItemButton
                    component={Link}
                    to="/"
                  >
                    <ListItemIcon>
                      <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Etusivu" />
                  </ListItemButton>

                  <ListItemButton
                    component={Link}
                    to="/kirjoita"
                  >
                    <ListItemIcon>
                      <DrawIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Kirjoita päiväkirjaan" />
                  </ListItemButton>

                  <ListItemButton
                    component={Link}
                    to="/paivakirja"
                  >
                    <ListItemIcon>
                      <MenuBookIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Siirry päiväkirjaan" />
                  </ListItemButton>
                </List>
              </Drawer>
            <Typography 
              component="div"
              sx={{fontSize: "18pt", flexGrow : 1, marginLeft:"15pt"}}
              >Piristävä päiväkirja</Typography>
          </Toolbar>
      </AppBar>
    </CssBaseline>
  );
}

export default Valikko;