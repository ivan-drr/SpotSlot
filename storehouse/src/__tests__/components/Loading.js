import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Loading from '../../components/Loading';
import $ from 'jquery'

describe('Unit Tests', () => {
  describe('Render', function () {
    const loading = shallow(<Loading/>);

    it('should render correctly', () => {
      expect(loading).toMatchSnapshot();
    });

    it('should exist <div id="loading" className="text-primary fixed-top">', function () {

    });

    it('should fadeOut <span id="loadingText"> after fetch data', function () {

    });

    describe('typeWriter', function () {
      it('should write on the DOM element', function () {
        
      });

      it('should warn that the DOM element was not found', function () {

      });

      it('should stop writting on the DOM element after str.length iteration', function () {

      });
    });
  });

});
