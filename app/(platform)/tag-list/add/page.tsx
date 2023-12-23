"use client";
import { useState } from "react";
import { IoMdInformationCircle } from "react-icons/io";
import { BsPencilSquare } from "react-icons/bs";
import { RadioGroup, Radio, cn, Button } from "@nextui-org/react";
import { handleTab, handleOnChange } from "@/app/lib/functions";

export default function Page() {
  const [tagName, setTagName] = useState<string>("");
  const [isLibrary, setIsLibrary] = useState<string>("yes");

  const tagNameMaxChar = 20;

  return (
    <div className="container py-6 px-8 md:px-24 lg:px-72 xl:px-96 pb-12">
      <div className="py-2 border-b w-full ">
        <div className="text-4xl font-semibold py-2 flex flex-row gap-x-2">
          <BsPencilSquare />
          Create a New Tag
        </div>
      </div>
      <div className="pt-4 pb-2 lg:pt-8">
        <input
          className="py-5 text-xl font-medium border-medium border-gray-200 flex h-10 w-full rounded-md border-input bg-background px-3 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="Tag Title"
          onChange={(e) => handleOnChange(e, setTagName, tagNameMaxChar)}
          onKeyDown={(e) => handleTab(e, setTagName)}
          value={tagName}
        />
        <div className="text-gray-300 font-regular text-sm flex justify-between">
          <div className="flex flex-row gap-1 items-center">
            <IoMdInformationCircle />
            <label>Tag Title. (Max {tagNameMaxChar} characters.)</label>
          </div>
          <label>{tagName.length}</label>
        </div>
      </div>
      <div className="py-4">
        <div className="font-medium pb-2 text-xl text-gray-500">Library Tag?</div>
        <RadioGroup defaultValue="no" orientation="horizontal" value={isLibrary} onValueChange={setIsLibrary}>
          <Radio
            value="yes"
            classNames={{
              base: cn(
                "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                "data-[selected=true]:border-primary border-solid border-gray-200"
              ),
            }}
          >
            Yes
          </Radio>
          <Radio
            value="no"
            classNames={{
              base: cn(
                "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                "data-[selected=true]:border-primary border-solid border-gray-200"
              ),
            }}
          >
            No
          </Radio>
        </RadioGroup>
      </div>
      <div className="py-4 flex flex-row gap-4 items-center">
        <Button className="font-semibold text-md text-white bg-teal-600">Submit</Button>
        <Button className="font-semibold text-md text-gray-500 bg-transparent">Cancel</Button>
      </div>
    </div>
  );
}
