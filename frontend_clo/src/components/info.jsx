import React, {useState, useEffect} from 'react';
import { options } from '../constants';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const info = () => {
        const {id}=useParams();
        const [inputValues, setInputValues] = useState([{cid: id, percent: 2 , name: null }]);
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
        },
        {
            cid: id,
            number: 2.1,
            name: '',
            plo: '',
            target: 0,
            pass_value: 0,
            oc: 2,
            activity: 0,
            percent: 0
          },
          {
            cid: id,
            number:  3.1,
            name: '',
            plo: '',
            target: 0,
            pass_value: 0,
            oc: 3,
            activity: 0,
            percent: 0
          }
      ]);
    useEffect(() => {
        // Fetch students when `cid` changes
        if (id) {
            axios.get(`http://localhost:8000/activities/?cid=${id}`)
                .then(response => {
                    setInputValues(response.data);
                })
                .catch(error => {
                    console.error('Error fetching activities:', error);
                });
                axios.get(`http://localhost:8000/outcomes/?cid=${id}`)
                .then(response => {
                    setSections(response.data);
                })
                .catch(error => {
                    console.error('Error fetching outcomes:', error);
                });


        }
    }, [id]); 
   console.log(sections)
    
   
      
      const handleAddSection = (num) => {
        const updatedSections = sections.filter(section => section.oc === num);

        const newSection = {
          number: num+ (updatedSections.length+1)/10,
          name: '',
          plo: '',
          cid: id,
          target: 0,
          pass_value: 0,
          oc: num,
          activity: 0,
          percent: 0
          
        };

 
    setSections([...sections, newSection]);
  
      };
      const handleDeleteSection = (num) => {
          // Create a copy of the sections array
          const updatedSections = [...sections];
      
          // Find the index of the section to be deleted
          const indexToDelete = updatedSections.findIndex(section => section.oc === num);
      
          // If the section to be deleted exists and has an ID
          if (indexToDelete !== -1 && updatedSections[indexToDelete].id) {
              const idToDelete = updatedSections[indexToDelete].id;
      
              // Send a DELETE request to the server
              axios.delete(`http://127.0.0.1:8000/outcomes/${idToDelete}/`)
                  .then(response => {
                      console.log('Section deleted successfully');
                      // Remove the deleted section from the local state
                      updatedSections.splice(indexToDelete, 1);
                      setSections(updatedSections);
                  })
                  .catch(error => {
                      console.error('Error:', error);
                  });
          } else {
              // If the section doesn't have an ID or doesn't exist, just remove it from the local state
              updatedSections.splice(indexToDelete, 1);
              setSections(updatedSections);
          }
      };
      
    

const handleActivityChange = (e, index) => {
    const { value } = e.target;
    setSections(prevSections => {
        const updatedSections = [...prevSections];
        updatedSections[index] = { ...updatedSections[index], activity: value };
        return updatedSections;
    });
};

const handlePercentChange = (e, index) => {
    const { value } = e.target;
    setSections(prevSections => {
        const updatedSections = [...prevSections];
        updatedSections[index] = { ...updatedSections[index], percent:parseInt(value) };
        return updatedSections;
    });
};
 
  const calculateTotalPercent = () => {
    return sections.reduce((total, section) => total + section.percent, 0);
};

