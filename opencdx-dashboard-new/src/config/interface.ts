/**
 *
 * @export
 * @interface ANFStatement
 */
export interface ANFStatement {
  /**
   *
   * @type {string}
   * @memberof ANFStatement
   */
  id?: string;
  /**
   *
   * @type {Measure}
   * @memberof ANFStatement
   */
  time?: Measure;
  /**
   *
   * @type {Participant}
   * @memberof ANFStatement
   */
  subjectOfRecord?: Participant;
  /**
   *
   * @type {Array<Practitioner>}
   * @memberof ANFStatement
   */
  authors?: Array<Practitioner>;
  /**
   *
   * @type {string}
   * @memberof ANFStatement
   */
  subjectOfInformation?: string;
  /**
   *
   * @type {Array<AssociatedStatement>}
   * @memberof ANFStatement
   */
  associatedStatement?: Array<AssociatedStatement>;
  /**
   *
   * @type {string}
   * @memberof ANFStatement
   */
  topic?: string;
  /**
   *
   * @type {string}
   * @memberof ANFStatement
   */
  type?: string;
  /**
   *
   * @type {Timestamp}
   * @memberof ANFStatement
   */
  created?: Timestamp;
  /**
   *
   * @type {Timestamp}
   * @memberof ANFStatement
   */
  modified?: Timestamp;
  /**
   *
   * @type {string}
   * @memberof ANFStatement
   */
  creator?: string;
  /**
   *
   * @type {string}
   * @memberof ANFStatement
   */
  modifier?: string;
  /**
   *
   * @type {string}
   * @memberof ANFStatement
   */
  status?: ANFStatementStatusEnum;
  /**
   *
   * @type {PerformanceCircumstance}
   * @memberof ANFStatement
   */
  performanceCircumstance?: PerformanceCircumstance;
  /**
   *
   * @type {RequestCircumstance}
   * @memberof ANFStatement
   */
  requestCircumstance?: RequestCircumstance;
  /**
   *
   * @type {NarrativeCircumstance}
   * @memberof ANFStatement
   */
  narrativeCircumstance?: NarrativeCircumstance;
}

export const ANFStatementStatusEnum = {
  StatusUnspecified: 'STATUS_UNSPECIFIED',
  StatusActive: 'STATUS_ACTIVE',
  StatusDeleted: 'STATUS_DELETED',
  Unrecognized: 'UNRECOGNIZED',
} as const;

export type ANFStatementStatusEnum =
  (typeof ANFStatementStatusEnum)[keyof typeof ANFStatementStatusEnum];

/**
 *
 * @export
 * @interface AnfStatementConnector
 */
export interface AnfStatementConnector {
  /**
   *
   * @type {ANFStatement}
   * @memberof AnfStatementConnector
   */
  anfStatement?: ANFStatement;
  /**
   *
   * @type {string}
   * @memberof AnfStatementConnector
   */
  anfStatementType?: AnfStatementConnectorAnfStatementTypeEnum;
  /**
   *
   * @type {string}
   * @memberof AnfStatementConnector
   */
  anfOperatorType?: AnfStatementConnectorAnfOperatorTypeEnum;
  /**
   *
   * @type {string}
   * @memberof AnfStatementConnector
   */
  operatorValue?: string;
}

export const AnfStatementConnectorAnfStatementTypeEnum = {
  AnfStatementTypeUnspecified: 'ANF_STATEMENT_TYPE_UNSPECIFIED',
  AnfStatementTypeMain: 'ANF_STATEMENT_TYPE_MAIN',
  AnfStatementTypeAssociated: 'ANF_STATEMENT_TYPE_ASSOCIATED',
  AnfStatementUserQuestion: 'ANF_STATEMENT_USER_QUESTION',
  AnfStatementTypeNotApplicable: 'ANF_STATEMENT_TYPE_NOT_APPLICABLE',
  Unrecognized: 'UNRECOGNIZED',
} as const;

export type AnfStatementConnectorAnfStatementTypeEnum =
  (typeof AnfStatementConnectorAnfStatementTypeEnum)[keyof typeof AnfStatementConnectorAnfStatementTypeEnum];
