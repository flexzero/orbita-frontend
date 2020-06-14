export default function validate(values) {
    let errors = {};
    if (!values.startDate) {
      errors.startDate = 'You must specify a start date';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be 8 or more characters';
    }
    return errors;
  };