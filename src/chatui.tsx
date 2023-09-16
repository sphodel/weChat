import "./chatui.css";
import { useState } from "react";
import {
  LeftOutlined,
  EllipsisOutlined,
  SmileOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
const Chatui = () => {
  return (
    <>
      <Top />
      <Bottom />
    </>
  );
};
const Top = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex h-16 text-xl items-center border-b-black bg-neutral-100">
        <div className=" flex-1 justify-start flex">
          <LeftOutlined onClick={() => navigate(-1)} />
        </div>
        <div className="flex-1 justify-center flex ">联系人</div>
        <div className="flex-1 flex justify-end">
          <EllipsisOutlined />
        </div>
      </div>
    </>
  );
};
const Bottom = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  function onPressEnter() {
    setMessages([...messages, input]);
    setInput("");
  }
  return (
    <>
      <div>
        {messages.map((msg) => (
          <>
            <div className="flex items-center justify-center">
              <div className="inline-block p-3 mr-3">{msg}</div>
              <img
                src="https://picx.zhimg.com/80/v2-6afa72220d29f045c15217aa6b275808_720w.webp?source=1940ef5c"
                className="w-12 h-12"
              />
            </div>
          </>
        ))}
      </div>
      <div className="bottom-0 fixed flex w-full h-16 bg-neutral-100 items-center pb-3">
        <div className="flex-1">
          <i className="iconfont icon-user"></i>
        </div>
        <div className="flex-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={onPressEnter}
          />
        </div>
        <div className="flex flex-1 justify-center">
          <SmileOutlined className="text-xl ml-3" />
          <PlusOutlined className="text-xl ml-4" />
        </div>
      </div>
    </>
  );
};
export default Chatui;
