import * as React from 'react';

const axios = require('axios');

export default class SearchClassification extends React.Component {
  constructor() {
    super();
    this.state = {
      keyword: '',
      result: [],
      resultText: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleKeywordsChange = this.handleKeywordsChange.bind(this);
  }

  onSubmit() {
    axios.post('http://10.70.193.118:5000/search_suggestion', {
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
    });
  }

  handleKeywordsChange(e) {
    this.setState({ keyword: e.target.value });
  }

  render() {
    const { resultText, result } = this.state;

    return (
      <div>

        <form>
          <div className="form-group">
            <label htmlFor="inpKeywords">
              Keywords:
              <input
                type="text"
                className="form-control"
                id="inpKeywords"
                aria-describedby="keywordHelp"
                placeholder="Enter keywords"
                value={this.state.keyword}
                onChange={this.handleKeywordsChange}
              />
            </label>
            <small id="keywordHelp" className="form-text text-muted">
              Please enter address, VIN, person name or property titles above.
            </small>
          </div>
          <button type="button" className="btn btn-primary" onClick={this.onSubmit}>
            Submit
          </button>
        </form>
        <strong>{resultText}</strong>
        <br />
        {
          result &&
          result.length > 0 &&
          // <PieChart data={this.state.result} />
          result.map((element, i) => (
            <div key={element.label}>
              <span style={{ background: element.color }} />
              <span style={{ fontWeight: this.state.expandedSector === i ? 'bold' : null }}>
                {element.label}: {element.value}
              </span>
            </div>
          ))
        }

      </div>

    );
  }
}
