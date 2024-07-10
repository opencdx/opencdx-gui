import React from 'react';
import PropTypes from 'prop-types';
import { SystemVariables } from '../SystemVariables';
import { ParticipantComponent } from '../TabComponents/ParticipantComponent';

const SubjectofRecord = React.forwardRef(({ control,register, index, getValues, currentIndex }, ref) => {
    return (
        <>
            <SystemVariables index={index} currentIndex={currentIndex} getValues={getValues} tab="subjectOfRecord" />
            <ParticipantComponent {...{ register, index, currentIndex, control }} tab="subjectOfRecord" ref={ref} />
        </>
    );
});
SubjectofRecord.propTypes = {
    register: PropTypes.func,
    index: PropTypes.number,
    currentIndex: PropTypes.number,
    getValues: PropTypes.any
};
export { SubjectofRecord };
