import React, {Component} from 'react';
import {
    Input,
    Table,
    Tag,
    Popconfirm,
    message,
    Modal,
    Select,
    Form, Button, TablePaginationConfig
} from "antd";
import {AccountInfoType, AccountListType} from "../../store/types/accountType";
import {AccountService} from "../../services/Account";
import {
    FormOutlined, CloseSquareOutlined, CheckSquareOutlined
} from '@ant-design/icons';
import AccountEdit from "./component/AccountEdit";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AccountState, AdminState} from "../../store/states/adminState";
import {
    AccountEditClickAction,
    AccountEditCloseAction,
    AccountEditStatusAction,
    AccountListChangeAction
} from "../../store/actions/accountAction";
import AccountSearch from "./component/AccountSearch";

class AccountList extends Component<any, any> {

    constructor(props :any) {
        super(props);
    }

    editClick(accountInfo: AccountInfoType) {
        this.props.accountEditClickDispatch(accountInfo)
    }

    editHandleCancel = () => {
        this.props.accountEditCloseDispatch(null)
    }

    updateStatus(accountInfo :AccountInfoType, status: number) {
        AccountService.accountUpdateStatus(accountInfo.account_id, status).then(() => {
            message.success("操作成功", 2).then(
                this.props.accountEditStatusDispatch({
                    account_id: accountInfo.account_id,
                    status: status,
                })
            )}
        )
    }

    onChange = (pageConfig: TablePaginationConfig, filters: any, sorter: any) => {
        const { searchKeyWords } = this.props;
        this.getAccountList(pageConfig, searchKeyWords)
    }

    componentDidMount() {
        const { pagination} = this.props;
        this.getAccountList(pagination, {})
    }

    getAccountList(pageConfig :TablePaginationConfig, keywords: {}) {
        const { pageSize, current } = pageConfig
        AccountService.accountList(pageSize, current, keywords).then(
            (res: AccountListType) => {
                this.props.accountListChangeDispatch(res)
            }
        ).catch(e => {
            console.log(e)
        })
    }

    render() {
        return (
            <div className="panel">
                <AccountSearch/>
                <div className="panel-body">
                    <Table
                        rowKey={"account_id"}
                        bordered={true}
                        dataSource={this.props.accountList}
                        loading={this.props.listLoading}
                        pagination={this.props.pagination}
                        onChange={this.onChange}
                        footer={()=> ''}
                    >
                        <Table.Column
                            title={"账号ID"}
                            dataIndex="account_id"
                            width={80}
                            key={"account_id"}
                            align={"center"}
                        />
                        <Table.Column
                            title={"账号名"}
                            dataIndex="name"
                            key={"name"}
                        />
                        <Table.Column
                            title={"昵称"}
                            dataIndex="given_name"
                            key={"given_name"}
                        />
                        <Table.Column
                            title={"邮箱"}
                            dataIndex="email"
                            key={"email"}
                        />
                        <Table.Column
                            title={"电话号"}
                            dataIndex="phone"
                            key={"phone"}
                        />
                        <Table.Column
                            title={"手机号"}
                            dataIndex="mobile"
                            key={"mobile"}
                        />
                        <Table.Column
                            title={"状态"}
                            dataIndex="status"
                            width={70}
                            key={"status"}
                            align={"center"}
                            render={(status: number) => {
                                if(status === 0){
                                    return <span><Tag color="blue">正常</Tag></span>
                                }else if(status === -1){
                                    return <Tag color="error">禁用</Tag>
                                }else {
                                    return <Tag color="warning">未知</Tag>
                                }
                            }}
                        />
                        <Table.Column
                            title={"操作"}
                            width={160}
                            key={"action"}
                            align={"center"}
                            render={(accountInfo: AccountInfoType) => (
                                <span>
                                    <a onClick={() => this.editClick(accountInfo)}><FormOutlined/> 修改 </a>
                                    {accountInfo.status === 0 &&
                                    <Popconfirm
                                        title="确定要禁用吗?"
                                        onConfirm={() => {
                                            this.updateStatus(accountInfo, -1)
                                        }}
                                        okText="确定"
                                        cancelText="取消"
                                    >
                                        <a><CloseSquareOutlined /> 禁用</a>
                                    </Popconfirm>
                                    }
                                    {accountInfo.status === -1 &&
                                        <Popconfirm
                                            title="确定要恢复吗?"
                                            onConfirm={() => {
                                                this.updateStatus(accountInfo, 0)
                                            }}
                                            okText="确定"
                                            cancelText="取消"
                                        >
                                            <a><CheckSquareOutlined /> 恢复</a>
                                        </Popconfirm>
                                    }
                                </span>
                            )}
                        />
                    </Table>
                </div>
                <Modal
                    title="账号修改"
                    width={570}
                    visible={this.props.editModalVisible}
                    onCancel={this.editHandleCancel}
                    footer={null}
                >
                    <AccountEdit />
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state: AdminState): AccountState => {
    return {
        ...state.accountState
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        accountListChangeDispatch: (data: AccountListType) => AccountListChangeAction(dispatch, data),
        accountEditClickDispatch: (data: AccountInfoType) => AccountEditClickAction(dispatch, data),
        accountEditCloseDispatch: (data: any) => AccountEditCloseAction(dispatch, data),
        accountEditStatusDispatch: (data: any) => AccountEditStatusAction(dispatch, data)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);