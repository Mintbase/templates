"use client";

import { Toaster, ToastBar, toast } from "react-hot-toast";

export const Alert = () => {
  const IS_DEBUG_MODE =
    global?.window &&
    (window.location.href.includes("localhost") ||
      window.location.href.includes("vercel.app"));

  if (!IS_DEBUG_MODE) return null;

  return (
    <Toaster
      toastOptions={{
        style: {
          border: "1px solid #713200",
          padding: "26px",
          color: "#333",
          background: "#dedede",
          fontSize: "10px",
          width: "300px",
          display: "inline-table",
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {t.type !== "loading" && (
                <button onClick={() => toast.dismiss(t.id)}>Close</button>
              )}
              {icon}
              {message}
            
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};
