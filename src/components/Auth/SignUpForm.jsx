
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import * as Yup from "yup";
import { AuthContext } from "../../contexts/AuthContext";
import styles from '././Auth.module.css'

const SignUpForm = () => {

  const {signUp} = useContext(AuthContext)
  const [loading,setLoading] = useState(false)

  const formik = useFormik({
    validateOnMount: true,

    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      approved: false
    },

    validationSchema: Yup.object().shape({
      username: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
      confirmPassword: Yup.string().required().oneOf([Yup.ref('password')],'Not Matched password'),
      approved: Yup.boolean().oneOf([true],'Required Field :(')
    }),

    onSubmit: async (vals) => {
      console.log("values",vals);
      if(formik.isValid){
        setLoading(true)
        try {
          await signUp({ email: vals.email , password: vals.password })
        } catch (error) {
          alert(error.message);
        }
      }
      setLoading(false)
    },
  });

  console.log("formik is", formik);

  return (
    <Card className="p-4 bg-light px-5" >
      <Form onSubmit={formik.handleSubmit}>

      <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Usename</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.username && formik.errors.username}
          />
          {formik.touched.username && formik.errors.username && (
            <Form.Text className="text-danger">{formik.errors.username}</Form.Text>
          )}
        </Form.Group>

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
          {formik.touched.email && formik.errors.email && (
            <Form.Text className="text-danger">{formik.errors.email}</Form.Text>
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
          {formik.touched.password && formik.errors.password && (
            <Form.Text className="text-danger">
              {formik.errors.password}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>confirmPassword</Form.Label>
          <Form.Control
            type="Password"
            placeholder="confirm Password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <Form.Text className="text-danger">
              {formik.errors.confirmPassword}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check 
            type="checkbox" 
            label="I've read terms and conditions"
            name="approved"
            value={formik.values.approved}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.approved && formik.errors.approved}
          />
          {formik.touched.approved && formik.errors.approved && (
            <Form.Text className="text-danger">
              {formik.errors.approved}
            </Form.Text>
          )}
        </Form.Group>

        <Button disabled={loading} className="w-100" variant="primary" type="submit">
          SignUp {loading ?'....':null}
        </Button>
      </Form>
    </Card>
  );
};

export default SignUpForm;
