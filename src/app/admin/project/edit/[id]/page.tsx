/* eslint-disable */
import EditProject from "@/components/Admin/Project/EditProject";
import { getSingleProject } from "@/lib/getSingleProject";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).id;

  // fetch post information
  const result = await getSingleProject(id);

  return {
    title: result?.data?.title,
    description: result?.data?.description,
  };
}

const EditProjectPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  // Data fetching
  const result: any | undefined = await getSingleProject(params.id);

  // Not found handling
  if (!result) {
    return (
      <div className="min-h-[calc(100vh-40px)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold  mb-4">Project Not Found</h1>
          <p className="text-gray-400">
            The Project you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }
  return (
    <>
      <EditProject project={result?.data} />
    </>
  );
};

export default EditProjectPage;
