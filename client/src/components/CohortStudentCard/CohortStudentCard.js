import React, { Component } from 'react';
import { connect } from 'react-redux';
import Styled from 'styled-components';
// Material Components
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// Actions
import { deleteStudent } from '../../actions';

function mapStateToProps(state) {
    return {
        state,
    };
}

const StylizedCardContent = Styled(CardContent)`
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
        status: ''
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleDeleteStudent = () => {
        const studentID = this.props.student._id;
        console.log(`STUDENT ID ${studentID}`);
        this.props.deleteStudent(studentID);
        // this.props.history.push(`/rockets/cohort/${this.props.cohortID}`)
    };

    handleOnClick = () => {
        this.handleDeleteStudent();
        this.handleClose();
    };

    componentDidMount() {
        let myStudent = {}
        let listOfStudents = [];
        this.props.state.user.cohorts.forEach(cohort => {
            if (cohort._id === this.props.cohortID) {
                listOfStudents = cohort.students;
            } else {

            }
        });
        listOfStudents.forEach(student => {
            if (student._id === this.props.studentID) {
                myStudent = student;
            } else {

            }
        });
        this.setState({status: this.props.state.user.status, student: myStudent, cohorts: this.props.state.user.cohorts })
    }
    // shouldComponentUpdate() {
    //     console.log('component receiving props', 'status in state is:', this.state.status, 'status in props is:', this.props.state.user.status)
    //     if (this.state.status !== this.props.state.user.status) {
    //         return true;
    //     }
    // }

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        // console.log(`PROPS INSIDE STUDENT CARD:`, (this.props));
        // console.log(`COHORT STUDENT CARD PROPS ${JSON.stringify(this.props.student._id)}`);
        // console.log(`COHORT USER ID ${this.props.state.user._id}`);
        console.log('State inside Student Card:', this.state)
        return (
            <StylizedCardContent>
                {this.props.state.user.status}
                <h3>{this.props.student.firstName}</h3>
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
                    <MenuItem onClick={this.handleOnClick}>Remove Student</MenuItem>
                </Menu>
            </StylizedCardContent>
        );
    }
}

export default connect(mapStateToProps, {
    deleteStudent,
})(CohortStudentCard);
