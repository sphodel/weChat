import {Button, Flex} from "antd";
import {useState} from "react";

const LoginPage=()=>{
    const [buttonEnable,setButtonEnable]=useState(true)
    return(
        <div className={"w-5/6 m-auto"}>
            <div className={"text-2xl font-semibold text-center my-10 "}>微信号 /QQ号 /邮箱登录</div>
            <div style={{borderTop: "1px solid #ddd", borderBottom: "1px solid #ddd"}}>
                <div className="flex  items-center py-2 gap-5">
                    <div>账号</div>
                    <input placeholder={"微信号 /QQ号 /邮箱"} className={"outline-0"}/>
                </div>
            </div>
            <div style={{borderBottom: "1px solid #ddd"}}>
                <div className="flex  items-center py-2 gap-5">
                    <div>密码</div>
                    <input placeholder={"请填写密码"} className={"outline-0"}/>
                </div>
            </div>
            <div className={"my-4"}>用手机号登录</div>
            <div className={"h-36"}></div>
            <div className={"flex flex-col items-center"}>上述微信号 /QQ号 /邮箱仅用于登录验证
            <Flex className={"pt-5"}>
                <Button className={"bg-[#b2b2b2]"} disabled={buttonEnable}>同意并继续</Button>
            </Flex></div>
        </div>
    )
}
export default LoginPage;