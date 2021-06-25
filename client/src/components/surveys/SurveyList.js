import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }
  renderSurveys() {
    if (this.props.surveys) {
      return this.props.surveys.reverse().map((survey) => {
        return (
          <div className="card darken-1" key={survey._id}>
            <div className="card-content ">
              <span className="card-title"> {survey.title}</span>
              <p>{survey.body}</p>
              <p className="right">
                {" "}
                Set on : {new Date(survey.dateSent).toLocaleDateString()}
              </p>
            </div>
            <div className="card-action">
              <h6>
                {" "}
                <i className="material-icons">arrow_upward</i> {survey.yes}
              </h6>
              <h6>
                <i className="material-icons">arrow_downward</i> {survey.no}
              </h6>
            </div>
          </div>
        );
      });
    }
  }
  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
