import { CallbackFunction } from "./definitions";

const baseURL = "http://localhost:3001";

const baseProdURL = "https://share-your-visualization-backend.vercel.app";

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
export async function GetMyInformation(getSessionFunc: CallbackFunction) {
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
export async function PostVisualization(getSessionFunc: CallbackFunction, formData: FormData) {
  const session = await getSessionFunc();
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
    const response = await fetch(baseProdURL + "/api/visualizations/" + id, { method: "GET", cache: "no-cache" });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
}

//SearchVisualization - GET /api/visualizations?search_query=...&tags=...
export async function SearchVisualization(search_query?: string, tags?: string, page?: string, sortby?: string, order?: string) {
  try {
    let url = "/api/visualizations?";

    if (search_query) {
      url += "search_query=" + search_query;
    }
    if (tags && tags.length > 0) {
      url += "&tags=" + tags;
    }
    if (page) {
      url += "&page=" + page;
    }
    if (sortby) {
      url += "&sortby=" + sortby;
    }
    if (order) {
      url += "&order=" + order;
    }
    console.log(url);
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
      // cache: "no-cache",
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
export async function FavoriteVisualizations(getSessionFunc: CallbackFunction, id: string) {
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
export async function UnfavoriteVisualizations(getSessionFunc: CallbackFunction, id: string) {
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
export async function IsFavorited(getSessionFunc: CallbackFunction, id: string) {
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

//RequestNewTag - POST /api/tags
export async function RequestNewTag(getSessionFunc: CallbackFunction, name: string, is_library: boolean) {
  const session = await getSessionFunc();
  try {
    const response = await fetch(baseProdURL + "/api/tags", {
      method: "POST",
      headers: {
        authorization: session?.user.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, is_library: is_library }),
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
}

//GetPendingVisualizations - GET /api/visualizations/pending
export async function GetPendingVisualizations(getSessionFunc: CallbackFunction) {
  const session = await getSessionFunc();
  try {
    const response = await fetch(baseProdURL + "/api/visualizations/pending", {
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

//ApproveVisualization - PUT /api/visualizations/:id/approve
export async function ApproveVisualization(getSessionFunc: CallbackFunction, id: string) {
  const session = await getSessionFunc();
  try {
    const response = await fetch(baseProdURL + "/api/visualizations/" + id + "/approve", {
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

//DisapproveVisualization - PUT /api/visualizations/:id/disapprove
export async function DisapproveVisualization(getSessionFunc: CallbackFunction, id: string) {
  const session = await getSessionFunc();
  try {
    const response = await fetch(baseProdURL + "/api/visualizations/" + id + "/disapprove", {
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

//GetRequestedTags - GET /api/tags/requested
export async function GetRequestedTags(getSessionFunc: CallbackFunction) {
  const session = await getSessionFunc();
  try {
    const response = await fetch(baseProdURL + "/api/tags/requested", {
      method: "GET",
      cache: "no-cache",
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

//ApproveTag - PUT /api/tags/:id/approve
export async function ApproveTag(getSessionFunc: CallbackFunction, id: string) {
  const session = await getSessionFunc();
  try {
    const response = await fetch(baseProdURL + "/api/tags/" + id + "/approve", {
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

//DisapproveTag - PUT /api/tags/:id/disapprove
export async function DisapproveTag(getSessionFunc: CallbackFunction, id: string) {
  const session = await getSessionFunc();
  try {
    const response = await fetch(baseProdURL + "/api/tags/" + id + "/disapprove", {
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

//DeleteVisualization - DELETE /api/visualizations/:id
export async function DeleteVisualization(getSessionFunc: CallbackFunction, id: string) {
  const session = await getSessionFunc();
  try {
    const response = await fetch(baseProdURL + "/api/visualizations/" + id, {
      method: "DELETE",
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
