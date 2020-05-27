import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import { getAllFilesSize } from './FirebaseAPI';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.maxSpace = 1024;

    this.state = {
      spaceUsed: 0,
    };
  }

  componentDidMount() {
    getAllFilesSize('/');
  }

  addSpaceUsed =(e) => {
    e.persist();
    this.setState((state) => {
      state.spaceUsed += parseInt(e.target.value);
      return state;
    });
  }

  render() {
    return (
      <div className="sub chart-wrapper">
        <input type="number" id="addSpaceUsed" style={{ display: 'none' }} onClick={(e) => this.addSpaceUsed(e)} />
        <h2 style={{ color: '#16508e' }}>Space Dashboard</h2>
        <i className="text-muted">Percentage representation</i>
        <p />
        <Pie
          height={120}
          data={{
            labels: ['Space used', 'Total'],
            datasets: [
              {
                label: 'Space used',
                data: [
                  (((this.state.spaceUsed / 1000000) * 100) / this.maxSpace).toFixed(2),
                  100,
                ],
                backgroundColor: [
                  '#e9bb9c',
                  '#8bbce9',
                ],
              },
            ],
          }}
        />
      </div>
    );
  }
}

export default Dashboard;
