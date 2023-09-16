import {
  CompassOutlined,
  MessageOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const Find = () => {
  return (
    <>
      <header className="fixed w-full text-xl flex items-center justify-between bg-neutral-100 h-16 box-border">
        <div className="flex flex-1 box-border" />
        <div className="flex flex-1 justify-center items-center box-border">
          发现
        </div>
        <div className="flex flex-1 justify-end items-center box-border">
          <SearchOutlined className={"text-xl mr-5 box-border"} />
          <PlusCircleOutlined className={"text-xl mr-5 box-border"} />
        </div>
      </header>
      <div className="h-16"></div>
      <div className="h-16"></div>
      <Underside />
    </>
  );
};
const Underside = () => {
  return (
    <>
      <div className="bottom-0 fixed w-full text-xl bg-neutral-100 content-center flex box-border h-16 items-center">
        <Link to="/" className="flex-1">
          <div className="flex-col justify-center flex flex-1 box-border items-center">
            <MessageOutlined />
            微信
          </div>
        </Link>
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
export default Find;