export const AnfStatementConnectorAnfOperatorTypeEnum = {
  AnfOperatorTypeUnspecified: 'ANF_OPERATOR_TYPE_UNSPECIFIED',
  AnfOperatorTypeEqual: 'ANF_OPERATOR_TYPE_EQUAL',
  AnfOperatorTypeNotEqual: 'ANF_OPERATOR_TYPE_NOT_EQUAL',
  AnfOperatorTypeGreaterThan: 'ANF_OPERATOR_TYPE_GREATER_THAN',
  AnfOperatorTypeGreaterThanOrEqual: 'ANF_OPERATOR_TYPE_GREATER_THAN_OR_EQUAL',
  AnfOperatorTypeLessThan: 'ANF_OPERATOR_TYPE_LESS_THAN',
  AnfOperatorTypeLessThanOrEqual: 'ANF_OPERATOR_TYPE_LESS_THAN_OR_EQUAL',
  AnfOperatorTypeContains: 'ANF_OPERATOR_TYPE_CONTAINS',
  AnfOperatorTypeNotContains: 'ANF_OPERATOR_TYPE_NOT_CONTAINS',
  AnfOperatorTypeIn: 'ANF_OPERATOR_TYPE_IN',
  AnfOperatorTypeNotIn: 'ANF_OPERATOR_TYPE_NOT_IN',
  Unrecognized: 'UNRECOGNIZED',
} as const;

export type AnfStatementConnectorAnfOperatorTypeEnum =
  (typeof AnfStatementConnectorAnfOperatorTypeEnum)[keyof typeof AnfStatementConnectorAnfOperatorTypeEnum];

/**
 *
 * @export
 * @interface AnswerValue
 */
export interface AnswerValue {
  /**
   *
   * @type {number}
   * @memberof AnswerValue
   */
  valueInteger?: number;
  /**
   *
   * @type {number}
   * @memberof AnswerValue
   */
  valueDouble?: number;
  /**
   *
   * @type {string}
   * @memberof AnswerValue
   */
  valueString?: string;
  /**
   *
   * @type {boolean}
   * @memberof AnswerValue
   */
  valueBoolean?: boolean;
  /**
   *
   * @type {Coding}
   * @memberof AnswerValue
   */
  valueCoding?: Coding;
}
/**
 *
 * @export
 * @interface AssociatedStatement
 */
export interface AssociatedStatement {
  /**
   *
   * @type {string}
   * @memberof AssociatedStatement
   */
  id?: string;
  /**
   *
   * @type {string}
   * @memberof AssociatedStatement
   */
  semantic?: string;
}
/**
 *
 * @export
 * @interface ClientQuestionnaireData
 */
export interface ClientQuestionnaireData {
  /**
   *
   * @type {Array<QuestionnaireData>}
   * @memberof ClientQuestionnaireData
   */
  questionnaireData?: Array<QuestionnaireData>;
  /**
   *
   * @type {string}
   * @memberof ClientQuestionnaireData
   */
  organizationId?: string;
  /**
   *
   * @type {string}
   * @memberof ClientQuestionnaireData
   */
  workspaceId?: string;
  /**
   *
   * @type {string}
   * @memberof ClientQuestionnaireData
   */
  ruleId?: string;
}
/**
 *
 * @export
 * @interface ClientQuestionnaireDataRequest
 */
export interface ClientQuestionnaireDataRequest {
  /**
   *
   * @type {ClientQuestionnaireData}
   * @memberof ClientQuestionnaireDataRequest
   */
  clientQuestionnaireData?: ClientQuestionnaireData;
}
/**
 *
 * @export
 * @interface Code
 */
export interface Code {
  /**
   *
   * @type {string}
   * @memberof Code
   */
  system?: string;
  /**
   *
   * @type {string}
   * @memberof Code
   */
  code?: string;
}
/**
 *
 * @export
 * @interface Coding
 */
