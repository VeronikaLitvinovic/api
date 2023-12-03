import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import SignUp from './routes/SignUp.jsx';
import Login from './routes/Login.jsx';
import Layout from './routes/Layout.jsx';
import Notes from './routes/Notes.jsx';
import About from './routes/About.jsx';
import UserContextProvider from './components/UserContextProvider.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import CreateNote from './routes/CreateNote.jsx';
import ViewNote from './routes/ViewNote.jsx';
import EditNote from './routes/EditNote.jsx';

const router = createBrowserRouter([
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/notes',
        element: <Notes />,
      },
      {
        path: '/createNote',
        element: <CreateNote />,
      },
      {
        path: '/viewNote',
        element: <ViewNote />,
      },
      {
        path: '/editNote',
        element: <EditNote />,
      },
    ],
  },
]);

export default function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}