import pic from '../assets/DRIP_20.png'
import Image from 'next/image'
import logo from '../assets/logo.svg'
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase';
import styled from 'styled-components';
import googleIcon from '../public/google-g-logo-icon-11609362962anodywxeaz.png';
import { useRouter } from 'next/router';

export default function Login(){
 const router=useRouter();
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
      };
 return(
  <div className='main'>
   <div className='login'>
    <div className="logo">
     <Image src={logo}/>
     <span>Weframe Global Chat Room</span>
    </div>
    <div className='content'>
     <span className='Heading'>
      Welcome to our global chat room!
     </span>
     <span className='info'>
      To join the conversation, simply sign up for an account. It's quick and easy, and it's free!
     </span>
    </div>
    <div className='Google'>
     <span id="loginGoo">
     <Button onClick={signIn} variant="outlined">
          <Image src={googleIcon}  width={25} height={25} />
          <ButtonText>SignIn with Google</ButtonText>
        </Button>
     </span>
     
    </div>
    <div className='signup'>Don't have an account? 
       <span className='sign' onClick={()=> router.push("/signup") } >SignUp</span>
    </div>
    
    <span className='copyright'>@Weframetech.com</span>
   </div>
   <div className='image'>
    <Image src={pic} width={500} height={520} />
   </div>
  </div>
 )
}

const ButtonText = styled.span`
  margin-left: 1rem;
  font-size: 1.2rem;
  font-family: 'Inter', sans-serif;
`;