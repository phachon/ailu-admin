import React, {Component, RefObject} from 'react';
import {message} from "antd";
import {ProfileService} from "../../../services/Profile";
import ProfileRepassUI from "../component/RepassUI";

class ProfileRepass extends Component {

    formRef: RefObject<any>

    constructor(props: any) {
        super(props);
        this.formRef = React.createRef()
    }

    /**
     * 修改操作
     * @param values
     */
    onFinishCallback(values :{old_pwd :string, new_pwd: string, confirm_pwd: string}) {

        // 判断两次密码是否一致
        if (values.confirm_pwd !== values.new_pwd) {
            message.error("确认密码与新密码不一致")
            return
        }
        ProfileService.profileRepass(values).then(
            (res)  => {
                message.success("保存成功", () => {
                    window.location.href = `${window.location.href}`
                });
            }
        ).catch((e) => {
            console.log(e)
        })
        console.log(values)
    }

    render() {
        return (
            <div className="pdt24">
                <ProfileRepassUI
                    formRef={this.formRef}
                    onFinishCallback={this.onFinishCallback}
                />
            </div>
        );
    }
}

export default ProfileRepass;