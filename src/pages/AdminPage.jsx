import { useState } from "react";

function AdminPage() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const orders = [
    { id: 1, customer: "Abrar", product: "Pizza", amount: 299, status: "Delivered" },
    { id: 2, customer: "Rahul", product: "Burger", amount: 149, status: "Pending" },
    { id: 3, customer: "Priya", product: "Biryani", amount: 249, status: "Delivered" },
    { id: 4, customer: "Sneha", product: "Pasta", amount: 199, status: "Cancelled" },
    { id: 5, customer: "Amit", product: "Sandwich", amount: 129, status: "Pending" },
  ];

  return (
    <div className="admin-page">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>

        <button
          className={activeMenu === "dashboard" ? "active-menu" : ""}
          onClick={() => setActiveMenu("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={activeMenu === "orders" ? "active-menu" : ""}
          onClick={() => setActiveMenu("orders")}
        >
          Orders
        </button>

        <button
          className={activeMenu === "analytics" ? "active-menu" : ""}
          onClick={() => setActiveMenu("analytics")}
        >
          Analytics
        </button>
      </div>

      <div className="admin-main">
        <div className="admin-header">
          <h1>Admin Dashboard SaaS</h1>
          <p>Manage orders, users, revenue and analytics</p>
        </div>

        {activeMenu === "dashboard" && (
          <>
            <div className="dashboard-cards">
              <div className="dash-card">
                <h3>Total Users</h3>
                <h1>1,250</h1>
                <p>+12% this month</p>
              </div>

              <div className="dash-card">
                <h3>Total Sales</h3>
                <h1>₹85,000</h1>
                <p>+18% growth</p>
              </div>

              <div className="dash-card">
                <h3>Total Orders</h3>
                <h1>320</h1>
                <p>45 pending</p>
              </div>

              <div className="dash-card">
                <h3>Revenue</h3>
                <h1>₹1.2L</h1>
                <p>Best month</p>
              </div>
            </div>

            <div className="chart-section">
              <h2>Sales Analytics</h2>

              <div className="bar-chart">
                <div className="bar" style={{ height: "65%" }}>
                  <span>Jan</span>
                </div>

                <div className="bar" style={{ height: "45%" }}>
                  <span>Feb</span>
                </div>

                <div className="bar" style={{ height: "85%" }}>
                  <span>Mar</span>
                </div>

                <div className="bar" style={{ height: "55%" }}>
                  <span>Apr</span>
                </div>

                <div className="bar" style={{ height: "75%" }}>
                  <span>May</span>
                </div>

                <div className="bar" style={{ height: "95%" }}>
                  <span>Jun</span>
                </div>
              </div>
            </div>
          </>
        )}

        {activeMenu === "orders" && (
          <div className="table-box admin-table-box">
            <h2>Recent Orders</h2>

            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.customer}</td>
                    <td>{order.product}</td>
                    <td>₹{order.amount}</td>
                    <td>
                      <span
                        className={
                          order.status === "Delivered"
                            ? "status delivered"
                            : order.status === "Pending"
                            ? "status pending"
                            : "status cancelled"
                        }
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeMenu === "analytics" && (
          <div className="analytics-section">
            <div className="analytics-card">
              <h2>Daily Visitors</h2>
              <h1>12,500</h1>
              <p>Website traffic overview</p>
            </div>

            <div className="analytics-card">
              <h2>Conversion Rate</h2>
              <h1>68%</h1>
              <p>Users converted into customers</p>
            </div>

            <div className="analytics-card">
              <h2>Returning Users</h2>
              <h1>4,200</h1>
              <p>Customer retention count</p>
            </div>

            <div className="analytics-card">
              <h2>Avg. Order Value</h2>
              <h1>₹420</h1>
              <p>Average sales per order</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;