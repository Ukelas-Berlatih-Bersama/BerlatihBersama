import axios from "axios";

export const login = ({ email, password }) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          "https://prod-qore-app.qorebase.io/project-authenticate/zZiznDFqublSQFo",
          {
            identifier: email,
            password: password,
          },
          {
            headers: {
              "X-Qore-Authentication": "Czt7dxVgaWaO4He",
              "Content-Type": "application/json",
            },
          }
        )
        .then(({ data }) => {
          dispatch({
            type: "LOGIN",
            payload: data,
          });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

export function logout() {
  return {
    type: "LOGOUT",
  };
}

export function register_siswa({
  email,
  password,
  nama,
  alamat,
  time,
  gender,
}) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          "https://prod-qore-app.qorebase.io/zZiznDFqublSQFo/allMember/forms/formRegistrasiSiswa",
          {
            email,
            password,
            nama,
            alamat,
            time,
            gender,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(({ data }) => {
          dispatch({
            type: "REGISTER",
            payload: data,
            value: "Anda sudah terdaftar",
          });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export function register_guru({ email, password, nama, alamat, time, gender }) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          "https://prod-qore-app.qorebase.io/zZiznDFqublSQFo/allMember/forms/formRegistrasiGuru",
          {
            email,
            password,
            nama,
            alamat,
            time,
            gender,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(({ data }) => {
          dispatch({
            type: "REGISTER",
            payload: data,
            value: "Anda sudah terdaftar",
          });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

// export function fetchData() {
//   return (dispatch, getState) => {
//     fetch()
//   }
// }
