import { useCallback, useContext, useState } from "react"
import {collection, getDocs, query, where} from 'firebase/firestore'
import { FirebaseContext } from "../contexts/FirebaseContext"
const useFetchDocParam = (colName , slug) => {
    const [error , setError] = useState(null)
    const [loading , setLoading] = useState(false)
    const [data , setData] = useState(null)
    
    const {db} = useContext(FirebaseContext)

    const getSingleDoc = useCallback(async () => {

        const colRef = collection(db , colName) 
        const q = query(colRef , where( "slug" , "==" , slug ))
        setLoading(true)
        try {
            const res = await getDocs(q)
            const customData =  res.docs.map( doc => {
                return {
                    id:doc.id,
                    ...doc.data(),
                    createdAt:doc.data().createdAt.toDate()
                }
            })
            // console.log(customData[0])
            setData(customData[0])
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
    })


  return {getSingleDoc,data,loading,error}
}

export default useFetchDocParam