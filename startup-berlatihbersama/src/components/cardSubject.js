import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  Typography,
  CardContent,
  Button,
  CircularProgress,
  Modal,
  TextField,
  MenuItem,
  Menu,
  ButtonGroup,
} from "@material-ui/core";
import qoreContext from "../qoreContext";
import { Link } from "react-router-dom";
import { MoreVert } from "@material-ui/icons";

function getModalStyle() {
  return {
    margin: "-5% 10px",
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2em",
    alignContent: "center",
    // backgroundColor: "#f5f5f5",
  },
  modal: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid blue",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
  },
  media: {
    height: 50,
  },
}));

export default function CardSubject(props) {
  const { subject } = props;
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  // states
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openFormEdit, setOpenFormEdit] = useState(false);
  const [name, setName] = useState(subject.name);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  
  const { updateRow, status } = qoreContext.view("allSubject").useUpdateRow();

  const { deleteRow } = qoreContext.view("allSubject").useDeleteRow();

  const handleEdit = async (event) => {
    event.preventDefault();
    setIsloading(true);
    await updateRow(subject.id, { name: name });
    props.onUpdated();
    setIsloading(false);
    handleClose();
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    setIsloading(true);
    await deleteRow(subject.id).then((data) => {
      if (data == true) {
        props.onUpdated();
        setIsloading(false);
        handleClose();
      }
    });
  };

  const handleOpenEdit = () => setOpenFormEdit(true);
  const handleOpnConfirm = () => setOpenConfirm(true);

  const handleClose = () => {
    setOpenConfirm(false);
    setOpenFormEdit(false);
    setAnchorEl(null);
  };

  const handleMore = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const editForm = (
    <Modal
      open={openFormEdit}
      onClose={handleClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form onSubmit={handleEdit} className={classes.modal} style={modalStyle}>
        <Typography variant="h6" style={{ marginBottom: 10 }}>
          Edit Mata Pelajaran
        </Typography>
        <Typography variant="content">Nama Mata Pelajaran</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="name"
          placeholder="Nama Mata Pelajaran"
          name="name"
          value={name}
          fullWidth
          onChange={(e) => setName(e.target.value)}
          style={{ margin: "8px 0 15px 0" }}
        ></TextField>
        <ButtonGroup
          size="small"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            style={{ color: "GrayText", marginRight: "1em" }}
            color="primary"
            variant="text"
            onClick={handleClose}
          >
            Batal
          </Button>
          <Button variant="text" color="primary" type="submit" {...isLoading ? "disabled":null}>
          {isLoading ? <CircularProgress size={18} style={{marginRight:10}}/>:null}
            Simpan
          </Button>
        </ButtonGroup>
      </form>
    </Modal>
  );

  const deleteConfirmationDialog = (
    <Modal
      open={openConfirm}
      onClose={handleClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={modalStyle} className={classes.modal}>
        <Typography variant="h6" id="simple-modal-title">
          Hapus {subject.displayField}?
        </Typography>
        <Typography
          variant="subtitle2"
          id="simple-modal-description"
          style={{ color: "gray", margin: "15px 0 15px 0" }}
        >
          Anda yakin untuk menghapus {subject.displayField}? Setelah dihapus,
          semua data {subject.displayField} akan terhapus.
        </Typography>
        <ButtonGroup
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
          size="small"
        >
          <Button variant="text" color="primary" onClick={handleClose} style={{color: "GrayText", marginRight: "1em"}}>
            Batal
          </Button>
          <Button variant="text" color="secondary" onClick={handleDelete}  {...isLoading ? "disabled":null}>
          {isLoading ? <CircularProgress size={18} style={{marginRight:10}} color="secondary"/>:null}
            Hapus
          </Button>
        </ButtonGroup>
      </div>
    </Modal>
  );

  return (
    <Card className={classes.root}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link
          to={`/subject/${subject.id}`}
          style={{ textDecoration: "none", color: "black", width: "80%" }}
        >
          <CardActionArea>
            <CardContent>
              <Typography color="primary" variant="h6">
                {subject.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleMore}
        >
          <MoreVert />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleOpenEdit} style={{ color: "blue" }}>
            Edit
          </MenuItem>

          <MenuItem onClick={handleOpnConfirm} style={{ color: "red" }}>
            Hapus
          </MenuItem>
        </Menu>
        {editForm}
        {deleteConfirmationDialog}
      </div>
    </Card>
  );
}
