import styled from "styled-components"
import { Avatar, IconButton } from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function Sidebar() {
  return (
    <Container>
        <Header>
           <UserAvatar />
           <IconsContainer>
           <IconButton>
           <MessageIcon />
           </IconButton>
           <IconButton>
           <NotificationsActiveIcon />
           </IconButton>
           <IconButton>
            <LogoutIcon />
           </IconButton>
             
            
           </IconsContainer>
        </Header>

        <Search>
          <SearchIcon />
         <SearchInput 
            placeholder="Search for chats..."
         />
        </Search>
      
      {/* list of chats */}


       <SidebarButton>
        <AddCircleIcon style={{ fontSize: 88, color: "#25D366" }} />
       </SidebarButton>

    </Container>
  )
}

export default Sidebar;

const Container = styled.div``;

const UserAvatar = styled(Avatar)`
 cursor: pointer;

 :hover {
    opacity: 0.8;
 }
`;

const IconsContainer = styled.div``;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  height: 7rem;
  border-bottom: 2.5px solid whitesmoke;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 1.4rem;
  border-radius: 0.2rem;
  background-color: #f1f3f5;
`;

const SearchInput = styled.input`
  outline: none;
  border: none;
  flex: 1;
  font-size: 1.5rem;
  padding: 1rem;
  border-radius: 1rem;
`;

const SidebarButton = styled.button`
  position: absolute;
  bottom: 1.85rem;
  right: 3.5rem;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  border: none;
  outline: none;
  padding: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  box-shadow: none;
`;