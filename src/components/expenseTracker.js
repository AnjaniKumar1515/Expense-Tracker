import React, { useState } from "react";
import { registerables } from "chart.js";
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import "./expense.css";
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Modal,
} from "@mui/material";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    date: "",
  });
  const [editExpense, setEditExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    setNewExpense({
      ...newExpense,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddExpense = () => {
    setExpenses([...expenses, newExpense]);
    setNewExpense({
      description: "",
      amount: "",
      date: "",
    });
  };

  const handleDeleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const handleEditExpense = (index) => {
    setEditExpense(index);
    setIsModalOpen(true);
  };

  const handleSaveEditExpense = () => {
    setExpenses(
      expenses.map((expense, index) =>
        index === editExpense ? { ...newExpense } : expense
      )
    );
    setIsModalOpen(false);
    setEditExpense(null);
    setNewExpense({
      description: "",
      amount: "",
      date: "",
    });
  };

  const chartData = {
    labels: expenses.map((expense) => expense.description),
    datasets: [
      {
        label: "Expenses",
        data: expenses.map((expense) => expense.amount),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <div>
      <Box mb={3} className="heading">
        <Typography variant="h3">Expense Tracker</Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        className="task_description"
      >
        <Box className="task_fields">
          <TextField
            name="description"
            label="Description"
            value={newExpense.description}
            onChange={handleInputChange}
          />
          <TextField
            name="amount"
            label="Amount"
            type="number"
            value={newExpense.amount}
            onChange={handleInputChange}
          />
          <TextField
            name="date"
            label="Date"
            type="date"
            value={newExpense.date}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button variant="contained" onClick={handleAddExpense}>
            Add Expense
          </Button>
        </Box>
        <Box width="50%">
          <Pie data={chartData} />
        </Box>
      </Box>
      <Box mt={3} className="table_div">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense, index) => (
                <TableRow key={index}>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditExpense(index)}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteExpense(index)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            minWidth: 400,
          }}
        >
          <Typography variant="h5">Edit Expense</Typography>
          <TextField
            name="description"
            label="Description"
            value={newExpense.description}
            onChange={handleInputChange}
          />
          <TextField
            name="amount"
            label="Amount"
            type="number"
            value={newExpense.amount}
            onChange={handleInputChange}
          />
          <TextField
            name="date"
            label="Date"
            type="date"
            value={newExpense.date}
            onChange={handleInputChange}
          />
          <Button variant="contained" onClick={handleSaveEditExpense}>
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ExpenseTracker;
