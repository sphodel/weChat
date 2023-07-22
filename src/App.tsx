import { Button, Input, Space, Spin } from "antd";
import React, { useEffect, useState } from "react";

const { Search } = Input;
import "./App.css";

const ComponentOne = (props: { isShow: boolean }) => {
  const { isShow } = props;
  return (
    <div style={{ marginTop: 100 }}>
      {isShow ? <Spin /> : <div>not show</div>}
    </div>
  );
};

const App: React.FC = () => {
  const [value, setValue] = useState<undefined | string>();
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    console.log("componentDidMount");
  }, []);
  const onSearch = (value: string) => {
    console.log(value);
    setValue(value);
  };
  return (
    <>
      <div style={{ marginTop: "-300px" }}>
        <div>
          <img
            src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
            width="270"
            height="129"
          />
        </div>
        <div>
          {" "}
          <Space>
            <Search
              style={{ width: 550 }}
              value={value}
              allowClear
              enterButton="百度一下"
              size="large"
              onSearch={onSearch}
            />
          </Space>
        </div>
        <Button
          onClick={() => {
            setIsShow((v) => !v);
          }}
        >
          switch isShow
        </Button>
        <ComponentOne isShow={isShow} />
      </div>
    </>
  );
};

export default App;
