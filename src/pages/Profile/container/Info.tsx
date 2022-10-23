import React, {useEffect} from "react";
import {Form, message} from "antd";
import {ProfileService} from "../../../services/Profile";
import {connect} from "react-redux";
import {AdminState} from "../../../store/states/adminState";
import {Dispatch} from "redux";
import {ProfileAccountUpdateAction} from "../../../store/actions/adminAction";
import ProfileInfoUI from "../component/InfoUI";
import { getProfileAccountInfo, setProfileAccountInfo } from "../../../store/local";

const ProfileInfo: React.FC = () => {

    const [infoForm] = Form.useForm()

    useEffect(() => {
        let profileInfo = getProfileAccountInfo()
        infoForm.setFieldsValue(profileInfo)
    }, [])

    /**
     * 修改个人资料操作
     * @param values
     */
    const onFinishCallback = (values: any) => {
        ProfileService.profileUpdate(values).then(() => {
            // 更新 local
            setProfileAccountInfo(values)
            message.success("保存成功", 1)
        }).catch((e) => {
            console.log(e)
            message.error("保存失败")
        })
    }

    return (
        <div className="pdt24">
            <ProfileInfoUI
                formInstance={infoForm}
                onFinishCallback={onFinishCallback}
            />
        </div>
    );
}

export default ProfileInfo