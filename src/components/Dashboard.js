import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import apiService from '../service/expenseService';
import moment from 'moment';
import { FaEdit ,FaTrash, FaPe} from 'react-icons/fa'; 
import "./dashboard.css"
export default function Dashboard(){
    
    const [expenseDetail,setExpenseDetail] = useState([])
    const [updateTable, setUpdateTable] = useState(0)
    const [pending, setPending] = React.useState(true);
    const [editingRow,setEditingRow] = useState(null);
    const [formData, setFormData] = useState({ id: '', paidFor: '',
        amount: '',
        paidBy: '',
        category: '',
        transactionDate: '',
        customCategory: ''});
     const [categoryList, setCategoryList] = useState([]);

        const userList = [
            'Sameer',
            'Akriti'
        ]
    
    const expense = [
        {}
    ]
    useEffect(() => {
            getCategoryList()
        }, [])
    
        const getCategoryList= async()=>{
         
            try {
              const fetchedData = await apiService.fetchCategory();
              setCategoryList(fetchedData.categories)
              // setData(fetchedData);
            } catch (err) {
              // setError('Failed to load data');
            } finally {
              // setLoading(false);
            }
    
        }
    const column = [{name:'Paid For',selector: row => row.paidFor,cell: row => (
        <div>
          {editingRow === row.id ? (
            <input
              type="text"
              value={formData.paidFor}
              onChange={e => setFormData({ ...formData, paidFor: e.target.value })}
            />
          ) : (
            row.paidFor
          )}
        </div>
      )},
        {name:'Amount',selector: row => row.amount,cell: row => (
            <div>
              {editingRow === row.id ? (
                <input
                  type="number"
                  value={formData.amount}
                  onChange={e => setFormData({ ...formData, amount: e.target.value })}
                />
              ) : (
                row.amount
              )}
            </div>
          ),sortable: true,},
        {name:'Paid By',selector: row => row.paidBy,cell: row => (
            <div>
              {editingRow === row.id ? (
                <select name="paidBy" value={formData.paidBy} onChange={e=>setFormData({ ...formData, paidBy: e.target.value })} required>
                {userList.map(user=>{return <option  value={user}>{user}</option>})}
                  {/* <option value="Akriti">Akriti</option> */}
                </select>
              ) : (
                row.paidBy
              )}
            </div>
          )},
        {name:'Category',selector: row => row.category,cell: row => (
            <div>
              {editingRow === row.id ? (
                <select  name="category" value={formData.category} onChange={e=>setFormData({ ...formData, category: e.target.value })} required >
                {categoryList.map(category=>{return <option value={category}>{category}</option>})}
                </select>
              ) : (
                row.category
              )}
            </div>
          )},
        {name:'Transaction Date',selector: row => row.transactionDate,cell: row => (
            <div>
              {editingRow === row.id ? (
                <input type="date" name="transactionDate" value={formData.transactionDate} onChange={e=>setFormData({ ...formData, transactionDate: e.target.value })} />
              ) : (
                row.transactionDate
              )}
            </div>
          ),sortable: true,},
        {name:'Action',cell: row =>   (
            <div>
              {editingRow === row.id ? (
                <button onClick={() => saveEdit(row.id)}>Save</button>
              ) : (
                <>
               <FaTrash  onClick={() => onDelete(row.id)}></FaTrash>
                    <FaEdit className="icon" onClick={() => startEdit(row)}/>
                </>
              )}
            </div>
          ),
    }]
    // const table = useTable({column,expenseDetail})
    // const getTableData=()=>{
    //     axios.get('https://expense-tracker-backend-po7m.onrender.com/expense').then(res=>{
    //         setExpenseDetail(res.data.expenseList)
    //     })
    // }
    const startEdit = (row)=>{
        setEditingRow(row.id);
        setFormData({ id: row.id, paidFor: row.paidFor,
            amount: row.amount,
            paidBy: row.paidBy,
            category: row.category,
            transactionDate: moment(row.transactionDate, "DD-MM-YYYY").toDate() ,
            customCategory: ''})
            console.log(formData)
    }
    const saveEdit = (id)=>{
        setUpdateTable(updateTable+1)

    }
    const onDelete= async(id)=>{

        try {
            await apiService.deleteExpense(id);
            setUpdateTable(updateTable+1)
          //   setCategoryList([...fetchedData.categories, 'other'])
            // setData(fetchedData);
          } catch (err) {
            // setError('Failed to load data');
          } finally {
          }
    }
    useEffect(() => {
        setEditingRow(null)
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