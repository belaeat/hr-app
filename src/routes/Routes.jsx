import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root/Root";
import Login from "../pages/Login/Login";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import List from "../pages/List/List";
import Form from "../pages/Form/Form";
import EmployeeDetail from "../pages/EmployeeDetail/EmployeeDetail";

const createRoutes = (isLoggedIn, loginHandler) => {
  return createBrowserRouter(
    [
      {
        path: "/",
        element: isLoggedIn ? (
          <Root isLoggedIn={isLoggedIn} loginHandler={loginHandler} />
        ) : (
          <Login loginHandler={loginHandler} />
        ),
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            element: <List />,
          },
          {
            path: "employees",
            element: <List></List>,
          },
          {
            path: "/employees/:id",
            element: <EmployeeDetail />,
          },
          {
            path: "/new",
            element: <Form />,
          },
        ],
      },
    ],
    {
      future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );
};

export default createRoutes;
