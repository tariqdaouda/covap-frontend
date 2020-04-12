/*
* This schema mapper will take a registered type and give
* back a input field from
* */


export default {
  enumeration: (name, field, title='') => {
    return {
      ...field,
      name,
      title,
      css: 'uk-input',
      type: 'text'
    }
  },
  float: (name, field, title = '') => {
    return {
      ...field,
      name,
      title,
      css: '',
      type: 'slider'
    }
  },
  other: (name, field, title='') => {
    return {
      ...field,
      name,
      title,
      css: 'uk-input',
      type: 'text'
    }
  },
};
