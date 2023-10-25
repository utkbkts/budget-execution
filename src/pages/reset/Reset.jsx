import React, {  useState } from "react";
import {  UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import "../login/login.scss";
import { auth } from "../../firebase/config";
import image1 from "../../components/image/Business Plan-cuate.png";
import image2 from "../../components/image/Learning-amico.png";
import image3 from "../../components/image/Learning-bro.png";
import image4 from "../../components/image/Team work-cuate.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { sendPasswordResetEmail } from "firebase/auth";
const Reset = () => {
  const [email, setEmail] = useState("");

  const onFinish = async (e) => {
    try {
        if (email) {
            await sendPasswordResetEmail(auth, email);
            message.success("Şifren sıfırlandı email hesabını kontrol et");
          } else {
            message.error("Parola sıfırlanamadı tekrar deneyiniz");
          }
    } catch (error) {
        message.error("Belirlenemeyen bir hata oluştu");
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Lütfen alanları doğru bir şekilde doldurunuz");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
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
        <h1>Parola Yenile</h1>
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
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Parola Sıfırla
          </Button>
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

export default Reset;
