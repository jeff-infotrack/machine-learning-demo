import * as React from 'react';
import styles from '../styles/components/search-classfication.less';

const axios = require('axios');

export default class SearchClassification extends React.Component {
  constructor() {
    super();
    this.state = {
      keyword: '',
      result: [],
      resultText: '',
      isLoading: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleKeywordsChange = this.handleKeywordsChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({ isLoading: true });
    axios.post('http://10.70.193.118:5000/search_box/search_suggestion', {
      key_word: this.state.keyword,
    }).then((res) => {
      if (res.data) {
        const data = Object.keys(res.data).map(key => ({
          label: key,
          value: (res.data[key] * 100.00).toFixed(2),
          originalValue: res.data[key],
        }));

        const max = data.reduce((a, b) => (a.originalValue > b.originalValue ? a : b));

        this.setState({
          result: data,
          resultText: `The text you entered is a ${max.label}`,
        });
        console.log(res.data);
        console.log(this.state.result);
      } else {
        this.setState({ result: [], resultText: '' });
      }
      this.setState({ isLoading: false });
    });
  }

  handleKeywordsChange(e) {
    this.setState({ keyword: e.target.value });
  }

  render() {
    const { resultText, result, isLoading } = this.state;

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
              Please enter address, VIN, person name or property titles above.
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
              (
                result &&
                result.length > 0 &&
                <div>
                  <h3>{resultText.toLowerCase()}</h3>
                  {
                    <div style={{ marginTop: '25px' }}>
                      {result.map((element, i) => (
                        <div key={element.label}>
                          <span style={{ background: element.color }} />
                          <span style={{ fontWeight: this.state.expandedSector === i ? 'bold' : null }}>
                            {element.label}: {element.originalValue}
                          </span>
                        </div>
                      ))}
                    </div>
                  }
                </div>
              )
          }
        </div>

      </div>

    );
  }
}
