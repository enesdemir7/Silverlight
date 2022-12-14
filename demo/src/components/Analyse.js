import { List , Col, Row, Typography} from 'antd';
import ListItems from './ListItems';

const { Title } = Typography;

export default function Analyse({urlList}) {


    return  (
       <> 
        <Row >
            <Col  push={1}>  <Title level={5}>URL</Title></Col>
            
        </Row>

        <List     
        itemLayout="horizontal" dataSource={urlList}    
        renderItem={(item) => (   
            <ListItems url = {item} />
        )}
        pagination={{
            onChange: (page) => {
            console.log(page);
            },
            pageSize: 3,
        }}
        />
        </>
  );

}