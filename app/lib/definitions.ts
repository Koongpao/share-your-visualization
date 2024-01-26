export type CallbackFunction = () => Promise<any>;

export type TlibraryAndTags = {
  library: {
    _id: string;
    name: string;
    is_library: boolean;
    status: string;
  }[];
  tags: {
    _id: string;
    name: string;
    is_library: boolean;
    status: string;
  }[];
};

export type TTags = {
  _id: string;
  name: string;
  is_library: boolean;
  status: string;
};

export type TSpecificVisualization = {
  title: string;
  creator: {
    username: string;
  };
  description: string;
  image: string;
  code: string;
  library: {
    name: string;
  };
  tags: {
    name: string;
  }[];
  externalLink: string;
  likes: any[]; // Replace 'any' with the actual type of the 'likes' array elements if known
  status: string;
  created_date: string;
};

export type TVisualization = {
  _id: string;
  title: string;
  creator: {
    username: string;
  };
  image: string;
  library: {
    name: string;
  };
  tags: {
    name: string;
  }[];
  likes: any[]; // Replace 'any' with the appropriate type if known
  status: string;
  created_date: string;
};

export type TVisualizationsArray = TVisualization[];

export type TPagination = {
  currentPage: number;
  totalDocuments: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
}

