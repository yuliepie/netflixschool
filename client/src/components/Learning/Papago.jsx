import { useState, useEffect } from "react";
import axios from "axios";

export default function Papago () {
  const [ translate, setTranslate ] = useState('');

  const sentence = "hi smith";

  useEffect(() => {
    (async function() {
      
      console.log('a')
      const response = await axios.post(`https://openapi.naver.com/v1/papago/n2mt/source=en&target=ko&text=${sentence}`,{
        headers: {'Content-Type': 'application/json;charset=utf-8', 'Access-Control-Allow-Origin': '*', "X-Naver-Client-Id": "JMrz8K99dH1NiG_ZgtyA", "X-Naver-Client-Secret": "aRKwHefc62"},
      },
      { withCredentials: true }
      )
      console.log('p', response);
      setTranslate(response.data);
      console.log('pp',response.data);

    })()
    
  }, [])

  return (
    <div>
        {translate && translate}
    </div>
  )
}