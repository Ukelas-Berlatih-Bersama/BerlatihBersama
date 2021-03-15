import React from "react";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Popper,
  Grow,
  ClickAwayListener,
  Paper,
  Typography,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: { width: 380 },
  paper: {
    border: "1px solid #E6E7EB",
    boxSizing: "border-box",
    boxShadow: "0px 1px 8px rgba(107, 115, 128, 0.1)",
    borderRadius: 4,
    backgroundColor: theme.palette.background.paper,
  },
  notificationHeader: {
    padding: 16,
    borderBottom: "1px solid #E6E7EB",
  },
  notificationBody: {},
}));

const NotificationMenu = function (props) {
  const [open, setOpen] = React.useState(false);
  // TODO: get notifications data from backend
  const [notifications, SetNotifications] = React.useState([
    {
      id: 1,
      title: "Permintaan Terkirim",
      message: "Permintaan gabung kelas #CCC245 sedang menunggu persetujuan",
      createdAt: "Hari ini",
    },
    {
      id: 2,
      title: "Permintaan Terkirim",
      message: "Permintaan gabung kelas #CCC245 sedang menunggu persetujuan",
      createdAt: "Hari ini",
    },
  ]);

  const classes = useStyles();
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

  // TODO: make this to individual component
  const NotificationLists = (
    <MenuList className={classes.notificationBody}>
      {notifications.map((notification) => {
        return (
          <MenuItem key={notification.id}>
            <Avatar style={{ marginRight: 12 }} background="primary">
              <NotificationsNoneOutlinedIcon />
            </Avatar>
            <Typography noWrap>
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                {notification.title}
              </Typography>
              <Typography variant="body2" noWrap>
                {notification.message}
              </Typography>
              <Typography variant="caption" color="primary">
                {notification.createdAt}
              </Typography>
            </Typography>
          </MenuItem>
        );
      })}
    </MenuList>
  );

  // TODO: make this to individual component
  const NotificationEmpty = (
    <Box style={{padding: 64, color: "gray"}}>
      <Typography align="center">Belum ada notifikasi</Typography>
    </Box>
  );

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
          badgeContent={notifications.length}
          color="secondary"
          overlap="circle"
        >
          <NotificationsNoneOutlinedIcon />
        </Badge>
      </IconButton>
      <Popper
        open={open}
        placement="bottom-end"
        className={classes.root}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: "right top",
            }}
          >
            <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    className={classes.notificationHeader}
                  >
                    <Typography>Pemberitahuan</Typography>
                    <Link
                      to="/notifications"
                      style={{ textDecoration: "none" }}
                    >
                      <Typography color="primary">Lihat Semua</Typography>
                    </Link>
                  </Box>
                  {notifications.length > 1
                    ? NotificationLists
                    : NotificationEmpty}
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default NotificationMenu;
