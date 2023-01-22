import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
// import { addContact } from 'redux/reducer';
import { ContactsForm, FormLabel } from './contactForm.styled';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addContact } from 'redux/contactSlice';

const initialValues = { name: '', number: '' };

const ContactForm = () => {
  const dispatch = useDispatch();

  const formData = (values, { resetForm }) => {
    dispatch(addContact(values));
    // addContact(values);
    resetForm();
  };
  return (
    <Formik
      onSubmit={formData}
      initialValues={initialValues}
      validationSchema={yup.object().shape({
        name: yup.string().required('Enter name'),
        number: yup
          .number()
          .moreThan(6, 'Number is too short')
          .required('Enter number'),
      })}
    >
      <ContactsForm>
        <FormLabel htmlFor="name">
          Name
          <Field
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <ErrorMessage name="name" />
        </FormLabel>
        <FormLabel htmlFor="number">
          Number
          <Field
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <ErrorMessage name="number" />
        </FormLabel>
        <button type="submit">Add contact</button>
      </ContactsForm>
    </Formik>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ContactForm;
