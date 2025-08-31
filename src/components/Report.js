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
  const [reportData, setReport] = useState({
    categoryWiseReport: [
      {
        monthYear: "2025/2",
        totalExpense: 92258.0,
        categoryWiseExpense: {
          "Doctor/ medicines": 137.0,
          Gift: 1220.0,
          miscellaneous: 11581.0,
          Vacation: 20838.0,
          Groceries: 4768.0,
          "Personal Care": 250.0,
          "Electricity/Recharge": 4182.0,
          "House Rent": 28096.0,
          "Home & Kitchen": 13477.0,
          Transport: 746.0,
          "Outside Food": 5075.0,
          "Entertainment/ hobbies": 1888.0,
        },
        contributorWiseExpense: {
          Akriti: 56051.0,
          Sameer: 36207.0,
        },
      },
      {
        monthYear: "2025/3",
        totalExpense: 141549.11,
        categoryWiseExpense: {
          "Doctor/ medicines": 720.0,
          miscellaneous: 1959.0,
          Groceries: 19506.11,
          "Personal Care": 889.0,
          "Electricity/Recharge": 653.0,
          Clothing: 1212.0,
          "Personal growth": 9000.0,
          "Entertainment/ hobbies": 10937.0,
          Gift: 32696.0,
          "House Rent": 9480.0,
          "Home & Kitchen": 4542.0,
          Transport: 34425.0,
          maid: 10028.0,
          "Outside Food": 5502.0,
        },
        contributorWiseExpense: {
          Akriti: 71127.11,
          Sameer: 70422.0,
        },
      },
      {
        monthYear: "2025/4",
        totalExpense: 155641.0,
        categoryWiseExpense: {
          "Doctor/ medicines": 494.0,
          Vacation: 83954.0,
          miscellaneous: 10787.0,
          Groceries: 4847.0,
          "Personal Care": 1400.0,
          "Electricity/Recharge": 743.0,
          "Personal growth": 7500.0,
          Clothing: 7205.0,
          "Entertainment/ hobbies": 1676.0,
          Gift: 647.0,
          "House Rent": 25440.0,
          "Home & Kitchen": 4881.0,
          Transport: 872.0,
          "Outside Food": 5195.0,
        },
        contributorWiseExpense: {
          Akriti: 81865.0,
          Sameer: 73776.0,
        },
      },
      {
        monthYear: "2025/5",
        totalExpense: 102530.0,
        categoryWiseExpense: {
          "Doctor/ medicines": 4613.0,
          Gift: 8562.0,
          Groceries: 4156.0,
          miscellaneous: 5997.0,
          "Personal Care": 400.0,
          "Electricity/Recharge": 1439.0,
          "House Rent": 25415.0,
          "Personal growth": 1377.0,
          "Home & Kitchen": 23219.0,
          Transport: 9270.0,
          "Outside Food": 7003.0,
          "Entertainment/ hobbies": 11079.0,
        },
        contributorWiseExpense: {
          Akriti: 66278.0,
          Sameer: 36252.0,
        },
      },
      {
        monthYear: "2025/6",
        totalExpense: 179287.0,
        categoryWiseExpense: {
          Gift: 88064.0,
          Vacation: 40885.0,
          miscellaneous: 3093.0,
          Groceries: 5174.0,
          "Personal Care": 3580.0,
          "House Rent": 25900.0,
          "Home & Kitchen": 1263.0,
          Clothing: 1948.0,
          donation: 100.0,
          Transport: 2022.0,
          "Outside Food": 6725.0,
          "Entertainment/ hobbies": 533.0,
        },
        contributorWiseExpense: {
          Akriti: 57260.0,
          Sameer: 122027.0,
        },
      },
      {
        monthYear: "2025/7",
        totalExpense: 112730.0,
        categoryWiseExpense: {
          "Doctor/ medicines": 280.0,
          Gift: 735.0,
          Vacation: 28630.0,
          miscellaneous: 3947.0,
          Groceries: 7588.0,
          "Personal Care": 3072.0,
          "House Rent": 25200.0,
          "Home & Kitchen": 26500.0,
          maid: 7323.0,
          Transport: 1740.0,
          "Outside Food": 3813.0,
          "Entertainment/ hobbies": 3902.0,
        },
        contributorWiseExpense: {
          Akriti: 54742.0,
          Sameer: 57988.0,
        },
      },
    ],
  });
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    getTableData();
  }, []);

  const getTableData = async () => {
    // try {
    //   const fetchedData = await apiService.getReport();
    // } catch (err) {
    // } finally {
    // }
  };

  useEffect(() => {
    if (reportData) {
      createBarChartData();
    }
  }, [reportData]);

  const createBarChartData = () => {
    if (!reportData || !reportData.categoryWiseReport) {
      console.error("no Data found");
      return;
    }
    const formattedData = reportData?.categoryWiseReport?.map((item) => ({
      name: item.monthYear,
      totalExpense: item.totalExpense,
    }));
    const yearMonthList = reportData?.categoryWiseReport?.map(
      (item) => item.monthYear
    );
    console.log(yearMonthList);
    setMonthYearList(yearMonthList);
    console.log(formattedData);
    setBarChartData(formattedData);
    setYearMonth(yearMonthList[5]);
  };

  const handleChange = (e) => {
    setYearMonth(e.target.value);
  };

  useEffect(() => {
    createMonthlyReport(yearMonth);
  }, [yearMonth]);

  const createMonthlyReport = (yearMonth) => {
    console.log(yearMonth);
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
    const monthlyPieData = [];
    for (let key in monthlyData.contributorWiseExpense) {
      monthlyPieData.push({
        name: key,
        value: monthlyData.contributorWiseExpense[key],
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
        <div className="col-6">
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
