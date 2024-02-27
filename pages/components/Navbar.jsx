import { Menu } from 'antd';

const NavBar = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="dashboard">Dashboard</Menu.Item>
      <Menu.Item key="about">About</Menu.Item>
      <Menu.Item key="settings">Settings</Menu.Item>
    </Menu>
  )
}

export default NavBar;
