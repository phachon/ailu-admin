import React, {Component, RefObject} from 'react';
import AccountListUI from "../component/ListUI";
import {AccountInfoType, AccountListType} from "../../../store/types/accountType";
import {AccountService} from "../../../services/Account";
import {message, Modal, TablePaginationConfig} from "antd";
import {AccountState, AdminState} from "../../../store/states/adminState";
import {Dispatch} from "redux";
import {
    AccountEditFinishAction, AccountEditStatusAction,
    AccountListChangeAction, AccountSearchChangeAction, AccountSearchResetAction
} from "../../../store/actions/accountAction";
import {connect} from "react-redux";
import AccountSearchUI from "../component/SearchUI";
import {EditLayoutForm} from "../../../config/layout";
import AccountFormUI from "../component/FormUI";

class AccountList extends Component<any, any> {

    searchFormRef: RefObject<any>
    editFormRef: RefObject<any>

    constructor(props :any) {
        super(props);
        this.searchFormRef = React.createRef()
        this.editFormRef = React.createRef()
        this.state = {
            listLoading: false,
            editModalVisible: false,
        }
    }

    /**
     * 列表数据初始化
     */
    componentDidMount() {
        const { pagination} = this.props;
        this.searchResetCallback()
        this.getAccountList(pagination, {})
    }

    /**
     * 列表分页请求
     * @param pageConfig
     * @param filters
     * @param sorter
     */
    listChangeCallback = (pageConfig: TablePaginationConfig, filters: any, sorter: any) => {
        const { searchKeyWords } = this.props;
        this.getAccountList(pageConfig, searchKeyWords)
    }

    /**
     * 点击修改操作
     * @param accountInfo
     */
    editClickCallback = (accountInfo: AccountInfoType) => {
        this.setState({
            editModalVisible: true
        }, () => {
            this.editFormRef.current.setFieldsValue(accountInfo)
        })
    }

    /**
     * 修改弹框取消操作
     */
    editModalCancelCallback = () => {
        this.setState({
            editModalVisible: false
        })
    }

    /**
     * 修改完成操作
     * @param accountInfo AccountInfoType
     */
    editOnFinishCallback = (accountInfo: AccountInfoType) => {
        AccountService.accountUpdate(accountInfo).then(() => {
            message.success("修改成功", 2, () => {
                this.props.accountEditFinishDispatch(accountInfo)
                this.setState({
                    editModalVisible: false
                })
            })
        }).catch((e) => {
            console.log(e)
            message.error("修改失败", 2)
        })
    }

    /**
     * 更新账号状态操作
     * @param accountInfo
     * @param status
     */
    updateStatusCallback = (accountInfo :AccountInfoType, status: number) => {
        AccountService.accountUpdateStatus(accountInfo.account_id, status).then(() => {
            message.success("操作成功", 2, () => {
                this.props.accountEditStatusDispatch({
                    account_id: accountInfo.account_id,
                    status: status,
                })
            })
        }).catch(() => {
            message.error("操作失败", 2)
        })
    }

    /**
     * 搜索查询操作
     * @param values
     */
    searchChangeCallback = (values: any) => {
        this.props.searchChangeDispatch(values)
        const { pagination } = this.props;
        pagination.current = 1 // 搜索默认第一页
        this.getAccountList(pagination, values)
    }

    /**
     * 搜索重置操作
     */
    searchResetCallback = () => {
        this.props.searchResetDispatch({})
        this.searchFormRef.current?.resetFields()
    }

    getAccountList(pageConfig: TablePaginationConfig, keywords: {}) {
        const { pageSize, current } = pageConfig
        AccountService.accountList(pageSize, current, keywords).then((res: AccountListType) => {
            this.props.accountListChangeDispatch(res)
        }).catch(e => {
            console.log(e)
        })
    }

    render() {
        return (
            <div className="panel">
                <AccountSearchUI
                    searchForm={this.searchFormRef}
                    searchChangeCallback={this.searchChangeCallback}
                    searchResetCallback={this.searchResetCallback}
                />
                <AccountListUI
                    listLoading={false}
                    accountList={this.props.accountList}
                    pagination={this.props.pagination}
                    listChangeCallback={this.listChangeCallback}
                    editClickCallback={this.editClickCallback}
                    updateStatusCallback={this.updateStatusCallback}
                />
                <Modal
                    title="账号修改"
                    width={570}
                    visible={this.state.editModalVisible}
                    onCancel={this.editModalCancelCallback}
                    footer={null}
                >
                    <AccountFormUI
                        formRef={this.editFormRef}
                        formLayout={EditLayoutForm}
                        onFinishCallback={this.editOnFinishCallback}
                    />
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
        searchChangeDispatch: (data: any) => AccountSearchChangeAction(dispatch, data),
        accountListChangeDispatch: (data: AccountListType) => AccountListChangeAction(dispatch, data),
        accountEditStatusDispatch: (data: any) => AccountEditStatusAction(dispatch, data),
        searchResetDispatch: (data: any) => AccountSearchResetAction(dispatch, data),
        accountEditFinishDispatch: (data: any) => AccountEditFinishAction(dispatch, data)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);