import React, { useState } from "react";
import { useNavigate } from "react-router";
import { SmileOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styled, { keyframes } from "styled-components";

const move = keyframes`
0%{
    opacity:0;
}
95%{
    opacity:1;
}
`;
const BackgroundBox = styled.div`
  background-color: hsla(230,40%,50%,0.5);
  height: 50vh;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15rem auto;
  position: relative;
  border-radius: 23px;
  border: 1px solid hsla(230,40%,50%,1);
  .text1 {
    z-index: ${(props) => (props.clicked ? "-700" : "700")};
    transform: ${(props) =>
      props.clicked ? "translateX(0)" : "translateX(100%)"};
    transition: transform 1s ease-in-out;
    animation: ${(props) => (props.clicked ? move : "none")} 1.5s;
  }
  .text2 {
    z-index: ${(props) => (props.clicked ? "700" : "-700")};
    animation: ${(props) => (props.clicked ? "none" : move)} 1.5s;
    transform: ${(props) =>
      props.clicked ? "translateX(-100%)" : "translateX(0%)"};
    transition: transform 1s ease-in-out;
  }
  .signin {
    position: absolute;
    top: 0%;
    text-align: center;
    z-index: ${(props) => (props.clicked ? "-600" : "500")};
    transform: ${(props) => (props.clicked ? "none" : "translateX(-50%)")};
    transition: all 1s;
  }
  .signup {
    position: absolute;
    top: 0%;
    text-align: center;
    z-index: ${(props) => (props.clicked ? "500" : "-500")};
    transform: ${(props) => (props.clicked ? "translateX(50%)" : "none")};
    transition: all 1s;
  }
`;

const Box1 = styled.div`
	background-color: #fff;
	width: 50%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	transform: ${(props) =>
		props.clicked ? "translateX(90%)" : "translateX(10%)"};
	transition: transform 1s;
	&::after,
	&::before {
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #484d87;
		z-index: -200;
	}
	&::before {
		top: 3rem;
		border-radius: 23px;
		border: 4px solid #fff;
	}
	&::after {
		bottom: 3rem;
		border-radius: 23px 23px 0 0;
		border-top: 4px solid #fff;
		border-right: 4px solid #fff;
		border-left: 4px solid #fff;
	}
`;

const Box2 = styled.div`
  background-color: hsla(230,40%,50%,1);
  width: 45%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 600;
  transform: ${(props) =>
    props.clicked ? "translateX(-122%)" : "translateX(0%)"};
  transition: transform 1s;
  border-radius: ${(props) =>
    props.clicked ? "23px 0 0 23px" : "0 23px 23px 0"};
`;

const Form = styled.form`
  color: #1b1b1b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 0.5rem;
  /* z-index: 100; */
  border: none;
`;

const Input = styled.input`
  background-color: #fff;
  border: none;
  border-bottom: 1px solid hsla(230,40%,50%,1);
  padding: 1rem 1rem;
  margin: 0.5rem 0;
  width: 17vw;
  border-radius: 2px;
  &::placeholder {
    font-size: 14px;
	color: hsla(230,40%,50%,1);
  }
  &:focus {
	  
  }
`;

// const MyButton = styled.button`
//   border-radius: 3px;
//   padding: 1rem 3.5rem;
//   margin-top: 1rem;
//   border: 1px solid black;
//   background-color: black;
//   color: #484d87;
//   text-transform: uppercase;
//   cursor: pointer;
//   letter-spacing: 1px;
//   box-shadow: 0 7px #999;
//   &:hover {
//     background-color: #1b1b1b;
//   }
//   &:active {
//     background-color: black;
//     box-shadow: 0 5px #666;
//     transform: translateY(4px);
//   }
//   &:focus {
//     outline: none;
//   }
// `;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 2rem;
  color: #fff;
`;

const Link = styled.a`
  text-decoration: none;
  color: #fff;
  font-size: 1.4rem;
  margin: 1rem 0;
`;

const ButtonAnimate = styled.button`
  position: absolute;
  z-index: 1000;
  height: 5rem;
  width: 5rem;
  top: 70%;
  border: none;
  cursor: pointer;
  right: ${(props) => (props.clicked ? "52%" : "42%")};
  transform: ${(props) => (props.clicked ? "rotate(360deg)" : "rotate(0)")};
  transition: all 1.5s;
  background-color: transparent;
  &::before {
    content: "😜";
    font-size: 4rem;
  }
  &:focus {
    outline: none;
  }
`;

const Text = styled.div`
  	position: absolute;
  	z-index: 1000;
  	font-size: 1.5rem;
  	display: flex;
  	flex-direction: column;
	letter-spacing: 0.2rem;
	color: #fff;
	.attention {
		font-size: 2.5rem;
		position: relative;
		margin-top: 2rem;
	}
	.attention-icon {
		position: absolute;
		right: ${(props) => (props.clicked ? "0" : "none")};
		top: 100%;
		font-size: 5rem;
	}
`;


const LoginForm = (props) => {

	const navigate = useNavigate();
  	const [click, setClick] = useState(false);
	const [userName, setUserName] = useState('')
	const [password, setPassword] = useState('')
	// const [valid, setValid] = useState(true);

  	const handleClick = () => setClick(!click);
  	console.log(userName);

	const signInButtonClickedHandler = () => {
			props.successNotification();
			navigate('/dashboard');
	}


	return (
	<>
      	{" "}
      	<BackgroundBox clicked={click}>

        <ButtonAnimate clicked={click} onClick={handleClick}></ButtonAnimate>

        <Form className="signin">
          <Title>Sign In</Title>
          <Input 
		  		type="email" 
			    name="email" 
				id="emailId" 
				placeholder="Email" 
				onChange={(e) => {
					setUserName(e.target.value)
				}}
			/>
          <Input
            type="password"
            name="password" f
            id="passwordId"
            placeholder="Password"
			onChange={(e) => {
				setPassword(e.target.value)
			}}
          />
          <Link href="#">Forgot Your Password?</Link>
          <Button onClick={signInButtonClickedHandler} style={{backgroundColor: 'hsla(230,40%,50%,1)', color: '#fff', fontSize: '16px', fontWeight: 800,padding: '3px 15px'}}>Sign In</Button>
		{/* {!valid ? <p style={{position: 'absolute',top: '330px', color:'#fc9003', fontSize: '12px', fontWeight: 400}}>Sorry your username or password is not correct</p> : ''} */}
        </Form>

        <Form className="signup">
          <Title>Sign Up</Title>
          <Input
            type="text"
            name="username"
            id="usernameId"
            placeholder="Username"
          />

          <Input type="email" name="email" id="emailId" placeholder="Email" />
          <Input
            type="password"
            name="password"
            id="passwordId"
            placeholder="Password"
			onChange={(e) => {
				setPassword(e.target.value)
			}}
          />
          <Link href="#" onClick={handleClick}>
            Already have an Account?
          </Link>
          <Button onClick={signInButtonClickedHandler} style={{backgroundColor: 'hsla(230,40%,50%,1)', color: '#fff', fontSize: 16, fontWeight: 800}}>Sign Up</Button>
        </Form>

        <Text className="text1" clicked={click}>
          	<h1>Welcome !!</h1>
          		Don't have an account?
          	<br />
          	<span className="attention">Click on Emoji</span>
          	<span className="attention-icon">⤶</span>
        </Text>

        <Text className="text2" clicked={click}>
          	<h1>Hi There!</h1>
          		Already have an account?
          	<br />
          	<span className="attention">Click on Emoji</span>
          	<span className="attention-icon">⤷</span>
        </Text>

        	<Box1 clicked={click} />
        	<Box2 clicked={click} />
      </BackgroundBox>
    </>
  );
}

export default LoginForm;
