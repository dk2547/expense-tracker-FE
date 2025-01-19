import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
export default function Dashboard(){
    
    const [expenseDetail,setExpenseDetail] = useState([])
    const expense = [
        {}
    ]
    const column = [{name:'Paid For',selector: row => row.paidFor,},{name:'Amount',selector: row => row.amount},{name:'Paid By',selector: row => row.paidBy},{name:'Category',selector: row => row.category},{name:'Transaction Date',selector: row => row.transactiondate},]
    // const table = useTable({column,expenseDetail})
    useEffect(() => {
       
            axios.get('https://expense-tracker-backend-po7m.onrender.com/expense').then(res=>{
                console.log(res)
                setExpenseDetail(res.data.expenseList)
                
                console.log(expenseDetail)
            })
            
    }, [])
    return(
        <div>
            <DataTable
			columns={column}
			data={expenseDetail}
		/>
        </div>
    )
}