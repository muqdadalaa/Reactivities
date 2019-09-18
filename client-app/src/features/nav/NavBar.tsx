import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface IProps{
  openCreateActivity: () => void
}

const NavBar:React.FC<IProps> =  ({openCreateActivity}) => {
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header>
            <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}}/>
            Reactivities
        </Menu.Item>
        <Menu.Item name='Activities' />
        <Menu.Item>
            <Button onClick={openCreateActivity} positive content='Create Activity' />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