export interface Coding {
  /**
   *
   * @type {string}
   * @memberof Coding
   */
  id?: string;
  /**
   *
   * @type {string}
   * @memberof Coding
   */
  system?: string;
  /**
   *
   * @type {string}
   * @memberof Coding
   */
  version?: string;
  /**
   *
   * @type {string}
   * @memberof Coding
   */
  code?: string;
  /**
   *
   * @type {string}
   * @memberof Coding
   */
  display?: string;
}
/**
 *
 * @export
 * @interface Extension
 */
export interface Extension {
  /**
   *
   * @type {string}
   * @memberof Extension
   */
  url?: string;
  /**
   *
   * @type {number}
   * @memberof Extension
   */
  valueDecimal?: number;
  /**
   *
   * @type {Coding}
   * @memberof Extension
   */
  valueCodeableConcept?: Coding;
}
/**
 *
 * @export
 * @interface GetQuestionnaireListRequest
 */
export interface GetQuestionnaireListRequest {
  /**
   *
   * @type {string}
   * @memberof GetQuestionnaireListRequest
   */
  id?: string;
  /**
   *
   * @type {Pagination}
   * @memberof GetQuestionnaireListRequest
   */
  pagination?: Pagination;
  /**
   *
   * @type {boolean}
   * @memberof GetQuestionnaireListRequest
   */
  updateAnswers?: boolean;
}
/**
 *
 * @export
 * @interface Measure
 */
export interface Measure {
  /**
   *
   * @type {string}
   * @memberof Measure
   */
  upperBound?: string;
  /**
   *
   * @type {string}
   * @memberof Measure
   */
  lowerBound?: string;
  /**
   *
   * @type {boolean}
   * @memberof Measure
   */
  includeUpperBound?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof Measure
   */
  includeLowerBound?: boolean;
  /**
   *
   * @type {string}
   * @memberof Measure
   */
  semantic?: string;
  /**
   *
   * @type {string}
   * @memberof Measure
   */
  resolution?: string;
}
/**
 *
 * @export
 * @interface NarrativeCircumstance
 */
export interface NarrativeCircumstance {
  /**
   *
   * @type {Measure}
   * @memberof NarrativeCircumstance
   */
  timing?: Measure;
  /**
   *
   * @type {Array<string>}
   * @memberof NarrativeCircumstance
   */
  purpose?: Array<string>;
  /**
   *
   * @type {string}
   * @memberof NarrativeCircumstance
   */
  text?: string;
}
/**
 *
 * @export
 * @interface Pagination
 */
export interface Pagination {
  /**
   *
   * @type {number}
   * @memberof Pagination
   */
  pageNumber?: number;
  /**
   *
   * @type {number}
   * @memberof Pagination
   */
  pageSize?: number;
  /**
   *
   * @type {boolean}
   * @memberof Pagination
   */
  sortAscending?: boolean;
  /**
   *
   * @type {string}
   * @memberof Pagination
   */
  sort?: string;
  /**
   *
   * @type {number}
   * @memberof Pagination
   */
  totalPages?: number;
  /**
   *
   * @type {number}
   * @memberof Pagination
   */
  totalRecords?: number;
}
/**
 *
 * @export
 * @interface Participant
 */
export interface Participant {
  /**
   *
   * @type {string}
   * @memberof Participant
   */
  id?: string;
  /**
   *
   * @type {string}
   * @memberof Participant
   */
  practitionerValue?: string;
  /**
   *
   * @type {string}
   * @memberof Participant
   */
  code?: string;
}
/**
 *
 * @export
 * @interface PerformanceCircumstance
 */
export interface PerformanceCircumstance {
  /**
   *
   * @type {Measure}
   * @memberof PerformanceCircumstance
   */
  timing?: Measure;
  /**
   *
   * @type {Array<string>}
   * @memberof PerformanceCircumstance
   */
  purpose?: Array<string>;
  /**
   *
   * @type {string}
   * @memberof PerformanceCircumstance
   */
  status?: string;
  /**
   *
   * @type {Measure}
   * @memberof PerformanceCircumstance
   */
  result?: Measure;
  /**
   *
   * @type {string}
   * @memberof PerformanceCircumstance
   */
  healthRisk?: string;
  /**
   *
   * @type {Measure}
   * @memberof PerformanceCircumstance
   */
  normalRange?: Measure;
  /**
   *
   * @type {Array<Participant>}
   * @memberof PerformanceCircumstance
   */
  participant?: Array<Participant>;
}
/**
 *
 * @export
 * @interface Practitioner
 */
