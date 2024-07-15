export const gridSpacing = 3;
export const drawerWidth = 260;
export const appDrawerWidth = 320;
export const statementType = {
    MAIN: 'ANF_STATEMENT_TYPE_MAIN',
    ASSOCIATED: 'ANF_STATEMENT_TYPE_ASSOCIATED',
    USER_QUESTION: 'ANF_STATEMENT_USER_QUESTION',
    NOT_APPLICABLE: 'ANF_STATEMENT_TYPE_NOT_APPLICABLE'
};

export const categories = [
    { key: 0, label: 'ANF Topic', selected: true },
    { key: 1, label: 'General', selected: false },
    { key: 2, label: 'Timing', selected: false },
    { key: 3, label: 'Context', selected: false },
    { key: 4, label: 'Value and Interpretation', selected: false },
    { key: 5, label: 'Additional Information', selected: false },
    { key: 6, label: 'Reference Range', selected: false },
    { key: 7, label: 'Relationship', selected: false }
];

export const observationAttributes = [
    { observationCategory: 'ANF Topic', label: 'method', options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' } },
    {
        observationCategory: 'ANF Topic',
        label: 'hasFocus',
        options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' }
    },
    {
        observationCategory: 'ANF Topic',
        label: 'procedureSiteDirect',
        options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' }
    },
    {
        observationCategory: 'ANF Topic',
        label: 'usingDevice',
        options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' }
    },
    { observationCategory: 'General', label: 'identifier', options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' } },
    { observationCategory: 'General', label: 'code', options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' } },
    { observationCategory: 'General', label: 'subject', options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' } },
    { observationCategory: 'General', label: 'genfocus', options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' } },
    { observationCategory: 'General', label: 'encounter', options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' } },
    { observationCategory: 'Timing', label: 'effective', options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' } },
    { observationCategory: 'Timing', label: 'issued', options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' } },
    { observationCategory: 'Context', label: 'performer', options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' } },
    { observationCategory: 'Context', label: 'encounter', options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' } },
    {
        observationCategory: 'Value and Interpretation',
        label: 'value',
        options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' }
    },
    {
        observationCategory: 'Value and Interpretation',
        label: 'dataAbsentReason',
        options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' }
    },
    {
        observationCategory: 'Value and Interpretation',
        label: 'interpretation',
        options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' }
    },
    {
        observationCategory: 'Additional Information',
        label: 'note',
        options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' }
    },
    {
        observationCategory: 'Additional Information',
        label: 'bodySite',
        options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' }
    },
    {
        observationCategory: 'Additional Information',
        label: 'bodyStructure',
        options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' }
    },
    {
        observationCategory: 'Additional Information',
        label: 'addmethod',
        options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' }
    },
    {
        observationCategory: 'Additional Information',
        label: 'specimen',
        options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' }
    },
    {
        observationCategory: 'Additional Information',
        label: 'device',
        options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' }
    },
    {
        observationCategory: 'Reference Range',
        label: 'referenceRange',
        options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' }
    },
    {
        observationCategory: 'Reference Range',
        label: 'referenceRange.low',
        options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' }
    },
    {
        observationCategory: 'Reference Range',
        label: 'referenceRange.high',
        options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' }
    },
    {
        observationCategory: 'Reference Range',
        label: 'referenceRange.normalValue',
        options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' }
    },
    {
        observationCategory: 'Reference Range',
        label: 'referenceRange.type',
        options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' }
    },
    {
        observationCategory: 'Reference Range',
        label: 'referenceRange.appliesTo',
        options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' }
    },
    {
        observationCategory: 'Reference Range',
        label: 'referenceRange.age',
        options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' }
    },
    {
        observationCategory: 'Reference Range',
        label: 'referenceRange.text',
        options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' }
    },
    { observationCategory: 'Relationship', label: 'hasMember', options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' } },
    { observationCategory: 'Relationship', label: 'derivedFrom', options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' } },
    { observationCategory: 'Relationship', label: 'component', options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' } },
    {
        observationCategory: 'Relationship',
        label: 'component.code',
        options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' }
    },
    {
        observationCategory: 'Relationship',
        label: 'component.value',
        options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' }
    },
    {
        observationCategory: 'Relationship',
        label: 'component.dataAbsentReason',
        options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' }
    },
    {
        observationCategory: 'Relationship',
        label: 'component.interpretation',
        options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' }
    },
    {
        observationCategory: 'Relationship',
        label: 'component.referenceRange',
        options: { 1: 'Code Option 1', 2: 'Code Option 2', 3: 'Code Option 3' }
    }
];

export const systemVariables = {
    time: {
        lowerBound: '${{system.util.epoc("${{application.statement.documented.start.time}}")}}',
        semantic: 'Seconds | ${{upperbound - lowerbound}}',
        resolution: '1 second',
        upperBound: '${{system.util.epoc("${{application.statement.documented.end.time}}")}}',
        includeLowerBound: true,
        includeUpperBound: true
    },
    subjectOfRecord: {
        id: '${{participant.uuid}}',
        practitionerValue: '${{participant.id}}',
        code: ''
    },
    authors: {
        id: '${{paractitioner[n].uuid}}',
        practitionerValue:
            '"Practitioner": {"reference": "Practitioner/${{paractitioner[n].id}}", "role": "Practitioner/${{paractitioner[n].role}}"',
        code: '${{paractitioner[n].role[n].code}}, ${{paractitioner[n].role[n].code}}'
    },
    subjectOfInformation: {
        subjectOfRecord: '{ id: ${{participant.id}} }'
    },
    associatedStatement: [
        { id: 'JHMH-EDDH-6591-HVQTY-GFSM', semantic: 'TBD - a Precondition | an interpretation | a component' },
        { id: 'ZDWC-WZDU-2801-DDHZI-KELI', semantic: 'TBD - a Precondition | an interpretation | a component' },
        { id: 'JNMC-FXBC-7589-MTEQD-IMBB', semantic: 'TBD - a Precondition | an interpretation | a component' },
        { id: 'BNAJ-FCSY-1342-GPXZD-QMCO', semantic: 'Precondition' },
        { id: 'GEEI-TJBI-9441-VIAQB-QOYU', semantic: 'Precondition' }
    ],
    topic: '{"observationProcedure": {"method": "Examination - action", "hasFocus": "On examination - Systolic blood pressure reading", "procedureSiteDirect": "Structure of right brachial artery", "usingDevice": "Blood pressure cuff adult size"}}',
    type: {
        expressionType: 'simple',
        expressionLanguage: 'local',
        expressionValue: 'performed',
        expressionDescription: 'Measurement action has been performed.'
    },
    performanceCircumstance: [{ healthRisk: 'XXXXX ${{rules.engine.calculated[performanceCircumstance.result]}}' }],
    status: '{"expressionType":"simple","expressionLanguage":"local","expressionValue":"performed","expressionDescription":"Measurement action has been performed."}',
    result: {
        lowerBound: '90',
        semantic:
            '[${{getElementById("3079919224534").value}}, ${{getElementById("3079919224534").value}}] ${{getElementById("3079919224534").unit}}',
        resolution: '1 mmHg',
        upperBound: '120',
        includeLowerBound: true,
        includeUpperBound: true
    },
    rangeMeasure: {
        lowerBound: '90',
        semantic: 'Systolic blood pressure measurement',
        resolution: '1 mmHg',
        upperBound: '120',
        includeLowerBound: true,
        includeUpperBound: true
    },

    circumstance: {
        id: '${{paractitioner[n].uuid}}',
        practitionerValue:
            '"Practitioner": {"reference": "Practitioner/${{paractitioner[n].id}}", "role": "Practitioner/${{paractitioner[n].role}}"',
        code: '${{paractitioner[n].role[n].code}}, ${{paractitioner[n].role[n].code}}'
    },

    participant: {
        id: '${{paractitioner[n].uuid}}',
        practitionerValue:
            '"Practitioner": {"reference": "Practitioner/${{paractitioner[n].id}}", "role": "Practitioner/${{paractitioner[n].role}}"',
        code: '${{paractitioner[n].role[n].code}}, ${{paractitioner[n].role[n].code}}'
    },

    timingMeasure: {
        lowerBound: '${{system.util.epoc("${{application.statement.measurement.start.time}}")}}',
        semantic: 'Seconds | ${{upperbound - lowerbound}}',
        resolution: '1 second',
        upperBound: '${{system.util.epoc("${{application.statement.measurement.end.time}}")}}',
        includeLowerBound: true,
        includeUpperBound: true
    },
    purpose: [
        {
            procedureId: '${{application.anfstatement.cicumstance.performancecircumstance.purpose[0].id}}',
            procedureName: '${{application.anfstatement.cicumstance.performancecircumstance.purpose[0].name}}',
            focus: '${{application.anfstatement.cicumstance.performancecircumstance.purpose[0].code}} | ${{application.anfstatement.cicumstance.performancecircumstance.purpose[0].procedure.name}} (procedure)'
        },
        {
            procedureId: '${{application.anfstatement.cicumstance.performancecircumstance.purpose[0].id}}',
            procedureName: '${{application.anfstatement.cicumstance.performancecircumstance.purpose[0].name}}',
            focus: '${{application.anfstatement.cicumstance.performancecircumstance.purpose[0].code}} | ${{application.anfstatement.cicumstance.performancecircumstance.purpose[0].procedure.name}} (procedure)'
        }
    ]
};
