/*
 * Copyright 2024 Safe Health Systems, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package cdx.opencdx.questionnaire.service.impl;

import cdx.opencdx.commons.exceptions.OpenCDXNotAcceptable;
import cdx.opencdx.commons.exceptions.OpenCDXNotFound;
import cdx.opencdx.commons.model.OpenCDXIAMUserModel;
import cdx.opencdx.commons.model.OpenCDXProfileModel;
import cdx.opencdx.commons.repository.OpenCDXProfileRepository;
import cdx.opencdx.commons.service.OpenCDXAuditService;
import cdx.opencdx.commons.service.OpenCDXClassificationMessageService;
import cdx.opencdx.commons.service.OpenCDXCurrentUser;
import cdx.opencdx.grpc.audit.SensitivityLevel;
import cdx.opencdx.grpc.common.Pagination;
import cdx.opencdx.grpc.questionnaire.*;
import cdx.opencdx.questionnaire.model.OpenCDXQuestionnaireModel;
import cdx.opencdx.questionnaire.model.OpenCDXRuleSet;
import cdx.opencdx.questionnaire.model.OpenCDXUserQuestionnaireModel;
import cdx.opencdx.questionnaire.repository.OpenCDXQuestionnaireRepository;
import cdx.opencdx.questionnaire.repository.OpenCDXRuleSetRepository;
import cdx.opencdx.questionnaire.repository.OpenCDXUserQuestionnaireRepository;
import cdx.opencdx.questionnaire.service.OpenCDXQuestionnaireService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.micrometer.observation.annotation.Observed;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

/**
 * Service for processing Questionnaire Requests
 */
@Service
@Observed(name = "opencdx")
public class OpenCDXQuestionnaireServiceImpl implements OpenCDXQuestionnaireService {

    // Constants for error handling
    private static final String CONVERSION_ERROR = "Failed to convert Questionnaire Request";
    private static final String OBJECT = "OBJECT";
    private static final String ACTIVE = "Active";
    private static final String QUESTIONNAIRE = "QUESTIONNAIRE: ";
    private static final String DOMAIN = "OpenCDXQuestionnaireServiceImpl";
    private static final String FAILED_TO_FIND_USER = "FAILED_TO_FIND_USER";
    private static final String FAILED_TO_CONVERT_OPEN_CDX_RULE_SET = "Failed to convert OpenCDXRuleSet";
    private static final String RULESET = "RULESET";
    private final OpenCDXAuditService openCDXAuditService;
    private final ObjectMapper objectMapper;
    private final OpenCDXCurrentUser openCDXCurrentUser;
    private final OpenCDXQuestionnaireRepository openCDXQuestionnaireRepository;
    private final OpenCDXUserQuestionnaireRepository openCDXUserQuestionnaireRepository;
    private final OpenCDXClassificationMessageService openCDXClassificationMessageService;
    private final OpenCDXRuleSetRepository openCDXRuleSetRepository;
    private final OpenCDXProfileRepository openCDXProfileRepository;

