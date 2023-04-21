import { Navigate, RouteObject, useRoutes } from 'react-router-dom'
import Version1 from './v1/index'
import Version2 from './v2'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/v1" />,
  },
  {
    path: '/v1',
    element: <Version1 />,
  },
  {
    path: '/v2',
    index: true,
    element: <Version2 />,
  },
]

export const App = () => {
  return useRoutes(routes)
}
