import React, {useState, useEffect} from 'react';

import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios
const activity = () => {
    const {id}=useParams();
    const [inputValues, setInputValues] = useState([{cid: id, percent: 2 , name: null }]);
const handleInputChange = (index, value, type) => {
    if(type==='select') {
        const newInputValues = [...inputValues]; // Create a copy of the inputValues array
        newInputValues[index] = { ...newInputValues[index], name: value }; // Update the percent for the specified index
        setInputValues(newInputValues);
    }
    else{
        const newInputValues = [...inputValues]; // Create a copy of the inputValues array
        newInputValues[index] = { ...newInputValues[index], percent: parseInt(value) }; // Update the percent for the specified index
        setInputValues(newInputValues);}
}; 
useEffect(() => {
    // Fetch students when `cid` changes
    if (id) {
        axios.get(`http://localhost:8000/activities/?cid=${id}`)
            .then(response => {
                setInputValues(response.data);
            })
            .catch(error => {
                console.error('Error fetching activities:', error);
            }); }
        }, [id]); 

        const handleAddInput = () => {
            setInputValues([...inputValues, {cid: id, percent: 2 , name:null }]);
          };
          const handleDeleteInput =(index) => {
            const inputToDelete = inputValues[index];
        
            // Check if the input has an ID
            if (inputToDelete && inputToDelete.id) {
                axios.delete(`http://127.0.0.1:8000/activities/${inputToDelete.id}/`)
                  .then(response => {
                      console.log('Activity deleted successfully');

            const newInputValues = [...inputValues];
            newInputValues.splice(index, 1);
            setInputValues(newInputValues);

                  })
                  .catch(error => {
                      console.error('Error:', error);
                  });
            }
        else{
            const newInputValues = [...inputValues];
            newInputValues.splice(index, 1);
            setInputValues(newInputValues);}
        };
          const postOutcomesAsync = async () => {
        
            // Iterate over rows and post each student using Axios
            for (const activity of inputValues) {
            axios.post('http://127.0.0.1:8000/activities/', activity, {
                headers: {
                  'Content-Type': 'application/json',
                  
                }
              })
              .then((response) => {
                console.log('Post Successful:', response);
                window.location.reload();

              })
              .catch((error) => {
                console.error('Error:', error);
              });
            }
          } 
          const calculateSum = () => {
            return inputValues.reduce((acc, curr) => acc + parseFloat(curr.percent || 0), 0);
          };
          console.log(inputValues)
           
  return (
    <section className="text-gray-600 body-font">
    <div className="px-20 text-center py-24 mx-auto">
        <div>
            <p className='font-bold'>توزيع درجات انشطة التقييم | Distribution of assesment Activities Scores</p>
        <div className='flex mt-10 items-center justify-center'>
            <div className='flex'>
                <p className='ml-4 font-bold' >انشطة التقييم Assesment Activities</p>
                <div className='flex flex-col'>
                {inputValues.map((value, index) => (
            <select key={index} value={value.name} onChange={(e) => handleInputChange(index, e.target.value, 'select')}>
               {value.name? <option>
                {value.name}
              </option> : ( <>
              <option>select</option>
              <option>
                MideTerm Exam امتحان فصلي 1
              </option>
              <option>
                MideTerm Exam امتحان فصلي 2
              </option>
              <option>
                Final Exam امتحان نهائي 
              </option></>)}
            </select>
          ))}
                </div>
            </div>
            <div className='flex mr-6'>
                <p className='ml-4 font-bold'> النسبة من اجمالي درجة التقييم  Percentage of Total Assesment Score for the Course</p>
                <div className='ml-4 flex flex-col'>
    {inputValues.map((value, index) => (
      <input
        key={index}
        type='number'
        className='border w-12'
        value={value.percent}
        onChange={(e) => handleInputChange(index, e.target.value, 'input')}
      />
    ))}
    <p>{calculateSum()}</p>
  </div>
                <div>
                <button onClick={handleAddInput} className='bg-green-200 p-2 rounded-full ml-4 mb-2' > Add / اضافة</button>
                <button onClick={()=>handleDeleteInput(inputValues.length-1)} className='bg-red-200 p-2 rounded-full'> Delete / حذف</button></div>
            </div>
           
        </div>
        </div>  <button onClick={postOutcomesAsync} className='bg-rose-900  hover:bg-rose-700 w-1/4 rounded-full mt-10 p-2 text-white'>Submit</button>
 </div> </section>
  )
}

export default activity
