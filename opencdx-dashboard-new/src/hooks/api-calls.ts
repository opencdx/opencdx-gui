import axios from 'axios';
import { Country } from '@/api/logistics/model/country';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('serviceToken')}`,
    'Accept': 'application/json',
};

export const listOrganizations = async () => {
    const response = await axios.post(
        'https://api.dev-1.opencdx.io/iam/organization/list',
        { pagination: { pageNumber: 1, pageSize: 100, sortAscending: true } },
        { headers }
    );
    return response.data.organizations;
};

export const listWorkspaces = async (organizationId: string) => {
    const response = await axios.post(
        'https://api.dev-1.opencdx.io/iam/workspace/list',
        {
            pagination: { pageNumber: 1, pageSize: 100, sortAscending: true },
            organizationId
        },
        { headers }
    );
    return response.data.workspaces;
};

export const listCountries = async () => {
    const response = await axios.get('https://api.dev-1.opencdx.io/logistics/country/list', { headers });
    return response.data;
};

export const getCountryById = async (id: string) => {
    const response = await axios.get(`https://api.dev-1.opencdx.io/logistics/country/${id}`, { headers });
    return response.data;
};

export const deleteCountry = async (id: string) => {
    return axios.delete(`https://api.dev-1.opencdx.io/logistics/country/${id}`, { headers });
};

export const updateCountry = async (country: Country) => {
    return axios.put(`https://api.dev-1.opencdx.io/logistics/country/${country.id}`, country, { headers });
};

export const addCountry = async (country: Country) => {
    return axios.post(`https://api.dev-1.opencdx.io/logistics/country/`, country, { headers });
};

