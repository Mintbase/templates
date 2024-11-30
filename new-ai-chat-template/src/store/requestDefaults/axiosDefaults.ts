// axios header for form data without Bearer JWT token and with csrf token
export const HEADERS = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const CHAT_HEADERS = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.MB_API_KEY}`,
};
