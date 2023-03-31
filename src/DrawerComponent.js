import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { Home as HomeIcon, Settings as SettingsIcon, Chat as ChatIcon } from "@mui/icons-material";

function DrawerComponent({ open, onClose }) {
  const navigate = useNavigate();
  const handleMenuClick = (index) => {
    switch (index) {
      case 0:
        // Homeがクリックされたときの処理
        navigate("/");
        onClose();
        break;
      case 1:
        // Chatがクリックされたときの処理
        navigate("/chat");
        onClose();
        break;
      case 2:
        // Settingsがクリックされたときの処理
        navigate("/settings");
        onClose();
        break;
      default:
        break;
    }
  };

  const menuItems = [
    { label: "Home", icon: <HomeIcon />, onClick: () => handleMenuClick(0) },
    { label: "Chat", icon: <ChatIcon />, onClick: () => handleMenuClick(1) },
    { label: "Settings", icon: <SettingsIcon />, onClick: () => handleMenuClick(2) },
  ];

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        {menuItems.map((item, index) => (
          <ListItemButton
            key={index}
            button
            onClick={item.onClick}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

export default DrawerComponent;