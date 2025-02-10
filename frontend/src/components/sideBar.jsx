import styles from "../styles/modules/sideBar.module.css"
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Box, Drawer, Icon, List, ListItem, ListItemIcon} from '@mui/material'


function Barra_deNavegacao(){
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <Drawer
      variant="permanent"
      sx={{
        width: 40,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 40,
          boxSizing: "border-box",
          backgroundColor: "#515EA6",
          color: "white",
          display: "flex",
          alignItems: "center",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", py: 2 }}>
        <List sx={{ width: "100%", marginTop: 8}}>
    
          <ListItem component={Link} to="" button={true} sx={{ justifyContent: "center", py: 1 }}>
            <ListItemIcon sx={{ color: "white", minWidth: "auto" }}>
              <Icon>group</Icon>
            </ListItemIcon>
          </ListItem>

          <ListItem component={Link} to="" button={true} sx={{ justifyContent: "center", py: 1 }}>
            <ListItemIcon sx={{ color: "white", minWidth: "auto" }}>
              <Icon>business</Icon>
            </ListItemIcon>
          </ListItem>

          <ListItem component={Link} to="/espelho_ponto" button={true} sx={{ justifyContent: "center", py: 1 }}>
            <ListItemIcon sx={{ color: "white", minWidth: "auto" }}>
              <Icon>bar_chart</Icon>
            </ListItemIcon>
          </ListItem>

          <ListItem component={Link} to="" button sx={{ justifyContent: "center", py: 1 }}>
            <ListItemIcon sx={{ color: "white", minWidth: "auto" }}>
              <Icon>calendar_month</Icon>
            </ListItemIcon>
          </ListItem>
        </List>

        <Box sx={{ flexGrow: 1 }} /> {/* Empurra os próximos itens para a parte inferior */}

        <List sx={{ width: "100%" }}>
          <ListItem sx={{ justifyContent: "center", py: 1 }}>
            <ListItemIcon sx={{ color: "white", minWidth: "auto" }}>
              <Avatar sx={{ width: 32, height: 32}}/>
            </ListItemIcon>
          </ListItem>

          <ListItem button={true} onClick={handleLogOut} sx={{ justifyContent: "center", py: 1 }}>
            <ListItemIcon sx={{ color: "white", minWidth: "auto" }}>
              <Icon sx={{ fontSize: 23}}>exit_to_app</Icon>
            </ListItemIcon>
          </ListItem>
        </List>
      </Box>
    </Drawer>   
    )
}

export default Barra_deNavegacao;