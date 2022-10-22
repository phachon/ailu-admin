import { Modal } from 'antd';
import React, { Component, RefObject } from 'react';
import { EditLayoutForm } from '../../../config/layout';
import { PrivilegeService } from '../../../services/Privilege';
import { PrivilegeInfoType } from '../../../store/types/privilegeType';
import PrivilegeFormUI from '../component/FormUI';
import PrivilegeListUI from '../component/ListUI';

class PrivilegeList extends Component<any, any> {

    editFormRef: RefObject<any>

    constructor(props: any) {
        super(props);
        this.editFormRef = React.createRef()
        this.state = {
            privilegeList: [],
            editModalVisible: false,
        }
    }

    /**
     * 列表数据初始化
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
     * 修改点击操作
     */
    editClickCallback = (privilegeInfo: PrivilegeInfoType) => {
        this.setState({
            editModalVisible: true
        }, () => {
            this.editFormRef.current.setFieldsValue(privilegeInfo)
        })
    }

    /**
     * 修改保存操作
     * @param privilegeInfo 权限信息
     */
    editFinishCallback = (privilegeInfo: PrivilegeInfoType) => {
        console.log("editFinishCallback", privilegeInfo)
    }

    /**
     * 修改取消弹窗
     */
    editModalCancel = () => {
        this.setState({
            editModalVisible: false
        })
    }

    render() {
        const privilegeList = this.state.privilegeList
        return (
            <>
                <PrivilegeListUI
                    privilegeList={privilegeList}
                    editClickCallback={this.editClickCallback}
                />
                <Modal
                    title="权限修改"
                    width={670}
                    visible={this.state.editModalVisible}
                    onCancel={this.editModalCancel}
                    footer={null}
                >
                    <PrivilegeFormUI
                        formRef={this.editFormRef}
                        formLayout={EditLayoutForm}
                        onFinishCallback={this.editFinishCallback}
                    />
                </Modal>
            </>
        );
    }
}

export default PrivilegeList;