import { produce } from 'immer';
import { createWithEqualityFn as create } from 'zustand/traditional';
type ToggleData = {
    id: string;
    key: string;
    description?: string;
    organizationId?: string;
    workspaceId?: string;
    subCategory?: ToggleData[];
    enabled?: boolean;
};
  
  
let categories: ToggleData[] = [
    {
      id: 'analysis-engine', 
      organizationId: 'default',
      workspaceId: 'default',
      enabled: true,
      key: 'Analysis Engine',
      description:'Section description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius. ',
      subCategory: [
          {
            id:'connected-text-classification',
            key:'Connected Text Classification', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'questionnaire-classification',
            key:'Questionnaire Classification', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          }
      ]
    },
    { 
      id: 'client-settings', 
      organizationId: 'default',
      workspaceId: 'default',
      enabled: false,
      key: 'Client Settings',
      description:'Section description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius. ',
      subCategory: [
          {
            id:'contact-support',
            key:'Contact Support', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:true
          },
          {
            id:'faq',
            key:'FAQ', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'rua',
            key:'RUA', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'image-capture',
            key:'Image Capture', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'media-upload',
            key:'Media Upload', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'skip-timer',
            key:'Skip Timer', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'access-code',
            key:'Access Code', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          }
      ]
    },
    { 
      id: 'employer-benefits', 
      organizationId: 'default',
      workspaceId: 'default',
      enabled: true,
      key: 'Employer Benefits',
      description:'Section description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius. ',
      subCategory: [
          {
            id:'preventative-care-reminders',
            key:'Preventative Care Reminders', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'mental-health-support',
            key:'Mental Health Support', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'wellness-tracking',
            key:'Wellness Tracking', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'health-risk-assessments',
            key:'Health Risk Assessments', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          }
      ]
    },
    { 
      id: 'form-builder', 
      organizationId: 'default',
      workspaceId: 'default',
      enabled: true,
      key: 'Form Builder',
      description:'Section description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius. ',
      subCategory: [
          {
            id:'api',
            key:'API', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'categories',
            key:'Categories', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          }
      ]
    },
    { 
      id: 'health-navigator', 
      organizationId: 'default',
      workspaceId: 'default',
      enabled: true,
      key: 'Health Navigator',
      description:'Section description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius. ',
      subCategory: [
          {
            id:'med-lookup',
            key:'Med Lookup', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          }
      ]
    },
    { 
      id: 'medical-records', 
      organizationId: 'default',
      workspaceId: 'default',
      enabled: true,
      key: 'Medical Records',
      description:'Section description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius. ',
      subCategory: [
          {
            id:'medical-records-export',
            key:'Medical Records Export', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'medical-records-import',
            key:'Medical Records Import', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          }
      ]
    },
    { 
      id: 'messaging', 
      organizationId: 'default',
      workspaceId: 'default',
      enabled: true,
      key: 'Messaging',
      description:'Section description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius. ',
      subCategory: [
          {
            id:'email',
            key:'Email', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'in-app',
            key:'In App', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'sms',
            key:'SMS', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          }
      ]
    },
    { 
      id: 'profile', 
      organizationId: 'default',
      workspaceId: 'default',
      enabled: true,
      key: 'Profile',
      description:'Section description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius. ',
      subCategory: [
          {
            id:'contact-info',
            key:'Contact Info', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false,
            subCategory: [
              {
                id:'patient-legal-name',
                key:'Patient Legal Name', 
                description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
                enabled:false
              },
              {
                id:'street-address',
                key:'Street Address', 
                description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
                enabled:false
              },
              {
                id:'demographics',
                key:'Demographics', 
                description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
                enabled:false
              },
              {
                id:'biological-sex-gender',
                key:'Biological Sex/Gender', 
                description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
                enabled:false
              },
            ]
          },
          
          {
            id:'ethnicity-race',
            key:'Ethnicity/Race', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'emergency-contact',
            key:'Emergency Contact', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'name',
            key:'Name', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'home-address',
            key:'Home Address', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'primary-email',
            key:'Primary Email', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'secondary-email',
            key:'Secondary Email', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'employer-info',
            key:'Employer Info', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'employer-id',
            key:'Employer ID', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'heart-rate',
            key:'Heart Rate', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'height',
            key:'Height', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'insurance',
            key:'Insurance', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'medical-history',
            key:'Medical History', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'family-medical-history',
            key:'Family Medical History', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'lab-results-history',
            key:'Lab Results History', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'profile-photo',
            key:'Profile Photo', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          }
      ]
    },
    { 
      id: 'provider',    
      organizationId: 'default',
      workspaceId: 'default',
      enabled: true,
      key: 'Provider', 
      description:'Section description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius. ',
      subCategory: [
          {
            id:'provider-lookup',
            key:'Provider Lookup', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'provider-notes',
            key:'Provider Notes', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          }
      ]
    },
    { 
      id: 'public-health-reporting', 
      organizationId: 'default',
      workspaceId: 'default',
      enabled: true,
      key: 'Public Health Reporting', 
      description:'Section description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius. ',
      subCategory: [
          {
            id:'cdc',
            key:'CDC', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          }
      ]
    },
    { 
      id: 'reporting', 
      organizationId: 'default',
      workspaceId: 'default',
      enabled: true,
      key: 'Reporting', 
      description:'Section description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius. ',
      subCategory: [
          {
            id:'reporting',
            key:'Reporting', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          }
      ]
    },
    { 
      id: 'telehealth', 
      organizationId: 'default',
      workspaceId: 'default',
      enabled: true,
      key: 'Telehealth', 
      description:'Section description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius. ',
      subCategory: [
          {
            id:'telehealth-link',
            key:'Telehealth Link', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'telehealth-async',
            key:'Telehealth Async', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          }
      ]
    },
    { 
      id: 'test-management', 
      organizationId: 'default',
      workspaceId: 'default',
      enabled: true,
      key: 'Test Management', 
      description:'Section description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius. ',
      subCategory: [
          {
            id:'connected-test',
            key:'Connected Test', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          },
          {
            id:'ordering',
            key:'Ordering', 
            description:'Toggle description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ', 
            enabled:false
          }
      ]   
    },
  ];


  interface ToggleDataStore {
    toggleData: ToggleData[];
    previousToggleData: ToggleData[];
    setToggleData: (data: ToggleData[]) => void;
    setToggleEnabled: (id: string, enabled: boolean) => void;
    setDefaultToggleData: () => void;
  }

export const useToggleStore = create<ToggleDataStore>((set) => ({
    toggleData: [],
    previousToggleData: [],
    setToggleData: (data: ToggleData[]) => {
      set(
        produce((draft) => {
            draft.previousToggleData = draft.toggleData;
            draft.toggleData = data;
        })
      );
    },
    setDefaultToggleData: () => {
      set(
        produce((draft) => {
            draft.previousToggleData = draft.toggleData;
            draft.toggleData = categories;
        })
      );
    },
    setToggleEnabled: (id: string, enabled: boolean) => {
        set(
            produce((draft) => {
              draft.previousToggleData = draft.toggleData;
              draft.toggleData = draft.toggleData.map((category: ToggleData) => {
                if (category.id === id) {
                  category.enabled = enabled; // Modify existing object
                } else {
                  if(category.subCategory){
                    category.subCategory = category.subCategory.map((subCategory: ToggleData) => {
                      if(subCategory.id === id){
                        subCategory.enabled = enabled;
                      }
                      return subCategory;
                    });
                  }
                }
                return category;
              });
            })
          );
    }
}));

