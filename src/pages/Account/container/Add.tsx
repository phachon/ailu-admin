import React, {RefObject} from "react";
import {AccountService} from "../../../services/Account";
import {FormInstance, message} from "antd";
import AccountFormUI from "../component/FormUI";
import {LayoutForm} from "../../../config/layout";
import {AccountInfoType} from "../../../store/types/accountType";

class AccountAdd extends React.Component<any, any> {

    formRef :RefObject<FormInstance>

    constructor(props: any) {
        super(props);
        this.formRef = React.createRef()
    }

    /**
     * 添加账号操作
     * @param accountInfo
     */
    addonFinishCallback = (accountInfo: AccountInfoType) => {
        AccountService.accountAdd(accountInfo).then(()  => {
            message.success("保存成功", 2, () => {
                window.location.href = `/account/list`
            })
        }).catch((e) => {
            console.log(e)
        })
    }

    render() {
        return (
            <div className="panel">
               <AccountFormUI
                   formRef={this.formRef}
                   onFinishCallback={this.addonFinishCallback}
                   formLayout={LayoutForm}
                   hiddenRoleIdInput={true}
               />
            </div>
        );
    }
}

export default AccountAdd;