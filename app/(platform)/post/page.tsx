"use client";
import Link from "next/link";
import {
  Button,
  Autocomplete,
  AutocompleteItem,
  Listbox,
  ListboxItem,
  Input,
  Textarea,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

import { useState, useEffect } from "react";
import { Roboto } from "next/font/google";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

import { BsPencilSquare } from "react-icons/bs";
import { IoMdInformationCircle } from "react-icons/io";

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import { GetAllTags, PostVisualization } from "@/app/lib/controller";
import { handleTab, handleOnChange } from "@/app/lib/functions";
import { TlibraryAndTags } from "@/app/lib/definitions";

import {
  DisplayTag,
  DisplayTagNoLinkRemovable,
  DisplayLibraryNoLinkRemovable,
  DisplayTagWithLink,
} from "@/app/ui/small-components/display-tag";
import { getSession } from "next-auth/react";
import { set } from "date-fns";
import { placeholderCode } from "@/app/lib/resources";
import PostSuccess from "./post-success";
import PostFailed from "./post-failed";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export default function Page() {
  const [titleValue, setTitleValue] = useState<string>("");
  const [descriptionValue, setDescriptionValue] = useState<string>("");
  const [sourceCodeValue, setSourceCodeValue] = useState<string>("");
  const [sourceImage, setSourceImage] = useState<File[]>([]);
  const [externalLinkValue, setExternalLinkValue] = useState<string>("");
  const [selectedLibrary, setSelectedLibrary] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const titleMaxChar = 100;
  const descriptionMaxChar = 1000;
  const sourceCodeMaxChar = 15000;
  const externalLinkMaxChar = 200;

  const [tagList, setTagList] = useState<string[]>([]);
  const [libraryList, setLibraryList] = useState<string[]>([]);

  const getTags = async () => {
    const { data, message, success }: { data: TlibraryAndTags; message: string; success: boolean } = await GetAllTags();
    const resLibraryList = data.library.filter((item) => item.status == "approved").map((item) => item.name);
    const resTagList = data.tags.filter((item) => item.status == "approved").map((item) => item.name);
    setTagList(resTagList);
    setLibraryList(resLibraryList);
  };

  useEffect(() => {
    getTags();
  }, []);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [tagSearchTerm, setTagSearchTerm] = useState<string>("");
  const [tagSearchResults, setTagSearchResults] = useState<string[]>([]);
  const [tagIsFocused, setTagIsFocused] = useState<boolean>(false);

  const handleTagSearch = (query: string) => {
    if (query.trim() === "") {
      setTagSearchResults([]);
      return;
    }
    const results = tagList.filter((tag) => tag.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
    setTagSearchResults(results);
  };

  const handleTagClick = (key: string) => {
    // Check if the tag is already in the list
    setTagSearchTerm("");
    setTagSearchResults([]);
    if (!tagList.includes(key)) {
      // If tag is not available, terminate the function
      return;
    }
    if (!selectedTags?.includes(key)) {
      // If not, add the label to the list
      setSelectedTags?.((prevTagList) => [...prevTagList, key]);
    } else {
      return;
    }
  };

  const [librarySearchTerm, setLibrarySearchTerm] = useState<string>("");
  const [librarySearchResults, setLibrarySearchResults] = useState<string[]>([]);
  const [libraryIsFocused, setLibraryIsFocused] = useState<boolean>(false);

  const handleLibrarySearch = (query: string) => {
    if (query.trim() === "") {
      setLibrarySearchResults([]);
      return;
    }
    const results = libraryList.filter((tag) => tag.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
    setLibrarySearchResults(results);
  };

  const handleLibraryClick = (key: string) => {
    // Check if the tag is already in the list
    setLibrarySearchTerm("");
    setLibrarySearchResults([]);
    if (!libraryList.includes(key)) {
      // If tag is not available, terminate the function
      return;
    }
    setSelectedLibrary?.(key);
  };

  const [canSubmit, setCanSubmit] = useState<boolean>(false);

  useEffect(() => {
    if (titleValue && sourceImage.length > 0 && sourceCodeValue && selectedLibrary) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [titleValue, sourceImage, sourceCodeValue, selectedLibrary]);

  const handleSubmit = async () => {
    setCanSubmit(false);
    const formData = new FormData();
    formData.append("title", titleValue);
    formData.append("description", descriptionValue);
    formData.append("code", sourceCodeValue);
    formData.append("image", sourceImage[0]);
    formData.append("externalLink", externalLinkValue);
    formData.append("library", selectedLibrary);
    formData.append("tags", JSON.stringify(selectedTags));

    const response = await PostVisualization(() => getSession(), formData);
    if (response.success) {
      setPostSuccess(true);
    } else if (!response.success) {
      setPostFailed(true);
    }
  };

  const [postSuccess, setPostSuccess] = useState<boolean>(false);
  const [postFailed, setPostFailed] = useState<boolean>(false);

  if (postFailed) return <PostFailed/>

  if (postSuccess) return <PostSuccess/>

  return (
    <div className={"container py-6 px-8 md:px-24 lg:px-72 pb-12"}>
      <form className="flex flex-col" encType="multipart/form-data">
        <div className="py-2 border-b w-full">
          <div className="text-4xl font-semibold py-2 flex flex-row gap-x-2">
            <BsPencilSquare />
            Post a New Visualization
          </div>
        </div>

        <div className="pt-4 pb-2 lg:pt-8">
          <Input
            label="Title"
            labelPlacement="outside"
            variant="bordered"
            size={"lg"}
            placeholder="My First Bar Chart..."
            classNames={{
              label: "text-2xl font-medium text-slate-700",
              input: "placeholder:text-slate-300",
            }}
            onChange={(e) => handleOnChange(e, setTitleValue, titleMaxChar)}
            onKeyDown={(e) => handleTab(e, setTitleValue)}
            value={titleValue}
          />
          <div className="text-gray-400 font-regular text-sm flex justify-between">
            <div className="flex flex-row gap-1 items-center">
              <IoMdInformationCircle />
              <label>Visualization Title. (Max {titleMaxChar} characters.)</label>
              <label className="text-red-400">* Required</label>
            </div>
            <label>{titleValue.length}</label>
          </div>
        </div>

        <div className="py-4">
          <Textarea
            variant="bordered"
            label="Description"
            labelPlacement="outside"
            placeholder="A Bar Chart that..."
            classNames={{
              label: "text-xl font-medium text-slate-700",
              input: "placeholder:text-slate-300",
            }}
            rows={4}
            onChange={(e) => handleOnChange(e, setDescriptionValue, descriptionMaxChar)}
            onKeyDown={(e) => handleTab(e, setDescriptionValue)}
            value={descriptionValue}
          />
          <div className="text-gray-400 font-regular text-sm flex justify-between">
            <div className="flex flex-row gap-1 items-center">
              <IoMdInformationCircle />
              <label>Visualization Description. (Max {descriptionMaxChar} characters.) </label>
              <label className="text-slate-400">* Optional</label>
            </div>
            <label>{descriptionValue.length}</label>
          </div>
        </div>

        <div className="py-4">
          <div>
            <label className="text-xl text-slate-700 font-medium">Image</label>
            <FilePond
              files={sourceImage}
              onupdatefiles={(fileItems) => {
                setSourceImage(fileItems.map((fileItem) => fileItem.file as File));
              }}
              allowMultiple={false}
              allowImagePreview={true}
              name="visualization-image"
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              acceptedFileTypes={["image/png", "image/jpeg"]}
              maxFileSize="5MB"
            />
          </div>
          <div className="text-gray-400 font-regular text-sm flex justify-between">
            <div className="flex flex-row gap-1 items-center">
              <IoMdInformationCircle />
              <label>Image preview of visualization. (Allowed File Types: .jpeg, .png)(Max 5 MB.)</label>
              <label className="text-red-400">* Required</label>
            </div>
          </div>
        </div>

        <div className="py-4">
          <Input
            label="Link to Demo"
            labelPlacement={"outside"}
            variant={"bordered"}
            classNames={{
              label: "text-xl font-medium text-slate-700",
              input: "placeholder:text-slate-300",
            }}
            placeholder="my-website.com"
            onChange={(e) => handleOnChange(e, setExternalLinkValue, externalLinkMaxChar)}
            onKeyDown={(e) => handleTab(e, setExternalLinkValue)}
            value={externalLinkValue}
          />
          <div className="text-gray-400 font-regular text-sm flex justify-between">
            <div className="flex flex-row gap-1 items-center">
              <IoMdInformationCircle />
              <label>
                URL Link to Visualization Demo. Used to provide link for interactive or live version of visualization
                (Max {externalLinkMaxChar} characters.)
              </label>
              <label>* Optional</label>
            </div>
            <label>{titleValue.length}</label>
          </div>
        </div>

        <div className="py-4">
          <Textarea
            label="Source Code"
            labelPlacement="outside"
            variant="bordered"
            classNames={{
              label: "text-xl font-medium text-slate-700",
              input: "placeholder:text-slate-300",
            }}
            spellCheck={false}
            placeholder={placeholderCode}
            minRows={15}
            maxRows={15}
            onChange={(e) => handleOnChange(e, setSourceCodeValue, sourceCodeMaxChar)}
            onKeyDown={(e) => handleTab(e, setSourceCodeValue)}
            value={sourceCodeValue}
          />
          <div className="text-gray-400 font-regular text-sm flex justify-between">
            <div className="flex flex-row gap-1 items-center">
              <IoMdInformationCircle />
              <label>Source Code of the Visualization. (Max {sourceCodeMaxChar} characters.)</label>
              <label className="text-red-400">* Required</label>
            </div>
            <label>{sourceCodeValue.length}</label>
          </div>
        </div>

        <div className="py-3">
          <div className="relative" onFocus={() => setLibraryIsFocused(true)} onBlur={() => setLibraryIsFocused(false)}>
            <label className="text-xl text-slate-700 font-medium">Library</label>
            <Input
              startContent={<FaSearch className="text-slate-400" />}
              variant="bordered"
              type="text"
              placeholder="Search for Library (Must choose 1 library)"
              value={librarySearchTerm}
              onChange={(e) => {
                setLibrarySearchTerm(e.target.value);
                handleLibrarySearch(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLibraryClick(librarySearchResults[0] || "");
                }
              }}
            />
            {libraryIsFocused && librarySearchResults.length > 0 && (
              <Listbox
                aria-label="Actions"
                //@ts-ignore
                onAction={handleLibraryClick}
                className="absolute z-10 bg-white border rounded-md mt-1 p-1 w-full"
              >
                {librarySearchResults.map((result, index) => (
                  <ListboxItem key={result}>
                    <DisplayTagWithLink label={result} />
                  </ListboxItem>
                ))}
              </Listbox>
            )}
            {libraryIsFocused && librarySearchTerm.trim() !== "" && librarySearchResults.length === 0 && (
              <Listbox
                disabledKeys={["noresult"]}
                aria-label="Actions"
                className="absolute z-10 bg-white border rounded-md mt-1 p-1 w-full"
              >
                <ListboxItem key="noresult">No results found.</ListboxItem>
              </Listbox>
            )}
          </div>
          <div className="text-gray-400 font-regular text-sm flex justify-between">
            <div className="flex flex-row gap-1 items-center">
              <IoMdInformationCircle />
              <label>Choose Library of this visualization. (Max 1 Library.)</label>
              <label className="text-red-400">* Required</label>
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-1">
            {selectedLibrary && (
              <div className="py-1">
                <DisplayLibraryNoLinkRemovable setLibraryValue={setSelectedLibrary} label={selectedLibrary} />
              </div>
            )}
          </div>
        </div>

        <div className="py-3">
          <div className="relative z-5" onFocus={() => setTagIsFocused(true)} onBlur={() => setTagIsFocused(false)}>
            <label className="text-xl text-slate-700 font-medium">Tags</label>
            <Input
              startContent={<FaSearch className="text-slate-400" />}
              variant="bordered"
              type="text"
              placeholder="Search for Tags (May choose multiple tags)"
              value={tagSearchTerm}
              onChange={(e) => {
                setTagSearchTerm(e.target.value);
                handleTagSearch(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleTagClick(tagSearchResults[0] || "");
                }
              }}
            />
            {tagIsFocused && tagSearchResults.length > 0 && (
              <Listbox
                aria-label="Actions"
                //@ts-ignore
                onAction={handleTagClick}
                className="absolute z-10 bg-white border rounded-md mt-1 p-1 w-full"
              >
                {tagSearchResults.map((result, index) => (
                  <ListboxItem key={result}>
                    <DisplayTagWithLink label={result} />
                  </ListboxItem>
                ))}
              </Listbox>
            )}
            {tagIsFocused && tagSearchTerm.trim() !== "" && tagSearchResults.length === 0 && (
              <Listbox
                disabledKeys={["noresult"]}
                aria-label="Actions"
                className="absolute z-10 bg-white border rounded-md mt-1 p-1 w-full"
              >
                <ListboxItem key="noresult">No results found.</ListboxItem>
              </Listbox>
            )}
          </div>
          <div className="text-gray-400 font-regular text-sm flex justify-between">
            <div className="flex flex-row gap-1 items-center">
              <IoMdInformationCircle />
              <label>Choose tags to classify category of visualization. (No limit.)</label>
              <label>* Optional</label>
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-1">
            {selectedTags.map((tag, i) => (
              <div className="py-1" key={i}>
                <DisplayTagNoLinkRemovable setTagValue={setSelectedTags} label={tag} />
              </div>
            ))}
          </div>
        </div>

        <div className="pb-4 pt-2">
          <div className="text-gray-600 font-medium">
            Can&apos;t find tag or library you&apos;re searching for?
            <Link href="/tag-list/request" target="_blank" className="text-gray-900 font-bold underline">
              {" "}
              Request for a new tag
            </Link>
          </div>
        </div>

        <div className="py-4 mt-6 flex flex-row gap-4 items-center">
          <Button className="font-semibold text-md text-white bg-teal-600" onClick={onOpen}>
            Proceed
          </Button>
          <Button className="font-semibold text-md text-gray-500 bg-transparent">Clear</Button>
        </div>
      </form>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Are you sure to submit?</ModalHeader>
              <ModalBody>
                {!titleValue && (
                  <div>
                    Title is not filled yet. <label className="text-red-400 font-semibold">* Required</label>{" "}
                  </div>
                )}
                {!descriptionValue && (
                  <div>
                    Description is not filled yet. <label className="text-slate-900 font-semibold">* Optional</label>{" "}
                  </div>
                )}
                {sourceImage.length === 0 && (
                  <div>
                    Image is not provided yet. <label className="text-red-400 font-semibold">* Required</label>{" "}
                  </div>
                )}
                {!externalLinkValue && (
                  <div>
                    Link to Demo is not filled yet.{" "}
                    <label className="text-slate-900 font-semibold">* Optional (Recommended)</label>{" "}
                  </div>
                )}
                {!sourceCodeValue && (
                  <div>
                    Source Code is not filled yet. <label className="text-red-400 font-semibold">* Required</label>{" "}
                  </div>
                )}
                {!selectedLibrary && (
                  <div>
                    Library is not selected yet. <label className="text-red-400 font-semibold">* Required</label>{" "}
                  </div>
                )}
                {selectedTags.length === 0 && (
                  <div>
                    Tags are not selected.{" "}
                    <label className="text-slate-900 font-semibold">* Optional (Recommended)</label>{" "}
                  </div>
                )}
                {!(titleValue && sourceImage.length > 0 && sourceCodeValue && selectedLibrary) && (
                  <div className="font-semibold text-red-400">You must fill required fields to Submit </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button className="bg-white font-bold text-base text-red-500" onPress={onClose}>
                  Close
                </Button>
                <Button className="font-semibold text-base text-white bg-teal-600" isDisabled={!canSubmit} onClick={() => handleSubmit()}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
