import { Input, Space } from 'antd';
import React from 'react';
const { Search } = Input;
import './App.css'
const onSearch = (value: string) => console.log(value);
    const App: React.FC = () => (
        <>
    <div style={{marginTop:'-300px'}}>
        <div>
                <img src='https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
               width='270' height='129'/>
        </div>
           <div> <Space>
            <Search style={{width:550}}
                allowClear
                enterButton="百度一下"
                size="large"
                onSearch={onSearch}
            />
        </Space>
       </div>
    </div>
            </>
    );

 export default App

