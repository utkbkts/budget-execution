import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import image1 from "../../components/image/Business Plan-cuate.png";
import image2 from "../../components/image/Learning-amico.png";
import image3 from "../../components/image/Learning-bro.png";
import image4 from "../../components/image/Team work-cuate.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Spinner from "../../components/spinner/Spinner";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const onFinish = async (e) => {
    try {
      setLoading(true);
      if (email && password) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
        message.success("Başarıyla giriş yapıldı");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
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

 
  useEffect(() => {
    setLoading(false); 
  }, []);

  if (Loading) {
    return <Spinner />;
  }
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

          <Link to={"/reset"} className="login-form-forgot" href="">
            Şifreni mi unuttun ?
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
           {Loading ? "Giriş yapılıyor":" Giriş Yap"}
          </Button>
          <h4>
            Hesabın yok mu ? <Link to="/register">Kayıt ol</Link>
          </h4>
        </Form.Item>
      </Form>
      <div className="slider-login">
        <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true}>
          <div className="image">
            <img className="" src={image1} />
          </div>
          <div className="image">
            <img className="" src={image2} />
          </div>
          <div className="image">
            <img className="" src={image3} />
          </div>
          <div className="image">
            <img className="" src={image4} />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Login;
