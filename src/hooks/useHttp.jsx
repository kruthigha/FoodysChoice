import { useCallback,useState,useEffect } from "react";


async function sendHttpRequest(url,config){
    const response = await fetch(url,config);
    const resData = await response.json();
    if(!response.ok){
        throw new Error(resData.message || "Something went wrong while fetching the data");
    }
    return resData;
}
 


export default function useHttp(url,config,initialValue){

    const [data,setData]=useState(initialValue);
    const [err,setErr]=useState();
    const [loading,setLoading]= useState(false);
   
     const sendRequest =useCallback(
        async function sendRequest(data){
        setLoading(true);
        try{
            const resData = await sendHttpRequest(url,{...config,body:data});
            setData(resData);
        }catch(error){
            setErr(error.message || "Something went wrong")
        }
        setLoading(false);
        },[url, config]);

        useEffect(() => {
          if (config && (config.method === "GET" ||!config.method) || !config) {
            sendRequest();
          }
        }, [sendRequest, config]); 
  

    return {
        data,
        loading,
        err,
        sendRequest
    };
}

