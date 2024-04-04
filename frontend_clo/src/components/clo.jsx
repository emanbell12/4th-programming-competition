import React,{ useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const CLO = () => {
    const {id}=useParams();
    const [enteredGrades, setEnteredGrades] = useState([]);   
    const [courses, setCourses] = useState([]);  
const percentage = (grades, percent) => {
    const totalStudents = grades.length;
    const passedStudents = grades.filter(grade => (grade/percent)*100 >= 70).length;
    const percentagePassed = (passedStudents / totalStudents) * 100;
    return percentagePassed;
};

    useEffect(() => {
      // Fetch students when `cid` changes
      if (id) {

            axios.get(`http://localhost:8000/grades/?cid=${id}`)
            .then(response => {
                const gradesData = response.data;

                const modifiedGradesData = gradesData.reduce((accumulator, grade) => {
                    // Find if an object with the same oid.number exists in the accumulator array
                    const existingIndex = accumulator.findIndex(item => item.oid.number === grade.oid.number);
                
                    if (existingIndex !== -1) {
                        // If found, check if the activity already exists in values array
                        const existingActivity = accumulator[existingIndex].values.find(value => value.activity.id === grade.oid.activity.id);
                
                        if (existingActivity) {
                            // If activity already exists, push the grade to its grades array
                            existingActivity.grades.push(grade.grade);
                        } else {
                            // If activity doesn't exist, create a new entry for it
                            accumulator[existingIndex].values.push({
                                activity: grade.oid.activity,
                                grades: [grade.grade]
                            });
                        }
                    } else {
                        // If not found, create a new object with values array containing the grade
                        accumulator.push({
                            oid: grade.oid,
                            values: [{
                                activity: grade.oid.activity,
                                grades: [grade.grade]
                            }]
                        });
                    }
                
                    return accumulator;
                }, []);
                
        setEnteredGrades(modifiedGradesData)

        // Now modifiedGradesData contains the desired array
        console.log(modifiedGradesData);
            })
            .catch(error => {
                console.error('Error fetching grades:', error);
            });
            axios.get(`http://localhost:8000/courses/`)
            .then(response => {console.log(response.data); 
                const filteredCourses = response.data.filter(course => course.id === Number(id));
                // Set the filtered courses in the state
                setCourses(filteredCourses);})
        }
  }, [id]); // Run effect when `cid` changes
console.log(enteredGrades)

enteredGrades.forEach(item => {
    item.values.forEach(value => {
    value.total_passed = percentage(value.grades, item.oid.percent);
    });
});
console.log(courses)

const section1= enteredGrades.filter(item => item.oid.oc == 1);
const section2= enteredGrades.filter(item => item.oid.oc == 2);
const section3= enteredGrades.filter(item => item.oid.oc == 3);

    return (
        <div className="overflow-x-auto px-10 lg:px-48 my-20">
            <div className='flex'>
            <p className='font-bold mb-10 ml-10'>الجهة التعليمية | Education Institute</p>
            <p>جامعة حفر الباطن</p>
            <p className='font-bold mb-10 ml-4 mr-10'> المادة |  Course</p>
            <p>{courses[0]?.name}</p>
            <p className='font-bold mb-10 ml-4 mr-10'> الرمز |  Code</p>
            <p>{courses[0]?.code}</p>
            <p className='font-bold mb-10 ml-4 mr-10'> القسم |  Section</p>
            <p>{courses[0]?.section}</p>
            </div>
        <table className="mx-auto my-auto table-auto bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
            <tr className="bg-rose-800 font-bold text-white">
                <th className="px-4 py-2"  >CLOs Code </th>
                <th className="px-4 py-2"  > Clos المخرج التعليمي للمقرر</th>  
                <th className="px-4 py-2" >Related Plos Code </th>      
                <th className="px-4 py-2" >Activities   </th>     
                <th className="px-4 py-2" >Target Level   </th>  
                <th className="px-4 py-2" >Actual Level   </th>  
                <th className="px-4 py-2" >Comment    </th>  
                </tr>
                
            </thead>
            

            <tbody>
                <th className='bg-yellow-200 text-center' colSpan={7}>المعرفة والفهم  Knoweldge and Undestanding</th>
            {section1.map(info => {
    // Initialize averageGrade for each info object
    let averageGrade = 0;

    return (
        <tr className='text-center bg-yellow-50'>
            <td className='px-2 border'>{info.oid.number}</td>
            <td className='px-2 border'>{info.oid.name}</td>
            <td className='px-2 border'>{info.oid.plo}</td>
            <td className='px-2 border'>
                {info.values.map(value => (
                    <p>{value.activity.name} / </p>
                ))}
            </td>
            <td className='px-2 border'>
                Target: {info.oid.target}% of students achieve above or equal {info.oid.pass_value}%
            </td >
            {info.values.map((value, index) => {
                // Accumulate total_passed values
                averageGrade += value.total_passed;

                return (
                    <>
                        <td className='px-2 border'>{index === info.values. length -1 ? averageGrade/info.values.length : null}%</td>
                        {/* Check if it's the last value to determine Target Level Achieved or Not Achieved */}
                        {index === info.values.length - 1 ? (
                            averageGrade >= info.oid.pass_value ? (
                                <td className='px-2 border bg-green-300 text-green-800 '>Target Level Achieved </td>
                            ) : (
                                <td className='px-2 border bg-red-200 text-red-800'>Target Level Not Achieved</td>
                            )
                        ) : null}
                    </>
                );
            })}
        </tr>
    );
})}
                <th className='bg-rose-300 text-center' colSpan={7}> المهارات  Skills</th>

{section2?.map(info => {
    // Initialize averageGrade for each info object
    let averageGrade = 0;

    return (
        <tr className='bg-rose-50 text-center'>
            <td className='px-2 border'>{info.oid.number}</td>
            <td className='px-2 border'>{info.oid.name}</td>
            <td className='px-2 border'>{info.oid.plo}</td>
            <td className='px-2 border'>
                {info.values.map(value => (
                    <p>{value.activity.name} / </p>
                ))}
            </td>
            <td className='px-2 border'>
                Target: {info.oid.target}% of students achieve above or equal {info.oid.pass_value}%
            </td >
            {info.values.map((value, index) => {
                // Accumulate total_passed values
                averageGrade += value.total_passed;

                return (
                    <>
                        <td className='px-2 border'>{index === info.values. length -1 ? averageGrade/info.values.length : null}%</td>
                        {/* Check if it's the last value to determine Target Level Achieved or Not Achieved */}
                        {index === info.values.length - 1 ? (
                            averageGrade >= info.oid.pass_value ? (
                                <td className='px-2 border bg-green-300 text-green-800 '>Target Level Achieved </td>
                            ) : (
                                <td className='px-2 border bg-red-200 text-red-800'>Target Level Not Achieved</td>
                            )
                        ) : null}
                    </>
                );
            })}
        </tr>
    );
})}
                <th className='bg-orange-200 text-center' colSpan={7}>   القيم والاستقلالية والمسؤولية</th>

{section3?.map(info => {
    // Initialize averageGrade for each info object
    let averageGrade = 0;

    return (
        <tr className='text-center bg-orange-50'>
            <td className='px-2 border'>{info.oid.number}</td>
            <td className='px-2 border'>{info.oid.name}</td>
            <td className='px-2 border'>{info.oid.plo}</td>
            <td className='px-2 border'>
                {info.values.map(value => (
                    <p>{value.activity.name} / </p>
                ))}
            </td>
            <td className='px-2 border'>
                Target: {info.oid.target}% of students achieve above or equal {info.oid.pass_value}%
            </td >
            {info.values.map((value, index) => {
                // Accumulate total_passed values
                averageGrade += value.total_passed;

                return (
                    <>
                        <td className='px-2 border'>{index === info.values. length -1 ? averageGrade/info.values.length : null}%</td>
                        {/* Check if it's the last value to determine Target Level Achieved or Not Achieved */}
                        {index === info.values.length - 1 ? (
                            averageGrade >= info.oid.pass_value ? (
                                <td className='px-2 border bg-green-300 text-green-800 '>Target Level Achieved </td>
                            ) : (
                                <td className='px-2 border bg-red-200 text-red-800'>Target Level Not Achieved</td>
                            )
                        ) : null}
                    </>
                );
            })}
        </tr>
    );
})}

        
      </tbody>
        </table>
</div>
    );
};

export default CLO;
