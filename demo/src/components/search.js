import {useState,useEffect} from 'react';
import Ping from 'ping-url';
import Analyse from './Analyse';
var validUrl = require('valid-url');



export default function Search() {
  const [url, setUrl] = useState('');
  const Style = {};
  const [isButtonDisabled, setisButtonDisabled] = useState(true);
  const [urlList, seturlList] = useState([]);
  
  // Sending data to backend for analysis
  function sendData(e) {
    e.preventDefault();
    const newList = urlList.concat({ url });
    seturlList(newList);
  }


  // To entered URL value check and assignment
  const handleChange = event => {
    setUrl(event.target.value);
   // console.log('value is:', event.target.value);
  };
  
useEffect(()=>{
    // URL validation with 2 parts       
          if (validUrl.isUri(url)){
          // console.log('Looks like an URI');
          setisButtonDisabled(false);
          } else {
          // console.log('Not a URI');
          setisButtonDisabled(true);
          }

          Ping.check(url).then(res => {
          // console.log(`status: ${res.status} and time: ${res.time}`);
            setisButtonDisabled(false);

          }, res => {
          // console.log(`error msg: ${res.msg}`);
            setisButtonDisabled(true);
          }); 
},[url]);



return (
    <>
    <div className='Form'>
      <form onSubmit={sendData}>
        <input  className="searchInput " type="text" name="url" onChange={handleChange} value={url} placeholder="URL want to be checked"/>
        <button type="submit" className="btn"  value="ANALYSE" id="button" style={Style}   disabled={isButtonDisabled}> Analyze</button> 
      </form>
     
      Analysing Targets

    </div>   
     <Analyse  urlList={urlList}/>  
    </>
  );
}