export interface Practitioner {
  /**
   *
   * @type {string}
   * @memberof Practitioner
   */
  id?: string;
  /**
   *
   * @type {string}
   * @memberof Practitioner
   */
  practitionerValue?: string;
  /**
   *
   * @type {string}
   * @memberof Practitioner
   */
  code?: string;
}
/**
 *
 * @export
 * @interface Questionnaire
 */
export interface Questionnaire {
  /**
   *
   * @type {string}
   * @memberof Questionnaire
   */
  id?: string;
  /**
   *
   * @type {string}
   * @memberof Questionnaire
   */
  resourceType?: string;
  /**
   *
   * @type {string}
   * @memberof Questionnaire
   */
  title?: string;
  /**
   *
   * @type {string}
   * @memberof Questionnaire
   */
  status?: QuestionnaireStatusEnum;
  /**
   *
   * @type {string}
   * @memberof Questionnaire
   */
  description?: string;
  /**
   *
   * @type {string}
   * @memberof Questionnaire
   */
  purpose?: string;
  /**
   *
   * @type {Array<QuestionnaireItem>}
   * @memberof Questionnaire
   */
  item?: Array<QuestionnaireItem>;
  /**
   *
   * @type {string}
   * @memberof Questionnaire
   */
  ruleId?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof Questionnaire
   */
  ruleQuestionId?: Array<string>;
  /**
   *
   * @type {Timestamp}
   * @memberof Questionnaire
   */
  created?: Timestamp;
  /**
   *
   * @type {Timestamp}
   * @memberof Questionnaire
   */
  modified?: Timestamp;
  /**
   *
   * @type {string}
   * @memberof Questionnaire
   */
  creator?: string;
  /**
   *
   * @type {string}
   * @memberof Questionnaire
   */
  modifier?: string;
}

export const QuestionnaireStatusEnum = {
  Draft: 'draft',
  Active: 'active',
  Retired: 'retired',
  Unknown: 'unknown',
  Unrecognized: 'UNRECOGNIZED',
} as const;

export type QuestionnaireStatusEnum =
  (typeof QuestionnaireStatusEnum)[keyof typeof QuestionnaireStatusEnum];

/**
 *
 * @export
 * @interface QuestionnaireData
 */
export interface QuestionnaireData {
  /**
   *
   * @type {string}
   * @memberof QuestionnaireData
   */
  id?: string;
  /**
   *
   * @type {string}
   * @memberof QuestionnaireData
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof QuestionnaireData
   */
  status?: string;
  /**
   *
   * @type {string}
   * @memberof QuestionnaireData
   */
  state?: string;
  /**
   *
   * @type {string}
   * @memberof QuestionnaireData
   */
  questionJsonId?: string;
  /**
   *
   * @type {string}
   * @memberof QuestionnaireData
   */
  questionAnfJson?: string;
  /**
   *
   * @type {string}
   * @memberof QuestionnaireData
   */
  rulesEngineConfig?: string;
  /**
   *
   * @type {Timestamp}
   * @memberof QuestionnaireData
   */
  created?: Timestamp;
  /**
   *
   * @type {Timestamp}
   * @memberof QuestionnaireData
   */
  modified?: Timestamp;
  /**
   *
   * @type {string}
   * @memberof QuestionnaireData
   */
  creator?: string;
  /**
   *
   * @type {string}
   * @memberof QuestionnaireData
   */
  modifier?: string;
}
/**
 *
 * @export
 * @interface QuestionnaireDataRequest
 */
export interface QuestionnaireDataRequest {
  /**
   *
   * @type {QuestionnaireData}
   * @memberof QuestionnaireDataRequest
   */
  questionnaireData?: QuestionnaireData;
}
/**
 *
 * @export
 * @interface QuestionnaireEnableWhen
 */
