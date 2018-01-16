import * as React from 'react';
import PropTypes from 'prop-types';

import NBO from '../components/NboSuggestions';
import { getPopularServices, getNboSuggestions } from '../api';
import { developerMode, getUriQueryParameter } from '../utils';

class ServiceSuggestion extends React.Component {
  constructor() {
    super();
    this.state = {
      isInitiating: false,
      isLoading: false,
      category: '',
      serviceId: null,
      services: [],
    };
    this.serviceClick = this.serviceClick.bind(this);
  }

  async componentDidMount() {
    await this.pageInit();
  }

  async getNboServices(serviceId) {
    const response = await getNboSuggestions(serviceId);
    this.setState({
      services: this.transformServices(response.data)
    });
  }

  setInitiating(init = true) {
    this.setState({ isInitiating: init });
  }
  setLoading(load = true) {
    this.setState({ isLoading: load });
  }

  async pageInit() {
    const category = getUriQueryParameter(this.props.location.search, 'keyword_name');
    const serviceId = getUriQueryParameter(this.props.location.search, 'serviceid');
    this.setState({
      category,
      serviceId,
      isInitiating: true
    });

    try {
      let servicesRes;
      if (category) {
        servicesRes = await getPopularServices(category);
      } else if (serviceId) {
        servicesRes = await getNboSuggestions(serviceId);
      }

      if (!(servicesRes && servicesRes.data && servicesRes.data.length)) {
        servicesRes = await getPopularServices();
      }

      if (developerMode) {
        console.log(servicesRes);
      }

      this.setState({
        isInitiating: false,
        services: servicesRes.data
      });
    } catch (err) {
      this.setInitiating(false);
    }
  }

  async serviceClick(serviceId) {
    this.setLoading(true);

    try {
      let response = await getNboSuggestions(serviceId);

      if (!(response && response.data && response.data.length)) {
        response = await getPopularServices();
      }

      if (response && response.data) {
        this.setState({
          services: response.data,
          serviceId
        });
      }
    } catch (err) {}

    this.setLoading(false);
  }

  render() {
    const { isInitiating, isLoading, serviceId } = this.state;
    const { category, services } = this.state;

    let title = 'All Popular Services';
    if (serviceId) {
      title = `Services for Service Id ${serviceId}`;
    } else if (category) {
      title = `Services for category "${category}"`;
    }

    return (
      <div>
        <h1 className="page-title">
          Service Suggestion
        </h1>
        <h2 className="description">
          NBO (Next Best Offer) for InfoTrack Services
        </h2>

        {
          !isInitiating && !isLoading ?
            <div>
              <h3>{title}:</h3>
              <NBO services={services} onClick={this.serviceClick} useTop={!!serviceId} />
            </div>
            :
            <div>Loading...</div>
        }
      </div>
    );
  }
}

export default ServiceSuggestion;

ServiceSuggestion.propTypes = {
  location: PropTypes.object.isRequired
};
