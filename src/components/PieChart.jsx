import React, { Component } from 'react';
import SvgPieChart from 'react-svg-piechart';
import PropTypes from 'prop-types';

export default class PieChart extends Component {
  constructor() {
    super();

    this.state = {
      expandedSector: null,
    };

    this.handleMouseEnterOnSector = this.handleMouseEnterOnSector.bind(this);
  }

  handleMouseEnterOnSector(sector) {
    this.setState({ expandedSector: sector });
  }

  render() {
    let data = [
      { label: 'Facebook', value: 100, color: '#3b5998' },
      { label: 'Twitter', value: 60, color: '#00aced' },
      { label: 'Google Plus', value: 30, color: '#dd4b39' },
      { label: 'Pinterest', value: 20, color: '#cb2027' },
      { label: 'Linked In', value: 10, color: '#007bb6' },
    ];

    if (this.props.data) {
      data = [...this.props.data];
      console.log(data);
    }

    const { expandedSector } = this.state;

    return (
      <div>
        <SvgPieChart
          data={data}
          expandedSector={expandedSector}
          onSectorHover={this.handleMouseEnterOnSector}
          sectorStrokeWidth={2}
          viewBoxWidth={300}
          expandOnHover
          shrinkOnTouchEnd
        />
        <div>
          {
            data.map((element, i) => (
              <div key={element.label}>
                <span style={{ background: element.color }} />
                <span style={{ fontWeight: this.state.expandedSector === i ? 'bold' : null }}>
                  {element.label}: {element.originalValue}
                </span>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
    color: PropTypes.string,
    originalValue: PropTypes.number,
  })).isRequired,
};
