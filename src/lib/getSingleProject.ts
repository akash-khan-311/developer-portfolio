export const getSingleProject = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`, {
            cache: 'no-store',
        })

        if(!res.ok){
            throw new Error('Failed to fetch project data');
        }
        const data = await res.json();
        return  data
    } catch (error) {
        
    }
}