import React from 'react';

//MUI
import InputLabel from '@material-ui/core/InputLabel';

import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import Typography from '@material-ui/core/Typography';

export function Step1(props) {
	if (props.currentStep !== 1) {
		return null;
	}

	return (
		<Box p={5}>
			<Typography variant="body1" align="center">
				<strong>Has this claim resulted from an event already the subject of an EoT Claim?:</strong>
			</Typography>
			<Box py={4}>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<FormControl>
						<Select name="claimEoT" value={props.claimEoT || ''} onChange={props.handleChange}>
							<MenuItem value="true">Yes</MenuItem>
							<MenuItem value="false">No</MenuItem>
						</Select>
						<FormHelperText>Already subject?</FormHelperText>
					</FormControl>
				</div>
			</Box>
		</Box>
	);
}

export function Step2(props) {
	if (props.currentStep !== 2) {
		return null;
	}
	return (
		<Box p={5}>
			<Table>
				<TableBody>
					<TableRow>
						<TableCell>
							<Typography>What is the event the subject of the claim?</Typography>
						</TableCell>
						<TableCell>
							<FormControl>
								<Select name="event" value={props.event} onChange={props.handleChange}>
									<MenuItem value="Yes">Yes</MenuItem>
									<MenuItem value="No">No</MenuItem>
									<MenuItem value="other">Other</MenuItem>
								</Select>
							</FormControl>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Typography>Have you received prompt written notice of a probable delay?</Typography>
						</TableCell>
						<TableCell>
							<FormControl>
								<Select name="notice" value={props.notice} onChange={props.handleChange}>
									<MenuItem value="Yes">Yes</MenuItem>
									<MenuItem value="No">No</MenuItem>
								</Select>
							</FormControl>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Typography>Have you received a written EoT claim for this delay event?</Typography>
						</TableCell>
						<TableCell>
							<FormControl>
								<Select name="recWri" value={props.recWri} onChange={props.handleChange}>
									<MenuItem value="Yes">Yes</MenuItem>
									<MenuItem value="No">No</MenuItem>
								</Select>
							</FormControl>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Typography>What is the date of the the EoT claim?</Typography>
						</TableCell>
						<TableCell>
							<FormControl>
								<input
									name="dateEotClaim"
									type="date"
									value={props.dateEotClaim}
									onChange={props.handleChange}
								/>
							</FormControl>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Typography>
								What date should the Contractor have been reasonably aware of the causation of the
								delay?
							</Typography>
						</TableCell>
						<TableCell>
							<FormControl>
								<input
									name="dateAware"
									type="date"
									value={props.dateAware}
									onChange={props.handleChange}
								/>
							</FormControl>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Box>
	);
}

export function Step3(props) {
	if (props.currentStep !== 3) {
		return null;
	}
	return (
		<Box p={5}>
			<Table>
				<TableBody>
					<TableRow>
						<TableCell>
							<Typography>
								Does the claim contain appropriate evidence of the cause of the delay?
							</Typography>
						</TableCell>
						<TableCell>
							<FormControl>
								<Select name="eviCause" value={props.eviCause} onChange={props.handleChange}>
									<MenuItem value="Yes">Yes</MenuItem>
									<MenuItem value="No">No</MenuItem>
								</Select>
							</FormControl>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Typography>If yes: Describe</Typography>{' '}
						</TableCell>
						<TableCell>
							<FormControl>
								<TextField
									name="descCau"
									multiline
									value={props.descCau}
									onChange={props.handleChange}
									margin="normal"
								/>
							</FormControl>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Typography>
								Does the claim contain appropriate evidence of the extent of the delay?{' '}
							</Typography>
						</TableCell>
						<TableCell>
							<FormControl>
								<Select name="eviExtent" value={props.eviExtent} onChange={props.handleChange}>
									<MenuItem value="Yes">Yes</MenuItem>
									<MenuItem value="No">No</MenuItem>
								</Select>
							</FormControl>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Typography>If yes: Describe</Typography>
						</TableCell>
						<TableCell>
							<FormControl>
								<TextField
									name="descExt"
									multiline
									value={props.descExt}
									onChange={props.handleChange}
									margin="normal"
								/>
							</FormControl>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Typography> How many days has the contractor claimed?</Typography>
						</TableCell>
						<TableCell>
							<FormControl>
								<TextField
									name="daysClaimed"
									type="number"
									value={props.daysClaimed}
									onChange={props.handleChange}
								/>
							</FormControl>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Box>
	);
}