export interface QuestionnaireEnableWhen {
  /**
   *
   * @type {string}
   * @memberof QuestionnaireEnableWhen
   */
  question?: string;
  /**
   *
   * @type {string}
   * @memberof QuestionnaireEnableWhen
   */
  operator?: string;
  /**
   *
   * @type {Coding}
   * @memberof QuestionnaireEnableWhen
   */
  answerCoding?: Coding;
  /**
   *
   * @type {number}
   * @memberof QuestionnaireEnableWhen
   */
  answerInteger?: number;
  /**
   *
   * @type {number}
   * @memberof QuestionnaireEnableWhen
   */
  answerDouble?: number;
  /**
   *
   * @type {boolean}
   * @memberof QuestionnaireEnableWhen
   */
  answerBoolean?: boolean;
}
/**
 *
 * @export
 * @interface QuestionnaireItem
 */
export interface QuestionnaireItem {
  /**
   *
   * @type {string}
   * @memberof QuestionnaireItem
   */
  type?: string;
  /**
   *
   * @type {string}
   * @memberof QuestionnaireItem
   */
  linkId?: string;
  /**
   *
   * @type {string}
   * @memberof QuestionnaireItem
   */
  text?: string;
  /**
   *
   * @type {Array<QuestionnaireEnableWhen>}
   * @memberof QuestionnaireItem
   */
  enableWhen?: Array<QuestionnaireEnableWhen>;
  /**
   *
   * @type {string}
   * @memberof QuestionnaireItem
   */
  enableBehavior?: string;
  /**
   *
   * @type {boolean}
   * @memberof QuestionnaireItem
   */
  required?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof QuestionnaireItem
   */
  repeats?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof QuestionnaireItem
   */
  readOnly?: boolean;
  /**
   *
   * @type {Array<Code>}
   * @memberof QuestionnaireItem
   */
  code?: Array<Code>;
  /**
   *
   * @type {Array<QuestionnaireItemExtension>}
   * @memberof QuestionnaireItem
   */
  extension?: Array<QuestionnaireItemExtension>;
  /**
   *
   * @type {Array<QuestionnaireItemAnswerOption>}
   * @memberof QuestionnaireItem
   */
  answerOption?: Array<QuestionnaireItemAnswerOption>;
  /**
   *
   * @type {Array<QuestionnaireItemInitial>}
   * @memberof QuestionnaireItem
   */
  initial?: Array<QuestionnaireItemInitial>;
  /**
   *
   * @type {Array<AnfStatementConnector>}
   * @memberof QuestionnaireItem
   */
  anfStatementConnector?: Array<AnfStatementConnector>;
  /**
   *
   * @type {Array<AnswerValue>}
   * @memberof QuestionnaireItem
   */
  answer?: Array<AnswerValue>;
}
/**
 *
 * @export
 * @interface QuestionnaireItemAnswerOption
 */
export interface QuestionnaireItemAnswerOption {
  /**
   *
   * @type {Coding}
   * @memberof QuestionnaireItemAnswerOption
   */
  valueCoding?: Coding;
  /**
   *
   * @type {boolean}
   * @memberof QuestionnaireItemAnswerOption
   */
  initialSelected?: boolean;
  /**
   *
   * @type {Array<Extension>}
   * @memberof QuestionnaireItemAnswerOption
   */
  extension?: Array<Extension>;
}
/**
 *
 * @export
 * @interface QuestionnaireItemExtension
 */
export interface QuestionnaireItemExtension {
  /**
   *
   * @type {string}
   * @memberof QuestionnaireItemExtension
   */
  url?: string;
  /**
   *
   * @type {ValueCodeableConcept}
   * @memberof QuestionnaireItemExtension
   */
  valueCodeableConcept?: ValueCodeableConcept;
  /**
   *
   * @type {Coding}
   * @memberof QuestionnaireItemExtension
   */
  valueCoding?: Coding;
  /**
   *
   * @type {number}
   * @memberof QuestionnaireItemExtension
   */
  valueInteger?: number;
  /**
   *
   * @type {number}
   * @memberof QuestionnaireItemExtension
   */
  valueDecimal?: number;
}
/**
 *
 * @export
 * @interface QuestionnaireItemInitial
 */
