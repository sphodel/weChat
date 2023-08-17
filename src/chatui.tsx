import "./chatui.css";
import { useState } from "react";
import {
  LeftOutlined,
  EllipsisOutlined,
  WifiOutlined,
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
      <div className={"top-board"}>
        <div className={"back"}>
          <LeftOutlined onClick={() => navigate(-1)} />
        </div>
        <div className={"contact"}>联系人</div>
        <div className={"setting"}>
          <EllipsisOutlined />
        </div>
      </div>
    </>
  );
};
const Bottom = () => {
  const [messages, setMessages] = useState([]);
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
            <div className={"message"}>
              <div className={"messages"}>{msg}</div>
              <img
                src="https://picx.zhimg.com/80/v2-6afa72220d29f045c15217aa6b275808_720w.webp?source=1940ef5c"
                className={"avatar"}
              />
            </div>
          </>
        ))}
      </div>
      <div className={"bottom-board"}>
        <div className={"voice"}>
          <WifiOutlined />
        </div>
        <div className={"chatFrame"}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={onPressEnter}
          />
        </div>
        <div className={"right"}>
          <SmileOutlined />
          <PlusOutlined />
        </div>
      </div>
    </>
  );
};
export default Chatui;