const postOutcomesAsync = async () => {
   
   

    // Iterate over rows and post each student using Axios
    for (const outcome of sections) {
        axios.post('http://127.0.0.1:8000/outcomes/', outcome, {
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
  } 

  return (
    <section className="text-center text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">


        <div className='mt-10 '>
            <p className='font-bold'>مخرجات التعلم للمقرر| Course Learning Outcomes</p>
        <div className='items-center justify-center flex mt-10'>
            <div className='flex flex-col space-y-4'>
                <div className='flex'>
                <div className='flex flex-col'>
                <p className='ml-4 font-bold my-4'> المعرفة والفهم  Knoweldge and Undestanding</p>
                {sections
.filter(section => section.oc === 1)
.map(section => (
    <div key={section.id} className="flex">
      <p className='ml-4'>{section.number}</p>
      <div className='flex'>
        <input type="text" className='border' value={section.name} onChange={(e) => setSections(sections.map(s => s.number=== section.number ? { ...s, name: e.target.value } : s))} />
        <input type="number" className='border w-8' value={section.identifier} onChange={(e) => setSections(sections.map(s => s.number=== section.number ? { ...s, identifier: e.target.value } : s))} />
      </div>
      <div className='flex'>
        <p className='mx-4 font-bold'>Aligned PLOs</p>
        <select value={section.plo} onChange={(e) => setSections(sections.map(s => s.number=== section.number ? { ...s,plo: e.target.value } : s))}>
          {section.plo ? <option>{section.plo}</option>
          : (<> <option>select</option>
          <option>K1</option>
          <option>K2</option></>)}
        </select>
      </div>
      <div className='flex'><p className="mx-4 font-bold ">Target</p>
        <input type="number" className="border w-8 mx-4 w-[50px]" value={section.target} onChange={(e) => setSections(sections.map(s => s.number=== section.number ? { ...s, target: parseInt(e.target.value) } : s))} />
      </div>
      <div className='flex'><p className='font-bold'>Pass</p>
        <input type="number" className="border w-8 mx-4 w-[50px]" value={section.pass_value} onChange={(e) => setSections(sections.map(s => s.number=== section.number ? { ...s, pass_value: parseInt(e.target.value) } : s))} />
      </div>

    </div>
  ))}          
            </div><div className='flex mt-10 items-center '>
                <button onClick={() => handleAddSection(1)} className='bg-green-200 p-2 rounded-full ml-4 mr-6'> Add / اضافة</button>
                <button onClick={()=>handleDeleteSection(1)} className='bg-red-200 p-2 rounded-full mr-6'> Delete / حذف</button></div></div>
                <div className='flex'>
                <div className='flex flex-col'>
                <p className='ml-4 mt-10 mb-2 font-bold'> Skills المهارات</p>
                {sections
.filter(section => section.oc === 2)
.map(section => (
    <div key={section.id} className="flex">
      <p className='ml-4'>{section.number}</p>
      <div className='flex'>
        <input type="text" className='border' value={section.name} onChange={(e) => setSections(sections.map(s => s.number=== section.number ? { ...s, name: e.target.value } : s))} />
        <input type="number" className='border w-8' value={section.identifier} onChange={(e) => setSections(sections.map(s => s.number=== section.number ? { ...s, identifier: e.target.value } : s))} />
      </div>
      <div className='flex'><p className='mx-4 font-bold'>Aligned PLOs</p>
        <select value={section.plo} onChange={(e) => setSections(sections.map(s => s.number=== section.number ? { ...s, plo: e.target.value } : s))}>
        {section.plo ? <option>{section.plo}</option>
          : (<> <option>select</option>
          <option>K1</option>
          <option>K2</option></>)}
        </select>
      </div>
      <div className='flex'><p className="mx-4 font-bold ">Target</p>
        <input type="number" className="border w-8 mx-4 w-[50px]" value={section.target} onChange={(e) => setSections(sections.map(s => s.number=== section.number ? { ...s, target: parseInt(e.target.value) } : s))} />
      </div>
      <div className='flex'><p className='font-bold'>Pass</p>
        <input type="number" className="border w-8 mx-4 w-[50px]" value={section.pass_value} onChange={(e) => setSections(sections.map(s => s.number=== section.number ? { ...s, pass_value: parseInt(e.target.value) } : s))} />
      </div>

    </div>
  ))}          
            </div><div className='flex mt-10 items-center '>
                <button onClick={()=>handleAddSection(2)} className='bg-green-200 p-2 rounded-full ml-4  mr-6'> Add / اضافة</button>
                <button onClick={()=>handleDeleteSection(2)} className='bg-red-200 p-2 rounded-full mr-6'> Delete / حذف</button></div></div>   <div className='flex'>
                <div className='flex flex-col'>
                <p className='ml-4 mt-10 mb-2 font-bold'> القيم والاستقلالية والمسؤولية</p>
                {sections
.filter(section => section.oc === 3)
.map(section => (
    <div key={section.id} className="flex">
      <p className='ml-4'>{section.number}</p>
      <div className='flex'>
        <input type="text" className='border' value={section.name} onChange={(e) => setSections(sections.map(s => s.number=== section.number ? { ...s, name: e.target.value } : s))} />
        <input type="number" className='border w-8' value={section.identifier} onChange={(e) => setSections(sections.map(s => s.number=== section.number ? { ...s, identifier: parseInt(e.target.value) } : s))} />
      </div>
      <div className='flex'><p className='mx-4 font-bold'>Aligned PLOs</p>
        <select value={section.plo} onChange={(e) => setSections(sections.map(s => s.number=== section.number ? { ...s, plo: e.target.value } : s))}>
        {section.plo ? <option>{section.plo}</option>
          : (<> <option>select</option>
          <option>K1</option>
          <option>K2</option></>)}
        </select>
      </div>
      <div className='flex'>
        <p className="mx-4 font-bold ">Target</p>
        <input type="number" className="border w-8 mx-4 w-[50px] w-[50px]" value={section.target} onChange={(e) => setSections(sections.map(s => s.number=== section.number ? { ...s, target: parseInt(e.target.value) } : s))} />
      </div>
      <div className='flex'>
      <p className="mx-4 font-bold ">Pass</p>
        <input type="number" className="border w-8 mx-4 w-[50px]" value={section.pass_value} onChange={(e) => setSections(sections.map(s => s.number=== section.number ? { ...s, pass_value: parseInt(e.target.value) } : s))} />
      </div>

    </div>
  ))}          
            </div><div className='mt-10 flex items-center '>
                <button onClick={()=>handleAddSection(3)} className='bg-green-200 p-2 rounded-full ml-4  mr-6'> Add / اضافة</button>
                <button onClick={()=>handleDeleteSection(3)} className='bg-red-200 p-2 rounded-full mr-6'> Delete / حذف</button></div></div>
            </div>

           
        </div>
      <div>
            <p className='mt-20 font-bold'>ربط مخرجات التعلم مع انشطة التقييم</p>
            <div className="flex justify-center items-center">
<div>
    {sections.map((section, index) => (
        <div key={section.number} className='space-x-4 flex'>
            <p className='font-bold'>مخرج التعلم</p>
            <option>{section.number}</option>
            <p className='font-bold'>انشطة التقييم</p>
            <select onChange={(e) => handleActivityChange(e, index)}>
                    {section?.activity?.id ?  (<><option className='font-bold'  key={index}>{section.activity.name}   </option> {inputValues.map((select, index) => (
                    <option value={select.id} key={index}>{select.name}</option>))} </> ):   
                    (<>        
                    <option>select</option>
                    {inputValues.map((select, index) => (
                    <option value={select.id} key={index}>{select.name}</option>))} </> )
                } 
            </select>
            <input type="number" max={section?.activity?.percent} min={0} value={section.percent} className='w-[60px] border w-8' onChange={(e) => handlePercentChange(e, index)}/>
        </div>
    ))}
</div>
<div>
    <p>Total</p>
    <p className='border p-2 w-8'>{calculateTotalPercent()}</p>
</div>
</div>

        </div>
        </div>

     
  <button onClick={postOutcomesAsync} className='bg-rose-900 hover:bg-rose-700 w-1/4 rounded-full mt-10 p-2 text-white'>Submit</button>
    </div>
  </section>
  )
}

export default info