export interface QuestionnaireItemInitial {
  /**
   *
   * @type {boolean}
   * @memberof QuestionnaireItemInitial
   */
  valueBoolean?: boolean;
  /**
   *
   * @type {number}
   * @memberof QuestionnaireItemInitial
   */
  valueInteger?: number;
  /**
   *
   * @type {number}
   * @memberof QuestionnaireItemInitial
   */
  valueDecimal?: number;
}
/**
 *
 * @export
 * @interface QuestionnaireRequest
 */
export interface QuestionnaireRequest {
  /**
   *
   * @type {Questionnaire}
   * @memberof QuestionnaireRequest
   */
  questionnaire?: Questionnaire;
}

/**
 *
 * @export
 * @interface Timestamp
 */
export interface Timestamp {
  /**
   *
   * @type {number}
   * @memberof Timestamp
   */
  seconds?: number;
  /**
   *
   * @type {number}
   * @memberof Timestamp
   */
  nanos?: number;
}
/**
 *
 * @export
 * @interface ValueCodeableConcept
 */
export interface ValueCodeableConcept {
  /**
   *
   * @type {string}
   * @memberof ValueCodeableConcept
   */
  text?: string;
  /**
   *
   * @type {Array<Coding>}
   * @memberof ValueCodeableConcept
   */
  coding?: Array<Coding>;
}

/**
 *
 * @export
 * @interface RequestCircumstance
 */
export interface RequestCircumstance {
  /**
   *
   * @type {Measure}
   * @memberof RequestCircumstance
   */
  timing?: Measure;
  /**
   *
   * @type {Array<string>}
   * @memberof RequestCircumstance
   */
  purpose?: Array<string>;
  /**
   *
   * @type {Array<AssociatedStatement>}
   * @memberof RequestCircumstance
   */
  conditionalTrigger?: Array<AssociatedStatement>;
  /**
   *
   * @type {Array<Participant>}
   * @memberof RequestCircumstance
   */
  requestedParticipant?: Array<Participant>;
  /**
   *
   * @type {string}
   * @memberof RequestCircumstance
   */
  priority?: RequestCircumstancePriorityEnum;
  /**
   *
   * @type {Measure}
   * @memberof RequestCircumstance
   */
  requestedResult?: Measure;
  /**
   *
   * @type {Repetition}
   * @memberof RequestCircumstance
   */
  repetition?: Repetition;
}

export const RequestCircumstancePriorityEnum = {
  Routine: 'ROUTINE',
  Stat: 'STAT',
  Unrecognized: 'UNRECOGNIZED',
} as const;

export type RequestCircumstancePriorityEnum =
  (typeof RequestCircumstancePriorityEnum)[keyof typeof RequestCircumstancePriorityEnum];
/**
 *
 * @export
 * @interface Repetition
 */
export interface Repetition {
  /**
   *
   * @type {Timestamp}
   * @memberof Repetition
   */
  periodStart?: Timestamp;
  /**
   *
   * @type {number}
   * @memberof Repetition
   */
  periodDuration?: number;
  /**
   *
   * @type {string}
   * @memberof Repetition
   */
  periodDurationType?: RepetitionPeriodDurationTypeEnum;
  /**
   *
   * @type {number}
   * @memberof Repetition
   */
  eventFrequency?: number;
  /**
   *
   * @type {string}
   * @memberof Repetition
   */
  eventFrequencyType?: RepetitionEventFrequencyTypeEnum;
  /**
   *
   * @type {number}
   * @memberof Repetition
   */
  eventSeparation?: number;
  /**
   *
   * @type {string}
   * @memberof Repetition
   */
  eventSeparationType?: RepetitionEventSeparationTypeEnum;
  /**
   *
   * @type {number}
   * @memberof Repetition
   */
  eventDuration?: number;
  /**
   *
   * @type {string}
   * @memberof Repetition
   */
  eventDurationType?: RepetitionEventDurationTypeEnum;
}

