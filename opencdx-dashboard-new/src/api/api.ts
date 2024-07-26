import createClient from "openapi-fetch";
import type { paths as Iam } from '@/api/paths/iam_paths';
import type { paths as Questionnaire } from '@/api/paths/questionnaire_paths';
const Generated_IAM_Path = createClient<Iam>({
  baseUrl: 'https://ec2-3-13-148-183.us-east-2.compute.amazonaws.com:8080/iam',
  headers: { 
    authorization: `Bearer ${localStorage.getItem('serviceToken')}`}  
  
});
const Generated_Questionnaire_Path = createClient<Questionnaire>({
  baseUrl: 'https://ec2-3-13-148-183.us-east-2.compute.amazonaws.com:8080/questionnaire',
  headers: { 
    authorization: `Bearer ${localStorage.getItem('serviceToken')}`}  
  
});
export { Generated_IAM_Path , Generated_Questionnaire_Path};

