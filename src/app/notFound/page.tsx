import { Separator } from "@/components/ui/separator";

const page = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <h1 className="next-error-h1 inline-block mr-4 pr-[23px] text-2xl/[49px] font-medium align-top">
        404
      </h1>
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-8 bg-sidebar-primary"
      />
      <div className="inline-block">
        <h2 className="text-[14px]/[49px] font-normal ml-4">
          This page could not be found.
        </h2>
      </div>
    </div>
  );
};

export default page;