    /**
     * This class represents the implementation of the OpenCDXQuestionnaireService interface.
     * It provides methods for processing various types of questionnaire requests.
     *
     * @param openCDXAuditService        the OpenCDXAuditService instance used for auditing
     * @param objectMapper              the ObjectMapper instance used for object serialization and deserialization
     * @param openCDXCurrentUser         the OpenCDXCurrentUser instance used for managing user information
     * @param openCDXQuestionnaireRepository   the OpenCDXQuestionnaireRepository instance used for interacting with questionnaire data
     * @param openCDXUserQuestionnaireRepository the OpenCDXUserQuestionnaireRepository instance used for interacting with the questionnaire-user data
     * @param openCDXClassificationMessageService the OpenCDXClassificationMessageService instance used for interacting with the classification message service.
     * @param openCDXRuleSetRepository the OpenCDXRuleSetRepository instance used for interacting with the ruleset data.
     * @param openCDXProfileRepository the OpenCDXProfileRepository instance used for interacting with the profile data.
     */
    @Autowired
    public OpenCDXQuestionnaireServiceImpl(
            OpenCDXAuditService openCDXAuditService,
            ObjectMapper objectMapper,
            OpenCDXCurrentUser openCDXCurrentUser,
            OpenCDXQuestionnaireRepository openCDXQuestionnaireRepository,
            OpenCDXUserQuestionnaireRepository openCDXUserQuestionnaireRepository,
            OpenCDXClassificationMessageService openCDXClassificationMessageService,
            OpenCDXRuleSetRepository openCDXRuleSetRepository,
            OpenCDXProfileRepository openCDXProfileRepository) {
        this.openCDXAuditService = openCDXAuditService;
        this.objectMapper = objectMapper;
        this.openCDXCurrentUser = openCDXCurrentUser;
        this.openCDXQuestionnaireRepository = openCDXQuestionnaireRepository;
        this.openCDXUserQuestionnaireRepository = openCDXUserQuestionnaireRepository;
        this.openCDXClassificationMessageService = openCDXClassificationMessageService;
        this.openCDXRuleSetRepository = openCDXRuleSetRepository;
        this.openCDXProfileRepository = openCDXProfileRepository;
    }

    /**
     * Operation to get rulesets
     *
     * @param request the request to retrieve rules at the client level
     * @return Response containing a list of rulesets
     */
    @Override
    public RuleSetsResponse getRuleSets(ClientRulesRequest request) {

        List<RuleSet> rulesets = this.openCDXRuleSetRepository.findAll().stream()
                .map(OpenCDXRuleSet::getProtobufMessage)
                .toList();

        return RuleSetsResponse.newBuilder().addAllRuleSets(rulesets).build();
    }

    // Submiited Questionnaire
    /**
     * Process the QuestionnaireRequest
     * @param request request the process
     * @return Message generated for this request.
     */
    @Override
    public Questionnaire createQuestionnaire(QuestionnaireRequest request) {
        OpenCDXQuestionnaireModel model = new OpenCDXQuestionnaireModel(request.getQuestionnaire());
        model = this.openCDXQuestionnaireRepository.save(model);

        try {
            OpenCDXIAMUserModel currentUser = this.openCDXCurrentUser.getCurrentUser();
            this.openCDXAuditService.config(
                    currentUser.getId().toHexString(),
                    currentUser.getAgentType(),
                    "Create Questionnaire",
                    SensitivityLevel.SENSITIVITY_LEVEL_LOW,
                    QUESTIONNAIRE + model.getId().toHexString(),
                    this.objectMapper.writeValueAsString(model));
        } catch (JsonProcessingException e) {
            OpenCDXNotAcceptable openCDXNotAcceptable =
                    new OpenCDXNotAcceptable(DOMAIN, 1, "Failed to convert OpenCDXQuestionnaireModel", e);
            openCDXNotAcceptable.setMetaData(new HashMap<>());
            openCDXNotAcceptable.getMetaData().put("Object", request.toString());
            throw openCDXNotAcceptable;
        }
        return model.getProtobufMessage();
    }
    /**
     * Process the QuestionnaireRequest
     * @param request request the process
     * @return Message generated for this request.
     */
    @Override
    public Questionnaire updateQuestionnaire(QuestionnaireRequest request) {
        if (!this.openCDXQuestionnaireRepository.existsById(
                new ObjectId(request.getQuestionnaire().getId()))) {
            throw new OpenCDXNotFound(
                    DOMAIN,
                    2,
                    "FAILED_TO_FIND_ORGANIZATION" + request.getQuestionnaire().getId());
        }
        OpenCDXQuestionnaireModel model =
                this.openCDXQuestionnaireRepository.save(new OpenCDXQuestionnaireModel(request.getQuestionnaire()));
        try {
            OpenCDXIAMUserModel currentUser = this.openCDXCurrentUser.getCurrentUser();
            this.openCDXAuditService.config(
                    currentUser.getId().toHexString(),
                    currentUser.getAgentType(),
                    "Update Questionnaire",
                    SensitivityLevel.SENSITIVITY_LEVEL_LOW,
                    QUESTIONNAIRE + model.getId().toHexString(),
                    this.objectMapper.writeValueAsString(model));
        } catch (JsonProcessingException e) {
            OpenCDXNotAcceptable openCDXNotAcceptable =
                    new OpenCDXNotAcceptable(DOMAIN, 3, "Failed to convert OpenCDXQuestionnaireModel", e);
            openCDXNotAcceptable.setMetaData(new HashMap<>());
            openCDXNotAcceptable.getMetaData().put("Object", request.toString());
            throw openCDXNotAcceptable;
        }
        return model.getProtobufMessage();
    }

