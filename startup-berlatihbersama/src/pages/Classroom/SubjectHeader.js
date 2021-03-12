import { useEffect, useState } from "react";
import {
    TextField,
    Typography,
    Button,
    Modal,
    Box,
    ButtonGroup,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import qoreContext from "../../qoreContext";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    modal: {
        position: "absolute",
        outline: "none",
        width: 500,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
        borderRadius: 8,
        padding: theme.spacing(2, 4, 3),
    },
    buttonGroup: {
        marginTop: "2%",
    },
    root: {
        flexGrow: 1,
    },
    add: {
        display: "flex",
        margin: "25px 0 10px 0",
        justifyContent: "space-between",
    },
}));

const SubjectHeader = ({ subjectCount, subjectRevalidate }) => {
    const classes = useStyles();
    const { someClassroomId } = useParams();

    // states
    const [openFormAdd, setOpenFormAdd] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {

    });

    const { addRelation } = qoreContext
        .view("allClassroom")
        .useRelation(someClassroomId);
    const { insertRow } = qoreContext.view("allSubject").useInsertRow();

    const handleAddSubject = async (event) => {
        event.preventDefault();
        await insertRow({
            name: name,
        }).then((data) => {
            return addRelation({
                subject: [data.id],
            });
        });
        subjectRevalidate();
        setOpenFormAdd(false);
        setName("");
    }

    const formAdd = (
        <Modal
            open={openFormAdd}
            onClose={() => setOpenFormAdd(false)}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <form onSubmit={handleAddSubject} className={classes.modal} >
                <Typography variant="h6" style={{ marginBottom: 10 }}>
                    Buat Mata Pelajaran
            </Typography>
                <Typography variant="content">Nama Mata Pelajaran</Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    placeholder="Masukan Nama Mata Pelajaran"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ margin: "8px 0 20px 0" }}
                ></TextField>
                <ButtonGroup style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        variant="text"
                        style={{ color: "GrayText", paddingRight: 30 }}
                        onClick={() => setOpenFormAdd(false) }
                        size="small"
                    >
                        Batal
              </Button>
                    <Button color="primary" variant="text" size="small" type="submit">
                        Buat Mata Pelajaran
              </Button>
                </ButtonGroup>
            </form>
        </Modal>
    );

    return (
        <Box display="flex" justifyContent="space-between" my={5}>
            <Typography variant="h6">
                Semua Mata Pelajaran ({subjectCount})
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenFormAdd(true)}
            >
                Tambah Mata Pelajaran Baru
            </Button>
            {formAdd}
        </Box>
    )
};

export default SubjectHeader;