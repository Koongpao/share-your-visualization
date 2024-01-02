import { unstable_noStore } from "next/cache";

const baseURL = "http://localhost:3001";

const baseProdURL = "https://share-your-visualization-backend.vercel.app";

export async function fetchTestRoute() {
  try {
    const response = await fetch(baseProdURL + "/");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("error");
  }
}

export async function fetchData() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  unstable_noStore();

  try {
    // Artificially delay a reponse for demo purposes.
    // Don't do this in real life :)

    console.log("Fetching revenue data...");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const jsonResponse = "test";

    console.log("Data fetch complete after 2 seconds.");

    return jsonResponse;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch data.");
  }
}

///////////////////////////////////////////////////////////////////////////
//API FUNCTIONS
///////////////////////////////////////////////////////////////////////////

// GetAllTags - GET /api/tags
export async function GetAllTags() {
  try {
    const response = await fetch(baseProdURL + "/api/tags", { method: "GET" });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
}

//SignUp - POST /api/users
export async function SignUp(body: { username: string; email: string; password: string }) {
  try {
    const response = await fetch(baseProdURL + "/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
}

//Login - POST /api/login
export async function Login(body: { usernameOrEmail: string; password: string }) {
  try {
    const response = await fetch(baseProdURL + "/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
}

//GetMyInformation - GET /api/users/me
export async function GetMyInformation(token: string) {
  try {
    const response = await fetch(baseProdURL + "/api/users/me", {
      method: "GET",
      headers: {
        authorization: token,
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
}


//PostVisualization - POST /api/visualizations
export async function PostVisualization(token: string, formData: FormData) {
  try {
    const response = await fetch(baseProdURL + "/api/visualizations", {
      method: "POST",
      headers: {
        authorization: token,
      },
      body: formData,
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
}

//GetSpecificVisualization - GET /api/visualizations/:id
export async function GetSpecificVisualization(id: string) {
  try {
    const response = await fetch(baseProdURL + "/api/visualizations/" + id, { method: "GET" });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
}

//SearchVisualization - GET /api/visualizations?search_query=...&tags=...
export async function SearchVisualization(search_query?: string, tags?: string) {
  try {
    let url = "/api/visualizations?";

    if (search_query) {
      url += "search_query=" + search_query;
    }
    if (tags && tags.length > 0) {
      url += "&tags=" + tags;
    }
    const response = await fetch(baseProdURL + url, { method: "GET" });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
}

//GetMyVisualizations - GET /api/visualizations/my-visualizations
export async function GetMyVisualizations(token: string) {
  try {
    const response = await fetch(baseProdURL + "/api/visualizations/my-visualizations", {
      method: "GET",
      headers: {
        authorization: token,
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
}