import { tinkarApi } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useConceptSearch = (query: string) => {

    return useQuery({
        queryKey: ['conceptSearch'],
        queryFn: async () => tinkarApi.conceptSearch({query: query, maxResults: 30}),
    })
};