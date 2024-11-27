import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const BudgetTracker = () => {
  const [income, setIncome] = useState<number | "">(0);
  const [expense, setExpense] = useState<number | "">(0);
  const [category, setCategory] = useState<string>('');
  const [savingsGoal, setSavingsGoal] = useState<number | "">(0);
  const [transactions, setTransactions] = useState<{
    id: number;
    income: number;
    expense: number;
    category: string;
    date: string;
  }[]>([]);

  const handleAddTransaction = () => {
    const newTransaction = {
      id: transactions.length,
      income: Number(income) || 0,
      expense: Number(expense) || 0,
      category,
      date: new Date().toLocaleDateString(),
    };
    setTransactions([...transactions, newTransaction]);
    setIncome(0);
    setExpense(0);
    setCategory('');
  };

  const data = [
    { name: 'Income', value: transactions.reduce((acc, curr) => acc + curr.income, 0) },
    { name: 'Expense', value: transactions.reduce((acc, curr) => acc + curr.expense, 0) },
  ];

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Budget Tracker
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center" paragraph>
          Manage your finances with ease
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Add Transaction
                </Typography>
                <TextField
                  label="Income"
                  type="number"
                  fullWidth
                  value={income}
                  onChange={(e) => setIncome(e.target.value === "" ? "" : Number(e.target.value))}
                  sx={{ mb: 2 }}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Expense"
                  type="number"
                  fullWidth
                  value={expense}
                  onChange={(e) => setExpense(e.target.value === "" ? "" : Number(e.target.value))}
                  sx={{ mb: 2 }}
                  InputLabelProps={{ shrink: true }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <MenuItem value="Groceries">Groceries</MenuItem>
                    <MenuItem value="Utilities">Utilities</MenuItem>
                    <MenuItem value="Entertainment">Entertainment</MenuItem>
                    <MenuItem value="Savings">Savings</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleAddTransaction}
                >
                  Add Transaction
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Savings Goal
                </Typography>
                <TextField
                  label="Savings Goal"
                  type="number"
                  fullWidth
                  value={savingsGoal}
                  onChange={(e) => setSavingsGoal(e.target.value === "" ? "" : Number(e.target.value))}
                  sx={{ mb: 2 }}
                  InputLabelProps={{ shrink: true }}
                />
                <Typography variant="body1">
                  Progress: ${transactions.reduce((acc, curr) => acc + curr.income - curr.expense, 0)} / ${savingsGoal}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom>
          Transactions
        </Typography>
        <List>
          {transactions.map((transaction) => (
            <ListItem key={transaction.id}>
              <ListItemText
                primary={`Income: $${transaction.income}, Expense: $${transaction.expense}, Category: ${transaction.category}`}
                secondary={`Date: ${transaction.date}`}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom>
          Data Visualization
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Container>
  );
};

export default BudgetTracker;
