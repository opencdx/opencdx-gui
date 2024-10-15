import { test, expect } from '@playwright/test';

test.describe('Form Builder', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the iam/user/current endpoint
    await page.route('**/iam/user/current', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          iamUser: {
            id: "66ff7d45192332495d56a39e",
            systemName: null,
            username: "test@opencdx.org",
            emailVerified: true,
            status: "IAM_USER_STATUS_ACTIVE",
            type: "IAM_USER_TYPE_REGULAR",
            organizationId: null,
            workspaceId: null,
            created: "2024-10-04T05:29:41.785Z",
            modified: "2024-10-04T05:29:42.334Z",
            creator: "66c77488ce67d40144b0c028",
            modifier: "66c77488ce67d40144b0c028"
          }
        })
      });
    });

    // Mock the questionnaire/questionnaire/list endpoint
    await page.route('**/questionnaire/questionnaire/list', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          questionnaires: [ {
            "id": "66f3b3f36c44d1322dae3ac4",
            "resourceType": "Questionnaire",
            "title": "Person Under Investigation",
            "status": "active",
            "description": "A form for reporting COVID-19 cases, including patient information, symptoms, exposure history, and test results",
            "item": [
                {
                    "type": "display",
                    "linkId": "7289807308000",
                    "text": "Location Details",
                    "enableWhen": [],
                    "code": [],
                    "item": [],
                    "extension": [],
                    "answerOption": [],
                    "initial": [],
                    "anfStatementConnector": [
                        {
                            "anfStatement": {
                                "id": "",
                                "time": {
                                    "upperBoundConfig": "",
                                    "upperBound": 0.0,
                                    "lowerBoundConfig": "",
                                    "lowerBound": 0.0,
                                    "includeUpperBound": false,
                                    "includeLowerBound": false,
                                    "semantic": {
                                        "expression": ""
                                    },
                                    "resolution": 0.0
                                },
                                "authors": [],
                                "associatedStatement": [],
                                "status": "STATUS_UNSPECIFIED"
                            },
                            "anfStatementType": "ANF_STATEMENT_TYPE_MAIN",
                            "anfOperatorType": "ANF_OPERATOR_TYPE_UNSPECIFIED",
                            "operatorValue": ""
                        }
                    ],
                    "answer": []
                },
                {
                    "type": "string",
                    "linkId": "8092209266961",
                    "text": "Reporting Jurisdiction",
                    "enableWhen": [],
                    "code": [],
                    "item": [],
                    "extension": [],
                    "answerOption": [],
                    "initial": [],
                    "anfStatementConnector": [],
                    "answer": []
                },
                {
                    "type": "choice",
                    "linkId": "3010610339059",
                    "text": "Reporting Health Department",
                    "enableWhen": [],
                    "code": [],
                    "item": [],
                    "extension": [
                        {
                            "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                            "valueCodeableConcept": {
                                "coding": [
                                    {
                                        "id": "",
                                        "system": "http://hl7.org/fhir/questionnaire-item-control",
                                        "version": "",
                                        "code": "drop-down",
                                        "display": "Drop down"
                                    }
                                ]
                            }
                        }
                    ],
                    "answerOption": [
                        {
                            "valueCoding": {
                                "id": "",
                                "system": "",
                                "version": "",
                                "code": "",
                                "display": "State Health Department"
                            },
                            "extension": []
                        },
                        {
                            "valueCoding": {
                                "id": "",
                                "system": "",
                                "version": "",
                                "code": "",
                                "display": "Local Health Department"
                            },
                            "extension": []
                        },
                        {
                            "valueCoding": {
                                "id": "",
                                "system": "",
                                "version": "",
                                "code": "",
                                "display": "Territorial Health Department"
                            },
                            "extension": []
                        },
                        {
                            "valueCoding": {
                                "id": "",
                                "system": "",
                                "version": "",
                                "code": "",
                                "display": "Tribal Health Department"
                            },
                            "extension": []
                        }
                    ],
                    "initial": [],
                    "anfStatementConnector": [],
                    "answer": []
                },
                {
                    "type": "string",
                    "linkId": "6997618128160",
                    "text": "Case state/local ID",
                    "enableWhen": [],
                    "code": [],
                    "item": [],
                    "extension": [],
                    "answerOption": [],
                    "initial": [],
                    "anfStatementConnector": [],
                    "answer": []
                },
                {
                    "type": "string",
                    "linkId": "101941631919",
                    "text": "CDC 2019-nCoV ID",
                    "enableWhen": [],
                    "code": [],
                    "item": [],
                    "extension": [],
                    "answerOption": [],
                    "initial": [],
                    "anfStatementConnector": [],
                    "answer": []
                },
                {
                    "type": "string",
                    "linkId": "3934736439180",
                    "text": "Contact ID",
                    "enableWhen": [],
                    "code": [],
                    "item": [],
                    "extension": [],
                    "answerOption": [],
                    "initial": [],
                    "anfStatementConnector": [],
                    "answer": []
                },
                {
                    "type": "string",
                    "linkId": "4834595214864",
                    "text": "NNDSS loc. rec. ID/Case ID",
                    "enableWhen": [],
                    "code": [],
                    "item": [],
                    "extension": [],
                    "answerOption": [],
                    "initial": [],
                    "anfStatementConnector": [],
                    "answer": []
                },
                {
                    "type": "display",
                    "linkId": "7093074055527",
                    "text": "Patient Identifier Information",
                    "enableWhen": [],
                    "code": [],
                    "item": [],
                    "extension": [],
                    "answerOption": [],
                    "initial": [],
                    "anfStatementConnector": [],
                    "answer": []
                },
                {
                    "type": "display",
                    "linkId": "7509123356566",
                    "text": "Case Classification and Identification",
                    "enableWhen": [],
                    "code": [],
                    "item": [],
                    "extension": [],
                    "answerOption": [],
                    "initial": [],
                    "anfStatementConnector": [],
                    "answer": []
                },
                {
                    "type": "display",
                    "linkId": "2931781383849",
                    "text": "Hospitalization, ICU, and Death Information",
                    "enableWhen": [],
                    "code": [],
                    "item": [],
                    "extension": [],
                    "answerOption": [],
                    "initial": [],
                    "anfStatementConnector": [],
                    "answer": []
                },
                {
                    "type": "display",
                    "linkId": "1240917827347",
                    "text": "Case Demographics",
                    "enableWhen": [],
                    "code": [],
                    "item": [],
                    "extension": [],
                    "answerOption": [],
                    "initial": [],
                    "anfStatementConnector": [],
                    "answer": []
                },
                {
                    "type": "decimal",
                    "linkId": "446754111304",
                    "text": "Weight",
                    "enableWhen": [],
                    "code": [],
                    "item": [],
                    "extension": [
                        {
                            "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-unit",
                            "valueCoding": {
                                "id": "",
                                "system": "http://unitsofmeasure.org",
                                "version": "",
                                "code": "[lb_av]",
                                "display": "pound"
                            }
                        }
                    ],
                    "answerOption": [],
                    "initial": [],
                    "anfStatementConnector": [],
                    "answer": []
                },
                {
                    "type": "integer",
                    "linkId": "6086037378381",
                    "text": "Height",
                    "enableWhen": [],
                    "code": [],
                    "item": [],
                    "extension": [
                        {
                            "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-unit",
                            "valueCoding": {
                                "id": "",
                                "system": "http://unitsofmeasure.org",
                                "version": "",
                                "code": "[in_i]",
                                "display": "inch"
                            }
                        }
                    ],
                    "answerOption": [],
                    "initial": [],
                    "anfStatementConnector": [],
                    "answer": []
                },
                {
                    "type": "display",
                    "linkId": "5637059805086",
                    "text": "Healthcare Worker Information",
                    "enableWhen": [],
                    "code": [],
                    "item": [],
                    "extension": [],
                    "answerOption": [],
                    "initial": [],
                    "anfStatementConnector": [],
                    "answer": []
                },
                {
                    "type": "display",
                    "linkId": "2967536966978",
                    "text": "Exposure Information",
                    "enableWhen": [],
                    "code": [],
                    "item": [],
                    "extension": [],
                    "answerOption": [],
                    "initial": [],
                    "anfStatementConnector": [],
                    "answer": []
                },
                {
                    "type": "decimal",
                    "linkId": "2873754464275",
                    "text": "Fever",
                    "enableWhen": [],
                    "code": [],
                    "item": [],
                    "extension": [
                        {
                            "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-unit",
                            "valueCoding": {
                                "id": "",
                                "system": "http://unitsofmeasure.org",
                                "version": "",
                                "code": "[degF]",
                                "display": "degrees Fahrenheit"
                            }
                        }
                    ],
                    "answerOption": [],
                    "initial": [],
                    "anfStatementConnector": [],
                    "answer": []
                },
                {
                    "type": "integer",
                    "linkId": "8154490208894",
                    "text": "Diarrhea (in 24 hours)",
                    "enableWhen": [],
                    "code": [],
                    "item": [],
                    "extension": [],
                    "answerOption": [],
                    "initial": [],
                    "anfStatementConnector": [],
                    "answer": []
                },
                {
                    "type": "decimal",
                    "linkId": "3480464648200",
                    "text": "Severe Obesity",
                    "enableWhen": [],
                    "code": [],
                    "item": [],
                    "extension": [],
                    "answerOption": [],
                    "initial": [],
                    "anfStatementConnector": [],
                    "answer": []
                }
            ],
            "ruleQuestionId": [],
            "created": "2024-09-25T06:55:47.318Z",
            "modified": "2024-10-14T17:51:07.834Z",
            "creator": "5f63a53ddcc67c7a1c3d93e8",
            "modifier": "66ff7d45192332495d56a39e",
            "version": "3"
        }],
          pagination: {
            pageNumber: 0,
            pageSize: 300,
            sortAscending: true,
            totalPages: 1,
            totalRecords: 4
          }
        })
      });
    });

    // Navigate to the form builder page
    await page.goto('/form-builder');
  });

  test('should display the form builder header', async ({ page }) => {
    await expect(page.locator('h1:has-text("Forms Builder")')).toBeVisible();
  });

  test('should toggle between grid and list view', async ({ page }) => {
    // Check initial grid view
    await expect(page.locator('div.grid')).toBeVisible();

    // Switch to list view
    await page.click('button:has-text("List View")');
    await expect(page.locator('table')).toBeVisible();

    // Switch back to grid view
    await page.click('button:has-text("Grid View")');
    await expect(page.locator('div.grid')).toBeVisible();
  });

  test('should open create new form page', async ({ page }) => {
    await page.click('button:has-text("Create New Form")');
    await expect(page).toHaveURL('/edit-questionnaire/new-questionnaire');
  });

  test('should upload a form', async ({ page }) => {
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click('label:has-text("Upload Form")');
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('./src/store/COVID-19.Simple.json');
    
    // Check if redirected to upload page
    await expect(page).toHaveURL('/edit-questionnaire/upload-questionnaire');
  });

  test('should display questionnaire cards in grid view', async ({ page }) => {
    const cards = page.locator('.grid');
    await expect(cards).toHaveCount(1);
  });

  test('should perform actions on questionnaire cards', async ({ page }) => {
    const firstCard = page.locator('.grid').first();

    // Test preview JSON
    await firstCard.locator('data-testid=preview-json').click();
    await expect(page.locator('role=dialog')).toBeVisible();
    await page.click('button:has-text("Close")');

    // Test download JSON
    const downloadPromise = page.waitForEvent('download');
    await firstCard.locator('data-testid=download-json').click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.json$/);

    // Test edit form
    await firstCard.locator('data-testid=edit-form').click();
    await expect(page).toHaveURL(/\/edit-questionnaire\/\w+/);
    await page.goBack();

    // Test delete form
    await firstCard.locator('data-testid=delete-form').click();
    await expect(page.locator('role=dialog')).toBeVisible();
    await expect(page.locator('role=dialog')).toContainText('Are you sure you want to delete this form?');
    await page.click('button:has-text("Cancel")');
  });

 

  test('should perform actions in list view', async ({ page }) => {
    await page.click('button:has-text("List View")');

    const firstRow = page.locator('table tbody tr').first();

    // Test preview JSON
    await firstRow.locator('data-testid=preview-json').click();
    await expect(page.locator('role=dialog')).toBeVisible();
    await page.click('button:has-text("Close")');

    // Test download JSON
    const downloadPromise = page.waitForEvent('download');
    await firstRow.locator('data-testid=download-json').click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.json$/);

    // Test edit form
    await firstRow.locator('data-testid=edit-form').click();
    await expect(page).toHaveURL(/\/edit-questionnaire\/\w+/);
    await page.goBack();

    // Test delete form
    await firstRow.locator('data-testid=delete-form').click();
    await expect(page.locator('role=dialog')).toBeVisible();
    await expect(page.locator('role=dialog')).toContainText('Are you sure you want to delete this form?');
    await page.click('button:has-text("Cancel")');
  });

  test('should handle pagination in list view', async ({ page }) => {
    await page.click('button:has-text("List View")');
    const paginationButtons = page.locator('.pagination button');
    const totalPages = await paginationButtons.count();

    if (totalPages > 1) {
      // Click on the second page
      await paginationButtons.nth(1).click();
      await expect(page.locator('table tbody tr')).toBeVisible();

      // Click on the last page
      await paginationButtons.nth(totalPages - 1).click();
      await expect(page.locator('table tbody tr')).toBeVisible();
    }
  });

  
});
