import React, {Component} from 'react';
import {Button, Form, FormInstance, Input, Select, TablePaginationConfig} from "antd";
import {connect} from "react-redux";
import {AdminState, RoleState} from "../../../store/states/adminState";
import {Dispatch} from "redux";
import {RoleListChangeAction, RoleSearchChangeAction, RoleSearchResetAction} from "../../../store/actions/roleAction";
import {RoleService} from "../../../services/Role";
import {RoleListType} from "../../../store/types/roleType";

class RoleSearch extends Component<any, any> {

    formRef: React.RefObject<FormInstance>

    constructor(props: any) {
        super(props);
        this.formRef = React.createRef()
    }

    onSearch(values: any) {
        this.props.roleOnSearchDispatch(values)
        const { pagination } = this.props;
        pagination.current = 1
        this.getRoleList(pagination, values)
    }

    onResetSearch() {
        this.props.searchResetDispatch({})
        this.formRef.current?.resetFields()
    }

    getRoleList(pagination: TablePaginationConfig, searchKeyWords: {}) {
        const pageSize = pagination.pageSize
        const current = pagination.current
        RoleService.roleList(pageSize, current, searchKeyWords).then((roleList: RoleListType) => {
            this.props.roleListChangeDispatch(roleList)
        })
    }

    componentDidMount() {
        this.onResetSearch()
    }

    render() {
        return (
            <div className="panel-body">
                <Form
                    layout={"inline"}
                    style={{justifyContent: "end"}}
                    onFinish={values => {this.onSearch(values)}}
                    ref={this.formRef}
                >
                    <Form.Item
                        name="role_name"
                        label="角色名"
                        style={{width: 260}}
                    >
                        <Input placeholder="请输入角色名"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="default" htmlType={"button"} onClick={() => this.onResetSearch()}>重置</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state: AdminState): RoleState => {
    return {
        ...state.roleState
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        roleOnSearchDispatch: (data: any) => RoleSearchChangeAction(dispatch, data),
        roleListChangeDispatch: (data: any) => RoleListChangeAction(dispatch, data),
        searchResetDispatch: (data: any) => RoleSearchResetAction(dispatch, data)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleSearch);