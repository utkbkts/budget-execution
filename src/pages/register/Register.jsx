import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import "../login/login.scss";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import image1 from "../../components/image/Business Plan-cuate.png";
import image2 from "../../components/image/Learning-amico.png";
import image3 from "../../components/image/Learning-bro.png";
import image4 from "../../components/image/Team work-cuate.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Spinner from "../../components/spinner/Spinner";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [Loading, setLoading] = useState(true);

  const navigate = useNavigate();
 
  const onFinish = async (e) => {
    if (name && email && password && file) {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const storageRef = ref(storage, `user-profiles/${user.uid}/${file.name}`);
      await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await updateProfile(user, {
        displayName: `${name}`,
        photoURL: downloadURL, // Set the photoURL
      });
      navigate("/");
      message.success("Başarıyla kayıt olundu");
    } else {
      return message.error("Alanları Doldurunuz");
    }
  };
  const onFinishFailed = (errorInfo) => {
    message.error("Lütfen alanları doğru bir şekilde doldurunuz");
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
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
        <h1>Kayıt Sayfası</h1>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Lütfen isminizi giriniz!",
            },
          ]}
        >
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="İsminiz"
          />
        </Form.Item>
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Parola"
          />
        </Form.Item>
       <>
       <div className="form-group show-password">
                  <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                    Profil Resmi seçiniz
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    className="form-control"
                    onChange={handleFileChange} // Update this line to call handleFileChange
                    style={{ display: "none"}}
                  />
                </div>
                {file && (
                  <div className="mt-3">
                    <img
                      src={URL.createObjectURL(file)} // Display the uploaded image
                      alt="Preview"
                      style={{ width: "50px", height: "50px",borderRadius:"100%" }}
                    />
                  </div>
                )}
       </>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {!Loading ? "Kayıt Ol":"Kayıt Olunuyor"}
          </Button>
          <h4>
            Hesabın var mı ? <Link to="/login">Giriş Yap</Link>
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

export default Register;
