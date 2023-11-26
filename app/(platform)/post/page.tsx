"use client";
import { BsPencilSquare } from "react-icons/bs";
import React, { ChangeEvent, useState } from "react";
import { Roboto } from "next/font/google";
import { IoMdInformationCircle } from "react-icons/io";

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType
);

const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export default function Page() {
  const [titleValue, setTitleValue] = useState<string>("");
  const [descriptionValue, setDescriptionValue] = useState<string>("");
  const [sourceCodeValue, setSourceCodeValue] = useState<string>("");
  const [sourceImage, setSourceImage] = useState<File[]>([]);

  const titleMaxChar = 50;
  const descriptionMaxChar = 1000;
  const sourceCodeMaxChar = 5000;

  const handleTab = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (e.key === "Tab") {
      e.preventDefault();
      setFunction((prev: string) => prev + "\t");
    }
  };
  //Let Input to be able to type tab, instead of default event (skipping to next input)

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFunction: React.Dispatch<React.SetStateAction<string>>,
    maxChar: number
  ) => {
    if (e.target.value.length <= maxChar) {
      setFunction(e.target.value);
    }
  };
  //Handle on input field change (not exceeding maxChar)

  return (
    <div className={"container py-6 px-8 md:px-24 lg:px-48 pb-12"}>
      <div className="flex flex-col">
        <div className="py-2 border-b w-full">
          <div className="text-4xl font-semibold py-2 flex flex-row gap-x-2">
            <BsPencilSquare />
            Post a New Visualization
          </div>
        </div>

        <div className="pt-4 pb-2 lg:pt-8">
          <input
            className="py-7 text-2xl font-medium flex h-10 w-full rounded-sm border border-dashed border-input bg-background px-3 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="Title"
            onChange={(e) => handleOnChange(e, setTitleValue, titleMaxChar)}
            onKeyDown={(e) => handleTab(e, setTitleValue)}
            value={titleValue}
          ></input>
          <div className="text-gray-300 font-regular text-sm flex justify-between">
            <div className="flex flex-row gap-1 items-center">
              <IoMdInformationCircle />
              <label>
                Visualization Title. (Max {titleMaxChar} characters.)
              </label>
            </div>
            <label>{titleValue.length}</label>
          </div>
        </div>

        <div className="pb-4">
          <textarea
            className="py-2 text-lg font-regular flex h-40 w-full rounded-sm border border-dashed border-input bg-background px-3 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="Description"
            rows={4}
            onChange={(e) =>
              handleOnChange(e, setDescriptionValue, descriptionMaxChar)
            }
            onKeyDown={(e) => handleTab(e, setDescriptionValue)}
            value={descriptionValue}
          ></textarea>
          <div className="text-gray-300 font-regular text-sm flex justify-between">
            <div className="flex flex-row gap-1 items-center">
              <IoMdInformationCircle />
              <label>
                Visualization Description. (Max {descriptionMaxChar}{" "}
                characters.)
              </label>
            </div>
            <label>{descriptionValue.length}</label>
          </div>
        </div>

        <div className="pb-4">
          <textarea
            className={`${roboto.className} tracking-wide py-2 text-sm placeholder:text-lg flex h-100 w-full rounded-sm border border-dashed border-input bg-background px-3 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
            placeholder="Source Code"
            rows={20}
            onChange={(e) =>
              handleOnChange(e, setSourceCodeValue, sourceCodeMaxChar)
            }
            onKeyDown={(e) => handleTab(e, setSourceCodeValue)}
            value={sourceCodeValue}
          ></textarea>
          <div className="text-gray-300 font-regular text-sm flex justify-between">
            <div className="flex flex-row gap-1 items-center">
              <IoMdInformationCircle />
              <label>
                Source Code of the Visualization. (Max {sourceCodeMaxChar}{" "}
                characters.)
              </label>
            </div>
            <label>{sourceCodeValue.length}</label>
          </div>
        </div>

        <div className="pb-4">
          <div>
            <FilePond
              files={sourceImage}
              onupdatefiles={(fileItems) => {
                setSourceImage(
                  fileItems.map((fileItem) => fileItem.file as File)
                );
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
              <label>
                Image preview of visualization. (Max 5 MB.)
              </label>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

