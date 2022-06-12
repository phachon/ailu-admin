import React, {Component} from 'react';
import {Popconfirm, Table, TablePaginationConfig} from "antd";
import {CloseSquareOutlined, FormOutlined} from "@ant-design/icons";
import {RoleInfoType, RoleListType} from "../../store/types/roleType";
import {RoleService} from "../../services/Role";
import {connect} from "react-redux";
import {AdminState, RoleState} from "../../store/states/adminState";
import {Dispatch} from "redux";
import {RoleListChangeAction, RoleSearchResetAction} from "../../store/actions/roleAction";
import RoleSearch from "./component/RoleSearch";

class RoleList extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    onChange = (pageConfig: TablePaginationConfig, filters: any, sorter: any) => {
        const { searchKeyWords } = this.props;
        this.getRoleList(pageConfig, searchKeyWords)
    }

    deleteRole(roleInfo: RoleInfoType) {

    }

    componentDidMount() {
        const {pagination} = this.props
        this.getRoleList(pagination, {})
    }

    getRoleList(pagination: TablePaginationConfig, searchKeyWords: {}) {
        const pageSize = pagination.pageSize
        const current = pagination.current
        RoleService.roleList(pageSize, current, searchKeyWords).then((roleList: RoleListType) => {
            this.props.roleListChangeDispatch(roleList)
        })
    }

    render() {
        return (
            <div className="panel">
                <RoleSearch />
                <div className="panel-body">
                    <Table
                        rowKey={"role_id"}
                        bordered={true}
                        dataSource={this.props.roleList}
                        loading={this.props.listLoading}
                        pagination={this.props.pagination}
                        onChange={this.onChange}
                        footer={()=> null}
                    >
                        <Table.Column
                            title={"角色ID"}
                            dataIndex="role_id"
                            width={80}
                            key={"role_id"}
                            align={"center"}
                        />
                        <Table.Column
                            title={"角色名"}
                            dataIndex="name"
                            key={"name"}
                        />
                        <Table.Column
                            title={"修改时间"}
                            dataIndex="update_time"
                            key={"update_time"}
                            width={220}
                            align={"center"}
                        />
                        <Table.Column
                            title={"操作"}
                            width={160}
                            key={"action"}
                            align={"center"}
                            render={(roleInfo: RoleInfoType) => (
                                <span>
                                    <a onClick={() => {}}><FormOutlined/> 修改 </a>
                                        <Popconfirm
                                            title="确定要删除吗?"
                                            onConfirm={() => this.deleteRole(roleInfo)}
                                            okText="确定"
                                            cancelText="取消"
                                        >
                                            <a><CloseSquareOutlined /> 删除</a>
                                        </Popconfirm>

                                </span>
                            )}
                        />
                    </Table>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        roleListChangeDispatch: (data: any) => RoleListChangeAction(dispatch, data),
        searchResetDispatch: (data: any) => RoleSearchResetAction(dispatch, data)
    }
}

const mapStateToProps = (state: AdminState): RoleState => {
    return {
        ...state.roleState
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleList);