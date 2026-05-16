import API from "./api";

export const getExpenses = async (token) => {
  const response = await API.get("/expenses", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createExpense = async (expenseData, token) => {
  const response = await API.post("/expenses", expenseData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateExpense = async (id, expenseData, token) => {
  const response = await API.put(`/expenses/${id}`, expenseData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteExpense = async (id, token) => {
  const response = await API.delete(`/expenses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};