import React, { useState, useEffect } from 'react';
import apiService from '../service/expenseService'
export default function ExpensePage() {
    const [formData, setFormData] = useState({
      paidFor: '',
      amount: '',
      paidBy: 'Sameer',
      category: 'House Rent',
      transactionDate: '',
      customCategory: ''
    });


    const userList = [
        'Sameer',
        'Akriti'
    ]

    const [categoryList, setCategoryList] = useState([]);
    const [showCustomCategory, setCustomCategory] = useState(false)
    const [disableSubmit,setDisableSubmit] = useState(false)
  
    useEffect(() => {
        getCategoryList()
    }, [])

    const getCategoryList= async()=>{
     
        try {
          const fetchedData = await apiService.fetchCategory();
          setCategoryList([...fetchedData.categories, 'other'])
          // setData(fetchedData);
        } catch (err) {
          // setError('Failed to load data');
        } finally {
          // setLoading(false);
        }

    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      if((name ==='category' && value ==='other')|| formData.category ==='other'){
        setCustomCategory(true);
    } else{
        setCustomCategory(false);
    }
      setFormData({ ...formData, [name]: value });
    };


  
    const handleSubmit = async (e) => {
        setDisableSubmit(true)
      e.preventDefault();
      const expenseData = preparePayload();

      try {
        const fetchedData = await apiService.saveExpense(expenseData);
        if(fetchedData){
          setDisableSubmit(false)
          resetForm()
        alert('Expense added successfully!');
        }
       
        // setData(fetchedData);
      } catch (err) {
        setDisableSubmit(false)
          alert('Failed to add expense.');
          setDisableSubmit(false)
      //   console.error('Error:', error);
      //   alert('An error occurred. Please try again.');
        // setError('Failed to load data');
      } finally {
        // setLoading(false);
      }
    };

    const resetForm=()=>{
       setFormData( {
            paidFor: '',
            amount: '',
            paidBy: 'Sameer',
            category: 'House Rent',
            transactionDate: '',
            customCategory: ''
          }) 
    }

    const preparePayload =()=>{
        return {
            amount:formData.amount,
            paidBy: formData.paidBy,
            paidFor: formData.paidFor,
            transactionDate: formData.transactionDate || new Date().toISOString(),
            category: formData.category === 'other'? formData.customCategory:formData.category
          };
    }
  
    return (
      <div className="ExpensePage">
        <h2>Add Expense</h2>
        <form onSubmit={handleSubmit}>
          
          <div>
            <label >
              Amount:
              <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
            </label>
          </div>
          <div>
            <label >
              Description:
              <input placeholder="Description" type="text" name="paidFor" value={formData.paidFor} onChange={handleChange} required />
            </label>
          </div>
          <div>
            <label >
              PaidBy:
              <select name="paidBy" value={formData.paidBy} onChange={handleChange} required>
              {userList.map(user=>{return <option  value={user}>{user}</option>})}
                {/* <option value="Akriti">Akriti</option> */}
              </select>
            </label>
          </div>
          <div>
            <label >
              Category:
              <select  name="category" value={formData.category} onChange={handleChange} required >
              {categoryList.map(category=>{return <option value={category}>{category}</option>})}
              </select>
            </label>
          </div>
          {showCustomCategory && 
           <div>
           <label >
             Custom Category:
             <input  name="customCategory" value={formData.customCategory} onChange={handleChange} required />
           </label>
         </div>
          }
          <div>
            <label >
              Transaction Date:
              <input type="date" name="transactionDate" value={formData.transactionDate} onChange={handleChange} />
            </label>
          </div>
          <button type="submit" disabled={disableSubmit}>Submit</button>
        </form>
      </div>
    );
  }
  