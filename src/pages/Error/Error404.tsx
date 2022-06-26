import React from 'react';
import {Result, Button} from "antd";

const Error404 = () => {
    return (
        <>
            <Result
                status="404"
                title="404"
                subTitle="对不起, 您访问的页面不存在！"
                extra={<Button type="primary">返回主页</Button>}
            />
        </>
    );
}
export default Error404;