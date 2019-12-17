import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import App from '../App';

describe('App component', () => {
  test('render', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.exists()).toBe(true);
  });
});
