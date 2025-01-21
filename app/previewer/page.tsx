import ResultComponent from "@/components/url-components/ResultComponent";
import { Suspense } from "react";

const ResultPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultComponent />
    </Suspense>
  );
};

export default ResultPage;
