import { message } from 'antd';
import React, { Component, RefObject } from 'react';
import { PrivilegeService } from '../../../services/Privilege';
import PrivilegeFormUI from "../component/FormUI";

class PrivilegeAdd extends Component<any, any> {

    formRef: RefObject<any>

    constructor(props: any) {
        super(props);
        this.formRef = React.createRef()
        this.state = {
            privilegeList: []
        }
    }

    /**
     * 初始化表单
     */
    componentDidMount() {
        this.getPrivilegeList()
    }

    /**
     * 获取权限列表
     */
    getPrivilegeList() {
        PrivilegeService.privilegeList().then((privilegeList) => {
            this.setState({
                privilegeList: privilegeList.list
            })
        })
    }

    /**
     * 保存权限
     */
    onFinishCallback = (values: any) => {
        if (!values.display_switch) {
            values.is_display = 0
        }
        console.log(values)
        // return
        PrivilegeService.privilegeAdd(values).then(() => {
            message.success("保存成功", 2, () => {
                window.location.href = `/privilege/list`
            })
        }).catch(e => {
            console.log(e)
        })
    }

    render() {
        const privilegeList = this.state.privilegeList
        console.log(privilegeList)
        return (
            <div className="pdt24">
                <PrivilegeFormUI
                    formRef={this.formRef}
                    onFinishCallback={this.onFinishCallback}
                    privilegeList={privilegeList}
                />
            </div>
        );
    }
}

export default PrivilegeAdd;