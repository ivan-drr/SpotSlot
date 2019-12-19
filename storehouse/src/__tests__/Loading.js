import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Loading from '../components/Loading';

describe('Unit Tests', () => {
  describe('Render', function () {
    const loading = shallow(<Loading/>);

    it('should render correctly', () => {
      expect(loading).toMatchSnapshot();
    });
    describe('typeWriter', function () {
      it('should write on the DOM element', function () {
        var iterator = 0;
        document.body.innerHTML = '<span id="loadingText" class="ml-3"></span>';

        loading.typeWriter('Loading...', 55, 'loadingText', iterator);

        expect($('#loadingText').text()).stringContaining('Loading...');
      });

      it('should warn that the DOM element was not found', function () {

      });

      it('should stop writting on the DOM element after str.length iteration', function () {

      });
    });
  });

});
