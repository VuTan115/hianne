export function isVietnamesePhoneNumber(num: string) {
  return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(num);
}

export function isUrl(url: string) {
  const pattern =
    // eslint-disable-next-line max-len
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  return pattern.test(url);
}

type TLoginValues = {
  email: string;
  password: string;
};
type TSignUpValues = TLoginValues & {
  confirm_password: string;
  phone: string;
  name: string;
  student_id: string;
  date_of_birth: string;
  gender: string;
  faculty: string;
};

export function login_validate(values: TLoginValues) {
  const errors = {} as TLoginValues;

  if (!values.email) {
    errors.email = 'Vui lòng nhập địa chỉ email!';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Nhập Email hợp lệ!';
  }

  // validation for password
  if (!values.password) {
    errors.password = 'Vui lòng nhập mật khẩu!';
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = 'Mật khẩu phải lớn hơn 8 và nhỏ hơn 20 ký tự';
  } else if (values.password.includes(' ')) {
    errors.password = 'Mật khẩu không hợp lệ';
  }

  return errors;
}

export function registerValidate(values: TSignUpValues) {
  const errors = {} as TSignUpValues;
  // name validation
  if (!values.name) {
    errors.name = 'Vui lòng nhập tên!';
  } else if (values.name.length < 3 || values.name.length > 28) {
    errors.name = 'Tên phải lớn hơn 3 và nhỏ hơn 20 ký tự';
  }

  if (!values.email) {
    errors.email = 'Vui lòng nhập địa chỉ email!';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Nhập Email hợp lệ!';
  }

  // validation for password
  if (!values.password) {
    errors.password = 'Vui lòng nhập mật khẩu!';
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = 'Mật khẩu phải lớn hơn 8 và nhỏ hơn 20 ký tự';
  } else if (values.password.includes(' ')) {
    errors.password = 'Mật khẩu không hợp lệ';
  }

  // validate confirm password
  if (!values.confirm_password) {
    errors.confirm_password = 'Vui lòng xác nhận mật khẩu!';
  } else if (values.password !== values.confirm_password) {
    errors.confirm_password = 'Mật khẩu không khớp...!';
  } else if (values.confirm_password.includes(' ')) {
    errors.confirm_password = 'Mật khẩu không hợp lệ';
  }

  if (!values.phone) {
    errors.phone = 'Vui lòng nhập số điện thoại!';
  } else if (values.phone.length < 9 || values.phone.length > 13) {
    errors.phone = 'Số điện thoại phải lớn hơn 9 và nhỏ hơn 13 ký tự';
  } else if (!isVietnamesePhoneNumber(values.phone)) {
    errors.phone = 'Số điện thoại không hợp lệ';
  }

  if (!values.date_of_birth) {
    errors.date_of_birth = 'Vui lòng chọn ngày sinh!';
  }
  if (!values.gender) {
    errors.gender = 'Vui lòng chọn giới tính!';
  }

  return errors;
}
