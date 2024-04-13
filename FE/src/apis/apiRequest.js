import registerSlice from "../Components/Register/registerSlice";

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerSlice.actions.startRegister());
  try {
    const res = await fetch("http://localhost:3000/api/v1/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json()
    dispatch(registerSlice.actions.registerSuccessful(data))
    navigate("/")
  } catch (err) {
        dispatch(registerSlice.actions.registerFail())
  }
};
