import {useEffect, useState} from "react";
import {EyeInvisibleOutlined, EyeOutlined} from "@ant-design/icons";
import {Button, Flex} from 'antd';
import {gql} from "./__generated__";
import {client} from "./client.ts";
import {useNavigate} from "react-router-dom";
const REG_NEW_USER = gql(`mutation reg_new_user($password: String!, $name: String!, $phone: String = "") {
  insert_users_one(object: {password: $password, phone: $phone, name: $name}) {
    id
  }
}`)
const NewReg = () => {
    const navigate=useNavigate()
    const [agree, setAgree] = useState(false)
    const [buttonEnable, setButtonEnable] = useState(true)
    const [mescontent, setMescontent] = useState<string[]>([])
    const handleAgreeToggle = () => {
        setAgree(true)
    }
    useEffect(() => {
        if (mescontent[0] != "" && mescontent[1] != "" && mescontent[2] != "" && agree) {
            setButtonEnable(false)
        }
    }, [mescontent, agree])
    const submit=async()=>{
        await client.mutate({
            mutation:REG_NEW_USER,
            variables:{name:mescontent[0],phone:mescontent[1],password:mescontent[2]}
        })
        navigate("-1")
    }
    return (
        <div className="flex flex-col items-center w-5/6 h-svh mt-10 m-auto">
            <div className="flex font-semibold h-14 items-center text-xl">
                用手机号注册
            </div>
            <div className={"pb-10"}>
                <img src={"../user_image.jpg"} className={"w-16 h-16"} alt={""}/>
            </div>
            <NewRegContent setMescontent={setMescontent}/>
            <label className={"pt-5"}>
                <input type={"radio"} onClick={handleAgreeToggle }/>
                我已阅读并同意《软件许可及服务协议》本页面收集的信息仅用于注册账号
            </label>
            <Flex className={"pt-5"}>
                {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                <Button className={"bg-[#b2b2b2]"} disabled={buttonEnable} onClick={async()=>await submit()}>同意并继续</Button>
            </Flex>
        </div>
    )
}
const NewRegContent = ({setMescontent}: { setMescontent: (v: string[]) => void }) => {
    const [username, setUsername] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [phonenum, setPhonenum] = useState("")
    const [userPassword, setUserPassword] = useState("")
    useEffect(() => {
        setMescontent([username, phonenum, userPassword])
    }, [username, phonenum, userPassword])
    const changeToVisible = () => {
        setShowPassword(!showPassword)
    }
    return (
        <div className="h-56 flex-col box-border flex w-full">
            <div style={{borderTop: "1px solid #ddd", borderBottom: "1px solid #ddd"}}>
                <div className="flex  items-center py-3 gap-20">
                    <div>昵称</div>
                    <input placeholder={"请填写昵称"} className={"outline-0"} value={username} onChange={(e) => {
                        setUsername(e.target.value)
                    }}/>
                </div>
            </div>
            <div style={{borderBottom: "1px solid #ddd"}}>
                <div className="flex  items-center py-3 gap-10">
                    <div>国家/地区</div>
                    <select>
                        <option>中国</option>
                        <option>英国</option>
                        <option>美国</option>
                    </select>
                </div>
            </div>
            <div style={{borderBottom: "1px solid #ddd"}}>
                <div className="flex  items-center py-3">
                    <div className={"pr-16"}>手机号</div>
                    <div className={"pr-4"}>+86</div>
                    <input placeholder={"请填写手机号码"} className={"outline-0"} value={phonenum}
                           onChange={(e) => {
                               setPhonenum(e.target.value)
                           }}/>
                </div>
            </div>
            <div style={{borderBottom: "1px solid #ddd"}}>
                <div className="flex  items-center py-3">
                    <div className={"pr-20"}>密码</div>
                    <input placeholder={"请设置密码"} className={"outline-0"}
                           type={showPassword ? "text" : "password"} value={userPassword} onChange={(e) => {
                        setUserPassword(e.target.value)
                    }}/>
                    <div onClick={changeToVisible}
                         className={"flex items-center text-xl text-[#b2b2b2]"}>{showPassword ? <EyeOutlined/> :
                        <EyeInvisibleOutlined/>}</div>
                </div>
            </div>
        </div>
    )
}
export default NewReg;