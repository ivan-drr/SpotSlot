import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import App from '../components/App';

describe('Unit Tests', () => {
  describe('Render', function () {
    it('should render correctly with no props', () => {
      const app = shallow(<App/>);

      expect(app).toMatchSnapshot();
    });
  });

});
