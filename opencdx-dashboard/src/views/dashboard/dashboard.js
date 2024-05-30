// material-ui
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Stack, Grid } from '@mui/material';
import { Button } from '@mui/material';
// project imports
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Switch from '@mui/material/Switch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionActions from '@mui/material/AccordionActions';
import Radio from '@mui/material/Radio';

import MainCard from 'components/ui-component/cards/MainCard';
import { Divider } from '../../../node_modules/@mui/material/index';

// ==============================|| SAMPLE PAGE ||============================== //
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Dashboard = () => (
  <MainCard >
    <Grid container spacing={2} direction="column" sx={{ p: 3 }} >

      <Stack spacing={2} direction="row" sx={{ mt: 2 }} title="Buttons">
        <Typography variant="h6">
          Buttons
        </Typography>
        <Button variant="text"><Typography variant="subtitle1">
          Text
        </Typography></Button>
        <Button variant="contained"><Typography variant="subtitle1">
          Contained
        </Typography></Button>
        <Button variant="outlined"><Typography variant="subtitle1">
          Outlined
        </Typography></Button>
      </Stack>
      <Divider/>
      <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
        <Typography variant="h6">
          Checkboxes
        </Typography>
        <Checkbox {...label} defaultChecked />
        <Checkbox {...label} />
      </Stack>
      <Divider />


      <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
        <Typography variant="h6">
          Radio Buttons
        </Typography>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      </Stack>
      <Divider />

      <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
        <Typography variant="h6">
          Switches
        </Typography>
        <Switch {...label} defaultChecked />
        <Switch {...label} defaultChecked color="secondary" />
        <Switch {...label} defaultChecked color="warning" />
        <Switch {...label} defaultChecked color="default" />

      </Stack>
      <Divider />

      <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
        <Typography variant="h6">
          Accordion
        </Typography>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Accordion 1
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            Accordion 2
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            Accordion Actions
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
          <AccordionActions>
            <Button>Cancel</Button>
            <Button>Agree</Button>
          </AccordionActions>
        </Accordion>
      </Stack>

    </Grid>
  </MainCard>
);

export default Dashboard;
