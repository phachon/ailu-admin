import React, {Component, RefObject} from 'react';
import {Button, Form, FormInstance, Input, Select, TablePaginationConfig} from "antd";
import {AccountState, AdminState} from "../../../store/states/adminState";
import {Dispatch} from "redux";
import {
    AccountListChangeAction,
    AccountSearchChangeAction,
    AccountSearchResetAction
} from "../../../store/actions/accountAction";
import {connect} from "react-redux";
import {AccountService} from "../../../services/Account";
import {AccountListType} from "../../../store/types/accountType";

class AccountSearch extends Component<any, any> {

    formRef: RefObject<FormInstance>

    constructor(props: any) {
        super(props);
        this.formRef = React.createRef()
    }

    onReset() {
        this.props.searchResetDispatch()
        this.formRef.current?.resetFields()
    }

    onSearch(values: any) {
        this.props.searchChangeDispatch(values)
        const { pagination } = this.props;
        this.getAccountList(pagination, values)
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

    componentDidMount() {
        this.formRef.current?.setFieldsValue(this.props.searchKeyWords)
    }

    render() {
        return (
            <div className="panel-body pdr0">
                    <Form
                        layout={"inline"}
                        style={{justifyContent: "end"}}
                        onFinish={values => {
                            this.onSearch(values)
                        }}
                        ref={this.formRef}
                    >
                        <Form.Item
                            name="status"
                            label="状态"
                            initialValue={""}
                        >
                            <Select>
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
                            <Button type="default" htmlType={"button"} onClick={() => this.onReset()}>重置</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">查询</Button>
                        </Form.Item>
                    </Form>
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
        searchChangeDispatch: (data: any) => AccountSearchChangeAction(dispatch, data),
        accountListChangeDispatch: (data: any) => AccountListChangeAction(dispatch, data),
        searchResetDispatch: (data: any) => AccountSearchResetAction(dispatch, data)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSearch);