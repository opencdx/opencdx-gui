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
package cdx.opencdx.questionnaire.controller;

import cdx.opencdx.grpc.questionnaire.*;
import cdx.opencdx.questionnaire.service.OpenCDXQuestionnaireService;
import io.grpc.stub.StreamObserver;
import io.micrometer.observation.annotation.Observed;
import lombok.extern.slf4j.Slf4j;
import org.lognet.springboot.grpc.GRpcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;

/**
 * gRPC Controller for Questionnaire
 */
@Slf4j
@GRpcService
@Observed(name = "opencdx")
public class OpenCDXGrpcQuestionnaireController extends QuestionnaireServiceGrpc.QuestionnaireServiceImplBase {

    private final OpenCDXQuestionnaireService openCDXQuestionnaireService;

    /**
     * Constructor using the QuestionnaireService
     * @param openCDXQuestionnaireService service to use for processing
     */
    @Autowired
    public OpenCDXGrpcQuestionnaireController(OpenCDXQuestionnaireService openCDXQuestionnaireService) {
        this.openCDXQuestionnaireService = openCDXQuestionnaireService;
    }

    /**
     * Operation to create rulesets
     * @param request the request to create rules at the client level
     * @param responseObserver Observer to process the response
     */
    @Secured({})
    @Override
    public void createRuleSet(CreateRuleSetRequest request, StreamObserver<CreateRuleSetResponse> responseObserver) {
        CreateRuleSetResponse reply = openCDXQuestionnaireService.createRuleSet(request);

        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    /**
     * Operation to update rulesets
     * @param request the request to update rules at the client level
     * @param responseObserver Observer to process the response
     */
    @Secured({})
    @Override
    public void updateRuleSet(UpdateRuleSetRequest request, StreamObserver<UpdateRuleSetResponse> responseObserver) {
        UpdateRuleSetResponse reply = openCDXQuestionnaireService.updateRuleSet(request);

        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    /** Operation to get rulesets
     * @param request the request to retrieve rules at the client level
     * @param responseObserver Observer to process the response
     */
    @Secured({})
    @Override
    public void getRuleSet(GetRuleSetRequest request, StreamObserver<GetRuleSetResponse> responseObserver) {
        GetRuleSetResponse reply = openCDXQuestionnaireService.getRuleSet(request);

        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    /** Operation to delete rulesets
     * @param request the request to delete rules at the client level
     * @param responseObserver Observer to process the response
     */
    @Secured({})
    @Override
    public void deleteRuleSet(DeleteRuleSetRequest request, StreamObserver<DeleteRuleSetResponse> responseObserver) {
        DeleteRuleSetResponse reply = openCDXQuestionnaireService.deleteRuleSet(request);

        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    /**
     * Operation to get rulesets
     * @param request the request to retrieve rules at the client level
     * @param responseObserver Observer to process the response
     */
    @Secured({})
    @Override
    public void getRuleSets(ClientRulesRequest request, StreamObserver<RuleSetsResponse> responseObserver) {
        RuleSetsResponse reply = openCDXQuestionnaireService.getRuleSets(request);

        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    /**
     * submitQuestionnaire gRPC Service Call
     * @param request Request to process
     * @param responseObserver Observer to process the response
     */
    @Secured({})
    @Override
    public void createQuestionnaire(QuestionnaireRequest request, StreamObserver<Questionnaire> responseObserver) {
        Questionnaire response = openCDXQuestionnaireService.createQuestionnaire(request);

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Secured({})
    @Override
    public void updateQuestionnaire(QuestionnaireRequest request, StreamObserver<Questionnaire> responseObserver) {
        Questionnaire response = openCDXQuestionnaireService.updateQuestionnaire(request);

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    /**
     * getSubmittedQuestionnaire gRPC Service Call
     * @param request Request to process
     * @param responseObserver Observer to process the response
     */
    @Secured({})
    @Override
    public void getSubmittedQuestionnaire(
            GetQuestionnaireRequest request, StreamObserver<Questionnaire> responseObserver) {
        Questionnaire response = openCDXQuestionnaireService.getSubmittedQuestionnaire(request);

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    /**
     * getSubmittedQuestionnaireList gRPC Service Call
     * @param request Request to process
     * @param responseObserver Observer to process the response
     */
    @Secured({})
    @Override
    public void getSubmittedQuestionnaireList(
            GetQuestionnaireListRequest request, StreamObserver<Questionnaires> responseObserver) {
        Questionnaires response = openCDXQuestionnaireService.getSubmittedQuestionnaireList(request);

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    /**
     * deleteSubmittedQuestionnaire gRPC Service Call
     * @param request Request to process
     * @param responseObserver Observer to process the response
     */
    @Secured({})
    @Override
    public void deleteSubmittedQuestionnaire(
            DeleteQuestionnaireRequest request, StreamObserver<SubmissionResponse> responseObserver) {
        SubmissionResponse reply = openCDXQuestionnaireService.deleteSubmittedQuestionnaire(request);

        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    // System level questionnaire
    /**
     * createQuestionnaireData gRPC Service Call
     * @param request Request to process
     * @param responseObserver Observer to process the response
     */
    @Secured({})
    @Override
    public void createQuestionnaireData(
            QuestionnaireDataRequest request, StreamObserver<SubmissionResponse> responseObserver) {
        SubmissionResponse reply = openCDXQuestionnaireService.createQuestionnaireData(request);

        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    /**
     * updateQuestionnaireData gRPC Service Call
     * @param request Request to process
     * @param responseObserver Observer to process the response
     */
    @Secured({})
    @Override
    public void updateQuestionnaireData(
            QuestionnaireDataRequest request, StreamObserver<SubmissionResponse> responseObserver) {
        SubmissionResponse reply = openCDXQuestionnaireService.updateQuestionnaireData(request);

        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    /*
     * getQuestionnaire gRPC Service Call
     * @param request Request to process
     * @param responseObserver Observer to process the response
     */
    @Secured({})
    @Override
    public void getQuestionnaireData(
            GetQuestionnaireRequest request, StreamObserver<SystemQuestionnaireData> responseObserver) {

        SystemQuestionnaireData reply = openCDXQuestionnaireService.getQuestionnaireData(request);

        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    /*
     * getQuestionnaireDataList gRPC Service Call
     * @param request Request to process
     * @param responseObserver Observer to process the response
     */
    @Secured({})
    @Override
    public void getQuestionnaireDataList(
            GetQuestionnaireListRequest request, StreamObserver<SystemQuestionnaireData> responseObserver) {
        SystemQuestionnaireData reply = openCDXQuestionnaireService.getQuestionnaireDataList(request);

        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    /*
     * deleteQuestionnaire gRPC Service Call
     * @param request Request to process
     * @param responseObserver Observer to process the response
     */
    @Secured({})
    @Override
    public void deleteQuestionnaireData(
            DeleteQuestionnaireRequest request, StreamObserver<SubmissionResponse> responseObserver) {
        SubmissionResponse reply = openCDXQuestionnaireService.deleteQuestionnaireData(request);

        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    // Client level questionnaire
    /**
     * createClientQuestionnaireData gRPC Service Call
     * @param request Request to process
     * @param responseObserver Observer to process the response
     */
    @Secured({})
    @Override
    public void createClientQuestionnaireData(
            ClientQuestionnaireDataRequest request, StreamObserver<SubmissionResponse> responseObserver) {
        SubmissionResponse reply = openCDXQuestionnaireService.createClientQuestionnaireData(request);

        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    /**
     * updateClientQuestionnaireData gRPC Service Call
     * @param request Request to process
     * @param responseObserver Observer to process the response
     */
    @Secured({})
    @Override
    public void updateClientQuestionnaireData(
            ClientQuestionnaireDataRequest request, StreamObserver<SubmissionResponse> responseObserver) {
        SubmissionResponse reply = openCDXQuestionnaireService.updateClientQuestionnaireData(request);

        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    /*
     * getClientQuestionnaire gRPC Service Call
     * @param request Request to process
     * @param responseObserver Observer to process the response
     */
    @Secured({})
    @Override
    public void getClientQuestionnaireData(
            GetQuestionnaireRequest request, StreamObserver<ClientQuestionnaireData> responseObserver) {

        ClientQuestionnaireData reply = openCDXQuestionnaireService.getClientQuestionnaireData(request);

        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    /*
     * getClientQuestionnaireList gRPC Service Call
     * @param request Request to process
     * @param responseObserver Observer to process the response
     */
    @Secured({})
    @Override
    public void getClientQuestionnaireDataList(
            GetQuestionnaireListRequest request, StreamObserver<ClientQuestionnaireData> responseObserver) {
        ClientQuestionnaireData reply = openCDXQuestionnaireService.getClientQuestionnaireDataList(request);

        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    /*
     * deleteClientQuestionnaire gRPC Service Call
     * @param request Request to process
     * @param responseObserver Observer to process the response
     */
    @Secured({})
    @Override
    public void deleteClientQuestionnaireData(
            DeleteQuestionnaireRequest request, StreamObserver<SubmissionResponse> responseObserver) {
        SubmissionResponse reply = openCDXQuestionnaireService.deleteClientQuestionnaireData(request);

        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    // User level questionnaire
    /**
     * createUserQuestionnaireData gRPC Service Call
     * @param request Request to process
     * @param responseObserver Observer to process the response
     */
    @Secured({})
    @Override
    public void createUserQuestionnaireData(
            UserQuestionnaireDataRequest request, StreamObserver<SubmissionResponse> responseObserver) {
        SubmissionResponse reply = openCDXQuestionnaireService.createUserQuestionnaireData(request);

        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    /*
     * getUserQuestionnaire gRPC Service Call
     * @param request Request to process
     * @param responseObserver Observer to process the response
     */
    @Secured({})
    @Override
    public void getUserQuestionnaireData(
            GetQuestionnaireRequest request, StreamObserver<UserQuestionnaireData> responseObserver) {
        UserQuestionnaireData reply = openCDXQuestionnaireService.getUserQuestionnaireData(request);

        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    /*
     * getUserQuestionnaireList gRPC Service Call
     * @param request Request to process
     * @param responseObserver Observer to process the response
     */
    @Secured({})
    @Override
    public void getUserQuestionnaireDataList(
            GetQuestionnaireListRequest request, StreamObserver<UserQuestionnaireDataResponse> responseObserver) {
        UserQuestionnaireDataResponse reply = openCDXQuestionnaireService.getUserQuestionnaireDataList(request);

        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }
}
