import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return <SurveyFormReview 
       onCancel={()=> this.setState({showFormReview: false})} />;
    }
    return <SurveyForm onSurveySubmit={()=> this.setState({showFormReview: true})} />;
  }
  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}
export default reduxForm({
  form: "surveyForm",
})(SurveyNew);


// i added the reduxForm to dump the values from the form if i navigate out of the 
//surveyFormReview, there i disabled the ability to clear the form.