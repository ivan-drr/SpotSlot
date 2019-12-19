import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import App from '../components/App';
import Folder from '../components/Folder';

beforeAll(() => {
  jest.mock('../components/Folder');
});

describe('Unit Tests', () => {
  it('should render correctly with no props', () => {
    const app = shallow(<Folder/>);

    expect(app).toMatchSnapshot();
  });
});
