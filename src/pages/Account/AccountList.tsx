import React, {Component, ReactNode} from 'react';
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
import {AccountInfoType, AccountListType} from "../../store/types/account";
import AccountService from "../../services/account";
import {
    FormOutlined, StopOutlined,
} from '@ant-design/icons';
import AccountEdit from "./AccountEdit";

interface AccountListState {
    tableLoading: boolean
    editModalVisible?: boolean
    accountList? :AccountInfoType[]
    pagination :TablePaginationConfig
    searchKeyWords :{}
    editAccountInfo? :AccountInfoType
}

class AccountList extends Component<any, AccountListState> {

    constructor(props :any) {
        super(props);
        this.state = {
            tableLoading: true,
            pagination: {
                current: 1,
                pageSize: 10,
                total: 0,
            },
            searchKeyWords: {}
        }
    }

    onSearch(values :any) {
        this.setState({
            tableLoading: true,
            searchKeyWords: values,
        });
        const { pagination, searchKeyWords } = this.state;
        this.getAccountList(pagination.pageSize, pagination.current, searchKeyWords)
    }

    editClick(accountInfo :AccountInfoType) {
        this.setState({
            editModalVisible: true,
            editAccountInfo: accountInfo
        })
    }

    editHandleCancel = () => {
        this.setState({
            editModalVisible: false,
        })
    }

    editCallback = () => {
        this.setState({
            editModalVisible: false,
        })
    }

    confirmForbid(accountInfo :AccountInfoType) {
        AccountService.accountUpdateStatus(accountInfo.account_id, -1).then(
            () => {
                message.success("禁用成功", 1).then(
                    () => window.location.reload()
                )
            }
        )
    }

    onChange = (pageConfig :any, filters :any, sorter :any) => {
        this.setState({
            tableLoading: true,
        });
        const { searchKeyWords } = this.state;
        this.getAccountList(pageConfig.pageSize, pageConfig.current, searchKeyWords)
    }

    componentDidMount() {
        this.setState({ tableLoading: true });
        const { pagination, searchKeyWords } = this.state;
        this.getAccountList(pagination.pageSize, pagination.current, searchKeyWords)
    }

    getAccountList(pageSize :number | undefined, current :number | undefined, keywords :{}) {
        AccountService.accountList(pageSize, current, keywords).then(
            (res: AccountListType) => {
                this.setState({
                    accountList: res.list,
                    tableLoading: false,
                    pagination: {
                        current: res.page_info?.page_num,
                        pageSize: res.page_info?.page_size,
                        total: res.page_info?.total_num,
                    },
                })
            }
        ).catch(e => {
            console.log(e)
        })
    }

    render() {
        const { accountList, tableLoading, pagination, editModalVisible, editAccountInfo} = this.state
        pagination.showQuickJumper = true
        pagination.showSizeChanger = true
        pagination.showTotal = (total :number) => {return `总共 ${total} 条`}
        return (
            <div className="panel">
                <div className="panel-body pdr0">
                    <Form
                        layout={"inline"}
                        style={{justifyContent: "end"}}
                        onFinish={values => {
                            this.onSearch(values)
                        }}
                    >
                        <Form.Item
                            name="status"
                            label="状态"
                        >
                            <Select defaultValue="">
                                <Select.Option value={""}>全部</Select.Option>
                                <Select.Option value={"0"}>正常</Select.Option>
                                <Select.Option value={"-1"}>禁用</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="account_name"
                            label="账号名"
                            style={{width: 260}}
                        >
                            <Input placeholder="请输入账号名"/>
                        </Form.Item>
                        <Form.Item
                            name="given_name"
                            label="昵称"
                            style={{width: 260}}
                        >
                            <Input placeholder="请输入昵称"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="default">重置</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">查询</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="panel-body">
                    <Table
                        bordered={true}
                        dataSource={accountList}
                        loading={tableLoading}
                        pagination={pagination}
                        onChange={this.onChange}
                        footer={()=> ''}
                    >
                        <Table.Column
                            title={"账号ID"}
                            dataIndex="account_id"
                            width={30}
                            key={"account_id"}
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
                            width={20}
                            key={"status"}
                            render={(status :number) => {
                                if(status === 0){
                                    return <Tag color="blue">正常</Tag>
                                }else if(status === -1){
                                    return <Tag color="error">禁用</Tag>
                                }else {
                                    return <Tag color="error">未知</Tag>
                                }
                            }}
                        />
                        <Table.Column
                            title={"操作"}
                            width={140}
                            key={"action"}
                            render={(accountInfo: AccountInfoType) => (
                                <span>
                                    <a onClick={() => this.editClick(accountInfo)}><FormOutlined/> 修改 </a>
                                    <Popconfirm
                                        title="确定要禁用吗?"
                                        onConfirm={() => {
                                            this.confirmForbid(accountInfo)
                                        }}
                                        okText="确定"
                                        cancelText="取消"
                                    >
                                        <a><StopOutlined/> 禁用</a>
                                    </Popconfirm>
                                </span>
                            )}
                        />
                    </Table>
                </div>
                <Modal
                    title="账号修改"
                    width={570}
                    visible={editModalVisible}
                    onCancel={this.editHandleCancel}
                    footer={null}
                >
                    <AccountEdit accountInfo={editAccountInfo} editCallback={this.editCallback} />
                </Modal>
            </div>
        );
    }
}

export default AccountList;