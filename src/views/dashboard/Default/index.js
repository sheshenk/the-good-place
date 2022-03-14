import { useEffect, useState } from 'react';

// material-ui
import { Grid, CircularProgress } from '@mui/material';

// project imports
import TotalHoursCard from './TotalHoursCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import { useAuthListener } from 'views/firebaseAuth/firebaseSvc';
import { Navigate } from 'react-router';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    const { loggedIn, checkingStatus } = useAuthListener();

    if (checkingStatus) return <CircularProgress/>

    if (!loggedIn) return <Navigate to='/login'/>

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={6}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TotalHoursCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
