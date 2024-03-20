import {
  SearchOutlined,
  PlusCircleOutlined,
  MessageOutlined,
  UserOutlined,
  CompassOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Carousel } from "antd";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { CarouselRef } from "antd/es/carousel";
import Find from "./find.tsx";
import { gql } from "./__generated__";
import { client } from "./client.ts";
const chatRecordsQuery = gql(`query Chat_Content($userId:Int!) {
  chats(order_by: {time: desc}, limit: 1, where: {_or: [{to: {_eq: $userId}}, {from: {_eq:$userId}}]}) {
    id
    text
    time
  }
}

`);
const getContactsInfo = gql(`
  query contact($user_id: Int!) {
  contacts(where: {user_id: {_eq: $user_id}}) {
    contact_user {
      id
      name
      phone
    }
    contact_user_id
  }
}

`);
const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state == null) {
      navigate('/login');
    }
  }, [location.state]);
  const user_id = location.state?.userID;
  const ref = useRef<CarouselRef>(null);
  const [viewIndex, setViewIndex] = useState(0);
  const [transitionStage, setTransitionStage] = useState("fadeIn");
  const [contentHeight, setContentHeight] = useState(window.innerHeight - 128);
  const [chatRecordsList, setChatRecordsList] = useState<
    { text: string | undefined; time: Date }[]
  >([]);
  type Contact = {
    contact_user: {
      id: number;
      name: string;
      phone: string;
    };
    contact_user_id: number;
  };
  const [contactsInfo, setContactsInfo] = useState<Contact[]>([]);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setContentHeight(window.innerHeight - 128);
    });
  }, []);
  useEffect(() => {
    setTransitionStage("fadeIn");
  }, []);
  const fetchContactsInfo = async () => {
    const res = await client.query({
      query: getContactsInfo,
      variables:{user_id:user_id}
    });
    return res.data.contacts;
  };
  const fetchChatRecords = async (id: number) => {
    const result = await client.query({
      query: chatRecordsQuery,
      variables: { userId:user_id},
    })
    return {
      text: result.data.chats[0].text as string,
      time: result.data.chats[0].time as Date,
    };
  };
  const eachContact = () => {
    return contactsInfo.map((item, i) => (
      <div
        className={`${transitionStage}`}
        onClick={() => {
          setTransitionStage("fadeOut");
          setTimeout(() => {
            navigate("chatui", {
              state: {
                user_id:user_id,
                contact_user_id: item.contact_user_id,
                contact_user_name: item.contact_user?.name,
              },
            });
          }, 300);
        }}
        key={item.contact_user_id}
      >
        <Contact
          name={item.contact_user?.name}
          text={chatRecordsList[i]?.text}
          time={chatRecordsList[i].time}
        />
      </div>
    ));
  };
  const text = async () => {
    const fetchInfo = await fetchContactsInfo();
    const promisesChatRecords = fetchInfo.map(async (Info) =>
      fetchChatRecords(Info.contact_user_id),
    );
    const latestChatRecords = await Promise.all(promisesChatRecords);
    setChatRecordsList(latestChatRecords);
    const promisesContactInfo = fetchInfo.map((id) => id);
    const resultContactInfo = await Promise.all(promisesContactInfo);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setContactsInfo(resultContactInfo);
    console.log(latestChatRecords);
  };
  useEffect(() => {
    const fetch = async () => {
      await text();
    };
    void fetch();
  }, []);
  const Contact = ({
    name,
    text,
    time,
  }: {
    name: string | undefined;
    text: string | undefined;
    time: Date;
  }) => {
    return (
      <div>
        <div className="h-25 flex flex-row flex-1 box-border">
          <div className="flex w-24 h-24 items-center justify-center">
            <img
              className="h-12 w-12 box-border"
              src="user_image.jpg"
              alt={""}
            />
          </div>
          <div className="flex flex-col pb-4 pt-4 justify-center flex-1 box-border">
            <div className="text-xl">{name}</div>
            <div className="text-xl text-neutral-400 box-border">{text}</div>
          </div>
          <div className="pt-4 text-xl text-neutral-400 pr-3 box-border">
            {moment(time).format("LT")}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className={"h-full w-full"}>
      <header
        className="w-full text-xl flex items-center justify-between bg-neutral-100 box-border"
        style={{ height: "64px" }}
      >
        <div className="flex flex-1 box-border" />
        <div className="flex flex-1 justify-center items-center box-border">
          {tabs.map((tab, i) => (
            <div key={i}>{i === viewIndex && `${tab.name}`} </div>
          ))}
        </div>

        <div className="flex flex-1 justify-end items-center box-border">
          <SearchOutlined className={"text-xl mr-5 box-border"} />
          <PlusCircleOutlined
            className={"text-xl mr-5 box-border"}
            onClick={() => {
              setTransitionStage("fadeOut")
              setTimeout(() => {
                navigate("AddFriend",{state:{userId:user_id}});
              }, 300);
            }}
          />
        </div>
      </header>
      <div style={{ overflow: "auto", height: contentHeight }}>
        <Carousel
          dots={false}
          ref={ref}
          afterChange={(v) => {
            setViewIndex(v);
          }}
        >
          <div>{eachContact()}</div>
          <div>2</div>
          <div>
            <Find />
          </div>
          <div onClick={()=>{
            navigate("login")
          }}>退出</div>
        </Carousel>
      </div>
      <Border_Bottom
        index={viewIndex}
        setViewIndex={(i) => {
          setViewIndex(i);
          if (ref.current == null) {
            return;
          }
          ref.current.goTo(i);
        }}
      />
    </div>
  );
};

const tabs = [
  { name: "微信", icon: <MessageOutlined /> },
  { name: "通讯录", icon: <TeamOutlined /> },
  { name: "发现", icon: <CompassOutlined /> },
  { name: "我", icon: <UserOutlined /> },
];

const Border_Bottom = ({
  setViewIndex,
  index,
}: {
  setViewIndex: (v: number) => void;
  index: number;
}) => {
  return (
    <div
      className="w-full text-xl bg-neutral-100 content-center flex box-border items-center"
      style={{ height: "64px" }}
    >
      {tabs.map((tab, i) => (
        <div
          className={`flex-col justify-center flex flex-1 box-border items-center ${
            i === index ? "text-green-600" : ""
          }`}
          key={tab.name}
          onClick={() => {
            setViewIndex(i);
          }}
        >
          {tab.icon}
          {tab.name}
        </div>
      ))}
    </div>
  );
};

export default App;
