import $ from 'jquery';
import _ from 'lodash';
import PropTypes from 'prop-types';
import * as React from 'react';

export default class NboSuggestions extends React.PureComponent {
  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this);
  }

  async clickHandler(e) {
    e.preventDefault();
    const serviceId = $(e.target).attr('sid');
    const { onClick } = this.props;
    if (onClick) {
      await onClick(serviceId);
    }
  }

  render() {
    const { services, useTop } = this.props;
    const grouped = _.chain(services).groupBy('profile').toPairs().value();
    console.log(grouped);

    return (
      <div style={{ textAlign: 'left' }}>
        {
          grouped
            .map((group) => {
              const [profile, groupServices] = group;
              let toppedServices = groupServices;

              if (useTop) {
                const top = 5;
                if (toppedServices.length > top) {
                  toppedServices = groupServices.slice(0, top);
                }
              }

              return (
                <div key={group}>
                  <h5>{profile}</h5>
                  <ol>
                    {
                      toppedServices.map(s => (
                        <li key={s.serviceid}>
                          <a href="#" onClick={this.clickHandler} sid={s.serviceid}>{s.service}</a>
                        </li>
                      ))
                    }
                  </ol>
                </div>
              );
            })
        }
      </div>
    );
  }
}

NboSuggestions.propTypes = {
  services: PropTypes.array,
  useTop: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

NboSuggestions.defaultProps = {
  services: [],
  useTop: false
};
