import { toast } from "react-toastify";

const mailformat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const mobileFormat = /^(?:\+?880|0)1[3-9]\d{8}$/;
const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

class FormValidation {
  isEmpty(value) {
    return value?.trim().length === 0;
  }

  isValidDate(date) {
    const isValidDate = !isNaN(Date.parse(date));
    if (isValidDate) {
      return true;
    }
    return false;
  }

  isValidEmail(email) {
    return mailformat.test(email);
  }

  isValidPhone(mobile) {
    return mobileFormat.test(mobile);
  }

  isValidPassword(password) {
    if (password) {
      return passwordFormat.test(password);
    }
    return false;
  }

  errorToast(message) {
    toast.error(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  successToast(message) {
    toast.success(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
}

export const {
  isEmpty,
  isValidEmail,
  isValidPhone,
  isValidPassword,
  isValidDate,
  errorToast,
  successToast,
} = new FormValidation();
