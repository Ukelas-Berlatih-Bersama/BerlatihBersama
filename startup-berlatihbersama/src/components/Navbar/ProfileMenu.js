import React from "react";
import {
  MenuItem,
  MenuList,
  Typography,
  Avatar,
  IconButton,
  Paper,
  Popper,
  Grow,
  ClickAwayListener,
} from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/actions/actionUser";
import { useHistory } from "react-router-dom";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import qoreContext from "../../qoreContext";

import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

const ProfileMenu = function (props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const { user, status } = qoreContext.useCurrentUser();

  if(status === "success"){
    localStorage.setItem("user_id", user.data.id);
  }

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  const handleToProfile = () => {
    history.push("/profile");
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Avatar style={{ borderRadius: "4px", margin: "auto 1em" }} src="https://randomuser.me/api/portraits/men/20.jpg" onClick={handleToggle}>JD</Avatar>
      <div style={{ marginRight: "1em" }}>
        <Typography
          variant="body1"
          display="block"
          noWrap
          style={{ fontWeight: 500 }}
        >
          {status === "success" ? user.data.nama : <Skeleton variant="text" width={120}/>}
        </Typography>
        <Typography
          variant="caption"
          display="block"
          style={{ color: "#6B7380" }}
        >
          {status === "success" ? user.email : <Skeleton variant="text" width={120}/>}
        </Typography>
      </div>
      <IconButton
        onClick={handleToggle}
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
      >
        <ExpandMoreOutlinedIcon />
      </IconButton>
      <Popper
        open={open}
        placement="bottom-end"
        style={{
          width: 240,
          marginTop: 24,
        }}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-end" ? "right top" : "center bottom",
            }}
          >
            <Paper
              style={{
                boxShadow: "0px 4px 10px rgba(107, 115, 128, 0.05)",
                borderRadius: 4,
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleToProfile} style={{ padding: 16 }}>
                    <PersonOutlineOutlinedIcon style={{marginRight: 12}} /> Profile
                  </MenuItem>
                  <hr style={{borderTop: "1px solid #F3F4F6", borderBottom: 0, margin: "0 16px"}} />
                  <MenuItem
                    onClick={handleLogout}
                    style={{ color: "red", padding: 16 }}
                  >
                    <ExitToAppOutlinedIcon style={{marginRight: 12}} /> Keluar
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default ProfileMenu;
