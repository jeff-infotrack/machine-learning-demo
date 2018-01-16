import * as React from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/pages/search-classfication.less';
import { getSearchSuggestion, getPopularServices } from '../api';
// import NBO from '../components/NboSuggestions';

export default class SearchClassification extends React.Component {
  constructor() {
    super();
    this.state = {
      keyword: '',
      result: [],
      resultText: '',
      isLoading: false,
      services: []
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleKeywordsChange = this.handleKeywordsChange.bind(this);
  }

  async onSubmit(e) {
    e.preventDefault();

    this.setState({ isLoading: true });

    try {
      const res = await getSearchSuggestion(this.state.keyword);

      if (res.data) {
        const data = Object.keys(res.data).map(key => ({
          label: key,
          value: (res.data[key] * 100.00).toFixed(2),
          originalValue: res.data[key],
          max: false
        }));

        const max = data.reduce((a, b) => (a.originalValue > b.originalValue ? a : b));
        max.max = true;

        this.setState({
          result: data,
          resultText: `The text you entered is a ${max.label}`,
        });
        console.log(res.data);
        console.log(this.state.result);

        const servicesRes = await getPopularServices(max.label);
        this.setState({ services: servicesRes.data });
        console.log(servicesRes.data);
      } else {
        this.setState({ result: [], resultText: '' });
      }
    } catch (err) {}

    this.setState({ isLoading: false });
  }

  handleKeywordsChange(e) {
    this.setState({ keyword: e.target.value });
  }

  render() {
    const {
      resultText, result, isLoading, services
    } = this.state;

    return (
      <div>
        <h1 className="page-title">
          Search Classification
        </h1>
        <h2 className="description">
          Experiental code testing!!!
        </h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="inpKeywords"
              aria-describedby="keywordHelp"
              placeholder="Enter keywords"
              value={this.state.keyword}
              onChange={this.handleKeywordsChange}
            />
            <small id="keywordHelp" className="form-text text-muted">
              Please enter address, VIN, person names or property titles above.
            </small>
          </div>
          <button type="submit" className="btn btn-secondary btn-lg">
            Submit
          </button>
        </form>
        <br />
        <div className={styles['result']}>
          {
            isLoading ?
              <div>Loading...</div>
              :
              <div>
                {
                  result && result.length > 0 &&
                  <div>
                    <h3>{resultText.toLowerCase()}</h3>
                    <div style={{ marginTop: '25px' }}>
                      {result.map(element => (
                        <div key={element.label}>
                          <span style={{ background: element.color }} />
                          <span style={{ fontWeight: element.max ? 'bold' : null }}>
                            {element.label}: {element.originalValue}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                }
                {
                  services && services.length > 0 &&
                  <div style={{ marginTop: '25px' }}>
                    <h3>Recommended services:</h3>
                    <div style={{ marginTop: '25px' }}>
                      <ol style={{ textAlign: 'left' }}>
                        {
                          services
                            .sort((a, b) => {
                              const aDesc = a.service_desc.toLowerCase();
                              const bDesc = b.service_desc.toLowerCase();
                              if (aDesc < bDesc) {
                                return -1;
                              }
                              if (aDesc > bDesc) {
                                return 1;
                              }
                              return 0;
                            })
                            .map(ser => (
                              <li key={ser.serviceid}>
                                <Link to={{
                                  pathname: '/service-suggestion',
                                  search: `?serviceid=${ser.serviceid}`
                                }}
                                >
                                  {ser.service_desc || ser.serviceid}
                                </Link>
                              </li>
                            ))
                        }
                      </ol>
                    </div>
                  </div>
                }
              </div>
          }
        </div>

      </div>

    );
  }
}