export function Step4(props) {
	if (props.currentStep !== 4) {
		return null;
	}
	return (
		<Box p={5}>
			<Table>
				<TableBody>
					<TableRow>
						<TableCell>
							<Typography>
								Was the delay concurrent with a delay which the contractor was responsible for or which
								was otherwise ‘non-qualifying’?
							</Typography>
						</TableCell>
						<TableCell>
							<FormControl>
								<Select name="delayRespon" value={props.delayRespon} onChange={props.handleChange}>
									<MenuItem value="Yes">Yes</MenuItem>
									<MenuItem value="No">No</MenuItem>
								</Select>
							</FormControl>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Typography>
								If yes: What is your apportionment of the contribution of the delay?
							</Typography>
						</TableCell>
						<TableCell>
							<TextField
								name="proResPro"
								type="number"
								multiline
								value={props.proResPro}
								onChange={props.handleChange}
								margin="normal"
								InputProps={{
									endAdornment: <InputAdornment position="end">%</InputAdornment>
								}}
							/>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Typography>Did the contractor take steps to prevent the delay?</Typography>
						</TableCell>
						<TableCell>
							<FormControl>
								<Select name="stepsPre" value={props.stepsPre} onChange={props.handleChange}>
									<MenuItem value="Yes">Yes</MenuItem>
									<MenuItem value="No">No</MenuItem>
								</Select>
							</FormControl>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Typography>
								If no: What discount should be applied to the delay to take account of this failing?
							</Typography>
						</TableCell>
						<TableCell>
							<TextField
								name="proPrePro"
								multiline
								type="number"
								value={props.proPrePro}
								onChange={props.handleChange}
								margin="normal"
								InputProps={{
									endAdornment: <InputAdornment position="end">%</InputAdornment>
								}}
							/>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Typography>Did the contractor take steps to mitigate the delay?</Typography>
						</TableCell>
						<TableCell>
							<FormControl>
								<Select name="stepsMit" value={props.stepsMit} onChange={props.handleChange}>
									<MenuItem value="Yes">Yes</MenuItem>
									<MenuItem value="No">No</MenuItem>
								</Select>
							</FormControl>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Typography>
								If no: What discount should be applied to the delay to take account of this failing?
							</Typography>
						</TableCell>
						<TableCell>
							<TextField
								name="proMitPro"
								multiline
								type="number"
								value={props.proMitPro}
								onChange={props.handleChange}
								margin="normal"
								InputProps={{
									endAdornment: <InputAdornment position="end">%</InputAdornment>
								}}
							/>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Box>
	);
}
export function Step5(props) {
	if (props.currentStep !== 5) {
		return null;
	}
	return (
		<Box p={5}>
			<Table>
				<TableBody>
					<TableRow>
						<TableCell>
							<Typography>
								Was the cause of the delay a breach or omission by the contractor?
							</Typography>{' '}
						</TableCell>
						<TableCell>
							<FormControl>
								<Select name="breach" value={props.breach} onChange={props.handleChange}>
									<MenuItem value="Yes">Yes</MenuItem>
									<MenuItem value="No">No</MenuItem>
								</Select>
							</FormControl>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Typography>If yes: Describe the breach or omission</Typography>{' '}
						</TableCell>
						<TableCell>
							<FormControl>
								<TextField
									name="descB"
									multiline
									value={props.descB}
									onChange={props.handleChange}
									margin="normal"
								/>
							</FormControl>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Typography>
								Was the cause of the delay industrial conditions occurring after the date for practical
								completion?
							</Typography>{' '}
						</TableCell>
						<TableCell>
							<FormControl>
								<Select name="cauInd" value={props.cauInd} onChange={props.handleChange}>
									<MenuItem value="Yes">Yes</MenuItem>
									<MenuItem value="No">No</MenuItem>
								</Select>
							</FormControl>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Typography>
								Was the cause of the delay inclement weather occurring after the date for practical
								completion?
							</Typography>{' '}
						</TableCell>
						<TableCell>
							<FormControl>
								<Select name="cauWea" value={props.cauWea} onChange={props.handleChange}>
									<MenuItem value="Yes">Yes</MenuItem>
									<MenuItem value="No">No</MenuItem>
								</Select>
							</FormControl>
						</TableCell>
					</TableRow>

					<TableRow>
						<TableCell>
							<Typography>Was the cause of the delay any of these causes?</Typography>
						</TableCell>

						<TableCell>
							<FormControl>
								<Select name="cauOth" value={props.cauOth} onChange={props.handleChange}>
									<MenuItem value="Rain">Rain</MenuItem>
									<MenuItem value="Industrial Action">Industrial</MenuItem>
									<MenuItem value="Variation">Variation</MenuItem>
									<MenuItem value="Other">Other</MenuItem>

									<MenuItem value="No">No</MenuItem>
								</Select>
							</FormControl>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Box>
	);
}

export function Step6(props) {
	if (props.currentStep !== 6) {
		return null;
	}

	return (
		<Box p={5}>
			<Table>
				<TableBody>
					<TableRow>
						<TableCell>
							<div>
								{props.daysEntitled && props.daysEntitled.split('\n').map((it, index) => {
									return (
										<Typography key={index} variant={index === 0 ? 'subtitle1' : 'body1'}>
											{index === 0 ? (
												<strong>{it}</strong>
											) : (
												<React.Fragment>{it}</React.Fragment>
											)}
										</Typography>
									);
								})}
							</div>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Typography>What decision will you make?</Typography>
						</TableCell>
						<TableCell>
							<FormControl>
								<Select name="dec" value={props.dec} onChange={props.handleChange}>
									<MenuItem value="True">Grant</MenuItem>
									<MenuItem value="False">Not Grant</MenuItem>
								</Select>
							</FormControl>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Typography>if granted: How man days EoT will you grant?</Typography>
						</TableCell>
						<TableCell>
							<TextField
								name="ifGranDay"
								value={props.ifGranDay}
								onChange={props.handleChange}
								margin="normal"
								type="number"
								InputProps={{
									endAdornment: <InputAdornment position="end"> Days </InputAdornment>
								}}
							/>
						</TableCell>
					</TableRow>

					<TableRow>
						<TableCell>
							<Typography>Reason for your decision?</Typography>{' '}
						</TableCell>
						<TableCell>
							<TextField
								name="Reason"
								fullWidth
								multiline
								value={props.Reason}
								onChange={props.handleChange}
								margin="normal"
							/>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Box>
	);
}
