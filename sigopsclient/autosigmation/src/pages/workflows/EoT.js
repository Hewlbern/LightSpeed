import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '../../components/operations/Sequence/node_modules/@material-ui/core/Typography';
import Box from '../../components/operations/Sequence/node_modules/@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
//Redux
import { connect } from 'react-redux';
import { getWorkflow, editWorkflow } from '../../redux/actions/dataActions';
// Workflow Steps
import { Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8 } from '../../components/Workflow/EoT/Steps.js';
import { Grid } from '@material-ui/core';

const styles = (theme) => ({
	...theme.spreadThis
});

// construct state below, and either update the values in the steps based on database,
// or change the values of the state based on the database.

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
	// Discard the time and time-zone information.
	const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
	const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

	return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

/*   
  function claimGranted(){
    return notice === 'Yes'
      && delay === 'Yes'
      && onegreater !== 'Other'
      && EoTClaim === 'Yes'
      && EoTEvidence === 'Yes'
      && difference < 28;
  };
*/
class EoT extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			currentStep: 1,
			claimData: {
				Reason: null,
				breach: null,
				cauInd: null,
				cauOth: null,
				cauWea: null,
				claimEoT: null,
				completed: null,
				createdAt: null,
				dateAware: null,
				dateEotClaim: null,
				daysClaimed: null,
				dec: null,
				delayRespon: null,
				descB: null,
				descCau: '',
				descExt: null,
				event: null,
				eviCause: null,
				eviExtent: null,
				ifGranDay: null,
				notice: null,
				proMitPro: null,
				proPrePro: null,
				proResPro: null,
				recWri: null,
				stepsMit: null,
				stepsPre: null,
				daysEntitled: null
			}
		};
	}

	componentDidMount() {
		axios
			.get(`/Workflow/${this.props.match.params.WorkflowId}`)
			.then((res) => {
				this.setState({
					claimData: res.data
				});
			})
			.catch((err) => console.log(err));
	}

	setClaimValue = (key, value) =>
		this.setState((prevState) => ({
			claimData: {
				...prevState.claimData,
				[key]: value
			}
		}));

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setClaimValue(name, value);
	};

	/* 

const EoT_entitle =  if no red answers exists and no yellow answers exist and Date A< is 29 days after Date B.
EoT yellow answers, no red answers exists, Date A < 29 days, after Date B.
No EOT Entitlement: occurs if any red answer exists or Date A is >28 days after Date B.

*/

	handleSave = () => {
		const updateWorkflow = {
			...this.state.claimData
		};
		axios
			.post(`/updateWorkflow/${this.props.match.params.WorkflowId}`, updateWorkflow)
			.catch((err) => console.log(err));
	};

	handleSubmit = () => {
		this._next();
		const {
			event, // red if other
			cauOth, // red if !== 'other'

			dateEotClaim, // Date A
			dateAware, // Date B
			daysClaimed, // Number A
			proResPro, // B%
			proPrePro, // C%
			proMitPro, // D%
		} = this.state.claimData;
    const YELLOW_IF_NO_VARIABLES = [ 'notice', 'recWri', 'eviCause', 'eviExtent' ];
    const yellows = YELLOW_IF_NO_VARIABLES.filter(variable => {
      const item = this.state.claimData[variable];
      return item && item.toLowerCase() === 'no';
    })

    const reds = ['breach', 'cauInd', 'cauWea'].filter(variable => {
      const item = this.state.claimData[variable];
      return item && item.toLowerCase() === 'yes';
    });
		event && event.toLowerCase() === 'other' && reds.push('event');
		cauOth && cauOth.toLowerCase() !== 'other' && reds.push('cauOth');

		const datesOk = dateDiffInDays(new Date(dateEotClaim), new Date(dateAware)) < 29;
		const eligibleForScenarioOne = datesOk && reds.length === 0 && yellows.length === 0;
		const eligibleForScenarioTwo = datesOk && reds.length === 0;

		const entitled = Math.round(daysClaimed * (proResPro * 0.01) * (100 - proPrePro - proMitPro) * 0.01);

		if (eligibleForScenarioOne) {
			const ans = `The Contractor is entitled to ${entitled} number of days EoT`;
			this.setClaimValue('daysEntitled', ans);
		} else if (eligibleForScenarioTwo) {
			const reasonsStrategy = {
				recWri: 'You have not received a written EoT claim for this delay event.',
				notice: 'You did not receive prompt written notice of a probable delay.',
				eviCause: 'The claim does not contain appropriate evidence of the cause of the delay.',
				eviExtent: 'The claim does not contain the appropriate evidence of the extent of the delay.'
			};
			const reasons = yellows.map((it) => reasonsStrategy[it]);
			const ans = `The Contractor may be entitled to an EoT of ${entitled} days. It is uncertain because:\n
        ${reasons.reduce((reason, curr) => `${reason}\n${curr}`, '')}
      `;

			this.setClaimValue('daysEntitled', ans);
		} else {
			const reasonsStrategy = {
        'event': 'The cause of delay was not a qualifying cause of delay.',
        'breach': 'The cause of the delay was a breach or omission by the contractor.',
        'cauInd': 'The cause of the delay was industrial conditions occurring after the date for practical completion.',
        'cauWea': 'The cause of the delay was inclement weather occurring after the date for practical completion.',
        'cauOth': ' The cause of the delay was a cause listed in Annexure …',
      }
      const reasons = reds.map((it) => reasonsStrategy[it]);
      !datesOk && reasons.push('The claim was not given within 28 days of when the contractor should have been reasonably aware of the causation occurring.');

      const ans = `The Contractor is not entitled to an EoT because:\n
        ${reasons.reduce((reason, curr) => `${reason}\n${curr}`, '')}
      `;
    
			this.setClaimValue('daysEntitled', ans);
		}
	};

	_next = () => {
		let currentStep = this.state.currentStep;
		currentStep = currentStep + 1;
		this.setState({
			currentStep: currentStep
		});
	};

	_prev = () => {
		let currentStep = this.state.currentStep;
		currentStep = currentStep <= 1 ? 1 : currentStep - 1;
		this.setState({
			currentStep: currentStep
		});
	};

	/*
   * the functions for our button
   */
	previousButton() {
		let currentStep = this.state.currentStep;
		if (currentStep !== 1) {
			return (
				<Button variant="contained" color="primary" onClick={this._prev}>
					Previous
				</Button>
			);
		}
		return null;
	}

	nextButton() {
		let currentStep = this.state.currentStep;
		if (currentStep < 5) {
			return (
				<Button variant="contained" color="primary" onClick={this._next}>
					Next
				</Button>
			);
		} else if (currentStep === 5) {
			return (
				<Button variant="contained" color="primary" onClick={this.handleSubmit}>
					Submit
				</Button>
			);
		}
		return null;
	}

	render() {
		const { claimData } = this.state;
		return (
			<Box px={3}>
				<Box mb={5} ml={2}>
					<Typography variant="h4">Workflow</Typography>
				</Box>
				<Box px={5}>
					<Paper>
						<form onSubmit={this.handleSave}>
							<Grid container spacing={5}>
								<Grid item xs={10} />
								<Grid item xs={2}>
									<Button
										onClick={this.handleSave}
										position="right"
										variant="contained"
										color="primary"
										size="medium"
									>
										Save Claim
									</Button>
								</Grid>
							</Grid>
							<Step1
								currentStep={this.state.currentStep}
								handleChange={this.handleChange}
								claimEoT={claimData.claimEoT}
							/>

							<Step2
								currentStep={this.state.currentStep}
								handleChange={this.handleChange}
								event={claimData.event}
								notice={claimData.notice}
								recWri={claimData.recWri}
								dateEotClaim={claimData.dateEotClaim}
								dateAware={claimData.dateAware}
							/>
							<Step3
								currentStep={this.state.currentStep}
								handleChange={this.handleChange}
								eviCause={claimData.eviCause}
								descCau={claimData.descCau}
								eviExtent={claimData.eviExtent}
								descExt={claimData.descExt}
								daysClaimed={claimData.daysClaimed}
							/>
							<Step4
								currentStep={this.state.currentStep}
								handleChange={this.handleChange}
								delayRespon={claimData.delayRespon}
								proResPro={claimData.proResPro}
								stepsPre={claimData.stepsPre}
								stepsMit={claimData.stepsMit}
								proPrePro={claimData.proPrePro}
								proMitPro={claimData.proMitPro}
							/>
							<Step5
								currentStep={this.state.currentStep}
								handleChange={this.handleChange}
								breach={claimData.breach}
								descB={claimData.descB}
								cauInd={claimData.cauInd}
								cauWea={claimData.cauWea}
								cauOth={claimData.cauOth}
							/>
							<Step6
								currentStep={this.state.currentStep}
								handleChange={this.handleChange}
								dec={claimData.dec}
								dec={claimData.dec}
								ifGranDay={claimData.ifGranDay}
								Reason={claimData.Reason}
								daysEntitled={claimData.daysEntitled}
							/>
							<Box p={2}>
								<Grid container spacing={2} justify="center">
									<Grid item>{this.previousButton()}</Grid>
									<Grid item>{this.nextButton()}</Grid>
								</Grid>
							</Box>
						</form>
					</Paper>
				</Box>
			</Box>
		);
	}
}

EoT.propTypes = {
	getWorkflow: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	data: state.data,
	getWorkflow: state.Workflows
});

export default connect(mapStateToProps, { getWorkflow })(withStyles(styles)(EoT));
