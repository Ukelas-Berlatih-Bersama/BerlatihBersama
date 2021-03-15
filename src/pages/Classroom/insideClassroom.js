import React from "react";
import {
  Box,
  Typography,
  Grid,
  Container,
  Tabs,
  Tab,
} from "@material-ui/core";
import qoreContext from "../../qoreContext";
import { useParams } from "react-router-dom";
import CardSubject from "../../components/cardSubject";
import { AccountCircle } from "@material-ui/icons";
import RoomHeader from "./RoomHeader";
import SubjectHeader from "./SubjectHeader";

export default function InsideClassroom() {
  const { someClassroomId } = useParams();
  const [toogle, setToogle] = React.useState(0);

  const {
    data: classroom,
    status,
    revalidate: roomRevalidate,
  } = qoreContext.view("allClassroom").useGetRow(someClassroomId);

  const { data: subjects, revalidate: subjectRevalidate } = qoreContext
    .view("classroomSubject")
    .useListRow(
      {
        roomId: someClassroomId,
      },
      { networkPolicy: "cache-only" }
    );

  const handleSwitch = (e, newValue) => {
    setToogle(newValue);
  };

  return (
    <>
      {status == "success" ? (
        <>
          <RoomHeader room={classroom} onUpdated={roomRevalidate} />
          <main style={{ flexGrow: 1 }}>
            <Container maxWidth="lg">
              <Tabs
                value={toogle}
                onChange={handleSwitch}
                indicatorColor="primary"
                textColor="primary"
                centered
                variant="fullWidth"
              >
                <Tab style={{ width: "100%" }} label="Mata Pelajaran" />
                <Tab style={{ width: "100%" }} label="Anggota Kelas" />
              </Tabs>

              <div>
                {toogle == 0 ? (
                  <>
                    <SubjectHeader
                      subjectCount={subjects.length}
                      subjectRevalidate={subjectRevalidate}
                    />
                    <Grid container spacing={2}>
                      {subjects.map((subject) => {
                        return (
                          <Grid item sm={12} lg={3}>
                            <CardSubject
                              subject={subject}
                              onUpdated={subjectRevalidate}
                              key={subject.id}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </>
                ) : (
                  <Box my={5}>
                      <Box
                        elevation={0}
                      >
                        <div
                          style={{
                            borderBottom: "1px solid rgba(171, 183, 183, 1)",
                            padding: "10px 0 10px 0",
                          }}
                        >
                          <Typography
                            variant="body1"
                            style={{ fontWeight: "bold" }}
                          >
                            Guru ({classroom.teacher.totalCount})
                          </Typography>
                        </div>
                        {classroom.teacher.nodes.map((nod) => {
                          return (
                            <div
                              style={{
                                display: "flex",
                                marginTop: 10,
                                color: "#424242",
                              }}
                            >
                              <AccountCircle />
                              <Typography style={{ marginLeft: 5 }}>
                                {nod.displayField}
                              </Typography>
                            </div>
                          );
                        })}
                      </Box>
                      <Box mt={4}>
                        <div
                          style={{
                            borderBottom: "1px solid rgba(171, 183, 183, 1)",
                            padding: "10px 0 10px 0",
                          }}
                        >
                          <Typography
                            variant="body1"
                            style={{ fontWeight: "bold" }}
                          >
                            Siswa ({classroom.student.totalCount})
                          </Typography>
                        </div>
                        {classroom.student.nodes.map((nod) => {
                          return (
                            <div
                              style={{
                                display: "flex",
                                marginTop: 10,
                                color: "#424242",
                              }}
                            >
                              <AccountCircle />
                              <Typography style={{ marginLeft: 5 }}>
                                {nod.displayField}
                              </Typography>
                            </div>
                          );
                        })}
                      </Box>
                  </Box>
                )}
              </div>
            </Container>
          </main>
        </>
      ) : null}
    </>
  );
}
