import React, {Component} from 'react';
import {
    Input,
    Table,
    Tag,
    Popconfirm,
    message,
    Space,
    Modal,
    Select,
    Form, Button
} from "antd";
import {AccountListResp} from "../../store/account";
import AccountService from "../../services/account";
import {
    FormOutlined, StopOutlined,
} from '@ant-design/icons';
import AccountEdit from "./edit";

class AccountList extends Component<any,any> {

    accountService :AccountService

    constructor(props :any) {
        super(props);
        this.accountService = new AccountService()
        this.state = {
            isModalVisible: false,
            data: [],
            loading: true,
            pagination: {
                current: 1, // 默认页数
                pageSize: 10, // 默认条数
                total: 0,
            },
            keywords: {} // 搜索信息
        }
    }

    onSearch(values :any) {
        this.setState({
            loading: true,
            keywords: values,
        });
        const { pagination, keywords } = this.state;
        this.getAccountList(pagination.pageSize, pagination.current, keywords)
    }

    edit = () => {
        this.setState({
            isModalVisible: true,
        })
    }
    editHandleOk = () => {
        message.success("修改成功")
    }
    editHandleCancel = () => {
        this.setState({
            isModalVisible: false,
        })
    }

    confirmDelete(accountId :number) {
        message.success('删除成功');
    }

    onChange = (pageConfig :any, filters :any, sorter :any) => {
        this.setState({
            loading: true,
        });
        const { keywords } = this.state;
        this.getAccountList(pageConfig.pageSize, pageConfig.current, keywords)
    }

    componentDidMount() {
        this.setState({ loading: true });
        const { pagination, keywords } = this.state;
        this.getAccountList(pagination.pageSize, pagination.current, keywords)
    }

    getAccountList(pageSize :number, current :number, keywords :{}) {
        this.accountService.accountList(pageSize, current, keywords).then(
            (res: AccountListResp) => {
                this.setState({
                    data: res.list,
                    loading: false,
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
        const columns = [
            {
                title: '账号ID',
                dataIndex: 'account_id',
                width: 30,
            },
            {
                title: '账号名',
                dataIndex: 'name',
            },
            {
                title: '昵称',
                dataIndex: 'given_name',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
            {
                title: '电话号',
                dataIndex: 'phone',
            },
            {
                title: '手机号',
                dataIndex: 'mobile',
            },
            {
                title: '状态',
                dataIndex: 'status',
                width: 20,
                render: (status :number) => {
                    return <div>{status === 0 ? <Tag color="blue">正常</Tag> : <Tag color="error">禁用</Tag>}</div>
                }
            },
            {
                title: '操作',
                dataIndex: 'account_id',
                key: 'action',
                width: 140,
                render: (accountId :number) => {
                    return (
                    <span>
                        <Space>
                           <a onClick={this.edit}><FormOutlined /> 修改 </a>
                            <Popconfirm
                                title="确定要禁用吗?"
                                onConfirm={() => {
                                    this.confirmDelete(accountId)
                                }}
                                // onCancel={cancel}
                                okText="确定"
                                cancelText="取消"
                            >
                            <a href="#"><StopOutlined /> 禁用 </a>
                        </Popconfirm>
                        </Space>
                    </span>
                    )
                },
            },
        ];
        const { data, loading, pagination, isModalVisible} = this.state
        pagination.showQuickJumper = true
        pagination.showSizeChanger = true
        pagination.showTotal = (total :number) => {return `总共 ${total} 条`}
        return (
            <div className="panel">
                <div className="panel-body pdr0">
                    <Form layout={"inline"} style={{justifyContent: "end"}}
                          onFinish={values => {
                              this.onSearch(values)
                          }}
                    >
                        <Form.Item name="status" label="状态">
                            <Select defaultValue="">
                                <Select.Option value={""}>全部</Select.Option>
                                <Select.Option value={"0"}>正常</Select.Option>
                                <Select.Option value={"-1"}>禁用</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="account_name" label="账号名" style={{width: 260}}>
                            <Input placeholder="请输入账号名"/>
                        </Form.Item>
                        <Form.Item name="given_name" label="昵称" style={{width: 260}}>
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
                    <Table bordered
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        pagination={pagination}
                        onChange={this.onChange}
                        footer={()=> ''}
                    />
                </div>
                <Modal title="账号修改" width={570} visible={isModalVisible} onOk={this.editHandleOk} onCancel={this.editHandleCancel}>
                    <AccountEdit />
                </Modal>
            </div>
        );
    }
}

export default AccountList;