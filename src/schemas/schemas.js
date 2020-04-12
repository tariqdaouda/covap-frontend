/*
* This schema mapper will take a registered type and give
* back a input field from
* */


export default {
  enumeration: (name, field, title='') => {
    let options = [];
    for (const value of field.values) {
      options.push({name: value, label: value})
    }
    return {
      ...field,
      name,
      title,
      options,
      type: 'MultiSelectInput'
    }
  },
  float: (name, field, title = '') => {
    return {
      ...field,
      name,
      title,
      css: '',
      min: field.range[0],
      max: field.range[1],
      type: 'SliderInput'
    }
  },
  other: (name, field, title='') => {
    return {
      ...field,
      name,
      title,
      placeholder: name,
      type: 'TextInput'
    }
  },
};