    /**
     * Process the GetQuestionnaireRequest
     * @param request request the process
     * @return Message generated for this request.
     */
    @Override
    public Questionnaire getSubmittedQuestionnaire(GetQuestionnaireRequest request) {
        OpenCDXQuestionnaireModel model = this.openCDXQuestionnaireRepository
                .findById(new ObjectId(request.getId()))
                .orElseThrow(() -> new OpenCDXNotFound(DOMAIN, 3, "Failed to find Questionnaire: " + request.getId()));
        return model.getProtobufMessage();
    }

    /**
     * Process the GetQuestionnaireRequest
     * @param request request the process
     * @return Message generated for this request.
     */
    @Override
    public Questionnaires getSubmittedQuestionnaireList(GetQuestionnaireListRequest request) {
        Pageable pageable;
        if (request.getPagination().hasSort()) {
            pageable = PageRequest.of(
                    request.getPagination().getPageNumber(),
                    request.getPagination().getPageSize(),
                    request.getPagination().getSortAscending() ? Sort.Direction.ASC : Sort.Direction.DESC,
                    request.getPagination().getSort());
        } else {
            pageable = PageRequest.of(
                    request.getPagination().getPageNumber(),
                    request.getPagination().getPageSize());
        }
        Page<OpenCDXQuestionnaireModel> all = this.openCDXQuestionnaireRepository.findAll(pageable);
        return Questionnaires.newBuilder()
                .setPagination(Pagination.newBuilder(request.getPagination())
                        .setTotalPages(all.getTotalPages())
                        .setTotalRecords(all.getTotalElements())
                        .build())
                .addAllQuestionnaires(all.get()
                        .map(OpenCDXQuestionnaireModel::getProtobufMessage)
                        .toList())
                .build();
    }

    /**
     * Process the QuestionnaireRequest
     * @param request request the process
     * @return Message generated for this request.
     */
    @Override
    public SubmissionResponse deleteSubmittedQuestionnaire(DeleteQuestionnaireRequest request) {
        try {
            OpenCDXIAMUserModel currentUser = this.openCDXCurrentUser.getCurrentUser();
            this.openCDXAuditService.config(
                    currentUser.getId().toHexString(),
                    currentUser.getAgentType(),
                    "Deleting Email Template",
                    SensitivityLevel.SENSITIVITY_LEVEL_LOW,
                    QUESTIONNAIRE + request.getId(),
                    this.objectMapper.writeValueAsString(request));
        } catch (JsonProcessingException e) {
            OpenCDXNotAcceptable openCDXNotAcceptable =
                    new OpenCDXNotAcceptable(DOMAIN, 4, "Failed to convert DeleteQuestionnaireRequest", e);
            openCDXNotAcceptable.setMetaData(new HashMap<>());
            openCDXNotAcceptable.getMetaData().put(OBJECT, request.toString());
            throw openCDXNotAcceptable;
        }

        Optional<OpenCDXQuestionnaireModel> model =
                this.openCDXQuestionnaireRepository.findById(new ObjectId(request.getId()));
        if (model.isPresent()) {
            model.get().setStatus(QuestionnaireStatus.retired);
            this.openCDXQuestionnaireRepository.save(model.get());
            return SubmissionResponse.newBuilder()
                    .setSuccess(true)
                    .setId(model.get().getId().toHexString())
                    .setMessage("Status updated to retired.")
                    .build();
        }
        return SubmissionResponse.newBuilder()
                .setSuccess(false)
                .setMessage("Failed to find: " + request.getId())
                .build();
    }

