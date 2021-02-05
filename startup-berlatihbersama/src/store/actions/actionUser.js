import axios from "axios";

export const login = ({ email, password }) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          "https://prod-qore-app.qorebase.io/project-authenticate/zZiznDFqublSQFo",
          {
            identifier: email,
            password,
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

export function register(payload) {
  return (dispatch) => {
    fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getAllMember(params) {}
