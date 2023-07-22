import { createContext, useCallback, useEffect, useRef } from "react";
import useFetchCol from "../hooks/useFetchCol";

export const PostsContext = createContext()

export const PostsProvider = ({children}) => {

    const {fetchData , data , loading , error , lastDoc ,fetchNextData , fetching } = useFetchCol('posts')
    const isMount = useRef(false)
    
    useEffect(() => {
        if(!isMount.current){
            fetchData()
            isMount.current = true
        }
    })

    const fetchNextDataFrom = useCallback(()=>{

        if(data && !loading && !fetching && lastDoc ){
            fetchNextData(lastDoc)
        }
    },[data,fetching,loading,lastDoc,fetchNextData])

    return (
        <PostsContext.Provider value={{data , loading , error , fetchNextDataFrom , fetching, fetchData}}>
            {children}
        </PostsContext.Provider>
    )
}