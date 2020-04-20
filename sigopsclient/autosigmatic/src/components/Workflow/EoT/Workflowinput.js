import React, { Component } from 'react'

import {Step1, Step2, Step3, Step4,Step5,Step6,Step7,Step8} from './Steps.js';


import Paper from "@material-ui/core/Paper";


class Workflowinput extends Component {

    _next = () => {
        let currentStep = currentStep
        currentStep = currentStep + 1
        this.setState({
          currentStep: currentStep
        })
      }
        
      _prev = () => {
        let currentStep = currentStep
        currentStep = currentStep <= 1? 1: currentStep - 1
        this.setState({
          currentStep: currentStep
        })
      }
    
    /*
    * the functions for our button
    */
    previousButton() {
      let currentStep = currentStep;
      if(currentStep !==1){
        return (
          <button 
            className="btn btn-secondary" 
            type="button" onClick={this._prev}>
          Previous
          </button>
        )
      }
      return null;
    }
    
    nextButton(){
      let currentStep = currentStep;
      if(currentStep <8){
        return (
          <button 
            className="btn btn-primary float-right" 
            type="button" onClick={this._next}>
          Next
          </button>        
        )
      }
      return null;
    }
    
    render() {
        const {Workflow : {Reason,
            breach,
            cauInd,
            cauOth,
            cauWea,
            claimEoT,
            completed,
            createdAt,
            currentStep,
            dateAware,
            dateEotClaim,
            daysClaimed,
            dec,
            delayRespon,
            descB,
            descCau,
            descExt,
            event,
            eviCause,
            eviExtent,
            ifGranDay,
            notice,
            proMitPro,
            proPrePro,
            proResPro,
            recWri,
            stepsMit,
            stepsPre}} = this.props;
        return (
            <React.Fragment>
            <p>Claim - Details</p>
            <Paper>
              <p>Step {currentStep}</p>
               
      
            <form onSubmit={this.handleSubmit}>
            {/* 
              render the form steps and pass required props in
            */}
              <Step1 
                currentStep={currentStep} 
                handleChange={this.handleChange}
                notice={breach}
              />
              
              <Step2 
                currentStep={currentStep} 
                handleChange={this.handleChange}
                delay={Reason}
              />
              <Step3 
                currentStep={currentStep} 
                handleChange={this.handleChange}
                qualifying={cauWea}
              />
              
              {this.previousButton()}
              {this.nextButton()}
      
            </form>
            </Paper>
            </React.Fragment>
        )
    }
}

export default Workflowinput
