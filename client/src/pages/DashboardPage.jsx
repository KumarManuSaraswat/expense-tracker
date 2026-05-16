import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../services/expenseService";
import "../index.css";

function DashboardPage() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: "",
    note: "",
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses(token);
      setExpenses(data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch expenses");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      amount: "",
      category: "Food",
      date: "",
      note: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        amount: Number(formData.amount),
      };

      if (editingId) {
        await updateExpense(editingId, payload, token);
      } else {
        await createExpense(payload, token);
      }

      resetForm();
      fetchExpenses();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to save expense");
    }
  };

  const handleEdit = (expense) => {
    setEditingId(expense._id);
    setFormData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date ? expense.date.split("T")[0] : "",
      note: expense.note || "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id, token);
      fetchExpenses();
    } catch (error) {
      console.error(error);
      alert("Failed to delete expense");
    }
  };

  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);

  const categoryTotals = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  return (
    <div className="page">
      <div className="topbar">
        <div>
          <h1>Expense Tracker</h1>
          <p>Welcome, {user?.name}</p>
        </div>
        <button className="btn btn-outline" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="summary-card">
        <h2>Total Expense</h2>
        <p className="total-amount">₹{totalExpense}</p>
      </div>

      <div className="grid-layout">
        <div className="card">
          <h3>{editingId ? "Edit Expense" : "Add Expense"}</h3>

          <form onSubmit={handleSubmit} className="expense-form">
            <input
              type="text"
              name="title"
              placeholder="Expense title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Study">Study</option>
              <option value="Bills">Bills</option>
              <option value="Shopping">Shopping</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />

            <input
              type="text"
              name="note"
              placeholder="Note"
              value={formData.note}
              onChange={handleChange}
            />

            <div className="form-actions">
              <button className="btn btn-primary" type="submit">
                {editingId ? "Update Expense" : "Add Expense"}
              </button>

              {editingId && (
                <button
                  className="btn btn-outline"
                  type="button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="card">
          <h3>Category Summary</h3>
          {Object.keys(categoryTotals).length === 0 ? (
            <p className="muted-text">No expenses yet.</p>
          ) : (
            <ul className="summary-list">
              {Object.entries(categoryTotals).map(([category, amount]) => (
                <li key={category}>
                  <span>{category}</span>
                  <strong>₹{amount}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="card">
        <h3>Your Expenses</h3>

        {expenses.length === 0 ? (
          <p className="muted-text">No expenses yet.</p>
        ) : (
          <div className="expense-list">
            {expenses.map((expense) => (
              <div key={expense._id} className="expense-item">
                <div>
                  <h4>{expense.title}</h4>
                  <p className="muted-text">
                    {expense.category} • ₹{expense.amount}
                  </p>
                  <p className="muted-text">
                    {new Date(expense.date).toLocaleDateString()}
                  </p>
                  {expense.note && <p>{expense.note}</p>}
                </div>

                <div className="item-actions">
                  <button
                    className="btn btn-outline"
                    onClick={() => handleEdit(expense)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(expense._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;