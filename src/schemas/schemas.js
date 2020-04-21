/*
* This schema mapper will take a registered type and give
* back a input field from
* */


export default {
  enumeration: (name, field, collection='') => {
    let options = [];
    for (const value of field.cases) {
      options.push({name: value, label: value})
    }
    return {
      ...field,
      name,
      collection,
      options,
      type: 'MultiSelectInput',
      backendType: 'enumeration'
    }
  },
  float: (name, field, collection = 'aaa') => {
    return {
      ...field,
      name,
      collection,
      css: '',
      type: 'SliderInput',
      backendType: 'float'
    }
  },
  other: (name, field, collection='') => {
    return {
      ...field,
      name,
      collection,
      placeholder: name,
      type: 'TextInput',
      backendType: 'other'
    }
  },
};
