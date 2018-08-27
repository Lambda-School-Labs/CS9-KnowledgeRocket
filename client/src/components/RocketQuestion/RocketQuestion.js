import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const url = process.env.REACT_APP_SERVER;

const defaultState = {
    answer: 0,
    questionID: '',
    studentID: '',
    rocketQuestion: {
        title: '',
        explanation: '',
        question: '',
        choices: [
            { text: '', correct: true },
            { text: '', correct: false },
            { text: '', correct: false },
            { text: '', correct: false },
        ],
        correct: '',
    },
};

const QuestionHeader = styled.div`
    margin-left: 2rem;
    margin-top: 2rem;
`;
const QuestionText = styled.p`
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
`;

const StyledHeaders = styled.h1`
    align-self: flex-start;
    font-size 2rem;
    margin-bottom: 1rem;
    font-weight: 460;
    font-family: 'Roboto', serif;
`;
class RocketQuestion extends Component {
    state = { ...defaultState };

    componentDidMount() {
        const questionID = this.props.match.params.question;
        // Get stuff about the question from the server
        console.log(this.props);
        axios
            .get(`${url}/api/question/${questionID}`)
            .then(response => {
                this.setState({
                    questionID,
                    studentID: this.props.match.params.student,
                    rocketQuestion: response.data,
                });
            })
            .catch(questionError => {
                this.setState(defaultState);
            });
    }

    handleSubmit = e => {};
    handleInput = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    render() {
        console.log('My state is:', this.state);
        return (
            <QuestionHeader className="Question_container">
                <div className="Question_text">
                    <StyledHeaders>{this.state.rocketQuestion.title}</StyledHeaders>
                    <QuestionText>{this.state.rocketQuestion.explanation}</QuestionText>
                </div>
                <div className="Question_question">
                    <StyledHeaders>{'Question:'}</StyledHeaders>
                    <QuestionText>{this.state.rocketQuestion.question}</QuestionText>
                </div>
                <div className="Question_answers">
                    <FormLabel component="legend" className="legend">
                        Please Answer The Question:
                    </FormLabel>
                    <RadioGroup value={this.state.value} id="value" onChange={this.handleInput}>
                        {this.state.rocketQuestion.choices.map((answer, index) => {
                            return (
                                <div key={`${index}`}>
                                    <FormControlLabel
                                        id={index}
                                        value={answer.text}
                                        control={<Radio color="primary" />}
                                        label={answer.text}
                                        labelPlacement="end"
                                    />
                                </div>
                            );
                        })}
                    </RadioGroup>
                </div>
            </QuestionHeader>
        );
    }
}

export default RocketQuestion;
