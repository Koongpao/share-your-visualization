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

    const data = "test";

    console.log("Data fetch complete after 2 seconds.");

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch data.");
  }
}

///////////////////////////////////////////////////////////////////////////
//API FUNCTIONS
///////////////////////////////////////////////////////////////////////////

// GetAllTags GET - /api/tags
export async function GetAllTags() {
  try {
    const response = await fetch(baseProdURL + "/api/tags", { method: "GET" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// POST - /api/users
export async function SignUp(body: { username: string; email: string; password: string }) {
  try {
    const response = await fetch(baseProdURL + "/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

//POST - /api/login
export async function Login(body: { usernameOrEmail: string; password: string }) {
  try {
    const response = await fetch(baseProdURL + "/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

//GET - /api/users/me
export async function GetMyInformation(token: string) {
  try {
    const response = await fetch(baseURL + "/api/users/me/name", {
      method: "GET",
      headers: {
        authorization: token,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
