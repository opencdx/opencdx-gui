// material-ui
import { CardContent, Grid, Skeleton, Stack } from '@mui/material';

// project import
import MainCard from '../MainCard';

// ===========================|| SKELETON TOTAL GROWTH BAR CHART ||=========================== //

const ANFStatementPlaceholder = () => (
    <MainCard content={false} boxShadow>
        <CardContent sx={{ p: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" height={25} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" height={25} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" height={25} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" height={25} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" height={25} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" height={25} />
                </Grid>
            </Grid>
        </CardContent>
        <Grid item xs={12} sx={{ p: '8px !important' }}>
            <Skeleton variant="rectangular" height={60} />
        </Grid>
        <Grid item xs={12} sx={{ p: '8px !important' }}>
            <Skeleton variant="rectangular" height={60} />
        </Grid>
        <Grid item xs={12} sx={{ p: '8px !important' }}>
            <Stack direction="row" alignItems="center" spacing={1}>
                <Skeleton variant="rectangular" height={50} width={90} />
            </Stack>
        </Grid>
    </MainCard>
);

export default ANFStatementPlaceholder;