export const RepetitionPeriodDurationTypeEnum = {
  DurationTypeNotSpecified: 'DURATION_TYPE_NOT_SPECIFIED',
  DurationTypeMilliseconds: 'DURATION_TYPE_MILLISECONDS',
  DurationTypeSeconds: 'DURATION_TYPE_SECONDS',
  DurationTypeMinutes: 'DURATION_TYPE_MINUTES',
  DurationTypeHours: 'DURATION_TYPE_HOURS',
  DurationTypeDays: 'DURATION_TYPE_DAYS',
  DurationTypeWeeks: 'DURATION_TYPE_WEEKS',
  DurationTypeMonths: 'DURATION_TYPE_MONTHS',
  DurationTypeYears: 'DURATION_TYPE_YEARS',
  Unrecognized: 'UNRECOGNIZED',
} as const;

export type RepetitionPeriodDurationTypeEnum =
  (typeof RepetitionPeriodDurationTypeEnum)[keyof typeof RepetitionPeriodDurationTypeEnum];
export const RepetitionEventFrequencyTypeEnum = {
  DurationTypeNotSpecified: 'DURATION_TYPE_NOT_SPECIFIED',
  DurationTypeMilliseconds: 'DURATION_TYPE_MILLISECONDS',
  DurationTypeSeconds: 'DURATION_TYPE_SECONDS',
  DurationTypeMinutes: 'DURATION_TYPE_MINUTES',
  DurationTypeHours: 'DURATION_TYPE_HOURS',
  DurationTypeDays: 'DURATION_TYPE_DAYS',
  DurationTypeWeeks: 'DURATION_TYPE_WEEKS',
  DurationTypeMonths: 'DURATION_TYPE_MONTHS',
  DurationTypeYears: 'DURATION_TYPE_YEARS',
  Unrecognized: 'UNRECOGNIZED',
} as const;

export type RepetitionEventFrequencyTypeEnum =
  (typeof RepetitionEventFrequencyTypeEnum)[keyof typeof RepetitionEventFrequencyTypeEnum];
export const RepetitionEventSeparationTypeEnum = {
  DurationTypeNotSpecified: 'DURATION_TYPE_NOT_SPECIFIED',
  DurationTypeMilliseconds: 'DURATION_TYPE_MILLISECONDS',
  DurationTypeSeconds: 'DURATION_TYPE_SECONDS',
  DurationTypeMinutes: 'DURATION_TYPE_MINUTES',
  DurationTypeHours: 'DURATION_TYPE_HOURS',
  DurationTypeDays: 'DURATION_TYPE_DAYS',
  DurationTypeWeeks: 'DURATION_TYPE_WEEKS',
  DurationTypeMonths: 'DURATION_TYPE_MONTHS',
  DurationTypeYears: 'DURATION_TYPE_YEARS',
  Unrecognized: 'UNRECOGNIZED',
} as const;

export type RepetitionEventSeparationTypeEnum =
  (typeof RepetitionEventSeparationTypeEnum)[keyof typeof RepetitionEventSeparationTypeEnum];
export const RepetitionEventDurationTypeEnum = {
  DurationTypeNotSpecified: 'DURATION_TYPE_NOT_SPECIFIED',
  DurationTypeMilliseconds: 'DURATION_TYPE_MILLISECONDS',
  DurationTypeSeconds: 'DURATION_TYPE_SECONDS',
  DurationTypeMinutes: 'DURATION_TYPE_MINUTES',
  DurationTypeHours: 'DURATION_TYPE_HOURS',
  DurationTypeDays: 'DURATION_TYPE_DAYS',
  DurationTypeWeeks: 'DURATION_TYPE_WEEKS',
  DurationTypeMonths: 'DURATION_TYPE_MONTHS',
  DurationTypeYears: 'DURATION_TYPE_YEARS',
  Unrecognized: 'UNRECOGNIZED',
} as const;

export type RepetitionEventDurationTypeEnum =
  (typeof RepetitionEventDurationTypeEnum)[keyof typeof RepetitionEventDurationTypeEnum];
