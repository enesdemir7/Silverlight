import { useEffect, useState } from 'react';
import { useParams , Link} from 'react-router-dom';
import { Typography} from 'antd';

const { Title } = Typography;

export default function ViewInfo() {
    let {item} = useParams();
    const [data, setData] = useState({urls:[],technologies:[]});

    useEffect(()=>{

        setData(JSON.parse(localStorage.getItem(decodeURIComponent(item))));

    }, []
    )

    return (
        <>
            <Link to="/">Back</Link>
           <div> 
                {
                    <div>
                     {Object.keys(data.urls).length} pages found..
                     <br/>
                     <br/>
                    </div>
                }
                <Title level={5}>Used Technologies</Title>
                {
                    data.technologies.map(
                        (element) => {
                            return (
                                <div>
                                    {element.name}
                                </div>
                            )
                        }
                    )
                }
           </div>
           </>
    );

}