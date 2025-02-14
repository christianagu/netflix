import * as Yup from "yup";

export const userSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, "Username must be at least 3 characters long")
        .required("Username is required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one numeric digit")
        .matches(/[^a-zA-Z0-9]/, "Password must contain at least one special character")
        .required("Password is required"),
});