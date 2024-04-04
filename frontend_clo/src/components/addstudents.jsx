import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const AddStudents= () => {
  const {id}=useParams();
  const [rows, setRows] = useState([{cid: Number(id), student_id: '', full_name: '', status: '' }]);
  console.log(JSON.stringify(rows[0]))

  useEffect(() => {
    // Fetch students when `cid` changes
    if (id) {
        axios.get(`http://localhost:8000/students/?cid=${id}`)
            .then(response => {
                setRows(response.data);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
    }
}, [id]); // Run effect when `cid` changes

    const addRow = () => {
        const newRow = { cid: id,student_id: '', full_name: '', status: '' };
        setRows([...rows, newRow]);
    };


const deleteRow = async (index) => {
    const rowToDelete = rows[index];

    // Check if the row has an ID
    if (rowToDelete && rowToDelete.id) {
      axios.delete(`http://127.0.0.1:8000/students/${rowToDelete.id}/`)
      .then(response => {
          console.log('student deleted successfully');
          // Remove the deleted section from the local state
 const updatedRows = rows.filter((row, i) => i !== index);
    setRows(updatedRows);
      })
      .catch(error => {
          console.error('Error:', error);
      });
    }

    // Remove the row from state
   
};

    const handleChange = (e, index, fieldName) => {
      const { value } = e.target;
      setRows(prevRows => {
          const updatedRows = [...prevRows];
          updatedRows[index] = { ...updatedRows[index], [fieldName]: value };
          return updatedRows;
      });
  };

  const postStudentsAsync = async () => {
      // Iterate over rows and post each student using Axios
      for (const student of rows) {
        axios.post('http://127.0.0.1:8000/students/', student, {
          headers: {
            'Content-Type': 'application/json',
          }
        }).then(response => {
          console.log(response)
          window.location.reload();
      })
      .catch(error => {
          console.error('Error posting', error);
      });;
      }
      console.log('All students posted successfully');
    } 

  
    return (
        <div className='p-20 flex flex-col items-center justify-center'>
           <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Manage Course Students</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Manage your students and their grades of your course to be linked to learning outcomes</p>
          </div>
        <div className="table w-full p-2">

        <button onClick={addRow} className='py-2 mb-10 px-10 bg-green-200 rounded-full mr-10'>Add</button>
            <button onClick={() => deleteRow(rows.length - 1)} className='py-2 mb-10 px-10 bg-red-200 rounded-full mr-10'>Delete</button>
        <table className="w-full border">
            <thead>
                <tr className="bg-gray-50 border-b">
                    <th className="border-r p-2">
                        No
                    </th>
                    <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                        <div className="flex items-center justify-center">
                            ID
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                            </svg>
                        </div>
                    </th>
                    <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                        <div className="flex items-center justify-center">
                            Name
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                            </svg>
                        </div>
                    </th>
                    <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                        <div className="flex items-center justify-center">
                            Status
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                            </svg>
                        </div>
                    </th>
                   
                
                </tr>
            </thead>
            <tbody>
            {rows.map((row, index) => (
                        <tr key={row.id} className="bg-gray-50 text-center">
                            <td className="p-2 border-r">
                                {index + 1}
                            </td>
                            <td className="p-2 border-r">
                                <input type="text" className="border p-1" value={row.student_id} onChange={(e) => handleChange(e, index, 'student_id')} />
                            </td>
                            <td className="p-2 border-r">
                                <input type="text" className="border p-1" value={row.full_name} onChange={(e) => handleChange(e, index, 'full_name')} />
                            </td>
                            <td className="p-2 border-r">
                                <input type="text" className="border p-1" value={row.status} onChange={(e) => handleChange(e, index, 'status')} />
                            </td>
                        </tr>
                    ))}
                </tbody>
        </table>

    </div>
    <div className="flex  flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden">        
      <button onClick={postStudentsAsync} className='text-center text-white rounded-full w-full hover:bg-rose-700 p-2 bg-rose-900'>submit</button>

        <table className="min-w-full text-center">
          <thead className="border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                Status
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                المسجلين
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                0
              </td>
            </tr>
            <tr className="border-b bg-blue-100 border-blue-200">
              <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                المنسحبين
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
               0
              </td>
            </tr>
            <tr className="border-b bg-red-100 border-purple-200">
              <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                المحرومين
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
               0
              </td>
            </tr>
            <tr className="border-b bg-green-100 border-green-200">
              <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                الحاضرين
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                0
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</div>
    );
};

export default AddStudents;
