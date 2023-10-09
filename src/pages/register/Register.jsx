import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button,  Form, Input, message } from "antd";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
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
            Kayıt ol
          </Button>
          <h4>
            Hesabın var mı ? <Link to="/login">Giriş Yap</Link>
          </h4>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
