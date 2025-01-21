import PreviousSearchesComponent from "@/components/url-components/PreviousSearchesComponent";
import ResultComponent from "@/components/url-components/ResultComponent";
import SearchComponent from "@/components/url-components/SearchComponent";
import { Suspense } from "react";

const ResultPage = () => {
  return (
    <>
      <h1 className="headline-gradient-clip text-center font-display text-3xl font-semibold tracking-tight [text-wrap:balance] sm:text-7xl">
        Social Media Share Previewer
      </h1>
      <p className="mb-10 mt-6 text-center text-xl text-neutral-600">
        Experience the power of previewing your social media posts across
        platforms. This tool delivers quality assurance, efficiency, and
        captivating features, enhancing your content creation journey.
      </p>
      <div className="flex w-full flex-col justify-center align-middle">
        <SearchComponent urlLink={"false"} isPending={false} />
        <PreviousSearchesComponent />
      </div>
    </>
  );
};

export default ResultPage;
