import { Icon, ListItem, ListItemIcon, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";


export const ItemSideBar = ({icon, to, location, pageName}) => {
    const isActive = location.pathname === to;

    const ativado = {
        content: '""',
        position: "absolute",
        left: 0,
        top: "10%",
        height: "80%",
        width: "4px",
        backgroundColor: "white",
        borderRadius: "0px 4px 4px 0px",
        
        
      }

      return(
        <ListItem component={Link} to={to} button={true} sx={{ justifyContent: "center", py: 1, "&::before": isActive? ativado : {}}}>
            <ListItemIcon sx={{ color: "white", minWidth: "auto" }}>
              <Tooltip title={pageName}><Icon>{icon}</Icon></Tooltip>
            </ListItemIcon>
        </ListItem>
      )
}

