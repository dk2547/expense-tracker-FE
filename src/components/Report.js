import React, { useState, useEffect } from "react";
import apiService from "../service/expenseService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";

export default function Report() {
  const [yearMonth, setYearMonth] = useState("");
  const [monthYearList, setMonthYearList] = useState([]);
  const [monthlyBarData, setMonthlyBarData] = useState([]);
  const [monthlyContribution, setMonthlyContribution] = useState([]);
  const [reportData, setReport] = useState(null);
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    getTableData();
  }, []);

  const getTableData = async () => {
    try {
      const fetchedData = await apiService.getReport();
      setReport(fetchedData);
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    if (reportData) {
      createBarChartData();
    }
  }, [reportData]);

  const createBarChartData = () => {
    if (!reportData || !reportData.categoryWiseReport) {
      return;
    }
    const formattedData = reportData?.categoryWiseReport?.map((item) => ({
      name: item.monthYear,
      totalExpense: item.totalExpense,
    }));
    const yearMonthList = reportData?.categoryWiseReport?.map(
      (item) => item.monthYear
    );
    setMonthYearList(yearMonthList);
    setBarChartData(formattedData);
    setYearMonth(yearMonthList[yearMonthList.length - 1]);
  };

  const handleChange = (e) => {
    setYearMonth(e.target.value);
  };

  useEffect(() => {
    createMonthlyReport(yearMonth);
  }, [yearMonth]);

  const createMonthlyReport = (yearMonth) => {
    if (!yearMonth) {
      return;
    }
    const monthlyData = reportData.categoryWiseReport.find((item) => {
      return item.monthYear === yearMonth;
    });
    const monthlyBarData = [];
    for (let key in monthlyData.categoryWiseExpense) {
      monthlyBarData.push({
        name: key,
        monthlyExpense: monthlyData.categoryWiseExpense[key],
      });
      setMonthlyBarData(monthlyBarData);
    }
    const monthlyContributerData = reportData.contributorWiseReport.find(
      (item) => {
        return item.monthYear === yearMonth;
      }
    );
    const monthlyPieData = [];
    for (let key in monthlyContributerData.contributorWiseExpense) {
      monthlyPieData.push({
        name: key,
        value: monthlyContributerData.contributorWiseExpense[key],
      });
      setMonthlyContribution(monthlyPieData);
    }
  };

  const renderCustomizedLabel = ({ name, value }) => {
    return `${value} (${name})`;
  };

  return (
    <div>
      <BarChart width={730} height={250} data={barChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          interval={0}
          angle={-45}
          textAnchor="end"
          height={60}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalExpense" fill="#8884d8" />
      </BarChart>
      <div>
        <label>
          Monthly Expense:
          <select
            name="monthYear"
            value={yearMonth}
            onChange={handleChange}
            required
          >
            {monthYearList.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
        </label>
      </div>
      <div className="row">
        <div className="col-12">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart width={730} height={250} data={monthlyBarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                interval={0}
                angle={-45}
                textAnchor="end"
                height={150}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="monthlyExpense" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="col-6">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart width={730} height={250}>
              <Pie
                data={monthlyContribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                fill="#82ca9d"
                label={renderCustomizedLabel}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
