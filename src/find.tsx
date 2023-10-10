import "./App.css";
import { RightOutlined } from "@ant-design/icons";
const names = [
  { name1: "朋友圈" },
  { name1: "视频号", name2: "直播" },
  { name1: "扫一扫", name2: "摇一摇" },
  { name1: "看一看", name2: "搜一搜" },
  { name1: "附近" },
  { name1: "购物", name2: "游戏" },
  { name1: "小程序" },
];

const Find = () => {
  return (
    <>
      {names.map((name, i) => (
        <div key={i}>
          {name.name1 === "视频号" ? (
            <div className={"flex flex-row"}>
              <div className={"h-12 flex-1 text-lg items-center flex ml-6"}>
                {name.name1}
              </div>
              <div className={"flex-1 flex justify-center items-center"}>
                <img
                  className={"h-8 mr-3"}
                  src={
                    "https://picx.zhimg.com/80/v2-6afa72220d29f045c15217aa6b275808_720w.webp?source=1940ef5c"
                  }
                  alt={""}
                />
                用户名
              </div>
              <div className={"flex-0.5 items-center flex justify-end"}>
                <RightOutlined className={"text-neutral-400"} />
              </div>
            </div>
          ) : (
            <div className={"flex flex-row"}>
              <div className={"h-12 flex-1 text-lg items-center flex ml-6"}>
                {name.name1}
              </div>
              <div className={"flex-1 items-center flex justify-end"}>
                <RightOutlined className={"text-neutral-400"} />
              </div>
            </div>
          )}
          {name.name2 ? (
            <div>
              <hr className={"ml-6"} />
              <div className={"flex"}>
                <div className={"h-12 flex-1 text-lg items-center flex ml-6 "}>
                  {name.name2}
                </div>
                <div className={"flex-1 items-center flex justify-end"}>
                  <RightOutlined className={"text-neutral-400"} />
                </div>
              </div>
              <hr />
            </div>
          ) : (
            <hr />
          )}
          <div className={"h-2 bg-neutral-100 grid content-end"}>
            <hr />
          </div>
        </div>
      ))}
    </>
  );
};

export default Find;
