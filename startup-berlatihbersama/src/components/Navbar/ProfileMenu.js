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
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/actions/actionUser";
import { useHistory, Link } from "react-router-dom";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import qoreContext from "../../qoreContext";

const ProfileMenu = function (props) {
  const dispatch = useDispatch();
  const history = useHistory();
  //   const { user, status } = qoreContext.useCurrentUser();

  //   console.log(user, ">>> profile data");
  //   console.log(status, ">>> status");

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };

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
      <Avatar style={{ borderRadius: "4px", margin: "auto 1em" }}>N</Avatar>
      <div style={{ marginRight: "1em" }}>
        <Typography
          variant="body"
          display="block"
          noWrap
          style={{ fontWeight: 500 }}
        >
          John Doe
        </Typography>
        <Typography
          variant="caption"
          display="block"
          style={{ color: "#6B7380" }}
        >
          john.doe@gmail.com
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
        style={{ zIndex: 1500 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout} style={{ color: "red" }}>
                    Keluar
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