    // System Level Questionnaire
    /**
     * Process the Create QuestionnaireRequest Data
     * @param request request the process
     * @return Message generated for the CreateQuestionnaireData request.
     */
    @Override
    public SubmissionResponse createQuestionnaireData(QuestionnaireDataRequest request) {

        return SubmissionResponse.newBuilder()
                .setSuccess(true)
                .setMessage("createQuestionnaireData Executed")
                .build();
    }

    /**
     * Process the Update QuestionnaireRequest Data
     * @param request request the process
     * @return Message generated for the UpdateQuestionnaireData request.
     */
    @Override
    public SubmissionResponse updateQuestionnaireData(QuestionnaireDataRequest request) {
        return SubmissionResponse.newBuilder()
                .setSuccess(true)
                .setMessage("updateQuestionnaireData Executed")
                .build();
    }

    /**
     * Process the Get QuestionnaireRequest Data
     * @param request request the process
     * @return Message generated for the GetQuestionnaireData request.
     */
    @Override
    public SystemQuestionnaireData getQuestionnaireData(GetQuestionnaireRequest request) {

        return SystemQuestionnaireData.newBuilder()
                .addQuestionnaireData(QuestionnaireData.newBuilder()
                        .setId("1")
                        .setState(ACTIVE)
                        .build())
                .build();
    }

    /**
     * Process the Get QuestionnaireRequest Data
     * @param request request the process
     * @return Message generated for the GetQuestionnaireData request.
     */
    @Override
    public SystemQuestionnaireData getQuestionnaireDataList(GetQuestionnaireListRequest request) {

        return SystemQuestionnaireData.newBuilder()
                .addQuestionnaireData(QuestionnaireData.newBuilder()
                        .setId("1")
                        .setState(ACTIVE)
                        .build())
                .addQuestionnaireData(QuestionnaireData.newBuilder()
                        .setId("2")
                        .setState(ACTIVE)
                        .build())
                .build();
    }

    /**
     * Process the Delete QuestionnaireRequest Data
     * @param request request the process
     * @return Message generated for the DeleteQuestionnaireData request.
     */
    @Override
    public SubmissionResponse deleteQuestionnaireData(DeleteQuestionnaireRequest request) {
        return SubmissionResponse.newBuilder()
                .setSuccess(true)
                .setMessage("deleteQuestionnaireData Executed")
                .build();
    }

    // Client Level Questionnaire
    /**
     * Process the Create Client QuestionnaireRequest Data
     * @param request request the process
     * @return Message generated for the CreateClientQuestionnaireData request.
     */
    @Override
    public SubmissionResponse createClientQuestionnaireData(ClientQuestionnaireDataRequest request) {

        return SubmissionResponse.newBuilder()
                .setSuccess(true)
                .setMessage("createClientQuestionnaireData Executed")
                .build();
    }

    /**
     * Process the Update Client QuestionnaireRequest Data
     * @param request request the process
     * @return Message generated for the UpdateClientQuestionnaireData request.
     */
    @Override
    public SubmissionResponse updateClientQuestionnaireData(ClientQuestionnaireDataRequest request) {

        return SubmissionResponse.newBuilder()
                .setSuccess(true)
                .setMessage("updateClientQuestionnaireData Executed")
                .build();
    }

    /**
     * Process the Get Client QuestionnaireRequest Data
     * @param request request the process
     * @return Message generated for the GetClientQuestionnaireData request.
     */
    @Override
    public ClientQuestionnaireData getClientQuestionnaireData(GetQuestionnaireRequest request) {

        return ClientQuestionnaireData.newBuilder()
                .addQuestionnaireData(QuestionnaireData.newBuilder()
                        .setId("1")
                        .setState(ACTIVE)
                        .build())
                .build();
    }

