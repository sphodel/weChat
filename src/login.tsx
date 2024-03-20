import {Button, Flex, message} from "antd";
import {useEffect, useState} from "react";
import {gql} from "./__generated__";
import {client} from "./client.ts";
import {useNavigate} from "react-router-dom";
const LOGIN_VER=gql(`query loginVer($id: Int!) {
  users(where: {id: {_eq: $id}}) {
    password
  }
}`)
const LoginPage=()=>{
    const navigate = useNavigate();
    const [userId, setUserId] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [buttonEnable,setButtonEnable]=useState(true)
    const [messageApi, contextHolder] = message.useMessage();
    const LoginVer=async ()=>{
        const resPassword=await client.query({
            query:LOGIN_VER,
            variables:{id:parseInt(userId)}
        })
        if(!userId||!userPassword){
            await messageApi.warning("输入不能为空");
            return;
        }
        if(resPassword.data.users[0]==null){
            await messageApi.warning("用户不存在");
            return;
        }
        if(resPassword.data.users[0].password!=userPassword){
            await messageApi.warning("密码错误");
            return;
        }
        await messageApi.success("登录成功");
        setTimeout(()=>{
            navigate("/",{state:{userID:userId}})
        },1000)
    }
    useEffect(()=>{
        if(userId!=""&&userPassword!=""){
            setButtonEnable(false)
        }else{
        setButtonEnable(true)
        }
    },[userId, userPassword])
    return(
        <>
        {contextHolder}
        <div className={"w-5/6 m-auto"}>
            <div className={"text-2xl font-semibold text-center mb-10 mt-20 "}>微信号 /QQ号 /邮箱登录</div>
            <div style={{borderTop: "1px solid #ddd", borderBottom: "1px solid #ddd"}}>
                <div className="flex  items-center py-2 gap-5 ">
                    <div className={"font-semibold"}>账号</div>
                    <input placeholder={"微信号 /QQ号 /邮箱"} className={"outline-0"} value={userId} onChange={(e) => {
                        setUserId(e.target.value)
                    }}/>
                </div>
            </div>
            <div style={{borderBottom: "1px solid #ddd"}}>
                <div className="flex  items-center py-2 gap-5">
                    <div className={"font-semibold"}>密码</div>
                    <input placeholder={"请填写密码"} className={"outline-0"} value={userPassword} onChange={(e) => {
                        setUserPassword(e.target.value)
                    }}/>
                </div>
            </div>
            <div className={"my-4"}>用手机号登录</div>
            <div className={"h-28"}></div>
            <div className={"flex flex-col items-center text-[#b2b2b2]"}>上述微信号 /QQ号 /邮箱仅用于登录验证
            <Flex className={"py-8"}>
                {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                <Button className={`${buttonEnable ? "bg-[#b2b2b2]":"bg-[#07C160] text-white"} scale-125`} disabled={buttonEnable} onClick={async()=>{await LoginVer()}}>同意并登录</Button>
            </Flex></div>
            <div className={"flex justify-center text-[#576B95]"} onClick={()=>{
                setTimeout(()=>{
                    navigate("register")
                })}}>注册</div>
        </div>
        </>
    )
}
export default LoginPage;