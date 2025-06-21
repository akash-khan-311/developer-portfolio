type Props = {
  id: string;
  payload: {
    name: string;
    slug: string[];
    socialLinks: {
      facebook: string;
      twitter: string;
      linkedin: string;
      github: string;
    };
  };
};

export const updateExperienceData = async ({ id, payload }: Props) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/experience/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error('Failed to update hero data');
    }

    const data = await res.json();
    return {
      success: true,
      message: 'Hero Data Updated Successfully',
      data: data,
    };
  } catch (error) {
    console.error('Error updating hero data:', error);
    return {
      success: false,
      message: error.message || 'Something went wrong',
      data: null,
    };
  }
};