    /**
     * Process the Get Client QuestionnaireRequest Data
     * @param request request the process
     * @return Message generated for the GetClientQuestionnaireData request.
     */
    @Override
    public ClientQuestionnaireData getClientQuestionnaireDataList(GetQuestionnaireListRequest request) {

        return ClientQuestionnaireData.newBuilder()
                .addQuestionnaireData(QuestionnaireData.newBuilder()
                        .setId("1")
                        .setState(ACTIVE)
                        .build())
                .addQuestionnaireData(QuestionnaireData.newBuilder()
                        .setId("2")
                        .setState(ACTIVE)
                        .build())
                .build();
    }

    /**
     * Process the Delete Client QuestionnaireRequest Data
     * @param request request the process
     * @return Message generated for the DeleteClientQuestionnaireData request.
     */
    @Override
    public SubmissionResponse deleteClientQuestionnaireData(DeleteQuestionnaireRequest request) {

        return SubmissionResponse.newBuilder()
                .setSuccess(true)
                .setId(request.getId())
                .setMessage("deleteClientQuestionnaireData Executed")
                .build();
    }

    /**
     * Process the Create User QuestionnaireRequest Data
     * @param request request the process
     * @return Message generated for the CreateUserQuestionnaireData request.
     */
    @Override
    public SubmissionResponse createUserQuestionnaireData(UserQuestionnaireDataRequest request) {
        OpenCDXUserQuestionnaireModel model = new OpenCDXUserQuestionnaireModel(request.getUserQuestionnaireData());
        OpenCDXProfileModel patient = this.openCDXProfileRepository
                .findById(model.getPatientId())
                .orElseThrow(() -> new OpenCDXNotFound(
                        DOMAIN,
                        5,
                        FAILED_TO_FIND_USER + request.getUserQuestionnaireData().getPatientId()));

        model = this.openCDXUserQuestionnaireRepository.save(model);

        try {
            OpenCDXIAMUserModel currentUser = this.openCDXCurrentUser.getCurrentUser();
            this.openCDXAuditService.phiCreated(
                    currentUser.getId().toHexString(),
                    currentUser.getAgentType(),
                    "CreateUserQuestionnaireData [User Level]",
                    SensitivityLevel.SENSITIVITY_LEVEL_HIGH,
                    patient.getId().toHexString(),
                    patient.getNationalHealthId(),
                    "QUESTIONNAIR-USER: " + model.getId(),
                    this.objectMapper.writeValueAsString(model));
        } catch (JsonProcessingException e) {
            OpenCDXNotAcceptable openCDXNotAcceptable =
                    new OpenCDXNotAcceptable(this.getClass().getName(), 15, CONVERSION_ERROR, e);
            openCDXNotAcceptable.setMetaData(new HashMap<>());
            openCDXNotAcceptable.getMetaData().put(OBJECT, request.toString());
            throw openCDXNotAcceptable;
        }
        this.openCDXClassificationMessageService.submitQuestionnaire(patient.getId(), model.getId(), null);
        return SubmissionResponse.newBuilder()
                .setSuccess(true)
                .setMessage("createUserQuestionnaireData Executed")
                .setId(model.getId().toHexString())
                .build();
    }

    /**
     * Process the Get User QuestionnaireRequest Data
     * @param request request the process
     * @return Message generated for the GetUserQuestionnaireData request.
     */
    @Override
    public UserQuestionnaireData getUserQuestionnaireData(GetQuestionnaireRequest request) {
        UserQuestionnaireData data = this.openCDXUserQuestionnaireRepository
                .findById(new ObjectId(request.getId()))
                .orElseThrow(
                        () -> new OpenCDXNotFound(DOMAIN, 6, "Failed to find user questionnaire: " + request.getId()))
                .getProtobufMessage();
        OpenCDXProfileModel user = this.openCDXProfileRepository
                .findById(new ObjectId(data.getPatientId()))
                .orElseThrow(() -> new OpenCDXNotFound(DOMAIN, 6, FAILED_TO_FIND_USER + data.getPatientId()));
        OpenCDXIAMUserModel currentUser = this.openCDXCurrentUser.getCurrentUser();
        try {
            this.openCDXAuditService.phiAccessed(
                    currentUser.getId().toHexString(),
                    currentUser.getAgentType(),
                    "GetUserQuestionnaireData [User Level]",
                    SensitivityLevel.SENSITIVITY_LEVEL_HIGH,
                    user.getId().toHexString(),
                    user.getNationalHealthId(),
                    "QUESTIONNAIRE-USER: " + data.getId(),
                    this.objectMapper.writeValueAsString(data));
        } catch (JsonProcessingException e) {
            OpenCDXNotAcceptable openCDXNotAcceptable =
                    new OpenCDXNotAcceptable(this.getClass().getName(), 16, CONVERSION_ERROR, e);
            openCDXNotAcceptable.setMetaData(new HashMap<>());
            openCDXNotAcceptable.getMetaData().put(OBJECT, request.toString());
            throw openCDXNotAcceptable;
        }

        return data;
    }

