import React, { Component } from 'react';
import { PrivilegeService } from '../../../services/Privilege';
import PrivilegeListUI from '../component/ListUI';

class PrivilegeList extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            privilegeList: []
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
            // this.props.listChangeDispatch(privilegeList)
            this.setState({
                privilegeList: privilegeList.list
            })
        })
    }

    render() {
        const privilegeList = this.state.privilegeList
        return (
            <PrivilegeListUI
                privilegeList={privilegeList}
            />
        );
    }
}

export default PrivilegeList;