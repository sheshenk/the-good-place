import { Route, Routes } from "react-router-dom"
import AppDashboard from '../pages/AppDashboard/AppDashboard'
import AppProfile from '../pages/AppProfile/AppProfile'

export const AppRoutes = ({dwidth}) => {
    return (
        <Routes>
            <Route exact path='/' element={<AppDashboard drawerWidth={dwidth} />} />
            <Route exact path='/dashboard' element={<AppDashboard drawerWidth={dwidth} />} />
            <Route path='/profile' element={<AppProfile drawerWidth={dwidth} />} />
        </Routes>
    )
}