    /**
     * Process the Get User QuestionnaireRequest Data
     * @param request request the process
     * @return Message generated for the GetUserQuestionnaireData request.
     */
    @Override
    @SuppressWarnings("java:S3864")
    public UserQuestionnaireDataResponse getUserQuestionnaireDataList(GetQuestionnaireListRequest request) {
        Pageable pageable;
        if (request.getPagination().hasSort()) {
            pageable = PageRequest.of(
                    request.getPagination().getPageNumber(),
                    request.getPagination().getPageSize(),
                    request.getPagination().getSortAscending() ? Sort.Direction.ASC : Sort.Direction.DESC,
                    request.getPagination().getSort());
        } else {
            pageable = PageRequest.of(
                    request.getPagination().getPageNumber(),
                    request.getPagination().getPageSize());
        }
        Page<OpenCDXUserQuestionnaireModel> all = this.openCDXUserQuestionnaireRepository.findAll(pageable);

        OpenCDXIAMUserModel currentUser = this.openCDXCurrentUser.getCurrentUser();
        List<UserQuestionnaireData> list = all.get()
                .peek(model -> {
                    OpenCDXProfileModel user = this.openCDXProfileRepository
                            .findById(model.getPatientId())
                            .orElseThrow(() -> new OpenCDXNotFound(
                                    DOMAIN,
                                    6,
                                    FAILED_TO_FIND_USER + model.getPatientId().toHexString()));
                    try {
                        this.openCDXAuditService.phiAccessed(
                                currentUser.getId().toHexString(),
                                currentUser.getAgentType(),
                                "GetUserQuestionnaireDataList [User Level]",
                                SensitivityLevel.SENSITIVITY_LEVEL_HIGH,
                                user.getId().toHexString(),
                                user.getNationalHealthId(),
                                "QUESTIONNAIRE-USER: " + model.getId(),
                                this.objectMapper.writeValueAsString(model));
                    } catch (JsonProcessingException e) {
                        OpenCDXNotAcceptable openCDXNotAcceptable =
                                new OpenCDXNotAcceptable(this.getClass().getName(), 17, CONVERSION_ERROR, e);
                        openCDXNotAcceptable.setMetaData(new HashMap<>());
                        openCDXNotAcceptable.getMetaData().put(OBJECT, request.toString());
                        throw openCDXNotAcceptable;
                    }
                })
                .map(OpenCDXUserQuestionnaireModel::getProtobufMessage)
                .toList();

        return UserQuestionnaireDataResponse.newBuilder()
                .addAllList(list)
                .setPagination(Pagination.newBuilder(request.getPagination())
                        .setTotalPages(all.getTotalPages())
                        .setTotalRecords(all.getTotalElements())
                        .build())
                .build();
    }

