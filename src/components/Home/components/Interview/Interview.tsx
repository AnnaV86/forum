import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { StepOne } from './components/StepOne/StepOne';
import { StepTree } from './components/StepTree/StepTree';
import { StepTwo } from './components/StepTwo/StepTwo';
import { StepZero } from './components/StepZero/StepZero';
import style from './interview.module.css';

interface IInterviewProps {
  closeInterview: () => void;
  handleMark: (mark: string) => void;
  sendFeedback: (answer: string) => void;
}

export const Interview: FC<IInterviewProps> = ({
  closeInterview,
  handleMark,
  sendFeedback,
}) => {
  const [OpenStepZero, setOpenStepZero] = useState(true);
  const [OpenStepOne, setOpenStepOne] = useState(false);
  const [OpenStepTwo, setOpenStepTwo] = useState(false);
  const [OpenStepTree, setOpenStepTree] = useState(false);

  const clickOpenStepOne = () => {
    setOpenStepZero(false);
    setOpenStepOne(true);
  };

  const clickOpenStepTwo = () => {
    setOpenStepOne(false);
    setOpenStepTwo(true);
  };

  const clickOpenStepTree = () => {
    setOpenStepTwo(false);
    setOpenStepTree(true);
  };

  return (
    <div className={style.container}>
      {OpenStepZero && (
        <StepZero
          clickOpenStepOne={clickOpenStepOne}
          closeInterview={closeInterview}
        />
      )}
      {OpenStepOne && (
        <StepOne
          closeInterview={closeInterview}
          clickOpenStepTwo={clickOpenStepTwo}
          handleMark={handleMark}
        />
      )}
      {OpenStepTwo && (
        <StepTwo
          closeInterview={closeInterview}
          clickOpenStepTree={clickOpenStepTree}
          sendFeedback={sendFeedback}
        />
      )}
      {OpenStepTree && <StepTree closeInterview={closeInterview} />}
    </div>
  );
};
