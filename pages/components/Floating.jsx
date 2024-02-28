import React from 'react'
import { CommentOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
const Floating = () => {
  return (
    <div>    <FloatButton.Group
    trigger="click"
    className=' right-6'
    icon={<CheckCircleOutlined />}
  >
    <FloatButton />
    <FloatButton icon={<CommentOutlined />} />
  </FloatButton.Group>
</div>
  )
}

export default Floating