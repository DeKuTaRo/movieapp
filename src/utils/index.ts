export const headers = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
};

export const convertErrorCodeToMessage = (errorCode: string): string => {
  if (errorCode === "auth/email-already-in-use") return "Your email is already in use.";
  if (errorCode === "auth/user-not-found") return "Your email may be incorrect.";
  if (errorCode === "auth/wrong-password") return "Your password is incorrect.";
  if (errorCode === "auth/invalid-email") return "Your email is invalid";
  if (errorCode === "auth/too-many-requests") return "You request too many times!";
  return "Something weird happened.";
};
