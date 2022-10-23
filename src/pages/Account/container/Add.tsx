import React, {RefObject} from "react";
import {AccountService} from "../../../services/Account";
import {Button, Checkbox, Form, FormInstance, Input, message} from "antd";
import AccountFormUI from "../component/FormUI";
import {LayoutForm} from "../../../config/layout";
import {AccountInfoType} from "../../../store/types/accountType";

const AccountAdd: React.FC = () => {

    const [addForm] = Form.useForm()

    /**
     * 添加账号操作
     * @param accountInfo
     */
     const addOnFinishCallback = (accountInfo: AccountInfoType) => {
        AccountService.accountAdd(accountInfo).then(()  => {
            message.success("保存成功", 2, () => {
                window.location.href = `/account/list`
            })
        }).catch((e) => {
            console.log(e)
        })
    }

    /**
     * 返回组件
     */
    return (
        <div className="pdt24">
           <AccountFormUI 
                formInstance={addForm}
                onFinishCallback={addOnFinishCallback}
           />
        </div>
    );
}

export default AccountAdd;