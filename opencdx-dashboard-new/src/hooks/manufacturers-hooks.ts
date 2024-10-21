import { logisticsApi } from "@/api";
import { ManufacturerListRequest, Manufacturer, Country, Vendor, Device } from "@/api/logistics";
import { useMutation, useQuery } from '@tanstack/react-query';
import { SignUpRequest } from '@/api/iam/model';
import axios from 'axios';
import {
    listCountries,
    getCountryById,
    updateCountry,
    addCountry
} from './api-calls';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${window.localStorage.getItem('serviceToken')}`,
    'Accept': 'application/json',
};

export const useGetManufacturerList = () => {
    return useMutation({
        mutationFn: (params: ManufacturerListRequest) => logisticsApi.listCountries({ manufacturerListRequest: params }),
        onSuccess: (data) => {
            return data;
        }
    });
};

export const useAddManufacturer = () => {
    return useMutation({
        mutationFn: (params: Manufacturer) => logisticsApi.addManufacturer({ manufacturer: params })
    });
};

export const useDeleteManufacturer = () => {
    return useMutation({
        mutationFn: (id: string) => logisticsApi.deleteManufacturer({ id: id })
    });
};

export const useUpdateManufacturer = () => {
    return useMutation({
        mutationFn: (params: Manufacturer) => logisticsApi.updateManufacturer({ manufacturer: params })
    });
};


export const useGetCountryList = () => {
    return useMutation({
        mutationFn: listCountries
    });
};

export const useGetCountryById = () => {
    return useMutation({
        mutationFn: getCountryById
    });
};


export const useUpdateCountry = () => {
    return useMutation({
        mutationFn: updateCountry
    });
};

export const useAddCountry = () => {
    return useMutation({
        mutationFn: addCountry
    });
};

export const useFetchVendors = () => {
    return useQuery({
        queryKey: ['vendors'],
        queryFn: async () => {
            const response = await axios.post(
                'https://api.dev-1.opencdx.io/logistics/vendor/list',
                { pagination: { pageNumber: 0, pageSize: 100, sortAscending: true } },
                { headers }
            );
            return response.data.vendors;
        }
    });
};

export const useFetchDevices = () => {
    return useQuery({
        queryKey: ['devices'],
        queryFn: async () => {
            const response = await axios.post(
                'https://api.dev-1.opencdx.io/logistics/device/list',
                { pagination: { pageNumber: 0, pageSize: 100, sortAscending: true } },
                { headers }
            );
            return response.data.device;
        }
    });
};

export const useHandleFormSubmit = (isEdit: boolean, fetchVendors: () => void, reset: () => void) => {
    return useMutation({
        mutationFn: async (data: Omit<Vendor, 'id'>) => {
            const url = isEdit
                ? `https://api.dev-1.opencdx.io/logistics/vendor`
                : 'https://api.dev-1.opencdx.io/logistics/vendor';
            const method = isEdit ? 'put' : 'post';

            const cleanData = JSON.parse(JSON.stringify(data));

            const response = await axios({
                method,
                url,
                data: cleanData,
                headers
            });
            if (response.status === 200 || response.status === 201) {
                fetchVendors();
                reset();
            }
        }
    });
};

export const useDeleteVendor = (fetchVendors: () => void) => {
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await axios.delete(
                `https://api.dev-1.opencdx.io/logistics/vendor/${id}`,
                { headers }
            );
            if (response.status === 200) {
                fetchVendors();
            }
        }
    });
};

export const useFetchCountries = () => {
    return useQuery({
        queryKey: ['countries'],
        queryFn: async () => {
            const response = await axios.post(
                'https://api.dev-1.opencdx.io/logistics/country/list',
            { pagination: { pageNumber: 1, pageSize: 100, sortAscending: true } },
            { headers }
        );
            return response.data.countries;
        }
    });
};



export const useHandleCountryFormSubmit = (isEdit: boolean, fetchCountries: () => void, reset: () => void) => {
    return useMutation({
        mutationFn: async (data: Omit<Country, 'id'>) => {
            const url = isEdit
                ? `https://api.dev-1.opencdx.io/logistics/country`
                : 'https://api.dev-1.opencdx.io/logistics/country';
            const method = isEdit ? 'put' : 'post';

            const cleanData = JSON.parse(JSON.stringify(data));

            const response = await axios({
                method,
                url,
                data: cleanData,
                headers
            });
            if (response.status === 200 || response.status === 201) {
                fetchCountries();
                reset();
            }
        }
    });
};

export const useDeleteCountry = (fetchCountries: () => void) => {
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await axios.delete(
                `https://api.dev-1.opencdx.io/logistics/country/${id}`,
                { headers }
            );
            if (response.status === 200) {
                fetchCountries();
            }
        }
    });
};

export const useFetchOrganizations = () => {
    return useQuery({
        queryKey: ['organizations'],
        queryFn: async () => {
            const response = await axios.post(
                'https://api.dev-1.opencdx.io/iam/organization/list',
                { pagination: { pageNumber: 0, pageSize: 100, sortAscending: true } },
                { headers }
            );
            return response.data.organizations;
        }
    });
};

