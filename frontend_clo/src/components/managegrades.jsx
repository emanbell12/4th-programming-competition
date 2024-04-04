import React,{ useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const ManageGrades = () => {
    const {id}=useParams();
    const [rows, setRows] = useState([{cid: Number(id), student_id: '', full_name: '', status: '' }]);
    const [enteredGrades, setEnteredGrades] = useState([]);   
    console.log(enteredGrades)
    const handleGradeChange = (sid, oid, grade) => {
        // Check if the grade for the given student and section already exists in enteredGrades
        const existingGradeIndex = enteredGrades.findIndex(entry => entry.sid === sid && entry.oid === oid);
        // If the grade exists, update it; otherwise, add a new entry to enteredGrades
        if (existingGradeIndex !== -1) {
          const updatedGrades = [...enteredGrades];
          updatedGrades[existingGradeIndex].grade = grade;
          setEnteredGrades(updatedGrades);
        } else {
          setEnteredGrades(prevGrades => [...prevGrades, { cid: Number(id) ,sid, oid, grade }]);
        }
      };

    const [sections, setSections] = useState([
        {
          cid: id,
          number: 1.1,
          name: '',
          plo: '',
          target: 0,
          pass_value: 0,
          oc: 1,
          activity: 0,
          percent: 0
        }
      ]);
      
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

              axios.get(`http://localhost:8000/outcomes/?cid=${id}`)
            .then(response => {
                setSections(response.data);
            })
            .catch(error => {
                console.error('Error fetching outcomes:', error);
            });

            axios.get(`http://localhost:8000/grades/?cid=${id}`)
            .then(response => {
                setEnteredGrades(response.data.map(grade => ({
                    ...grade,
                    sid: grade.sid.id,
                    oid: grade.oid.id // Replace grade.sid with its ID
                })));
            })
            .catch(error => {
                console.error('Error fetching grades:', error);
            });
      }
  }, [id]); // Run effect when `cid` changes
  const sections1 = sections.filter(section => section.oc === 1);
  const sections2 = sections.filter(section => section.oc === 2);
  const sections3 = sections.filter(section => section.oc === 3);

  Array.prototype.giveLength = function(activity) {
    // Filter the array to get items with the given activity
    const filteredSections = this.filter(section => section.activity === activity);
    // Return the length of the filtered array
    return filteredSections.length;
  };
  const postGradesAsync = async () => {
    // Iterate over rows and post each student using Axios
    for (const grade of enteredGrades) {
      axios.post('http://127.0.0.1:8000/grades/', grade, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
    }
    console.log('All grades posted successfully');
  } 
    return (
        <div className="overflow-x-auto min-h-[500px] py-20">
        <table className=" my-auto mx-auto table-auto bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
            <tr className="bg-rose-800 text-white border border-gray-400">
            <th className="px-4 py-2" colSpan={1} > </th>
                <th className="px-4 py-2" colSpan={sections1.length} >المعرفة والفهم</th>
                <th className="px-4 py-2" colSpan={sections2.length} > المهارات</th>  
                <th className="px-4 py-2" colSpan={sections3.length} >الاستقلالية </th>      
                </tr>

                <tr className="bg-orange-50 border border-gray-400">
                <th  className="px-4 py-2" colSpan={1} >الطالب</th>    

                {sections1.map(section => (
                  <th key={section.oc} className="px-4 py-2" colSpan={sections1.giveLength(section.activity.name)} >{section.activity.name}</th>    
                ))}
                   {sections2.map(section => (
                  <th key={section.oc} className="px-4 py-2" colSpan={sections2.giveLength(section.activity.name)} >{section.activity.name}</th>    
                ))}
                {sections3.map(section => (
                  <th key={section.oc} className="px-4 py-2" colSpan={sections3.giveLength(section.activity.name)} >{section.activity.name}</th>    
                ))}         
                </tr>
                <tr className="bg-rose-100 border border-gray-600">
                <th  className="px-4 py-2" colSpan={1} ></th>    
                    {sections1.map(section=> (
                       <th className="px-4 py-4">{section.name} ** max: {section.percent}</th> 
                    ))}
                     {sections2.map(section=> (
                       <th className="px-4 py-4">{section.name} ** max: {section.percent}</th> 
                    ))}
                     {sections3.map(section=> (
                       <th className="px-4 py-4">{section.name} ** max: {section.percent}</th> 
                    ))}

                </tr>
                
            </thead>
            
            <tbody>
 
        {rows.map(student => (
          <tr key={student.id}>
            <td className="border border-gray-400 px-4 py-2">{student.full_name}</td>
            {/* Loop through sections1, sections2, sections3 to render the input fields */}
            {sections1.map(section => (
              <td key={section.oc} className="border border-gray-400 px-4 py-2">
                <input
                  type="number"
                  value={enteredGrades.find(entry => entry.sid === student.id && entry.oid === section.id)?.grade || ''}
                  onChange={e => handleGradeChange(student.id, section.id, parseInt(e.target.value))}
                />
              </td>
            ))}
            {sections2.map(section => (
              <td key={section.oc} className="border border-gray-400 px-4 py-2">
                <input
                  type="number"
                  value={enteredGrades.find(entry => entry.sid === student.id && entry.oid === section.id)?.grade || ''}
                  onChange={e => handleGradeChange(student.id, section.id, parseInt(e.target.value))}
                />
              </td>
            ))}
            {sections3.map(section => (
              <td key={section.oc} className="border border-gray-400 px-4 py-2">
                <input
                  type="number"
                  value={enteredGrades.find(entry => entry.sid === student.id && entry.oid === section.id)?.grade || ''}
                  onChange={e => handleGradeChange(student.id, section.id, parseInt(e.target.value))}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
        </table>
        <div className='flex items-center justify-center mt-10'>
        <button onClick= {postGradesAsync} className=' p-2 w-1/4 rounded-full bg-rose-800 text-white'>Submit</button></div>
    </div>
    );
};

export default ManageGrades;
