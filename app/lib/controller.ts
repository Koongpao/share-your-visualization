import { unstable_noStore } from "next/cache";
import { getServerAuthSession } from "./auth";

const baseURL = "http://localhost:3001";

const baseProdURL = "https://share-your-visualization-backend.vercel.app";

export async function fetchData() {
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
export async function GetMyInformation() {
  const session = await getServerAuthSession();
  try {
    const response = await fetch(baseProdURL + "/api/users/me", {
      method: "GET",
      headers: {
        authorization: session?.user.accessToken,
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
}


//PostVisualization - POST /api/visualizations
export async function PostVisualization(formData: FormData) {
  const session = await getServerAuthSession();
  try {
    const response = await fetch(baseProdURL + "/api/visualizations", {
      method: "POST",
      headers: {
        authorization: session?.user.accessToken,
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
export async function GetMyVisualizations() {
  const session = await getServerAuthSession();
  try {
    const response = await fetch(baseProdURL + "/api/visualizations/my-visualizations", {
      method: "GET",
      headers: {
        authorization: session?.user.accessToken,
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
}

//FavoriteVisualizations - GET /api/visualizations/:id/favorite
export async function FavoriteVisualizations(id: string) {
  const session = await getServerAuthSession();
  try {
    const response = await fetch(baseProdURL + "/api/visualizations/" + id + "/favorite", {
      method: "GET",
      headers: {
        authorization: session?.user.accessToken,
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
}

//UnfavoriteVisualizations - GET /api/visualizations/:id/unfavorite
export async function UnfavoriteVisualizations(id: string) {
  const session = await getServerAuthSession();
  try {
    const response = await fetch(baseProdURL + "/api/visualizations/" + id + "/unfavorite", {
      method: "GET",
      headers: {
        authorization: session?.user.accessToken,
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
}

//IsFavorited - GET /api/visualizations/:id/is-favorited
export async function IsFavorited(id: string) {
  const session = await getServerAuthSession();
  try {
    const response = await fetch(baseProdURL + "/api/visualizations/" + id + "/is-favorited", {
      method: "GET",
      headers: {
        authorization: session?.user.accessToken,
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
}

//LikeVisualizations - GET /api/visualizations/:id/like
export async function LikeVisualizations(id: string) {
  const session = await getServerAuthSession();
  try {
    const response = await fetch(baseProdURL + "/api/visualizations/" + id + "/like", {
      method: "GET",
      headers: {
        authorization: session?.user.accessToken,
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
}

//UnlikeVisualizations - GET /api/visualizations/:id/unlike
export async function UnlikeVisualizations(id: string) {
  const session = await getServerAuthSession();
  try {
    const response = await fetch(baseProdURL + "/api/visualizations/" + id + "/unlike", {
      method: "GET",
      headers: {
        authorization: session?.user.accessToken,
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
}

//IsLiked - GET /api/visualizations/:id/is-liked
export async function IsLiked(id: string) {
  const session = await getServerAuthSession();
  try {
    const response = await fetch(baseProdURL + "/api/visualizations/" + id + "/is-liked", {
      method: "GET",
      headers: {
        authorization: session?.user.accessToken,
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
}
