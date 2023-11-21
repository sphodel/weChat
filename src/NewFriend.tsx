import { Button, Input, message } from "antd";
import { useState } from "react";
import { gql } from "./__generated__";
import { client } from "./client.ts";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const GET_CONTACT =
  gql(`query GET_CONTACT($user_id: Int!, $contact_user_id: Int!) {
  contacts(where: {contact_user_id: {_eq: $contact_user_id}, user_id: {_eq: $user_id}}) {
    contact_user_id
  }
}
`);
const GET_USER_BY_PHONE_AND_NAME = gql(`
query MyMutation($userName: String!, $userPhone: String!) {
  users(where: {_and: {name: {_eq: $userName}, phone: {_eq: $userPhone}}}) {
    id
  }
}
`);
const ADD_CONTACT =
  gql(`mutation AddContact($contact_user_id: Int!, $user_id: Int!) {
  insert_contacts_one(object: {contact_user_id: $contact_user_id, user_id: $user_id}) {
    contact_user_id
  }
}`);
const AddFriend = () => {
  const [NameInput, setNameInput] = useState("");
  const [PhoneInput, setPhoneInput] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const submit = async () => {
    const res = await client.query({
      query: GET_USER_BY_PHONE_AND_NAME,
      variables: { userName: NameInput, userPhone: PhoneInput },
    });
    console.log(NameInput);
    if (!NameInput || !PhoneInput) {
      await messageApi.warning("输入错误");
      return;
    }

    const user = (res.data.users ?? [])[0];
    if (user == null) {
      await messageApi.warning("用户不存在");
      return;
    }
    const contact = await client.query({
      query: GET_CONTACT,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      variables: { user_id: 1, contact_user_id: user.id },
    });
    const list = [contact.data.contacts];
    console.log(list);
    if (contact.data.contacts == null || contact.data.contacts.length === 0) {
      try {
        await client.mutate({
          mutation: ADD_CONTACT,
          variables: { user_id: 1, contact_user_id: user.id },
        });
        await messageApi.success("添加成功");
      } catch (error: any) {
        console.log(error);
        await messageApi.warning(error.message);
      }
      return;
    }

    await messageApi.warning("联系人已存在");
  };

  return (
    <>
      {contextHolder}
      <div className={"h-60 flex-col flex"}>
        <div className={"flex pt-4"}>
          <div
            className={`flex-1 flex items-center text-xl pl-2`}
            onClick={() => navigate(-1)}
          >
            <LeftOutlined />
          </div>
          <div className={"flex-auto justify-center pr-2"}>添加好友</div>
        </div>
        <div className={"flex-1 flex items-center"}>
          <Input
            placeholder={"输入名称"}
            value={NameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </div>
        <div className={"flex-1 flex items-center"}>
          <Input
            placeholder={"输入电话号码"}
            value={PhoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
          />
        </div>
        <Button
          /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
          onClick={async () => await submit()}
        >
          提交
        </Button>
      </div>
    </>
  );
};
export default AddFriend;
