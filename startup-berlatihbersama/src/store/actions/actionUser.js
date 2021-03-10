import axios from "axios";
import { client } from "../../qoreContext";

export const login = ({ email, password }) => {
  return (dispatch) => {
    return client
      .authenticate(email, password)
      .then((token) => {
        dispatch({
          type: "LOGIN",
          payload: { token, email },
        });
      })
      .catch((error) => {
        console.dir(error);
        if (error.message === "Request failed with status code 401") {
          dispatch({
            type: "AUTH_ERROR",
            payload: `Password yang Anda masukkan tidak cocok dengan email ${email}. Cek kembali password yang Anda masukkan`,
          });
        }
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
