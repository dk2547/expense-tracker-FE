import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import apiService from '../service/expenseService'
export default function Dashboard(){
    
    const [expenseDetail,setExpenseDetail] = useState([])
    const [updateTable, setUpdateTable] = useState(0)
    const [pending, setPending] = React.useState(true);
    const expense = [
        {}
    ]
    const column = [{name:'Paid For',selector: row => row.paidFor,},
        {name:'Amount',selector: row => row.amount,sortable: true,},
        {name:'Paid By',selector: row => row.paidBy},
        {name:'Category',selector: row => row.category},
        {name:'Transaction Date',selector: row => row.transactionDate,sortable: true,},
        {name:'Action',cell: row =>   <button onClick={()=>onDelete(row.id)}>Delete</button>}]
    // const table = useTable({column,expenseDetail})
    // const getTableData=()=>{
    //     axios.get('https://expense-tracker-backend-po7m.onrender.com/expense').then(res=>{
    //         setExpenseDetail(res.data.expenseList)
    //     })
    // }
    const onDelete= async(id)=>{

        try {
            await apiService.deleteExpense(id);
            setUpdateTable(updateTable+1)
          //   setCategoryList([...fetchedData.categories, 'other'])
            // setData(fetchedData);
          } catch (err) {
            // setError('Failed to load data');
          } finally {
            // setLoading(false);
          }
        axios.delete( `https://expense-tracker-backend-po7m.onrender.com/expense/${id}`).then(res=>{
            console.log(res)
            setUpdateTable(updateTable+1)
            // getTableData()
        })
    }
    useEffect(() => {
       getTableData();
            
    }, [updateTable])

    const getTableData= async()=>{
         
            try {
              const fetchedData = await apiService.getExpense();
              setPending(false)
              setExpenseDetail(fetchedData.expenseList)
            //   setCategoryList([...fetchedData.categories, 'other'])
              // setData(fetchedData);
            } catch (err) {
              // setError('Failed to load data');
            } finally {
              // setLoading(false);
            }
    
        }

   

    return(
        <div>
            <DataTable
			columns={column}
			data={expenseDetail}
            pagination
            progressPending={pending}
		/>
        </div>
    )
}