    @Override
    public CreateRuleSetResponse createRuleSet(CreateRuleSetRequest request) {
        OpenCDXRuleSet ruleset = this.openCDXRuleSetRepository.save(new OpenCDXRuleSet(request.getRuleSet()));
        try {
            OpenCDXIAMUserModel currentUser = this.openCDXCurrentUser.getCurrentUser();
            this.openCDXAuditService.config(
                    currentUser.getId().toHexString(),
                    currentUser.getAgentType(),
                    "Creating RuleSet",
                    SensitivityLevel.SENSITIVITY_LEVEL_LOW,
                    RULESET + ruleset.getId().toHexString(),
                    this.objectMapper.writeValueAsString(ruleset));
        } catch (JsonProcessingException e) {
            OpenCDXNotAcceptable openCDXNotAcceptable =
                    new OpenCDXNotAcceptable(DOMAIN, 18, FAILED_TO_CONVERT_OPEN_CDX_RULE_SET, e);
            openCDXNotAcceptable.setMetaData(new HashMap<>());
            openCDXNotAcceptable.getMetaData().put(OBJECT, ruleset.toString());
            throw openCDXNotAcceptable;
        }
        return CreateRuleSetResponse.newBuilder()
                .setRuleSet(ruleset.getProtobufMessage())
                .build();
    }

    @Override
    public UpdateRuleSetResponse updateRuleSet(UpdateRuleSetRequest request) {
        OpenCDXRuleSet ruleset = this.openCDXRuleSetRepository.save(new OpenCDXRuleSet(request.getRuleSet()));
        try {
            OpenCDXIAMUserModel currentUser = this.openCDXCurrentUser.getCurrentUser();
            this.openCDXAuditService.config(
                    currentUser.getId().toHexString(),
                    currentUser.getAgentType(),
                    "Updating RuleSet",
                    SensitivityLevel.SENSITIVITY_LEVEL_LOW,
                    RULESET + ruleset.getId().toHexString(),
                    this.objectMapper.writeValueAsString(ruleset));
        } catch (JsonProcessingException e) {
            OpenCDXNotAcceptable openCDXNotAcceptable =
                    new OpenCDXNotAcceptable(DOMAIN, 19, FAILED_TO_CONVERT_OPEN_CDX_RULE_SET, e);
            openCDXNotAcceptable.setMetaData(new HashMap<>());
            openCDXNotAcceptable.getMetaData().put(OBJECT, ruleset.toString());
            throw openCDXNotAcceptable;
        }
        return UpdateRuleSetResponse.newBuilder()
                .setRuleSet(ruleset.getProtobufMessage())
                .build();
    }

    @Override
    public GetRuleSetResponse getRuleSet(GetRuleSetRequest request) {
        return GetRuleSetResponse.newBuilder()
                .setRuleSet(this.openCDXRuleSetRepository
                        .findById(new ObjectId(request.getId()))
                        .map(OpenCDXRuleSet::getProtobufMessage)
                        .orElseThrow(
                                () -> new OpenCDXNotFound(DOMAIN, 3, "Failed to find RuleSet: " + request.getId())))
                .build();
    }

    @Override
    public DeleteRuleSetResponse deleteRuleSet(DeleteRuleSetRequest request) {
        OpenCDXRuleSet ruleset = this.openCDXRuleSetRepository
                .findById(new ObjectId(request.getId()))
                .orElseThrow(() -> new OpenCDXNotFound(DOMAIN, 20, "Failed to find RuleSet: " + request.getId()));
        ruleset.setStatus(QuestionnaireStatus.retired);
        this.openCDXRuleSetRepository.save(ruleset);

        try {
            OpenCDXIAMUserModel currentUser = this.openCDXCurrentUser.getCurrentUser();
            this.openCDXAuditService.config(
                    currentUser.getId().toHexString(),
                    currentUser.getAgentType(),
                    "Deleting RuleSet",
                    SensitivityLevel.SENSITIVITY_LEVEL_LOW,
                    RULESET + ruleset.getId().toHexString(),
                    this.objectMapper.writeValueAsString(ruleset));
        } catch (JsonProcessingException e) {
            OpenCDXNotAcceptable openCDXNotAcceptable =
                    new OpenCDXNotAcceptable(DOMAIN, 2, FAILED_TO_CONVERT_OPEN_CDX_RULE_SET, e);
            openCDXNotAcceptable.setMetaData(new HashMap<>());
            openCDXNotAcceptable.getMetaData().put(OBJECT, ruleset.toString());
            throw openCDXNotAcceptable;
        }

        return DeleteRuleSetResponse.newBuilder()
                .setRuleSet(ruleset.getProtobufMessage())
                .build();
    }
}
