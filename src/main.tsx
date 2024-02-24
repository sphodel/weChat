import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ErrorPage from "./error-page.tsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Chatui from "./chatui.tsx";
import { ApolloProvider } from "@apollo/client";
import AddFriend from "./NewFriend.tsx";
import { client } from "./client.ts";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "chatui",
    element: <Chatui />,
  },
  {
    path: "AddFriend",
    element: <AddFriend />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
);
