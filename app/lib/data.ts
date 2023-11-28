import { unstable_noStore } from "next/cache";

export async function fetchData() {
    // Add noStore() here prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    unstable_noStore();
  
    try {
      // Artificially delay a reponse for demo purposes.
      // Don't do this in real life :)
  
      console.log('Fetching revenue data...');
      await new Promise((resolve) => setTimeout(resolve, 2000));
  
      const data = "test"
  
      console.log('Data fetch complete after 2 seconds.');
  
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to fetch data.');
    }
  }