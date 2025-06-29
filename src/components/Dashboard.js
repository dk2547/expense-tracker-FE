import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import apiService from '../service/expenseService';
import moment from 'moment';
import { FaEdit ,FaTrash, FaTrashAlt} from 'react-icons/fa'; 
import { MdEdit, MdDelete } from 'react-icons/md';
import { FiEdit, FiTrash } from 'react-icons/fi';
import ConfirmationPopup from './ConfirmationPopup';

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
     const [isPopupVisible, setPopupVisible] = useState(false);
     const [popupMessage, setPopupMessage] = useState('');
     const [isDeleteActive, setDeleteActive] = useState(false);
     const [page,setPage]= useState(0);
     const [size, setSize]= useState(10);
     const [totalRows, setTotalRows] = useState(null)

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
                <>
                <button className='save-btn' onClick={() => saveEdit(row.id)}>Save</button>
                <button className='cancel-btn' onClick={() => cancel()}>Cancel</button>
                </>
              ) : (
                <>
                      <MdEdit className="icon ic-edit" onClick={() => startEdit(row)}></MdEdit>
                      <MdDelete className="icon icon-delete" onClick={() => onDelete(row.id)}></MdDelete>
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
      const [day, month, year] = row.transactionDate.split("-"); 
const formattedDate = `${year}-${month}-${day}`;
        setEditingRow(row.id);
        setFormData({ id: row.id, paidFor: row.paidFor,
            amount: row.amount,
            paidBy: row.paidBy,
            category: row.category,
            transactionDate: formattedDate ,
           })
    }
    const saveEdit = (id)=>{
      setPopupVisible(true);
      setPopupMessage('Are you sure you want to save changes?');
        // setUpdateTable(updateTable+1)

    }
    const onSaveConfirm = (async()=>{
        console.log(formData)
        setPopupVisible(false)
        setEditingRow(null)
        const id = formData.id;
        delete formData.id;
        try {
          await apiService.editExpense(id,formData);
          setUpdateTable(updateTable+1)
        } catch (err) {
          // setError('Failed to load data');
        } finally {
        }
       
        
    })
    const onSaveCancel = (()=>{
      console.log(formData)
      setPopupVisible(false);
      setEditingRow(null)
      // axios.put(`https://expense-tracker-backend-po7m.onrender.com/expense/${formData.id}`,formData).then(res=>{
      //     setEditingRow(null)
      //     setUpdateTable(updateTable+1)
      //
  })
    const onDelete= async(id)=>{
      setDeleteActive(true);
      setEditingRow(id);
      setPopupMessage('Are you sure you want to delete this record?');;
      setPopupVisible(true);

       
    }
    const onDeleteConfirm = async()=>{
      setDeleteActive(false);
      setPopupVisible(false);
      try {
        await apiService.deleteExpense(editingRow);
        setUpdateTable(updateTable+1)
      //   setCategoryList([...fetchedData.categories, 'other'])
        // setData(fetchedData);
      } catch (err) {
        // setError('Failed to load data');
      } finally {
      }
    }
   const onDeleteCancel = ()=>{
      setDeleteActive(false);
      setPopupVisible(false);
      setEditingRow(null)
    }
    useEffect(() => {
        setEditingRow(null)
       getTableData();
            
    }, [updateTable,page,size])

    const getTableData= async()=>{
         
            try {
              const fetchedData = await apiService.getExpense(page,size);
              setPending(false)
              setExpenseDetail(fetchedData.expenseList)
              setTotalRows(fetchedData.pagination.totalElements)
            //   setCategoryList([...fetchedData.categories, 'other'])
              // setData(fetchedData);
            } catch (err) {
              // setError('Failed to load data');
            } finally {
              // setLoading(false);
            }
    
        }

     const   cancel=()=>{
          setEditingRow(null);
        }

      const  handlePerRowsChange= (newPerPage, page)=>{
          setPending(true);
		setSize(newPerPage);

        }
     const   handlePageChange= (page)=>{
          setPending(true);
          setPage(page-1)
        }

   

    return(
        <div>
            <DataTable
			columns={column}
			data={expenseDetail}
            pagination
            progressPending={pending}
            paginationServer
			paginationTotalRows={totalRows}
			onChangeRowsPerPage={handlePerRowsChange}
			onChangePage={handlePageChange}
		/>
    {isPopupVisible && <ConfirmationPopup message={popupMessage} onConfirm={() => (isDeleteActive?onDeleteConfirm():onSaveConfirm())} onCancel={() => isDeleteActive?onDeleteCancel(): onSaveCancel()} />}
        </div>
    )
}