import axios from "axios";
const axios_client = axios.create({ baseURL: "http://localhost:5000",   json: true });

const get=async (endpoint,headers)=>{
    return new Promise((resolve, reject) => {
        try{
            if(!headers){
                const res = axios_client.get(endpoint);
                resolve(res);
            }else{
                const token=localStorage.getItem("token");
                // console.log(token)
                const res = axios_client.get(endpoint,{
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                });
                resolve(res);
            }
        }catch(error){
            reject(error);
        }
    })
}
const post=async (endpoint,data,headers)=>{
    return new Promise((resolve, reject) => {
        try{
            if(!headers){
                const res = axios_client.post(endpoint,data);
                resolve(res);
            }else{
                const token=localStorage.getItem("token");
                console.log(token)
                const res = axios_client.post(endpoint,data,{
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                });
                resolve(res);
            }
        }catch(error){
            reject(error);
        }
    })
}
const client={get,post }
export default client