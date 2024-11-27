import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import {
  Save as SaveIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface ProjectTemplate {
  id: string;
  name: string;
  hourlyRate: number;
  hoursPerWeek: number;
  expenses: number;
  taxRate: number;
}

const FreelancerCalculator = () => {
  const [desiredAnnualIncome, setDesiredAnnualIncome] = useState<string>('60000');
  const [workingWeeks, setWorkingWeeks] = useState<string>('48');
  const [hoursPerWeek, setHoursPerWeek] = useState<string>('40');
  const [expenses, setExpenses] = useState<string>('500');
  const [taxRate, setTaxRate] = useState<string>('25');
  const [savedTemplates, setSavedTemplates] = useState<ProjectTemplate[]>([]);
  const [templateName, setTemplateName] = useState<string>('');

  const calculateHourlyRate = () => {
    const annualIncome = parseFloat(desiredAnnualIncome);
    const weeks = parseFloat(workingWeeks);
    const hours = parseFloat(hoursPerWeek);
    const monthlyExpenses = parseFloat(expenses);
    const tax = parseFloat(taxRate) / 100;

    const annualExpenses = monthlyExpenses * 12;
    const totalRequired = (annualIncome + annualExpenses) / (1 - tax);
    const hourlyRate = totalRequired / (weeks * hours);

    return hourlyRate.toFixed(2);
  };

  const saveTemplate = () => {
    if (!templateName) return;

    const newTemplate: ProjectTemplate = {
      id: Date.now().toString(),
      name: templateName,
      hourlyRate: parseFloat(calculateHourlyRate()),
      hoursPerWeek: parseFloat(hoursPerWeek),
      expenses: parseFloat(expenses),
      taxRate: parseFloat(taxRate),
    };

    setSavedTemplates([...savedTemplates, newTemplate]);
    setTemplateName('');
  };

  const deleteTemplate = (id: string) => {
    setSavedTemplates(savedTemplates.filter(template => template.id !== id));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Freelancer Rate Calculator
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Calculate Your Rate
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Desired Annual Income ($)"
                  type="number"
                  value={desiredAnnualIncome}
                  onChange={(e) => setDesiredAnnualIncome(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Working Weeks per Year"
                  type="number"
                  value={workingWeeks}
                  onChange={(e) => setWorkingWeeks(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Hours per Week"
                  type="number"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Monthly Expenses ($)"
                  type="number"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tax Rate (%)"
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                label="Template Name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={saveTemplate}
                disabled={!templateName}
              >
                Save Template
              </Button>
            </Box>
          </Paper>

          <Paper sx={{ mt: 3, p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Your Calculated Rate
            </Typography>
            <Typography variant="h3" color="primary">
              ${calculateHourlyRate()}/hr
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Saved Templates
            </Typography>
            {savedTemplates.map((template) => (
              <Card key={template.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">{template.name}</Typography>
                    <IconButton onClick={() => deleteTemplate(template.id)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Typography color="text.secondary">
                    ${template.hourlyRate}/hr
                  </Typography>
                  <Typography variant="body2">
                    {template.hoursPerWeek} hours/week
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FreelancerCalculator;
