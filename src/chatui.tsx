import "./App.css";
import { useEffect, useState } from "react";
import {
  LeftOutlined,
  EllipsisOutlined,
  SmileOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Input, message, Popover } from "antd";
import { gql } from "./__generated__";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
const insertChatText =
  gql(`mutation Chat( $text: String!, $time: timestamp!, $to: Int!) {
  insert_chats_one(object: {text: $text, time: $time, to: $to, from: 1}) {
    text
  }
}
`);
const removeContact = gql(`mutation delete_contact($contact_user_id: Int!) {
  delete_contacts(where: {contact_user_id: {_eq: $contact_user_id}}) {
    returning {
      user_id
    }
  }
}`);
const chatContent = gql(`query ChatContent($to: Int!) {
  chats(where: {to: {_eq: $to}} order_by: {time: desc}) {
    text
  }
}
`);
const Content = ({ contact_user_id }: { contact_user_id: number }) => {
  const navigate = useNavigate();
  const [remove_contact] = useMutation(removeContact, {
    variables: { contact_user_id },
  });
  const handleRemoveContact = async () => {
    await remove_contact();
    navigate(-1);
  };
  return (
    <div className={"w-20"} onClick={handleRemoveContact}>
      <p>删除</p>
    </div>
  );
};

const Chatui = () => {
  const location = useLocation();
  return (
    <>
      <Top
        contact_user_id={
          (location.state as { contact_user_id: number }).contact_user_id
        }
        contact_user_name={
          (location.state as { contact_user_name: string }).contact_user_name
        }
      />
      <Bottom
        contact_user_id={
          (location.state as { contact_user_id: number }).contact_user_id
        }
      />
    </>
  );
};

const Top = ({
  contact_user_id,
  contact_user_name,
}: {
  contact_user_id: number;
  contact_user_name: string;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex h-16 text-xl items-center border-b-black bg-neutral-100">
        <div className=" flex-1 justify-start flex pl-5">
          <LeftOutlined onClick={() => navigate(-1)} />
        </div>
        <div className="flex-1 justify-center flex ">{contact_user_name}</div>
        <div className="flex-1 flex justify-end pr-5">
          <Popover
            content={<Content contact_user_id={contact_user_id} />}
            trigger={"click"}
          >
            <EllipsisOutlined />
          </Popover>
        </div>
      </div>
    </>
  );
};
const Bottom = ({ contact_user_id }: { contact_user_id: number }) => {
  const [contentHeight, setContentHeight] = useState(window.innerHeight - 128);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setContentHeight(window.innerHeight - 128);
    });
  }, []);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [contact_chat_content] = useMutation(insertChatText, {
    variables: {
      to: contact_user_id,
      text: input,
      time: new Date().toISOString(),
    },
  });
  const { data } = useQuery(chatContent, {
    variables: { to: contact_user_id },
    pollInterval: 500,
  });
  const send = async () => {
    if (input === "") {
      await messageApi.warning("发送内容不能为空");
      return;
    }
    await contact_chat_content();
    setMessages([...messages, input]);
    setInput("");
    return messages;
  };
  return (
    <>
      {contextHolder}
      <div
        style={{
          overflow: "auto",
          height: contentHeight,
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        <div className={"flex flex-col-reverse"}>
          {(data?.chats ?? []).map((msg, index) => (
            <div key={index} className="message flex flex-col items-end ">
              <div className="flex items-end mb-3">
                <div>{msg.text}</div>
                <img
                  src="https://picx.zhimg.com/80/v2-6afa72220d29f045c15217aa6b275808_720w.webp?source=1940ef5c"
                  alt={""}
                  className="w-12 h-12 ml-3"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bottom-0 fixed flex w-full h-16 bg-neutral-100 items-center pb-3">
        <div className="flex-1">
          <i className="iconfont icon-user"></i>
        </div>
        <div className="flex-3 flex">
          <div className="mr-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} />
          </div>
          <Button
            onClick={async () => {
              await send();
            }}
          >
            发送
          </Button>
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
