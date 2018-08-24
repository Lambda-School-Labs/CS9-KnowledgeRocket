import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// Material Components
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// CONTAINS A STUDENT'S  NAME AND MENU WITH AN OPTION TO DELETE

const StylizedCardContent = styled(CardContent)`
	width: 200px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	margin: 10px;
`;

class CohortStudentCard extends Component {
	state = {
		anchorEl: null,
		student: {},
	};

	componentDidMount() {
		this.fetchStudentData();
	}

	fetchStudentData = () => {
		const { student } = this.props;
		return axios
			.get(`http://localhost:5000/api/student/${student}`)
			.then(response => {
				this.setState({ student: response.data });
			})
			.catch(err => {
				console.log(err);
			});
	};

	handleClick = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		// console.log('PROPS IN CohortStudentCard', this.props.student);
		// console.log(`STUDENT ${JSON.stringify(this.state.student)}`);
		const { anchorEl } = this.state;
		const open = Boolean(anchorEl);

		return (
			<StylizedCardContent>
				<h3>{this.state.student.firstName + ' ' + this.state.student.lastName}</h3>
				<IconButton
					aria-label="More"
					aria-owns={open ? 'long-menu' : null}
					aria-haspopup="true"
					onClick={this.handleClick}
				>
					<MoreVertIcon />
				</IconButton>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={this.handleClose}
					PaperProps={{
						style: {
							// maxHeight: ITEM_HEIGHT * 4.5,
							width: 200,
						},
					}}
				>
					<MenuItem onClick={this.handleClose}>Remove Student</MenuItem>
				</Menu>
			</StylizedCardContent>
		);
	}
}

export default CohortStudentCard;
