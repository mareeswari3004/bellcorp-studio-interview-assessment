import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchTransactions = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/transactions",
      { headers: { Authorization: token } }
    );
    setTransactions(res.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSubmit = async () => {
    if (editId) {
      await axios.put(
        `http://localhost:5000/api/transactions/${editId}`,
        { title, amount, category, date: new Date() },
        { headers: { Authorization: token } }
      );
      setEditId(null);
    } else {
      await axios.post(
        "http://localhost:5000/api/transactions",
        { title, amount, category, date: new Date() },
        { headers: { Authorization: token } }
      );
    }

    setTitle("");
    setAmount("");
    setCategory("");
    fetchTransactions();
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/transactions/${id}`,
      { headers: { Authorization: token } }
    );
    fetchTransactions();
  };

  const handleEdit = (t) => {
    setTitle(t.title);
    setAmount(t.amount);
    setCategory(t.category);
    setEditId(t._id);
  };

  const total = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="container mt-5">

      <div className="card shadow-lg p-4">
        <h2 className="text-center text-primary mb-4">
          💰 Expense Dashboard
        </h2>

        <h4 className="text-success">
          Total Expense: ₹{total}
        </h4>

        <div className="row mt-4">
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <button
              className={`btn ${editId ? "btn-warning" : "btn-primary"} w-100`}
              onClick={handleSubmit}
            >
              {editId ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>

      <div className="card shadow-lg mt-4 p-4">
        <table className="table table-striped table-hover text-center">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr key={t._id}>
                <td>{t.title}</td>
                <td className="text-danger">₹{t.amount}</td>
                <td>{t.category}</td>
                <td>{new Date(t.date).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => handleEdit(t)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(t._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Dashboard;
