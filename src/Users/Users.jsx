"use client"
                                                     //import { Ajax } from '@/services/Ajax'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Ajax } from '@/services/Ajax'

const Pagination = ({ currPage, setCurrPage, totalPages }) => {
    const inputRef = React.useRef()
    const fnGo = () => {
        const pageNo = inputRef.current.value;
        if (pageNo < 1 || pageNo > totalPages) {
            alert("Invalid Entry");
            return;
        }
        setCurrPage(Number(pageNo))
    }
    const fnNext = () => {
        setCurrPage(currPage + 1)
    }

    const fnPrev = () => {
        setCurrPage(currPage - 1)
    }
    return <div>
        <span>Go To :<input ref={inputRef} type="number" /><button onClick={fnGo}>Go</button></span><button onClick={fnPrev} disabled={currPage == 1}>Prev</button>{currPage}<button onClick={fnNext} disabled={currPage == totalPages}>Next</button><span>Total Pages:{totalPages}</span>
    </div>
}

export const Users = () => {
   const students= useSelector( (state)=>state?.appReducer?.students)
                                                                       //const [students, setStudents] = useState([])
    const [currData, setCurrData] = useState([])
    const perPage = 4;
    const [currPage, setCurrPage] = React.useState(1)
    const dispatch=useDispatch()
    React.useEffect(() => {
        const end = currPage * perPage;
        const start = end - perPage;
        setCurrData(students.slice(start, end))
    }, [currPage, students])
   /* const getUsers = async () => {
        try {
            const res = await Ajax.sendGetReq("std/get-std")
            setStudents(res?.data)
        } catch (ex) {
            setStudents([])
        }
    }    */

        

        useEffect(() => {
         dispatch({type:"GET_STUDENTS"})    // getUsers();
    }, [])

   const handleEdit = (row) => {
    dispatch({type:"MODAL",payload: {isShowModal:true,student:row} })   
          
       /* sessionStorage.setItem("row",JSON.stringify(row))
           dispatch({type:"MODAL",payload:true })  */
    }
    const handleDelete =async(row) => {
        const bool= confirm("R U Sure...")
        if(bool){
            try{
            dispatch({type:"LOADER",payload:true})
        const res= await Ajax.sendDeleteReq( `std/delete-std/${row?._id}`)
           
            const { acknowledged, deletedCount}= res?.data;
            if( acknowledged && deletedCount )
            {
                dispatch({type:"GET_STUDENTS"})
                alert("success")
            }
            else{
                alert("fail")
            }
        
    }catch(ex){

        }finally{
            dispatch({type:"LOADER",payload:false})
        }
    }
}
    return (
        <div>
            <table border="2px" className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Roll No</th>
                        <th>Location</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currData.map((obj, ind) => {
                            const { _id, name, rno, loc } = obj
                            return <tr key={"tr_" + ind}>
                                <td>{_id}</td>
                                <td>{name}</td>
                                <td>{rno}</td>
                                <td>{loc}</td>
                                <td><button onClick={() => handleEdit(obj)}>edit</button></td>
                                <td><button onClick={() => handleDelete(obj)}>delete</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <Pagination currPage={currPage} setCurrPage={setCurrPage} totalPages={Math.ceil(students?.length / perPage)} />
        </div>
    )
}
