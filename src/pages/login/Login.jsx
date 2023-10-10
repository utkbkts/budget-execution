import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import image1 from "../../components/image/Business Plan-cuate.png";
import image2 from "../../components/image/Learning-amico.png";
import image3 from "../../components/image/Learning-bro.png";
import image4 from "../../components/image/Team work-cuate.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: {
      0: {
        items: 1,
        400: {
          items: 2,
        },
        600: {
          items: 3,
        },
        800: {
          items: 4,
        },
      },
    },
  };
  const onFinish = async (e) => {
    try {
      if (email && password) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
        message.success("Başarıyla giriş yapıldı");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Lütfen alanları doğru bir şekilde doldurunuz");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="container-login">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h1>Giriş Sayfası</h1>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Lütfen email hesabınızı giriniz!",
            },
          ]}
        >
          <Input
            value={email}
            onChange={handleEmailChange}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Lütfen şifrenizi giriniz!",
            },
          ]}
        >
          <Input
            value={password}
            onChange={handlePasswordChange}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Parola"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Beni Hatırla</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Şifreni mi unuttun ?
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Giriş Yap
          </Button>
          <h4>
            Hesabın yok mu ? <Link to="/register">Kayıt ol</Link>
          </h4>
        </Form.Item>
      </Form>
      <div className="slider-login">
        <OwlCarousel {...options}>
          <div className="image">
            <img src={image1} alt="" />
          </div>
          <div className="image1">
            <img src={image2} alt="" />
          </div>
          <div className="image2">
            <img src={image3} alt="" />
          </div>
          <div className="image3">
            <img src={image4} alt="" />
          </div>
        </OwlCarousel>
      </div>
    </div>
  );
};

export default Login;
