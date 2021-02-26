import React from "react";
import {
  Badge,
  IconButton,
  Popper,
  Grow,
  ClickAwayListener,
  Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";

const useStyles = makeStyles((theme) => ({
  paper: {
    border: "1px solid #E6E7EB",
    boxSizing: "border-box",
    boxShadow: "0px 1px 8px rgba(107, 115, 128, 0.1)",
    borderRadius: 4,
    padding: 16,
    backgroundColor: theme.palette.background.paper,
  },
}));

const NotificationMenu = function (props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <IconButton
        type="button"
        onClick={handleToggle}
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
      >
        <Badge
          color="secondary"
          badgeContent={0}
          color="secondary"
          overlap="circle"
        >
          <NotificationsNoneOutlinedIcon />
        </Badge>
      </IconButton>
      <Popper
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
                <div className={classes.paper}>Tidak ada notifikasi</div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default NotificationMenu;
