const Record = require("../models/Record");

exports.getSummary = async (req, res) => {
  try {
    const records = await Record.find();

    let income = 0;
    let expense = 0;

    const categoryTotals = {};
    const recent = records.slice(-5); 

    const monthly = {};

    records.forEach((r) => {
      // Income & Expense
      if (r.type === "income") income += r.amount;
      else expense += r.amount;

      // Category wise
      categoryTotals[r.category] = (categoryTotals[r.category] || 0) + r.amount;

      // Monthly trends
      const month = new Date(r.date).toLocaleString("default", {
        month: "short",
      });

      monthly[month] = (monthly[month] || 0) + r.amount;
    });

    return res.status(200).json({
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
      categoryTotals,
      recentActivity: recent,
      monthlyTrends: monthly,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
