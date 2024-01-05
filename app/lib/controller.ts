import { unstable_noStore } from "next/cache";
import { getServerAuthSession } from "./auth";
import { getSession } from "next-auth/react";
import { CallbackFunction } from "./definitions";

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
export async function GetMyInformation(getSessionFunc: CallbackFunction,) {
  const session = await getSessionFunc();
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
//Currently disabled
export async function PostVisualization(getSessionFunc: CallbackFunction,formData: FormData) {
  const session = await getSessionFunc();
  try {
    const response = await fetch(baseURL + "/api/visualizations", {
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
export async function GetMyVisualizations(getSessionFunc: CallbackFunction) {
  const session = await getSessionFunc();
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

//FavoriteVisualizations - PUT /api/visualizations/:id/favorite
export async function FavoriteVisualizations(getSessionFunc: CallbackFunction,id: string) {
  const session = await getSessionFunc();
  try {
    const response = await fetch(baseProdURL + "/api/visualizations/" + id + "/favorite", {
      method: "PUT",
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

//UnfavoriteVisualizations - PUT /api/visualizations/:id/unfavorite
export async function UnfavoriteVisualizations(getSessionFunc: CallbackFunction,id: string) {
  const session = await getSessionFunc();
  try {
    const response = await fetch(baseProdURL + "/api/visualizations/" + id + "/unfavorite", {
      method: "PUT",
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
export async function IsFavorited(getSessionFunc: CallbackFunction,id: string) {
  const session = await getSessionFunc();
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

//LikeVisualizations - PUT /api/visualizations/:id/like
export async function LikeVisualizations(getSessionFunc: CallbackFunction, id: string) {
  const session = await getSessionFunc();
  try {
    const response = await fetch(baseProdURL + "/api/visualizations/" + id + "/like", {
      method: "PUT",
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

//UnlikeVisualizations - PUT /api/visualizations/:id/unlike
export async function UnlikeVisualizations(getSessionFunc: CallbackFunction, id: string) {
  const session = await getSessionFunc();
  try {
    const response = await fetch(baseProdURL + "/api/visualizations/" + id + "/unlike", {
      method: "PUT",
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
export async function IsLiked(getSessionFunc: CallbackFunction, id: string) {
  const session = await getSessionFunc();
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

//GetMyFavoriteVisualization - GET /api/visualizations/favorite-visualizations
export async function GetMyFavoriteVisualizations(getSessionFunc: CallbackFunction) {
  const session = await getSessionFunc();
  try {
    const response = await fetch(baseProdURL + "/api/visualizations/favorite-visualizations", {
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
