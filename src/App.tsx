import {
  SearchOutlined,
  PlusCircleOutlined,
  MessageOutlined,
  UserOutlined,
  CompassOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Carousel } from "antd";
import "./App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const App = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(1);
  const [transitionStage, setTransistionStage] = useState("fadeIn");
  useEffect(() => {
    setTransistionStage("fadeIn");
  }, []);
  return (
    <>
      <div>
        <header className="fixed w-full text-xl flex items-center justify-between bg-neutral-100 h-16 box-border">
          <div className="flex flex-1 box-border" />
          <div className="flex flex-1 justify-center items-center box-border">
            微信
          </div>
          <div className="flex flex-1 justify-end items-center box-border">
            <SearchOutlined className={"text-xl mr-5 box-border"} />
            <PlusCircleOutlined className={"text-xl mr-5 box-border"} />
          </div>
        </header>

        <div className="h-16"></div>
        <Carousel>
          <div
            className={`${transitionStage}`}
            onClick={() => {
              setTransistionStage("fadeOut");
              setTimeout(() => {
                navigate("chatui");
              }, 300);
            }}
          >
            {list.map((item) => (
              <Chat key={item} />
            ))}
          </div>
          <div>2</div>
          <div
            onClick={() => {
              setTransistionStage("fadeOut");
              setTimeout(() => {
                navigate("find");
              }, 300);
            }}
          >
            3
          </div>
          <div>4</div>
        </Carousel>
        <div className="h-16"></div>
        <div className="h-5 fixed">
          <Underside />
        </div>
      </div>
    </>
  );
};
export const Chat = () => {
  return (
    <div>
      <div className="h-25 flex flex-row flex-1 box-border">
        <div className="flex w-24 h-24 items-center justify-center">
          <img
            className="h-12 w-12 box-border"
            src="https://picx.zhimg.com/80/v2-6afa72220d29f045c15217aa6b275808_720w.webp?source=1940ef5c"
          />
        </div>
        <div className="flex flex-col pb-4 pt-4 justify-center flex-1 box-border">
          <div className="text-xl">用户名</div>
          <div className="text-xl text-neutral-400 box-border">聊天内容</div>
        </div>
        <div className="pt-4 text-xl text-neutral-400 pr-3 box-border">
          1:30
        </div>
      </div>
    </div>
  );
};

const Underside = () => {
  return (
    <>
      <div className="bottom-0 fixed w-full text-xl bg-neutral-100 content-center flex box-border h-16 items-center">
        <div className="flex-col justify-center flex flex-1 box-border items-center">
          <MessageOutlined />
          微信
        </div>
        <div className="flex-col justify-center flex flex-1 box-border items-center">
          <TeamOutlined />
          通讯录
        </div>
        <div className="flex-col justify-center flex flex-1 box-border items-center">
          <CompassOutlined />
          发现
        </div>
        <div className="flex-col justify-center flex flex-1 box-border items-center">
          <UserOutlined />我
        </div>
      </div>
    </>
  );
};

export default App;
