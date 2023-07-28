import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";
import "./App.css";

const list = [1, 2, 3, 4, 5, 6];

const App = () => (
  <>
    <div className="wexin">
      <div className={"left"} />
      <div className="center">微信</div>
      <div className="right">
        <SearchOutlined className={"icon"} />
        <PlusCircleOutlined className={"icon"} />
      </div>
    </div>
    {list.map((item) => (
      <Chat key={item} />
    ))}
  </>
);
const Chat = () => {
  return (
    <div className="chatItem">
      <div className={"chatAvatarView"}>
        <img
          src="https://picx.zhimg.com/80/v2-6afa72220d29f045c15217aa6b275808_720w.webp?source=1940ef5c"
          className={"avatar"}
        />
      </div>
      <div className="chatContent">
        <div className={"username"}>用户名</div>
        <div className={"comment"}>聊天内容</div>
      </div>
      <div className={"dateView"}>1:30</div>
    </div>
  );
};
export default App;
