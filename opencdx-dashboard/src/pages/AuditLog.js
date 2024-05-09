import MainCard from 'ui-component/cards/MainCard';
import Box from '@mui/material/Box';
import DataGrid from 'ui-component/extended/DataGrid';
import { useEffect, useCallback, useState } from 'react';
import { Graphql } from 'utils/axios/graphqlEndpoints';

export default function AuditLog() {
    const [auditEventList, setAuditEventList] = useState([]);
    const fetchData = useCallback(async () => {
        try {
            const response = await Graphql.post({
                query: `{
                    getAudit {
                        purposeOfUse,
                        created,
                        eventType,
                        actor {
                            identity_,
                            role_,
                            networkAddress_,
                            agentType_
                        },
                        dataObject {
                            resource_,
                            data_,
                            sensitivity_
                        },
                        auditSource {
                            systemInfo_,
                            configuration_
                        },
                        auditEntity {
                            patientIdentifier_,
                            userIdentifier_
                        },
                        _class,
                        creator,
                        modifier,
                        modified
                    }
                }`
            });
            response.data.data?.getAudit.forEach((item, index) => {
                item.id = index;
            });
            const modifiedAuditEventList = response.data.data?.getAudit;
            setAuditEventList(modifiedAuditEventList);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    return (
        <MainCard title="Audit Log">
            <Box sx={{ height: '100%', width: '100%' }}>
                <DataGrid auditEventList={auditEventList} />
            </Box>
        </MainCard>
    );
}
