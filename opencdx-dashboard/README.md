# OpenCDx Dashboard

## Build & Deployment Procedures
### Prerequisites
1. [Node.js](https://nodejs.org/en/download/) installed
2. Enable yarn (`corepack enable`)

### Running locally
1. Run `yarn install`
2. Run `yarn start`
3. The dashboard login page should automatically open

### Run Cypress tests 
`yarn run cypress open`

## Using the form builder
The form builder uses a form created using the [NLM Form Builder](https://lhcformbuilder.nlm.nih.gov/) as the base. Save a copy of the JSON from the NLM Form Builder that can be used to import into the OpenCDx form builder to configure the ANF statements.

Current supported question types are integer, string, text, boolean, and choice.

After signing in to the OpenCDx dashboard, the form builder can be found by clicking on the Form Designer menu item on the left of the OpenCDx dashboard or by going to https://localhost:3000/form-builder. The form builder is viewable without the OpenCDx backend services running (IAM, questionnaire) but are needed in order to save the questionnaire.

Click upload file on the top left and select the JSON of the questionnaire created from the NLM Form Builder. The list of questions will be displayed and can then be individually configured by expanding the question. The various ANF configurations will be displayed and can be further expanded for additional settings. By default, certain fields will be autopopulated.

Once finished, click save to persist the questionnaire. The updated JSON can also be viewed by clicking ANF Statement JSON on the top of the page.

Sample questionnaire JSONs can be found under the `src/formBuilder/store` directory.