export const useFetchWorkspaces = (organizationId: string | null) => {
    return useQuery({
        queryKey: ['workspaces', organizationId],
        queryFn: async () => {
            if (!organizationId) return [];
            const response = await axios.post(
                'https://api.dev-1.opencdx.io/iam/workspace/list',
                {
                    pagination: { pageNumber: 1, pageSize: 100, sortAscending: true },
                    organizationId
                },
                { headers }
            );
            return response.data.workspaces;
        },
    });
};

// Add other hooks as needed for handling organizations and workspaces

export const useHandleDeviceFormSubmit = (isEdit: boolean, fetchDevices: () => void, reset: () => void) => {
    return useMutation({
        mutationFn: async (data: Omit<Device, 'id'>) => {
            const url = 'https://api.dev-1.opencdx.io/logistics/device';
            const method = isEdit ? 'put' : 'post';

            const cleanData = JSON.parse(JSON.stringify(data));

            const response = await axios({
                method,
                url,
                data: cleanData,
                headers
            });
            if (response.status === 200 || response.status === 201) {
                fetchDevices();
                reset();
            }
        }
    });
};

export const useDeleteDevice = (fetchDevices: () => void) => {
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await axios.delete(
                `https://api.dev-1.opencdx.io/logistics/device/${id}`,
                { headers }
            );
            if (response.status === 200) {
                fetchDevices();
            }
        }
    });
};

export const useHandleTestFormSubmit = (isEdit: boolean, fetchTests: () => void, reset: () => void) => {
    return useMutation({
        mutationFn: async (data: Omit<Device, 'id'>) => {
            const url = 'https://api.dev-1.opencdx.io/logistics/testcase';
            const method = isEdit ? 'put' : 'post';

            const cleanData = JSON.parse(JSON.stringify(data));

            const response = await axios({
                method,
                url,
                data: cleanData,
                headers
            });
            if (response.status === 200 || response.status === 201) {
                fetchTests();
                reset();
            }
        }
    });
};

export const useDeleteTest = (fetchTests: () => void) => {
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await axios.delete(
                `https://api.dev-1.opencdx.io/logistics/testcase/${id}`,
                { headers }
            );
            if (response.status === 200) {
                fetchTests();
            }
        }
    });
};

export const useFetchTests = () => {
    return useQuery({
        queryKey: ['tests'],
        queryFn: async () => {
            const response = await axios.post(
                'https://api.dev-1.opencdx.io/logistics/testcase/list',
                { pagination: { pageNumber: 0, pageSize: 100, sortAscending: true } },
                { headers }
            );
            return response.data.testCases;
        }
    });
};

export const useFetchUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axios.post(
                'https://api.dev-1.opencdx.io/iam/user/list',
                { pagination: { pageNumber: 0, pageSize: 100, sortAscending: true } },
                { headers }
            );
            return response.data.iamUsers;
        }
    });
};

export const useHandleUserFormSubmit = (isEdit: boolean, fetchUsers: () => void, reset: () => void) => {
    return useMutation({
        mutationFn: async (data: Omit<SignUpRequest, 'id'>) => {
            debugger;
            const url = isEdit ? 'https://api.dev-1.opencdx.io/iam/user' : 'https://api.dev-1.opencdx.io/iam/user/signup';
            const method = isEdit ? 'put' : 'post';

            const cleanData = JSON.parse(JSON.stringify(data));

            const response = await axios({
                method,
                url,
                data: cleanData,
                headers
            });
            if (response.status === 200 || response.status === 201) {
                fetchUsers();
                reset();
            }
        }
    });
};

export const useDeleteUser = (fetchUsers: () => void) => {
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await axios.delete(`https://api.dev-1.opencdx.io/iam/user/${id}`, { headers });
            if (response.status === 200) {
                fetchUsers();
            }
        }
    });
};

export const useFetchEmailTemplates = () => {
    return useQuery({
        queryKey: ['emailTemplates'],
        queryFn: async () => {
            const response = await axios.post(
                'https://api.dev-1.opencdx.io/communications/email/list',
                { pagination: { pageNumber: 0, pageSize: 100, sortAscending: true } },
                { headers }
            );
            return response.data.templates;
        }
    });
};

export const useHandleEmailTemplateFormSubmit = (isEdit: boolean, fetchEmailTemplates: () => void, reset: () => void) => {
    return useMutation({
        mutationFn: async (data: Omit<any, 'id'>) => {
            const url = isEdit ? 'https://api.dev-1.opencdx.io/communications/email' : 'https://api.dev-1.opencdx.io/communications/email';
            const method = isEdit ? 'put' : 'post';

            const cleanData = JSON.parse(JSON.stringify(data));

            const response = await axios({
                method,
                url,
                data: cleanData,
                headers
            });
            if (response.status === 200 || response.status === 201) {
                fetchEmailTemplates();
                reset();
            };
        }
    });
};

export const useDeleteEmailTemplate = (fetchEmailTemplates: () => void) => {
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await axios.delete(`https://api.dev-1.opencdx.io/communications/email/${id}`, { headers });
            if (response.status === 200) {
                fetchEmailTemplates();
            }
        }
    });
};