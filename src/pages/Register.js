import React, { useState } from "react";
import { registerUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { userSchema } from "../validators/userValidator"; // Import the validator
import { Formik, Form, Field, ErrorMessage } from "formik";

const Register = () => {
    const [user, setUser] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(user);
            navigate("/login");
        } catch (err) {
            setError("Registration failed. Try again.");
        }
    };


    return (
        <div className="flex-center mt-20">
            <div className="card">
                <div className="flex justify-center items-center min-h-screen bg-gray-100">
                    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>

                        <Formik
                            initialValues={{ username: "", email: "", password: "" }}
                            validationSchema={userSchema}
                            onSubmit={async (values, { setSubmitting, setErrors }) => {
                                try {
                                    await registerUser(values);
                                    navigate("/login");
                                } catch (err) {
                                    setErrors({ server: "Registration failed. Try again." });
                                }
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting, errors }) => (
                                <Form className="space-y-4">
                                    {errors.server && <p className="text-red-500 text-center">{errors.server}</p>}

                                    <div>
                                        <label className="block text-gray-700">Username:</label>
                                        <Field
                                            type="text"
                                            name="username"
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                        <ErrorMessage name="username" component="div" className="text-red-500" />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700">Email:</label>
                                        <Field
                                            type="email"
                                            name="email"
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-red-500" />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700">Password:</label>
                                        <Field
                                            type="password"
                                            name="password"
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-red-500" />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white p-2 rounded"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Registering..." : "Register"}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
