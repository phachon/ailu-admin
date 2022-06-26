import React, {Component, RefObject} from 'react';
import {message} from "antd";
import {RoleService} from "../../../services/Role";
import RoleFormUI from "../component/FormUI";

class RoleAdd extends Component<any, any> {

    formRef: RefObject<any>

    constructor(props: any) {
        super(props);
        this.formRef = React.createRef()
    }

    onFinish = (values: any) => {
        RoleService.roleAdd(values).then( () => {
            message.success("添加成功", 2, () => {
                window.location.href = `/role/list`
            })
        })
    }

    render() {
        return (
            <RoleFormUI
                formRef={this.formRef}
                onFinish={this.onFinish}
                hiddenRoleIdInput={true}
            />
        );
    }
}

export default RoleAdd;