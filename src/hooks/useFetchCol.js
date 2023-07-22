
import {collection, getDocs, limit, orderBy, query, startAfter} from 'firebase/firestore'
import { useCallback, useContext, useState } from 'react'
import { FirebaseContext } from '../contexts/FirebaseContext'

const useFetchCol = (collectinName) => {

    const [data,setData] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)
    const [lastDoc, setLastDoc] = useState(null)
    const [fetching,setFetching] = useState(false)

    const {db} = useContext(FirebaseContext)

    const fetchData = useCallback(async () => {

        const colRef = collection(db,collectinName)
        const q = query(colRef,orderBy('createdAt',"desc"),limit(9))
        setLoading(true)
        try {
            const fetchedData = await getDocs(q)
            // console.log(fetchedData)
            let customData =  fetchedData.docs.map( doc => {
                return {
                    id:doc.id,
                    ...doc.data(),
                    createdAt:doc.data().createdAt.toDate()
                }
            })
            setData(customData)
            setLastDoc(fetchedData.docs[fetchedData.docs.length - 1])
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[collectinName])

    const fetchNextData = useCallback(async (fetchDataFrom) => {

        const colRef = collection(db,collectinName)
        const q = query(colRef,orderBy('createdAt',"desc"),limit(9),startAfter(fetchDataFrom))
        setFetching(true)
        try {
            const fetchedData = await getDocs(q)
            // console.log(fetchedData)
            let customData =  fetchedData.docs.map( doc => {
                return {
                    id:doc.id,
                    ...doc.data(),
                    createdAt:doc.data().createdAt.toDate()
                }
            })
            // console.log(customData)
            setData((data) => [...data,...customData])
            setLastDoc(fetchedData.docs[fetchedData.docs.length - 1])
        } catch (error) {
            setError(error.message)
        }
        setFetching(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[collectinName])

    return {fetchData , data , loading , error , lastDoc , fetchNextData , fetching}
}

export default useFetchCol