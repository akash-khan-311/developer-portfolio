type Props = {
  id: string;
  payload: {
    title: string;
    description: string;
    image: string;
    codeLink: string;
    liveLink: string;
    technologies: string[];
  };
};

export const updateProjectData = async ({id,payload} : Props)=> {
   try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload }),
    });

    return res.json();
  } catch (error) {
    console.error('Update Project Failed:', error);
    return { success: false, message: 'Update Failed' };
  }
}