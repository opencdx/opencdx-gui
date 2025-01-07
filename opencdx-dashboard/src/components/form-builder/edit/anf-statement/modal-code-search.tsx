import { Snippet } from "@nextui-org/react";
import { ContentCopyIcon } from 'ui-library'
import { useConceptSearch } from '@/hooks/tinkar-hooks';
import { TinkarGetResult } from '@/api/tinkar/model/tinkar-get-result';
import { useEffect } from "react";

const SnippetItem: React.FC<{ item: TinkarGetResult }> = ({ item }) => (
  <div key={item.conceptId} className="p-4 flex flex-col">
    <div className="py-4"><b>ConceptName: </b>{item.name}</div>
    <div className="py-4">
      <Snippet
        color="primary"
        size="lg"
        copyIcon={<ContentCopyIcon />}
        variant="flat"
        radius="sm"
        symbol=""
      >
        {item.conceptId}
      </Snippet>
    </div>
  </div>
);

const ModalCodeSearch: React.FC<{ query: string }> = ({ query }) => {
  const { data: searchResults, refetch } = useConceptSearch(query);

  useEffect(() => {
    refetch();
  }, [query, refetch]);
  
  return (
    <div className="divide-y divide-gray-200 border border-gray-200 h-[400px] overflow-auto">
      {searchResults?.data?.results?.map((item: TinkarGetResult) => (
        <SnippetItem key={item.conceptId} item={item} />
      ))}
    </div>
  );
};

export { ModalCodeSearch };