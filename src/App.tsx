import { Divider } from "antd";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";
import "./App.css";

const App = () => (
  <>
    <header className="wexin">
      <div className="left">微信</div>

      <div className="right">
        <SearchOutlined />
        <PlusCircleOutlined />
      </div>
    </header>
    <Chat />
  </>
);
const Chat = () => {
  return (
    <div className="Chat">
      <Divider className="Divide" />
      <img
        src="https://picx.zhimg.com/80/v2-6afa72220d29f045c15217aa6b275808_720w.webp?source=1940ef5c"
        width="32"
        height="32"
      />
      <div className="content">
        <p>用户名</p>
        <p>聊天内容</p>
        <Divider />
      </div>
    </div>
  );
};
export default App;
