import { FaStar } from "react-icons/fa";
import { IoIosPricetag, IoIosPricetags } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegFolderOpen} from "react-icons/fa6";

export const NavbarMenuLinkList = [
    { hrefValue: "/search", labelValue: "Search", icon: <IoSearch /> },
    { hrefValue: "/post", labelValue: "Post Visualization", icon: <BsPencilSquare /> },
    { hrefValue: "/tag-list", labelValue: "Tag List", icon: <IoIosPricetags /> },
    { hrefValue: "/tag-list/add", labelValue: "Create New Tag", icon: <IoIosPricetag /> },
    { hrefValue: "/user/favorites", labelValue: "Favorites", icon: <FaStar /> },
    { hrefValue: "/user/my-visualizations", labelValue: "My Visualizations", icon: <FaRegFolderOpen /> },
  ];
  //Does not include /logout because it needs special classname

export const NavbarSecondaryLinkList = [
    { hrefValue: "/search", labelValue: "Search", icon: <IoSearch /> },
    { hrefValue: "/tag-list", labelValue: "Tag List", icon: <IoIosPricetags /> },
    { hrefValue: "/user/favorites", labelValue: "Favorites", icon: <FaStar /> },
    { hrefValue: "/user/my-visualizations", labelValue: "My Visualizations", icon: <FaRegFolderOpen /> },
    { hrefValue: "/post", labelValue: "Post Visualization", icon: <BsPencilSquare /> },
    { hrefValue: "/tag-list/add", labelValue: "Create New Tag", icon: <IoIosPricetag /> },
  ];
