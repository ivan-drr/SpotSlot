import React from 'react';
import ReactDOM from 'react-dom'
import Enzyme, { shallow, render } from 'enzyme';
import Loading from '../../components/Loading';

beforeAll(() => {
  jest.disableAutomock();
});

beforeEach(() => {
  const element = document.getElementById('loadingText');
  if (element !== null) element.parentNode.removeChild(element);
});

describe('Unit Tests', () => {
  describe('Render', function () {

    it('should render correctly', () => {
      const loading = render(<Loading/>);
      expect(loading).toMatchSnapshot();
    });

    it('should render the error message', function () {
      const TEXT = ' ✘ Error connecting to API';
      const SPEED = 70;
      const ID = 'loadingText';
      //document.body.innerHTML = '<span id="'+ID+'"></span>';

      const loading = shallow(<Loading _isFetch={'error'}/>);

      setTimeout(() => {
        expect(document.getElementById(ID).textContent).toEqual(' ✘ Error connecting to API');
      }, SPEED * TEXT.length);
    });

    it('should return null on render call without DOM target defined', function () {
      const LoadingInstance = ReactDOM.render(<Loading _isFetch={true}/>, document.createElement('div'));
      expect(LoadingInstance.render()).toBe(null);
    });

    const LoadingInstance = ReactDOM.render(<Loading />, document.createElement('div'));

    describe('typeWriter', function () {
      it('should write on the DOM element', function () {
        var iterator = 0;
        const TEXT = 'test';
        const SPEED = 70;
        const ID = 'loadingText';

        document.body.innerHTML = '<span id="'+ID+'"></span>';

        setTimeout(() => {
          expect(document.getElementById(ID)).toEqual('test');
        }, SPEED * TEXT.length);

      });

      it('should warn that the DOM element was not found', function () {
        var iterator = 0;
        expect(LoadingInstance.typeWriter('test', 70, 'not-found', iterator)).toEqual('element_not_found');
      });

      it('should call again it self as many times as length of the given string', function () {
        var iterator = 0;
        const TEXT = 'test';
        const SPEED = 70;
        const ID = 'loadingText';

        document.body.innerHTML = '<span id="'+ID+'"></span>';

        LoadingInstance.typeWriter(TEXT, SPEED, ID, iterator);

        setTimeout(() => {
          expect(LoadingInstance.typeWriter).toHaveBeenCalledTimes(TEXT.length);
        }, SPEED * TEXT.length);
      });

    });
  });

});
