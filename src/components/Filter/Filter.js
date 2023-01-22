import React from 'react';
import { FormLabel } from '../form/contactForm.styled';
import PropTypes from 'prop-types';
import { addFilter } from 'redux/filterSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const Filter = () => {
  const [filterValue, setFilterValue] = useState('');
  const dispatch = useDispatch();

  const filterData = evt => {
    setFilterValue(evt.target.value);
    console.log(evt.target.value);
    dispatch(addFilter(evt.target.value));
  };

  return (
    <FormLabel htmlFor="value">
      {' '}
      Find contact by name
      <input
        type="text"
        name="value"
        value={filterValue}
        onChange={filterData}
      />
    </FormLabel>
  );
};

Filter.propTypes = {
  filterData: PropTypes.func,
};

export default Filter;
