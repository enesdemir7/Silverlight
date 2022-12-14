import React, { useEffect, useState } from 'react';
import { List , Col, Row  } from 'antd';
import { ThreeDots  } from 'react-loader-spinner'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ListItems({url}) {
    const [status, setstatus] = useState(true);
    const [results, setResults] = useState('');
    
   useEffect( () => {
            if(url){
                axios.post("http://localhost:8080/post",{url : url.url})
                .then(res => {setResults(res.data); localStorage.setItem(url.url,JSON.stringify(res.data))})
                .catch(err => console.log(err.data))
            }
    },[url]); 

    useEffect( () => {
        if(results){
           // console.log("geldi..");
           // console.log(results);
           // console.log(results.technologies.length);
           // console.log(Object.keys(results.urls).length);
            setstatus(false);  
        }
        else{
        //console.log("gelmediii..");     
        }   
     }, [results]);

return (
            <List.Item>            
                    <Row >
                        <Col span={8}>
                            <List.Item.Meta
                                title={<a href={url.url}>{url.url}</a>}      
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                        {status? (<ThreeDots 
                                height="30" 
                                width="90" 
                                radius="9"
                                color="#002673" 
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClassName=""
                                visible={status}
                         /> ) : <Link to={"/viewinfo/"+encodeURIComponent(url.url)}> View Info</Link> }         
                        </Col>
                    </Row>       
            </List.Item>    
    );
}