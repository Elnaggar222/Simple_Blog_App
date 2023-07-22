import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import * as Yup from "yup";
import { AuthContext } from "../../contexts/AuthContext";
import styles from './Auth.module.css'

const LoginForm = () => {

  const [loading,setLoading] = useState(false)
  const {logIn} = useContext(AuthContext)

  const formik = useFormik({
    validateOnMount: true,

    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object().shape({
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
    }),

    onSubmit: async (vals) => {
      console.log("values",vals);
      if(formik.isValid){
        setLoading(true)
        try {
          await logIn({ email: vals.email , password: vals.password })
        } catch (error) {
          alert(error.message)
        }
      }
      setLoading(false)
    },
  });

  console.log("formik is", formik);

  return (
    <Card className="p-5 bg-light">
      <Form onSubmit={formik.handleSubmit}>
        
        <Form.Group className="mb-3" controlId="formBasicMail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="Enter Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.email && formik.errors.email}
          />
          {(formik.touched.email && formik.errors.email) && (
            <Form.Text className="text-danger">
              {formik.errors.email}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.password && formik.errors.password}
          />
          {(formik.touched.password && formik.errors.password) && (
            <Form.Text className="text-danger">
              {formik.errors.password}
            </Form.Text>
          )}
        </Form.Group>

        <Button disabled={loading} className="w-100" variant="primary" type="submit">
          Login {loading ?'....':null}
        </Button>
      </Form>
    </Card>
  );
};

export default LoginForm;
