"use client";
import Link from "next/link";
import { Button, Autocomplete, AutocompleteItem } from "@nextui-org/react";

import { useState, useEffect } from "react";
import { Roboto } from "next/font/google";
import { useForm } from "react-hook-form";

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
} from "@/app/ui/small-components/display-tag";
import { getSession } from "next-auth/react";
import { set } from "date-fns";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export default function Page() {
  const [titleValue, setTitleValue] = useState<string>("");
  const [descriptionValue, setDescriptionValue] = useState<string>("");
  const [sourceCodeValue, setSourceCodeValue] = useState<string>("");
  const [sourceImage, setSourceImage] = useState<File[]>([]);
  const [externalLinkValue, setExternalLinkValue] = useState<string>("");
  const [libraryValue, setLibraryValue] = useState<string>("");
  const [tagValue, setTagValue] = useState<string[]>([]);

  const titleMaxChar = 50;
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

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", titleValue);
    formData.append("description", descriptionValue);
    formData.append("code", sourceCodeValue);
    formData.append("image", sourceImage[0]);
    formData.append("externalLink", externalLinkValue);
    formData.append("library", libraryValue);
    formData.append("tags", JSON.stringify(tagValue));

    const response = await PostVisualization(formData);
    console.log(response);
  };

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
          <input
            className="py-7 text-2xl border-gray-200 font-medium flex h-10 w-full rounded-md border-medium border-input bg-background px-3 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="Title"
            onChange={(e) => handleOnChange(e, setTitleValue, titleMaxChar)}
            onKeyDown={(e) => handleTab(e, setTitleValue)}
            value={titleValue}
          />
          <div className="text-gray-300 font-regular text-sm flex justify-between">
            <div className="flex flex-row gap-1 items-center">
              <IoMdInformationCircle />
              <label>Visualization Title. (Max {titleMaxChar} characters.)</label>
            </div>
            <label>{titleValue.length}</label>
          </div>
        </div>

        <div className="pb-4">
          <textarea
            className="py-2 text-lg font-regular flex h-40 w-full border-gray-200 rounded-md border-medium border-input bg-background px-3 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="Description"
            rows={4}
            onChange={(e) => handleOnChange(e, setDescriptionValue, descriptionMaxChar)}
            onKeyDown={(e) => handleTab(e, setDescriptionValue)}
            value={descriptionValue}
          />
          <div className="text-gray-300 font-regular text-sm flex justify-between">
            <div className="flex flex-row gap-1 items-center">
              <IoMdInformationCircle />
              <label>Visualization Description. (Max {descriptionMaxChar} characters.)</label>
            </div>
            <label>{descriptionValue.length}</label>
          </div>
        </div>

        <div className="pb-4">
          <div>
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
          <div className="text-gray-300 font-regular text-sm flex justify-between">
            <div className="flex flex-row gap-1 items-center">
              <IoMdInformationCircle />
              <label>Image preview of visualization. (Allowed File Types: .jpeg, .png)(Max 5 MB.)</label>
            </div>
          </div>
        </div>

        <div className="pb-4">
          <input
            className="py-2 text-lg font-regular flex h-10 w-full border-gray-200 rounded-md border-medium border-input bg-background px-3 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="Link to Demo"
            onChange={(e) => handleOnChange(e, setExternalLinkValue, externalLinkMaxChar)}
            onKeyDown={(e) => handleTab(e, setExternalLinkValue)}
            value={externalLinkValue}
          />
          <div className="text-gray-300 font-regular text-sm flex justify-between">
            <div className="flex flex-row gap-1 items-center">
              <IoMdInformationCircle />
              <label>URL Link to Visualization Demo. (Max {externalLinkMaxChar} characters.) (Optional)</label>
            </div>
            <label>{titleValue.length}</label>
          </div>
        </div>

        <div className="pb-4">
          <textarea
            className={`${roboto.className} tracking-wide py-2 text-sm placeholder:text-lg flex h-50 w-full border-medium border-gray-200 rounded-md border-input bg-background px-3 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
            placeholder="Source Code"
            rows={10}
            onChange={(e) => handleOnChange(e, setSourceCodeValue, sourceCodeMaxChar)}
            onKeyDown={(e) => handleTab(e, setSourceCodeValue)}
            value={sourceCodeValue}
          />
          <div className="text-gray-300 font-regular text-sm flex justify-between">
            <div className="flex flex-row gap-1 items-center">
              <IoMdInformationCircle />
              <label>Source Code of the Visualization. (Max {sourceCodeMaxChar} characters.)</label>
            </div>
            <label>{sourceCodeValue.length}</label>
          </div>
        </div>

        <div className="pb-4">
          {/* <div className="py-2 text-lg font-regular flex h-15 border-gray-300 items-center w-full rounded-md border-medium border-input bg-background px-3 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <div className="flex flex-row gap-2 items-center cursor-pointer">
              <p className="text-gray-400 text-md">Library Tag (Click to select)</p>
              <FaCirclePlus className="text-gray-400" />
            </div>
          </div> */}
          <div>
            <Autocomplete
              variant="bordered"
              placeholder="Select a Library"
              classNames={{
                base: "max-w-xs",
                listboxWrapper: "max-h-[320px]",
                selectorButton: "text-gray-400 text-4xl",
              }}
              //@ts-ignore
              onSelectionChange={setLibraryValue}
            >
              {libraryList.map((tag) => (
                <AutocompleteItem key={tag} textValue={tag}>
                  <DisplayTag label={tag} />
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
          {libraryValue && (
            <div className="py-1">
              <DisplayLibraryNoLinkRemovable setLibraryValue={setLibraryValue} label={libraryValue} />
            </div>
          )}
          <div className="text-gray-300 font-regular text-sm flex justify-between">
            <div className="flex flex-row gap-1 items-center">
              <IoMdInformationCircle />
              <label>Visualization Library. (Max 1 Tag)</label>
            </div>
          </div>
        </div>

        <div className="pb-4">
          <div>
            <Autocomplete
              variant="bordered"
              placeholder="Select Tags"
              classNames={{
                base: "max-w-xs",
                listboxWrapper: "max-h-[320px]",
                selectorButton: "text-gray-400 text-4xl",
              }}
              onSelectionChange={(key) => {
                if (key) {
                  //@ts-ignore
                  if (tagValue?.includes(key)) {
                    // If tag is not available, terminate the function
                    console.log("Tag dupes");
                    return;
                  }
                  //@ts-ignore
                  setTagValue([...tagValue, key || ""]);
                }
              }}
            >
              {tagList.map((tag) => (
                <AutocompleteItem key={tag} textValue={tag}>
                  <DisplayTag label={tag} />
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
          <div className="flex flex-row gap-1 items-center">
            {tagValue.map((tag, i) => (
              <div className="py-1" key={i}>
                <DisplayTagNoLinkRemovable setTagValue={setTagValue} label={tag} />
              </div>
            ))}
          </div>
          <div className="text-gray-300 font-regular text-sm flex justify-between">
            <div className="flex flex-row gap-1 items-center">
              <IoMdInformationCircle />
              <label>Other Tags. (No Limit.)</label>
            </div>
          </div>
        </div>

        <div className="pb-4 pt-2">
          <div className="text-gray-600 font-medium">
            Can&apos;t find tag or library you&apos;re searching for?
            <Link href="/tag-list/add" target="_blank" className="text-gray-900 font-bold underline">
              {" "}
              Help by creating one!
            </Link>
          </div>
        </div>

        <div className="py-4 flex flex-row gap-4 items-center">
          <Button className="font-semibold text-md text-white bg-teal-600" onClick={() => handleSubmit()}>
            Submit
          </Button>
          <Button className="font-semibold text-md text-gray-500 bg-transparent">Clear</Button>
        </div>
      </form>
    </div>
  );
}
