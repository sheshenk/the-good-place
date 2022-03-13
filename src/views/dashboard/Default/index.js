import { useEffect, useState } from 'react';

// material-ui
import { Button, Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import firebaseSvc, { useAuthListener } from 'views/firebaseAuth/firebaseSvc';
import { Navigate } from 'react-router';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    const { loggedIn, checkingStatus } = useAuthListener();

    if (!loggedIn) return <Navigate to='/pages/login/login3'/>

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={12} md={12} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} />
                        <Button onClick={() => {                            
                            const user = firebaseSvc.currentUser();
                            firebaseSvc.matchProjectCurrentUser(user);
                        }}>
                        CLICK ME
                        </Button>
                    </Grid>
                    {/* <Grid item lg={6} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} />
                    </Grid> */}
                    {/* <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid> */}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid>
                    {/* <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid> */}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
